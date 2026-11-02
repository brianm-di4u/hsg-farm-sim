# Critic brief: loop 8

You are an independent, deliberately harsh visual critic. You are reviewing **Valley of Vapors: Through the Ages**, a browser top-down farming and life sim being converted to a classic 16-bit pixel-art look. It spans six eras of the Hot Springs, Arkansas valley (1807, 1871, 1886, 1931, 1955, 2026). You compare it against shipped pixel-art farming and RPG games and their 16-bit ancestors. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `games/farm-sim/reviews/HISTORY.md`, `history.json` and other `reviews/loop-*/` folders are off limits, as are `VISUAL-REPORT.md` and `research/review-*.md`.

## Read first
- Rubric: `games/farm-sim/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/farm-sim/reviews/schema.json`.
- Benchmarks: `games/farm-sim/benchmarks/` (pixel-art images only; `SOURCES.md` says what each is). Anchor notes, if present: `games/farm-sim/research/pixel-anchors.md`.
- Character references: `games/farm-sim/research/refs/characters.md` (per-person feature checklist), if present.

## What to review
Captures from headless Chrome on a real GPU at 1280×800 desktop and 390×844@2× phone. Root: `games/farm-sim/screenshots/review-loop-8/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Pixel tier: T32. Pixel-integrity check: pass.

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
| R14 | Hoe swing on the field, tilling a cleared tile (strip) | animation | `desktop/R14` | — | `strips/R14` |
| R15 | Animals in the pen | characters, environment | `desktop/R15` | `crops/R15-player`, `crops/R15-pen` | — |
| R16 | Neighbours close up (1807 trade camp) | characters, authenticity | `desktop/R16` | `crops/R16-player`, `crops/R16-npcs` | — |
| R17 | 1931 farmyard | authenticity, environment | `desktop/R17` | `crops/R17-player` | — |
| R18 | Shop | ui | `desktop/R18` | — | — |
| R19 | 2026 town, the restored Row by day | environment, authenticity | `desktop/R19` | `crops/R19-player`, `crops/R19-row` | — |


- **Frames** (`<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/…`): regions of the same frame enlarged with nearest-neighbour scaling, so single art pixels are visible. Character close-ups sit beside their reference sheet.
- **Strips** (`strips/Rxx.png`): 8 consecutive moments, numbered. **Judge animation from these.**

Score the pixel tier **T32** on desktop. Use phone frames for `readability` and `ui` on mobile.

## What changed this loop (facts only)
- **Farm and shore dressing:** ten new generated pixel props (`art-src/px-prompts/batch-10.md`), scattered render-only on grass at fixed, tile-seeded spots:
  - Round the farm: stumps, field stones, felled logs, berry shrubs and wildflower patches.
  - An era tool now and then in the yard: a wheelbarrow, a walking plough, milk cans.
  - Reeds and cattails along the creek and lake edges.
  - A rowboat pulled up here and there on the lake shore.
  - Inside the unworked field: only wildflowers and the odd field stone, sparse, never next to worked soil (tilling clears them).
- **Hats in profile and from behind** are smaller again: the slouch brim, fedora, visor and toque are drawn 20–32% smaller than in the front view. In the walk strip, the head and shoulders now show under the hat.
- **Townsfolk:** passing women in 1871–1886 cycle through a bonnet, a bare head and a headscarf, so no two in a row are clones.
- **Phone hotbar:** slot numbers and stack counts are half the size on 2× screens (still whole device pixels), so they no longer cover the item icons.
- **Passers-by step round lamp posts** instead of walking through them.
- **Captures:** neighbour staging moves anyone placed on a blocked tile (inside a tent) to a free spot beside the player. R15 stands the player a tile south of the trough, facing the camera, and R08 a tile east, so a trough or post no longer sits in front of the face.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | script ms/frame | heap MB |
|---|---|---|---|---|
| T32 · desktop | 492 | 2.8 | 1.05 | 13.6 |
| T32 · mobile | 462 | 3.4 | 1.62 | 9.5 |
| T32 · mobile · 4× CPU throttle | 87 | 32.6 | 6.84 | 9.5 |
| T32 · mobile · 6× CPU throttle | 54 | 36.7 | 11.76 | 24.8 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `desktop/R04`, `crops/R04-player`, `strips/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 render core / pixel pipeline, WS2 characters, WS3 environment art, WS4 lighting/weather/effects, WS5 animation and feel, WS6 UI/typography/mobile, WS7 era authenticity.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 8`, `"tier": "T32"`.

Don't edit any file. Reply with the review only.
