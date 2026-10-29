# Valley of Vapors — visual enhancement plan

Baseline: `--milestone visual-before`, 82/82 passing, every sheet inspected. Benchmarks (git-ignored, `benchmarks/`,
sources in `benchmarks/SOURCES.md`): official store screenshots of four acclaimed farming and life sims (three
pixel-art, one 3D). The independent review of the baseline is in `research/review-before.md`.

| Category | Before | Benchmarks |
|---|---|---|
| Art | 3 | 9 |
| Lighting | 4 | 8 |
| Animation / feel | 2 | 9 |
| UI | 5 | 8 |
| Typography | 5 | 8 |
| Readability | 5 | 8 |
| Mobile | 6 | 7 |
| Authenticity | 5 | — |

Top gaps (reviewer's ranking): empty flat farm field; desktop camera too far out; no depth (flat fronts, no roofs,
no shadows); blocky lake and ruler-straight creek; eras look alike on the farm; repeated identical bathhouses and
1931 ≈ 1955; night lighting (washes over facades, dark windows, player glow in daylight); flat time-of-day and
weather; tiny stiff characters; hard-to-read crops and animals; tufa reads as pavement; abstract ridge and quarry;
one tree repeated; no steam in play; web-like UI and small type; unfinished title and era wipe; no juice.

## 1. Direction: 2D, hand-painted, with Blender-rendered characters

The game stays a top-down 2D tile game: the simulation, collision grid, saves and tests are built on tiles, phones
need the flat camera, and the genre's best titles are 2D. What changes is everything drawn on top of the grid:

- **Painted world art** (Codex image generation, one approved pilot as the style reference for every batch; tool,
  prompts and license in `SAMPLES.md` → Art provenance, every prompt in `art-src/PROMPTS.md`):
  gouache storybook look, three-quarter top-down view, soft light from the upper left, warm brown outlines.
  Painted is chosen over pixel art because image generation keeps a consistent painted style but not a consistent
  pixel grid, and painted art scales cleanly across 36–64 px tiles and 1–2× DPR.
- **Characters from Blender** (`art-src/blender/characters.py`): one jointed chibi figure rendered from the same
  camera in three directions (right is mirrored) × idle, a 4-frame walk and a 2-frame tool swing, layer by layer in
  toon greys. The game tints skin, hair, shirt and trousers from each person's `look`, so 24 people (18 neighbours,
  6 Vales) come from three atlases. A dress variant gives period silhouettes; hats, beards and glasses are overlays.
- **Organic terrain in code**: painted, tiling textures per material and era, laid down as smooth regions
  (marching squares over the tile grid with a little noise) instead of square tiles, so shorelines, creek banks,
  paths and the tufa have natural edges while collision stays on tiles.
- **Light in code**: time-of-day colour grade, sun shadows that swing through the day, era light sources pooling on
  the ground, lit windows after dusk, the player's lantern only at night.

Not chosen: full three.js. It would mean re-deriving every screen coordinate the tests and touch controls use, and
SwiftShader in the harness makes 3D 5–20× slower; the gain over painted 2D for this genre is small.

## 2. Assets

| Set | Source | Count | Notes |
|---|---|---|---|
| Style pilot | Codex | 4 | plank bathhouse, oak, grass, log cabin (approved, used as references) |
| Buildings 1807–1871 | Codex | 12 | tent, cabin, hut, plank store, boardinghouse, house, mill, five farmhouse eras |
| Buildings 1871–1886 | Codex | 12 | second plank bathhouse, stage stop, drugstore, home tent, four Victorian bathhouses, brick block, cottage, depot, grand hotel |
| Buildings 1931 | Codex | 10 | four distinct revival bathhouses for the Row, club, radio, cottage, twin-tower hotel, tourist court, feed store |
| Buildings 1955 / 2026 | Codex | ~12 | farm supply, drive-in, motor hotel, show barn, ranch houses, the four Row bathhouses restored for reuse (brewery, spa, cultural centre, hotel), hardware, market shed, cottage |
| Nature and props | Codex | 14 | oak × 4 seasons, shortleaf pine, magnolia, boulder, novaculite outcrop, quartz cluster, grass tuft, beautyberry, shipping crate, trough, sign, campfire |
| Lamps | Codex | 6 | campfire, lantern post, gas lamp, 1930s ornamental lamp, cobra-head sodium, LED pole |
| Terrain textures | Codex | 18 | grass, forest floor, path, wagon road, macadam, brick, asphalt, pavers, flagstone, sand, red clay, tufa, creek bed, lake, soil dry/wet, snow, ridge rock |
| Crops | Codex | 20 | one sheet per crop, five growth stages left to right |
| Animals | Codex | 3 | cow, goat, hen |
| Era vistas | Codex | 6 | title screen and era wipe panoramas of the valley |
| Characters | Blender | 3 atlases | 21 frames × layers, 128 × 192 cells |

Packing: `art-src/art.json` → `node shared/test-harness/art-pack.mjs games/farm-sim` → `assets/*.webp` (keyWhite
for motifs). Textures are made tileable at pack time by `tools/seamless.mjs` (offset cross-fade), never at runtime,
so no pixel readback is needed under file://.

## 3. Research additions

`research/visual-eras.md` (new): geography of Gulpha Creek and the springs, the tufa and its algae, the town and
Bathhouse Row by era, paving and street lighting dates, Lake Hamilton's filling, farm buildings, clothing and
palettes, each with sources. It drives the era art direction below.

Era art direction (palette, materials, light):
- **1807 Steam Valley** — forest greens, canvas, logs; campfire light; trails only; steam everywhere.
- **1871 The Reservation** — raw plank greys and red clay; wagon-rutted roads; lanterns.
- **1886 Golden Age** — painted Victorian colours, brick, macadam; gas lamps; magnolias on the street.
- **1931 The Open Town** — cream stucco and red tile (the Row as rebuilt in 1912–23), brick streets, linen-postcard
  colours by day and neon at night; Lake Hamilton new, with raw red-clay shores.
- **1955 Mid-Century** — Kodachrome turquoise and coral, asphalt with painted lines, motor hotels; sodium light.
- **2026 Today** — restored Row in reuse, brick pavers, lake homes; cool LED light.

Map accuracy: the play grid stays (moving the town or creek would break quests, schedules and tests), but it is
read as a schematic of the real valley: Hot Springs Creek bottoms with the farm (the creek was named Gulpha here until
the 2026-10-29 fix pass; Gulpha Creek runs east of Hot Springs Mountain), the town as Bathhouse Row with the
springs' tufa at its end, the novaculite ridge north, Lake Hamilton south. Accuracy goes into what each place looks
like in each era and into the painted vistas.

## 4. Performance plan

- 60 fps on a mid laptop and 30+ on phones in the busiest scene (town at night in rain).
- Terrain baked once per chunk (16 × 16 tiles) per chapter/season/weather; chunk bakes capped at 1.5× DPR
  (≤ 96 px per tile) and an LRU of 10, so chunk memory stays under ~90 MB worst case and ~30 MB on phones.
- Every painted sprite pre-scaled once to its on-screen size (`cached()`); per frame only `drawImage` of cached canvases.
- Shadows from cached silhouettes with one transform each; night layer stays at quarter resolution; the colour grade
  is a CSS blend layer the compositor applies, not a canvas fill.
- Progressive loading: characters, props and the current chapter's textures and buildings first; other chapters
  after first paint. `isIdle()` stays false while art loads; the vector art is the fallback and `?art=0` forces it.
- Download target: ≤ 8 MB of WebP in `assets/`, HTML still ~0.3 MB.

## 5. Test plan

- All 82 existing tests must keep passing at both viewports with zero console errors and zero external requests.
- New `tests/art.test.mjs`: every manifest asset loads (no 404s); painted art is in use after load; `?art=0` falls back;
  a chapter tour at both viewports (farm, town, night, rain, snow, lake) for screenshots.
- Perf test extended: busiest scene fps plus in-page script time per frame, heap, asset bytes.
- `tools/check-file-url.mjs`: the built game from file:// at both viewports with no errors or requests.
- Each milestone: run with `--milestone vis-mN`, inspect every sheet, rerun the adversarial reviewer.

## 6. Milestones

1. **M1 World art**: asset loader, painted terrain with organic edges, water, tufa, buildings, trees and props,
   characters with walk cycles and tool swings, zoomed desktop camera.
2. **M2 Light and weather**: time-of-day grade and moving sun shadows, era light sources, lit windows, steam,
   rain splashes and wet ground, snow cover, drifting fog.
3. **M3 Eras, crops, animals, vistas, UI**: era palettes for the world, crops and animals, painted vistas,
   era fonts and chunkier HUD.
4. **M4 Juice and polish**: pickups arcing to the hotbar, splashes, dirt puffs, hearts; reviewer pass fixes.
