# Loop 4 hard gates

- **Tests (on the captured build):** the pixel suite passed 88/88 and the painted suite passed 88/88.
- **Pixel integrity:** pass in all 26 captures. The repeat capture of R04 differed by 0.000/255.
- **Performance** (`perf.json`, T32; throttled scenes measured 3 times each, the gate takes the median p95, see `research/pixel-budget.md`):
  - Desktop GPU: 607–1532 fps.
  - Phone 4×: 74–125 fps. The median p95 is ≤ 40.4 ms; the worst single run is the first visit to the snow town, at 50.7 ms.
  - Phone 6×: 55–113 fps (floor 24). The first visit to the snow town had a 334 ms p95 run; the fps floor still holds.
  - Heap ≤ 22 MB.
  - All inside budget.
- **Fix made during the loop:** pre-composing the townsfolk's walking frames two per frame after a scene starts made first visits slower, not faster: at 6× the composes spilled into walking frames. The A/B test showed first-visit p95 of 225–262 ms with it and 32–67 ms without. It was removed. The captures and tests above ran on the build without it.
- **Captures note:** running `shots-gpu.mjs` without an output folder used to default to `review-loop-0` and overwrote the git-ignored loop 0 (painted) captures with current pixel ones. The tool now requires the folder. The loop 0 scores and review text are unaffected.
