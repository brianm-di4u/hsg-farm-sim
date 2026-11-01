# Advocate: loop 3, tier T32

I checked every critic claim against the captures in `games/farm-sim/screenshots/review-loop-3/`. Where I needed a closer look I made nearest-neighbour zooms (throwaway, in the scratchpad) and measured mean colour on equal regions with PIL. Most of the critics' complaints hold up. Hidden faces, overlapping walkers, the hen icon, off-grid fog, empty lawns and the copy-pasted farmyard are all real. Several specific claims are wrong, though, and three of them pull scores down: Critic A's hoe and rain/dusk claims, and Critic A's mobile-font claim. Critic B's stated total also doesn't match its own scores.

Critic means: pixel 5.5, characters 4.5, environment 6.0, lighting 5.25, animation 4.75, ui 5.75, readability 6.25, authenticity 6.5 (total 44.5).

## Plainly wrong facts

**Critic A (critic-claude)**
1. *"the body is identical in all 8 frames"* (`strips/R14`). Wrong. Frames 1–5 show different head and torso poses. In frame 1 the head is bowed and shifted right, so only hair shows. In frame 2 the face is hidden behind the raised shaft. In frame 3 the head moves left with the face in three-quarter view. Frame 4 is square to camera and frame 5 recovers. Only frames 6–8 are the identical idle pose.
2. *"`mobile/R11` 'Augustin Duval' shows smooth curves"*. Wrong. At 4× zoom the name is a stepped bitmap face, about 2 device px per font pixel, with no curves. The desktop body text (`desktop/R04` HUD) is the **same** bitmap face drawn at 1 device px, with a grey fringe. So the defect is scale on desktop. It is not a second, vector type system.
3. *"Rain has no darkening"* (`desktop/R09`). Wrong. Measured on the same top-centre grass region, mean lightness is 0.384 in rain against 0.417–0.462 in the clear frames (`desktop/R02`, `R03`, `R04`, `R14`). Saturation is 0.16 against 0.22–0.27. That is a visible cool, grey darkening. The missing wet ground and puddles are real.
4. *"no lit windows to speak of"* at dusk (`desktop/R06`). Wrong. Windows are lit on Quapaw (several on both floors), Ozark (two flanking the door) and Hale, plus lamp glows. The same grass region measures 0.332 lightness against 0.462 by day, and the building walls shift to mauve (Ozark mean RGB 86,70,74). Calling this "a slight desaturation" undersells it. The missing warm/cool split is a fair point.
5. *"Snow has … unlit lamps"* (`desktop/R10`). The frame is at 10:40 in the morning, so unlit lamps are correct and not a defect.
6. *"All four 1886 bathhouses share one green mansard palette"* (`desktop/R04`). Overstated. The roofs share green, but the walls are red brick (HOT BATHS), yellow (BATH HOUSE) and cream (BATHS, FREE BATHS).
7. *"Hattie's … white cap … never read[s]"* (`crops/R11-npcs`). The white cap reads clearly as a white dome. Her face and skin don't, because the dome covers them, and that is the real defect.
8. *"nothing behind [the rows]: no hillside, no trees"* (`desktop/R04`, `desktop/R19`). True of the desktop crops, but `mobile/R04` shows trees, boulders and a dirt path along the top edge above the Row. The 1871 and 1931 farm frames have forest along their edges (`desktop/R03`, `desktop/R17`).

**Critic B (critic-codex)**
1. *"T32 scores 46/80"*. Its own JSON adds up to 45.5.
2. *"`strips/R13` … show alternating foot and arm poses"*. The arms are hidden under the slouch brim in all 8 frames, so only the legs alternate. This actually supports B's score less than B suggests.
3. *"`crops/R03-field` … crowded highlights"*. The white squares sit one per grown tile in a regular grid. They read as deliberate ready or sparkle markers, not as noisy ramps. The 1-px checker in the grass around the plot is the real cluster problem.

## Category by category

### pixel (A 6.0, B 5.0, mean 5.5) → proposed **5.5**
- **Concede (both):** the ground still has a fine 1-art-px checker. It shows in the grass of `crops/R15-pen` and `crops/R03-field` and in the cobbles of `crops/R04-player`, even though the brief claims 2×2 minimum clusters. The heads carry an orphan brown or red patch on the right cheek (`crops/R02-player`, `crops/R04-player`, the `desktop/R11` portrait). The goat in `crops/R15-pen` also has a stray green smear on its flank.
- **Concede (A):** the field fog is off the grid. The 5× zoom of `desktop/R08` (x 1080–1260, y 100–220) shows a smooth radial white blob and 1-device-px anti-aliased wisps. The translucent ghost rectangle is real at `desktop/R07` x 990–1110, y 190–225, with a second one at the left bridge (x 20–170, y 130–195). The logo is a smooth serif (`desktop/R01`, zoomed).
- **Rebut (A, partly):** "smooth steam plumes" doesn't apply to the spring pool. The steam over the pool in `desktop/R08` (x 1030–1200, y 460–590, zoomed) is stepped, on the grid, and in clusters. Only the field fog is smooth.
- **Rebut (B):** B scores 5, which is anchor 5's "noisy clusters, muddy ramps, inconsistent outlines between asset families". That ignores how clean the large families are. The architecture in `crops/R04-row` and `crops/R19-row` and the livestock in `crops/R15-pen` have closed dark outlines, 3–4-step ramps and coherent per-era palettes. That is roughly 7-level work, held back by characters and ground. 5.5 is the honest midpoint.

### characters (A 4.5, B 4.5) → proposed **4.5**
- **Concede:** the cap and fedora domes cover the face completely. Sam is a blue disc with a grey bar (`crops/R07-player`, `crops/R19-player`), and Walt and Hattie are the same (`crops/R11-npcs`). Ray's grey dome hides his eyes (`desktop/R05`, `desktop/R17`). Josiah's beard renders orange-red (`crops/R16-npcs`). Ezra's tag floats over the tent with no body under it (`desktop/R16`). The bonnet townsfolk are identical stamps (`desktop/R04`). The townsperson in `crops/R19-player` has no eyes.
- **Credit missed:** Nora and Ada have faces with eye highlights, and their apron, sleeve and ankle-skirt construction reads (`crops/R04-player`, `crops/R02-player`). Augustin's toque reads (`crops/R11-npcs`). Caleb's slouch brim is a strong silhouette (`desktop/R03`). The livestock in `crops/R15-pen` are at CAL-A level.
- No correction. Three named people have no face, and that caps the score below 5.

### environment (A 6.0, B 6.0) → proposed **6.0**
- **Concede:** the farm frames are 70–80% bare grass (`desktop/R03`, `desktop/R14`). The farmyard layout is identical in `desktop/R13` and `desktop/R17`: pump, crate, trough, fence and path all in the same place. The dock has no posts and the water tile visibly repeats (`desktop/R07`).
- **Partial rebut:** the era props swap even where the layout doesn't: woodpile and wagon in 1871, hay bales and a Model A in 1931, dogtrot cabin against Craftsman bungalow. The water isn't "featureless". `desktop/R07` has a lighter shallow band along the shore, a darker deep zone and sparkle pixels. There is backdrop forest north of the Row (`mobile/R04` top) and around the farm (`desktop/R03`, `desktop/R17`). In `desktop/R14` the bareness is the chapter-1 "Break ground" wilderness, but it is still visually thin.
- Both critics agree, and so do the captures: 6.0.

### lighting (A 5.0, B 5.5, mean 5.25) → proposed **5.5**
- **Concede:** the player-centred light disc and the hard horizontal clip of the bright green lamp pools at the kerb are visible (`desktop/R05`, `mobile/R05` y ≈ 1110–1180). Lamps cast no shadows, the off-grid field fog is real (`desktop/R08`), and there are no puddles or wet ground in rain (`desktop/R09`).
- **Rebut (A):** see wrong facts 3–5. Rain is measurably darker and cooler. Dusk is 28% darker, with a mauve wall shift and lit windows (`desktop/R06`). Unlit lamps at 10:40 are correct. The night pools in `desktop/R05` are discrete concentric bands, which is the "banded or dithered, on-grid" behaviour the 7 anchor asks for. B's "conspicuous concentric circular pools" criticises that banding itself, and the rubric doesn't count banding against a game.
- **Rebut (A, "murky near-black facades"):** in `desktop/R05` and `mobile/R05` the facades keep their window grids, cornices and lit windows (Ozark, Hotel, Quapaw). They are dark but readable, which fits the brief's 75% darkness cap.
- Snow (`desktop/R10`) is only about 15–20 RGB brighter than `desktop/R04` on matching facade regions, with no cool shadow tone. A's point about snow light stands.
- On balance: era lamps, neon, banded pools, a distinct dusk, a rain grade and fog mood are all present, offset by on-grid failures in the fog and missing shadows. 5.5.

### animation (A 4.5, B 5.0, mean 4.75) → proposed **5.0**
- **Concede (both):** in `strips/R14` the hands never grip the handle, so the hoe floats across the face. There is no impact frame, no hit-stop and no tilled result, and a loose grey chip trails the blade in frames 1–5. In `strips/R13` the hat stays rigid with no bob, the arms are never visible, and a lamp post hides the legs in frames 3–6.
- **Rebut (A):** see wrong fact 1. The body does move through frames 1–5 of the swing. That puts it above anchor 3 ("static or sliding sprites") and A's "no body motion at all", in anchor 5's "basic cycle, little secondary motion".
- **Cause challenge (A, "no tilled tile appears"):** the target bracket in `desktop/R14` sits on a weed tuft. `desktop/R16` shows the in-game toast "Clear the grass with the scythe first." That suggests the 1807 ground needs the scythe before the hoe, so the missing result is at least partly how the capture was set up, not a missing feature. The judge can't credit a result nobody saw, but part of this gap's gain should come cheaply from a re-shot capture.
- `strips/R13` shows at least 4 distinct stride poses across 8 frames. 5.0.

### ui (A 5.0, B 6.5, mean 5.75) → proposed **5.5**
- **Concede (A):** the logo is a smooth serif (`desktop/R01`). The shop's Hen icon is an empty oval (`desktop/R18`), even though the brief says livestock uses animal sprites. Slot digits overlap the icon art (`desktop/R12`, `mobile/R12`, "7" and "8" on the produce). The frames are thin bordered rectangles, not nine-slice material. The dialogue portrait is the world sprite scaled up, cheek smear included (`desktop/R11`, `mobile/R11`).
- **Rebut (A):** see wrong fact 2. There is one bitmap family plus a pixel heading face, not three systems. On the phone it is already crisp at 2× (`mobile/R11`, `mobile/R12`). On desktop it is drawn at 1 device px (`desktop/R04`), which is a scale setting, not a missing font.
- **Rebut (B):** 6.5 skips the overlapping digits and the misplaced portrait smear, and treats the Hen oval as a small inconsistency. It is a broken icon that contradicts a stated change.
- **Credit:** era colourways (green 1807 in `desktop/R16`, cream 1886 in `desktop/R04`, navy and gold 1931 in `desktop/R12`, teal 1955 in `desktop/R18`, blue 2026 in `desktop/R19`) and the pixel-illustrated title backdrop (`desktop/R01`).
- 5.5 sits between B's oversight and A's factual error.

### readability (A 6.0, B 6.5, mean 6.25) → proposed **6.0**
- **Concede (both):** the phone HUD takes about 23% of the height (`mobile/R04`, about 390 of 1688 px) and the goals line wraps to 2 lines (`mobile/R04`, `mobile/R05`, `mobile/R12`). The dialogue covers the hotbar (`mobile/R11`). Passers-by merge with the player in `desktop/R08`, `desktop/R19` and `desktop/R06`, three separate frames. The JOSIAH, TRADE and MARGAUX labels butt together (`desktop/R16`). With faces hidden, NPC identity rests on name tags.
- **Credit:** the crop stages are distinct (`crops/R03-field`), the phone A and B buttons and hotbar are large (`mobile/R04`), and the night street stays navigable (`mobile/R05`).
- The overlap problem is frequent enough that I side with A's 6.0 over B's 6.5.

### authenticity (A 6.5, B 6.5) → proposed **6.5**
- **Concede:** there is no Hot Springs Mountain behind the desktop Row, and it is laid out as two facing rows (`desktop/R04`, `desktop/R19`). Townsfolk are stamps, including the 1955 blue disc hats (`desktop/R06`). Named garments miss their checklists (`crops/R11-npcs`).
- **Rebut:** wrong fact 6. The 1886 bathhouses differ in wall material and colour (`desktop/R04`). Era signatures are strong and visible: board-and-batten and false fronts in 1871 (`desktop/R09`), five-globe lamps and neon in 1931 (`desktop/R05`), a Model A and a bungalow (`desktop/R17`), Googie drive-in, motor hotel and hydrant in 1955 (`desktop/R06`), and herringbone brick with solar panels in 2026 (`desktop/R19`).
- No change.

**Proposed total: 44.5/80**, the same as the critic mean, but redistributed. Lighting and animation go up on evidence A misread. Pixel and UI land between the critics.

## Gaps (critics' gaps with adjusted severity and gain)

| Gap | Critic | Original sev / gain | Adjusted sev / gain | Reason |
|---|---|---|---|---|
| G-faces-under-headwear | A | 5 / 1.0 | 5 / 1.0 | Confirmed (`crops/R07-player`, `crops/R19-player`, `crops/R11-npcs`). Hattie's cap already reads; the fix is the face under it. |
| G-character-construction | B | 5 / 1.5 | 4 / 1.0 | Mostly overlaps G-faces-under-headwear. Nora and Ada's garment construction already reads (`crops/R04-player`, `crops/R02-player`). |
| G-face-smear-hair-noise | A | 4 / 0.5 | 4 / 0.5 | Confirmed on every head. |
| G-cluster-discipline | B | 5 / 1.5 | 4 / 1.0 | The ground checker is confirmed, but architecture and animals are clean (`crops/R04-row`, `crops/R15-pen`). The R03-field "highlights" are deliberate markers. |
| G-hoe-rigid-tool | A | 4 / 1.0 | 4 / 0.75 | The body does move (frames 1–5). The missing tilled tile is likely the capture target (a weed tuft; scythe-first rule in `desktop/R16`). |
| G-tool-body-mechanics | B | 4 / 1.5 | 4 / 1.0 | Same defect as G-hoe-rigid-tool; the gains overlap. |
| G-mixed-type | A | 4 / 1.0 | 3 / 0.5 | One bitmap face is already crisp on phone. The fix is integer 2× on desktop plus a pixel logo. |
| G-sprite-overlap | A | 4 / 0.5 | 4 / 0.5 | Confirmed in 3 frames. |
| G-weather-light-flat | A | 4 / 1.0 | 3 / 0.5 | Rain is darker and cooler, and dusk has lit windows and a mauve grade (measured). Still missing: wet ground, a warm/cool split, cool snow shadows, cast shadows. |
| G-light-integration | B | 4 / 1.0 | 3 / 0.5 | The banded pools match the rubric. Real issues: the player disc, the kerb clip, facade midtones. Overlaps G-night-facades-murky and G-fog-offgrid. |
| G-fog-offgrid | A | 3 / 0.5 | 3 / 0.5 | Confirmed for field fog and wisps. The spring steam is already on the grid. |
| G-empty-lawns | A | 3 / 0.5 | 3 / 0.5 | Confirmed for farm frames and the desktop Row; forest exists at the frame edges. |
| G-space-composition | B | 4 / 1.0 | 3 / 0.5 | Overlaps G-empty-lawns. The water has depth banding. |
| G-night-facades-murky | A | 3 / 0.5 | 2 / 0.25 | The facades keep window grids and lit windows. The kerb-clipped pools remain. |
| G-townsfolk-stamps | A | 3 / 0.5 | 3 / 0.5 | Confirmed (`desktop/R04`, `desktop/R06`). |
| G-era-detail | B | 3 / 0.5 | 3 / 0.5 | Confirmed. |
| G-shop-icons-panels | A | 3 / 0.5 | 3 / 0.5 | Hen oval and digit overlap confirmed. |
| G-panel-icon-coherence | B | 3 / 0.5 | 3 / 0.5 | Overlaps G-shop-icons-panels. |
| G-overlay-crowding | B | 3 / 0.5 | 3 / 0.5 | Confirmed (`mobile/R04` wrap, `desktop/R16` labels). |
| G-ghost-rectangle | A | 2 / 0.25 | 2 / 0.25 | Confirmed, with a second instance at the left bridge in `desktop/R07`. |

```json
{
  "loop": 3,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R04-row", "note": "architecture: closed outlines, 3-4 step ramps, coherent era palette; B's 5 ignores this"},
        {"shot": "crops/R15-pen", "note": "livestock clean; grass still a 1-art-px checker; stray green smear on goat"},
        {"shot": "crops/R04-player", "note": "orphan cheek patch on head; cobble checker"},
        {"shot": "desktop/R08", "note": "field fog: smooth radial blob and 1-device-px wisps (off grid); spring-pool steam is stepped and on grid"},
        {"shot": "desktop/R07", "note": "ghost rectangles at x990-1110 y190-225 and the left bridge"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R07-player", "note": "Sam's cap dome covers the whole face (confirmed)"},
        {"shot": "crops/R11-npcs", "note": "Walt and Hattie faces hidden; Hattie's white cap does read; Augustin toque reads"},
        {"shot": "crops/R04-player", "note": "Nora has eyes; apron, sleeves, ankle skirt read; bonnet a pale dome"},
        {"shot": "crops/R16-npcs", "note": "Josiah beard orange-red, not grey; Ezra not visible"},
        {"shot": "crops/R15-pen", "note": "livestock at CAL-A level"}
      ]
    },
    "environment": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "rich Second Empire facades; Row on open lawn in the desktop view"},
        {"shot": "mobile/R04", "note": "trees, boulders and path above the Row (forest backdrop exists)"},
        {"shot": "desktop/R17", "note": "farmyard layout identical to desktop/R13, but props swap per era (hay/Model A vs woodpile/wagon)"},
        {"shot": "desktop/R07", "note": "repeating water tile and post-less dock; shallow/deep banding present"},
        {"shot": "desktop/R14", "note": "70-80% bare grass with tufts"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R05", "note": "banded on-grid pools, five-globe lamps, neon; player-centred disc; facades dark but keep window grids"},
        {"shot": "mobile/R05", "note": "lamp pools hard-clipped at the kerb (y~1110-1180)"},
        {"shot": "desktop/R06", "note": "dusk: grass lightness 0.33 vs 0.46 day, mauve wall shift, lit windows on Quapaw/Ozark/Hale"},
        {"shot": "desktop/R09", "note": "rain: grass lightness 0.38 vs 0.42-0.46 clear, saturation 0.16 vs 0.22-0.27; no puddles"},
        {"shot": "desktop/R10", "note": "snow only slightly brighter than R04, no cool shadow; unlit lamps correct at 10:40"},
        {"shot": "desktop/R08", "note": "fog mood present; field fog off the grid"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/R14", "note": "frames 1-5 show distinct head/torso poses (A's 'identical' is wrong); no grip, impact or result; stray chip"},
        {"shot": "strips/R13", "note": "at least 4 stride poses; rigid hat, arms never visible; post hides legs in frames 3-6"},
        {"shot": "desktop/R14", "note": "target tile holds a weed tuft; R16 toast 'Clear the grass with the scythe first' suggests the missing tilled result is the capture setup"}
      ]
    },
    "ui": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "mobile/R11", "note": "dialogue name is a stepped bitmap face at 2x, not smooth curves (A wrong); portrait carries the cheek smear"},
        {"shot": "desktop/R04", "note": "same bitmap face drawn at 1 device px with a grey fringe on desktop; cream/brown 1886 colourway"},
        {"shot": "desktop/R01", "note": "smooth serif logo over a strong pixel backdrop"},
        {"shot": "desktop/R18", "note": "Hen icon is an empty oval despite the stated change; plain list rows"},
        {"shot": "desktop/R12", "note": "navy/gold 1931 panel; slot digits overlap icon art"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "HUD ~23% of height, goals wrap; large A/B buttons and hotbar"},
        {"shot": "mobile/R11", "note": "dialogue covers the hotbar"},
        {"shot": "desktop/R19", "note": "two passers-by merged into the player sprite"},
        {"shot": "crops/R03-field", "note": "crop stages distinct"},
        {"shot": "desktop/R16", "note": "JOSIAH / TRADE / MARGAUX labels butt together"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "bathhouse walls vary (red brick, yellow, cream), roofs share green; no mountain behind; stamped bonnet townsfolk"},
        {"shot": "desktop/R09", "note": "1871 board-and-batten and false fronts"},
        {"shot": "desktop/R05", "note": "1931 five-globe lamps and neon CLUB"},
        {"shot": "desktop/R06", "note": "1955 Googie drive-in, motor hotel, hydrant; disc-hat townsfolk"},
        {"shot": "desktop/R19", "note": "2026 herringbone brick, solar panels, farmers market"}
      ]
    }
  },
  "gaps": [
    {"id": "G-faces-under-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R07-player", "crops/R19-player", "crops/R11-npcs", "crops/R17-player"], "benchmark": "chained-5.jpg", "fix": "Cap headwear at the brow line in front and side views; always draw an eye row (and a nose or mouth pixel) over the hat layer; keep Hattie's white cap but show skin 4 beneath it; pinched crown on fedoras."},
    {"id": "G-character-construction", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "benchmarks/chained-5.jpg", "fix": "Redraw person-specific silhouettes, headwear openings, garment construction and occupational props; integrate character shading with the scenery. Overlaps G-faces-under-headwear."},
    {"id": "G-face-smear-hair-noise", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R16-npcs", "desktop/R11"], "benchmark": "seastars-2.jpg", "fix": "Hand-clean head layers per hair style: 3-step hue-shifted ramp, closed 1-px dark outline, delete the orphan right-cheek cluster; grey beard for Josiah."},
    {"id": "G-cluster-discipline", "category": "pixel", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/R15-pen", "crops/R04-player", "crops/R03-field"], "benchmark": "benchmarks/stardew-1.jpg", "fix": "Replace the 1-art-px grass and cobble checker with sparse larger clusters; architecture and animals already meet the bar, so focus on ground and character families."},
    {"id": "G-hoe-rigid-tool", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14", "desktop/R16"], "fix": "Bake the tool into authored body frames with hands on the handle (raise, overhead, strike with a crouch, recover); 2-frame hit-stop; on-grid soil puff; remove the trailing chip; re-shoot R14 on a scythed or bare tile so the tilled result is captured."},
    {"id": "G-tool-body-mechanics", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "pixel-anchors.md section 3.5 Stardew-level motion standard", "fix": "Torso compression, two-handed grip, planted feet, impact and soil displacement; body bob and visible arms in the walk. Overlaps G-hoe-rigid-tool."},
    {"id": "G-mixed-type", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R04", "desktop/R01", "mobile/R11"], "benchmark": "stardew-5.jpg", "fix": "Render the existing bitmap body face at an integer 2x on desktop (as on phone) with smoothing off; redraw the logo as pixel lettering on the art grid."},
    {"id": "G-sprite-overlap", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/R08-player", "crops/R19-player", "desktop/R06"], "fix": "Render-only townsfolk steer around the player and named NPCs within 1 tile and never spawn near the player or camera centre; fix lamp-post versus walker draw order."},
    {"id": "G-weather-light-flat", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R09", "desktop/R10"], "benchmark": "chained-5.jpg", "fix": "Keep the existing rain and dusk grades; add a warm-key and purple-shadow split at dusk, on-grid puddle ripples and wet road tone in rain, a cool shadow tone and footprints in snow, and one-sun-direction drop shadows."},
    {"id": "G-light-integration", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05", "desktop/R08"], "benchmark": "benchmarks/seastars-2.jpg", "fix": "Keep the banded pools; remove the player-centred disc or make it a subtle lantern, clip pools by radius not ground type, preserve facade midtones. Overlaps G-night-facades-murky and G-fog-offgrid."},
    {"id": "G-fog-offgrid", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R08"], "fix": "Render field fog at art resolution, quantised to 3-4 alpha bands with ordered dither; wisps at 1 art px; the spring-pool steam is already on the grid, so match it."},
    {"id": "G-empty-lawns", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R14", "desktop/R04", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Bring the existing forest backdrop (seen at the top of mobile/R04) into the desktop Row view as Hot Springs Mountain; scatter ground decals; vary farmyard layout per era; soften the plot edge."},
    {"id": "G-space-composition", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R07", "desktop/R17"], "benchmark": "benchmarks/stardew-1.jpg", "fix": "Compose worn yard areas, grouped storage and vegetation; break water repetition; add dock posts and shoreline transitions. Overlaps G-empty-lawns."},
    {"id": "G-night-facades-murky", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Facades already keep window grids and lit windows; add a cool moonlight fill for one more wall value step and banded window light on the street; fix the kerb clip."},
    {"id": "G-townsfolk-stamps", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R10", "desktop/R06"], "fix": "At least 4 body and outfit variants per era with seasonal outerwear; small fedoras instead of disc hats in 1955; mix men and women in 1886."},
    {"id": "G-era-detail", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["crops/R11-npcs", "desktop/R19"], "benchmark": "benchmarks/snes-earthbound-1.png", "fix": "Audit visible costumes against the character checklist and spread era-specific working objects and street activity beyond the landmark buildings."},
    {"id": "G-shop-icons-panels", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R11", "desktop/R12"], "benchmark": "seastars-4.jpg", "fix": "Make the Hen entry actually use the hen sprite; nine-slice era panels from world materials; slot digits in a corner badge clear of the icon; authored bust portraits."},
    {"id": "G-panel-icon-coherence", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18"], "benchmark": "benchmarks/chained-3.jpg", "fix": "Era-specific frame and corner sprites and a unified icon set. Overlaps G-shop-icons-panels."},
    {"id": "G-overlay-crowding", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R04", "desktop/R11", "desktop/R16"], "benchmark": "benchmarks/stardew-5.jpg", "fix": "Shorten the phone goal heading to fit one line; separate neighbouring name tags from each other and from sign boards."},
    {"id": "G-ghost-rectangle", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R07"], "fix": "Clip path and bridge tiles at the shoreline (two instances: the herringbone path at x990-1110 and the left bridge) or draw a landing; no alpha-blended tiles over water."}
  ],
  "verdict": "continue"
}
```
