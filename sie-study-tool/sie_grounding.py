#!/usr/bin/env python3
"""
SIE Study Tool — corpus grounding + citation resolution (de-Kaplan overhaul).

Shared, OFFLINE module used by generate.py (assemble grounding text at content-gen
time) and the later verify_content.py (resolve generated citations against the
corpus). Replaces Kaplan lesson text with on-demand excerpts pulled from the
public-domain statutes/CFR (ship:true) and — at generation time only — the SRO
rulebooks (FINRA/MSRB/CBOE, ship:false, never written downstream).

Extractors (all read corpus/ directly):
    extract_statute_section(act_file, "15A")   -> Securities/Exchange Act § text
    extract_cfr_rule(part_file, "240.10b-5")   -> CFR rule text
    extract_finra_rule("2266")                 -> FINRA rule (zip member, gen-time only)
    extract_cboe_rule("1.1")                   -> CBOE C1 rule text (gen-time only)
    extract_msrb_rule("G-17")                  -> MSRB rule (best-effort window, gen-time only)

resolve_grounding(manifest, jf_key) assembles a grounding bundle for a job
function / its topics: outline bullets (public) + ship:true statute/CFR excerpts
+ SRO excerpts (gen-time). It also reports which citations resolved, so
verify_content.py can flag fabricated refs.

Self-test (no API key, runs against the real corpus):
    python sie_grounding.py --selftest
"""
import argparse
import functools
import re
import sys
import zipfile
from pathlib import Path


HERE = Path(__file__).parent
CORPUS = HERE / "corpus"
MANIFEST = HERE / "sie_sources.v2.js"

FINRA_ZIP = CORPUS / "FINRA_Rules_and_ByLaws.zip"
MSRB_FILE = CORPUS / "MSRB-Rule-Book-Current-Version.txt"
CBOE_FILE = CORPUS / "C1_Exchange_Rule_Book.txt"

# Act name -> public-domain statute file (ship:true). Mirrors build_sources.py.
ACT_FILES = {
    "Securities Act of 1933": "Securities_Act_of_1933.txt",
    "Securities Exchange Act of 1934": "sea34.txt",
    "Investment Company Act of 1940": "Investment Company Act of 1940.txt",
    "Investment Advisers Act of 1940": "INVESTMENT ADVISERS ACT OF 1940.txt",
    "Investment Adviser Act of 1940": "INVESTMENT ADVISERS ACT OF 1940.txt",
    "Securities Investor Protection Act of 1970": "sipa70.txt",
    "USA PATRIOT Act": "PLAW-107publ56.txt",
    "Insider Trading & Securities Fraud Enforcement Act of 1988": "STATUTE-102-Pg4677.txt",
    "Insider Trading and Securities Fraud Enforcement Act of 1988": "STATUTE-102-Pg4677.txt",
}
ACT_CFR_PART = {
    "Securities Act of 1933": "17 CFR Part 230",
    "Securities Exchange Act of 1934": "17 CFR Part 240",
    "Investment Company Act of 1940": "17 CFR Part 270",
}
MAX_EXCERPT_CHARS = 3500  # cap any single excerpt so prompts stay bounded


@functools.lru_cache(maxsize=64)
def _read(path_str: str) -> str:
    return Path(path_str).read_text(encoding="utf-8-sig", errors="replace")


def _corpus_glob(prefix: str):
    hits = sorted(CORPUS.glob(prefix + "*.txt"))
    return hits[0] if hits else None


def _slice(text: str, start_re: str, next_re: str) -> str | None:
    """Return text from the line matching start_re up to the next next_re line."""
    lines = text.split("\n")
    start = None
    for i, ln in enumerate(lines):
        if re.match(start_re, ln):
            start = i
            break
    if start is None:
        return None
    end = len(lines)
    for j in range(start + 1, len(lines)):
        if re.match(next_re, lines[j]):
            end = j
            break
    out = "\n".join(lines[start:end]).strip()
    return out[:MAX_EXCERPT_CHARS] if out else None


# ─── Statute / CFR (ship:true, public domain) ───────────────────────────────

def extract_statute_section(act_file: str, section_id: str) -> str | None:
    """Extract one section (e.g. '15A', '3(a)') from a statute file by 'Sec. N.' headers."""
    path = CORPUS / act_file
    if not path.exists():
        return None
    # Section ids may carry subsection parens; match the base number/letter run.
    base = re.match(r"[0-9]+[A-Za-z]*", section_id.strip())
    base = base.group(0) if base else re.escape(section_id.strip())
    # Statute BODIES use all-caps "SEC. 15A." headers; the title-case "Sec. 15A."
    # form is only the table of contents and the running page-headers — match
    # uppercase to land on the body and skip both.
    return _slice(_read(str(path)),
                  rf"^SEC\.\s+{re.escape(base)}\.",
                  r"^SEC\.\s+[0-9]+[A-Za-z]*\.")


def extract_cfr_rule(part_file: str, rule_id: str) -> str | None:
    """Extract one CFR rule (e.g. '240.10b-5') by '§ 240.x' headers."""
    path = CORPUS / part_file if not part_file.startswith("corpus") else HERE / part_file
    if not path.exists():
        return None
    part = rule_id.split(".")[0]
    rid = re.escape(rule_id)
    return _slice(_read(str(path)),
                  rf"^\s*§\s*{rid}\b",
                  rf"^\s*§\s*{re.escape(part)}\.")


# ─── SRO (ship:false — read at GENERATION time only, never written downstream) ──

@functools.lru_cache(maxsize=1)
def _finra_members():
    if not FINRA_ZIP.exists():
        return {}
    with zipfile.ZipFile(FINRA_ZIP) as z:
        return {m: None for m in z.namelist()}


def extract_finra_rule(number: str) -> str | None:
    """Read a FINRA rule body from its zip member (one file per rule)."""
    if not FINRA_ZIP.exists():
        return None
    base = re.match(r"[0-9]+", number.strip())
    if not base:
        return None
    target = f"Rule_{base.group(0)}.txt"
    with zipfile.ZipFile(FINRA_ZIP) as z:
        hit = next((m for m in z.namelist() if m.endswith("/" + target) or m == target
                    or m.endswith(target)), None)
        if not hit:
            return None
        txt = z.read(hit).decode("utf-8-sig", errors="replace").strip()
        return txt[:MAX_EXCERPT_CHARS] if txt else None


def extract_cboe_rule(rule_id: str) -> str | None:
    if not CBOE_FILE.exists():
        return None
    rid = re.escape(rule_id.strip())
    return _slice(_read(str(CBOE_FILE)),
                  rf"^\s*Rule\s+{rid}\.",
                  r"^\s*Rule\s+[0-9]+\.[0-9]+\.")


def extract_msrb_rule(rule_id: str) -> str | None:
    """Best-effort: MSRB rulebook is a reflowed two-column PDF dump with no clean
    section delimiters, so return a window of lines around the densest cluster of
    mentions of this rule id. Supplementary only — the outline gives id + title."""
    if not MSRB_FILE.exists():
        return None
    rid = rule_id.strip()
    lines = _read(str(MSRB_FILE)).split("\n")
    hits = [i for i, ln in enumerate(lines) if re.search(rf"\bRule\s+{re.escape(rid)}\b", ln)]
    if not hits:
        return None
    # Pick the mention with the most following text that is NOT another TOC line.
    best = max(hits, key=lambda i: sum(1 for ln in lines[i:i + 12] if len(ln) > 40))
    window = "\n".join(lines[best:best + 12]).strip()
    return window[:MAX_EXCERPT_CHARS] if window else None


# ─── Reference resolution (drives both grounding + citation verification) ────

def resolve_ref_excerpt(ref: dict):
    """Resolve one parsed rule ref {ref, title, act} to (excerpt, meta).

    meta = {"id", "type", "ship", "resolved": bool, "ref"}. SRO excerpts are
    returned for gen-time grounding but marked ship:false so callers never embed
    them into shipped artifacts.
    """
    raw = (ref.get("ref") or "").strip()
    act = ref.get("act")
    title = ref.get("title", "")

    # SRO refs are tagged in the manifest by their rule-number shape + section group;
    # callers pass group via ref['_group'] when known. Fall back on heuristics here.
    group = ref.get("_group")
    if group == "finra":
        ex = extract_finra_rule(raw)
        return ex, {"id": "FINRA", "type": "sro", "ship": False, "resolved": ex is not None, "ref": "Rule " + raw}
    if group == "msrb":
        ex = extract_msrb_rule(raw)
        return ex, {"id": "MSRB", "type": "sro", "ship": False, "resolved": ex is not None, "ref": "Rule " + raw}
    if group == "cboe":
        ex = extract_cboe_rule(raw)
        return ex, {"id": "CBOE", "type": "sro", "ship": False, "resolved": ex is not None, "ref": "Rule " + raw}

    # SEC group: statute Section vs numeric CFR rule under the current Act.
    if raw.startswith("Section") and act in ACT_FILES:
        sec_id = raw.replace("Section", "").strip()
        ex = extract_statute_section(ACT_FILES[act], sec_id)
        return ex, {"id": act, "type": "statute", "ship": True, "resolved": ex is not None,
                    "ref": f"{act} §{sec_id}"}
    if act in ACT_CFR_PART and not raw.startswith("Section"):
        part_file = _corpus_glob(ACT_CFR_PART[act])
        if part_file:
            num = re.sub(r"^Rule\s+", "", raw)
            part = ACT_CFR_PART[act].split("Part ")[-1]
            ex = extract_cfr_rule(part_file.name, f"{part}.{num}")
            return ex, {"id": ACT_CFR_PART[act], "type": "cfr", "ship": True,
                        "resolved": ex is not None, "ref": f"{part} CFR {part}.{num}"}
    return None, {"id": act or "?", "type": "unknown", "ship": True, "resolved": False, "ref": raw}


def resolve_grounding(manifest: dict, jf_key: str, include_sro: bool = True) -> dict:
    """Assemble a grounding bundle for one job function.

    Returns {"text": <prompt-ready grounding>, "citations": [meta...],
             "resolved": n, "unresolved": [...]}. SRO excerpts are folded into the
    gen-time text but tagged ship:false in citations so they are never persisted.
    """
    jf = next((j for j in manifest["outline"]["job_functions"] if j["key"] == jf_key), None)
    if not jf:
        raise ValueError(f"unknown job function {jf_key!r}")

    parts, citations, unresolved = [], [], []

    # 1) Outline spine (public, shippable): topic + subtopic titles + bullets.
    parts.append(f"# FINRA SIE Outline — Section {jf['section_num']}: {jf['name']}")
    for t in jf["topics"]:
        parts.append(f"\n## {t['number']} {t['title']}")
        for b in t.get("bullets", []):
            parts.append(f"- {b}")
        for s in t.get("subtopics", []):
            parts.append(f"### {s['number']} {s['title']}")
            for b in s.get("bullets", []):
                parts.append(f"- {b}")

    # 2) Cited rules from this section's appendix -> corpus excerpts.
    for group in ("sec", "finra", "msrb", "cboe"):
        for item in jf["rules"].get(group, []):
            if group != "sec" and not include_sro:
                continue
            ref = dict(item)
            ref["_group"] = None if group == "sec" else group
            excerpt, meta = resolve_ref_excerpt(ref)
            citations.append(meta)
            if not meta["resolved"]:
                unresolved.append(meta["ref"])
                continue
            tag = "SRO — GEN-TIME GROUNDING ONLY, DO NOT QUOTE VERBATIM" if not meta["ship"] \
                else "primary source (public domain)"
            parts.append(f"\n--- {meta['ref']} [{tag}] ---\n{excerpt}")

    resolved = sum(1 for c in citations if c["resolved"])
    return {"text": "\n".join(parts), "citations": citations,
            "resolved": resolved, "unresolved": unresolved}


def load_manifest(path: Path = MANIFEST) -> dict:
    import json
    js = path.read_text(encoding="utf-8")
    m = re.search(r"window\.SIE_SOURCES\s*=\s*(\{.*\});\s*$", js, re.DOTALL)
    if not m:
        sys.exit(f"No SIE_SOURCES payload in {path} (run build_sources.py).")
    return json.loads(m.group(1).replace("<\\/", "</"))


# ─── Self-test (offline; proves extractors hit the real corpus) ─────────────

def selftest():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    print("─── Extractor self-test (real corpus) ───")
    checks = [
        ("statute SEA34 §15A", lambda: extract_statute_section("sea34.txt", "15A")),
        ("statute SA33 §7", lambda: extract_statute_section("Securities_Act_of_1933.txt", "7")),
        ("CFR 240.10b-5", lambda: extract_cfr_rule(_corpus_glob("17 CFR Part 240").name, "240.10b-5")),
        ("CFR 230.144", lambda: extract_cfr_rule(_corpus_glob("17 CFR Part 230").name, "230.144")),
        ("FINRA Rule 2266", lambda: extract_finra_rule("2266")),
        ("FINRA Rule 3220", lambda: extract_finra_rule("3220")),
        ("CBOE Rule 1.1", lambda: extract_cboe_rule("1.1")),
        ("MSRB Rule G-17", lambda: extract_msrb_rule("G-17")),
    ]
    for name, fn in checks:
        try:
            ex = fn()
        except Exception as e:
            print(f"  ✗ {name:22} ERROR {e}")
            continue
        if ex:
            preview = ex.replace("\n", " ")[:70]
            print(f"  ✓ {name:22} {len(ex):5d} chars | {preview}")
        else:
            print(f"  ✗ {name:22} no match")

    print("\n─── resolve_grounding per job function ───")
    manifest = load_manifest()
    for jf in manifest["outline"]["job_functions"]:
        g = resolve_grounding(manifest, jf["key"])
        n = len(g["citations"])
        print(f"  [{jf['key']}] {jf['name'][:38]:38} grounding={len(g['text']):6d} ch  "
              f"citations {g['resolved']}/{n} resolved  unresolved={len(g['unresolved'])}")
        if g["unresolved"]:
            print(f"        unresolved sample: {g['unresolved'][:4]}")


def main():
    ap = argparse.ArgumentParser(description="SIE corpus grounding + citation resolver.")
    ap.add_argument("--selftest", action="store_true", help="run extractors against the corpus")
    args = ap.parse_args()
    if args.selftest:
        selftest()
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
