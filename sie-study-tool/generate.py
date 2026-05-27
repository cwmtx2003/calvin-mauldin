#!/usr/bin/env python3
"""
SIE Study Tool — Pass 4 offline content generator.

Reads source material from sie_sources.js (already in your sie-study-tool folder),
calls Anthropic's Opus model to generate flashcards, study guides, and reference
sheets, and writes the output as JSON files you can upload back to Claude.

Usage:
    python3 generate.py --test                # Single lesson test (~$0.13)
    python3 generate.py --flashcards          # All 20 decks (~$20)
    python3 generate.py --study-guides        # All 16 guides (~$8)
    python3 generate.py --reference-sheets    # All sheets (~$2.50)
    python3 generate.py --all                 # Everything (~$30)
    python3 generate.py --status              # Show what's already generated

Resumable: if interrupted, re-running skips lessons/guides already complete.
Cost tracking: every call appends to costs.log with token counts and $ spent.
Budget cap: hard limit of $32 by default. Pass --budget XX to change.
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


# ─── Pricing (Opus 4.7 — verify on console.anthropic.com if it's been months) ──
PRICE_INPUT_PER_M = 15.0   # $ per million input tokens
PRICE_OUTPUT_PER_M = 75.0  # $ per million output tokens

MODEL = "claude-opus-4-7"


# ─── Helpers ───────────────────────────────────────────────────────────────

def load_sources(path: Path) -> dict:
    """Parse sie_sources.js into a Python dict by extracting the JSON payload."""
    js = path.read_text(encoding="utf-8")
    # File contains: window.SIE_SOURCES = {...json...};
    m = re.search(r"window\.SIE_SOURCES\s*=\s*(\{.*?\});\s*$", js, re.DOTALL)
    if not m:
        raise SystemExit(f"Could not find SIE_SOURCES payload in {path}")
    raw_json = m.group(1)
    # The packager escaped </ as <\/, so unescape
    raw_json = raw_json.replace("<\\/", "</")
    return json.loads(raw_json)


def get_api_key() -> str:
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        # Allow a .api_key file in the same dir as the script for convenience
        keyfile = Path(__file__).parent / ".api_key"
        if keyfile.exists():
            key = keyfile.read_text().strip()
    if not key:
        raise SystemExit(
            "ANTHROPIC_API_KEY not set.\n"
            "Either:\n"
            "  1. Run: export ANTHROPIC_API_KEY='sk-ant-...' (Mac/Linux)\n"
            "     Or:  set ANTHROPIC_API_KEY=sk-ant-...    (Windows cmd)\n"
            "     Or:  $env:ANTHROPIC_API_KEY='sk-ant-...' (Windows PowerShell)\n"
            "  2. Or create a file '.api_key' next to this script with your key inside."
        )
    return key


def call_opus(api_key: str, system: str, user: str, max_tokens: int = 6000,
              max_retries: int = 4) -> dict:
    """Call Opus, return the parsed response. Retries on 5xx and rate limits."""
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
            # Covers connection resets (WinError 10054), timeouts, dropped
            # responses, and other transient network failures.
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
    # Try as-is
    try:
        return json.loads(text)
    except json.JSONDecodeError as first_err:
        pass
    # Repair attempt 1: trailing commas before } or ]
    repaired = re.sub(r",(\s*[}\]])", r"\1", text)
    try:
        return json.loads(repaired)
    except json.JSONDecodeError:
        pass
    # Repair attempt 2: truncated output — find last complete object/array boundary
    # Walk backward from the end, find the last position where braces balance
    for cut in range(len(repaired) - 1, 0, -1):
        candidate = repaired[:cut + 1]
        # Quick balance check
        opens = candidate.count("{") + candidate.count("[")
        closes = candidate.count("}") + candidate.count("]")
        if opens == closes and candidate.rstrip().endswith(("}", "]")):
            try:
                return json.loads(candidate)
            except json.JSONDecodeError:
                continue
    # Last resort: ask Opus to fix its own output (costs ~$0.30)
    if api_key:
        print("    ! JSON malformed, asking Opus to repair...", flush=True)
        try:
            fix_resp = call_opus(
                api_key,
                "You fix malformed JSON. Output ONLY the corrected JSON. No commentary, no markdown fences.",
                f"Fix this malformed JSON so it parses cleanly. Preserve all content:\n\n{original}",
                max_tokens=8000,
                max_retries=1,
            )
            fixed_text = fix_resp["content"][0]["text"].strip()
            if fixed_text.startswith("```"):
                fixed_text = re.sub(r"^```(?:json)?\s*\n?", "", fixed_text)
                fixed_text = re.sub(r"\n?```\s*$", "", fixed_text)
            return json.loads(fixed_text)
        except Exception as e:
            print(f"    ! Repair attempt failed: {e}", flush=True)
    raise json.JSONDecodeError(
        f"Could not parse or repair JSON. First error: {first_err}",
        original, 0,
    )


# ─── Errata (corrections that OVERRIDE the Kaplan 3rd Ed. manual) ───────────
ERRATA_PATH = Path(__file__).parent / "sie_errata.txt"
_errata_cache = None


def load_errata():
    """Parse sie_errata.txt into {'global': [...], 'byUnit': {'3': [...]}}.
    Sections are markdown headers like '## Global' or '## Unit 3'. Mirrors the
    runtime parser in sie_app.js so offline and runtime grounding agree."""
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
                continue  # skip markdown table separators
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
        "\n\nERRATA — AUTHORITATIVE CORRECTIONS to the Kaplan 3rd Edition manual. "
        "The SOURCE MATERIAL above may be outdated or wrong where these entries apply; "
        "THESE ENTRIES ARE CORRECT AND CURRENT. Where any errata entry conflicts with the "
        "source, follow the errata — the content you produce MUST reflect the corrected, "
        "up-to-date information and must never teach or affirm the outdated version:\n"
        f"{body}"
    )


# ─── Prompt builders ───────────────────────────────────────────────────────

FLASHCARD_SYSTEM = """You are an expert FINRA SIE exam tutor creating high-quality \
study flashcards from authoritative Kaplan source material. You produce exam-aligned \
cards that test understanding, not just rote recall. Cards must be precise, \
exam-realistic, and worthy of a professional study product."""


def flashcard_prompt_for_lesson(lesson: dict) -> str:
    return f"""Generate flashcards covering EVERY testable concept in this lesson.

LESSON: Unit {lesson['unit']}, Lesson {lesson['unit']}.{lesson['lesson']} — "{lesson['title']}"
JOB FUNCTION: {lesson.get('jobFunction', 'pr')}

INSTRUCTIONS:
1. Comprehensive coverage — every Learning Objective should produce at least 1 card.
2. Card count matches content density. Light lessons: 8-12 cards. Heavy lessons: 15-25 cards.
3. For EACH card, pick the format that best tests the concept:
   - "qa"         — Question / Answer. Best for conceptual questions.
   - "definition" — Term + concise definition. Best for vocabulary.
   - "scenario"   — Real setup + question. Best for application or calculation.
4. Cards must be testable on the SIE exam — match Kaplan exam-prep tone, not college lecture.
5. Be precise. No filler. No "review this card" meta-content. No "according to Kaplan..." \
— the student knows the source.
6. For calculation cards, include the numbers in the question, and the worked answer on the back.
7. Tag each card with the LO it primarily addresses (e.g. "3.a", "3.b") if identifiable.

SOURCE MATERIAL (Kaplan SIE Manual 3rd Ed):
{lesson['text']}{errata_block([lesson['unit']])}

Respond ONLY with valid JSON. No markdown fences, no preamble:
{{
  "cards": [
    {{
      "type": "qa" | "definition" | "scenario",
      "front": "...",
      "back": "...",
      "lo": "3.a"
    }}
  ]
}}"""


def flashcard_prompt_for_question_type(type_key: str, all_lessons: list,
                                       outline_full: str) -> str:
    """Generate a 'by question type' deck — pull from all units, weighted by type fit."""
    TYPE_GUIDANCE = {
        "calculations": "ALL cards must involve numerical computation. Yields, NAV, "
                        "margin equity, breakeven, accrued interest, conversion ratios, "
                        "tax-equivalent yield, basis points. Each card includes the "
                        "numbers in the question and a worked numerical answer.",
        "definitions":  "ALL cards are pure term + definition pairs. Source the most "
                        "tested vocabulary across all 12 units. Definitions should be "
                        "tight (1-3 sentences), exam-precise.",
        "hard":         "ALL cards use EXCEPT/NOT/LEAST/MOST framing, Roman numeral "
                        "multi-select format, or combine 2+ concepts in one question. "
                        "All distractors should be highly plausible. These are the "
                        "trickiest cards in the deck.",
        "standard":     "Straightforward concept tests. One fact per card. No tricks, "
                        "no calculations, no scenarios — just clean concept verification.",
    }
    # Show only lesson titles + first 500 chars as preview — full text would explode tokens
    lessons_preview = "\n".join(
        f"- Unit {L['unit']}.{L['lesson']} ({L['title']}) [{L.get('jobFunction','?')}]"
        for L in all_lessons
    )
    return f"""Generate a {type_key.upper()} flashcard deck drawing from all 12 units of the SIE curriculum.

DECK FOCUS:
{TYPE_GUIDANCE[type_key]}

COVERAGE: Aim for 30-40 cards. Cover the breadth of the SIE exam, weighted by FINRA's
official content distribution (16% capital markets, 44% products & risks, 31% trading
& accounts, 9% regulatory).

LESSONS AVAILABLE:
{lessons_preview}

FINRA SIE CONTENT OUTLINE (use to ensure coverage breadth):
{outline_full[:15000]}{errata_block(range(1, 13))}

Each card MUST be testable on the SIE. Tag with `unit` and `lesson` fields pointing to
the lesson that covers the underlying concept.

CRITICAL: Inside any string value, escape every double-quote as \\" and every newline as \\n.
Do not put bare quotes or line breaks inside strings — they break JSON parsing.

Respond ONLY with valid JSON:
{{
  "cards": [
    {{
      "type": "qa" | "definition" | "scenario",
      "front": "...",
      "back": "...",
      "unit": 3,
      "lesson": 1
    }}
  ]
}}"""


STUDY_GUIDE_SYSTEM = """You are an expert FINRA SIE exam tutor producing a comprehensive \
study guide section from authoritative Kaplan source material. Your guides are dense, \
hierarchically organized reference material — what a student would re-read the night \
before the exam."""


def study_guide_prompt_for_unit(unit_num: int, unit_name: str, lessons: list,
                                outline_section: str) -> str:
    lessons_text = "\n\n".join(
        f"=== LESSON {L['unit']}.{L['lesson']}: {L['title']} ===\n{L['text']}"
        for L in lessons
    )
    return f"""Produce a comprehensive study guide for Unit {unit_num}: {unit_name}.

STRUCTURE:
- Top-level sections matching the unit's lessons.
- Each section has: an Overview (2-4 sentences), Key Concepts (bulleted), Rules & Regulations
  (cited where specific), Formulas (in plain text, e.g. "Current Yield = annual coupon / market price"),
  and Mnemonics (where helpful for exam recall).
- Use clear hierarchy. No filler. Dense and reference-quality.

SOURCE MATERIAL (Kaplan SIE Manual 3rd Ed):
{lessons_text[:80000]}

RELEVANT OUTLINE SECTION (FINRA, 2024):
{outline_section[:8000]}{errata_block([unit_num])}

Respond ONLY with valid JSON:
{{
  "sections": [
    {{
      "title": "Lesson 3.1: Characteristics of Bonds",
      "overview": "...",
      "key_concepts": ["...", "..."],
      "rules": ["..."],
      "formulas": ["..."],
      "mnemonics": ["..."]
    }}
  ]
}}"""


REFERENCE_SHEET_SYSTEM = """You are an expert FINRA SIE exam tutor producing one-glance \
reference sheets that condense the most exam-critical material into scannable cheat-sheets. \
These are what students review in the final hour before sitting for the exam."""


REFERENCE_SHEETS = [
    {
        "key": "yield_relationships",
        "title": "Yield Relationships & Bond Math",
        "topic": "All yield definitions (nominal, current, YTM, YTC), the relationships "
                 "among them for premium/par/discount bonds, current yield formula, "
                 "tax-equivalent yield, basis points, points, accrued interest conventions, "
                 "yield-to-call vs yield-to-maturity for callable bonds.",
        "source_units": [3, 8],
    },
    {
        "key": "options_strategies",
        "title": "Options Strategies & Breakevens",
        "topic": "Long call/put, short call/put, covered call, protective put, straddle. "
                 "Max gain, max loss, breakeven for each. ITM/ATM/OTM definitions. "
                 "Intrinsic vs time value. American vs European style.",
        "source_units": [5],
    },
    {
        "key": "account_types",
        "title": "Account Types & Suitability",
        "topic": "Individual, JTWROS, TIC, UGMA/UTMA, trust, corporate, partnership. "
                 "IRAs (traditional vs Roth), 401(k), SEP, SIMPLE. Cash vs margin (Reg T). "
                 "529 plans, ABLE accounts. Discretionary vs non-discretionary. KYC requirements.",
        "source_units": [6],
    },
    {
        "key": "settlement_times",
        "title": "Settlement, Delivery & Time Rules",
        "topic": "Settlement: T+1 (equities, options, govts, corps). Prospectus delivery "
                 "windows (IPO NMS 25/non-NMS 90, APO NMS 0/non-NMS 40). GTC cancellation "
                 "(last business day of April & October). Cooling-off (20 calendar days). "
                 "Reg T (S+1 to settle). FINRA form filing deadlines (U4/U5 = 30 days).",
        "source_units": [1, 6, 12],
    },
    {
        "key": "aml_amounts",
        "title": "AML / Reporting Thresholds",
        "topic": "CTR ($10,000+ cash, filed within 15 days). SAR ($5,000+ suspicious, "
                 "filed within 30 days, no minimum for terrorist financing). Structuring "
                 "(illegal). OFAC SDN list. Three stages of money laundering (placement, "
                 "layering, integration). FINRA Rule 3220 gifts ($100/year/person).",
        "source_units": [11],
    },
    {
        "key": "registration_exemptions",
        "title": "Registration Exemptions & Offerings",
        "topic": "Exempt issuers (govt, muni, bank, etc.). Exempt securities (commercial paper "
                 "<270 days, fixed annuities, etc.). Reg A (Tier 1 $20M / Tier 2 $75M). "
                 "Reg D (accredited investors). Rule 144A (QIBs). Rule 147 (intrastate). "
                 "Accredited investor thresholds ($1M net worth ex primary residence, "
                 "$200K/$300K income).",
        "source_units": [1],
    },
]


def reference_sheet_prompt(sheet: dict, lessons_by_unit: dict) -> str:
    relevant_text = "\n\n".join(
        f"=== UNIT {u} ===\n" + "\n".join(L['text'] for L in lessons_by_unit.get(u, []))
        for u in sheet["source_units"]
    )[:60000]
    return f"""Produce a one-page reference sheet on: {sheet['title']}

SCOPE:
{sheet['topic']}

INSTRUCTIONS:
- Maximum information density. This is a final-hour exam cheat-sheet.
- Use bulleted lists, tables (in JSON), and short formulas.
- Memorable formatting. Number-heavy facts should be grouped.
- Include a "Common Traps" section listing 2-5 things students get wrong on the exam.

SOURCE MATERIAL:
{relevant_text}{errata_block(sheet['source_units'])}

Respond ONLY with valid JSON:
{{
  "title": "{sheet['title']}",
  "sections": [
    {{
      "heading": "...",
      "type": "bullets" | "table" | "formula" | "rule",
      "items": [...]
    }}
  ],
  "common_traps": ["...", "..."]
}}"""


# ─── Generation orchestrators ──────────────────────────────────────────────

def generate_one_lesson(api_key: str, lesson: dict, out_dir: Path,
                        force: bool = False) -> dict | None:
    """Generate flashcards for a single lesson. Returns the result dict or None if skipped."""
    out_file = out_dir / f"flashcards_unit_{lesson['unit']}_lesson_{lesson['lesson']}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())

    print(f"  → Lesson {lesson['unit']}.{lesson['lesson']}: {lesson['title']}", flush=True)
    resp = call_opus(api_key, FLASHCARD_SYSTEM, flashcard_prompt_for_lesson(lesson),
                     max_tokens=6000)
    usage = resp.get("usage", {})
    in_tok = usage.get("input_tokens", 0)
    out_tok = usage.get("output_tokens", 0)
    cost = calc_cost(in_tok, out_tok)

    text = resp["content"][0]["text"]
    try:
        parsed = parse_json_response(text, api_key)
    except json.JSONDecodeError as e:
        (out_dir / f"_DEBUG_unit_{lesson['unit']}_lesson_{lesson['lesson']}.txt").write_text(text)
        print(f"    ! JSON parse failed: {e}. Raw saved for debugging.")
        raise

    cards = parsed.get("cards", [])
    for c in cards:
        c["unit"] = lesson["unit"]
        c["lesson"] = lesson["lesson"]
        c["lesson_title"] = lesson["title"]

    result = {
        "unit": lesson["unit"],
        "lesson": lesson["lesson"],
        "lesson_title": lesson["title"],
        "cards": cards,
        "tokens": {"input": in_tok, "output": out_tok},
        "cost_usd": round(cost, 4),
    }
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"flashcards_unit_{lesson['unit']}_lesson_{lesson['lesson']}",
             in_tok, out_tok, cost)
    print(f"    ✓ {len(cards)} cards · ${cost:.4f} · {in_tok}→{out_tok} tokens", flush=True)
    return result


def generate_type_deck(api_key: str, type_key: str, sources: dict,
                       out_dir: Path, force: bool = False) -> dict | None:
    out_file = out_dir / f"flashcards_type_{type_key}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())

    print(f"  → Type deck: {type_key}", flush=True)
    all_lessons = []
    for u, entry in sources["manual"].items():
        for L in entry["lessons"]:
            all_lessons.append(L)

    resp = call_opus(api_key, FLASHCARD_SYSTEM,
                     flashcard_prompt_for_question_type(type_key, all_lessons,
                                                       sources["outline"]["full"]),
                     max_tokens=8000)
    usage = resp.get("usage", {})
    in_tok = usage.get("input_tokens", 0)
    out_tok = usage.get("output_tokens", 0)
    cost = calc_cost(in_tok, out_tok)

    text = resp["content"][0]["text"]
    parsed = parse_json_response(text, api_key)
    cards = parsed.get("cards", [])
    result = {
        "type_key": type_key,
        "cards": cards,
        "tokens": {"input": in_tok, "output": out_tok},
        "cost_usd": round(cost, 4),
    }
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"flashcards_type_{type_key}", in_tok, out_tok, cost)
    print(f"    ✓ {len(cards)} cards · ${cost:.4f}", flush=True)
    return result


def generate_unit_guide(api_key: str, unit_num: int, sources: dict,
                        out_dir: Path, force: bool = False) -> dict | None:
    out_file = out_dir / f"studyguide_unit_{unit_num}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())

    entry = sources["manual"][str(unit_num)]
    lessons = entry["lessons"]
    outline_section = ""
    # Find the related outline JF section (approximate — guides are by unit, outline by JF)
    primary_jf = lessons[0].get("jobFunction", "pr") if lessons else "pr"
    for jf in sources["outline"]["job_functions"]:
        if jf["key"] == primary_jf:
            outline_section = jf["text"]
            break

    print(f"  → Unit {unit_num} study guide: {entry['name']}", flush=True)
    resp = call_opus(api_key, STUDY_GUIDE_SYSTEM,
                     study_guide_prompt_for_unit(unit_num, entry["name"],
                                                 lessons, outline_section),
                     max_tokens=8000)
    usage = resp.get("usage", {})
    in_tok = usage.get("input_tokens", 0)
    out_tok = usage.get("output_tokens", 0)
    cost = calc_cost(in_tok, out_tok)

    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    result = {
        "unit": unit_num,
        "unit_name": entry["name"],
        "sections": parsed.get("sections", []),
        "tokens": {"input": in_tok, "output": out_tok},
        "cost_usd": round(cost, 4),
    }
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"studyguide_unit_{unit_num}", in_tok, out_tok, cost)
    print(f"    ✓ {len(result['sections'])} sections · ${cost:.4f}", flush=True)
    return result


def generate_reference_sheet(api_key: str, sheet: dict, sources: dict,
                             out_dir: Path, force: bool = False) -> dict | None:
    out_file = out_dir / f"reference_{sheet['key']}.json"
    if out_file.exists() and not force:
        return json.loads(out_file.read_text())

    lessons_by_unit = {int(u): e["lessons"] for u, e in sources["manual"].items()}

    print(f"  → Reference sheet: {sheet['title']}", flush=True)
    resp = call_opus(api_key, REFERENCE_SHEET_SYSTEM,
                     reference_sheet_prompt(sheet, lessons_by_unit),
                     max_tokens=4000)
    usage = resp.get("usage", {})
    in_tok = usage.get("input_tokens", 0)
    out_tok = usage.get("output_tokens", 0)
    cost = calc_cost(in_tok, out_tok)
    parsed = parse_json_response(resp["content"][0]["text"], api_key)
    result = {
        "key": sheet["key"],
        "title": sheet["title"],
        "sections": parsed.get("sections", []),
        "common_traps": parsed.get("common_traps", []),
        "tokens": {"input": in_tok, "output": out_tok},
        "cost_usd": round(cost, 4),
    }
    out_file.write_text(json.dumps(result, indent=2))
    log_cost(out_dir, f"reference_{sheet['key']}", in_tok, out_tok, cost)
    print(f"    ✓ ${cost:.4f}", flush=True)
    return result


# ─── Main ──────────────────────────────────────────────────────────────────

def main():
    # Windows consoles default to cp1252 and choke on the Unicode glyphs in our
    # status prints (→, •, ✓). Force UTF-8 so the script runs everywhere.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    p = argparse.ArgumentParser(description="SIE Pass 4 content generator")
    p.add_argument("--sources", default="sie_sources.js",
                   help="Path to sie_sources.js (default: ./sie_sources.js)")
    p.add_argument("--out", default="pass4_output",
                   help="Output directory (default: ./pass4_output)")
    p.add_argument("--budget", type=float, default=32.0,
                   help="Hard budget cap in USD (default: 32)")
    p.add_argument("--test", action="store_true",
                   help="Generate ONE lesson only (Unit 3 Lesson 1) — ~$0.13")
    p.add_argument("--flashcards", action="store_true",
                   help="Generate all 20 flashcard decks")
    p.add_argument("--study-guides", action="store_true",
                   help="Generate all 16 study guides")
    p.add_argument("--reference-sheets", action="store_true",
                   help="Generate all reference sheets")
    p.add_argument("--all", action="store_true",
                   help="Generate everything (flashcards + guides + refs)")
    p.add_argument("--status", action="store_true",
                   help="Show what's already generated and total spend")
    p.add_argument("--force", action="store_true",
                   help="Re-generate even if output file already exists")
    args = p.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(exist_ok=True)

    sources_path = Path(args.sources)
    if not sources_path.exists():
        raise SystemExit(f"sie_sources.js not found at {sources_path}. "
                         "Pass --sources <path> or run from the folder containing it.")

    sources = load_sources(sources_path)
    spent = total_spent(out_dir)

    if args.status:
        print(f"Output dir: {out_dir.resolve()}")
        print(f"Total spent: ${spent:.4f} / ${args.budget:.2f} budget")
        print("\nGenerated files:")
        for f in sorted(out_dir.glob("*.json")):
            print(f"  {f.name}")
        return

    api_key = get_api_key()
    print(f"=== SIE Pass 4 generator ===")
    print(f"Budget: ${args.budget:.2f}  ·  Spent so far: ${spent:.4f}  ·  "
          f"Remaining: ${args.budget - spent:.4f}")

    def check_budget():
        s = total_spent(out_dir)
        if s >= args.budget:
            raise SystemExit(f"\n!! Budget cap reached: ${s:.4f} >= ${args.budget:.2f}. "
                             f"Stopping. Re-run with --budget X to continue.")

    if args.test:
        print("\n--- TEST MODE: single lesson ---")
        L = sources["manual"]["3"]["lessons"][0]  # Unit 3 Lesson 1
        generate_one_lesson(api_key, L, out_dir, force=args.force)
        print(f"\nTotal spent: ${total_spent(out_dir):.4f}")
        return

    do_flashcards = args.flashcards or args.all
    do_guides = args.study_guides or args.all
    do_refs = args.reference_sheets or args.all

    if not (do_flashcards or do_guides or do_refs):
        print("Nothing to do. Pass --test, --flashcards, --study-guides, "
              "--reference-sheets, or --all.")
        return

    if do_flashcards:
        print("\n--- FLASHCARDS ---")
        print("12 unit decks (one call per lesson):")
        for u in range(1, 13):
            print(f"\nUnit {u}: {sources['manual'][str(u)]['name']}")
            for L in sources["manual"][str(u)]["lessons"]:
                generate_one_lesson(api_key, L, out_dir, force=args.force)
                check_budget()
        print("\n4 question-type decks:")
        for t in ["standard", "hard", "definitions", "calculations"]:
            generate_type_deck(api_key, t, sources, out_dir, force=args.force)
            check_budget()
        # Note: 4 JF decks are derived from unit decks by re-grouping at packaging time
        # (no extra API calls needed since the source content is the same)

    if do_guides:
        print("\n--- STUDY GUIDES (12 units) ---")
        for u in range(1, 13):
            generate_unit_guide(api_key, u, sources, out_dir, force=args.force)
            check_budget()

    if do_refs:
        print("\n--- REFERENCE SHEETS ---")
        for sheet in REFERENCE_SHEETS:
            generate_reference_sheet(api_key, sheet, sources, out_dir, force=args.force)
            check_budget()

    print(f"\n=== DONE ===")
    print(f"Total spent: ${total_spent(out_dir):.4f}")
    print(f"Output: {out_dir.resolve()}")


if __name__ == "__main__":
    main()
