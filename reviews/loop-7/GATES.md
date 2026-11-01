# Loop 7 hard gates

- **Tests (on the captured build):** the pixel suite passed 88/88 and the painted suite passed 88/88.
- **Pixel integrity:** pass in all 26 captures. The repeat capture of R04 was repeatable.
- **Performance** (`perf.json`, T32; throttled scenes measured 3 times each, median p95):
  - Desktop GPU: 667–1580 fps.
  - Phone 4×: 113–185 fps, median p95 ≤ 17.7 ms.
  - Phone 6×: 62–113 fps (floor 24).
  - Heap ≤ 24.8 MB.
  - All inside budget.
