#!/usr/bin/env python3
"""
SIE Study Tool — source-layer builder (de-Kaplan overhaul, step 2).

Parses the FINRA SIE Content Outline into an outline-keyed spine, attaches each
section's "Rules" appendix to deterministic corpus sources, crosswalks the
outline to the app's 12-unit taxonomy, and writes:

    sie_sources.js   — OFFLINE build manifest (window.SIE_SOURCES). NOT shipped
                       to the browser and NOT script-tagged in index.html. The
                       generator (generate.py) reads it at content-gen time.
    source_map.json  — editable, human-reviewable topic->source mapping table.
                       Seeded from the outline's own rule references; refine by
                       hand, then re-run with --use-map to fold edits back in.

No Kaplan text or filenames are read or written here. SRO sources
(FINRA/MSRB/CBOE) are REFERENCED by path only with ship:false — their text is
never embedded; generate.py reads them from corpus/ at gen time.

Usage:
    python build_sources.py            # build manifest + seed source_map.json
    python build_sources.py --report   # parse + print summary, write nothing
    python build_sources.py --use-map  # fold hand-edited source_map.json back in

Inputs (read-only): corpus/SIE_Content_Outline.txt + the public-domain corpus.
"""
import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path


HERE = Path(__file__).parent
CORPUS = HERE / "corpus"
OUTLINE_FILE = CORPUS / "SIE_Content_Outline.txt"
# Staging filename: the live sie_sources.js (Kaplan) stays in place until the
# integration cutover (rename + drop the index.html <script> tag) in a later step.
OUT_SOURCES = HERE / "sie_sources.v2.js"
OUT_MAP = HERE / "source_map.json"

VERSION = "2.0.0"
GENERATED_AT = date.today().isoformat()


# ─── Outline → app crosswalk (section N maps 1:1 to a job function) ──────────
# JF keys + unit assignments mirror sie_app.js (JF_UNITS / JF_NAMES). The 12-unit
# taxonomy is Calvin's own work; the outline is the primary spine and units hang
# off it. Topic-level unit refinement lives in source_map.json.
JF_BY_SECTION = {1: "km", 2: "pr", 3: "tc", 4: "rf"}
JF_NAMES = {
    "km": "Knowledge of Capital Markets",
    "pr": "Understanding Products & Their Risks",
    "tc": "Trading, Customer Accounts & Prohibited Activities",
    "rf": "Overview of the Regulatory Framework",
}
JF_UNITS = {"km": [1, 9], "pr": [2, 3, 4, 5], "tc": [6, 7, 8, 11], "rf": [10, 12]}
UNIT_NAMES = {
    1: "Primary & Secondary Markets", 2: "Equity Securities", 3: "Debt Securities",
    4: "Investment Companies & Insurance", 5: "Other Investment Vehicles",
    6: "Customer Accounts", 7: "Risk & Recommendations", 8: "Tax & Yields",
    9: "Economics", 10: "Regulators", 11: "Regulatory Issues & Ethics",
    12: "Joining & Leaving a Member Firm",
}
# Section %/item counts straight from the outline's structure table.
SECTION_META = {
    1: {"pct": 16, "questions": 12}, 2: {"pct": 44, "questions": 33},
    3: {"pct": 31, "questions": 23}, 4: {"pct": 9, "questions": 7},
}


# ─── Source registry: deterministic Act/CFR/SRO → corpus file resolution ─────
# A statute Act-name -> (registry id, shippable file). All public domain.
ACT_FILES = {
    "Securities Act of 1933": ("SA33", "Securities_Act_of_1933.txt"),
    "Securities Exchange Act of 1934": ("SEA34", "sea34.txt"),
    "Investment Company Act of 1940": ("ICA40", "Investment Company Act of 1940.txt"),
    "Investment Advisers Act of 1940": ("IAA40", "INVESTMENT ADVISERS ACT OF 1940.txt"),
    "Investment Adviser Act of 1940": ("IAA40", "INVESTMENT ADVISERS ACT OF 1940.txt"),
    "Securities Investor Protection Act of 1970": ("SIPA70", "sipa70.txt"),
}
# Numeric SEC rules cited under an Act resolve to that Act's CFR part. CFR part
# files carry an "(up to date as of ...)" suffix, so resolve by glob prefix.
ACT_CFR_PART = {
    "SA33": "17 CFR Part 230", "SEA34": "17 CFR Part 240",
    "ICA40": "17 CFR Part 270", "IAA40": "17 CFR Part 275",  # 275 not in corpus
}
# Named Regulations -> CFR part (Reg D lives in 230; M/SHO in 242; S-P in 248; T in 12 CFR 220).
REG_CFR_PART = {
    "Regulation D": "17 CFR Part 230", "Regulation M": "17 CFR Part 242",
    "Regulation SHO": "17 CFR Part 242", "Regulation S-P": "17 CFR Part 248",
    "Regulation T": "12 CFR Part 220",
}
# SRO rulebooks — REFERENCED ONLY, never shipped (ship:false).
SRO_FILES = {
    "FINRA": ("FINRA", "FINRA_Rules_and_ByLaws.zip"),
    "MSRB": ("MSRB", "MSRB-Rule-Book-Current-Version.txt"),
    "CBOE": ("CBOE", "C1_Exchange_Rule_Book.txt"),
}


def cfr_path(part_label: str):
    """Return the corpus path for a CFR part by glob prefix, or None if absent."""
    hits = sorted(CORPUS.glob(part_label + "*.txt"))
    return hits[0].name if hits else None


# ─── Outline parsing ─────────────────────────────────────────────────────────

RE_SECTION = re.compile(r"^Section (\d):\s+(.+?)\s*$")
RE_TOPIC = re.compile(r"^(\d\.\d+)\s+(\S.+?)\s*$")
RE_SUBTOPIC = re.compile(r"^(\d\.\d+\.\d+)\s+(\S.+?)\s*$")
RE_RULE_ENTRY = re.compile(r"^\s*(?:Rule\s+)?([A-Za-z0-9().\-/]+(?:\([a-z0-9]+\))*)\s+[–—-]\s+(.+?)\s*$")
RE_SECTION_ENTRY = re.compile(r"^\s*Section\s+([0-9A-Za-z().\-]+)\s+[–—-]\s+(.+?)\s*$")
RE_PAGENUM = re.compile(r"^\s*\d{1,3}\s*$")
BULLET_CHARS = "•"  # primary bullet + common Wingdings sub-bullet glyphs


def is_bullet(line: str) -> bool:
    s = line.lstrip()
    return bool(s) and s[0] in BULLET_CHARS


def parse_outline(text: str):
    """Parse the outline into sections -> topics -> subtopics/bullets + rules appendix."""
    lines = text.split("\n")
    sections = []
    cur_sec = cur_topic = cur_sub = None
    in_rules = False
    rules_group = None          # "finra" | "msrb" | "cboe" | "sec"
    sec_act = None              # current Act context within an SEC rules block

    def new_topic_bucket():
        return {"number": None, "title": None, "subtopics": [], "bullets": []}

    for raw in lines:
        line = raw.rstrip("\r")
        stripped = line.strip()
        if not stripped or RE_PAGENUM.match(line):
            continue

        m = RE_SECTION.match(line)
        if m:
            num = int(m.group(1))
            cur_sec = {
                "section_num": num, "name": m.group(2).strip(),
                "jf": JF_BY_SECTION.get(num), "topics": [],
                "rules": {"finra": [], "msrb": [], "cboe": [], "sec": []},
            }
            sections.append(cur_sec)
            cur_topic = cur_sub = None
            in_rules = False
            rules_group = sec_act = None
            continue
        if cur_sec is None:
            continue  # skip the front-matter preamble before Section 1

        # Rules appendix boundary.
        if stripped == "Rules":
            in_rules = True
            rules_group = sec_act = None
            continue

        if in_rules:
            low = stripped.lower().rstrip("s ").rstrip()
            if low.startswith("finra rule"):
                rules_group, sec_act = "finra", None; continue
            if low.startswith("msrb rule"):
                rules_group, sec_act = "msrb", None; continue
            if low.startswith("cboe rule"):
                rules_group, sec_act = "cboe", None; continue
            if stripped.lower().startswith("sec rules and regulation"):
                rules_group, sec_act = "sec", None; continue
            if rules_group == "sec":
                act_key = stripped.rstrip(" (SIPA)").strip()
                # Act header lines under "SEC Rules and Regulations".
                matched_act = next((a for a in ACT_FILES if act_key.startswith(a)), None)
                if matched_act and " – " not in stripped and " — " not in stripped:
                    sec_act = matched_act
                    continue
            if rules_group:
                sm = RE_SECTION_ENTRY.match(line)
                if sm:
                    cur_sec["rules"][rules_group].append(
                        {"ref": "Section " + sm.group(1), "title": sm.group(2).strip(), "act": sec_act})
                    continue
                rm = RE_RULE_ENTRY.match(line)
                if rm:
                    cur_sec["rules"][rules_group].append(
                        {"ref": rm.group(1), "title": rm.group(2).strip(), "act": sec_act})
                    continue
            continue  # ignore stray lines inside the appendix

        # Normal outline body.
        sm = RE_SUBTOPIC.match(line)
        if sm:
            cur_sub = {"number": sm.group(1), "title": sm.group(2).strip(), "bullets": []}
            if cur_topic:
                cur_topic["subtopics"].append(cur_sub)
            continue
        tm = RE_TOPIC.match(line)
        if tm:
            cur_topic = new_topic_bucket()
            cur_topic["number"], cur_topic["title"] = tm.group(1), tm.group(2).strip()
            cur_sec["topics"].append(cur_topic)
            cur_sub = None
            continue
        if is_bullet(line):
            text_b = line.lstrip().lstrip(BULLET_CHARS).strip()
            target = cur_sub if cur_sub else cur_topic
            if target is not None and text_b:
                target["bullets"].append(text_b)
            continue
        # sub-bullet / continuation (indented, no bullet glyph): append to last bullet
        target = cur_sub if cur_sub else cur_topic
        if target and target["bullets"]:
            target["bullets"][-1] += " / " + stripped

    return sections


# ─── Source registry assembly ────────────────────────────────────────────────

def build_registry(sections):
    """Collect every distinct cited source into a registry keyed by id."""
    registry = {}

    def add(rid, typ, name, filename, ship, license_):
        path = "corpus/" + filename if filename else None
        present = bool(filename) and (CORPUS / filename).exists()
        registry.setdefault(rid, {
            "type": typ, "name": name, "path": path, "ship": ship,
            "license": license_, "present": present,
        })

    for f in ("Securities_Act_of_1933.txt", "sea34.txt", "Investment Company Act of 1940.txt",
              "INVESTMENT ADVISERS ACT OF 1940.txt", "sipa70.txt"):
        pass  # statutes added lazily as referenced (below)

    for sec in sections:
        for grp, items in sec["rules"].items():
            for it in items:
                for ref in resolve_ref(grp, it):
                    rid = ref["id"]
                    if grp == "finra":
                        _, fn = SRO_FILES["FINRA"]; add(rid, "sro", "FINRA Rulebook", fn, False, "SRO")
                    elif grp == "msrb":
                        _, fn = SRO_FILES["MSRB"]; add(rid, "sro", "MSRB Rulebook", fn, False, "SRO")
                    elif grp == "cboe":
                        _, fn = SRO_FILES["CBOE"]; add(rid, "sro", "CBOE C1 Rulebook", fn, False, "SRO")
                    else:  # sec statute or cfr
                        add(rid, ref["type"], ref["name"], ref.get("filename"), True, "public-domain")
    return registry


def resolve_ref(group: str, item: dict):
    """Map one parsed rule entry to one or more registry-bound source refs."""
    ref, act = item["ref"], item.get("act")
    if group == "finra":
        return [{"id": "FINRA", "type": "sro", "name": "FINRA Rulebook",
                 "ref": "Rule " + ref, "ship": False}]
    if group == "msrb":
        return [{"id": "MSRB", "type": "sro", "name": "MSRB Rulebook",
                 "ref": "Rule " + ref, "ship": False}]
    if group == "cboe":
        return [{"id": "CBOE", "type": "sro", "name": "CBOE C1 Rulebook",
                 "ref": "Rule " + ref, "ship": False}]
    # SEC group: statute Section vs numeric CFR rule, under the current Act.
    if ref.startswith("Section"):
        if act and act in ACT_FILES:
            rid, fn = ACT_FILES[act]
            return [{"id": rid, "type": "statute", "name": act, "filename": fn,
                     "ref": ref, "locator": "§" + ref.replace("Section ", ""), "ship": True}]
        return [{"id": "UNRESOLVED", "type": "statute", "name": act or "?", "ref": ref, "ship": True}]
    if ref.startswith("Regulation"):
        part = REG_CFR_PART.get(item["title"].split(" –")[0].strip(), None) or REG_CFR_PART.get(ref, None)
        # ref here is the token; named regs may arrive as "Regulation" + title — guard generically
        part = part or REG_CFR_PART.get(ref, "17 CFR Part 230")
        fn = cfr_path(part)
        return [{"id": part.replace(" ", "_"), "type": "cfr", "name": part,
                 "filename": fn, "ref": ref, "ship": True}]
    # numeric / alphanumeric CFR rule under an Act (e.g. 215, 144A, 10b-18, 12b-1).
    if act:
        rid, _ = ACT_FILES.get(act, (None, None))
        part = ACT_CFR_PART.get(rid)
        if part:
            fn = cfr_path(part)
            return [{"id": part.replace(" ", "_"), "type": "cfr", "name": part,
                     "filename": fn, "ref": ref, "locator": part.split("Part ")[-1] + "." + ref, "ship": True}]
    return [{"id": "UNRESOLVED", "type": "cfr", "name": act or "?", "ref": ref, "ship": True}]


# ─── source_map.json (editable topic->source seed) ───────────────────────────

def build_source_map(sections):
    """Seed an editable topic->source table from each section's rule appendix.

    Section-level rules are deterministic backbone; topic-level refinement (which
    bullet cites which §) is left for human review here, not guessed in code.
    The glossary + OpenStax attachments are also authored here by hand.
    """
    table = {}
    for sec in sections:
        jf = sec["jf"]
        sec_refs = []
        for grp, items in sec["rules"].items():
            for it in items:
                for r in resolve_ref(grp, it):
                    sec_refs.append({"id": r["id"], "ref": r.get("ref"),
                                     "ship": r["ship"], "type": r["type"]})
        for topic in sec["topics"]:
            table[topic["number"]] = {
                "title": topic["title"], "jf": jf, "units": JF_UNITS[jf],
                "section_sources": sec_refs,     # deterministic backbone (section-wide)
                "topic_sources": [],             # ← refine by hand: bullet-specific refs
                "openstax": [],                  # ← add OpenStax §N.N excerpts by hand
                "glossary_terms": [],            # ← add investor.gov terms by hand
            }
    return {"_README": "Edit topic_sources/openstax/glossary_terms, then re-run "
            "build_sources.py --use-map. section_sources are auto-derived; do not edit.",
            "version": VERSION, "topics": table}


# ─── Manifest assembly + emit ────────────────────────────────────────────────

def build_manifest(sections, registry, outline_full, source_map=None):
    job_functions = []
    for sec in sections:
        jf = sec["jf"]
        topics_out = []
        for t in sec["topics"]:
            entry = {
                "number": t["number"], "title": t["title"],
                "bullets": t["bullets"],
                "subtopics": [{"number": s["number"], "title": s["title"],
                               "bullets": s["bullets"]} for s in t["subtopics"]],
                "units": JF_UNITS[jf],
            }
            if source_map:
                mapped = source_map["topics"].get(t["number"], {})
                entry["sources"] = mapped.get("topic_sources", [])
                entry["openstax"] = mapped.get("openstax", [])
                entry["glossary_terms"] = mapped.get("glossary_terms", [])
            topics_out.append(entry)
        job_functions.append({
            "key": jf, "section_num": sec["section_num"], "name": JF_NAMES[jf],
            "pct": SECTION_META[sec["section_num"]]["pct"],
            "questions": SECTION_META[sec["section_num"]]["questions"],
            "topics": topics_out,
            "rules": sec["rules"],
        })

    units = {}
    for jf, unit_nums in JF_UNITS.items():
        for n in unit_nums:
            units[str(n)] = {"num": n, "name": UNIT_NAMES[n], "jf": jf,
                             "topics": [t["number"] for s in sections if s["jf"] == jf
                                        for t in s["topics"]]}

    return {
        "version": VERSION,
        "generated_at": GENERATED_AT,
        "license": {"generated_content": "CC BY-NC-SA 4.0", "commercial_use": False},
        "source_registry": registry,
        "outline": {"full": outline_full, "job_functions": job_functions},
        "units": units,
        "glossary": {"source": "investor.gov", "license": "public-domain",
                     "path": "corpus/Investor.gov_Glossary_Complete.txt"},
    }


def emit_sources_js(manifest):
    payload = json.dumps(manifest, ensure_ascii=False, indent=1)
    payload = payload.replace("</", "<\\/")  # mirror generate.py's unescape contract
    header = (
        "// ═══════════════════════════════════════════════════════════════════\n"
        "// SIE_SOURCES — OFFLINE build manifest (de-Kaplan overhaul).\n"
        "// NOT shipped to the browser; NOT script-tagged in index.html.\n"
        "// Built by build_sources.py from the FINRA SIE Content Outline + the\n"
        "// public-domain corpus. SRO refs (ship:false) are read from corpus/ at\n"
        "// generation time only and never embedded. No Kaplan material.\n"
        "// ═══════════════════════════════════════════════════════════════════\n"
    )
    OUT_SOURCES.write_text(header + "window.SIE_SOURCES = " + payload + ";\n", encoding="utf-8")


# ─── Report ──────────────────────────────────────────────────────────────────

def report(sections, registry):
    print("─── Outline parse summary ─────────────────────────────")
    for sec in sections:
        n_topics = len(sec["topics"])
        n_sub = sum(len(t["subtopics"]) for t in sec["topics"])
        n_bul = sum(len(t["bullets"]) + sum(len(s["bullets"]) for s in t["subtopics"])
                    for t in sec["topics"])
        rc = {g: len(v) for g, v in sec["rules"].items()}
        print(f"Section {sec['section_num']} [{sec['jf']}] {sec['name']}")
        print(f"   topics={n_topics}  subtopics={n_sub}  bullets={n_bul}  rules={rc}")
    print("─── Source registry ───────────────────────────────────")
    missing = []
    for rid, r in sorted(registry.items()):
        flag = "ship" if r["ship"] else "OFFLINE"
        ok = "ok" if r["present"] else "MISSING-FILE"
        if not r["present"]:
            missing.append(rid)
        print(f"   {rid:18} {r['type']:8} {flag:7} {ok:12} {r['path']}")
    unresolved = [rid for rid in registry if rid == "UNRESOLVED"]
    if unresolved:
        print(f"\n⚠ UNRESOLVED refs present — refine resolver or source_map.")
    if missing:
        print(f"⚠ Missing corpus files for: {', '.join(missing)} "
              f"(expected absent: 17_CFR_Part_275 — IAA rules, no file in corpus).")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # Windows console is cp1252 by default
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="Build SIE offline source manifest.")
    ap.add_argument("--report", action="store_true", help="parse + print summary, write nothing")
    ap.add_argument("--use-map", action="store_true", help="fold hand-edited source_map.json into manifest")
    args = ap.parse_args()

    if not OUTLINE_FILE.exists():
        sys.exit(f"Outline not found: {OUTLINE_FILE}")
    raw = OUTLINE_FILE.read_text(encoding="utf-8-sig")
    sections = parse_outline(raw)
    if len(sections) != 4:
        print(f"⚠ Expected 4 sections, parsed {len(sections)}", file=sys.stderr)
    registry = build_registry(sections)

    if args.report:
        report(sections, registry)
        return

    source_map = None
    if args.use_map:
        if not OUT_MAP.exists():
            sys.exit(f"--use-map given but {OUT_MAP.name} not found; run without it first.")
        source_map = json.loads(OUT_MAP.read_text(encoding="utf-8"))
        print(f"Folding hand-edited {OUT_MAP.name} into manifest.")
    else:
        seed = build_source_map(sections)
        if OUT_MAP.exists():
            print(f"Note: {OUT_MAP.name} exists — not overwriting. Delete it to re-seed.")
        else:
            OUT_MAP.write_text(json.dumps(seed, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"Seeded editable mapping table -> {OUT_MAP.name}")

    manifest = build_manifest(sections, registry, raw, source_map)
    emit_sources_js(manifest)
    print(f"Wrote {OUT_SOURCES.name} ({OUT_SOURCES.stat().st_size // 1024} KB)")
    report(sections, registry)


if __name__ == "__main__":
    main()
