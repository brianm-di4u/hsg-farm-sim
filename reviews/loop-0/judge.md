# Judge ruling: loop 0 (painted baseline)

**Total: 33.0 / 80. Verdict: `continue`.** No category meets its gate. This is the pre-campaign painted build, so the low pixel-rubric scores are expected and form the baseline. Hard gates are not established either. The pixel-integrity check does not apply because the build was captured without `?style=pixel`. No test results were supplied. `research/pixel-budget.md` does not exist, so the performance gate cannot be checked. Perf note, not scored: the fog scene runs at 52 fps (desktop, p50 17.7 ms) on an RTX 5060, against 190–310 fps for the other scenes. Snow under 4× CPU throttle has a p95 of 84.8 ms. Fog and snow are the effects to watch when the budget is written.

I opened every desktop frame I relied on, plus `strips/R13`, `strips/R14`, `crops/R03-player`, `crops/R04-player`, `crops/R04-row`, `crops/R08-player`, `mobile/R04` and `mobile/R05`. No category had a critic split above 1.0. Characters and authenticity were split by exactly 1.0, and I rule on both below.

## Rulings on disputed facts
- **Walk arm swing: the advocate is right.** In `strips/R13` frames 7–8 the near arm is forward of the torso and the legs are in a wide split. Frames 1, 2, 5 and 6 are near-identical rest poses. So the walk moves, but it shows only about 2–3 distinct poses.
- **Dusk reads: the advocate is right, and Claude is wrong.** `desktop/R06` has lit cobra-head lamps with warm pools at about (380,380) and (890,380), and glowing bathhouse windows. `desktop/R04` (day) has neither.
- **Occlusion cause: the advocate is right.** This is not a y-sort bug.
  - In `crops/R08-player` the lamp base sits at or just south of the player's feet, so drawing it in front is legal. The hotel's chimneys and turret are art that rises over the walkable street tile.
  - In `crops/R03-player` the bean plant on the tile in front is already drawn semi-transparent, but too faintly.
  - The fix is an occluder fade plus trimming art overhangs, not re-sorting.
- **Heirs differ "only by tint": Claude overstates this.** Headwear silhouettes differ across `crops/R03-player`, `crops/R04-player`, `crops/R07-player` and `crops/R17-player`. Body, face and hands are shared, and the hands are mitten blobs. Codex's "hands discernible" is wrong.
- **Nora's covering earns no bonnet credit.** In `crops/R04-player` it is a smooth tan dome with a slot across it. It has no forward-projecting brim and no curtain, so it reads as a helmet or pith cap. The checklist asks for a deep-brimmed sun bonnet.
- **Wagon "floating": the advocate is right.** In `desktop/R15` the wheels meet the top edge of an oversized ellipse that is offset to the south. The truck in `desktop/R17` is the same. The shadow is wrong, but neither vehicle floats.
- **Roof snow: the advocate is right.** In `desktop/R10` every roof gets the same smooth whitening on its upper slope. The fault is a crude fade instead of accumulation shaped to the roof, not inconsistency.
- **R14 staging: the advocate is right.** In `desktop/R14` the target tile is the end of the dirt path by the 1807 cabin, not a field, so "tile doesn't change" is partly a staging fault. The 1-frame swing is a real fault either way.
- **New finding: the springs in `desktop/R08` are worse than either critic said.** The whole right half is placeholder terrain: tan parchment with a fish-scale pattern, grey square boxes, and a flat cyan rectangle for a pool. It is not just "a flat pool".

## Category rulings

**pixel: 2.5.**
- `crops/R04-row` is a downscaled painting: smooth shingle gradients, anti-aliased edges, hundreds of colours. That is the anchor-3 wording.
- `crops/R04-player` and `crops/R02-player` add a second render family: a soft 3D chibi with a blurred dark outline, beside buildings with no outline.
- `crops/R03-field` adds a third: soft painted crops with vector sparkles.
- Against `stardew-1.jpg` (CAL-A 7.5) there is no grid, no ramp discipline and no outline rule. I don't go below 2.5, because each family is coherent and free of speckle noise, as the advocate argued.

**characters: 3.0.**
- One body, face and pair of mitten hands is reused for every heir. Only the headwear silhouette and shirt colour change.
- Checklist misses run 2–4 per heir, above the "1–2 misses" of anchor 5:
  - Nora (`crops/R04-player`) wears trousers, not a work dress, and has no sun bonnet.
  - Ada (`crops/R02-player`) has trousers in place of the petticoat, apron and short-gown.
  - Sam (`crops/R07-player`) has a headband in place of a structured ball cap.
  - Ray (`crops/R17-player`) has a round brim, not a pinched fedora.
- Faces are not smears, and the player reads at phone scale (`mobile/R04`), so the score sits above the 3 floor.
- No named NPC or animal appears anywhere (`desktop/R11`, `desktop/R15`, `desktop/R16`).
- The close-ups do not sit beside a reference sheet, although the brief says they do. I compared against `research/refs/characters.md` directly.
- Codex's 3.5 is too generous with no other cast on screen. Claude's 2.5 ignores the headwear variety.

**environment: 5.0.**
- Building craft is the best thing in the build: the mansard hotel and Queen Anne porches in `desktop/R04`, the furs and goods under the tent and the fire ring in `desktop/R16`, the bungalow, truck and hay in `desktop/R17`. That earns 7 for buildings.
- Breaks pull the score down:
  - In `desktop/R03` the field floats on an undressed lawn.
  - In `desktop/R07` translucent ghost structures sit at top-left and under the brick path, and the lake is about 70% empty water.
  - The `desktop/R08` springs are placeholder terrain.
  - In `desktop/R15` the side fences are gapped ladder segments and the pen is empty.
  - `desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R09` and `desktop/R10` use the identical 2×4 lot layout.
- Against `stardew-1.jpg` (8) and `chained-5.jpg` (8.5), this lands at anchor 5. Both critics agree.

**lighting: 4.5.**
- Day and night are present:
  - `desktop/R05` has window glows, pink neon and five-globe lamps, and holds up on the phone (`mobile/R05`).
  - `desktop/R06` dusk reads, per my ruling above.
- Several failures are anchor-3 symptoms:
  - In `desktop/R05` the lamps throw diagonal light and shadow wedges across the bricks and leave their own bases dark.
  - `desktop/R07` is a murky brown multiply over the whole frame.
  - `desktop/R08` fog is a uniform veil over the gameplay layer.
  - `desktop/R09` rain is streaks with no darkening.
  - In `desktop/R10` the shrubs keep flowering in snow.
- Every light is a smooth gradient, so it cannot approach 7. Below `chained-5.jpg` (7) and far below `seastars-2.jpg` (9.5). The advocate's 5 credits dusk correctly, but it gives too little weight to the fog, evening and lamp-wedge failures.

**animation: 3.0.**
- `strips/R13` and `strips/R13-mobile` show about 2–3 distinct walk poses: rest in frames 1, 2, 5 and 6, a short stride in 3–4, a wide stride with the arm forward in 7–8. There is no head bob and no secondary motion, and the hat stays a top-down disc on a side-facing body.
- `strips/R14` shows the hoe in one raised pose across the face in frame 1, then seven identical idle frames: no wind-up, impact, settle or soil burst. That is "tools have no swing" (anchor 3).
- The arm does swing, as the advocate showed. That moves the walk off "none" but does not reach the 4-frame, 2–3-frame-swing bar for 5. Both the tool action and the absence of ambient life sit at anchor 3.

**ui: 4.0.**
- The panels are CSS: rounded boxes, anti-aliased web type, and a dashed border on the item detail (`desktop/R12`, `mobile/R12`).
- The shop in `desktop/R18` mixes flat outline seed glyphs and an empty-ellipse Hen with painted hotbar icons.
- R11 has no dialogue box (`desktop/R11`).
- On the phone the goals panel is cut to one line, and the joystick and A/B buttons cover buildings (`mobile/R04`).
- Credit for real per-era theming, in colour and in typeface:
  - a book serif in 1886 (`desktop/R11`)
  - a deco-style sans on navy and gold in 1931 (`desktop/R12`)
  - a rounded display face on teal in 1955 (`desktop/R18`)
- Hierarchy is clear. Between anchor 3 and anchor 5. Below `stardew-5.jpg` (7.5).

**readability: 5.5.**
- Working well:
  - The player, labels, money and objective are legible on the phone, and the touch targets are large (`mobile/R04`).
  - Night stays playable (`mobile/R05`).
  - Crop stages separate, and a context prompt reads "Space: Harvest beans" (`desktop/R03`).
- Anchor-5 failures recur:
  - Fog hides the gameplay layer (`desktop/R08`).
  - The player sinks into the brown wash (`desktop/R07`).
  - The player is occluded in three captures: by the bean plant in `crops/R03-player`, by the lamp and hotel roof in `crops/R08-player`, and by the lamp post in `strips/R13` frames 1–4.
  - The target square is weak on dark brick (`mobile/R05`).
- The advocate's 6 would need the occlusion and fog problems fixed first.

**authenticity: 5.5.**
- The streetscapes go well beyond palette:
  - trade tents in 1807 (`desktop/R16`)
  - board-and-batten false fronts in 1871 (`desktop/R09`)
  - Second Empire and Queen Anne in 1886 (`desktop/R04`)
  - Spanish Revival, five-globe clusters and neon in 1931 (`desktop/R05`)
  - a motor hotel, drive-in and centre-lined asphalt in 1955 (`desktop/R06`)
  - era vehicles: a buggy in 1871 (`desktop/R15`) and a 1930s pickup (`desktop/R17`)

  The architecture alone is near 7.
- But three things hold it down:
  - The 1886 street is lined with gas-lantern posts (`desktop/R04`, `desktop/R10`), against the anchor date of 1897. The anchor-3 descriptor names exactly this kind of dated anachronism.
  - Women before 1955 wear trousers (`crops/R02-player`, `crops/R04-player`), which the checklist forbids outright.
  - 2026 is a bare dock (`desktop/R07`) that a blind viewer could not date. Only 5 of 6 eras sort.
- Midway between 5 and 7, minus the anachronism and the clothing failures, gives 5.5.
- On the 1.0 split: Claude's 6 credits the architecture fully but under-weights his own clothing and lamp findings. Codex's 5 under-credits the era vehicles and light sources, which the rubric names. I land between them.

## Ranked gaps (top 12, expected gain ÷ effort, with S=1, M=2, L=3)

Merged:
- G-pixel-render-core with G-pixel-system.
- G-cast-checklist-sprites with G-character-silhouettes, with the women's-skirt part of G-era-clothing-lamps-2026 folded in.
- G-tool-swing-frames with the hoe part of G-tool-action.
- G-bitmap-ui-era-frames with G-ui-language.
- G-ongrid-lighting-weather with G-light-structure.
- G-depth-sort with G-target-visibility. The cause is corrected: occluder fade and overhang, not y-sort.
- G-env-density-and-breaks with G-scene-construction, split into a cheap cleanup and a density pass.

Dropped at rank 13: G-era-specificity (landmark-accurate 1886 hotel, ironclad bathhouse and varied 1871 frontage; +1, L).

Sequencing note: gaps 3, 4, 6, 9, 10 and 11 should be authored as pixel assets on the new pipeline (gap 1). Repainting the painted assets would be thrown away.

| # | Id | Cat | Gain | Sev | Eff | WS | Fix (testable) |
|---|---|---|---|---|---|---|---|
| 1 | G-pixel-render-core | pixel | 4 | 5 | L | WS1 | Render the world to a fixed 480×270 or 640×360 art buffer and upscale it by an integer with nearest-neighbour. Replace painted and Blender assets with pixel tiles and sprites on shared, hue-shifted per-era palettes (at most about 32 colours per era), with one outline rule (sel-out, darkest ramp shade) on every sprite family. Test: the pixel-integrity check passes on all captures. |
| 2 | G-bitmap-ui-era-frames | ui | 2 | 4 | M | WS6 | A bitmap pixel font at integer scale, with the per-era typeface split kept (serif 1886, deco 1931, rounded 1955). Nine-slice frames in one material per era. One icon set on the world grid for shop, hotbar and pack: replace the flat seed glyphs and the empty Hen ellipse. A dialogue box with a portrait. Test: no anti-aliased text pixels in the `desktop/R12` and `desktop/R18` crops. |
| 3 | G-heir-silhouettes | characters | 3 | 5 | L | WS2 | Add a `look.lower` skirt, petticoat or overalls layer. Ada: short-gown, apron, ankle petticoat, pinned hair. Nora: deep-brim sun bonnet and work dress. Ray: pinched fedora. Sam: structured curved-bill cap. June: ponytail. Use about 2.4 heads, drawn hands, and a per-facing hat. Test: each heir is identifiable in a grayscale silhouette at 1×, and every close-up is captured beside its reference sheet. |
| 4 | G-hoe-swing | animation | 1.5 | 4 | M | WS5 | A 4–6 frame hoe swing (wind-up, strike, 1–2 frame hit-stop, settle) with a soil-chunk burst. The target tile switches to tilled on impact. Test: `strips/R14` shows at least 4 distinct tool poses and a changed tile. |
| 5 | G-occluder-fade | readability | 0.75 | 3 | S | WS1 | Fade any lamp post, building overhang or tall crop that overlaps the player's bounding box to at most 40% opacity, or draw a player silhouette through it. Raise the existing faint crop fade to match. Trim building art that rises over walkable tiles. Give the target square a 2-px light and dark double stroke so it stays visible on dark brick at night. Test: the player's face and torso are visible in `crops/R03-player`, `crops/R08-player`, `strips/R13` and `mobile/R05`. |
| 6 | G-ongrid-lighting | lighting | 2 | 4 | L | WS4 | Banded or dithered light pools at art resolution that light the ground around each lamp base. Remove the diagonal wedges in `desktop/R05`. One sun direction for contact and cast shadows. Rain darkens the scene and adds puddles. Replace the evening multiply with a graded era palette. Snow gets roof and terrain sprite variants and winter flora (no flowering shrubs). |
| 7 | G-capture-staging | characters | 0.5 | 3 | S | WS1 | The capture script opens a dialogue for R11, spawns the pen animals for R15, places the 1807 neighbours for R16, stages R14 on a tillable field tile, and composites each character close-up beside its reference sheet. Test: R11, R14, R15 and R16 show what their titles promise. |
| 8 | G-fog-spares-gameplay | readability | 0.5 | 3 | S | WS4 | Draw fog as 2–3 banded layers, keep its opacity over the actor and interactable layer at 25% or less, and leave the player at full contrast. Also cut the fog's frame cost, since the fog scene runs at p50 17.7 ms against about 2.5 ms elsewhere. Test: in `desktop/R08` the player and props keep their value separation. |
| 9 | G-placeholder-cleanup | environment | 0.5 | 3 | S | WS3 | Delete the translucent ghost structures in `desktop/R07` (top-left and under the brick path). Replace the parchment terrain, grey boxes and flat cyan pool at the springs in `desktop/R08` with era spring-house props and stone basins. Join the gapped side fences in `desktop/R15` and `desktop/R17`. Shrink and centre the vehicle shadows under their wheels. |
| 10 | G-walk-6f | animation | 1 | 3 | M | WS5 | A 6-frame walk in 4 directions on top of the existing arm swing, with distinct contact and passing poses, a 1-px head bob and a hat drawn per facing. Test: `strips/R13` shows at least 4 distinct poses with no adjacent duplicates at the capture interval. |
| 11 | G-env-dressing-density | environment | 1 | 3 | M | WS3 | Dress the lawns with field fences, path edges, stumps and tall-grass clusters (`desktop/R03`, `desktop/R17`). Give the lake reeds, boats, shoreline rocks and a marina (`desktop/R07`). Vary the 2×4 lot layout and street shape per era. Benchmark: `stardew-1.jpg`. |
| 12 | G-era-anachronisms-2026 | authenticity | 0.75 | 3 | M | WS7 | Remove the gas street lamps from 1886. Use building-mounted oil lanterns or none, and keep gas posts from 1897 on. Add a 2026 town capture of the restored Row with market canopies, modern vehicles and LED fixtures. Test: a blind viewer orders all six era frames correctly. |

```json
{
  "loop": 0,
  "role": "judge",
  "tier": "painted",
  "scores": {
    "pixel": {"score": 2.5, "confidence": 0.9, "evidence": [
      {"shot": "crops/R04-row", "note": "Downscaled painting: smooth shingle gradients, AA edges, hundreds of colours; anchor 3 wording, no speckle"},
      {"shot": "crops/R04-player", "note": "Soft 3D chibi with blurred outline beside unoutlined painted buildings: mixed render families"},
      {"shot": "crops/R03-field", "note": "Soft painted crops with vector sparkles; vs stardew-1.jpg CAL-A 7.5"}]},
    "characters": {"score": 3.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/R04-player", "note": "Nora: tan dome with slot reads as helmet, not deep sun bonnet; trousers not work dress; mitten hands"},
      {"shot": "crops/R02-player", "note": "Ada: trousers in place of petticoat/apron/short-gown"},
      {"shot": "crops/R17-player", "note": "Ray: round brim, not pinched fedora; headwear silhouettes do vary across heirs (vs crops/R03-player, crops/R07-player)"},
      {"shot": "desktop/R16", "note": "No neighbours on screen; R11 and R15 also empty; close-ups not beside reference sheets"}]},
    "environment": {"score": 5.0, "confidence": 0.8, "evidence": [
      {"shot": "desktop/R04", "note": "Best building craft (mansard hotel, Queen Anne porches); same 2x4 lot layout as R05/R06/R09/R10"},
      {"shot": "desktop/R16", "note": "Well-dressed trade camp: furs, crates, fire ring, bedroll"},
      {"shot": "desktop/R07", "note": "Translucent ghost structures, ~70% empty water"},
      {"shot": "desktop/R08", "note": "Springs are placeholder parchment terrain, grey boxes, flat cyan pool"},
      {"shot": "desktop/R15", "note": "Empty pen, gapped ladder fences, oversized offset wagon shadow"}]},
    "lighting": {"score": 4.5, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R06", "note": "Dusk reads: lit cobra-head lamps with pools, glowing windows (advocate right)"},
      {"shot": "desktop/R05", "note": "Night mood with neon and window glows, but diagonal light wedges and dark lamp bases; smooth off-grid gradients"},
      {"shot": "desktop/R07", "note": "Evening is a murky brown global multiply (anchor 3 symptom)"},
      {"shot": "desktop/R08", "note": "Fog is a uniform veil over gameplay"},
      {"shot": "desktop/R10", "note": "Snow as smooth roof fade; shrubs still flowering"}]},
    "animation": {"score": 3.0, "confidence": 0.8, "evidence": [
      {"shot": "strips/R13", "note": "About 2-3 distinct poses (rest 1/2/5/6, stride 3-4, wide stride with arm forward 7-8); no bob or secondary motion; top-down hat"},
      {"shot": "strips/R13-mobile", "note": "Same crude cycle on phone"},
      {"shot": "strips/R14", "note": "Hoe: one raised pose then seven identical idle frames; no wind-up, impact, settle or soil feedback"},
      {"shot": "desktop/R14", "note": "Staged on the cabin path, not a field"}]},
    "ui": {"score": 4.0, "confidence": 0.8, "evidence": [
      {"shot": "desktop/R12", "note": "CSS rounded panel, AA deco-style sans, dashed CSS border; per-era navy/gold theme"},
      {"shot": "desktop/R18", "note": "Clear hierarchy; flat seed glyphs and empty Hen ellipse clash with painted hotbar icons"},
      {"shot": "desktop/R11", "note": "No dialogue box; 1886 book serif shows per-era typeface theming"},
      {"shot": "mobile/R04", "note": "Large targets, but goals cut to one line and joystick/A-B cover buildings"}]},
    "readability": {"score": 5.5, "confidence": 0.75, "evidence": [
      {"shot": "mobile/R04", "note": "Player, labels, objective legible on phone; large touch targets"},
      {"shot": "desktop/R03", "note": "Crop stages distinct, context prompt shown"},
      {"shot": "crops/R03-player", "note": "Bean plant over player torso; existing fade too faint"},
      {"shot": "crops/R08-player", "note": "Lamp over face, hotel roof overhang over body; fog flattens values"},
      {"shot": "mobile/R05", "note": "Night playable, target square weak on dark brick"}]},
    "authenticity": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R05", "note": "1931 Spanish Revival Row, five-globe clusters, neon"},
      {"shot": "desktop/R06", "note": "1955 motor hotel, drive-in, centre-lined asphalt"},
      {"shot": "desktop/R09", "note": "1871 false fronts, but two alternating bathhouse designs"},
      {"shot": "desktop/R04", "note": "1886 gas-lantern street posts, anchor dates gas street lights to 1897"},
      {"shot": "crops/R02-player", "note": "Pre-1955 woman in trousers, forbidden by checklist"},
      {"shot": "desktop/R07", "note": "2026 shown only as an undatable dock"}]}
  },
  "gaps": [
    {"id": "G-pixel-render-core", "category": "pixel", "expectedGain": 4, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "crops/R04-player", "crops/R03-field"], "benchmark": "chained-5.jpg", "fix": "Render the world to a fixed 480x270 or 640x360 art buffer with integer nearest-neighbour upscale; replace painted/Blender assets with pixel tiles and sprites on shared hue-shifted per-era palettes (<=~32 colours/era) and one outline rule (sel-out, darkest ramp shade) on every sprite family; pixel-integrity check passes on all captures."},
    {"id": "G-bitmap-ui-era-frames", "category": "ui", "expectedGain": 2, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R04"], "benchmark": "stardew-5.jpg", "fix": "Bitmap pixel font at integer scale keeping the per-era typeface split (serif 1886, deco 1931, rounded 1955); nine-slice frames in one material per era; one icon set on the world grid for shop/hotbar/pack replacing flat seed glyphs and the empty Hen ellipse; dialogue box with portrait. Test: no anti-aliased text pixels in R12/R18 crops."},
    {"id": "G-heir-silhouettes", "category": "characters", "expectedGain": 3, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R02-player", "crops/R17-player", "crops/R07-player"], "benchmark": "seastars-2.jpg", "fix": "Add look.lower skirt/petticoat/overalls layer; Ada short-gown+apron+ankle petticoat+pinned hair, Nora deep-brim sun bonnet+work dress, Ray pinched fedora, Sam structured curved-bill cap, June ponytail; ~2.4-head proportions, drawn hands, per-facing hat. Test: each heir identifiable in grayscale silhouette at 1x."},
    {"id": "G-hoe-swing", "category": "animation", "expectedGain": 1.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "fix": "4-6 frame hoe swing (wind-up, strike, 1-2 frame hit-stop, settle) with soil-chunk burst; target tile switches to tilled on impact. Test: strips/R14 shows >=4 distinct tool poses and a changed tile."},
    {"id": "G-occluder-fade", "category": "readability", "expectedGain": 0.75, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R03-player", "crops/R08-player", "strips/R13", "mobile/R05"], "fix": "Not a y-sort bug: fade lamp posts, building overhangs and tall crops overlapping the player's bounds to <=40% opacity (or silhouette the player through them), strengthen the existing faint crop fade, trim building art rising over walkable tiles, and give the target square a 2-px light+dark double stroke for night."},
    {"id": "G-ongrid-lighting", "category": "lighting", "expectedGain": 2, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R07", "desktop/R09", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Banded/dithered light pools at art resolution that light the ground at each lamp base; remove the diagonal wedges in R05; one sun direction for contact/cast shadows; rain darkening and puddles; graded era evening palette instead of brown multiply; snow roof/terrain sprite variants and winter flora."},
    {"id": "G-capture-staging", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R11", "desktop/R15", "desktop/R16", "desktop/R14"], "fix": "Capture script opens a dialogue for R11, spawns pen animals for R15, places 1807 neighbours for R16, stages R14 on a tillable field tile, and composites each character close-up beside its reference sheet."},
    {"id": "G-fog-spares-gameplay", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R08", "crops/R08-player"], "fix": "Fog as 2-3 banded layers with <=25% opacity over the actor/interactable layer and the player at full contrast; also cut fog frame cost (p50 17.7 ms vs ~2.5 ms elsewhere in perf.json)."},
    {"id": "G-placeholder-cleanup", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R07", "desktop/R08", "desktop/R15", "desktop/R17"], "fix": "Delete translucent ghost structures in R07; replace the springs' parchment terrain, grey boxes and flat cyan pool in R08 with era spring-house props and stone basins; join gapped pen fences in R15/R17; shrink and centre vehicle shadows under the wheels."},
    {"id": "G-walk-6f", "category": "animation", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "6-frame walk in 4 directions building on the existing arm swing, distinct contact and passing poses, 1-px head bob, hat drawn per facing. Test: strips/R13 shows >=4 distinct poses with no adjacent duplicates."},
    {"id": "G-env-dressing-density", "category": "environment", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17", "desktop/R05"], "benchmark": "stardew-1.jpg", "fix": "Dress lawns with field fences, path edges, stumps and tall-grass clusters; lake reeds, boats, shoreline rocks and marina; vary the 2x4 lot layout and street shape per era."},
    {"id": "G-era-anachronisms-2026", "category": "authenticity", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R10", "desktop/R07"], "fix": "Remove 1886 gas street lamps (building-mounted oil lanterns or none; gas posts from 1897); add a 2026 town capture of the restored Row with market canopies, modern vehicles and LED fixtures. Test: blind viewer orders all six era frames."}
  ],
  "verdict": "continue"
}
```
