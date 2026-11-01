# Pixel style: performance budget (complexity ladder)

Measured with `tools/perf-ladder.mjs` on 2026-11-01. Base scene: the 1886 town, walking. Each axis is climbed alone by
adding render-only load through `__game.bench()`. Raw rows are in `benchmarks/ladder-1.json` (desktop GPU and
SwiftShader) and `benchmarks/ladder-phone-2.json` (phone proxies, measured on a quiet machine; the phone rows in
ladder-1 were taken while Blender was rendering and are not used).

Profiles:
- **gpu:** desktop 1280×800 on the RTX 5060 through ANGLE/D3D11, vsync off.
- **sw:** the same viewport in SwiftShader, the test harness's renderer.
- **phone4 / phone6:** 390×844 at 3× device pixels on the GPU, with 4× / 6× CDP CPU throttling. Throttling slows only
  the main thread; read these rows alongside the sw rows for raster cost.

## Results

| Axis | Desktop GPU | SwiftShader | Phone 4× (fps / p95 ms) | Phone 6× (fps / p95 ms) |
|---|---|---|---|---|
| Animated sprites (24×32, 4 frames) | 93 fps at 1600 | 60 fps at 1600 | 60 / 45 at 200 · 48 / 62 at 400 · 35 / 68 at 800 · 20 / 140 at 1600 | 68 / 47 at 200 · 42 / 62 at 400 · 33 / 95 at 800 · 20 / 114 at 1600 |
| Sprite size (100 sprites) | flat up to 128×128 | 60 fps | 57–88 fps at every size up to 128×128 | 52–93 fps at every size |
| Frames per character (60 at 32×48) | flat up to 32 | 60 fps | 75–101 fps at 4–32 frames | 64–75 fps |
| Extra night lights | 369 fps at 256 | 60 fps | 62 fps at 256 | 51 fps at 256 |
| Particles | 511 fps at 2000 | 60 fps | 78 fps at 2000 | 65 fps at 2000 |
| Tile size | 16, 24 and 32 all > 750 fps | 60 fps | 16: 141 fps · **24: 19 fps, 559 ms worst · 32: 59 fps, 263 ms worst** | 16: 63 fps · 24: 43 fps, 348 ms worst · 32: 29 fps, 371 ms worst |

## What it means

1. **Drawing is not the limit.** The low-resolution canvas makes per-frame work small. Sprite size, frames per
   character, light count and particle count can all go far beyond anything the game shows, on every profile. So
   **detail per sprite is not limited by performance.** The character tier (16×32 / 24×32 / 32×48) is decided by
   readability, accuracy and production cost (plan, Phase 2).
2. **The phone limit is the number of moving things.** At 4× throttle, frame rate stays at or above 30 up to about
   800 animated sprites. Budget: **≤ 200 animated actors on screen** (people, animals and ambient townsfolk) and
   **≤ 1000 particles**, which keeps phones at about 60 fps with headroom for other load.
3. **The larger tile tiers have a hitch problem, not a frame-rate problem.** At 24 and 32 px the terrain chunk bakes
   (and the edge-cleaning pass over them) grow with the square of the tile size. They land on the main thread as
   260–560 ms stalls on the phone proxy. **A move to 24 or 32 px tiles requires time-sliced chunk baking**: baking all
   chunks behind the chapter wipe, cleaning edges in slices, or a worker. Until then **T16 is the only tier inside
   budget.**
4. **Memory:** heap 9.5–19.6 MB in every run (budget 40). **Download:** pixel assets are 1.5 MB at T16, 1.7 MB at T24
   and 1.9 MB at T32 (budget 4 MB).

## Budget (hard gate for every loop)

| Profile | Requirement (busiest review scenes, walking) |
|---|---|
| Desktop GPU | ≥ 58 fps |
| SwiftShader | ≥ 55 fps and < 8 ms script per frame (`tests/perf.test.mjs`) |
| Phone 4× | ≥ 30 fps and p95 frame ≤ 50 ms. A single worst frame is not gated (GC and first-visit bakes), but anything > 150 ms is logged as a gap |
| Phone 6× | ≥ 24 fps |
| Everywhere | heap < 40 MB, pixel assets ≤ 4 MB per tier, ≤ 200 animated actors and ≤ 1000 particles on screen |

The earlier provisional rule "worst frame ≤ 50 ms at 4×" failed even the unloaded base scene because of one-off
spikes (GC, a first-visit bake), so it was replaced by the p95 rule above.
