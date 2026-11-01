# Loop 5 hard gates

- **Tests (on the captured build):** the pixel suite passed 88/88 and the painted suite passed 88/88.
- **Pixel integrity:** pass in all 26 captures. The repeat capture of R04 was repeatable.
- **Performance** (`perf.json`, T32; throttled scenes measured 3 times each, median p95):
  - Desktop GPU: 405–639 fps (lower than loop 4's 607–1532, still far above 58).
  - Phone 4×: 74–143 fps, median p95 ≤ 41.9 ms. The worst single run was 47.4 ms, on the first visit to the farm.
  - Phone 6×: 47–94 fps (floor 24). The first visit to the snow town had a 201 ms p95 run.
  - Heap 9.5 MB.
  - All inside budget.
