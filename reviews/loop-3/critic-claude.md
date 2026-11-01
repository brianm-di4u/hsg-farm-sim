# Critic A (critic-claude): loop 3, tier T32

## Verdict
At T32 the buildings, crops and livestock now look like a real pixel-art game. The 1886 Second Empire bathhouses (`crops/R04-row`), the 2026 Spanish Revival brewery and domed spa (`crops/R19-row`), the crop stages (`crops/R03-field`) and the cows, goat and hens (`crops/R15-pen`) are clean, outlined and close to Stardew (CAL-A) quality. The people let the game down, and they are what you look at most. The doubled cell size made every character defect more visible. Faces are two grey blocks with a brown or red smear on the right cheek (`crops/R02-player`, `crops/R04-player`, `crops/R06-player`, the dialogue portrait in `desktop/R11`). The new caps with the "dome covers the hair" now cover the whole face, so Sam, Walt and Hattie have no face at all (`crops/R07-player`, `crops/R19-player`, `crops/R11-npcs`). Hattie's skin is never visible. Sprites stack on top of each other with no separation (`crops/R08-player`, `crops/R19-player`). The hoe swing is a rigid stick rotating over a body that doesn't move (`strips/R14`). Lighting is only partway there. The 1931 night has banded, era-correct five-globe pools, but dusk, rain and snow barely change the light (`desktop/R06`, `desktop/R09`, `desktop/R10`). The fog uses smooth steam blobs and 1-device-px wisps that sit off the art grid (`desktop/R08`). The UI mixes an anti-aliased thin TTF body font with a chunky pixel heading font and a smooth serif logo. Era distinctness is the strongest category. Overall this is a mid-5s to 6 game held back by characters, animation and UI. Continue.

## Scores

### pixel: 6.0
- Buildings, props, crops and animals: one grid, dark outline, coherent per-era palettes (`crops/R04-row`, `crops/R19-row`, `crops/R03-field`, `crops/R15-pen`). These assets are about CAL-A (stardew-1, 7.5) quality.
- Characters break the outline rule. Outlines are partial and absent on the lit side. Each head has a muddy two-tone hair cluster with an orphan dark-brown or red patch on the right cheek that reads as noise, not form (`crops/R02-player`, `crops/R04-player`, `crops/R16-player`). Townsfolk have no eyes at all (`crops/R19-player`, right figure). This looks like generator output downsized, not placed pixels: the anchor-3 descriptor for the people.
- Cobbled and asphalt ground is still a fine 1-art-px speckle (`desktop/R04`, `desktop/R10`, `crops/R04-player` background). It is busier than CAL-B's stones and competes with sprites.
- Off-grid elements: the steam plumes in `desktop/R08` are smooth radial gradients, and the fog wisps are 1-device-px anti-aliased curves (half an art px). A translucent grey rectangle sits over the water where the brick path and the left bridge meet the lake (`desktop/R07`, x 990–1110, y 190–225). The title logo is a smooth vector serif (`desktop/R01`).
- Compared with stardew-1 and chained-5: environment craft is close, character craft is well below both. Score 6.

### characters: 4.5
- **Faces hidden by headwear.** Sam's cap is a blue disc with a grey bar where the face should be (`crops/R07-player`, `crops/R19-player`; reference shows the bill *above* the eyes). Walt and Hattie get the same dome over the face (`crops/R11-npcs`). Hattie's skin 4 and white cap, her identifying checklist features, never read. Ray's fedora covers his eyes and has no pinched crown; it reads as a grey bowler (`crops/R05-player`, `crops/R17-player`).
- Josiah's beard should be grey (`#6a6a6a`) but renders as a red-orange cheek smear. His fur-cap tail isn't visible (`crops/R16-npcs`). Ezra's name tag floats over the tent with no visible person under it (`desktop/R16`).
- Nora's bonnet reads as a cream helmet, not a deep-brimmed sun bonnet (`crops/R04-player`, `crops/R10-player`). Ada (`crops/R02-player`) has apron and petticoat to the ankle, which is good, but the short-gown is a tan blob.
- The exaggerated slouch brim on Caleb works as a silhouette (`crops/R03-player`), and Augustin's toque reads (`crops/R11-npcs`). No one carries a signature prop.
- Townsfolk are repeated stamps: four identical bonnet women in two colours (`desktop/R04`, the same positions again in `desktop/R10`). 1955 passers-by wear flat blue discs that read as umbrellas (`desktop/R06`).
- Livestock is the bright spot: cows, goat and hens with readable anatomy, outline and contact shadow (`crops/R15-pen`), at CAL-A level.
- Against the pegs (CAL-A 6.5, CAL-B 8): readable chibi figures, but most named people pass only about 2–3 of 5 checks, and three on-screen people have no face. Below 5.

### environment: 6.0
- Town buildings show construction: mansards, dormers, brick coursing, porches, board-and-batten, false fronts (`desktop/R04`, `desktop/R09`, `desktop/R19`). Crops show growth stages (`crops/R03-field`). The wall tent and camp in `desktop/R16` are nice.
- Big empty lawns. `desktop/R02`, `desktop/R03` and `desktop/R14` are 70–80% flat grass with a few weed tufts. The town rows sit on open lawn with nothing behind them (`desktop/R04`, `desktop/R19`): no hillside, no trees, no back lots. In stardew-1, every tile carries a fence, path, flower barrel or crop.
- The farmyard layout is identical across eras. The crate, pump, wagon or truck and trough are in the same spots in `desktop/R13` (1871) and `desktop/R17` (1931).
- The farm plot is a hard-edged dark brown rectangle on the grass, and its raised diamond soil mounds clash with the top-down view (`crops/R03-field`). The lake is a wide, featureless caustic tile with a flat two-strip dock and no posts (`desktop/R07`), plus the translucent ghost rectangle at the shore.
- Street furniture (benches, barrels, hydrant, planter) is present but sparse, one item per lamp post (`desktop/R06`, `desktop/R19`).
- Between 5 and 7: rich buildings, thin dressing and composition. 6.

### lighting: 5.0
- Good: the 1931 night has banded, on-grid warm pools under five-globe posts, lit signs and a pink neon "CLUB" (`desktop/R05`). The lamp-pool zoom confirms discrete bands.
- Bad: at night the facades go to murky near-black and window glows are soft blobs (`desktop/R05`, `mobile/R05`). The pools on grass are flat bright-green ellipses cut by a hard horizontal edge at the road kerb (`mobile/R05`, y≈1110–1180). Nothing casts a shadow from the lamps, and sprites take no light.
- Dusk at 19:10 is a slight desaturation with no warm or cool split and no lit windows to speak of (`desktop/R06`). Rain has no darkening, wet ground or puddles (`desktop/R09`). Snow has no cold grade, unlit lamps and the same light as `desktop/R04` (`desktop/R10`).
- Fog is a uniform pale wash over half the frame, with smooth gradient plumes and thin anti-aliased wisps off the art grid (`desktop/R08`). The anchors say lighting that ignores the grid caps at 5.
- CAL-B (7) has consistent cast shadows; this has almost none. 5.

### animation: 4.5
- Walk (`strips/R13`, `strips/R13-mobile`): the legs show at least four distinct stride poses across 8 frames, roughly the SNES baseline. The giant hat stays rigid with no bob, arms are hidden, and there is no secondary motion. A lamp post hides the legs in frames 3–6, so the capture shows the cycle poorly.
- Hoe (`strips/R14`): the body is identical in all 8 frames. The hoe is one rigid sprite rotating through an arc across the face (frames 1–5). There is no wind-up pose, impact frame, settle or hit-stop. A loose grey chip floats beside the blade in frames 1–5, and no tilled tile appears afterwards; frames 6–8 are idle on grass. The frame is not on a field (`desktop/R14`).
- Ambient life can't be seen in stills, beyond the steam plumes in `desktop/R08`.
- Anchor 5 is "4-frame walk, 2–3 frame tool swing with no anticipation". The tool here has no body motion at all. 4.5.

### ui: 5.0
- **Three type systems.** The body HUD and dialogue font is a thin anti-aliased TTF with 1-device-px strokes and grey fringe, off the 2× art grid (zoom of `desktop/R04` HUD; `mobile/R11` "Augustin Duval" shows smooth curves). Headings are a chunky pixel font ("CHAPTER 3 GOALS", "PACK"). The logo is a smooth serif (`desktop/R01`, `mobile/R01`). That is anchor 3–5 territory.
- A plus: each era has its own panel colourway (green 1807, cream and brown 1886, navy and gold 1931, deep blue 2026) (`desktop/R02`, `desktop/R05`, `desktop/R19`).
- The frames are thin CSS borders, not nine-slice material. The shop is a plain web list with tiny code-drawn seed icons, and the Hen icon is an empty outlined oval, not the animal sprite (`desktop/R18`). The dialogue portrait is the world sprite upscaled, smear and all (`desktop/R11`). Slot digits overlap the icon art in the hotbar and pack (`desktop/R12`, `mobile/R12`).
- Compared with stardew-5 (7.5): no wooden frame, no real portrait, no consistent bitmap font. 5.

### readability: 6.0
- Desktop: the player is easy to find, the crop stages are distinct (`crops/R03-field`), and signs and name tags read well (`desktop/R04`, `desktop/R11`).
- Phone: the HUD stack takes about the top 23% of the screen, and the goals line still wraps to 2 lines (`mobile/R02`, `mobile/R04`, `mobile/R05`). The dialogue box covers the hotbar (`mobile/R11`). The body text is about 12–13 CSS px, so it passes the size bar, but it is thin and anti-aliased.
- Overlaps hurt: a passer-by merges with the player (`crops/R08-player`, `crops/R19-player`), and quest markers collide with name tags ("WALT", "MARGAUX" in `crops/R11-npcs`, `crops/R16-npcs`).
- Night (`mobile/R05`) stays playable on the street, but the buildings are murky. Fog washes out the springs zone (`desktop/R08`). Faces hidden under caps make NPC identity rely on name tags.
- Readable with some effort. 6.

### authenticity: 6.5
- The eras are clearly distinct and mostly correct. 1807 log cabin and wall tents (`desktop/R02`, `desktop/R16`). 1871 board-and-batten and false-front store, stage and drugs (`desktop/R09`). 1886 Second Empire mansards (`desktop/R04`). 1931 Craftsman bungalow, Model A pickup (`desktop/R17`), five-globe lamp clusters and neon (`desktop/R05`). 1955 Googie drive-in, motor hotel and hydrant (`desktop/R06`). 2026 restored Row with herringbone brick, a cultural centre, solar panels and a farmers market (`desktop/R19`). A blind viewer could sort these.
- Weaknesses: Bathhouse Row is drawn as freestanding mansions on lawn, two rows facing each other, with no Hot Springs Mountain behind (`desktop/R04`, `desktop/R19`). All four 1886 bathhouses share one green mansard palette. Townsfolk clothing is generic per era (identical bonnet women in 1886 summer and winter, blue disc hats in 1955; `desktop/R10`, `desktop/R06`). Named-character garments mostly miss the checklist (see characters).
- Above the 6 gate on architecture alone. 6.5.

## Ranked gaps

1. **G-faces-under-headwear** (characters, WS2, sev 5, M, +1.0). Caps, fedoras and Hattie's cap cover the face (`crops/R07-player`, `crops/R19-player`, `crops/R11-npcs`, `crops/R17-player`). Fix: cap the headwear layer at the brow line in front and side views, so the bill or brim sits over rows above the eyes. Always draw an eye row, and a mouth or nose pixel, on top of the hat in front view. Use a white-cap variant for Hattie and keep skin 4 visible.
2. **G-face-smear-hair-noise** (pixel, WS2, sev 4, M, +0.5 pixel, +0.5 characters). Every head has a dark-brown or red orphan cluster on the right cheek, and the hair is a two-tone mush (`crops/R02-player`, `crops/R04-player`, `crops/R16-npcs`, the `desktop/R11` portrait). Fix: hand-clean the head layer per hair style with a 3-step ramp and a closed 1-px dark outline on all sides. Delete the side-lock patch, or make it a deliberate lock shape.
3. **G-hoe-rigid-tool** (animation, WS5, sev 4, M, +1.0). `strips/R14`: the body doesn't move and a rigid sprite rotates. Fix: 4 authored body frames (raise, overhead, strike with a 1-px crouch, recover) with the tool baked into each frame. Add a 2-frame hit-stop on impact, a soil-puff particle on the grid, and the tile switching to tilled on the impact frame. Remove the stray floating chip.
4. **G-mixed-type** (ui, WS6, sev 4, S, +1.0). Thin anti-aliased TTF body text next to pixel headings and a vector serif logo (`desktop/R04` HUD, `mobile/R11`, `desktop/R01`). Fix: one bitmap font for body text at an integer multiple of the art px (for example 5×7 or 6×9 rendered at 2×), with font smoothing off. Redraw the logo as pixel lettering on the art grid.
5. **G-sprite-overlap** (readability, WS2, sev 4, S, +0.5). Passers-by walk through the player and NPCs (`crops/R08-player`, `crops/R19-player`, `desktop/R06`). Fix: give render-only townsfolk soft separation, so they steer around the player and named NPCs within 1 tile, and spawn them only away from the player's tile and the camera centre.
6. **G-weather-light-flat** (lighting, WS4, sev 4, M, +1.0). Dusk, rain and snow don't change the light (`desktop/R06`, `desktop/R09`, `desktop/R10`). Fix: per-weather grade palettes, quantised to the era palette. Dusk: warm key and purple shadows with windows lit. Rain: −15% value, cooler, and a 2-frame on-grid puddle ripple sprite on roads. Snow: cool blue shadow tone, lit lamps, and footprints. Add sprite drop shadows offset to one sun direction.
7. **G-fog-offgrid** (lighting, WS4, sev 3, S, +0.5). Smooth steam blobs and 1-device-px wisps (`desktop/R08`). Fix: render fog and steam to an art-res buffer, quantise it to 3–4 alpha bands with an ordered dither, and draw wisps at 1 art px (2 device px).
8. **G-empty-lawns** (environment, WS3, sev 3, M, +0.5). 70–80% bare grass in farm frames and behind the town rows (`desktop/R03`, `desktop/R14`, `desktop/R04`, `desktop/R19`). Fix: paint a hillside and forest backdrop behind Bathhouse Row (Hot Springs Mountain). Scatter authored ground-detail decals (flower clumps, stones, worn paths, fence segments), and vary the farmyard layout per era.
9. **G-night-facades-murky** (lighting, WS4, sev 3, S, +0.5). Facades are nearly black and grass pools are hard-edged (`desktop/R05`, `mobile/R05`). Fix: add a cool moonlight fill so wall materials keep 2 value steps. Lit windows should throw banded rectangles of light onto the street. Clip the lamp pools by the light radius, not the ground-type boundary.
10. **G-townsfolk-stamps** (authenticity, WS7, sev 3, M, +0.5). Identical bonnet women, and 1955 umbrella-disc hats (`desktop/R04`, `desktop/R10`, `desktop/R06`). Fix: at least 4 body and outfit variants per era, with seasonal outerwear (shawls and coats in winter). Draw the 1955 men's hats as small fedoras, not discs.
11. **G-shop-icons-panels** (ui, WS6, sev 3, M, +0.5). Plain CSS shop list, tiny seed icons and a blank hen icon (`desktop/R18`). Fix: draw nine-slice era panels from world materials. Use 16×16-art-px item icons from the world sprites, including the hen sprite. Use a real bust portrait per named NPC in dialogue.
12. **G-ghost-rectangle** (pixel, WS1, sev 2, S, +0.25). A translucent grey box where the path and bridge meet the water (`desktop/R07`). Fix: clip the path and bridge tiles at the shoreline, or draw a proper landing or pier end.

```json
{
  "loop": 3,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R04-row", "note": "buildings clean, outlined, coherent palette (~CAL-A)"},
        {"shot": "crops/R02-player", "note": "character: partial outline, orphan brown cheek cluster, mushy hair"},
        {"shot": "crops/R04-player", "note": "same head noise; 1-art-px speckle cobbles"},
        {"shot": "desktop/R08", "note": "smooth gradient steam and 1-device-px fog wisps off the art grid"},
        {"shot": "desktop/R07", "note": "translucent grey rectangle over the water at the shoreline"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R07-player", "note": "Sam's cap covers the whole face; reference shows the bill above the eyes"},
        {"shot": "crops/R19-player", "note": "same; townsperson has no eyes; overlapping sprites"},
        {"shot": "crops/R11-npcs", "note": "Walt and Hattie faces hidden; Hattie skin 4 never visible"},
        {"shot": "crops/R16-npcs", "note": "Josiah beard red smear not gray; fur-cap tail absent; Ezra not visible"},
        {"shot": "crops/R03-player", "note": "slouch brim silhouette works; no props"},
        {"shot": "crops/R15-pen", "note": "livestock at CAL-A level"}
      ]
    },
    "environment": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R04", "note": "Second Empire construction detail; rows on bare lawn"},
        {"shot": "desktop/R19", "note": "restored Row varied; nothing behind it"},
        {"shot": "desktop/R14", "note": "80% empty grass with weed tufts"},
        {"shot": "crops/R03-field", "note": "good crop stages; hard-edged plot, diamond mounds"},
        {"shot": "desktop/R17", "note": "farmyard layout identical to desktop/R13"}
      ]
    },
    "lighting": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R05", "note": "banded on-grid pools, five-globe lamps, neon; murky facades, no cast shadows"},
        {"shot": "mobile/R05", "note": "hard horizontal pool edge at the kerb"},
        {"shot": "desktop/R06", "note": "dusk barely distinguishable from day"},
        {"shot": "desktop/R09", "note": "rain with no darkening or wet ground"},
        {"shot": "desktop/R10", "note": "snow with no cold grade"},
        {"shot": "desktop/R08", "note": "fog smooth gradients off the grid"}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "about 4 stride poses; rigid hat, no bob, arms hidden; post occludes frames 3-6"},
        {"shot": "strips/R13-mobile", "note": "same cycle"},
        {"shot": "strips/R14", "note": "body static all 8 frames; rigid rotating hoe; floating chip; no tilled result"}
      ]
    },
    "ui": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "HUD body text anti-aliased thin TTF beside a pixel heading font"},
        {"shot": "mobile/R11", "note": "dialogue name in smooth vector type; upscaled sprite portrait"},
        {"shot": "desktop/R01", "note": "smooth serif logo over pixel art"},
        {"shot": "desktop/R18", "note": "plain CSS shop list; hen icon is an empty oval"},
        {"shot": "desktop/R19", "note": "per-era panel colourway (plus)"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "player findable; HUD takes about 23% of the screen; goals wrap"},
        {"shot": "mobile/R11", "note": "dialogue covers the hotbar"},
        {"shot": "crops/R08-player", "note": "passer-by merged into the player sprite"},
        {"shot": "crops/R03-field", "note": "crop stages distinct"},
        {"shot": "crops/R16-npcs", "note": "name tags and quest marker collide"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 board-and-batten and false fronts"},
        {"shot": "desktop/R05", "note": "1931 five-globe lamps and neon"},
        {"shot": "desktop/R17", "note": "Craftsman bungalow and Model A"},
        {"shot": "desktop/R06", "note": "Googie drive-in and motor hotel; generic disc-hat townsfolk"},
        {"shot": "desktop/R04", "note": "Row as scattered mansions on lawn, no mountain, one palette"}
      ]
    }
  },
  "gaps": [
    {"id": "G-faces-under-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R07-player", "crops/R19-player", "crops/R11-npcs", "crops/R17-player"], "benchmark": "chained-5.jpg", "fix": "Cap headwear at the brow line in front and side views; always draw an eye row (and a nose or mouth pixel) over the hat layer; white cap variant for Hattie with skin 4 visible; pinched crown on fedoras."},
    {"id": "G-face-smear-hair-noise", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R16-npcs", "desktop/R11"], "benchmark": "seastars-2.jpg", "fix": "Hand-clean head layers per hair style: 3-step hue-shifted ramp, closed 1-px dark outline all round, delete the orphan right-cheek cluster; gray beard for Josiah."},
    {"id": "G-hoe-rigid-tool", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "fix": "Four authored body frames (raise, overhead, strike with a crouch, recover) with the tool baked in; 2-frame hit-stop; on-grid soil puff; tile turns tilled on impact; remove the floating chip; capture on a real field."},
    {"id": "G-mixed-type", "category": "ui", "expectedGain": 1.0, "severity": 4, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R04", "mobile/R11", "desktop/R01"], "benchmark": "stardew-5.jpg", "fix": "Replace the thin anti-aliased body TTF with one bitmap font at an integer multiple of the art pixel, smoothing off; redraw the logo as pixel lettering on the art grid."},
    {"id": "G-sprite-overlap", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/R08-player", "crops/R19-player", "desktop/R06"], "fix": "Soft separation for render-only townsfolk (steer around the player and NPCs within 1 tile), never spawn on or near the player tile; fix lamp-post versus walker draw order."},
    {"id": "G-weather-light-flat", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R09", "desktop/R10"], "benchmark": "chained-5.jpg", "fix": "Per-weather and per-hour palette grades quantised to the era palette (warm or purple dusk with lit windows, darker cooler rain with on-grid puddle ripples, cool snow shadows with lit lamps and footprints); one-sun-direction drop shadows on all sprites."},
    {"id": "G-fog-offgrid", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R08"], "fix": "Render fog and steam at art resolution, quantise to 3-4 alpha bands with ordered dither, wisps at 1 art px (2 device px), no smooth radial gradients."},
    {"id": "G-empty-lawns", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R14", "desktop/R04", "desktop/R19", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Paint the Hot Springs Mountain hillside and forest behind the Row; scatter authored ground decals (flower clumps, stones, worn paths, fences); vary the farmyard prop layout per era; soften the plot edge into the grass."},
    {"id": "G-night-facades-murky", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Cool moonlight fill keeping 2 value steps on walls; windows cast banded light rectangles on the street; lamp pools clipped by radius, not by the ground-type boundary."},
    {"id": "G-townsfolk-stamps", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R10", "desktop/R06"], "fix": "At least 4 body and outfit variants per era with seasonal outerwear; small fedoras and period dresses for 1955 instead of disc hats; men and women mixed in 1886."},
    {"id": "G-shop-icons-panels", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R11", "desktop/R12"], "benchmark": "seastars-4.jpg", "fix": "Nine-slice era panels drawn from world materials; item icons at 16x16 art px from world sprites (hen sprite for livestock); slot digits in a corner badge clear of the icon; authored bust portraits for dialogue."},
    {"id": "G-ghost-rectangle", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R07"], "fix": "Clip path and bridge tiles at the shoreline or draw a landing or pier end; no alpha-blended tiles over water."}
  ],
  "verdict": "continue"
}
```
