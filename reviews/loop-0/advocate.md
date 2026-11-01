# Advocate review: loop 0 (painted baseline)

## Position
Both critics agree on the main point and they are right: this is a painted build, and none of it is pixel art. I concede the pixel, environment and most of the UI case outright. I push back in four places, each of them checked against the captures:

1. Claude says the walk has no arm swing and dusk barely differs from day. Both claims are wrong on the captures.
2. Both critics blame player occlusion on depth sorting. The captures point instead to tall art hanging over walkable tiles, with no occluder fade (or too weak a fade).
3. On lighting and authenticity, the build meets the literal wording of the rubric anchors (day/night present, era light sources) more fully than either critic credits.
4. Part of the evidence gap for R14, R11, R15 and R16 is a staging fault, not a missing feature.

Critic means: pixel 2.25, characters 3.0, environment 5.0, lighting 4.5, animation 3.25, ui 3.75, readability 5.75, authenticity 5.5 (both critics total 33). My proposals total **35.5**, and every one is within ±1 of its mean.

## Facts the critics got plainly wrong
- **Claude, animation: "Arms don't visibly swing."** In `strips/R13` frames 7 and 8, the near arm is extended well forward of the torso while the legs are in a wide split. Frames 1, 2, 5 and 6 show the arm down at the side. `strips/R13-mobile` frames 7 and 8 show the same forward arm. The cycle is crude, but the arm does swing.
- **Claude, lighting: "Dusk (`desktop/R06`) is a faint warm tint, hard to tell from day."** `desktop/R06` has lit cobra-head street lamps with warm pools on the asphalt, at roughly (380,380) and (890,380). The Neoclassical bathhouse (left and right of its portico) and the Spanish bathhouse both show glowing windows. `desktop/R04` (day) has none of these. Codex also says R06 is distinguishable.
- **Claude, characters: heirs differ "only by tint".** The heads have clearly different silhouettes:
  - bare head: `crops/R02-player`, `crops/R06-player`
  - a smooth tan dome down to the ears: `crops/R04-player`
  - a wide soft brim: `crops/R03-player`, `crops/R15-player`
  - a black round brim with a dented crown: `crops/R17-player`
  - a headband: `crops/R07-player`

  The body is shared, and I concede that. But headwear silhouette is one of the rubric's identifiers. Claude's own checklist gives Caleb and Ray 3/5 each.
- **Codex, characters: "Faces, hands and limbs are discernible."** In `crops/R02-player` and `crops/R17-player`, the hands are mitten blobs with no fingers or thumb. Claude's "mitten hands" is correct.
- **Codex, environment: the wagon "appears suspended above a detached oval shadow" (`desktop/R15`).** The wheels touch the top of the shadow ellipse. The shadow is offset to the south and too large, but the wagon is not floating. The same goes for the truck in `desktop/R17`.
- **Codex, lighting: roof snow is "inconsistent" (`desktop/R10`).** Every roof gets the same whitening on its upper slope. The real fault is that it is a smooth fade and not accumulation shaped to the roof (Claude's description). It is consistent but crude.

## Category by category

### 1. pixel: critics 2.5 / 2 → **2.5**
- **Concede all the observations.**
  - `crops/R04-row` shows smoothly resampled shingles, siding and trim, and anti-aliased lettering.
  - `crops/R02-player` puts a soft-shaded figure with a thick dark outline against unoutlined painted logs and brushy grass.
  - `crops/R03-field` shows soft-edged painted crops and vector sparkle stars.
- **Rebut Codex's drop below the anchor.** Anchor 3 reads "downscaled painting: speckle, blur, mixed pixel sizes, hundreds of colours". That is exactly what these captures show. If anything they look cleaner, since `crops/R04-row` has no speckle noise and the paintings are coherent within each asset family.
- Mixed render families (painted buildings against a rendered player) keep it from reaching a full 3. Claude's 2.5 is the literal anchor reading.

### 2. characters: critics 2.5 / 3.5 → **3.5**
- **Concede:**
  - One body is reused for every heir.
  - The female heirs wear trousers where the checklist requires an ankle-length petticoat or dress: Ada in `crops/R02-player`, Nora in `crops/R04-player`.
  - Hands are mittens.
  - No named NPC or animal appears in `desktop/R11`, `desktop/R16` or `desktop/R15`. A horse and buggy is cut off at the bottom right of R15.
  - The close-ups do not sit beside a reference sheet, although the brief says they would.
- **Rebut the case for 2.5:**
  - The figures are not "blobs", and the player can be picked out at phone scale (`mobile/R04`, `mobile/R05`).
  - Headwear silhouettes vary across the heirs (list above).
  - Nora's covering in `crops/R04-player` is a deep dome over the crown and sides down to the ears. Seen from above, that is closer to a bonnet than a cap, so it deserves partial credit. Claude's 1/5 is harsh; 2/5 is fair.
  - This sits between anchor 3 ("can't tell people apart") and anchor 5 ("readable figures, generic; few checklist features"). With zero NPCs on screen, 3.5 is the ceiling. Codex's number is right.

### 3. environment: critics 5 / 5 → **5**
- **Concede the breaks:**
  - The field floats on bare lawn (`desktop/R03`).
  - The lake is about 70% empty water, with translucent ghost structures at top left and under the brick path (`desktop/R07`).
  - The springs have grey box props and a flat turquoise pool (`desktop/R08`).
  - Side fences are gapped ladder segments, and the trough sits in the fence line (`desktop/R15`, `desktop/R17`).
  - The town has the identical 2×4 lot layout in every era: `desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R09`, `desktop/R10`, `desktop/R11`.
- **Push back on "sparse".** Some scenes are well dressed:
  - `desktop/R16`: furs, crates and barrels under the trade tent; a bedroll, stool and fire ring in the second tent; a cooking fire with a pot; rocks along the creek.
  - `desktop/R15`: hand pump, wagon, woodpile, shed, bridge and buggy.
  - `desktop/R17`: pump, period truck and hay bales.
  - `desktop/R02`: chopping block, woodpile, barrels, crate and shipping bin.

  The emptiness is in the lawns, not everywhere.
- Building craft is the strongest asset in the build. The two pressures balance at 5, and I agree with both critics.

### 4. lighting: critics 4.5 / 4.5 → **5**
- **Concede:**
  - Fog is a near-uniform veil over the gameplay layer (`desktop/R08`).
  - Rain is thin streaks with no darkening, sheen or puddles (`desktop/R09`, `desktop/R02`).
  - Snow is a smooth roof fade, the shrubs keep flowering and the street stays dry (`desktop/R10`).
  - Evening is a brown multiply over everything (`desktop/R07`).
  - Lamps in `desktop/R05` throw diagonal wedges and do little at their own bases.
- **Rebut the placement.**
  - Anchor 5 is "day/night present, light pools generic". The build has a working day (`desktop/R04`), a dusk with lit lamps and windows (`desktop/R06`, against Claude), and a night with window glows, a pink CLUB neon and five-globe lamp heads (`desktop/R05`, also on the phone in `mobile/R05`).
  - Anchor 3's "smooth gradients smear over pixel art" describes a failure that needs pixel art underneath to smear.
  - Being off-grid is a reason it cannot reach 7 ("light kept on-grid"). It is not a reason to drop below 5.
- Weak weather keeps it from going higher.

### 5. animation: critics 3 / 3.5 → **3.5**
- **Concede:**
  - The walk is essentially two poses, each held for two samples: a passing pose in frames 1, 2, 5 and 6, and a stride in frames 3, 4, 7 and 8 (`strips/R13`).
  - There is no visible head bob, and the hat is a top-down disc.
  - The hoe is a single raised frame followed by seven idle frames (`strips/R14`).
- **Rebut:**
  - Arms do swing (`strips/R13` frames 7 and 8; `strips/R13-mobile` frames 7 and 8), and the legs split widely. That is a basic walk, not "static or sliding sprites" (anchor 3).
  - Claude's "target tile doesn't change" is partly a staging cause. The brief titles R14 "Hoe swing on the field", but `desktop/R14` aims the hoe at the end of the dirt path beside the 1807 cabin. There is no field in that frame. A tilled-soil state exists elsewhere (the furrowed field in `desktop/R03`). The missing impact frames are still a real fault.
- 3.5, matching Codex.

### 6. ui: critics 4 / 3.5 → **4**
- **Concede:**
  - Rounded CSS boxes and a dashed item-detail border (`desktop/R12`, `mobile/R12`).
  - Flat outline seed glyphs and an empty-ellipse Hen in the shop, next to painted hotbar icons (`desktop/R18`).
  - No dialogue box in R11.
  - Phone goals cut to one line, and the joystick and A/B buttons cover world art (`mobile/R04`).
- **Evidence both critics missed:** the theming changes typeface by era as well as colour.
  - 1886: a book serif in the HUD (`desktop/R11`).
  - 1931: a geometric deco-style sans on the Pack panel (`desktop/R12`).
  - 1955: a rounded display face on the "Farm supply" header (`desktop/R18`).
- The type is crisp, not blurry, so it does not match the anchor 3 wording.
- Hierarchy is clear: prices and Buy/×5 buttons line up in `desktop/R18`, and the phone inventory reflows to 6 columns with a readable detail area (`mobile/R12`).
- "Themed but clashing" (anchor 5) describes it better than "web UI over pixel art" (anchor 3). The CSS frames and icon clash hold it to 4.

### 7. readability: critics 5.5 / 6 → **6**
- **Concede:**
  - Fog flattens value contrast (`desktop/R08`).
  - The player sinks into the brown wash (`desktop/R07`).
  - The target square is weak on dark brick on the phone (`mobile/R05`; Codex's point).
  - Phone controls cover buildings (`mobile/R04`).
- **Rebut the cause of the occlusion claims:**
  - In `crops/R08-player`, the lamp's base is south of the player's feet, so drawing it in front is correct y-ordering. The hotel's roof and turret art rise over the street tile the player is standing on, which makes it an art overhang. `strips/R13` frames 2–6 show the same lamp-in-front case.
  - In `crops/R03-player`, the bean plant from the tile in front looks semi-transparent over the player's legs. An occluder fade seems to exist for crops already; it is just too weak.
  - So Claude's "y-sort by footprint base" fix targets the wrong cause. Codex's "fade foreground occluders" is the right fix.
- **Strengths:**
  - Crop stages separate, ripe crops sparkle and a context prompt reads "Space: Harvest beans" (`desktop/R03`).
  - The player, labels and objective stay legible on the phone (`mobile/R04`), and night stays playable (`mobile/R05`).
- 6.

### 8. authenticity: critics 6 / 5 → **6**
- **Concede:**
  - The Ada and Nora trousers (`crops/R02-player`, `crops/R04-player`).
  - The identical lot layout in every era.
  - R09's four bathhouses are two alternating designs (grey plank and red board) (`desktop/R09`).
  - 2026 is only a thin lake dock (`desktop/R07`).
  - Shrubs flower in snow (`desktop/R10`).
  - The 1886 gas lamps, which Claude dates against the anchor and I can't rebut.
- **Rebut Codex's "generic in detail" (anchor 5).** The rubric names vehicles and light sources, and both change by era:
  - Vehicles: horse and buggy in 1871 (`desktop/R15`), a 1930s pickup in 1931 (`desktop/R17`).
  - Light sources: lantern posts in 1886 (`desktop/R04`), five-globe clusters and neon in 1931 (`desktop/R05`), cobra-head lamps on asphalt with a centre line in 1955 (`desktop/R06`).
  - Architecture moves from canvas trade tents (`desktop/R16`) to board-and-batten false fronts (`desktop/R09`) to Second Empire and Queen Anne (`desktop/R04`), then Spanish Revival and Neoclassical (`desktop/R05`), then a drive-in and motor hotel (`desktop/R06`).
- Five eras can be ordered blind across at least five chapters. That is beyond palette-only distinction. Clothing and 2026 keep it at the gate, not above.

## Gap adjustments
| Gap | Critic sev / gain | Advocate sev / gain | Why |
|---|---|---|---|
| G-pixel-render-core | 5 / +4 | 5 / +4 | Agreed. The core defect (`crops/R04-row`). |
| G-pixel-system | 5 / +4 | 5 / +4 | Same gap as above, from Codex. |
| G-cast-checklist-sprites | 5 / +3 | 5 / +3 | Agreed. Headwear already varies; the body and garments don't. |
| G-character-silhouettes | 5 / +3 | 5 / +3 | Same gap as above, from Codex. |
| G-tool-swing-frames | 4 / +1.5 | 4 / +1.5 | Agreed on the frames. The missing tile change is partly staging (`desktop/R14` targets the path, not a field). |
| G-walk-cycle-6f | 4 / +1 | 3 / +1 | Arms already swing and the stride is wide (`strips/R13` frames 7–8). The gap is pose count and bob, not absence of motion. |
| G-tool-action | 5 / +2.5 | 4 / +2 | Bundles the walk's secondary motion, which overlaps G-walk-cycle-6f. The hoe portion is the same as G-tool-swing-frames. |
| G-bitmap-ui-era-frames | 4 / +2 | 4 / +2 | Agreed. The per-era typefaces (R11/R12/R18) should survive as bitmap fonts. |
| G-ui-language | 4 / +2.5 | 4 / +2 | Overlaps G-bitmap-ui-era-frames. Era theming and phone reflow already earn credit, so there is less headroom. |
| G-ongrid-lighting-weather | 4 / +2 | 4 / +2 | Agreed, except the "real dusk palette" sub-item: dusk already reads (`desktop/R06`). |
| G-light-structure | 4 / +2 | 4 / +2 | Agreed. |
| G-depth-sort | 3 / +0.5 | 3 / +0.5 | Wrong cause. Y-order looks correct (`crops/R08-player` lamp base is south of the feet). Fix the fade and overhang instead. |
| G-target-visibility | 4 / +1.5 | 3 / +1 | The phone is already legible (`mobile/R04`, `mobile/R12`). A crop fade exists (`crops/R03-player`). The remaining work is stronger fade, building and lamp fades, and the night target square. |
| G-env-density-and-breaks | 3 / +1.5 | 3 / +1.5 | Agreed. |
| G-scene-construction | 4 / +2 | 3 / +1.5 | R15, R16 and R17 already carry functional dressing. The wagon is not floating. Overlaps G-env-density-and-breaks. |
| G-era-clothing-lamps-2026 | 3 / +1 | 3 / +1 | Agreed. |
| G-era-specificity | 3 / +1.5 | 3 / +1 | Era light sources, vehicles and frontage types already present. Overlaps G-era-clothing-lamps-2026. |
| G-capture-staging | 2 / +0.5 | 3 / +0.5 | Raise severity. Staging blocks evidence for characters (R11, R15, R16), ui (R11 dialogue) and animation (R14 is not on a field). |

```json
{
  "loop": 0,
  "role": "advocate",
  "tier": "painted",
  "scores": {
    "pixel": {"score": 2.5, "confidence": 0.9, "evidence": [
      {"shot": "crops/R04-row", "note": "Downscaled painting, smooth shingles and siding, AA lettering; matches anchor 3 wording, with no speckle noise"},
      {"shot": "crops/R02-player", "note": "Soft-shaded outlined figure against unoutlined painted logs and brushy grass: mixed render families keep it below 3"},
      {"shot": "crops/R03-field", "note": "Soft painted crops and vector sparkle stars"}]},
    "characters": {"score": 3.5, "confidence": 0.75, "evidence": [
      {"shot": "crops/R02-player", "note": "Ada in trousers, not short-gown and petticoat; mitten hands (against Codex's 'hands discernible')"},
      {"shot": "crops/R04-player", "note": "Nora: deep tan dome to the ears reads closer to a bonnet than a cap (partial credit); trousers fail the rule"},
      {"shot": "crops/R17-player", "note": "Ray: black round brim, distinct from Caleb's soft brim (crops/R03-player) and the bare heads (crops/R06-player): headwear silhouettes vary, not 'only tint'"},
      {"shot": "mobile/R04", "note": "Figure readable at phone scale, not a blob"},
      {"shot": "desktop/R16", "note": "No NPCs on screen; with R11 and R15 empty, caps the score at 3.5"}]},
    "environment": {"score": 5, "confidence": 0.8, "evidence": [
      {"shot": "desktop/R16", "note": "Dense period dressing: furs, crates, barrels, bedroll, stool, fire ring, cooking fire, creek rocks"},
      {"shot": "desktop/R15", "note": "Pump, wagon, woodpile, shed, bridge and buggy; but gapped side fences and an empty pen; wagon wheels do meet the shadow"},
      {"shot": "desktop/R07", "note": "Empty lake and translucent ghost structures (conceded)"},
      {"shot": "desktop/R08", "note": "Grey box props and flat pool at the springs (conceded)"},
      {"shot": "desktop/R04", "note": "Strongest building craft; same lot layout as R05, R06, R09, R10, R11"}]},
    "lighting": {"score": 5, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R06", "note": "Dusk clearly distinct from day: lit cobra-head lamps with pools on the asphalt, glowing bathhouse windows (against Claude)"},
      {"shot": "desktop/R05", "note": "Night: window glows, pink neon, five-globe lamps; off-grid gradients and odd wedges"},
      {"shot": "mobile/R05", "note": "Night mood holds on the phone"},
      {"shot": "desktop/R08", "note": "Fog veils the gameplay layer (conceded)"},
      {"shot": "desktop/R09", "note": "Rain is streaks only (conceded); weak weather keeps it at anchor 5"}]},
    "animation": {"score": 3.5, "confidence": 0.8, "evidence": [
      {"shot": "strips/R13", "note": "Frames 7-8: arm extended forward and wide leg split; arms do swing (against Claude); about 2 poses, no bob"},
      {"shot": "strips/R13-mobile", "note": "Same forward arm in frames 7-8"},
      {"shot": "strips/R14", "note": "One raised hoe frame, then 7 idle frames; no impact (conceded)"},
      {"shot": "desktop/R14", "note": "Hoe aimed at the path end by the cabin, not a field; the missing tile change is partly staging"}]},
    "ui": {"score": 4, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R11", "note": "1886 HUD in a book serif"},
      {"shot": "desktop/R12", "note": "1931 deco-style sans on navy and gold: typeface varies by era as well as colour; dashed CSS border (conceded)"},
      {"shot": "desktop/R18", "note": "1955 rounded display header, clear price and button hierarchy; flat seed glyphs and empty Hen clash with painted hotbar (conceded)"},
      {"shot": "mobile/R12", "note": "Clean 6-column reflow and readable detail area; rounded CSS frames"},
      {"shot": "mobile/R04", "note": "Goals cut to one line; joystick and A/B over the world"}]},
    "readability": {"score": 6, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R03", "note": "Crop stages distinct, sparkles on ripe crops, context prompt"},
      {"shot": "crops/R03-player", "note": "Bean plant from the tile in front looks semi-transparent over the legs: a fade exists but is too weak"},
      {"shot": "crops/R08-player", "note": "Lamp base sits south of the player's feet (correct y-order); hotel roof art overhangs the street tile; fog flattens contrast"},
      {"shot": "mobile/R04", "note": "Player, labels and objective legible on the phone"},
      {"shot": "mobile/R05", "note": "Night playable; target square weak on dark brick (conceded)"}]},
    "authenticity": {"score": 6, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R05", "note": "1931 five-globe clusters, neon, Spanish Revival Row"},
      {"shot": "desktop/R06", "note": "1955 cobra-head lamps, centre-lined asphalt, drive-in, motor hotel: era light sources change, a rubric-named criterion"},
      {"shot": "desktop/R15", "note": "1871 horse and buggy, versus the 1930s pickup in desktop/R17: era vehicles"},
      {"shot": "desktop/R09", "note": "1871 false fronts, but four bathhouses in two alternating designs (conceded)"},
      {"shot": "crops/R04-player", "note": "Trousers on a pre-1955 woman (conceded); with the thin 2026 (desktop/R07), holds it at the gate"}]}
  },
  "gaps": [
    {"id": "G-pixel-render-core", "category": "pixel", "expectedGain": 4, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "crops/R02-player", "crops/R03-field"], "benchmark": "chained-5.jpg", "fix": "Render the world to a fixed 640x360 (or 480x270) art buffer, nearest-neighbour integer upscale; replace painted/Blender assets with hand-pixelled tiles and sprites on shared hue-shifted era palettes with one outline rule."},
    {"id": "G-pixel-system", "category": "pixel", "expectedGain": 4, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "crops/R02-player", "desktop/R07"], "benchmark": "benchmarks/stardew-1.jpg", "fix": "Establish one world art grid, integer presentation and nearest-neighbour scaling; author replacement assets with shared hue-shifted ramps and one outline rule, validating a complete farm and town sample. (Duplicate of G-pixel-render-core.)"},
    {"id": "G-cast-checklist-sprites", "category": "characters", "expectedGain": 3, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R07-player", "desktop/R16"], "benchmark": "seastars-2.jpg", "fix": "Distinct per-heir sprites from refs/characters.md (skirt/petticoat layers, sun bonnet, pinched fedora, ponytail, structured cap), ~2.4-head proportions, drawn hands; place named NPCs and animals in scenes; show close-ups beside reference sheets."},
    {"id": "G-character-silhouettes", "category": "characters", "expectedGain": 3, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R17-player"], "benchmark": "benchmarks/seastars-2.jpg", "fix": "Build garment-specific silhouettes and distinct hat constructions against characters.md; prioritise Ada's apron and petticoat, Nora's bonnet and work dress, and Ray's fedora and cuff details. (Overlaps G-cast-checklist-sprites.)"},
    {"id": "G-tool-swing-frames", "category": "animation", "expectedGain": 1.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "fix": "4-6 frame hoe swing with wind-up, impact (soil particles, 1-2 frame hit-stop) and settle; tile visibly becomes tilled. Capture it on a tillable field tile, not the cabin path."},
    {"id": "G-walk-cycle-6f", "category": "animation", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "6-frame walk in 4 directions, building on the existing arm swing (strips/R13 frames 7-8), adding passing and contact poses and a 1 px head bob; hat drawn per facing instead of a top-down disc."},
    {"id": "G-tool-action", "category": "animation", "expectedGain": 2, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "pixel-anchors.md section 3.5: Stardew-level motion anchor; benchmark stills do not establish motion", "fix": "Author anticipation, strike, contact and recovery poses, change the struck soil and add a brief soil burst; recapture the complete action with sufficient temporal coverage. (Hoe part duplicates G-tool-swing-frames; walk part overlaps G-walk-cycle-6f.)"},
    {"id": "G-bitmap-ui-era-frames", "category": "ui", "expectedGain": 2, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R12"], "benchmark": "stardew-5.jpg", "fix": "Bitmap pixel font at integer scale (keep the existing per-era typeface split: serif 1886, deco sans 1931, rounded display 1955), nine-slice frames per era material, one icon style across shop/hotbar/pack, a real dialogue box with portrait; keep per-era colour theming."},
    {"id": "G-ui-language", "category": "ui", "expectedGain": 2, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "mobile/R12", "mobile/R04"], "benchmark": "benchmarks/seastars-4.jpg", "fix": "Replace smooth borders with pixel frames, use integer-scaled bitmap typography and redraw the complete icon family on one grid while preserving phone inventory reflow. (Overlaps G-bitmap-ui-era-frames.)"},
    {"id": "G-ongrid-lighting-weather", "category": "lighting", "expectedGain": 2, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R07", "desktop/R08", "desktop/R09", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Banded/dithered light pools at art resolution coloured per source and lighting lamp bases; consistent one-sun cast shadows; rain darkening and puddles; banded fog that spares the gameplay layer; snow roof/terrain variants and winter flora. Dusk already reads (desktop/R06); lowest priority."},
    {"id": "G-light-structure", "category": "lighting", "expectedGain": 2, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R08", "desktop/R10"], "benchmark": "benchmarks/seastars-2.jpg", "fix": "Use grid-resolved light falloff, coherent contact and cast shadows, layered fog with protected gameplay contrast, and snow accumulation that follows roof and ground forms. (Overlaps G-ongrid-lighting-weather.)"},
    {"id": "G-depth-sort", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R03-player", "crops/R08-player", "strips/R13"], "fix": "Y-order already appears correct (the lamp base is south of the player's feet in crops/R08-player). Fix the real cause: occluder fade or silhouette for lamps, building overhangs and tall crops in front of the player, stronger than the existing faint crop fade; trim building art that overhangs walkable tiles."},
    {"id": "G-target-visibility", "category": "readability", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["crops/R03-player", "crops/R08-player", "mobile/R05"], "benchmark": "benchmarks/stardew-1.jpg", "fix": "Fade foreground occluders around the actor (strengthening the existing crop fade), strengthen the target square under darkness, and distinguish growth and harvest states through compact silhouettes and restrained markers."},
    {"id": "G-env-density-and-breaks", "category": "environment", "expectedGain": 1.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R07", "desktop/R03", "desktop/R08", "desktop/R15"], "benchmark": "stardew-1.jpg", "fix": "Dress empty lawns and the lake (reeds, boats, rocks, marina), remove translucent ghost structures, replace grey placeholder boxes at the springs, close fence gaps, vary town lots per era."},
    {"id": "G-scene-construction", "category": "environment", "expectedGain": 1.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R15", "desktop/R17"], "benchmark": "benchmarks/stardew-1.jpg; benchmarks/chained-5.jpg", "fix": "Connect fences, tighten oversized offset shadows to contact points, harmonise dock and bridge materials, and dress purposeful routes with storage, work areas and vegetation transitions. (Overlaps G-env-density-and-breaks.)"},
    {"id": "G-era-clothing-lamps-2026", "category": "authenticity", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "crops/R02-player", "desktop/R07"], "fix": "Skirts for women before 1955, no gas street lamps in 1886, and a 2026 restored-Row town capture with modern dressing."},
    {"id": "G-era-specificity", "category": "authenticity", "expectedGain": 1, "severity": 3, "effort": "L", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R09", "desktop/R07"], "benchmark": "benchmarks/chained-5.jpg for coherence; research/visual-eras.md for historical requirements", "fix": "Give each chapter a reference-backed landmark, streetscape treatment and working prop set; prioritise researched 1886 hotel and ironclad forms, varied 1871 frontage and modern lake infrastructure."},
    {"id": "G-capture-staging", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R11", "desktop/R15", "desktop/R16", "desktop/R14"], "fix": "Make the capture script open a dialogue, spawn the pen animals and place the 1807 NPCs before taking R11, R15 and R16, and stage R14 on a tillable field tile as its title promises, so characters, ui and animation can be scored."}
  ],
  "verdict": "continue"
}
```
