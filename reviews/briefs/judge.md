# Judge brief: loop {{LOOP}}

You are the judge in an adversarial visual review of **Valley of Vapors: Through the Ages** (browser top-down farming sim, converted to 16-bit pixel art), set against shipped pixel-art farming and RPG games. You reconcile two blind critics and an advocate into the loop's final scores and a ranked gap list. That list drives the next development loop.

## Inputs
- Rubric `reviews/RUBRIC.md` (anchors, gates, evidence rule), schema `reviews/schema.json`
- Loop brief `reviews/loop-{{LOOP}}/brief.md`, perf `reviews/loop-{{LOOP}}/perf.json`
- Captures `screenshots/{{SHOTS}}/`, benchmarks `benchmarks/`
- `reviews/loop-{{LOOP}}/critic-claude.md`, `critic-codex.md`, `advocate.md`
- History `reviews/HISTORY.md`: earlier judged scores, for trend only. Don't anchor on them; score what is on screen now.

## Rules
- **Open the captures yourself.** For any category where the critics differ by more than 1.0, cite at least one close-up or strip you checked and say who was right.
- **Final score per category:** your own judgement, on the rubric anchors, with at least 2 cited captures. Drop any uncited claim.
- **Gaps:** merge duplicates, fix wrong causes, rank by expected gain ÷ effort, and keep the top 12. Each gap needs a concrete, testable fix ("1-px selective outline on every building sprite, darkest ramp shade", not "cleaner art") and a workstream.
- **Verdict:** `stop-pass` if every gate in RUBRIC.md is met, otherwise `continue`. The tally script applies stagnation.
{{DRIFT}}

Write a short ruling per category, then the ranked gaps. End with one fenced ```json block per schema.json: `"role": "judge"`, `"loop": {{LOOP}}`, `"tier": "{{TIER}}"`, plus `"verdict"`. Don't edit any file.
