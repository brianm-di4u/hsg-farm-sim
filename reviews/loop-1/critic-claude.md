# Critic A (critic-claude): loop 1, tier T16

## Verdict

The grid is honest. Every sprite and the camera sit on one 4× art grid, the sprites share a 1-px outline rule, the lamp pools are banded, and the six eras have distinct building sets. Even so, this still reads as **pixelized paintings, not pixel art**. Every building, tree, terrain chunk and animal is speckled with per-pixel noise. Sampled at the 320×200 art grid, a frame holds thousands of distinct colours (R04 ≈ 2.3k, R15 ≈ 6.1k, HUD included). Materials melt into tan-grey mush (`crops/R04-row`, the R04 hotel roof, the R13 trees). Characters are readable as figures but have no faces: eyes are grey 2×2 smudges, and the hats and bonnets are interchangeable domes. Augustin renders as a tilted white smear (`desktop/R11`). The hoe swing is a smudge beside the head (`strips/R14`). The HUD's pixel fonts collapse glyphs at the size they are drawn: "Close" reads "Olose", "Chapter select" reads "Ohapter select", "×5" reads "×S", "(0/15)" reads "(0/1S)", and the Jacquard 12 headers in 1807 and 1871 are unreadable. Lighting has the right idea (banded pools, five-globe 1931 lamps), but the pools paint over the hotel roof, and dusk, evening, rain and snow barely change the scene. Set against CAL-A Stardew (`benchmarks/stardew-1.jpg`) and CAL-B Chained Echoes (`benchmarks/chained-5.jpg`), it sits around the "5" anchor or below in every category except authenticity. No category reaches its gate.

## Scores

### 1. pixel: 4.5
- `crops/R04-row`: the facades of the Free Baths and Baths buildings are speckled tan-grey noise with no deliberate clusters. The siding, trim and porch posts blur together. This is the rubric's "3" text ("downscaled painting: speckle"), held up only because the grid is clean.
- `desktop/R04` (hotel roof, zoomed): the mansard slate is a random grey and tan speckle. The dormers are legible only because of their cream trim. Compare CAL-B (`chained-5.jpg`), where the awning stripes and cobbles are clean two- or three-tone clusters.
- `desktop/R13` (left trees): the foliage is per-pixel yellow, olive and brown noise with no leaf-cluster shapes. `stardew-1.jpg` uses grouped leaf clumps with a 3–4 step ramp.
- `desktop/R02`, `desktop/R03`: the grass is high-frequency noise in which every art pixel differs. It fights the sprites and reads as dithered photo texture, not as tile art.
- `crops/R03-field`: the crops are the best asset family. Their shapes are readable and the cabbage ramp is decent, but the corn and wheat columns are still noisy.
- In its favour: one grid, binary alpha, and a consistent 1-px darkened outline on sprites (`crops/R15-pen`, `crops/R03-player`).
- Benchmark: below CAL-A (7.5). It sits between the 3 and 5 anchors: one grid, but the palette is not shared across assets and the ramps are not hue-shifted (the R04 roofs and stone are greys pushed toward tan).

### 2. characters: 4.5
- `crops/R02-player` (Ada): the hair and skin are nearly the same mid-tan value, so the head reads as a single blob. The eyes are two grey 2×2 blocks that look like goggles. The white apron dominates the silhouette and the brown short-gown (`#7a5a3a`) barely shows. Checklist: petticoat yes, apron yes, short-gown weak, no prop. Borderline pass.
- `crops/R03-player`, `crops/R09-player` (Caleb): the "slouch hat" is a domed beige cap that does not break past the head outline. The checklist asks for a wide brim that does. The vest and red shirt are present, there is no prop, and the face is grey smudges. 3/5: fail.
- `crops/R04-player`, `crops/R10-player` (Nora): the sun bonnet is a huge cream dome taller than the face. The blue dress shows only at the sleeves and the apron covers the body. About 4/5, but the bonnet has the same silhouette as Ada's hair dome and Caleb's hat.
- `desktop/R11` (with zoom) and `mobile/R11`: **Augustin is broken.** His sprite is a pale smear leaning about 30°, with no readable toque, face or apron. His dialogue portrait is just that sprite cropped and enlarged. Hattie is a white blob with brown hair, and her white cap is not distinguishable. Walt's blue cap sits across his eyes like a blindfold (`crops/R11-npcs`).
- `desktop/R16`, `crops/R16-npcs`: Margaux (red scarf, blue shirt, long skirt) is the clearest sprite and passes. Josiah's fur cap reads as a greenish helmet, with a grey beard. Ezra has a name tag but is not visible anywhere in the frame.
- `crops/R15-pen`: the cows are mushy blobs whose heads and legs smear together. The hens are red heart shapes with no beak, comb or tail and read as pickup hearts. The ox in `desktop/R13` and `desktop/R15` is in an unreadable rearing pose with a detached shadow.
- Capture note: none of the character close-ups show the reference sheet beside them, though the brief says they should. `crops/R11-npcs` and `crops/R16-npcs` are framed on the name tags and cut off the NPC bodies.
- Benchmark: CAL-A (6.5) has tiny sprites but readable eyes, distinct hair and hat silhouettes, and clean animals (`stardew-1.jpg` chickens and cows). This cast falls short of that. Several named people fail the 4/5 checklist, and one sprite is visibly broken.

### 3. environment: 5.0
- `desktop/R04`, `desktop/R09`, `desktop/R05`, `desktop/R06`: the town shots are the strongest. The building types are varied, with gables, mansards, verandas, a striped awning, lamp posts and shrubs. Prop density on the street is still low: no wagons, barrels or crates, no pedestrians in R04.
- `desktop/R03`, `desktop/R14`, `desktop/R17`: the farm is mostly empty noisy grass, with stray seed-sack-like bushes and one crop plot. `stardew-1.jpg` fills the same screen area with fences, paths, crops, flowers and buildings.
- `desktop/R07`: about 70% of the frame is flat brown-grey water with sparse "+" glints. The water has no ramp, reflections or shoreline foam and reads as mud. A ghosted rectangle sits on the shore at top left.
- `desktop/R10`: snow covers only the grass areas. The roofs, shrubs and road are bare, so it reads as a texture swap, not winter.
- `desktop/R17` (zoomed): the Model-A-style truck is an unreadable brown-olive lump with what looks like the ox's head fused to its front, and its shadow is detached below it. The 1931 bungalow is a good asset.
- `crops/R03-field`: crop growth stages read clearly, in line with the 7 anchor's "crops show growth stages".
- The same street grid, building footprints, sign-plate positions and shrub pairs repeat in R04, R05, R06 and R09, and the same farm layout (fence, trough, crate) repeats in R13 and R17.
- Benchmark: well below CAL-A (8). Competent buildings and sparse dressing put it at the 5 anchor.

### 4. lighting: 4.5
- `desktop/R05`, `mobile/R05`: on the plus side, the lamp pools are 4-band rings on the grid, the windows glow, and the CLUB neon is a nice touch. On the minus side, **the lamp pools draw on top of the hotel roof and the club roof** (orange ellipses across the twin-tower roof). The rest of the scene is a flat blue-grey multiply, and the sprites take no light. `seastars-2.jpg` mixes warm and cool light sources and casts sprite shadows. This scene has one warm colour over one cool tint.
- `desktop/R06` ("dusk", 19:10): barely distinguishable from day. There is a slight dim, no warm sky ramp or long shadows, and the cobra-head street lamps are unlit.
- `desktop/R07` ("evening"): no evening colour at all, just murky grey-brown.
- `desktop/R08` (fog): a uniform beige veil, with the hotel's occlusion fade on top, so the frame looks washed out rather than foggy. There are no fog bands and no light shafts.
- `desktop/R09` (rain): the 1-px streaks are sparse, the ground and grass stay bright and dry, and there are no splashes or darkening.
- `desktop/R13`, `desktop/R15`: the blob shadows are hard-edged but offset or detached from the animals and the truck (R17).
- Benchmark: CAL-A by day is 5.5. This is on-grid but generic, and the depth bug and flat dusk and evening put it below 5.

### 5. animation: 5.0
- `strips/R13`, `strips/R13-mobile`: the side-view walk has a visible stride. The legs separate in frames 7–8, and there are six distinct poses across the strip. But the domed hat takes up about half of the sprite, so the arm swing and head bob are nearly invisible. A fence post overlaps the character in frames 1–4.
- `strips/R14`: the "5-frame tool swing" does not read. The hoe is a 3–4 px orange-brown smudge beside Ada's head in frames 1–4, and frames 5–8 are idle. It never arcs down in front of the body. There is no soil clod, dust or hit-stop, and the capture is on grass next to the path rather than on a field (`desktop/R14`).
- `desktop/R13`, `desktop/R15`: no ambient life is visible in the strips: no birds, chimney smoke or water motion. The creek in R15 has static glints.
- Benchmark: the walk meets the 6-frame bar of the 7 anchor, but the tool action is below the 5 anchor's "2–3 frame swing".

### 6. ui: 4.5
- `desktop/R18` (zoomed), `desktop/R12`, `mobile/R12`: **the glyphs collapse.** "Close" renders as "Olose", "Crafting" as "Orafting", "Collard" as "Oollard", and "Buy" as "8uy". The "×5" buttons read "×S", and "$800" reads "$S00" in the pack header. The pixel font is being drawn at a size that is not its native multiple.
- `desktop/R02` (zoomed), `desktop/R03`, `mobile/R13`: the Jacquard 12 "CHAPTER 1/2 GOALS" header is unreadable, and on the phone it looks like Cyrillic noise. "07:30" reads "07:S0" and "(0/30)" reads "(0/S0)".
- `desktop/R01`, `mobile/R01`: the "Valley of Vapors" logo is a smooth anti-aliased serif over the pixel background, and the menu buttons are plain bordered rectangles.
- `desktop/R11`: the dialogue portrait is the cropped broken sprite, not a portrait. Compare `stardew-5.jpg` (7.5): framed portrait, bitmap font, wood material.
- In its favour: the frames are square-cornered and change per era, from green hide (R02) to cream and gilt (R04), navy and brass (R05, R12) and teal (R18). The icons are crisp and consistent (hotbar in every frame). The in-world 5×7 font is clean (`crops/R16-npcs`).
- The HUD font pixels are 1–2 screen px against the world's 4 px art pixel, a scale mismatch with the world.
- Benchmark: the 5 anchor ("pixel font, but scaled to non-integer sizes") describes this exactly. The glyph errors push it below.

### 7. readability: 5.5
- `mobile/R02`, `mobile/R04`: the player is findable through the outline and the white apron, but small (about 15 CSS px). The bushes look like seed sacks and could be mistaken for pickups.
- `desktop/R03`, `crops/R03-field`: the crop stages read well, though ripe and unripe crops aren't marked beyond shape.
- `mobile/R05`: the night stays playable, but the lamp pools over the roofs confuse the depth.
- `desktop/R08`: the hotel's see-through fade covers a large area and half-hides the player, and the fog lowers contrast everywhere.
- `mobile/R13`, `desktop/R18`: the quest numbers misread (5 shows as S, 3 is ambiguous). The phone text is about 10 CSS px and legible apart from the glyph collapse.
- `desktop/R11`: the name tags crowd and overlap one another ("Augustin" runs into Walt's sprite).
- Benchmark: below CAL-B (7.5). It is at the 5 anchor: findable, but needs squinting for faces, NPC identity and numbers.

### 8. authenticity: 6.0
- `desktop/R16`, `desktop/R02`: 1807 has a log cabin, canvas trade tents and a creek. These fit the frontier era.
- `desktop/R09`: 1871 has wooden frame buildings with shingle roofs and a mud street, which fits. It has no false fronts or board-and-batten, though the anchor table expects both.
- `desktop/R04`, `desktop/R10`: 1886 has Victorian and Second Empire bathhouses, a brick hotel, a striped store awning, and oil lantern posts (correctly not gas, which came in 1897).
- `desktop/R05`: 1931 has Spanish-revival and Deco bathhouses, a twin-towered hotel in the 1924 Arlington silhouette, five-globe lamp clusters (correct after 1929), neon on the club, and a radio tower (`mobile/R05`).
- `desktop/R06`: 1955 has cobra-head lamps, a lane-striped road, a drive-in with a boomerang roof, and a motor hotel. These are strong era signatures.
- `desktop/R17`: a 1931 bungalow, but the period truck is unreadable.
- Against: every bathhouse in every era is labelled with the same generic "BATHS" plate, with no names such as Fordyce, Buckstaff or Quapaw in 1931. The street plan is identical across eras. 2026 appears only as a lake (`desktop/R07`), with no restored Row, so that era is not grounded. The women's dresses before 1955 are correct in silhouette.
- Benchmark: the calibration images are 7–7.5 for coherence. A blind viewer could sort the town shots, but the detail is thin in places. This sits just at the gate.

## Ranked gaps

1. **G-painted-speckle** (pixel, WS1). The pack-time conversion keeps the painting's per-pixel noise. Fix: build one master palette per era (about 32–48 colours) and snap every asset and terrain chunk to it. After the median filter, merge clusters smaller than 3 px into a neighbour. Cap each material at a 3–4 step hue-shifted ramp. Replace the baked noisy grass and road with hand-made 16 px tiles in 3–4 shades plus sparse detail tiles. Expected gain +1.5 pixel, +0.5 environment and +0.5 readability. Severity 5, effort L.
2. **G-font-glyph-collapse** (ui, WS6). Pixelify Sans and the display faces are drawn off their native pixel multiple, so C, B, 3 and 5 collapse. Fix: set every UI font size to an integer multiple of the face's design pixel, ideally sized so one font pixel equals one 4× art pixel (or 2× for body text), with smoothing off. Use Jacquard 12 only at 24 px or larger, or replace it with a legible face for the small quest header. Check "Close / Buy / ×5 / 0/15 / 07:30" in every era. Redraw the title logo as pixel art. Expected gain +1.5 ui, +0.5 readability. Severity 5, effort S.
3. **G-faces-and-hats** (characters, WS2). Fix: hand-place 1-px dark eyes on skin and a hair value at least 2 steps from the skin value. Give each hat kind its own silhouette: a slouch brim 2 px wider than the head each side, a pinched fedora, a toque, a sun bonnet unlike Ada's hair, and Walt's short-bill cap above the eyes. Fix Augustin's tilted or broken frame and give him a proper portrait. Make Hattie's white cap distinct from her dress. Expected gain +1.5 characters. Severity 5, effort M.
4. **G-light-depth-and-mood** (lighting, WS4). Fix: draw the lamp pools on the ground layer, below building sprites, and mask them by footprint so they never cover roofs. Give dusk and evening a warm sky ramp, longer shadows and lamps switched on by 19:00. For rain, darken the ground by one ramp step and add whole-pixel splashes and puddles. Put snow caps on roofs and shrubs. Draw fog as 2–3 banded drifting layers rather than a flat veil. Expected gain +1.5 lighting. Severity 4, effort M.
5. **G-tool-swing-read** (animation, WS5). Fix: draw the hoe 10–12 px long with a clear overhead-to-ground arc in front of the body. Hold the impact frame for 1–2 frames (hit-stop), and spawn a 2–3 px soil clod and dust puff on strike. Capture R14 on tilled soil. Add idle ambient motion (chimney smoke, creek flow, birds). Expected gain +1.0 animation. Severity 4, effort M.
6. **G-empty-farm-and-lake** (environment, WS3). Fix: dress the farm screens with fences, paths, stumps, flower clusters, a well and a woodpile. Give the lake a 3–4 band water ramp with highlight lines, shoreline foam, reeds, a boat and dock posts. Build a 2026 restored-Row capture. Expected gain +1.0 environment. Severity 4, effort M.
7. **G-animals-vehicles** (characters, WS2). Fix: hand-draw the cows, hens, ox and the 1931 truck at their sprite size rather than pixelizing paintings. Hens need a beak, comb and tail. The ox needs a standing pose with its shadow attached. The truck must not overlap the ox sprite. Expected gain +0.5 characters, +0.5 environment. Severity 3, effort M.
8. **G-occlusion-fade-scope** (readability, WS1). In R08 the whole hotel ghosts. Fix: fade only a circle of about 24 px around the player, and only when the player is behind the roof's footprint. Expected gain +0.5 readability. Severity 3, effort S.
9. **G-era-signage-and-layout** (authenticity, WS7). Fix: replace the generic "BATHS" plates with period names painted into the facades, taken from the refs per era (Fordyce, Buckstaff, Quapaw in 1931). Add era traffic and dressing: wagons in 1871, carriages in 1886, autos in 1931 and 1955. Vary the street dressing between eras. Expected gain +0.5 authenticity. Severity 3, effort M.
10. **G-crop-framing** (characters, WS2, tooling). The R11-npcs and R16-npcs crops miss the NPC bodies, and no close-up has the reference sheet beside it. Fix the crop boxes and paste the reference so the checklist can be judged. Expected gain 0 (evidence quality only). Severity 2, effort S.

```json
{
  "loop": 1,
  "role": "critic-claude",
  "tier": "T16",
  "verdict": "continue",
  "scores": {
    "pixel": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R04-row", "note": "facades are speckled tan-grey noise, no deliberate clusters"},
        {"shot": "desktop/R04", "note": "hotel mansard roof is random grey/tan speckle"},
        {"shot": "desktop/R13", "note": "tree foliage is per-pixel noise, no leaf clusters"},
        {"shot": "desktop/R02", "note": "grass terrain is high-frequency noise in every art pixel"},
        {"shot": "crops/R03-field", "note": "crops are the cleanest family; consistent 1-px outline on sprites"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R02-player", "note": "Ada: hair and skin same value, eyes are grey 2x2 smudges"},
        {"shot": "crops/R03-player", "note": "Caleb: slouch hat is a dome, brim does not break the head outline; checklist 3/5"},
        {"shot": "crops/R04-player", "note": "Nora: bonnet dome identical in silhouette to other headwear"},
        {"shot": "desktop/R11", "note": "Augustin renders as a tilted white smear; portrait is the cropped sprite"},
        {"shot": "crops/R11-npcs", "note": "Walt's cap colour covers the eyes; crop misses Augustin and Hattie"},
        {"shot": "crops/R15-pen", "note": "cows mushy, hens read as red hearts"},
        {"shot": "desktop/R16", "note": "Margaux passes; Ezra tagged but not visible"}
      ]
    },
    "environment": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "varied Victorian buildings, but sparse street props"},
        {"shot": "desktop/R03", "note": "farm is mostly empty noisy grass"},
        {"shot": "desktop/R07", "note": "70% flat mud-coloured water, no shoreline detail"},
        {"shot": "desktop/R10", "note": "snow only on the grass; roofs and shrubs bare"},
        {"shot": "desktop/R17", "note": "1931 truck is an unreadable lump fused with an ox head"},
        {"shot": "crops/R03-field", "note": "crop growth stages readable"}
      ]
    },
    "lighting": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R05", "note": "banded lamp pools are on-grid, but they draw over the hotel and club roofs"},
        {"shot": "mobile/R05", "note": "same depth bug on the phone; flat blue-grey multiply, sprites unlit"},
        {"shot": "desktop/R06", "note": "dusk barely differs from day; street lamps off at 19:10"},
        {"shot": "desktop/R07", "note": "evening has no evening colour"},
        {"shot": "desktop/R08", "note": "fog is a uniform beige wash"},
        {"shot": "desktop/R09", "note": "rain: sparse streaks, ground stays bright and dry"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "6-pose side walk with stride; hat hides arm swing and bob"},
        {"shot": "strips/R13-mobile", "note": "same cycle on the phone; fence post overlaps frames 1-4"},
        {"shot": "strips/R14", "note": "hoe is a 3-4 px smudge by the head, no arc, no impact or soil feedback"},
        {"shot": "desktop/R14", "note": "swing captured on grass, not on a field"}
      ]
    },
    "ui": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R18", "note": "glyph collapse: Olose, Oollard, 8uy, xS"},
        {"shot": "desktop/R12", "note": "$S00 in the pack header; per-era navy/brass frame is clean"},
        {"shot": "desktop/R02", "note": "Jacquard 12 chapter header unreadable; 07:30 reads 07:S0"},
        {"shot": "mobile/R13", "note": "1871 header looks like Cyrillic noise on the phone"},
        {"shot": "desktop/R01", "note": "smooth anti-aliased serif logo over pixel art"},
        {"shot": "desktop/R11", "note": "portrait is the cropped broken sprite"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "player findable but small; bushes read as pickups"},
        {"shot": "mobile/R05", "note": "night playable, but pools over roofs confuse depth"},
        {"shot": "desktop/R08", "note": "hotel fade covers a large area and half-hides the player"},
        {"shot": "mobile/R13", "note": "quest numbers misread (5 as S)"},
        {"shot": "crops/R03-field", "note": "crop stages readable"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R16", "note": "1807 log cabin and trade tents fit the frontier"},
        {"shot": "desktop/R09", "note": "1871 wooden frame town, but no false fronts or board-and-batten"},
        {"shot": "desktop/R04", "note": "1886 oil lantern posts and Victorian bathhouses"},
        {"shot": "desktop/R05", "note": "1931 five-globe lamps, twin-tower hotel, neon"},
        {"shot": "desktop/R06", "note": "1955 cobra-head lamps, drive-in, motor hotel"},
        {"shot": "desktop/R07", "note": "2026 shown only as a lake; generic BATHS plates in every era"}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-painted-speckle",
      "category": "pixel",
      "expectedGain": 1.5,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/R04-row", "desktop/R13", "desktop/R02"],
      "benchmark": "chained-5.jpg",
      "fix": "Snap all assets and terrain to one master palette per era (about 32-48 colours); merge clusters under 3 px after the median filter; cap each material at a 3-4 step hue-shifted ramp; replace the baked noisy grass and road with hand-made 16 px tiles in 3-4 shades."
    },
    {
      "id": "G-font-glyph-collapse",
      "category": "ui",
      "expectedGain": 1.5,
      "severity": 5,
      "effort": "S",
      "workstream": "WS6",
      "evidence": ["desktop/R18", "desktop/R02", "mobile/R13"],
      "benchmark": "stardew-5.jpg",
      "fix": "Draw every UI font at an integer multiple of its design pixel, aligned to the 4x art grid, with smoothing off; use Jacquard 12 only at 24 px or larger, or swap it for a legible face; check that C, B, 3 and 5 render correctly; redraw the title logo as pixel art."
    },
    {
      "id": "G-faces-and-hats",
      "category": "characters",
      "expectedGain": 1.5,
      "severity": 5,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["crops/R02-player", "crops/R03-player", "desktop/R11"],
      "benchmark": "stardew-1.jpg",
      "fix": "Hand-place 1-px eyes and keep hair at least 2 ramp steps from skin; give each hat kind its own silhouette (wide slouch brim, pinched fedora, toque, sun bonnet, short-bill cap above the eyes); fix Augustin's tilted frame and add real portraits."
    },
    {
      "id": "G-light-depth-and-mood",
      "category": "lighting",
      "expectedGain": 1.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["desktop/R05", "desktop/R06", "desktop/R09", "desktop/R10"],
      "benchmark": "seastars-2.jpg",
      "fix": "Draw lamp pools on the ground layer, masked by building footprints; give dusk and evening a warm sky ramp with lamps on by 19:00; darken the ground in rain and add pixel splashes; add snow caps on roofs and shrubs; draw fog as banded drifting layers."
    },
    {
      "id": "G-tool-swing-read",
      "category": "animation",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["strips/R14", "desktop/R14"],
      "fix": "Draw the hoe 10-12 px long with an overhead-to-ground arc in front of the body; add 1-2 frames of hit-stop and a soil clod and dust puff on strike; capture on tilled soil; add ambient motion (smoke, creek, birds)."
    },
    {
      "id": "G-empty-farm-and-lake",
      "category": "environment",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["desktop/R03", "desktop/R07", "desktop/R14"],
      "benchmark": "stardew-1.jpg",
      "fix": "Dress the farm screens with fences, paths, stumps, flowers, a well and a woodpile; give the lake a banded water ramp with highlights, shore foam, reeds and a boat; add a 2026 restored-Row capture."
    },
    {
      "id": "G-animals-vehicles",
      "category": "characters",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["crops/R15-pen", "desktop/R17", "desktop/R13"],
      "fix": "Hand-draw the cows, hens (with beak, comb and tail), the standing ox and the 1931 truck at sprite size; attach their shadows; stop the truck overlapping the ox."
    },
    {
      "id": "G-occlusion-fade-scope",
      "category": "readability",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "S",
      "workstream": "WS1",
      "evidence": ["desktop/R08"],
      "fix": "Fade only a circle of about 24 px around the player, and only while the player is inside the roof footprint, instead of ghosting the whole building."
    },
    {
      "id": "G-era-signage-and-layout",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["desktop/R05", "desktop/R04", "desktop/R07"],
      "fix": "Replace the generic BATHS plates with period bathhouse names painted on the facades, from the refs; add era traffic (wagons, carriages, autos) and vary the street dressing per era."
    },
    {
      "id": "G-crop-framing",
      "category": "characters",
      "expectedGain": 0,
      "severity": 2,
      "effort": "S",
      "workstream": "WS2",
      "evidence": ["crops/R11-npcs", "crops/R16-npcs"],
      "fix": "Re-aim the NPC crop boxes on the bodies, not the name tags, and paste each reference sheet beside its close-up as the brief describes."
    }
  ]
}
```
