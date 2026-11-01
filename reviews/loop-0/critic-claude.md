# Critic A review: loop 0 (painted baseline)

## Verdict
This is the painted baseline, and the pixel rubric scores it as one. Nothing on screen is pixel art. The buildings are image-generated gouache paintings drawn at device resolution with smooth scaling. The player is a soft, vector-looking chibi render with a thick blurry outline, and the buildings next to him have no outlines at all. The terrain is a painted texture with vector-curve path edges. The UI is anti-aliased web type in rounded CSS boxes. Taken on its own terms, the architecture is the strongest asset and carries real era information: board-and-batten false fronts in 1871, a Second Empire hotel in 1886, a Spanish Revival Row with five-globe lamps in 1931, and a motor hotel and drive-in in 1955. Everything that moves or should be alive is weak. The walk has about 2 poses. The hoe "swing" is one frame followed by seven frames of idle. All six heirs share one body and one face, and only the hat and shirt change. The three captures meant to show people or animals contain none: `desktop/R11` has no dialogue, `desktop/R15` has an empty pen and `desktop/R16` has no neighbours. Lighting is a global tint plus soft blobs. Fog washes out the gameplay layer, and rain and dusk barely register. Depth sorting fails visibly in `crops/R03-player` and `crops/R08-player`. Against Stardew (`stardew-1.jpg`, CAL-A), Chained Echoes (`chained-5.jpg`, CAL-B) and Sea of Stars (`seastars-2.jpg`, CAL-C), it falls short in every category except era architecture. Total: **33 / 80**. Every category is below its gate.

## Scores

### 1. pixel: 2.5
- **No art grid anywhere.** `crops/R04-row` shows smooth gradients in the shingles and siding, soft anti-aliased edges and hundreds of colours. It is a downscaled painting, which is the rubric's anchor 3 almost word for word.
- **Mixed rendering families in one frame.** In `crops/R02-player` and `crops/R04-player`, the player is a soft-shaded 3D render with a 2–3 px blurred dark outline and pink cheek blush. The cabin and porch behind him are painted with no outline. The grass is a third, brushy texture. So there is no shared outline rule and no shared palette.
- **Crops are the same story.** In `crops/R03-field`, the wheat, beans and cabbage are painted with soft edges and resampling blur, and the sparkle markers are smooth vector stars.
- **Benchmark:** `stardew-1.jpg` (CAL-A, 7.5) has hard 4× pixels, one dark outline rule and shared ramps. `chained-5.jpg` (CAL-B, 8.5) has sel-out outlines and clean awning stripes. This capture shows no deliberate cluster anywhere.
- It is not lower than 2.5 only because the paintings are coherent, not noisy.

### 2. characters: 2.5
- **No named NPC appears in any capture.** `desktop/R11` and `mobile/R11` (meant to be dialogue) show only the player on the 1886 street. `desktop/R16` ("neighbours close up") shows an empty trade camp. `desktop/R15` ("animals in the pen") shows an empty pen, with only a horse and buggy cut off at the bottom-right edge.
- **Only the player can be judged, and all six heirs are one model with tint swaps.** It has a 2-head chibi body, mitten hands, the same worried brows and blush on every face, and the same trousers and boots.
- **Checklist (`research/refs/characters.md`):**
  - **Ada Vale, 1807** (`crops/R02-player`, `crops/R16-player`): short boy's haircut, trousers, no short-gown, petticoat or apron. About 1/5.
  - **Caleb, 1871** (`crops/R09-player`, `crops/R15-player`): a wide brown brim and the `#8e3b2b`-ish shirt read. No vest and no prop. 3/5.
  - **Nora, 1886** (`crops/R04-player`, `crops/R10-player`): a tan cap in place of a deep sun bonnet, and trousers in place of a long work dress. Only the blue matches. 1/5.
  - **Ray, 1931** (`crops/R05-player`, `crops/R17-player`): a black round-brim hat reads closer to a bowler than a pinched fedora. Shirt and trousers match. 3/5.
  - **June, 1955** (`crops/R06-player`): turquoise shirt, no ponytail. 2/5.
  - **Sam, 2026** (`crops/R07-player`): the ball cap renders as a purple headband. The orange shirt matches. 2/5.
- **The close-ups do not sit beside a reference sheet,** although the brief says they would.
- **Benchmark:** `seastars-2.jpg` (CAL-C, 9) has about 14 distinct silhouettes. This set has one silhouette. Heirs differ "only by tint", which is anchor 3.

### 3. environment: 5
- **Strengths:**
  - The building art is detailed and material-rich: shingle courses, brackets, the mansard hotel in `desktop/R04`, false fronts in `desktop/R09`, the Craftsman bungalow and period truck in `desktop/R17`, and the furs and goods under the trade tent in `desktop/R16`.
  - Crops show 5+ growth stages in `crops/R03-field`.
- **Large empty or broken areas:**
  - The 1871 field in `desktop/R03` is a bare rectangle floating on a vast flat lawn, with no fence, path or edge transition.
  - The 2026 lake in `desktop/R07` is about 70% featureless water with blotchy dark patches and scattered white diamonds. Translucent "ghost" structures sit where the brick path meets the water and on the sand at top-left.
  - The springs in `desktop/R08` have blank grey box props and a flat turquoise rectangle for a pool.
  - The pen in `desktop/R15` is empty, its side fences are broken into floating, gapped segments, and the trough clips the fence.
  - The town uses the identical 2×4 lot layout and crossroads in every era (`desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R09`).
  - Contact shadows are inconsistent: big soft ellipses under the wagon and truck, none under buildings.
- **Benchmark:** `stardew-1.jpg` (CAL-A, 8) and `chained-5.jpg` (8.5) have far denser set dressing and grounded props. Building craft would earn 7. Sparse dressing, repetition and broken spots pull the category to 5.

### 4. lighting: 4.5
- **Night (`desktop/R05`, `mobile/R05`)** has some mood: window glows, pink CLUB neon, five-globe lamp heads. But the lamps throw odd diagonal light and shadow wedges across the bricks and don't light the ground around their bases. Everything is a smooth gradient over the art, so the light never respects a pixel grid.
- **Dusk (`desktop/R06`)** is a faint warm tint, hard to tell from day.
- **Evening (`desktop/R07`)** is a murky brown multiply over the whole frame.
- **Fog (`desktop/R08`)** is a uniform white veil over everything, gameplay included.
- **Rain (`desktop/R09`, `desktop/R02`)** is thin grey streaks with no darkening, wet sheen or puddles.
- **Snow (`desktop/R10`)** is a smooth white fade on roof tops and snow-textured grass. The flower shrubs stay in full bloom and the street stays dry.
- **Benchmark:** below `chained-5.jpg` (CAL-B, 7: consistent cast shadows, puddle reflection) and far below `seastars-2.jpg` (9.5). This sits between anchor 3 (smooth gradients smear over the art) and anchor 5 (day/night present, light pools generic).

### 5. animation: 3
- **Walk (`strips/R13`, `strips/R13-mobile`):**
  - Frames 1, 2, 5 and 6 are one passing pose. Frames 3, 4, 7 and 8 are one stride pose. That is about 2 distinct poses, each held for 2 captures.
  - Arms don't visibly swing, the head doesn't bob, and nothing on the body moves secondarily.
  - The hat stays a top-down disc on a side-facing body, so the perspective is mismatched.
- **Hoe (`strips/R14`):**
  - Frame 1 shows the hoe raised and drawn across the player's face. Frames 2–8 are identical idle frames.
  - There is no wind-up, impact or settle, no soil particles, and the target tile doesn't change (compare `desktop/R14`).
- No idle breathing or ambient life appears in any strip.
- **Benchmark:** the anchors expect 6+ frames (Stardew level) for 7 and a 4-frame SNES baseline for 5. This is anchor 3: a 2-frame walk and a tool with no swing.

### 6. ui: 4
- **Web UI over the art.** The HUD, pack and shop use anti-aliased web serif and sans fonts (`desktop/R12`, `desktop/R18`, `desktop/R04`) in rounded CSS boxes with drop shadows and a dashed CSS border on the item detail.
- **Credit for per-era theming.** The colour scheme changes by era: dark green in 1807 (`desktop/R02`), parchment and gold in 1871/1886, navy and gold in 1931 (`desktop/R05`), teal in 1955 (`desktop/R06`), blue in 2026 (`desktop/R07`).
- **Mixed icon styles.** The shop's seed icons in `desktop/R18` are flat outline glyphs, the hotbar icons are painted, and the Hen is an empty ellipse.
- **Mobile** (`mobile/R12`, `mobile/R04`): large touch targets and legible text, but the goals panel is cut to one line, and the translucent joystick and A/B buttons sit over world art.
- **Dialogue UI can't be scored** because `desktop/R11` and `mobile/R11` show no dialogue box.
- **Title (`desktop/R01`, `mobile/R01`)** puts a painted illustration under web type.
- **Benchmark:** `stardew-5.jpg` (7.5: wooden nine-slice frame, bitmap font, portrait) and `snes-chronotrigger-1.png` (7). This is between anchor 3 ("web UI over pixel art") and anchor 5 ("themed but clashing").

### 7. readability: 5.5
- **Working well:**
  - The player is easy to find because of the big head, on both desktop and phone (`mobile/R04`, `mobile/R13`).
  - The target-tile box is clear.
  - Crop stages separate in `desktop/R03`, ripe crops carry sparkles, and a context prompt reads "Space: Harvest beans".
  - Night stays playable on the phone (`mobile/R05`).
  - HUD text on the phone is at least 13 CSS px.
- **Failures:**
  - In `crops/R03-player`, the bean plant is drawn over the player's torso.
  - In `crops/R08-player`, the lamp post covers the player's face and a hotel turret overlaps his body.
  - The fog in `desktop/R08` flattens all value contrast.
  - In `desktop/R07` the player and dock sink into the brown wash.
  - On the phone the A/B buttons cover buildings and the joystick covers a building and trees (`mobile/R04`, `mobile/R11`).
- **Benchmark:** `stardew-1.jpg` (CAL-A, 8.5) is bright with strong outlines. Here, painted buildings and ground have similar value and no outlines, so interactables don't pop.

### 8. authenticity: 6
- **Architecture carries the eras well:**
  - 1807: log cabin, canvas trade tents with furs, a campfire (`desktop/R02`, `desktop/R16`).
  - 1871: board-and-batten and false fronts labelled BATHS, BOARDING, STAGE, DRUGS on a red dirt street (`desktop/R09`).
  - 1886: a Victorian Row of mixed frame and brick, with a mansard hotel (`desktop/R04`).
  - 1931: a Spanish Revival and Neoclassical Row, an Arlington-like twin-tower hotel, five-globe lamp clusters, neon CLUB (`desktop/R05`), plus a bungalow and truck on the farm (`desktop/R17`).
  - 1955: asphalt with a yellow centre line, DRIVE-IN with a boomerang sign, MOTOR HOTEL (`desktop/R06`).
  - A blind viewer could order 1807 through 1955 from the town frames.
- **Misses:**
  - Gas lamp posts line the 1886 street (`desktop/R04`, `desktop/R10`), but the anchor dates gas street lights to 1897.
  - The female heirs wear trousers before 1955, which the checklist forbids (`crops/R02-player`, `crops/R04-player`).
  - 2026 appears only as a sparse lake dock (`desktop/R07`), with no restored Row or modern set dressing.
  - The lot layout is identical in every era.
  - Flowers bloom in the snow (`desktop/R10`).
- Architecture alone reaches about 7. Clothing and the thin 2026 hold the category at 6.

## Ranked gaps

1. **G-pixel-render-core** (pixel, WS1, severity 5, effort L, expected gain +4)
   - **Problem:** everything is drawn at device resolution with smooth scaling, from painted and Blender sources (`crops/R04-row`, `crops/R02-player`).
   - **Fix:** render the world to a fixed art buffer (640×360 or 480×270) and scale it up by an integer with nearest-neighbour. Replace painted and generated assets with hand-pixelled tiles and sprites on shared, hue-shifted era palettes, under one outline rule (sel-out or dark).
   - **Benchmark:** `chained-5.jpg`.
2. **G-cast-checklist-sprites** (characters, WS2, severity 5, effort L, expected gain +3)
   - **Problem:** one chibi body is tint-swapped across six heirs, and no NPCs are visible.
   - **Fix:**
     - Build distinct heir sprites from `refs/characters.md`, with skirt and petticoat layers, a real sun bonnet, a pinched fedora, a ponytail and a structured cap.
     - Use a normal head-to-body ratio (about 2.4 heads, per CAL-A and CAL-C) and drawn hands.
     - Place named NPCs in R11 and R16, and animals in R15.
     - Put each close-up next to its reference sheet, as the brief promises.
   - **Benchmark:** `seastars-2.jpg`.
3. **G-tool-swing-frames** (animation, WS5, severity 4, effort M, expected gain +1.5)
   - **Problem:** the hoe is one frame and then idle (`strips/R14`).
   - **Fix:** a 4–6 frame hoe swing with wind-up, impact (soil chunk particles and 1–2 frames of hit-stop) and settle. The tile should visibly change to tilled.
4. **G-walk-cycle-6f** (animation, WS5, severity 4, effort M, expected gain +1)
   - **Problem:** the walk has about 2 poses, no arm swing, and a top-down hat on a side-view body (`strips/R13`).
   - **Fix:** a 6-frame walk in 4 directions with arm swing and a 1 px head bob. Draw the hat per facing direction.
5. **G-bitmap-ui-era-frames** (ui, WS6, severity 4, effort M, expected gain +2)
   - **Problem:** web fonts and rounded CSS boxes (`desktop/R12`, `desktop/R18`).
   - **Fix:**
     - A bitmap pixel font at integer scale.
     - Nine-slice frames per era: hide, plank, brass, chrome and LED.
     - One icon style shared by shop, hotbar and pack.
     - A working dialogue box with a portrait, so R11 has something to show.
     - Keep the per-era colour theming, which is already good.
   - **Benchmark:** `stardew-5.jpg`.
6. **G-ongrid-lighting-weather** (lighting, WS4, severity 4, effort L, expected gain +2)
   - **Problem:** global tints and smooth gradients (`desktop/R05`, `desktop/R07`, `desktop/R08`).
   - **Fix:**
     - Banded or dithered light pools at art resolution, coloured per source, lighting the ground around lamp bases.
     - Consistent cast shadows from one sun direction.
     - Rain that darkens the scene and adds puddles.
     - Fog drawn as banded layers that leave the player and interactables clear.
     - Snow drawn as roof and terrain sprite variants, with winter flora.
     - A dusk palette that actually reads as dusk.
   - **Benchmark:** `seastars-2.jpg`.
7. **G-depth-sort** (readability, WS1, severity 3, effort S, expected gain +0.5)
   - **Problem:** crops draw over the player (`crops/R03-player`), and a lamp post and hotel turret draw over him (`crops/R08-player`).
   - **Fix:** y-sort by footprint base, and use occlusion fade or silhouette for tall props.
8. **G-env-density-and-breaks** (environment, WS3, severity 3, effort M, expected gain +1.5)
   - **Problem:** empty, broken or repeated areas: the lawns in `desktop/R03` and `desktop/R14`, the empty lake and ghost structures in `desktop/R07`, the placeholder boxes in `desktop/R08`, the fence gaps in `desktop/R15`, and the same town layout every era.
   - **Fix:**
     - Dress the lawns with field fences, path edges, stumps and tall-grass clusters.
     - Give the lake reeds, boats, shoreline rocks and a lit marina, and remove the translucent ghost structures.
     - Replace the grey boxes at the springs with era-correct spring-house props.
     - Close the fence gaps.
     - Vary lots and streets per era.
9. **G-era-clothing-lamps-2026** (authenticity, WS7, severity 3, effort M, expected gain +1)
   - **Problem:** trousers on pre-1955 women, gas lamps in 1886, a thin 2026 (`desktop/R04`, `desktop/R07`).
   - **Fix:** skirts for women before 1955, no gas street lamps in 1886, and a 2026 town capture of the restored Row with market canopies and modern vehicles.
10. **G-capture-staging** (characters, WS1, severity 2, effort S, expected gain +0.5)
    - **Problem:** R11, R15 and R16 don't show what their titles promise (`desktop/R11`, `desktop/R15`, `desktop/R16`).
    - **Fix:** make the capture script open a dialogue, spawn the animals and place the NPCs before taking the shot. Otherwise the characters and UI categories have no evidence to score.

```json
{
  "loop": 0,
  "role": "critic-claude",
  "tier": "painted",
  "scores": {
    "pixel": {"score": 2.5, "confidence": 0.9, "evidence": [
      {"shot": "crops/R04-row", "note": "Painted shingles/siding with smooth gradients, AA edges, hundreds of colours; no art grid"},
      {"shot": "crops/R02-player", "note": "Soft 3D-render chibi with blurred thick outline beside unoutlined painted cabin and brushy grass: three render families, no outline rule"},
      {"shot": "crops/R03-field", "note": "Crops painted with resampling blur; vector sparkle stars"},
      {"shot": "desktop/R04", "note": "Whole frame is a downscaled painting vs stardew-1.jpg (CAL-A 7.5) and chained-5.jpg (CAL-B 8.5)"}]},
    "characters": {"score": 2.5, "confidence": 0.8, "evidence": [
      {"shot": "crops/R02-player", "note": "Ada Vale 1807 shown with short boy's hair and trousers; no short-gown/petticoat/apron (~1/5)"},
      {"shot": "crops/R04-player", "note": "Nora 1886: tan cap not sun bonnet, trousers not dress (1/5); same face/body as every heir"},
      {"shot": "crops/R07-player", "note": "Sam 2026: ball cap reads as purple headband; mitten hands, chibi 2-head ratio"},
      {"shot": "desktop/R16", "note": "'Neighbours close up' contains no NPCs"},
      {"shot": "desktop/R15", "note": "'Animals in the pen' shows an empty pen"},
      {"shot": "desktop/R11", "note": "No dialogue or neighbour on screen"}]},
    "environment": {"score": 5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R04", "note": "Rich period buildings with readable materials; same 2x4 lot layout as other eras"},
      {"shot": "desktop/R07", "note": "Lake ~70% featureless water, translucent ghost structures at path end and top-left"},
      {"shot": "desktop/R03", "note": "Field rectangle floating on empty lawn; crops show 5+ growth stages"},
      {"shot": "desktop/R08", "note": "Springs use blank grey box props and a flat turquoise pool"},
      {"shot": "desktop/R15", "note": "Empty pen, gapped floating fence segments, trough clipping the fence"},
      {"shot": "desktop/R17", "note": "Good bungalow/truck/hay set dressing but large empty lawn; compare stardew-1.jpg density"}]},
    "lighting": {"score": 4.5, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R05", "note": "Night tint, window glows, neon; lamps cast odd diagonal wedges and don't light their bases; smooth off-grid gradients"},
      {"shot": "desktop/R08", "note": "Fog is a uniform white veil over the gameplay layer"},
      {"shot": "desktop/R09", "note": "Rain = thin streaks only; no darkening, sheen or puddles"},
      {"shot": "desktop/R07", "note": "Evening is a murky brown multiply"},
      {"shot": "desktop/R06", "note": "Dusk barely distinguishable from day"},
      {"shot": "desktop/R10", "note": "Snow as smooth roof whitening; flowers stay in bloom; vs chained-5.jpg cast shadows (CAL-B 7)"}]},
    "animation": {"score": 3, "confidence": 0.8, "evidence": [
      {"shot": "strips/R13", "note": "~2 distinct walk poses each held 2 frames; no arm swing or bob; top-down hat on side-view body"},
      {"shot": "strips/R13-mobile", "note": "Same 2-pose cycle on mobile"},
      {"shot": "strips/R14", "note": "Hoe: frame 1 raised across the face, frames 2-8 identical idle; no wind-up/impact/settle, no soil feedback"},
      {"shot": "desktop/R14", "note": "Target tile unchanged after the swing"}]},
    "ui": {"score": 4, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R12", "note": "CSS rounded panels, anti-aliased web sans, dashed CSS border; navy/gold 1931 theme"},
      {"shot": "desktop/R18", "note": "Shop: web font list; flat outline seed icons clash with painted hotbar icons; Hen is an empty ellipse"},
      {"shot": "mobile/R12", "note": "Large touch targets, legible; goals panel cut to one line; joystick and A/B over world art"},
      {"shot": "desktop/R01", "note": "Title: painted illustration with web type"},
      {"shot": "desktop/R02", "note": "Per-era HUD colours (green 1807 vs parchment 1886 vs teal 1955) are a plus; vs stardew-5.jpg (7.5)"}]},
    "readability": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R03", "note": "Crop stages distinct, ripe crops have sparkles, context prompt shown"},
      {"shot": "crops/R03-player", "note": "Bean plant drawn over player torso (depth sort)"},
      {"shot": "crops/R08-player", "note": "Lamp post covers player face, hotel turret overlaps body; fog flattens contrast"},
      {"shot": "mobile/R04", "note": "Player easy to find; text >=13 CSS px; A/B buttons and joystick cover buildings"},
      {"shot": "mobile/R05", "note": "Night stays playable on phone"}]},
    "authenticity": {"score": 6, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R09", "note": "1871 board-and-batten false fronts: BATHS/BOARDING/STAGE/DRUGS"},
      {"shot": "desktop/R05", "note": "1931 Spanish Revival Row, twin-tower hotel, five-globe lamps, neon"},
      {"shot": "desktop/R06", "note": "1955 asphalt, drive-in boomerang sign, motor hotel"},
      {"shot": "desktop/R04", "note": "1886 gas lamp posts (anchor dates gas street lights to 1897); identical lot layout across eras"},
      {"shot": "crops/R02-player", "note": "Female heir in trousers before 1955 breaks the clothing rule"},
      {"shot": "desktop/R07", "note": "2026 shown only as sparse lake dock; no restored Row"}]}
  },
  "gaps": [
    {"id": "G-pixel-render-core", "category": "pixel", "expectedGain": 4, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "crops/R02-player", "crops/R03-field"], "benchmark": "chained-5.jpg", "fix": "Render the world to a fixed 640x360 (or 480x270) art buffer, nearest-neighbour integer upscale; replace painted/Blender assets with hand-pixelled tiles and sprites on shared hue-shifted era palettes with one outline rule."},
    {"id": "G-cast-checklist-sprites", "category": "characters", "expectedGain": 3, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R07-player", "desktop/R16"], "benchmark": "seastars-2.jpg", "fix": "Distinct per-heir sprites from refs/characters.md (skirt/petticoat layers, sun bonnet, pinched fedora, ponytail, structured cap), ~2.4-head proportions, drawn hands; place named NPCs and animals in scenes; show close-ups beside reference sheets."},
    {"id": "G-tool-swing-frames", "category": "animation", "expectedGain": 1.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "fix": "4-6 frame hoe swing with wind-up, impact (soil particles, 1-2 frame hit-stop) and settle; tile visibly becomes tilled."},
    {"id": "G-walk-cycle-6f", "category": "animation", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "6-frame walk in 4 directions with arm swing and 1 px head bob; hat drawn per facing instead of a top-down disc."},
    {"id": "G-bitmap-ui-era-frames", "category": "ui", "expectedGain": 2, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R12"], "benchmark": "stardew-5.jpg", "fix": "Bitmap pixel font at integer scale, nine-slice frames per era material, one icon style across shop/hotbar/pack, a real dialogue box with portrait; keep per-era colour theming."},
    {"id": "G-ongrid-lighting-weather", "category": "lighting", "expectedGain": 2, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R07", "desktop/R08", "desktop/R09", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Banded/dithered light pools at art resolution coloured per source and lighting lamp bases; consistent one-sun cast shadows; rain darkening and puddles; banded fog that spares the gameplay layer; snow roof/terrain variants and winter flora; a real dusk palette."},
    {"id": "G-depth-sort", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R03-player", "crops/R08-player"], "fix": "Y-sort by footprint base; occlusion fade or silhouette for tall props (lamps, turrets, tall crops) in front of the player."},
    {"id": "G-env-density-and-breaks", "category": "environment", "expectedGain": 1.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R07", "desktop/R03", "desktop/R08", "desktop/R15"], "benchmark": "stardew-1.jpg", "fix": "Dress empty lawns and the lake (reeds, boats, rocks, marina), remove translucent ghost structures, replace grey placeholder boxes at the springs, close fence gaps, vary town lots per era."},
    {"id": "G-era-clothing-lamps-2026", "category": "authenticity", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "crops/R02-player", "desktop/R07"], "fix": "Skirts for women before 1955, no gas street lamps in 1886, and a 2026 restored-Row town capture with modern dressing."},
    {"id": "G-capture-staging", "category": "characters", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R11", "desktop/R15", "desktop/R16"], "fix": "Make the capture script open a dialogue, spawn the pen animals and place the 1807 NPCs before taking R11, R15 and R16, so characters and UI can be scored."}
  ],
  "verdict": "continue"
}
```
