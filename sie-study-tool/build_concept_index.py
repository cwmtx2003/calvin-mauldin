#!/usr/bin/env python3
"""
SIE Study Tool — concept-index builder (de-Kaplan overhaul, step 5).

Replaces the Kaplan-derived `conceptIndex` (previously preserved verbatim by
bundle.py) with one built from the SEC investor.gov glossary (public domain,
432 entries). Each term is cross-referenced to the FINRA outline topics and the
app's 12 units via the crosswalk in sie_sources.v2.js, keeping the SAME field
names the app already renders (dsRenderConceptCard) so no UI change is needed:

    term, term_lower, definition,
    manual_refs[] = {unit, lesson, title}   # unit crosswalk (label relabeled in step 7)
    outline_refs[] = {jf, topic}            # outline topic the term maps to

Output: pass4_output/concept_index.json  (bundle.py folds this into sie_study_data.js)

Fully offline — no API key. Reads only the public-domain glossary + v2 manifest.

Usage:
    python build_concept_index.py            # build + write concept_index.json
    python build_concept_index.py --report   # build + print coverage stats only
"""
import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path


HERE = Path(__file__).parent
CORPUS = HERE / "corpus"
GLOSSARY = CORPUS / "Investor.gov_Glossary_Complete.txt"
MANIFEST = HERE / "sie_sources.v2.js"
OUT_DIR = HERE / "pass4_output"
OUT_FILE = OUT_DIR / "concept_index.json"

VERSION = "2.0.0"
# Words too generic to anchor a precise outline match on their own.
STOPWORDS = {
    "a", "an", "the", "and", "or", "of", "to", "in", "for", "on", "plan", "fund",
    "account", "fee", "fees", "rule", "form", "type", "types", "security",
    "securities", "investment", "investor", "market", "order", "value", "rate",
}


def load_manifest() -> dict:
    js = MANIFEST.read_text(encoding="utf-8")
    m = re.search(r"window\.SIE_SOURCES\s*=\s*(\{.*\});\s*$", js, re.DOTALL)
    if not m:
        sys.exit(f"Could not find SIE_SOURCES payload in {MANIFEST.name} "
                 "(run build_sources.py first).")
    return json.loads(m.group(1).replace("<\\/", "</"))


def parse_glossary(text: str):
    """Parse the investor.gov glossary into [{term, definition}, ...]."""
    # Drop the header block (everything up to and including the ==== rule line).
    body = re.split(r"=={5,}\s*\n", text, maxsplit=1)
    body = body[1] if len(body) > 1 else text
    entries = []
    for chunk in re.split(r"\n-{5,}\n", body):
        lines = [ln.rstrip() for ln in chunk.strip("\n").split("\n") if ln.strip()]
        if len(lines) < 2:
            continue
        term = lines[0].strip()
        definition = " ".join(lines[1:]).strip()
        # Drop the trailing "Learn more." breadcrumb the SEC appends.
        definition = re.sub(r"\s*Learn more(?:\s+here(?:\s+and\s+here)?)?\.?\s*$", "",
                            definition).strip()
        if term and definition:
            entries.append({"term": term, "definition": definition})
    return entries


def build_topic_index(manifest: dict):
    """Flatten the outline into searchable topic records for term matching."""
    topics = []
    for jf in manifest["outline"]["job_functions"]:
        for t in jf["topics"]:
            # Haystack: topic title + subtopic titles + all bullets (lowercased).
            hay = [t["title"]]
            for s in t.get("subtopics", []):
                hay.append(s["title"])
                hay += s.get("bullets", [])
            hay += t.get("bullets", [])
            topics.append({
                "topic": t["number"], "title": t["title"], "jf": jf["key"],
                "units": t.get("units", []),
                "hay": " • ".join(hay).lower(),
            })
    return topics


def term_key_phrase(term: str) -> str:
    """Normalize a glossary term for substring matching against the outline."""
    s = term.lower()
    s = re.sub(r"\(.*?\)", " ", s)          # drop parentheticals e.g. "(SEC)"
    s = re.sub(r"[^a-z0-9 \-]", " ", s)     # drop punctuation/quotes
    return re.sub(r"\s+", " ", s).strip()


def match_topics(term: str, topics: list, unit_names: dict):
    """Return (manual_refs, outline_refs) for a term via precise outline matching.

    Strategy: require the whole normalized term phrase (>=4 chars, not a lone
    stopword) to appear in a topic's haystack. Precise over exhaustive — refs are
    supplementary, so partial coverage is fine and false links are worse.
    """
    phrase = term_key_phrase(term)
    if len(phrase) < 4 or phrase in STOPWORDS:
        return [], []
    hits = [t for t in topics if phrase in t["hay"]]
    if not hits:
        return [], []
    outline_refs, manual_refs, seen_units = [], [], set()
    for t in hits[:2]:                       # app renders at most 2 outline refs
        outline_refs.append({"jf": t["jf"], "topic": t["topic"]})
        for u in t["units"]:
            if u not in seen_units and len(manual_refs) < 3:
                seen_units.add(u)
                # lesson = the topic's local number (".M" of "N.M") for a clean label
                lesson = int(t["topic"].split(".")[-1]) if "." in t["topic"] else 1
                manual_refs.append({"unit": u, "lesson": lesson,
                                    "title": unit_names.get(u, t["title"])})
    return manual_refs, outline_refs


def build(report_only: bool):
    if not GLOSSARY.exists():
        sys.exit(f"Glossary not found: {GLOSSARY}")
    manifest = load_manifest()
    unit_names = {int(k): v["name"] for k, v in manifest["units"].items()}
    topics = build_topic_index(manifest)

    raw = parse_glossary(GLOSSARY.read_text(encoding="utf-8-sig"))
    terms = []
    n_xref = n_linked = 0
    for e in raw:
        manual_refs, outline_refs = match_topics(e["term"], topics, unit_names)
        if outline_refs:
            n_linked += 1
        if re.match(r"^See\s+", e["definition"], re.I):
            n_xref += 1
        terms.append({
            "term": e["term"],
            "term_lower": e["term"].lower(),
            "definition": e["definition"],
            "manual_refs": manual_refs,
            "outline_refs": outline_refs,
        })
    terms.sort(key=lambda t: t["term_lower"])

    concept_index = {
        "version": VERSION,
        "generated_at": date.today().isoformat(),
        "source": "SEC investor.gov glossary (public domain)",
        "term_count": len(terms),
        "terms": terms,
    }

    print(f"Parsed {len(terms)} glossary terms "
          f"({len(raw)} raw entries; expected 432).")
    print(f"  cross-ref 'See …' entries: {n_xref}")
    print(f"  terms linked to >=1 outline topic: {n_linked} "
          f"({100*n_linked//max(1,len(terms))}%)")
    if report_only:
        # Show a few sample links for a sanity check.
        for t in terms:
            if t["outline_refs"]:
                print(f"  e.g. {t['term']!r} -> outline {[(r['jf'],r['topic']) for r in t['outline_refs']]} "
                      f"units {[r['unit'] for r in t['manual_refs']]}")
                break
        return

    OUT_DIR.mkdir(exist_ok=True)
    OUT_FILE.write_text(json.dumps(concept_index, ensure_ascii=False, indent=2),
                        encoding="utf-8")
    print(f"Wrote {OUT_FILE.relative_to(HERE)} "
          f"({OUT_FILE.stat().st_size // 1024} KB)")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="Build concept index from investor.gov glossary.")
    ap.add_argument("--report", action="store_true", help="build + print stats, write nothing")
    args = ap.parse_args()
    build(args.report)


if __name__ == "__main__":
    main()
