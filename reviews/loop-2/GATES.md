# Loop 2 hard gates

- **Tests (on the captured build):** the pixel suite passed 88/88. The painted suite passed 87/88; its one failure (the mobile fps/script reading) ran while the GPU capture was running, and re-run alone it passed 2/2.
- **Pixel integrity:** pass in all 25 captures. The repeat capture of R04 differed by 0.074/255.
- **Performance** (`perf.json`): desktop GPU 262–630 fps. Phone 4×: 53–135 fps, p95 ≤ 42.8 ms. Phone 6×: 69–106 fps. Heap ≤ 18.4 MB. All are inside `research/pixel-budget.md`. The worst single frames were 280 ms on the 6× phone lake and 145 ms on the 4× phone springs; both are logged.
