# Loop 8 hard gates

- **Tests (on the captured build):** the pixel suite passed 88/88 and the painted suite passed 88/88.
- **Pixel integrity:** pass in all 26 captures. The repeat capture of R04 was repeatable.
- **Performance** (`perf.json`, T32; throttled scenes measured 3 times each, median p95):
  - Desktop GPU: 492–1057 fps.
  - Phone 4×: 87–142 fps, median p95 ≤ 32.6 ms.
  - Phone 6×: 54–91 fps (floor 24).
  - Heap ≤ 24.8 MB.
  - All inside budget.
  - Script time per frame rose by about 1 ms on the throttled phone: the render-only scatter checks the visible tiles each frame. It is still far under 8 ms.
