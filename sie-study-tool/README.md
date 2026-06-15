# SIE Study Tool

A browser-based study aid for the **FINRA Securities Industry Essentials (SIE)**
exam: timed quizzes, a 75-question practice test, pomodoro drilling, flashcards,
study guides, reference sheets, a searchable concept index, and a progress
dashboard.

Single-page app — open `index.html` (served from a static host). No build step
required to run; data ships in `sie_study_data.js`.

## Using it

- **No API key needed.** Quizzes, drills, and the practice test run from a
  pre-generated **question bank** built into the app.
- **Optional Anthropic API key** unlocks *live* AI-generated questions and
  follow-up chat. The key is stored only in your browser (localStorage) and is
  sent only to Anthropic's API. A **Forget key** button clears it.

## Sources & license

Built entirely on **public-domain and openly-licensed primary sources** — federal
securities statutes, the SEC rules in the CFR, the SEC investor.gov glossary, and
OpenStax textbooks — organized around the FINRA SIE Content Outline. SRO rulebooks
(FINRA/MSRB/CBOE) are used **offline only** to ground accuracy and are never
shipped to the browser.

Generated content is licensed **CC BY-NC-SA 4.0** (non-commercial). See
[LICENSE](LICENSE) and [CREDITS.md](CREDITS.md) for the full source list,
licenses, and retrieval dates. Not affiliated with or endorsed by FINRA, the SEC,
or OpenStax.

## Project layout

| File | Role |
|---|---|
| `index.html`, `sie_styles.css`, `sie_app.js` | The app (shipped) |
| `sie_study_data.js` | Shipped data: question bank, flashcards, guides, sheets, concept index, browser-safe outline |
| `sie_errata.txt` | Corrections that override source material at generation + runtime |
| `corpus/` | Source documents (public-domain ones tracked; SRO + full OpenStax git-ignored) |

## Regenerating content (maintainers)

The shipped data is produced by an offline pipeline (Python, stdlib only):

```sh
python build_sources.py          # parse the FINRA outline -> sie_sources.v2.js (offline manifest)
python build_concept_index.py    # investor.gov glossary -> pass4_output/concept_index.json
python sie_grounding.py --selftest   # verify corpus extractors resolve citations
python generate.py --all --question-bank   # generate study content + MCQ bank (needs ANTHROPIC_API_KEY, ~$30)
python bundle.py                 # assemble sie_study_data.v2.js
```

`generate.py` grounds every item in the corpus and constrains citations to
resolved rule references (anti-hallucination); SRO rule text is read from
`corpus/` at generation time only and never written downstream.
