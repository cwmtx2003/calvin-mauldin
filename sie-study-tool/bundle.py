#!/usr/bin/env python3
"""
Bundle pass4_output/*.json into the browser data file (window.SIE_STUDY_DATA).

De-Kaplan v2: reads the offline manifest sie_sources.v2.js (unit/JF crosswalk,
browser-safe outline) and the generator's outputs, and assembles the ONLY file
the browser loads. No Kaplan text is read or written.

Produces:
  flashcards.byUnit / byJF / byType   — per-unit decks (cards tagged with unit JF), type decks
  studyGuides.byUnit / byJF           — per-unit guides, regrouped by curated JF membership
  referenceSheets                     — the sheets (alphabetical by key)
  questionBank.byUnit / byJF / byType — NEW: pre-generated MCQs (the primary runtime engine)
  conceptIndex                        — from pass4_output/concept_index.json (investor.gov, not Kaplan)
  outline                             — NEW: browser-safe FINRA outline (topics/bullets) for the live booster
  meta                                — NEW: license (CC BY-NC-SA 4.0) + source credits

Writes the STAGING file sie_study_data.v2.js (the live sie_study_data.js is
swapped in at the integration cutover). SRO rule text is never present here —
the manifest only carries outline bullets + rule numbers/titles (public).

Usage:
  python bundle.py                # build sie_study_data.v2.js from pass4_output + v2 manifest
  python bundle.py --report       # build in-memory and print a structure/counts summary
"""
import argparse, json, re, sys
from pathlib import Path
from datetime import date

HERE = Path(__file__).parent
OUT_JS = HERE / "sie_study_data.v2.js"   # staging; live file swapped at cutover
SOURCES_JS = HERE / "sie_sources.v2.js"
P4 = HERE / "pass4_output"
CONCEPT_INDEX = P4 / "concept_index.json"

JF_NAMES = {
    "km": "Knowledge of Capital Markets",
    "pr": "Understanding Products & Their Risks",
    "tc": "Trading, Customer Accounts & Prohibited Activities",
    "rf": "Overview of the Regulatory Framework",
}
JF_ORDER = ["km", "pr", "tc", "rf"]
# Study-guide byJF grouping: a unit may surface under multiple JFs for display.
# Curated membership carried over from the prior bundler.
SG_JF_UNITS = {
    "km": [1, 9, 10],
    "pr": [2, 3, 4, 5, 7, 8],
    "tc": [1, 6, 7, 8, 11],
    "rf": [12],
}
TYPE_TITLES = {"standard": "Standard", "hard": "Hard",
               "definitions": "Definitions", "calculations": "Calculations"}
TYPE_ORDER = ["standard", "hard", "definitions", "calculations"]

LICENSE = "CC BY-NC-SA 4.0"
CREDITS = [
    {"name": "OpenStax — Principles of Finance, Principles of Economics 3e, "
             "Principles of Financial Accounting, Introduction to Business 2e",
     "license": "CC BY-NC-SA 4.0", "url": "https://openstax.org"},
    {"name": "SEC investor.gov glossary", "license": "public domain (U.S. Government work)",
     "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/all"},
    {"name": "FINRA Securities Industry Essentials (SIE) Content Outline",
     "license": "© FINRA — used as the curriculum outline", "url": "https://www.finra.org"},
    {"name": "Federal securities statutes & SEC rules (CFR)",
     "license": "public domain (U.S. law)", "url": "https://www.ecfr.gov"},
    {"name": "SRO rulebooks (FINRA, MSRB, CBOE)",
     "license": "used offline for content grounding only; not redistributed", "url": ""},
]


def load_js_object(path: Path, varname: str) -> dict:
    raw = path.read_text(encoding="utf-8")
    m = re.search(re.escape(varname) + r"\s*=\s*", raw)
    if not m:
        raise SystemExit(f"Could not find '{varname} =' in {path.name}")
    j = raw[m.end():].strip()
    if j.endswith(";"):
        j = j[:-1]
    return json.loads(j.replace("<\\/", "</"))


def load_manifest() -> dict:
    if not SOURCES_JS.exists():
        raise SystemExit(f"{SOURCES_JS.name} not found — run build_sources.py first.")
    return load_js_object(SOURCES_JS, "window.SIE_SOURCES")


def unit_info(manifest):
    """unit_num -> {name, jf}; plus jf -> ordered unit list."""
    info = {int(k): {"name": v["name"], "jf": v["jf"]} for k, v in manifest["units"].items()}
    return info


# ─── Flashcards (now per-unit; cards carry the unit's job function) ──────────

def unit_flashcard_files():
    out = []
    for p in P4.glob("flashcards_unit_*.json"):
        m = re.fullmatch(r"flashcards_unit_(\d+)\.json", p.name)
        if m:
            out.append((int(m.group(1)), p))
    out.sort(key=lambda t: t[0])
    return out


def build_flashcards(units):
    by_unit, by_jf = {}, {}
    for u, meta in sorted(units.items()):
        by_unit[str(u)] = {"unit": u, "unit_name": meta["name"], "cards": []}
    for jf in JF_ORDER:
        by_jf[jf] = {"jf": jf, "jf_name": JF_NAMES[jf], "cards": []}

    for unit, path in unit_flashcard_files():
        data = json.loads(path.read_text(encoding="utf-8"))
        jf = units.get(unit, {}).get("jf")
        for card in data.get("cards", []):
            enriched = {
                "type": card.get("type"),
                "front": card.get("front"),
                "back": card.get("back"),
                "citation": card.get("citation"),
                "unit": unit,
                "unit_name": units.get(unit, {}).get("name"),
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


# ─── Study guides ────────────────────────────────────────────────────────────

def build_study_guides(units):
    by_unit = {}
    for u in sorted(units):
        f = P4 / f"studyguide_unit_{u}.json"
        if not f.exists():
            continue
        g = json.loads(f.read_text(encoding="utf-8"))
        by_unit[str(u)] = {"unit": u, "unit_name": g.get("unit_name", units[u]["name"]),
                           "sections": g.get("sections", [])}

    by_jf = {jf: {"jf": jf, "jf_name": JF_NAMES[jf], "sections": []} for jf in JF_ORDER}
    for jf in JF_ORDER:
        for u in SG_JF_UNITS[jf]:
            if str(u) not in by_unit:
                continue
            uname = by_unit[str(u)]["unit_name"]
            for sec in by_unit[str(u)]["sections"]:
                tagged = dict(sec)
                tagged["_unit"] = u
                tagged["_unit_name"] = uname
                by_jf[jf]["sections"].append(tagged)
    return {"byUnit": by_unit, "byJF": by_jf}


# ─── Reference sheets ────────────────────────────────────────────────────────

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


# ─── Question bank (NEW — pre-generated MCQs, the primary runtime engine) ─────

def build_question_bank(units):
    by_unit = {str(u): [] for u in units}
    by_jf = {jf: [] for jf in JF_ORDER}
    by_type = {tk: [] for tk in TYPE_ORDER}
    n = 0
    for p in sorted(P4.glob("questions_unit_*_*.json")):
        m = re.fullmatch(r"questions_unit_(\d+)_([a-z]+)\.json", p.name)
        if not m:
            continue
        unit, mode = int(m.group(1)), m.group(2)
        data = json.loads(p.read_text(encoding="utf-8"))
        jf = data.get("jf") or units.get(unit, {}).get("jf")
        for i, q in enumerate(data.get("questions", [])):
            item = {
                "id": f"u{unit}-{mode}-{i}",
                "stem": q.get("stem"),
                "choices": q.get("choices", []),
                "answer": q.get("answer"),
                "explanation": q.get("explanation"),
                "citations": q.get("citations", []),
                "unit": unit, "jf": jf, "mode": mode,
            }
            if str(unit) in by_unit:
                by_unit[str(unit)].append(item)
            if jf in by_jf:
                by_jf[jf].append(item)
            if mode in by_type:
                by_type[mode].append(item)
            n += 1
    return {"byUnit": by_unit, "byJF": by_jf, "byType": by_type, "total": n}


# ─── Concept index (from investor.gov build, not preserved-from-Kaplan) ──────

def build_concept_index():
    if not CONCEPT_INDEX.exists():
        print(f"  ! {CONCEPT_INDEX.name} missing — run build_concept_index.py. Shipping empty index.",
              file=sys.stderr)
        return {"version": "0", "term_count": 0, "terms": []}
    return json.loads(CONCEPT_INDEX.read_text(encoding="utf-8"))


# ─── Browser-safe outline (for the optional live booster) ────────────────────

def build_browser_outline(manifest):
    """Ship outline text + topics/bullets only. Drop the rules appendix and any
    corpus refs — the browser never needs (and must not carry) source bodies."""
    jfs = []
    for jf in manifest["outline"]["job_functions"]:
        jfs.append({
            "key": jf["key"], "section_num": jf["section_num"], "name": jf["name"],
            "pct": jf["pct"], "questions": jf["questions"],
            "topics": [{
                "number": t["number"], "title": t["title"],
                "bullets": t.get("bullets", []),
                "subtopics": [{"number": s["number"], "title": s["title"],
                               "bullets": s.get("bullets", [])}
                              for s in t.get("subtopics", [])],
            } for t in jf["topics"]],
        })
    return {"full": manifest["outline"]["full"], "job_functions": jfs}


# ─── Assemble ────────────────────────────────────────────────────────────────

def build():
    manifest = load_manifest()
    units = unit_info(manifest)
    return {
        "version": manifest.get("version", "2.0.0"),
        "generated_at": date.today().isoformat(),
        "meta": {"license": LICENSE, "commercial_use": False, "credits": CREDITS},
        "flashcards": build_flashcards(units),
        "studyGuides": build_study_guides(units),
        "referenceSheets": build_reference_sheets(),
        "questionBank": build_question_bank(units),
        "conceptIndex": build_concept_index(),
        "outline": build_browser_outline(manifest),
    }


def report(d):
    print("─── bundle structure summary ───")
    print("version:", d["version"], "| license:", d["meta"]["license"],
          "| credits:", len(d["meta"]["credits"]))
    fc = d["flashcards"]
    print("flashcards byUnit cards:", {k: len(v["cards"]) for k, v in fc["byUnit"].items()})
    print("flashcards byType cards:", {k: len(v["cards"]) for k, v in fc["byType"].items()})
    print("studyGuides byUnit sections:",
          {k: len(v["sections"]) for k, v in d["studyGuides"]["byUnit"].items()})
    print("referenceSheets:", [s["key"] for s in d["referenceSheets"]])
    qb = d["questionBank"]
    print("questionBank total:", qb["total"],
          "| byType:", {k: len(v) for k, v in qb["byType"].items()})
    print("conceptIndex term_count:", d["conceptIndex"].get("term_count"))
    print("outline job_functions:", [jf["key"] for jf in d["outline"]["job_functions"]],
          "| outline.full chars:", len(d["outline"]["full"]))
    # Leak guard: this is a SHIPPED file — assert no Kaplan token anywhere.
    blob = json.dumps(d, ensure_ascii=False)
    print("LEAK CHECK — 'kaplan' in bundle:", "kaplan" in blob.lower())


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser()
    ap.add_argument("--report", action="store_true",
                    help="build in-memory and print a structure/counts summary (no write)")
    args = ap.parse_args()

    built = build()
    if args.report:
        report(built)
        return 0

    header = ("// SIE Study Tool — browser study data (de-Kaplan v2)\n"
              "// Flashcards, study guides, reference sheets, question bank, concept index,\n"
              "// browser-safe FINRA outline. Generated from public/open sources.\n"
              f"// Content license: {LICENSE} (non-commercial). See meta.credits.\n")
    payload = json.dumps(built, ensure_ascii=False).replace("</", "<\\/")
    OUT_JS.write_text(header + "window.SIE_STUDY_DATA = " + payload + ";\n", encoding="utf-8")
    print(f"Wrote {OUT_JS.name} ({OUT_JS.stat().st_size:,} bytes)")
    report(built)
    return 0


if __name__ == "__main__":
    sys.exit(main())
