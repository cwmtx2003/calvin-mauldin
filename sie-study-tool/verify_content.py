#!/usr/bin/env python3
"""
SIE Study Tool — content verification & anti-hallucination QA (de-Kaplan overhaul).

Runs after generation/bundling to catch fabricated citations, stale facts, and
copyright leaks BEFORE anything ships. All checks are offline except the optional
LLM support check (--llm-check, needs ANTHROPIC_API_KEY).

Checks:
  1. CITATION RESOLUTION — every citation ref in generated content must resolve to
     a real rule/section in the corpus (FINRA rule in the zip, CFR § in its part,
     statute § in the act, MSRB/CBOE rule in its book). Fabricated refs fail.
  2. HARD-FACT SCAN — flag known-stale exam values (T+2 settlement, Reg A $50M,
     Reg CF $1.07M, etc.) appearing in generated text as if current.
  3. LEAK SCAN — assert no SHIPPED file contains "Kaplan" or verbatim SRO rule-body
     text, and that sie_sources*.js is not <script>-tagged in index.html.
  4. LLM SUPPORT CHECK (optional) — sample generated items, ask the model whether
     each is supported by its cited primary-source excerpt.
  5. SPOT REVIEW — print a random sample of questions/flashcards for human review.

Usage:
  python verify_content.py                 # all offline checks
  python verify_content.py --sample 8      # + print 8 items for spot review
  python verify_content.py --llm-check 20  # + LLM-grade 20 sampled items (costs API $)

Exit code is non-zero if any HARD check fails (fabricated citations or leaks).
"""
import argparse
import json
import random
import re
import sys
import zipfile
from pathlib import Path

import sie_grounding

HERE = Path(__file__).parent
CORPUS = HERE / "corpus"
P4 = HERE / "pass4_output"

# Files that ship to the browser — must be Kaplan-free and SRO-text-free.
SHIPPED = ["index.html", "sie_app.js", "sie_styles.css", "sie_errata.txt"]
SHIPPED_DATA = ["sie_study_data.js", "sie_study_data.v2.js"]  # whichever exists


def _read(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace") if p.exists() else ""


# ─── 1. Citation resolution ──────────────────────────────────────────────────

def _corpus_glob(prefix):
    hits = sorted(CORPUS.glob(prefix + "*.txt"))
    return hits[0].name if hits else None


def resolve_citation(ref: str):
    """Resolve a free-form citation string to corpus text. Returns (ok, kind)."""
    if not ref or not isinstance(ref, str):
        return False, "empty"
    s = ref.strip()
    # MSRB (G-NN / D-NN)
    m = re.search(r"\b([GD]-\d+\w*)\b", s)
    if m and re.search(r"MSRB|G-\d|D-\d", s):
        return (sie_grounding.extract_msrb_rule(m.group(1)) is not None), "msrb"
    # CBOE (decimal rule like 1.1, 7.10) — only when CBOE named
    if re.search(r"CBOE", s, re.I):
        cm = re.search(r"\b(\d+\.\d+)\b", s)
        if cm:
            return (sie_grounding.extract_cboe_rule(cm.group(1)) is not None), "cboe"
    # CFR (e.g. "17 CFR 240.10b-18", "12 CFR 220.4")
    cm = re.search(r"\b(\d+)\s*CFR\s*(\d+)\.([\w.\-]+)", s, re.I)
    if cm:
        title, part, rule = cm.group(1), cm.group(2), cm.group(3)
        part_file = _corpus_glob(f"{title} CFR Part {part}")
        if not part_file:
            return False, "cfr-no-part"
        return (sie_grounding.extract_cfr_rule(part_file, f"{part}.{rule}") is not None), "cfr"
    # Statute section ("<Act> §15A" / "Section 3(a)(39)"). Anchor the section to
    # the § or "Section" marker — otherwise the regex grabs the year in the act
    # name (1933/1934/1940) as the section number.
    for act, fn in sie_grounding.ACT_FILES.items():
        if act.lower() in s.lower():
            sm = re.search(r"(?:§|Section)\s*(\d+[A-Za-z()0-9]*)", s)
            if sm:
                return (sie_grounding.extract_statute_section(fn, sm.group(1)) is not None), "statute"
            return False, "statute-no-section"
    # FINRA rule ("Rule 2266", "2266", "3110(e)")
    fm = re.search(r"\b(\d{3,4})\b", s)
    if fm and re.search(r"FINRA|Rule\s+\d", s):
        return (sie_grounding.extract_finra_rule(fm.group(1)) is not None), "finra"
    # Bare FINRA number with no qualifier
    if fm:
        return (sie_grounding.extract_finra_rule(fm.group(1)) is not None), "finra?"
    # Outline references are always "valid" (the outline is the spine)
    if re.search(r"outline|§?\s*\d\.\d", s, re.I):
        return True, "outline"
    return False, "unrecognized"


def collect_citation_refs():
    """Gather (source_file, ref_string) from all generated content."""
    refs = []
    for p in sorted(P4.glob("questions_unit_*.json")):
        d = json.loads(_read(p) or "{}")
        for q in d.get("questions", []):
            for c in q.get("citations", []):
                refs.append((p.name, c if isinstance(c, str) else json.dumps(c)))
    for p in sorted(P4.glob("flashcards_unit_*.json")):
        d = json.loads(_read(p) or "{}")
        for c in d.get("cards", []):
            if c.get("citation"):
                refs.append((p.name, c["citation"]))
    return refs


def check_citations():
    refs = collect_citation_refs()
    if not refs:
        print("  (no citations found in generated content — run generate.py first)")
        return True, 0, 0
    bad = []
    for fname, ref in refs:
        ok, kind = resolve_citation(ref)
        if not ok:
            bad.append((fname, ref, kind))
    total = len(refs)
    print(f"  citations checked: {total}  resolved: {total - len(bad)}  FABRICATED: {len(bad)}")
    for fname, ref, kind in bad[:25]:
        print(f"    ✗ [{fname}] {ref!r}  ({kind})")
    if len(bad) > 25:
        print(f"    … and {len(bad) - 25} more")
    return len(bad) == 0, total, len(bad)


# ─── 2. Hard-fact stale-value scan ───────────────────────────────────────────
# Each entry: (label, regex matching a STALE value, legit_context regex|None).
# legit_context: if it matches near the hit, the value is being used correctly in
# a DIFFERENT (still-valid) context — e.g. "redemption gate" is obsolete for money
# market funds but normal for hedge/private funds — so the hit is not an error.
STALE_PATTERNS = [
    ("settlement T+2 (now T+1)", re.compile(r"\bT\+?\s*2\b.{0,40}(settl|regular[-\s]?way)|"
                                            r"(settl|regular[-\s]?way).{0,40}\bT\+?\s*2\b", re.I), None),
    ("Reg A Tier 2 $50M (now $75M)", re.compile(r"Tier\s*2.{0,30}\$?\s*50\s*million|"
                                                r"\$50\s*million.{0,30}Tier\s*2", re.I), None),
    ("Reg CF cap $1.07M (now $5M)", re.compile(r"\$?\s*1\.07\s*million|\$1,070,000", re.I), None),
    ("CE Reg Element 120-day/anniversary cycle (now annual)",
     re.compile(r"120\s*days.{0,40}(continuing education|regulatory element)|"
                r"(second|fifth|tenth)[-\s]?(year|anniversary).{0,30}(continuing education|registration)", re.I), None),
    ("MMF redemption gates (authority removed 2023)", re.compile(r"redemption\s+gate", re.I),
     re.compile(r"hedge|private\s+fund|lock[-\s]?up|notice\s+period|3\(c\)", re.I)),
]


# A stale value mentioned ALONGSIDE a correction signal is a legitimate "it
# changed from X to Y" statement, not an error — only flag naked stale assertions.
CORRECTION_SIGNAL = re.compile(
    r"T\+?\s*1|now|chang|shorten|moved|updat|effective|eliminat|remov|formerly|"
    r"previously|\bwas\b|no longer|replaced|stale|obsolete|prior\s+to|\$75|"
    r"\$5\s*million|annual", re.I)


def _scan_text(text, patterns, window_pad=120):
    """Flag stale-value hits in a free-text blob (no MCQ structure)."""
    hits = []
    for label, rx, legit in patterns:
        for m in rx.finditer(text):
            window = text[max(0, m.start() - window_pad):m.end() + window_pad]
            if legit and legit.search(window):
                continue  # valid use in a different (still-current) context
            if CORRECTION_SIGNAL.search(window):
                continue  # correctly framed as a past/changed value
            snippet = text[max(0, m.start() - 30):m.end() + 30].replace("\n", " ")
            hits.append((label, snippet.strip()))
    return hits


def _scan_question(q, patterns):
    """Flag stale values ASSERTED AS TRUE in one MCQ.

    A stale value sitting in a distractor (a wrong-answer choice) is intentional —
    that is exactly what a hard question tests — so distractors are never scanned.
    Only the stem, the CORRECT answer, and the explanation are read as assertions,
    and the explanation may legitimately cite a stale value when it corrects it.
    """
    choices = q.get("choices") or []
    ai = q.get("answer")
    answer_txt = choices[ai] if isinstance(ai, int) and 0 <= ai < len(choices) else ""
    asserted = "\n".join([q.get("stem") or "", answer_txt, q.get("explanation") or ""])
    return _scan_text(asserted, patterns)


def check_hard_facts():
    flagged = []
    # Question files: structured scan (ignore stale values used as distractors).
    for p in sorted(P4.glob("questions_unit_*.json")):
        d = json.loads(_read(p) or "{}")
        for q in d.get("questions", []):
            for label, snip in _scan_question(q, STALE_PATTERNS):
                flagged.append((p.name, label, snip))
    # Other generated prose: windowed scan with legit-context + correction guards.
    others = (list(P4.glob("flashcards_unit_*.json")) + list(P4.glob("studyguide_unit_*.json"))
              + list(P4.glob("reference_*.json")))
    for p in sorted(others):
        for label, snip in _scan_text(_read(p), STALE_PATTERNS):
            flagged.append((p.name, label, snip))
    print(f"  naked stale-fact assertions (excluding distractors & 'changed from X to Y' mentions): {len(flagged)}")
    for fname, label, snip in flagged[:20]:
        print(f"    ⚠ [{fname}] {label}: …{snip}…")
    # Soft check: warnings for human review, not a hard fail.
    return True, len(flagged)


# ─── 3. Leak scan (HARD) ─────────────────────────────────────────────────────

def sro_signatures():
    """Distinctive mid-body substrings from SRO rule text that must NOT ship."""
    sigs = []
    finra = sie_grounding.extract_finra_rule("3220")
    if finra and len(finra) > 200:
        sigs.append(("FINRA Rule 3220 body", finra[120:200].strip()))
    msrb = sie_grounding.extract_msrb_rule("G-20")
    if msrb and len(msrb) > 200:
        sigs.append(("MSRB Rule G-20 body", msrb[120:200].strip()))
    cboe = sie_grounding.extract_cboe_rule("1.1")
    if cboe and len(cboe) > 300:
        sigs.append(("CBOE Rule 1.1 body", cboe[200:280].strip()))
    return [(name, s) for name, s in sigs if len(s) > 40]


def check_leaks():
    ok = True
    data_file = next((f for f in SHIPPED_DATA if (HERE / f).exists()), None)
    files = [HERE / f for f in SHIPPED] + ([HERE / data_file] if data_file else [])
    contents = {p.name: _read(p) for p in files if p.exists()}

    # (a) No "Kaplan" anywhere in shipped files.
    for name, txt in contents.items():
        n = txt.lower().count("kaplan")
        if n:
            ok = False
            print(f"    ✗ '{name}' contains 'kaplan' x{n}")
    if all("kaplan" not in t.lower() for t in contents.values()):
        print(f"    ✓ no 'kaplan' in {len(contents)} shipped files")

    # (b) sie_sources*.js not <script>-tagged in index.html.
    idx = contents.get("index.html", "")
    if re.search(r"<script[^>]+sie_sources", idx):
        ok = False
        print("    ✗ index.html still <script>-loads sie_sources*.js")
    else:
        print("    ✓ index.html does not load sie_sources*.js")

    # (c) No verbatim SRO rule body text in the shipped data file.
    sigs = sro_signatures()
    if not data_file:
        print("    (no shipped data file yet — SRO-leak check deferred)")
    else:
        data_txt = contents.get(data_file, "")
        leaked = [name for name, sig in sigs if sig and sig in data_txt]
        if leaked:
            ok = False
            for name in leaked:
                print(f"    ✗ SRO text leaked into {data_file}: {name}")
        else:
            print(f"    ✓ no SRO rule-body signatures in {data_file} ({len(sigs)} probes)")
    return ok


# ─── 4. LLM support check (optional, costs API $) ────────────────────────────

def check_llm_support(n):
    try:
        import generate
        api_key = generate.get_api_key()
    except SystemExit:
        print("  (no API key — skipping LLM support check)")
        return True
    items = []
    for p in sorted(P4.glob("questions_unit_*.json")):
        d = json.loads(_read(p) or "{}")
        for q in d.get("questions", []):
            items.append((q, d.get("jf")))
    if not items:
        print("  (no generated questions to grade)")
        return True
    random.shuffle(items)
    sample = items[:n]
    verdicts = {"supported": 0, "unsupported": 0, "uncertain": 0}
    manifest = sie_grounding.load_manifest()
    for q, jf in sample:
        grounding = sie_grounding.resolve_grounding(manifest, jf or "pr")["text"][:12000]
        sys_p = ("You grade whether an exam item is SUPPORTED by the provided source "
                 "excerpt. Reply with exactly one word: supported, unsupported, or uncertain.")
        user = (f"SOURCE EXCERPT:\n{grounding}\n\nITEM: {q.get('stem')}\n"
                f"CORRECT ANSWER: {(q.get('choices') or ['?'])[q.get('answer', 0)]}\n"
                f"EXPLANATION: {q.get('explanation')}")
        try:
            r = generate.call_opus(api_key, sys_p, user, max_tokens=10, max_retries=2)
            verdict = r["content"][0]["text"].strip().lower().split()[0]
        except Exception as e:
            verdict = "uncertain"
        verdicts[verdict if verdict in verdicts else "uncertain"] += 1
    print(f"  LLM support over {len(sample)}: {verdicts}")
    if verdicts["unsupported"]:
        print("    ⚠ review all 'unsupported' items before shipping.")
    return True


# ─── 5. Spot review ──────────────────────────────────────────────────────────

def spot_review(n):
    pool = []
    for p in sorted(P4.glob("questions_unit_*.json")):
        d = json.loads(_read(p) or "{}")
        for q in d.get("questions", []):
            pool.append((p.name, q))
    if not pool:
        print("  (no questions to sample)")
        return
    random.shuffle(pool)
    for fname, q in pool[:n]:
        ans = (q.get("choices") or ["?"])[q.get("answer", 0)] if q.get("choices") else "?"
        print(f"\n  [{fname}] {q.get('stem')}")
        for i, c in enumerate(q.get("choices", [])):
            mark = "*" if i == q.get("answer") else " "
            print(f"     {mark} {chr(65 + i)}. {c}")
        print(f"     -> {ans}")
        print(f"     cite: {q.get('citations')}")


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="Verify SIE generated content (anti-hallucination + leak scan).")
    ap.add_argument("--sample", type=int, default=0, help="print N items for spot review")
    ap.add_argument("--llm-check", type=int, default=0, help="LLM-grade N sampled items (costs API $)")
    args = ap.parse_args()

    hard_ok = True
    print("─── 1. Citation resolution ───────────────────────────")
    ok, _, _ = check_citations(); hard_ok &= ok
    print("─── 2. Hard-fact stale-value scan ────────────────────")
    check_hard_facts()
    print("─── 3. Leak scan (Kaplan / SRO) ──────────────────────")
    ok = check_leaks(); hard_ok &= ok
    if args.llm_check:
        print("─── 4. LLM support check ─────────────────────────────")
        check_llm_support(args.llm_check)
    if args.sample:
        print("─── 5. Spot review ───────────────────────────────────")
        spot_review(args.sample)

    print("\n" + ("✓ PASS — no fabricated citations or leaks." if hard_ok
                  else "✗ FAIL — hard checks failed (see above)."))
    return 0 if hard_ok else 1


if __name__ == "__main__":
    sys.exit(main())
