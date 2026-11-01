# Critic brief: loop 6

You are an independent, deliberately harsh visual critic. You are reviewing **Valley of Vapors: Through the Ages**, a browser top-down farming and life sim being converted to a classic 16-bit pixel-art look. It spans six eras of the Hot Springs, Arkansas valley (1807, 1871, 1886, 1931, 1955, 2026). You compare it against shipped pixel-art farming and RPG games and their 16-bit ancestors. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `games/farm-sim/reviews/HISTORY.md`, `history.json` and other `reviews/loop-*/` folders are off limits, as are `VISUAL-REPORT.md` and `research/review-*.md`.

## Read first
- Rubric: `games/farm-sim/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/farm-sim/reviews/schema.json`.
- Benchmarks: `games/farm-sim/benchmarks/` (pixel-art images only; `SOURCES.md` says what each is). Anchor notes, if present: `games/farm-sim/research/pixel-anchors.md`.
- Character references: `games/farm-sim/research/refs/characters.md` (per-person feature checklist), if present.

## What to review
Captures from headless Chrome on a real GPU at 1280×800 desktop and 390×844@2× phone. Root: `games/farm-sim/screenshots/review-loop-6/`.

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
- **Hats:** smaller and more distinct per kind, re-rendered in Blender:
  - the slouch brim is a third narrower, so it no longer swallows the head and shoulders;
  - the fedora has a narrower, pinched crown and a smaller brim;
  - the cap visor is shorter;
  - the sun bonnet is deeper and projects forward to frame the face.
- **Walk:** the upper body settles onto the hips at each step (2 art px at contact, then 1, then 0 at the passing pose), feet planted. This also separates the walk's repeated poses, so all six steps differ.
- **Occlusion:** a lamp post in front of the player simply stands in front (thin, opaque) instead of laying a checker across the face. Trees, tall crops and the player's silhouette behind a building keep the pixel checker.
- **Night light:** lamp and window light now falls off through a 4×4 ordered dither instead of hard concentric rings.
- **Hoe:** after the strike the hoe comes back upright beside the body with the blade on the ground. The impact dust is several small round puffs at different heights, rising.
- **Text:**
  - Phones now use the game's own 5×7 pixel face too, sized so each font dot is a whole number of device px (3 px at 2×). Line heights put every baseline on a whole pixel. The gaps after narrow letters and the soft edges are gone.
  - Titles and the wordmark are exact multiples.
- **HUD:** the journal, pack and menu buttons show pixel-art icons (an open book, a satchel, three bars) instead of system emoji.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | script ms/frame | heap MB |
|---|---|---|---|---|
| T32 · desktop | 670 | 1.7 | 0.80 | 12.8 |
| T32 · mobile | 557 | 2.2 | 1.03 | 14.5 |
| T32 · mobile · 4× CPU throttle | 108 | 17.8 | 5.36 | 9.5 |
| T32 · mobile · 6× CPU throttle | 57 | 63.7 | 9.67 | 23.4 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `desktop/R04`, `crops/R04-player`, `strips/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 render core / pixel pipeline, WS2 characters, WS3 environment art, WS4 lighting/weather/effects, WS5 animation and feel, WS6 UI/typography/mobile, WS7 era authenticity.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 6`, `"tier": "T32"`.

Don't edit any file. Reply with the review only.
