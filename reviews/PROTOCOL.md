# Adversarial review loop: protocol (pixel-art campaign)

The pixel-art campaign (`VISUAL-PLAN-PX.md`) runs as a loop: **build → test → capture → independent critiques → advocate → judge → tally → develop**. This file is the procedure. RUBRIC.md defines the scores and schema.json the output shape. The machinery is adapted from games/football's v3 campaign.

## Roles

| Role | Who | Sees | Must not see |
|---|---|---|---|
| Critic A | Claude subagent, brief `briefs/critic.md` | this loop's captures, the rubric, the benchmarks, the references, the loop brief | any prior score, the other critic, the advocate and judge files |
| Critic B | Codex through the `codex:codex-rescue` subagent, run from `C:\Video Game Projects`, brief `briefs/critic.md` plus `briefs/codex-wrapper.md` | same as Critic A | same as Critic A |
| Advocate | Claude subagent, `briefs/advocate.md` | both critiques, the captures, CHANGES.md | HISTORY.md |
| Judge | Claude subagent, `briefs/judge.md` | everything above, plus HISTORY.md and perf.json | — |

The developer (the main session) writes CHANGES.md and inspects every capture before the review. It never edits a reviewer's output.

## Blindness
- The critics run in parallel. Their outputs are held in the developer's scratch folder and copied to `loop-N/critic-claude.md` and `loop-N/critic-codex.md` only after both have returned.
- The critic brief carries no prior score and no developer opinion of quality. CHANGES.md lists what changed, never how good it is.
- Every third loop, the judge scores one unlabeled pixel-art benchmark (`calibration.jpg`) to detect drift. Calibration images must be pixel art: football's photoreal anchors marked stylized art down.

## The loop (N = loop number)
1. `node shared/tools/inline.mjs games/farm-sim`
2. `HS_QUERY=style=pixel node shared/test-harness/run.mjs games/farm-sim --milestone px-loop-N` and the same without `HS_QUERY` (until the painted path is removed). Both must be all green: a hard gate.
3. `node games/farm-sim/tools/shots-gpu.mjs review-loop-N --verify`, which also runs the pixel-integrity check (a hard gate).
4. `node games/farm-sim/tools/perf-gpu.mjs --out=games/farm-sim/reviews/loop-N/perf.json`, then again with `--throttle=4 --viewports=mobile --repeat=3` and `--throttle=6 --viewports=mobile --repeat=3` and the **same** `--out`. The budget in `research/pixel-budget.md` is a hard gate.
5. The developer opens every frame, close-up and strip, and writes `loop-N/CHANGES.md`.
6. `node games/farm-sim/tools/review-prep.mjs N` writes `loop-N/brief.md`.
7. Critics A and B in parallel (blind), then the advocate, then the judge (judge.md, with the final JSON block).
8. `node games/farm-sim/tools/review-tally.mjs N` validates every JSON block, writes `scores.json` and `gaps.json`, updates HISTORY.md, applies the stop rule and prints the ranked backlog for the next loop.
9. Develop the backlog. Commit only `games/farm-sim/` (code, art sources, packed assets, `reviews/loop-N/`); never push. Then go to step 1 with N+1.

## Backlog selection
- **Priority** = expectedGain × weight ÷ effort cost. Weight is 1.5 for a category below its gate, 1.0 otherwise, 0.3 once a category is 1 above its gate. Effort cost: S = 1, M = 2, L = 4.
- A category that drops by 0.5 or more since the last loop forces a regression gap to the top.
- A loop takes about 8 effort points.

## Stop rule
- **Pass:** every gate in RUBRIC.md is met.
- **Stagnation:** a loop whose total doesn't beat the best total so far. Stop after 2 stagnant loops in a row.
- **No loop cap.** Loops run back to back until the pass or stagnation rule fires.

## Wall protocol
A category that hasn't risen for 2 loops gets a root-cause pass before more of the same work: a separate diagnosis subagent (plus a Codex second opinion) decides whether the cause is the asset pipeline, the tier, the palette, rubric calibration or code. The options are tried in order: change the asset pipeline (generated → Blender → LPC → code-drawn) → change the tier within budget → re-calibrate an anchor (logged) → re-plan. Every pivot is logged in `VISUAL-PLAN-PX.md` under "Pivots".

On stop, VISUAL-REPORT.md gets the final scores and the remaining ranked gaps.
