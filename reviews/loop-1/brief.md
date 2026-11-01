# Critic brief: loop 1

You are an independent, deliberately harsh visual critic. You are reviewing **Valley of Vapors: Through the Ages**, a browser top-down farming and life sim being converted to a classic 16-bit pixel-art look. It spans six eras of the Hot Springs, Arkansas valley (1807, 1871, 1886, 1931, 1955, 2026). You compare it against shipped pixel-art farming and RPG games and their 16-bit ancestors. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `games/farm-sim/reviews/HISTORY.md`, `history.json` and other `reviews/loop-*/` folders are off limits, as are `VISUAL-REPORT.md` and `research/review-*.md`.

## Read first
- Rubric: `games/farm-sim/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/farm-sim/reviews/schema.json`.
- Benchmarks: `games/farm-sim/benchmarks/` (pixel-art images only; `SOURCES.md` says what each is). Anchor notes, if present: `games/farm-sim/research/pixel-anchors.md`.
- Character references: `games/farm-sim/research/refs/characters.md` (per-person feature checklist), if present.

## What to review
Captures from headless Chrome on a real GPU at 1280×800 desktop and 390×844@2× phone. Root: `games/farm-sim/screenshots/review-loop-1/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Pixel tier: T16. Pixel-integrity check: pass.

| Id | Moment | Main categories | Frames | Close-ups | Strip |
|---|---|---|---|---|---|
| R01 | Title screen | ui, authenticity | `desktop/R01`, `mobile/R01` | — | — |
| R02 | 1807 farm, spring morning | environment, pixel | `desktop/R02`, `mobile/R02` | `crops/R02-player` | — |
| R03 | 1871 farm field with crops at every stage | environment, readability | `desktop/R03` | `crops/R03-player`, `crops/R03-field` | — |
| R04 | 1886 town, Bathhouse Row by day | environment, authenticity, pixel | `desktop/R04`, `mobile/R04` | `crops/R04-player`, `crops/R04-row` | — |
| R05 | 1931 town at night | lighting, authenticity | `desktop/R05`, `mobile/R05` | `crops/R05-player` | — |
| R06 | 1955 town at dusk | lighting, authenticity | `desktop/R06` | `crops/R06-player` | — |
| R07 | 2026 lake, evening | environment, lighting | `desktop/R07` | `crops/R07-player` | — |
| R08 | 1886 springs in morning fog | lighting, environment | `desktop/R08` | `crops/R08-player` | — |
| R09 | 1871 town in rain | lighting, environment | `desktop/R09` | `crops/R09-player` | — |
| R10 | 1886 town in snow | environment, lighting | `desktop/R10` | `crops/R10-player` | — |
| R11 | Dialogue with a neighbour | ui, characters | `desktop/R11`, `mobile/R11` | `crops/R11-npcs` | — |
| R12 | Pack and crafting panel | ui, readability | `desktop/R12`, `mobile/R12` | — | — |
| R13 | Walk cycle (strip) | animation, characters | `desktop/R13`, `mobile/R13` | — | `strips/R13`, `strips/R13-mobile` |
| R14 | Hoe swing on the field (strip) | animation | `desktop/R14` | — | `strips/R14` |
| R15 | Animals in the pen | characters, environment | `desktop/R15` | `crops/R15-player`, `crops/R15-pen` | — |
| R16 | Neighbours close up (1807 trade camp) | characters, authenticity | `desktop/R16` | `crops/R16-player`, `crops/R16-npcs` | — |
| R17 | 1931 farmyard | authenticity, environment | `desktop/R17` | `crops/R17-player` | — |
| R18 | Shop | ui | `desktop/R18` | — | — |


- **Frames** (`<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/…`): regions of the same frame enlarged with nearest-neighbour scaling, so single art pixels are visible. Character close-ups sit beside their reference sheet.
- **Strips** (`strips/Rxx.png`): 8 consecutive moments, numbered. **Judge animation from these.**

Score the pixel tier **T16** on desktop. Use phone frames for `readability` and `ui` on mobile.

## What changed this loop (facts only)
- **The pixel style is what these captures show** (`?style=pixel`).
  - The world draws into a low-resolution canvas at 16 art px per tile, scaled up by a whole number with no smoothing: 4× on the 1280×800 desktop (320×200 art px visible), 4× device px on the 390×844@2 phone.
  - The camera and every sprite sit on whole art pixels.
- **Pixel assets:** buildings, trees, props, crops, animals, icons and terrain textures are converted at pack time (`tools/pixelize.py`, `tools/pack-px.py`) at exactly the size they are drawn. The conversion:
  - recovers the grid and quantizes to an OKLab palette, with each art pixel taking the majority colour of its block;
  - uses binary alpha;
  - flattens painted texture with a median filter;
  - adds a 1-px selective outline (a darkened shade of the bordering colour) on sprites, none on terrain.
  - The sources are still the painted pictures; no art was redrawn by hand.
- **Terrain edges:** baked terrain chunks are cleaned so that anti-aliased blend pixels between materials snap to one side (hard pixel steps). Small details such as flowers and pebbles are kept.
- **Characters:**
  - Re-rendered in Blender with 13 frames per direction: a 2-frame idle breath, a 6-step walk with arm swing and head bob, and a 5-frame tool swing (wind-up, top, strike, impact, recover).
  - Converted to 21×32 cells, where each body layer has three shades filled per person with a hue-shifted ramp. The 1-px outline takes the hue of the part it borders.
  - New garment layers: apron, vest, overalls, ponytail.
  - Women before 1955 (Ada, Nora, Margaux, Corinna, Hattie, Ora, June Talley, Lorraine) now wear the dress body.
  - Aprons: Ada, Nora, Corinna, Hattie, Ora, Priya. Vests: Caleb, Lucius. Overalls: Rusty. Ponytails: June Vale, Priya. Hattie's cap is white.
- **Light:**
  - Lamp pools and lit windows are hard-edged rings: 4 bands, no smooth gradient.
  - Darkness and the time-of-day tint change in steps.
  - Fog is lighter over the gameplay layer.
  - 1886 street lamps are oil lantern posts (gas posts date from 1897).
- **Weather and effects:** 1-px rain streaks and 1–2 px snow flakes; particles, steam puffs, splash rings, hearts and water glints are drawn as whole pixels; blob shadows are hard-edged.
- **Text and UI:**
  - In-world text (signs, name tags, pickup counts, speech badges) uses a 5×7 bitmap font.
  - The HUD and panels use pixel fonts (OFL): Pixelify Sans for body text, plus one display face per era (Jacquard 12 for 1807/1871, Jacquarda Bastarda 9 for 1886, Silkscreen for 1931, Jersey 10 for 1955, Micro 5 for 2026).
  - Panels use square-cornered 9-slice pixel frames per era, each with a material detail: hide stitching, plank grain, a brass bead, a gilt double line, a chrome highlight or an LED line.
  - The target box is drawn as pixel corner brackets.
- **Occlusion:** lamp posts in front of the player and buildings whose roof covers the player turn see-through.
- **Capture changes:**
  - R11 opens a dialogue with a neighbour placed beside the player.
  - R15 has animals in the pen.
  - R16 places three neighbours by the player.
  - R03's crop plot no longer sits under the player.
  - Strips pin the clock and advance 50 ms per frame, so time-based animation is sampled exactly.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | script ms/frame | heap MB |
|---|---|---|---|---|
| T16 · desktop | 247 | 17.6 | 1.99 | 16.3 |
| T16 · mobile | 226 | 20.6 | 1.94 | 18.4 |
| T16 · mobile · 4× CPU throttle | 68 | 37.3 | 9.49 | 15.4 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `desktop/R04`, `crops/R04-player`, `strips/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 render core / pixel pipeline, WS2 characters, WS3 environment art, WS4 lighting/weather/effects, WS5 animation and feel, WS6 UI/typography/mobile, WS7 era authenticity.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 1`, `"tier": "T16"`.

Don't edit any file. Reply with the review only.
