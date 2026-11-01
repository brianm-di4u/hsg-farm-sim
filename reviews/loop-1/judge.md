# Judge: loop 1, tier T16

## Hard gates

| Gate | Status | Evidence |
|---|---|---|
| Pixel integrity on every capture | **Pass** | `screenshots/review-loop-1/shots.json`: `integrity.ok: true`, `maxBad 0.004`, 0 bad frames |
| Performance budget (`research/pixel-budget.md`) | **Desktop GPU, phone 4×, heap: pass. SwiftShader: fail on record. Phone 6×: not measured** | `perf.json`: desktop min 247 fps (floor 58). Phone 4× min 68.4 fps (floor 30), worst p95 37.3 ms (cap 50), worst single frame 116 ms (under the 150 ms logging line). Heap ≤ 18.4 MB (cap 40). The SwiftShader row (≥ 55 fps) reads 52.5 fps in `tests/perf.test.mjs`. No phone 6× row was taken this loop |
| All tests green | **Not met on record** | Pixel suite 85/88 and painted suite 87/88. The contrast failure was fixed and re-run green. The perf reading of 52.5 fps was not re-run in either suite |

The perf failure looks like machine load, not code. Script time is 0.98 ms per frame, about an eighth of the 8 ms cap. Still, a red test is a red test. Under RUBRIC.md, a loop with a failed hard gate is not scored, so treat the scores below as **provisional**. The tally should accept them only after `tests/perf.test.mjs` passes on a quiet machine (median of 3 runs at ≥ 55 fps) and a phone 6× row (≥ 24 fps) is added to `perf.json`. Either way the verdict is `continue`, because no category meets its gate.

## Disputes I checked myself

The critics differ by exactly 1.0 in three categories (lighting, animation, ui) and by less elsewhere, so none passes the >1.0 trigger. I still opened every capture where the advocate disputed a fact:

| Claim | Capture checked | Ruling |
|---|---|---|
| Augustin's portrait is "just the cropped sprite, no toque" (A) | `desktop/R11` portrait, zoomed | **Advocate right.** The portrait is upright, with a tall white toque, eyes, a red neckerchief and white shoulders. Only the in-world sprite is broken (tilted about 30° in `desktop/R11` and `mobile/R11`). That also makes B's "conspicuous toque identifies the chef" wrong for the in-world sprite |
| Hattie's white cap is not distinguishable (A) | `desktop/R11` zoom of Hattie | **Partly right on both sides.** A thin white band sits on top of her hair, but it doesn't read as a cap at 1×. Her hair renders mid-brown, but `refs/characters.md` specifies near-black `#1a1210`. That is a checklist miss nobody flagged |
| The cows are mushy blobs (A) | `crops/R15-pen` | **Advocate right.** The cows have separate legs, heads and a white-patched calf, with muddy interiors. The hens really are heart shapes |
| The 1871 phone header is "Cyrillic noise" (A) | `mobile/R13` | **Advocate right**: "CHAPTER 2 GOALS · 0/5" is legible with effort. Blackletter at this size is still a poor choice |
| The lake has no water ramp (A) | `desktop/R07` | **Advocate right on the fact.** It has a teal shallow band and a darker deep body. It still reads as flat murk |
| There is no 1871 traffic (A) | `desktop/R15`, bottom right | **Advocate right.** A horse-drawn wagon is present |
| Every HUD frame misprints glyphs, including the year (advocate; B missed it) | `desktop/R18`, `desktop/R06`, `desktop/R07` HUD zoomed, `mobile/R05` | **Confirmed, and worse than reported.** "1955" renders "19SS" or "1988" (`desktop/R06`, `desktop/R18`). In `desktop/R07` the 2s of "2026" and "18:20" read as 8s. "21:30" reads "81:30" (`mobile/R05`). The zoom also shows grey anti-aliased fringes on every HUD glyph, so the text is neither integer-scaled nor on the world grid. Critic B's "orderly shop hierarchy" ignored all of this |
| B's animation 4 contradicts its own description of a working walk | `strips/R13`, `strips/R14` | **Split.** The walk is a genuine basic cycle, with a stride in frames 5–8 (5-anchor level). The tool swing is below the 5 anchor: `strips/R14` shows a 3–4 px brown smudge by the head in frames 1–4 and idle poses in 5–8. No ambient motion shows anywhere. Neither 4 nor 5 fits, so 4.5 |

A new finding of mine: the ox renders tilted the same way Augustin does. It shows the same rearing lean with a detached shadow in `desktop/R15`, `mobile/R13` and `desktop/R17`. Two different actor types with the same lean suggest one shared rotation or pose bug, not two art defects. In `desktop/R17` the 1931 truck is placed on the ox's spot, which is the "animal head fused to the truck" both critics saw.

## Rulings per category

### 1. pixel: 4.5 (A 4.5, B 4.5, advocate 4.5)
`crops/R04-row` shows the Free Baths siding and roof as tan-grey speckle with no deliberate clusters, and the porch posts melt into the wall. `desktop/R13` and `desktop/R02` show grass and foliage that are per-pixel noise. In `crops/R03-field`, the corn and wheat columns carry stray cream specks that are left-over paint highlights. In favour: one honest grid, binary alpha, and one 1-px selective outline rule on every sprite family (`crops/R15-pen`, `crops/R16-player`). That puts it above the 3 anchor, but the thousands of colours per frame and the lack of a shared palette keep it below 5. Against CAL-A (`stardew-1.jpg`, 7.5), which uses 3–4 step ramps and grouped leaf clumps, this is roughly 3 points short. The HUD's off-grid glyphs are scored under ui, not here.

### 2. characters: 4.5 (A 4.5, B 4.5, advocate 4.5)
I checked each close-up against `research/refs/characters.md`. No capture has the reference sheet pasted beside it, which is a capture defect (folded into G-faces-headwear).
- **Ada** (`crops/R16-player`): her hair and skin share one value, so the head is a blob, and her eyes are grey 2×2 blocks.
- **Caleb** (`crops/R03-player`, `strips/R13`): his hat is a dome whose brim never breaks the head outline (the checklist asks for a wide slouch brim).
- **Augustin** (`desktop/R11`, `mobile/R11`): his in-world sprite is broken.
- **Walt** (`crops/R11-npcs`): his cap colour bands across his eyes, and he has no knickers or white stockings.
- **Josiah** (`desktop/R16`): his "fur cap" reads as an olive helmet. Ezra is tagged but not visible.
- **Margaux** (`desktop/R16`): passes (scarf, blue shirt, long skirt).
- **Animals** (`crops/R15-pen`): the cows read. The hens are hearts, and the ox is tilted.

Figures are readable and separate mainly by colour, which is the 5 anchor, and the checklist misses and a broken sprite pull it down. CAL-A (6.5) still has readable eyes and distinct headwear silhouettes at a smaller size.

### 3. environment: 5.0 (A 5.0, B 5.5, advocate 5.5)
- **What meets the 7 anchor:** the buildings show construction, with mansards, dormers, porch trim, brick, shingles, a boomerang drive-in roof and a motor-hotel rail (`desktop/R04`, `desktop/R06`, `desktop/R10`). The cabbage column shows growth stages (`crops/R03-field`).
- **Dressing is sparse, though:**
  - The town streets have no props or passers-by (`desktop/R04`, `desktop/R09`).
  - The lower halves of the farm frames are empty grass (`desktop/R17`, `mobile/R13`).
  - Most of `desktop/R07` is flat murky water.
  - Snow lies only on lawns, not on roofs or shrubs (`desktop/R10`).
  - The pen's side fences draw as ladders laid on the ground (`desktop/R15`, `desktop/R17`).
  - The truck sits on top of the ox (`desktop/R17`).
- The street plan is identical in R04, R05, R06 and R09.

`desktop/R02` and `desktop/R16` are dressed, which is the advocate's fair point. Even so, against `stardew-1.jpg` (8), where every patch of ground has a job, this is "competent buildings, sparse dressing", the 5 anchor. 5.5 would reward the buildings twice.

### 4. lighting: 4.5 (A 4.5, B 5.5, advocate 5.0)
**What works:** `desktop/R05` and `mobile/R05` have on-grid 4-band pools, lit windows, CLUB neon and correctly dated five-globe clusters.

**What fails:**
- The pools draw across the twin-tower hotel roof in both frames, an obvious depth bug.
- The scene has one warm colour over one cool multiply, and sprites take no light.
- Only one of the six lighting captures (R05) delivers its mood:
  - Dusk at 19:10 in `desktop/R06` looks like noon, and the cobra-head lamps are off.
  - Evening at 18:20 in `desktop/R07` has no warm shift.
  - The 18:40 farmyard in `desktop/R17` is full daylight.
  - Rain in `desktop/R09` and `desktop/R02` leaves the ground bright and dry.
  - Fog in `desktop/R08` is a uniform beige veil stacked with the occlusion ghost.
  - Snow in `desktop/R10` has no roof caps.
- Shadows are hard-edged but detached (`desktop/R17` truck and trees, `desktop/R15` ox).

Critic A was right. B scored 5.5 without citing R06, R07 or R09. This is on-grid but generic, with a visible bug, which sits below CAL-A by day (5.5).

### 5. animation: 4.5 (A 5.0, B 4.0, advocate 5.0)
- **Walk:** `strips/R13` and `strips/R13-mobile` show a real walk: the legs separate and stride in frames 5–8, and the poses change in every frame. The domed hat hides most of the arm swing and head bob, and a fence post overlaps frames 1–4.
- **Hoe swing:** `strips/R14` fails. The hoe is a small brown smudge beside the head in frames 1–4, there is no arc in front of the body, no contact and no soil response, and frames 5–8 are idle.
- **Ambient life:** none in any strip or frame. There is no chimney smoke, the creek glints in `desktop/R15` are static, and there are no birds.

A walk at about the 5 anchor plus a tool action below the 5 anchor's "2–3 frame swing" averages to 4.5.

### 6. ui: 4.5 (A 4.5, B 5.5, advocate 5.0)
**Against:**
- Every HUD and panel frame miscodes glyphs: "Olose", "8uy", "×S", "Oollard" (`desktop/R18`), "Orafting", "$S00" (`desktop/R12`), "Oontinue", "Ohapter select" (`desktop/R01`).
- The date and time are wrong on screen: "1955" reads "1988" (`desktop/R06`, `desktop/R18`), the 2s read as 8s (`desktop/R07`), and "21:30" reads "81:30" (`mobile/R05`).
- Zoomed, the glyphs have anti-aliased grey fringes and a 1–2 screen-px stroke, against the world's 4 px art pixel.
- The title logo is a smooth serif (`desktop/R01`).
- The dialogue portrait is small (`mobile/R11`).

**In favour:**
- Square-cornered per-era frames: green hide (`desktop/R02`), cream and gilt (`desktop/R04`), navy and brass (`desktop/R12`), teal (`desktop/R18`).
- Crisp, consistent hotbar icons.
- A clean phone reflow with large touch buttons (`mobile/R04`, `mobile/R11`).
- A clean Silkscreen header in 1931 (`mobile/R05`).

Critic A was right, and Critic B missed the most visible defect in the build. This matches the 5 anchor ("pixel font, scaled to non-integer sizes or blurred"), pulled below it because the HUD shows the player wrong numbers.

### 7. readability: 5.5 (A 5.5, B 5.5, advocate 5.5)
The player is findable in every phone frame, thanks to the outline, the white apron and the corner brackets (`mobile/R02`, `mobile/R04`, `mobile/R13`). Touch targets are large, and phone text is about 10 CSS px. The cabbage stages read (`crops/R03-field`), but the corn, wheat and bean columns merge into ribbons. The occlusion ghost and fog nearly erase the player in `desktop/R08`. The target brackets go dim at night (`mobile/R05`), the name tags crowd one another (`desktop/R11`), and the seed-sack bushes look like pickups (`desktop/R03`). The glyph defects are counted under ui. Readable with some effort: 5.5.

### 8. authenticity: 6.0 (A 6.0, B 5.5, advocate 6.0)
Evidence spans five chapters, which meets the two-chapter rule for a score at the gate:
- **1807** (`desktop/R16`): canvas trade tents, a cabin and a creek.
- **1871** (`desktop/R09`, `desktop/R15`): a wooden town with a STAGE office, a mud street and a horse-drawn wagon.
- **1886** (`desktop/R04`, `desktop/R10`): Second Empire and Victorian bathhouses and oil-lantern posts, correctly not gas before 1897.
- **1931** (`desktop/R05`): Spanish-revival fronts, five-globe clusters, neon and a radio tower.
- **1955** (`desktop/R06`): cobra-head lamps, a striped asphalt road, a drive-in and a motor hotel.

Dated light sources are 9-anchor detail.

Against:
- Every bathhouse in every era carries the same generic "BATHS" plate.
- The street plan never changes.
- 1871 has no false fronts or board-and-batten.
- 2026 appears only as a lake (`desktop/R07`).
- The truck and ox collide in `desktop/R17`.
- The costumes miss checklist items (Walt, Josiah, Hattie's hair).

At the gate, not above it.

**Total: 4.5 + 4.5 + 5.0 + 4.5 + 4.5 + 4.5 + 5.5 + 6.0 = 39.0 / 80** (loop 0: 33.0). Only authenticity meets its gate. The verdict is `continue`.

## Ranked gaps (top 12, by expected gain ÷ effort)

1. **G-font-raster** (ui, WS6, S, +1.5 ui, +0.5 readability). Replace the HUD and panel text with a bitmap glyph atlas drawn on the 2× or 4× device-pixel grid with smoothing off (reuse the in-world 5×7 pipeline, or rasterize Pixelify Sans once at its design size). Retire Jacquard 12 below 24 px. Redraw the title logo as pixel art.
   - **Test:** render "Close Buy Crafting ×5 0/15 $800 1955 2026 21:30" in every era frame. Assert no text pixel has intermediate alpha, and that the glyphs C≠O, B≠8, 5≠S and 2≠8 match a golden image.
2. **G-hoe-swing** (animation, WS5, M, +1.5). Draw the hoe 10–12 art px long with a visible shaft and head in every frame. Swing it in an overhead-to-ground arc in front of the body: wind-up, top, strike, impact held 2 frames (hit-stop), then recover. On strike, spawn a 2–3 px soil clod and dust puff and change the tile to tilled. Re-capture R14 on a field tile.
3. **G-tilted-sprites** (characters, WS2, S, +0.5 characters, +0.25 environment). Augustin (`desktop/R11`, `mobile/R11`) and the ox (`desktop/R15`, `mobile/R13`, `desktop/R17`) render leaning about 30° with detached shadows. Find the shared rotation or pose source (a draw-angle, or a bad atlas frame) and draw actors unrotated.
   - **Test:** for every actor cell, the horizontal centre of mass of the top 8 rows lies within 2 art px of the bottom 8 rows, and the shadow overlaps the sprite's bottom row.
4. **G-lamp-pool-depth** (lighting, WS4, S, +0.5). Draw the lamp and window pools in the ground pass, before building sprites, or clip them by building footprint, so no pool pixel lands on a roof. **Test:** on R05, zero pool-tinted pixels inside any building's sprite mask.
5. **G-occlusion-fade-scope** (readability, WS1, S, +0.5). Fade only a radius of about 24 art px around the player, and only while the player's feet are inside that building's roof footprint. Stop the stray ghosts on buildings that cover nothing (the top-left shore block in `desktop/R07`). **Test:** in R08, hotel pixels more than 24 px from the player stay at full alpha.
6. **G-painted-speckle** (pixel, WS1, L, +1.5 pixel, +0.5 environment). Pack-time changes:
   - Snap every asset and terrain chunk to one shared master palette per era (32–48 colours).
   - Merge clusters under 3 px into their dominant neighbour after the median filter.
   - Cap each material at a 3–4 step hue-shifted ramp.
   - Replace the baked grass and road with hand-made 16 px tiles in 3–4 shades plus sparse detail tiles.
   - **Test:** each frame, sampled at the art grid with the HUD excluded, holds 64 or fewer distinct colours per era palette, and isolated single pixels make up 2% or less of sprite area.
7. **G-faces-headwear** (characters, WS2, M, +1.0).
   - **Faces:** hand-place 1-px dark eyes on skin, and keep hair at least 2 ramp steps away from skin.
   - **Headwear, one silhouette per kind:** a slouch brim 2 px wider than the head on each side (Caleb), a short-bill cap above the eyes (Walt), a fur cap with a tail (Josiah), and a sun bonnet distinct from Ada's hair (Nora).
   - **Checklist fixes:** Walt's knickers and white stockings, and Hattie's near-black hair with a white cap that reads at 1×.
   - **Captures:** re-aim `crops/R11-npcs` and `crops/R16-npcs` on the bodies, and paste each person's reference row beside the close-up so the characters evidence rule can be met.
8. **G-time-weather-moods** (lighting, WS4, M, +1.0).
   - **Dusk and evening** (18:00–20:00): a warm stepped palette shift, with street lamps on from 19:00.
   - **Rain:** darken the ground by one ramp step and add 1–2 px splash rings.
   - **Snow:** 2–3 px caps on roofs, shrubs and fence tops.
   - **Fog:** 2–3 banded, drifting layers instead of a flat veil.
   - **Test:** R06 and R07 mean luminance at least 12% below the matching noon frame, with the hue shifted warm.
9. **G-farmyard-actors** (characters, WS2, M, +0.5). Move the 1931 truck off the ox's spawn tile, and add a placement test that no two static actors' masks overlap. Redraw the hens at sprite size with a beak, comb and tail so they stop reading as pickup hearts (`crops/R15-pen`).
10. **G-farm-lake-dressing** (environment, WS3, M, +0.5).
    - **Farms:** dress the empty lower halves of the farm screens (`desktop/R17`, `mobile/R13`) with a path network, stumps, flower clusters, a well and a woodpile. Redraw the side fence runs with upright posts and rails, not ladders.
    - **Crops:** add 1-px soil gaps between the crop columns.
    - **Lake** (`desktop/R07`): a 3–4 band ramp with highlight lines, shore foam, reeds and a boat.
11. **G-era-signage** (authenticity, WS7, M, +0.5).
    - Replace the generic "BATHS" plates with per-era bathhouse names from the refs (for example Fordyce, Buckstaff and Quapaw in 1931).
    - Give 1871 false fronts or board-and-batten.
    - Add carriages and autos on the town streets.
    - Add a 2026 restored-Row capture.
12. **G-ambient-life** (animation, WS5, M, +0.5). Add chimney smoke puffs, 2–3 frame creek and water glint flow, idle breathing on standing NPCs, and occasional birds, all on the grid. Add a strip of an idle town scene to show them.

```json
{
  "loop": 1,
  "role": "judge",
  "tier": "T16",
  "verdict": "continue",
  "scores": {
    "pixel": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Facade and roof speckle, no deliberate clusters; porch posts melt into the wall"},
        {"shot": "desktop/R13", "note": "Foliage and grass are per-pixel noise"},
        {"shot": "crops/R03-field", "note": "Stray painted highlight specks in the corn and wheat columns"},
        {"shot": "crops/R15-pen", "note": "Credit: one grid, binary alpha, consistent 1-px selective outline"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R16-player", "note": "Ada vs refs/characters.md: hair and skin share a value, grey 2x2 eyes; no reference sheet in the capture"},
        {"shot": "desktop/R11", "note": "Augustin's in-world sprite tilted about 30 deg; portrait upright with toque (A wrong on the portrait, B wrong on the in-world sprite)"},
        {"shot": "crops/R11-npcs", "note": "Walt's cap bands across the eyes, no knickers or white stockings; Hattie's cap barely reads and her hair is brown, not near-black"},
        {"shot": "desktop/R16", "note": "Margaux passes; Josiah's fur cap reads as a helmet; Ezra not visible"},
        {"shot": "crops/R15-pen", "note": "Cows readable (advocate right); hens read as hearts"}
      ]
    },
    "environment": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R04", "note": "Buildings show construction; street has no props"},
        {"shot": "desktop/R17", "note": "Empty lower farm, ladder fences, truck placed on the ox"},
        {"shot": "desktop/R07", "note": "Two-tone water (advocate right) but flat murk over most of the frame"},
        {"shot": "desktop/R10", "note": "Snow on lawns only; roofs and shrubs bare"},
        {"shot": "desktop/R02", "note": "1807 farmstead is dressed: cabin, woodpile, barrels, campfire"}
      ]
    },
    "lighting": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "desktop/R05", "note": "On-grid banded pools and neon, but pools draw across the hotel roof"},
        {"shot": "mobile/R05", "note": "Same roof depth bug; one warm over one cool tint; sprites unlit"},
        {"shot": "desktop/R06", "note": "Dusk at 19:10 looks like noon; lamps off"},
        {"shot": "desktop/R09", "note": "Rain leaves the ground bright and dry"},
        {"shot": "desktop/R08", "note": "Fog is a flat beige veil stacked with the occlusion ghost"}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "strips/R13", "note": "Basic walk with stride in frames 5-8; hat hides arm swing and bob"},
        {"shot": "strips/R13-mobile", "note": "Same cycle on the phone"},
        {"shot": "strips/R14", "note": "Hoe is a smudge by the head in frames 1-4, idle in 5-8; no arc, contact or soil response"},
        {"shot": "desktop/R15", "note": "No ambient motion: static creek glints, no smoke or birds"}
      ]
    },
    "ui": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "desktop/R18", "note": "Olose, 8uy, xS, Oollard; year 1955 shows as 1988 (B missed all of it)"},
        {"shot": "desktop/R07", "note": "Zoomed HUD: anti-aliased glyph fringes; 2s read as 8s in 2026 and 18:20"},
        {"shot": "mobile/R05", "note": "21:30 reads 81:30; 1931 Silkscreen header clean"},
        {"shot": "desktop/R12", "note": "Orafting, $S00; navy and brass era frame crisp"},
        {"shot": "desktop/R01", "note": "Smooth serif logo; Oontinue, Ohapter select"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R04", "note": "Player findable; large touch buttons; text about 10 CSS px"},
        {"shot": "crops/R03-field", "note": "Cabbage stages read; other columns merge into ribbons"},
        {"shot": "desktop/R08", "note": "Occlusion ghost and fog nearly erase the player"},
        {"shot": "mobile/R05", "note": "Target brackets dim at night"},
        {"shot": "desktop/R11", "note": "Name tags crowd and overlap"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R16", "note": "1807 trade tents and cabin"},
        {"shot": "desktop/R15", "note": "1871 horse-drawn wagon (advocate right)"},
        {"shot": "desktop/R04", "note": "1886 Second Empire bathhouses, oil-lantern posts"},
        {"shot": "desktop/R05", "note": "1931 five-globe clusters, Spanish revival, neon"},
        {"shot": "desktop/R06", "note": "1955 cobra-head lamps, drive-in, motor hotel"},
        {"shot": "desktop/R07", "note": "2026 shown only as a lake; generic BATHS plates in every era"}
      ]
    }
  },
  "gaps": [
    {"id": "G-font-raster", "category": "ui", "expectedGain": 1.5, "severity": 5, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R06", "desktop/R07", "mobile/R05", "desktop/R01"], "benchmark": "stardew-5.jpg", "fix": "Draw HUD and panel text from a bitmap glyph atlas on the 2x or 4x device-pixel grid with smoothing off; retire Jacquard 12 below 24 px; redraw the title logo as pixel art. Test: render 'Close Buy Crafting x5 0/15 $800 1955 2026 21:30' in every era frame, assert zero intermediate-alpha text pixels and a golden match where C!=O, B!=8, 5!=S, 2!=8. Also gives about +0.5 readability."},
    {"id": "G-hoe-swing", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "benchmark": "snes-harvestmoon-1.png (implement readability)", "fix": "10-12 art px hoe visible in every frame; overhead-to-ground arc in front of the body: wind-up, top, strike, impact held 2 frames, recover; 2-3 px soil clod and dust on strike and the tile turns tilled; re-capture R14 on a field tile."},
    {"id": "G-tilted-sprites", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R11", "mobile/R11", "desktop/R15", "mobile/R13", "desktop/R17"], "fix": "Augustin and the ox both lean about 30 deg with detached shadows; find the shared rotation or pose source and draw actors unrotated. Test: per actor cell, the centre of mass of the top 8 rows is within 2 art px of the bottom 8 rows, and the shadow overlaps the sprite's bottom row. Also about +0.25 environment."},
    {"id": "G-lamp-pool-depth", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "chained-5.jpg", "fix": "Draw lamp and window pools in the ground pass before building sprites, or clip them by building footprint. Test: zero pool-tinted pixels inside any building sprite mask in R05."},
    {"id": "G-occlusion-fade-scope", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R08", "crops/R08-player", "desktop/R07"], "fix": "Fade only a radius of about 24 art px around the player, and only while the player's feet are inside that building's roof footprint; no ghosting of buildings that cover nothing. Test: in R08, hotel pixels more than 24 px from the player stay at full alpha."},
    {"id": "G-painted-speckle", "category": "pixel", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "desktop/R13", "desktop/R02", "crops/R03-field"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Snap all assets and terrain to one shared 32-48 colour master palette per era; merge clusters under 3 px after the median filter; cap each material at a 3-4 step hue-shifted ramp; replace baked grass and road with hand-made 16 px tiles in 3-4 shades. Test: 64 or fewer distinct colours per frame at the art grid (HUD excluded) and isolated single pixels at 2% or less of sprite area. Also about +0.5 environment."},
    {"id": "G-faces-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R16-player", "crops/R03-player", "crops/R11-npcs", "desktop/R16"], "benchmark": "stardew-1.jpg; research/refs/characters.md", "fix": "Hand-placed 1-px dark eyes; hair at least 2 ramp steps from skin; one silhouette per hat kind (slouch brim 2 px past the head each side, short-bill cap above the eyes, fur cap with a tail, a sun bonnet distinct from hair); Walt's knickers and white stockings; Hattie's near-black hair and a readable white cap; re-aim the NPC crops on the bodies with the reference row pasted beside each."},
    {"id": "G-time-weather-moods", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R09", "desktop/R10", "desktop/R08"], "benchmark": "seastars-2.jpg", "fix": "Warm stepped palette shift 18:00-20:00 with street lamps on from 19:00; rain darkens the ground one ramp step and adds 1-2 px splash rings; 2-3 px snow caps on roofs, shrubs and fence tops; fog as 2-3 banded drifting layers. Test: R06 and R07 mean luminance at least 12% below the noon frame, with a warm hue shift."},
    {"id": "G-farmyard-actors", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R17", "crops/R15-pen"], "fix": "Move the 1931 truck off the ox spawn tile, with a placement test that no two static actor masks overlap; redraw the hens at sprite size with a beak, comb and tail."},
    {"id": "G-farm-lake-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R17", "mobile/R13", "desktop/R07", "desktop/R15", "crops/R03-field"], "benchmark": "stardew-1.jpg", "fix": "Dress the empty farm halves with paths, stumps, flower clusters, a well and a woodpile; redraw side fence runs with upright posts and rails; 1-px soil gaps between crop columns; lake with a 3-4 band ramp, highlight lines, shore foam, reeds and a boat."},
    {"id": "G-era-signage", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R05", "desktop/R09", "desktop/R07"], "benchmark": "snes-earthbound-1.png", "fix": "Per-era bathhouse names from the refs instead of generic BATHS plates (Fordyce, Buckstaff, Quapaw in 1931); false fronts or board-and-batten in 1871; carriages and autos on the town streets; a 2026 restored-Row capture."},
    {"id": "G-ambient-life", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["desktop/R15", "strips/R13"], "fix": "On-grid chimney smoke puffs, 2-3 frame creek and water glint flow, idle breathing on standing NPCs and occasional birds; add an idle town strip to the capture set to show them."}
  ]
}
```
