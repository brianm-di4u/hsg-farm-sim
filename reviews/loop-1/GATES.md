# Loop 1 hard gates (recorded after the judge's ruling)

- **Tests:** the pixel suite passed 85/88 on the build under review. The contrast test was fixed and re-run green before the capture. The SwiftShader fps reading of 52.5 (with 0.98 ms script) was re-run on a quiet machine and passed on both viewports: desktop 58.7–61.1 fps, mobile 57.8–60.2 fps. The painted suite passed 87/88, with the same load-sensitive fps reading.
- **Pixel integrity:** pass (0 mixed blocks in every capture).
- **Performance:**
  - Desktop GPU and the 4× phone proxy are inside the budget.
  - **The 6× phone proxy failed on this build.** The 1886 snow town ran at 3.3 fps (219 ms script) and the 2026 lake at 3.5–13.5 fps.
  - Cause: first-visit terrain bakes, with their edge-cleaning pass, landed on walking frames. The chunk cache (10) was also smaller than the map (12 chunks).
  - Fixed after the ruling, for loop 2: the pixel style caches the whole map, bakes every chunk ahead on quiet frames after a scene starts, and counts colours in a flat table. The fix measured 50–62 fps at 6× in every scene (`benchmarks/perf-6x-fix.json`).
- **Verdict:** loop 1's scores are kept in the history as provisional, because one hard gate failed.
