#!/usr/bin/env python3
"""
SIE Study Tool — offline content generator (de-Kaplan, v2 source layer).

Grounds on PUBLIC/OPEN primary sources only — never Kaplan. Source material is
assembled at generation time by sie_grounding.resolve_grounding() from:
  • the FINRA SIE Content Outline (the spine),
  • public-domain federal securities statutes + SEC CFR excerpts (shippable),
  • SRO rulebooks (FINRA/MSRB/CBOE) read from corpus/ at gen time ONLY.

Reads the offline manifest sie_sources.v2.js (built by build_sources.py); the old
Kaplan sie_sources.js is no longer used. Calls the Anthropic API to produce
flashcards, study guides, reference sheets, and a pre-generated MCQ question bank
(the primary, no-API-key runtime engine), writing JSON into pass4_output/ for
bundle.py to fold into sie_study_data.js.

All generated content is licensed CC BY-NC-SA 4.0 (non-commercial; OpenStax-derived).

Usage:
    python generate.py --test               # One unit's flashcards (Unit 3) — ~$0.15
    python generate.py --flashcards         # 12 unit decks + 4 question-type decks
    python generate.py --study-guides       # 12 unit study guides
    python generate.py --reference-sheets   # All reference sheets
    python generate.py --question-bank      # MCQ bank: 12 units x 4 modes (the big run)
    python generate.py --all                # flashcards + guides + reference sheets
    python generate.py --status             # Show what's already generated + spend

Resumable: re-running skips outputs already complete. Cost tracking in costs.log.
"""
import argparse
import http.client
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

import sie_grounding


# ─── Model + pricing (verify on console.anthropic.com — checked 2026-06-14) ───
# Latest family is Claude 4.x (Opus 4.8 = claude-opus-4-8). Default stays on 4.7
# because its per-token pricing below is known; override with --model if desired.
MODEL = "claude-opus-4-7"
PRICE_INPUT_PER_M = 15.0   # $ per million input tokens
PRICE_OUTPUT_PER_M = 75.0  # $ per million output tokens

LICENSE = "CC BY-NC-SA 4.0"
GROUNDING_CAP = 30000      # cap grounding text per prompt to bound input cost


# ─── API / IO machinery (unchanged from the prior generator) ─────────────────

def get_api_key() -> str:
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        here = Path(__file__).parent
        # Candidate key files (all gitignored): the canonical .api_key, plus a
        # plain api_key file or api_key/api_key folder.
        for kf in (here / ".api_key", here / "api_key" / "api_key", here / "api_key"):
            if kf.is_file():
                txt = kf.read_text(encoding="utf-8-sig", errors="replace").strip()
                if txt:
                    key = txt
                    break
    if not key:
        raise SystemExit(
            "ANTHROPIC_API_KEY not set, or the key file is empty.\n"
            "Either:\n"
            "  1. $env:ANTHROPIC_API_KEY='sk-ant-...' (Windows PowerShell)\n"
            "     export ANTHROPIC_API_KEY='sk-ant-...' (Mac/Linux)\n"
            "  2. Or put your key inside one of these files (gitignored):\n"
            "       .api_key   |   api_key/api_key   |   api_key\n"
            "     (must contain the key text — a 0-byte file won't work.)"
        )
    return key


def call_opus(api_key: str, system: str, user: str, max_tokens: int = 6000,
              max_retries: int = 4) -> dict:
    """Call the model, return the parsed response. Retries on 5xx and rate limits."""
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": system,
        "messages": [{"role": "user", "content": user}],
    }).encode("utf-8")

    for attempt in range(max_retries + 1):
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=body,
            headers={
                "Content-Type": "application/json",
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=600) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            if e.code in (429, 500, 502, 503, 504) and attempt < max_retries:
                wait = 5 * (attempt + 1)
                print(f"  ! HTTP {e.code}, retrying in {wait}s...", flush=True)
                time.sleep(wait)
                continue
            raise SystemExit(f"API error {e.code}: {err_body}")
        except (urllib.error.URLError, ConnectionError, TimeoutError, OSError,
                http.client.HTTPException) as e:
            if attempt < max_retries:
                wait = 5 * (attempt + 1)
                print(f"  ! Network error: {e}; retrying in {wait}s...", flush=True)
                time.sleep(wait)
                continue
            raise SystemExit(f"Network error after {max_retries} retries: {e}")


def calc_cost(input_tokens: int, output_tokens: int) -> float:
    return (input_tokens * PRICE_INPUT_PER_M / 1_000_000 +
            output_tokens * PRICE_OUTPUT_PER_M / 1_000_000)


def log_cost(out_dir: Path, label: str, input_tok: int, output_tok: int, cost: float):
    line = f"{time.strftime('%Y-%m-%d %H:%M:%S')}\t{label}\t{input_tok}\t{output_tok}\t${cost:.4f}\n"
    (out_dir / "costs.log").open("a").write(line)


def total_spent(out_dir: Path) -> float:
    log = out_dir / "costs.log"
    if not log.exists():
        return 0.0
    total = 0.0
    for line in log.read_text().splitlines():
        parts = line.split("\t")
        if len(parts) >= 5:
            try:
                total += float(parts[4].lstrip("$"))
            except ValueError:
                pass
    return total


def parse_json_response(text: str, api_key: str = None) -> dict:
    """Strip code fences if present, parse JSON. Attempts repair on failure."""
    original = text
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*\n?", "", text)
        text = re.sub(r"\n?```\s*$", "", text)
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        text = m.group(0)
    try:
        return json.loads(text)
    except json.JSONDecodeError as first_err:
        pass
    repaired = re.sub(r",(\s*[}\]])", r"\1", text)
    try:
        return json.loads(repaired)
    except json.JSONDecodeError:
        pass
    for cut in range(len(repaired) - 1, 0, -1):
        candidate = repaired[:cut + 1]
        opens = candidate.count("{") + candidate.count("[")
        closes = candidate.count("}") + candidate.count("]")
        if opens == closes and candidate.rstrip().endswith(("}", "]")):
            try:
                return json.loads(candidate)
            except json.JSONDecodeError:
                continue
    if api_key:
        print("    ! JSON malformed, asking the model to repair...", flush=True)
        try:
            fix_resp = call_opus(
                api_key,
                "You fix malformed JSON. Output ONLY the corrected JSON. No commentary, no markdown fences.",
                f"Fix this malformed JSON so it parses cleanly. Preserve all content:\n\n{original}",
                max_tokens=8000, max_retries=1,
            )
            fixed_text = fix_resp["content"][0]["text"].strip()
            if fixed_text.startswith("```"):
                fixed_text = re.sub(r"^```(?:json)?\s*\n?", "", fixed_text)
                fixed_text = re.sub(r"\n?```\s*$", "", fixed_text)
            return json.loads(fixed_text)
        except Exception as e:
            print(f"    ! Repair attempt failed: {e}", flush=True)
    raise json.JSONDecodeError(
        f"Could not parse or repair JSON. First error: {first_err}", original, 0)


# ─── Errata (corrections that OVERRIDE the source material) ──────────────────
ERRATA_PATH = Path(__file__).parent / "sie_errata.txt"
_errata_cache = None


def load_errata():
    """Parse sie_errata.txt into {'global': [...], 'byUnit': {'3': [...]}}.
    Mirrors the runtime parser in sie_app.js so offline and runtime grounding agree."""
    global _errata_cache
    if _errata_cache is not None:
        return _errata_cache
    out = {"global": [], "byUnit": {}}
    if ERRATA_PATH.exists():
        cur = None
        for raw in ERRATA_PATH.read_text(encoding="utf-8").split("\n"):
            line = raw.rstrip()
            h = re.match(r"^#{1,6}\s*(.+?)\s*$", line)
            if h:
                head = h.group(1).lower()
                um = re.search(r"unit\s+(\d+)", head)
                if um:
                    cur = um.group(1)
                    out["byUnit"].setdefault(cur, [])
                elif re.search(r"\b(global|general|all units|all)\b", head):
                    cur = "global"
                else:
                    cur = None
                continue
            if re.match(r"^\|?[\s:|-]+\|?$", line) and "-" in line:
                continue
            item = re.sub(r"^\s*\d+\.\s+", "", re.sub(r"^\s*[-*+]\s+", "", line)).strip()
            if not item:
                continue
            if cur == "global":
                out["global"].append(item)
            elif cur:
                out["byUnit"][cur].append(item)
    _errata_cache = out
    return out


def errata_block(unit_nums) -> str:
    """Formatted errata block for the given units (plus Global). Empty if none."""
    e = load_errata()
    entries = list(e["global"])
    for u in unit_nums:
        entries += e["byUnit"].get(str(u), [])
    if not entries:
        return ""
    body = "\n".join("- " + x for x in entries)
    return (
        "\n\nERRATA — AUTHORITATIVE CORRECTIONS to the source material. "
        "The SOURCE MATERIAL above may be outdated or wrong where these entries apply; "
        "THESE ENTRIES ARE CORRECT AND CURRENT. Where any errata entry conflicts with the "
        "source, follow the errata — the content you produce MUST reflect the corrected, "
        "up-to-date information and must never teach or affirm the outdated version:\n"
        f"{body}"
    )


# ─── Grounding helpers ───────────────────────────────────────────────────────

SOURCES_DESCRIPTION = (
    "authoritative primary sources — the FINRA SIE Content Outline, federal "
    "securities statutes (Securities Act of 1933, Securities Exchange Act of 1934, "
    "Investment Company Act and Investment Advisers Act of 1940, SIPA, the USA "
    "PATRIOT Act), SEC rules in the CFR, SRO rules (FINRA, MSRB, CBOE), and OpenStax "
    "(Principles of Finance / Economics / Financial Accounting)"
)


def unit_grounding(manifest: dict, unit_num: int) -> dict:
    """Per-unit grounding bundle (text + resolved citations)."""
    return sie_grounding.resolve_grounding_for_unit(manifest, unit_num)


def grounding_for_prompt(bundle: dict) -> tuple[str, list]:
    """Return (capped grounding text, compact citation list) for prompt injection."""
    text = bundle["text"][:GROUNDING_CAP]
    cites = sie_grounding.compact_citations(bundle["citations"])
    return text, cites


def citation_menu(cites: list) -> str:
    """Render the resolved citations as a menu the model must cite FROM."""
    if not cites:
        return "(no specific rule citations available — cite the FINRA SIE Outline)"
    return "\n".join(f"- {c['ref']}" for c in cites[:60])


# ─── Prompt builders ─────────────────────────────────────────────────────────

FLASHCARD_SYSTEM = (
    "You are an expert FINRA SIE exam tutor creating high-quality study flashcards "
    f"grounded ONLY in {SOURCES_DESCRIPTION}. You produce exam-aligned cards that test "
    "understanding, not rote recall. Cards must be precise, exam-realistic, and worthy "
    "of a professional study product. Never invent rule numbers, dollar thresholds, or "
    "deadlines — use only what the source material supports."
)


def flashcard_prompt_for_unit(unit_num: int, unit_name: str, grounding: str,
                              cites: list) -> str:
    return f"""Generate flashcards covering EVERY testable concept for this SIE unit.

UNIT {unit_num}: {unit_name}

INSTRUCTIONS:
1. Comprehensive coverage of the unit's tested concepts. 15-25 cards for a heavy unit, 10-15 for a light one.
2. For EACH card, pick the format that best tests the concept:
   - "qa"         — Question / Answer. Best for conceptual questions.
   - "definition" — Term + concise definition. Best for vocabulary.
   - "scenario"   — Real setup + question. Best for application or calculation.
3. Cards must be testable on the SIE exam. Be precise. No filler, no meta-content.
4. For calculation cards, include the numbers in the question and the worked answer on the back.
5. Cite the governing source where one applies, using ONLY refs from the list below.

SOURCE MATERIAL ({SOURCES_DESCRIPTION}):
{grounding}

CITATIONS YOU MAY USE (do not invent others):
{citation_menu(cites)}{errata_block([unit_num])}

Respond ONLY with valid JSON. No markdown fences, no preamble:
{{
  "cards": [
    {{ "type": "qa" | "definition" | "scenario", "front": "...", "back": "...", "citation": "Rule 2266 | null" }}
  ]
}}"""


def flashcard_prompt_for_question_type(type_key: str, units_overview: str,
                                       outline_full: str) -> str:
    TYPE_GUIDANCE = {
        "calculations": "ALL cards must involve numerical computation. Yields, NAV, "
                        "margin equity, breakeven, accrued interest, conversion ratios, "
                        "tax-equivalent yield, basis points. Each card includes the "
                        "numbers in the question and a worked numerical answer.",
        "definitions":  "ALL cards are pure term + definition pairs. Source the most "
                        "tested vocabulary across all 12 units. Definitions tight "
                        "(1-3 sentences), exam-precise.",
        "hard":         "ALL cards use EXCEPT/NOT/LEAST/MOST framing, Roman numeral "
                        "multi-select format, or combine 2+ concepts. All distractors "
                        "highly plausible. The trickiest cards in the deck.",
        "standard":     "Straightforward concept tests. One fact per card. No tricks, "
                        "no calculations, no scenarios — clean concept verification.",
    }
    return f"""Generate a {type_key.upper()} flashcard deck drawing from all 12 units of the SIE curriculum.

DECK FOCUS:
{TYPE_GUIDANCE[type_key]}

COVERAGE: Aim for 30-40 cards, weighted by FINRA's official content distribution
(16% capital markets, 44% products & risks, 31% trading & accounts, 9% regulatory).

UNITS OVERVIEW:
{units_overview}

FINRA SIE CONTENT OUTLINE (use to ensure coverage breadth):
{outline_full[:15000]}{errata_block(range(1, 13))}

Each card MUST be testable on the SIE. Tag with `unit` pointing to the unit that covers the concept.

CRITICAL: Inside any string value, escape every double-quote as \\" and every newline as \\n.

Respond ONLY with valid JSON:
{{
  "cards": [
    {{ "type": "qa" | "definition" | "scenario", "front": "...", "back": "...", "unit": 3 }}
  ]
}}"""


STUDY_GUIDE_SYSTEM = (
    "You are an expert FINRA SIE exam tutor producing a comprehensive study guide "
    f"grounded ONLY in {SOURCES_DESCRIPTION}. Your guides are dense, hierarchically "
    "organized reference material — what a student re-reads the night before the exam. "
    "Never invent rule numbers, thresholds, or deadlines."
)


def study_guide_prompt_for_unit(unit_num: int, unit_name: str, grounding: str,
                                cites: list) -> str:
    return f"""Produce a comprehensive study guide for Unit {unit_num}: {unit_name}.

STRUCTURE:
- Top-level sections covering the unit's major topics.
- Each section has: an Overview (2-4 sentences), Key Concepts (bulleted), Rules & Regulations
  (cited where specific, using ONLY the refs listed below), Formulas (plain text, e.g.
  "Current Yield = annual coupon / market price"), and Mnemonics (where helpful for recall).
- Clear hierarchy. No filler. Dense and reference-quality.

SOURCE MATERIAL ({SOURCES_DESCRIPTION}):
{grounding}

CITATIONS YOU MAY USE (do not invent others):
{citation_menu(cites)}{errata_block([unit_num])}

Respond ONLY with valid JSON:
{{
  "sections": [
    {{ "title": "...", "overview": "...", "key_concepts": ["..."], "rules": ["..."],
       "formulas": ["..."], "mnemonics": ["..."] }}
  ]
}}"""


REFERENCE_SHEET_SYSTEM = (
    "You are an expert FINRA SIE exam tutor producing one-glance reference sheets that "
    f"condense the most exam-critical material — grounded ONLY in {SOURCES_DESCRIPTION} — "
    "into scannable cheat-sheets for the final hour before the exam. Never invent numbers."
)


REFERENCE_SHEETS = [
    {"key": "yield_relationships", "title": "Yield Relationships & Bond Math",
     "topic": "All yield definitions (nominal, current, YTM, YTC), the relationships among "
              "them for premium/par/discount bonds, current yield formula, tax-equivalent "
              "yield, basis points, points, accrued interest conventions, YTC vs YTM.",
     "source_units": [3, 8]},
    {"key": "options_strategies", "title": "Options Strategies & Breakevens",
     "topic": "Long/short call/put, covered call, protective put, straddle. Max gain/loss, "
              "breakeven for each. ITM/ATM/OTM. Intrinsic vs time value. American vs European.",
     "source_units": [5]},
    {"key": "account_types", "title": "Account Types & Suitability",
     "topic": "Individual, JTWROS, TIC, UGMA/UTMA, trust, corporate, partnership. IRAs "
              "(traditional vs Roth), 401(k), SEP, SIMPLE. Cash vs margin (Reg T). 529, ABLE. "
              "Discretionary vs non-discretionary. KYC requirements.",
     "source_units": [6]},
    {"key": "settlement_times", "title": "Settlement, Delivery & Time Rules",
     "topic": "Settlement T+1. Prospectus delivery windows. GTC cancellation. Cooling-off "
              "(20 calendar days). Reg T. FINRA form filing deadlines (U4/U5 = 30 days).",
     "source_units": [1, 6, 12]},
    {"key": "aml_amounts", "title": "AML / Reporting Thresholds",
     "topic": "CTR ($10,000+ cash, 15 days). SAR ($5,000+ suspicious, 30 days). Structuring. "
              "OFAC SDN. Three stages of money laundering. FINRA Rule 3220 gifts ($100/yr/person).",
     "source_units": [11]},
    {"key": "registration_exemptions", "title": "Registration Exemptions & Offerings",
     "topic": "Exempt issuers/securities. Reg A (Tier 1 $20M / Tier 2 $75M). Reg D (accredited). "
              "Rule 144A (QIBs). Rule 147 (intrastate). Accredited investor thresholds.",
     "source_units": [1]},
]


def reference_sheet_prompt(sheet: dict, grounding: str, cites: list) -> str:
    return f"""Produce a one-page reference sheet on: {sheet['title']}

SCOPE:
{sheet['topic']}

INSTRUCTIONS:
- Maximum information density. This is a final-hour exam cheat-sheet.
- Use bulleted lists, tables (in JSON), and short formulas.
- Number-heavy facts should be grouped. Cite rules using ONLY the refs listed below.
- Include a "Common Traps" section listing 2-5 things students get wrong on the exam.

SOURCE MATERIAL ({SOURCES_DESCRIPTION}):
{grounding}

CITATIONS YOU MAY USE (do not invent others):
{citation_menu(cites)}{errata_block(sheet['source_units'])}

Respond ONLY with valid JSON:
{{
  "title": "{sheet['title']}",
  "sections": [ {{ "heading": "...", "type": "bullets" | "table" | "formula" | "rule", "items": [...] }} ],
  "common_traps": ["...", "..."]
}}"""


QUESTION_BANK_SYSTEM = (
    "You are an expert FINRA SIE exam item writer producing multiple-choice questions "
    f"grounded ONLY in {SOURCES_DESCRIPTION}. Each item has exactly four choices, one "
    "unambiguously correct answer, and plausible distractors. Items must mirror the real "
    "SIE in tone and difficulty. NEVER invent rule numbers, dollar thresholds, dates, or "
    "deadlines — every fact must be supported by the source material, and every citation "
    "must come from the provided list."
)

QUESTION_MODE_GUIDANCE = {
    "standard":     "Clean single-concept items. One tested fact each. No EXCEPT/NOT framing.",
    "hard":         "EXCEPT/NOT/LEAST/MOST framing or 2+ combined concepts. Distractors highly plausible.",
    "definitions":  "Vocabulary/identification items — 'Which term describes…' / 'X is defined as…'.",
    "calculations": "Each item requires a numerical computation; include the numbers in the stem and show the math in the explanation.",
}


def question_bank_prompt(unit_num: int, unit_name: str, mode: str,
                         grounding: str, cites: list, n: int) -> str:
    return f"""Write {n} SIE practice multiple-choice questions for Unit {unit_num}: {unit_name}.

MODE — {mode.upper()}: {QUESTION_MODE_GUIDANCE[mode]}

RULES:
- Exactly 4 choices per item; exactly one correct. "answer" is the 0-based index of the correct choice.
- "explanation" states WHY the answer is correct and why the key distractor is wrong.
- "citations" lists the governing source(s) for the item, using ONLY refs from the list below. Use [] if none applies.
- Ground every fact in the SOURCE MATERIAL. Do not invent rule numbers, thresholds, or deadlines.

SOURCE MATERIAL ({SOURCES_DESCRIPTION}):
{grounding}

CITATIONS YOU MAY USE (do not invent others):
{citation_menu(cites)}{errata_block([unit_num])}

Respond ONLY with valid JSON:
{{
  "questions": [
    {{ "stem": "...", "choices": ["A","B","C","D"], "answer": 0,
       "explanation": "...", "citations": ["Rule 2266"] }}
  ]
}}"""


# ─── Generation orchestrators ────────────────────────────────────────────────

def _usage(resp):
    u = resp.get("usage", {})
    it, ot = u.get("input_tokens", 0), u.get("output_tokens", 0)
    return it, ot, calc_cost(it, ot)


def generate_unit_flashcards(api_key, manifest, unit_num, out_dir, force=False):
    out_file = out_dir / f"flashcards_unit_{unit_num}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())
    bundle = unit_grounding(manifest, unit_num)
    grounding, cites = grounding_for_prompt(bundle)
    print(f"  → Unit {unit_num} flashcards: {bundle['unit_name']}", flush=True)
    resp = call_opus(api_key, FLASHCARD_SYSTEM,
                     flashcard_prompt_for_unit(unit_num, bundle["unit_name"], grounding, cites),
                     max_tokens=8000)
    it, ot, cost = _usage(resp)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    cards = parsed.get("cards", [])
    for c in cards:
        c["unit"] = unit_num
    result = {"unit": unit_num, "unit_name": bundle["unit_name"], "jf": bundle["jf"],
              "cards": cards, "citations_available": cites, "license": LICENSE,
              "tokens": {"input": it, "output": ot}, "cost_usd": round(cost, 4)}
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"flashcards_unit_{unit_num}", it, ot, cost)
    print(f"    ✓ {len(cards)} cards · ${cost:.4f} · {it}→{ot} tokens", flush=True)
    return result


def generate_type_deck(api_key, manifest, type_key, out_dir, force=False):
    out_file = out_dir / f"flashcards_type_{type_key}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())
    units_overview = "\n".join(
        f"- Unit {u['num']} ({u['name']}) [{u['jf']}]"
        for u in sorted(manifest["units"].values(), key=lambda x: x["num"]))
    print(f"  → Type deck: {type_key}", flush=True)
    resp = call_opus(api_key, FLASHCARD_SYSTEM,
                     flashcard_prompt_for_question_type(type_key, units_overview,
                                                        manifest["outline"]["full"]),
                     max_tokens=8000)
    it, ot, cost = _usage(resp)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    cards = parsed.get("cards", [])
    result = {"type_key": type_key, "cards": cards, "license": LICENSE,
              "tokens": {"input": it, "output": ot}, "cost_usd": round(cost, 4)}
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"flashcards_type_{type_key}", it, ot, cost)
    print(f"    ✓ {len(cards)} cards · ${cost:.4f}", flush=True)
    return result


def generate_unit_guide(api_key, manifest, unit_num, out_dir, force=False):
    out_file = out_dir / f"studyguide_unit_{unit_num}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())
    bundle = unit_grounding(manifest, unit_num)
    grounding, cites = grounding_for_prompt(bundle)
    print(f"  → Unit {unit_num} study guide: {bundle['unit_name']}", flush=True)
    resp = call_opus(api_key, STUDY_GUIDE_SYSTEM,
                     study_guide_prompt_for_unit(unit_num, bundle["unit_name"], grounding, cites),
                     max_tokens=8000)
    it, ot, cost = _usage(resp)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    result = {"unit": unit_num, "unit_name": bundle["unit_name"],
              "sections": parsed.get("sections", []), "citations_available": cites,
              "license": LICENSE, "tokens": {"input": it, "output": ot},
              "cost_usd": round(cost, 4)}
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"studyguide_unit_{unit_num}", it, ot, cost)
    print(f"    ✓ {len(result['sections'])} sections · ${cost:.4f}", flush=True)
    return result


def generate_reference_sheet(api_key, manifest, sheet, out_dir, force=False):
    out_file = out_dir / f"reference_{sheet['key']}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())
    # Merge grounding across the sheet's source units (dedupe citations).
    texts, all_cites, seen = [], [], set()
    for u in sheet["source_units"]:
        b = unit_grounding(manifest, u)
        texts.append(b["text"])
        for c in sie_grounding.compact_citations(b["citations"]):
            if c["ref"] not in seen:
                seen.add(c["ref"]); all_cites.append(c)
    grounding = "\n\n".join(texts)[:GROUNDING_CAP]
    print(f"  → Reference sheet: {sheet['title']}", flush=True)
    resp = call_opus(api_key, REFERENCE_SHEET_SYSTEM,
                     reference_sheet_prompt(sheet, grounding, all_cites), max_tokens=4000)
    it, ot, cost = _usage(resp)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    result = {"key": sheet["key"], "title": sheet["title"],
              "sections": parsed.get("sections", []),
              "common_traps": parsed.get("common_traps", []),
              "citations_available": all_cites, "license": LICENSE,
              "tokens": {"input": it, "output": ot}, "cost_usd": round(cost, 4)}
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"reference_{sheet['key']}", it, ot, cost)
    print(f"    ✓ ${cost:.4f}", flush=True)
    return result


def generate_question_set(api_key, manifest, unit_num, mode, out_dir,
                          n=12, force=False):
    out_file = out_dir / f"questions_unit_{unit_num}_{mode}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())
    bundle = unit_grounding(manifest, unit_num)
    grounding, cites = grounding_for_prompt(bundle)
    print(f"  → Q-bank Unit {unit_num} [{mode}]: {bundle['unit_name']}", flush=True)
    resp = call_opus(api_key, QUESTION_BANK_SYSTEM,
                     question_bank_prompt(unit_num, bundle["unit_name"], mode,
                                          grounding, cites, n),
                     max_tokens=8000)
    it, ot, cost = _usage(resp)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    questions = parsed.get("questions", [])
    for q in questions:
        q["unit"] = unit_num
        q["jf"] = bundle["jf"]
        q["mode"] = mode
    result = {"unit": unit_num, "unit_name": bundle["unit_name"], "jf": bundle["jf"],
              "mode": mode, "questions": questions, "citations_available": cites,
              "license": LICENSE, "tokens": {"input": it, "output": ot},
              "cost_usd": round(cost, 4)}
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"questions_unit_{unit_num}_{mode}", it, ot, cost)
    print(f"    ✓ {len(questions)} questions · ${cost:.4f}", flush=True)
    return result


# ─── Main ────────────────────────────────────────────────────────────────────

QUESTION_MODES = ["standard", "hard", "definitions", "calculations"]


def main():
    global MODEL
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    p = argparse.ArgumentParser(description="SIE offline content generator (v2 sources)")
    p.add_argument("--sources", default="sie_sources.v2.js",
                   help="Path to the v2 manifest (default: ./sie_sources.v2.js)")
    p.add_argument("--out", default="pass4_output", help="Output directory")
    p.add_argument("--model", default=MODEL, help=f"Model id (default: {MODEL})")
    p.add_argument("--budget", type=float, default=40.0, help="Hard budget cap in USD")
    p.add_argument("--qbank-per-set", type=int, default=12,
                   help="Questions per (unit, mode) in the question bank (default: 12)")
    p.add_argument("--test", action="store_true", help="Generate ONE unit's flashcards (Unit 3)")
    p.add_argument("--flashcards", action="store_true", help="12 unit decks + 4 type decks")
    p.add_argument("--study-guides", action="store_true", help="12 unit study guides")
    p.add_argument("--reference-sheets", action="store_true", help="All reference sheets")
    p.add_argument("--question-bank", action="store_true", help="MCQ bank (12 units x 4 modes)")
    p.add_argument("--all", action="store_true", help="flashcards + guides + reference sheets")
    p.add_argument("--status", action="store_true", help="Show generated files + spend")
    p.add_argument("--force", action="store_true", help="Re-generate even if output exists")
    args = p.parse_args()
    MODEL = args.model

    out_dir = Path(args.out)
    out_dir.mkdir(exist_ok=True)

    sources_path = Path(args.sources)
    if not sources_path.exists():
        raise SystemExit(f"Manifest not found at {sources_path}. Run build_sources.py first "
                         "or pass --sources <path>.")
    manifest = sie_grounding.load_manifest(sources_path)
    spent = total_spent(out_dir)

    if args.status:
        print(f"Output dir: {out_dir.resolve()}")
        print(f"Total spent: ${spent:.4f} / ${args.budget:.2f} budget")
        print("\nGenerated files:")
        for f in sorted(out_dir.glob("*.json")):
            print(f"  {f.name}")
        return

    api_key = get_api_key()
    print(f"=== SIE content generator (model {MODEL}) ===")
    print(f"Budget: ${args.budget:.2f}  ·  Spent so far: ${spent:.4f}  ·  "
          f"Remaining: ${args.budget - spent:.4f}")

    def check_budget():
        s = total_spent(out_dir)
        if s >= args.budget:
            raise SystemExit(f"\n!! Budget cap reached: ${s:.4f} >= ${args.budget:.2f}. "
                             f"Stopping. Re-run with --budget X to continue.")

    if args.test:
        print("\n--- TEST MODE: single unit (Unit 3) ---")
        generate_unit_flashcards(api_key, manifest, 3, out_dir, force=args.force)
        print(f"\nTotal spent: ${total_spent(out_dir):.4f}")
        return

    do_flashcards = args.flashcards or args.all
    do_guides = args.study_guides or args.all
    do_refs = args.reference_sheets or args.all
    do_qbank = args.question_bank

    if not (do_flashcards or do_guides or do_refs or do_qbank):
        print("Nothing to do. Pass --test, --flashcards, --study-guides, "
              "--reference-sheets, --question-bank, or --all.")
        return

    if do_flashcards:
        print("\n--- FLASHCARDS (12 unit decks) ---")
        for u in range(1, 13):
            generate_unit_flashcards(api_key, manifest, u, out_dir, force=args.force)
            check_budget()
        print("\n4 question-type decks:")
        for t in QUESTION_MODES:
            generate_type_deck(api_key, manifest, t, out_dir, force=args.force)
            check_budget()

    if do_guides:
        print("\n--- STUDY GUIDES (12 units) ---")
        for u in range(1, 13):
            generate_unit_guide(api_key, manifest, u, out_dir, force=args.force)
            check_budget()

    if do_refs:
        print("\n--- REFERENCE SHEETS ---")
        for sheet in REFERENCE_SHEETS:
            generate_reference_sheet(api_key, manifest, sheet, out_dir, force=args.force)
            check_budget()

    if do_qbank:
        print("\n--- QUESTION BANK (12 units x 4 modes) ---")
        for u in range(1, 13):
            for mode in QUESTION_MODES:
                generate_question_set(api_key, manifest, u, mode, out_dir,
                                      n=args.qbank_per_set, force=args.force)
                check_budget()

    print(f"\n=== DONE ===")
    print(f"Total spent: ${total_spent(out_dir):.4f}")
    print(f"Output: {out_dir.resolve()}")


if __name__ == "__main__":
    main()
