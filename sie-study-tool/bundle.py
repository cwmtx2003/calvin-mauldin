#!/usr/bin/env python3
"""
Bundle pass4_output/*.json into sie_study_data.js (window.SIE_STUDY_DATA).

Reconstructs the deck structure the app expects:
  flashcards.byUnit  — per-unit decks (lessons concatenated, cards enriched with jobFunction)
  flashcards.byJF    — same cards regrouped by each lesson's job function
  flashcards.byType  — the 4 type decks
  studyGuides.byUnit — per-unit guides
  studyGuides.byJF   — unit-guide lesson-sections regrouped by lesson job function
  referenceSheets    — the 6 sheets (alphabetical by key), metadata stripped
  conceptIndex       — PRESERVED verbatim from the existing bundle (no source file)

Usage:
  python bundle.py                # rebuild sie_study_data.js from pass4_output
  python bundle.py --verify       # build in-memory and diff against current bundle (no write)
"""
import argparse, json, re, sys
from pathlib import Path
from datetime import date

HERE = Path(__file__).parent
OUT_JS = HERE / "sie_study_data.js"
SOURCES_JS = HERE / "sie_sources.js"
P4 = HERE / "pass4_output"

JF_NAMES = {
    "km": "Knowledge of Capital Markets",
    "pr": "Understanding Products & Their Risks",
    "tc": "Trading, Customer Accounts & Prohibited Activities",
    "rf": "Overview of the Regulatory Framework",
}
JF_ORDER = ["km", "pr", "tc", "rf"]
# Study-guide byJF grouping uses this curated unit->JF membership (a unit may appear
# in multiple JFs, so its sections are duplicated into each). This differs from the
# flashcard byJF grouping (which uses each card's single per-lesson jobFunction).
# Extracted from the existing bundle to preserve fidelity.
SG_JF_UNITS = {
    "km": [1, 9, 10],
    "pr": [2, 3, 4, 5, 7, 8],
    "tc": [1, 6, 7, 8, 11],
    "rf": [12],
}
TYPE_TITLES = {"standard": "Standard", "hard": "Hard", "definitions": "Definitions", "calculations": "Calculations"}
TYPE_ORDER = ["standard", "hard", "definitions", "calculations"]


def load_js_object(path: Path, varname: str) -> dict:
    raw = path.read_text(encoding="utf-8")
    m = re.search(re.escape(varname) + r"\s*=\s*", raw)
    if not m:
        raise SystemExit(f"Could not find '{varname} =' in {path.name}")
    j = raw[m.end():].strip()
    if j.endswith(";"):
        j = j[:-1]
    return json.loads(j)


def build_lesson_meta(sources: dict) -> dict:
    """(unit, lesson) -> {jobFunction, title}"""
    meta = {}
    for unum, entry in sources["manual"].items():
        for L in entry.get("lessons", []):
            meta[(int(L["unit"]), int(L["lesson"]))] = {
                "jobFunction": L.get("jobFunction"),
                "title": L.get("title"),
            }
    return meta


def lesson_files():
    out = []
    for p in P4.glob("flashcards_unit_*_lesson_*.json"):
        m = re.search(r"flashcards_unit_(\d+)_lesson_(\d+)\.json", p.name)
        out.append((int(m.group(1)), int(m.group(2)), p))
    out.sort(key=lambda t: (t[0], t[1]))
    return out


def build_flashcards(lesson_meta, unit_names):
    by_unit, by_jf = {}, {}
    for u in range(1, 13):
        by_unit[str(u)] = {"unit": u, "unit_name": unit_names.get(u, ""), "cards": []}
    for jf in JF_ORDER:
        by_jf[jf] = {"jf": jf, "jf_name": JF_NAMES[jf], "cards": []}

    for unit, lesson, path in lesson_files():
        data = json.loads(path.read_text(encoding="utf-8"))
        jf = lesson_meta.get((unit, lesson), {}).get("jobFunction")
        for card in data.get("cards", []):
            enriched = {
                "type": card.get("type"),
                "front": card.get("front"),
                "back": card.get("back"),
                "lo": card.get("lo"),
                "unit": unit,
                "lesson": lesson,
                "lesson_title": card.get("lesson_title") or data.get("lesson_title"),
                "jobFunction": jf,
            }
            by_unit[str(unit)]["cards"].append(enriched)
            if jf in by_jf:
                by_jf[jf]["cards"].append(enriched)

    by_type = {}
    for tk in TYPE_ORDER:
        f = P4 / f"flashcards_type_{tk}.json"
        cards = json.loads(f.read_text(encoding="utf-8")).get("cards", []) if f.exists() else []
        by_type[tk] = {"type": tk, "title": TYPE_TITLES[tk], "cards": cards}

    return {"byUnit": by_unit, "byJF": by_jf, "byType": by_type}


def build_study_guides(lesson_meta):
    by_unit = {}
    unit_names = {}
    for u in range(1, 13):
        f = P4 / f"studyguide_unit_{u}.json"
        if not f.exists():
            continue
        g = json.loads(f.read_text(encoding="utf-8"))
        unit_names[u] = g.get("unit_name", "")
        by_unit[str(u)] = {"unit": u, "unit_name": g.get("unit_name", ""), "sections": g.get("sections", [])}

    by_jf = {jf: {"jf": jf, "jf_name": JF_NAMES[jf], "sections": []} for jf in JF_ORDER}
    for jf in JF_ORDER:
        for u in SG_JF_UNITS[jf]:  # units already in ascending order
            if str(u) not in by_unit:
                continue
            uname = by_unit[str(u)]["unit_name"]
            for sec in by_unit[str(u)]["sections"]:
                # byJF sections are tagged with their source unit (extra _unit/_unit_name fields)
                tagged = dict(sec)
                tagged["_unit"] = u
                tagged["_unit_name"] = uname
                by_jf[jf]["sections"].append(tagged)
    return {"byUnit": by_unit, "byJF": by_jf}, unit_names


def build_reference_sheets():
    sheets = []
    for f in sorted(P4.glob("reference_*.json"), key=lambda p: p.name):
        d = json.loads(f.read_text(encoding="utf-8"))
        sheets.append({
            "key": d.get("key"),
            "title": d.get("title"),
            "sections": d.get("sections", []),
            "common_traps": d.get("common_traps", []),
        })
    return sheets


def build(preserve_from: dict):
    sources = load_js_object(SOURCES_JS, "window.SIE_SOURCES")
    lesson_meta = build_lesson_meta(sources)
    study_guides, unit_names = build_study_guides(lesson_meta)
    flashcards = build_flashcards(lesson_meta, unit_names)
    reference_sheets = build_reference_sheets()
    return {
        "version": preserve_from.get("version", "1.0.0"),
        "generated_at": date.today().isoformat(),
        "flashcards": flashcards,
        "studyGuides": study_guides,
        "referenceSheets": reference_sheets,
        "conceptIndex": preserve_from["conceptIndex"],  # preserved verbatim
    }


def counts(d):
    return {
        "fc.byUnit": {k: len(v["cards"]) for k, v in d["flashcards"]["byUnit"].items()},
        "fc.byJF": {k: len(v["cards"]) for k, v in d["flashcards"]["byJF"].items()},
        "fc.byType": {k: len(v["cards"]) for k, v in d["flashcards"]["byType"].items()},
        "sg.byUnit": {k: len(v["sections"]) for k, v in d["studyGuides"]["byUnit"].items()},
        "sg.byJF": {k: len(v["sections"]) for k, v in d["studyGuides"]["byJF"].items()},
        "refSheets": [s["key"] for s in d["referenceSheets"]],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--verify", action="store_true", help="diff against current bundle, do not write")
    args = ap.parse_args()

    current = load_js_object(OUT_JS, "window.SIE_STUDY_DATA")
    built = build(current)

    if args.verify:
        cc, bc = counts(current), counts(built)
        ok = True
        for key in cc:
            if cc[key] != bc[key]:
                ok = False
                print(f"MISMATCH [{key}]:\n  current: {cc[key]}\n  built  : {bc[key]}")
        # deep structural equality (excluding conceptIndex which is preserved + generated_at)
        for sect in ("flashcards", "studyGuides", "referenceSheets"):
            if json.dumps(current[sect], sort_keys=True) != json.dumps(built[sect], sort_keys=True):
                ok = False
                print(f"DEEP MISMATCH in '{sect}'")
        print("VERIFY:", "OK — bundler reproduces current bundle exactly" if ok else "DIFFERENCES FOUND (see above)")
        return 0 if ok else 1

    header = ("// SIE Study Tool — Pass 4 offline study data\n"
              "// Flashcards (20 decks), study guides (16), reference sheets (6), concept index\n")
    OUT_JS.write_text(header + "window.SIE_STUDY_DATA = " + json.dumps(built, ensure_ascii=False) + ";\n", encoding="utf-8")
    print(f"Wrote {OUT_JS.name} ({OUT_JS.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
