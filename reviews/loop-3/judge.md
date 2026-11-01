# Judge: loop 3, tier T32

## Hard gates
- Tests: pixel suite 88/88 on the final build. The two painted-suite failures were load-sensitive perf readings taken during the GPU capture, and they passed 2/2 when re-run alone (`GATES.md`). Met.
- Pixel integrity: pass on all 26 captures. Met.
- Performance (`perf.json`): desktop min 619 fps (needs ≥ 58). Phone 4×: min 84 fps, worst p95 25.5 ms (needs ≥ 30 fps, ≤ 50 ms). Phone 6×: min 43 fps (needs ≥ 24). Heap ≤ 22 MB (needs < 40). Met. Logged per the budget: two single frames over 150 ms, both on the 6× phone (308 ms lake, 217 ms snow). The p95 rule applies at 4× only, so these are not gating.

The loop is scorable. No category reaches its gate, so the verdict is **continue**.

## What I checked myself
`strips/R14`, `strips/R13`, `desktop/R04` (HUD zoomed 5×), `mobile/R11` (dialogue name zoomed 5×), `desktop/R05`, `desktop/R06`, `desktop/R08`, `desktop/R09`, `desktop/R03`, `desktop/R11`, `desktop/R18`, `desktop/R19`, `mobile/R04`, `crops/R04-row`, `crops/R07-player`, `crops/R11-npcs`, `crops/R15-pen`, `crops/R16-npcs`, and `calibration.jpg`.

Rulings on the advocate's disputed facts:
- **Hoe body "identical in all 8 frames" (A):** the advocate is right. In `strips/R14` the head is bowed and shifted in frame 1, hidden behind the shaft in frame 2, turned in frame 3 and square in frame 4. The torso barely moves, and the hands never hold the handle. That is weak body motion, not none.
- **Mobile dialogue name in "smooth curves" (A):** the advocate is right. The 5× zoom of `mobile/R11` shows a stepped bitmap face with only a light AA fringe. The desktop goals text (`desktop/R04`, 5× zoom) is the same family drawn at 1 device px with grey anti-aliased fringing, which is off the 2-device-px art grid. So there is one body face plus a pixel heading face, at an inconsistent scale, and a smooth serif logo (`desktop/R01`). That is not three type systems.
- **Rain and dusk (A):** the advocate is right that both have a grade. `desktop/R09` is greyer and cooler, with lit windows. `desktop/R06` is visibly darker, with lit windows on Quapaw, Ozark and Hale. A's other points stand: no wet ground or puddles, and no warm/cool split at dusk.
- **Night facades "murky near-black" (A):** partly true. In `desktop/R05` the facades keep their window grids and signs, but wall materials drop to one or two dark values.

## Category rulings

### pixel: 5.5 (A 6.0, B 5.0)
The architecture in `crops/R04-row` and `crops/R19-row`, and the livestock in `crops/R15-pen`, have closed dark outlines, 3–4-step ramps and coherent per-era palettes. That is roughly 7-level work, and B's 5 doesn't credit it. Against it: the grass in `crops/R15-pen` and the water in `crops/R07-player` are still a 1-art-px checker, despite the stated 2×2 minimum clusters. Every head carries the orphan red/brown cheek cluster (`crops/R16-npcs`, `crops/R11-npcs`, and the portrait in `desktop/R11`). The field fog in `desktop/R08` is smooth and off the grid. Mixed families with clean anchors put this between the critics: **5.5**.

### characters: 4.5 (A 4.5, B 4.5)
I confirmed: Sam's cap is a blue disc with a grey bar and no face (`crops/R07-player`, beside a reference where the bill sits above the eyes). Walt's and Hattie's domes cover their faces (`crops/R11-npcs`). Ezra's tag floats over the tent with nobody under it, and Josiah's beard is orange-red rather than grey (`crops/R16-npcs`). Credit: Nora and Margaux have eyes and readable sleeves, aprons and ankle skirts (`crops/R11-npcs`, `crops/R16-npcs`). Caleb's slouch brim is a strong silhouette (`desktop/R03`). The animals in `crops/R15-pen` are benchmark-grade, but people are what this category weighs. With three named people faceless, the score stays **4.5**.

### environment: 6.0 (A 6.0, B 6.0)
The buildings are rich and era-varied (`desktop/R04`, `desktop/R19`), and the crop stages read (`desktop/R03`). The farm frames are mostly bare grass (`desktop/R03`). The dock has no posts and the water tile repeats (`desktop/R07`). Street dressing is one item per lamp (`desktop/R19`). `mobile/R04` does show forest and a path above the Row, so A's "nothing behind it" is a desktop-framing issue. **6.0**.

### lighting: 5.5 (A 5.0, B 5.5)
In `desktop/R05` the lamp pools are banded and on the grid, with five-globe posts and neon. That fits the anchor-7 description. But the green grass pools are cut by a hard horizontal edge at the kerb, there is a player-centred disc, and nothing casts a shadow. Dusk and rain have real grades (`desktop/R06`, `desktop/R09`), but no warm/cool split and no wet ground. In `desktop/R08` the springs fog is a pale wash with smooth plumes. **5.5**.

### animation: 5.0 (A 4.5, B 5.0)
`strips/R13` shows alternating stride poses: a basic cycle. The hat stays rigid, there is no bob, and no arms show. A lamp post hides the legs in frames 3–6. In `strips/R14` the head moves through frames 1–5, but the hoe floats with no grip. There is no impact frame and no tilled result, and a chip trails the blade. That matches anchor 5's "basic walk cycle, little secondary motion". **5.0**, low confidence.

### ui: 5.5 (A 5.0, B 6.5; gap 1.5, checked)
Neither critic was fully right. A's "three type systems" was wrong, as the zooms show (see above). B's 6.5 overlooks real defects. Desktop body text is anti-aliased at 1 device px (`desktop/R04` zoom). The logo is a smooth serif (`desktop/R01`). The shop is a plain list, and its Hen row shows an empty oval, contradicting the stated change (`desktop/R18`). Slot digits overlap the item art (`desktop/R04` hotbar "6"/"8"). The dialogue portrait is the upscaled world sprite, cheek smear included (`desktop/R11`, `mobile/R11`). Credit: per-era panel colourways (`desktop/R05`, `desktop/R19`) and pixel-bordered frames. **5.5**.

### readability: 6.0 (A 6.0, B 6.5)
On the phone the player and controls are clear, but the HUD takes about 23% of the height and the goals line wraps (`mobile/R04`). Overlaps are frequent. In `desktop/R19` the player is sandwiched between two passers-by. A walker overlaps the player in `desktop/R06` and `desktop/R08`. The JOSIAH, TRADE and MARGAUX labels butt together (`crops/R16-npcs`). Crop stages are distinct (`desktop/R03`). **6.0**.

### authenticity: 6.5 (A 6.5, B 6.5)
Era signatures are strong. 1871 board-and-batten and false fronts (`desktop/R09`). 1931 five-globe lamps and neon (`desktop/R05`). 1955 Googie drive-in, motor hotel and hydrant (`desktop/R06`). 2026 herringbone brick, solar panels and a farmers market (`desktop/R19`). The bathhouse walls vary in colour (`desktop/R04`). Held back by stamped townsfolk (identical bonnet women in `desktop/R04` and `desktop/R08`, disc hats in `desktop/R06`) and by named costumes that miss their checklists (`crops/R11-npcs`). **6.5**, above its gate.

**Total: 44.5/80** (loop 2 was 45.5). The doubled density made the character and ground defects more visible, and the new townsfolk add overlaps.

## Calibration (`calibration.jpg`, scored on the anchors alone)
- **pixel 8.0:** one grid, hand-placed clusters, consistent outlines.
- **environment 7.5:** a dressed, varied cave with rails, vines, timber and ore.
- **lighting 6.5:** warm lamp sources and a dark vignette give a strong mood, but the glows are smooth gradients that don't respect the pixel grid, so it falls short of 7.

## Ranked gaps (gain ÷ effort; duplicates merged)
1. **G-faces-under-headwear** (characters, WS2, sev 5, M, +1.0). Caps, fedoras and Hattie's cap hide the face (`crops/R07-player`, `crops/R11-npcs`, `desktop/R19`). Fix: in front and three-quarter views, stop the headwear layer at the brow row (bill or brim over the rows above the eyes). Always composite an eye row plus a nose or mouth pixel above the hat layer. Hattie gets a white cap over visible skin 4. Fedoras get a pinched crown. Test: every named NPC shows ≥ 2 eye pixels in front view.
2. **G-ui-pixel-consistency** (ui, WS6, sev 4, S, +0.75). Fix: render the existing bitmap body face at integer 2× on desktop with `-webkit-font-smoothing: none` and no fractional sizes; redraw the title logo as pixel lettering on the 2-device-px grid; make the shop's Hen row use the hen sprite; move slot counts into a corner badge clear of the icon art. Evidence: `desktop/R04`, `desktop/R01`, `desktop/R18`.
3. **G-sprite-overlap** (readability, WS2, sev 4, S, +0.5). Fix: render-only townsfolk keep ≥ 1 tile of separation from the player and named NPCs, never spawn within 3 tiles of the camera centre, and are drawn behind lamp posts in y-sort. Evidence: `desktop/R19`, `desktop/R06`, `desktop/R08`.
4. **G-overlay-crowding** (readability, WS6, sev 3, S, +0.5). Fix: the phone goals panel shows heading plus one objective on one line, truncated with an ellipsis; name tags run a collision pass, offset vertically by ≥ 2 px against each other and against sign boards; hide the tag of an NPC not on screen (Ezra). Evidence: `mobile/R04`, `crops/R16-npcs`, `crops/R11-npcs`.
5. **G-fog-offgrid** (lighting, WS4, sev 3, S, +0.5). Fix: render field fog and wisps to an art-resolution buffer, quantised to 3–4 alpha bands with a 4×4 ordered dither, with wisps ≥ 1 art px (2 device px). Match the spring-pool steam, which is already on the grid. Evidence: `desktop/R08`.
6. **G-night-pool-clip** (lighting, WS4, sev 3, S, +0.5). Fix: clip lamp pools by radius, not by ground type, so the kerb edge goes. Shrink the player-centred disc to a subtle 2-band lantern or remove it. Add a cool moonlight fill so walls keep 2 value steps. Evidence: `desktop/R05`, `mobile/R05`.
7. **G-hoe-tool-mechanics** (animation, WS5, sev 4, M, +1.0). Fix: 4 authored body frames (raise, overhead, strike with a 1-px crouch, recover) with hands on the handle and the tool baked in; a 2-frame hit-stop; an on-grid soil puff; the tile turns tilled on the impact frame; remove the trailing chip. Add a 1-px body bob and visible arms in the walk. Re-shoot R14 on a cleared tile and R13 without the lamp post in front. Evidence: `strips/R14`, `strips/R13`.
8. **G-ground-checker** (pixel, WS1, sev 4, M, +0.75). Fix: the stated 2×2 minimum cluster isn't holding. Add a post-pass over the grass, cobble and water textures that merges isolated 1-art-px cells into their majority neighbour. Test: < 5% of ground pixels sit in single-pixel clusters. Evidence: `crops/R15-pen`, `crops/R07-player`, `desktop/R04`.
9. **G-face-smear-hair-noise** (pixel, WS2, sev 4, M, +0.5). Fix: hand-clean the head layer per hair style: a 3-step hue-shifted ramp, a closed 1-px dark outline, and the orphan right-cheek cluster deleted. Grey beard for Josiah. Rebuild the dialogue portraits from the cleaned heads. Evidence: `crops/R16-npcs`, `crops/R11-npcs`, `desktop/R11`.
10. **G-weather-grades** (lighting, WS4, sev 3, M, +0.5). Fix: keep the existing rain and dusk grades, and add warm key light with purple shadows at dusk, a darker wet road tone plus a 2-frame on-grid puddle ripple sprite in rain, a cool blue shadow tone in snow, and one-sun-direction drop shadows on sprites. Evidence: `desktop/R06`, `desktop/R09`, `desktop/R10`.
11. **G-farm-and-shore-composition** (environment, WS3, sev 3, M, +0.5). Fix: scatter authored ground decals on farm lawns (worn paths, stone clusters, flower clumps, fence runs), at least 1 per 4 tiles. Vary the farmyard prop layout per era. Give the dock posts, clip the path and bridge tiles at the shoreline (removes both ghost rectangles), and break the water repeat with a 2–3 variant tile set. Evidence: `desktop/R03`, `desktop/R07`, `desktop/R17`.
12. **G-townsfolk-variants** (authenticity, WS7, sev 3, M, +0.5). Fix: ≥ 4 outfit and body variants per era, men and women mixed, with seasonal outerwear. 1955 men wear small fedoras, not discs. Each variant shows a face in front view. Evidence: `desktop/R04`, `desktop/R08`, `desktop/R06`.

Dropped from the top 12 on gain ÷ effort: nine-slice material panels and authored bust portraits (UI, M–L), and full per-person costume redraws (B's G-character-construction, L; partly covered by gaps 1 and 9).

```json
{
  "loop": 3,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "crops/R04-row", "note": "architecture: closed outlines, 3-4 step ramps, coherent era palette"},
      {"shot": "crops/R15-pen", "note": "livestock clean; grass still a 1-art-px checker"},
      {"shot": "crops/R16-npcs", "note": "orphan red/brown cheek cluster on heads"},
      {"shot": "desktop/R08", "note": "field fog smooth and off-grid"}
    ]},
    "characters": {"score": 4.5, "confidence": 0.8, "evidence": [
      {"shot": "crops/R07-player", "note": "Sam faceless under cap dome, beside reference with bill above eyes"},
      {"shot": "crops/R11-npcs", "note": "Walt and Hattie faceless; Nora readable"},
      {"shot": "crops/R16-npcs", "note": "Josiah beard orange, Ezra not visible; Margaux readable"},
      {"shot": "crops/R15-pen", "note": "animals benchmark-grade"}
    ]},
    "environment": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R19", "note": "varied restored Row; sparse street dressing"},
      {"shot": "desktop/R03", "note": "crop stages read; mostly bare lawn"},
      {"shot": "desktop/R07", "note": "repeating water, post-less dock, shoreline ghost rectangles"},
      {"shot": "mobile/R04", "note": "forest backdrop above the Row exists"}
    ]},
    "lighting": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R05", "note": "banded on-grid pools, neon; kerb-clipped grass pools, player disc, no shadows"},
      {"shot": "desktop/R06", "note": "dusk darker with lit windows; no warm/cool split"},
      {"shot": "desktop/R09", "note": "rain grade present; no wet ground"},
      {"shot": "desktop/R08", "note": "fog wash, smooth plumes"}
    ]},
    "animation": {"score": 5.0, "confidence": 0.6, "evidence": [
      {"shot": "strips/R13", "note": "basic alternating stride; rigid hat, no arms, post occludes 3-6"},
      {"shot": "strips/R14", "note": "head moves frames 1-5; hoe floats with no grip; no impact or tilled result"}
    ]},
    "ui": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R04", "note": "bitmap body face drawn at 1 device px with AA fringe; digits overlap hotbar icons"},
      {"shot": "mobile/R11", "note": "same bitmap face crisp at 2x; portrait is upscaled sprite with smear"},
      {"shot": "desktop/R18", "note": "plain list shop; Hen icon is an empty oval"},
      {"shot": "desktop/R01", "note": "smooth serif logo"},
      {"shot": "desktop/R19", "note": "era colourway on panels"}
    ]},
    "readability": {"score": 6.0, "confidence": 0.7, "evidence": [
      {"shot": "mobile/R04", "note": "player and controls clear; HUD ~23% height, goals wrap"},
      {"shot": "desktop/R19", "note": "player sandwiched between two passers-by"},
      {"shot": "crops/R16-npcs", "note": "name tags butt together"},
      {"shot": "desktop/R03", "note": "crop stages distinct"}
    ]},
    "authenticity": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R09", "note": "1871 board-and-batten and false fronts"},
      {"shot": "desktop/R05", "note": "1931 five-globe lamps and neon"},
      {"shot": "desktop/R06", "note": "1955 Googie drive-in, motor hotel; disc-hat townsfolk"},
      {"shot": "desktop/R19", "note": "2026 herringbone brick, solar, market"},
      {"shot": "desktop/R04", "note": "stamped bonnet townsfolk"}
    ]}
  },
  "gaps": [
    {"id": "G-faces-under-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R07-player", "crops/R11-npcs", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Stop headwear at the brow row in front/three-quarter views; always composite an eye row plus nose or mouth pixel above the hat layer; Hattie white cap over visible skin 4; pinched fedora crown. Test: every named NPC shows >= 2 eye pixels in front view."},
    {"id": "G-ui-pixel-consistency", "category": "ui", "expectedGain": 0.75, "severity": 4, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R04", "desktop/R01", "desktop/R18"], "benchmark": "stardew-5.jpg", "fix": "Render the bitmap body face at integer 2x on desktop with font smoothing off; redraw the logo as pixel lettering on the 2-device-px grid; Hen shop row uses the hen sprite; slot counts in a corner badge clear of icon art."},
    {"id": "G-sprite-overlap", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R19", "desktop/R06", "desktop/R08"], "fix": "Townsfolk keep >= 1 tile from the player and named NPCs, never spawn within 3 tiles of the camera centre, and y-sort behind lamp posts."},
    {"id": "G-overlay-crowding", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R04", "crops/R16-npcs", "crops/R11-npcs"], "fix": "Phone goals panel on one line (heading + one objective, ellipsis); name-tag collision pass offsetting >= 2 px from other tags and sign boards; hide tags of off-screen or occluded NPCs."},
    {"id": "G-fog-offgrid", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R08"], "fix": "Render field fog and wisps at art resolution, 3-4 alpha bands with 4x4 ordered dither, wisps >= 1 art px; match the on-grid spring steam."},
    {"id": "G-night-pool-clip", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Clip lamp pools by radius not ground type; shrink the player disc to a subtle 2-band lantern or remove it; cool moonlight fill so walls keep 2 value steps."},
    {"id": "G-hoe-tool-mechanics", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Four authored body frames with hands on the handle (raise, overhead, strike with 1-px crouch, recover); 2-frame hit-stop; on-grid soil puff; tile turns tilled on impact; remove trailing chip; 1-px walk bob with visible arms; re-shoot R14 on a cleared tile and R13 without occlusion."},
    {"id": "G-ground-checker", "category": "pixel", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/R15-pen", "crops/R07-player", "desktop/R04"], "benchmark": "stardew-1.jpg", "fix": "Post-pass merging isolated 1-art-px cells into their majority neighbour on grass, cobble and water textures. Test: < 5% of ground pixels in single-pixel clusters."},
    {"id": "G-face-smear-hair-noise", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R16-npcs", "crops/R11-npcs", "desktop/R11"], "benchmark": "seastars-2.jpg", "fix": "Hand-clean head layers per hair style: 3-step hue-shifted ramp, closed 1-px dark outline, delete orphan right-cheek cluster; grey beard for Josiah; rebuild dialogue portraits from the cleaned heads."},
    {"id": "G-weather-grades", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R09", "desktop/R10"], "benchmark": "chained-5.jpg", "fix": "Keep existing grades; add warm key and purple shadows at dusk, darker wet road tone and 2-frame on-grid puddle ripples in rain, cool blue shadow tone in snow, one-sun-direction sprite drop shadows."},
    {"id": "G-farm-and-shore-composition", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Authored ground decals on farm lawns (>= 1 per 4 tiles); per-era farmyard layouts; dock posts; clip path and bridge tiles at the shoreline (removes ghost rectangles); 2-3 water tile variants to break the repeat."},
    {"id": "G-townsfolk-variants", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R08", "desktop/R06"], "fix": ">= 4 outfit and body variants per era, men and women mixed, seasonal outerwear; 1955 small fedoras instead of discs; every variant shows a face in front view."}
  ],
  "verdict": "continue",
  "calibration": {"pixel": 8.0, "environment": 7.5, "lighting": 6.5}
}
```
