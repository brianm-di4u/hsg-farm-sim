# Loop 6 hard gates

- **Tests:**
  - On the captured build, the pixel suite passed 86/88. Its contrast test failed on both viewports because the HUD emoji were hidden with transparent text.
  - The emoji were moved into spans hidden with `display: none` (the buttons keep their aria-labels). The pixel suite then passed 88/88 and the painted suite 88/88.
  - A recapture of R04 after the fix differed from the review capture by at most 0.06/255 (particle randomness), so the captures stand.
- **Pixel integrity:** pass in all 26 captures. The repeat capture of R04 was repeatable.
- **Performance** (`perf.json`, T32; throttled scenes measured 3 times each, median p95):
  - Desktop GPU: 670–1582 fps.
  - Phone 4×: 108–194 fps, median p95 ≤ 17.8 ms.
  - Phone 6×: 57–107 fps (floor 24). The snow town's median p95 is 63.7 ms; the p95 rule applies at 4× only.
  - Heap ≤ 23.4 MB.
  - All inside budget.
