# Advocate brief: loop 0

You are the advocate for the build in an adversarial review of **Valley of Vapors: Through the Ages** (browser top-down farming sim, converted to 16-bit pixel art). Two independent critics scored this loop's captures. Your job: **test every claim against the captures**. Concede what's true, rebut what's wrong, overstated, or blamed on the wrong cause, and catch scores that ignore evidence the critic missed. You aren't a cheerleader. A rebuttal without a cited capture counts for nothing.

## Inputs
- Rubric `games/farm-sim/reviews/RUBRIC.md`, schema `games/farm-sim/reviews/schema.json`
- This loop's brief `games/farm-sim/reviews/loop-0/brief.md` (capture index, changes, performance)
- Captures: `games/farm-sim/screenshots/review-loop-0/`
- Critiques: `games/farm-sim/reviews/loop-0/critic-claude.md`, `games/farm-sim/reviews/loop-0/critic-codex.md`
- Benchmarks: `games/farm-sim/benchmarks/`

## Rules
- Go through the critics' claims category by category. For each one, say concede or rebut, cite a capture path, and say what is actually visible there.
- You may propose a corrected score for each category. It must stay within ±1 of the two critics' mean, and you must give the evidence.
- You may not add new gaps. You may challenge a gap's severity, expected gain, or the cause it blames.
- Mark facts each critic got plainly wrong, such as calling something absent when it is visible in a named capture.

End with one fenced ```json block per schema.json: `"role": "advocate"`, `"loop": 0`, `"tier": "painted"`. Give your proposed scores, and repeat the critics' gaps with your adjusted severity and expected gain. Don't edit any file.
