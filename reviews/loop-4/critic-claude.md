# Critic A (critic-claude): loop 4, tier T32

## Verdict

The world art has reached the point where a screenshot of a building row could pass for a shipped game. The 1886 Victorian Row (`desktop/R04`), the 1871 dogtrot cabin, wagon and pump (`desktop/R13`), the 1931 Craftsman bungalow and Model A (`desktop/R17`) and the 2026 restored Row (`desktop/R19`) are dense and well grounded. The people are what lets the game down. This loop's face window is drawn on side and back frames too: townsfolk walking away have a skin rectangle pasted onto the back of the bonnet or hair (`desktop/R04`, `desktop/R19`). In the fog shot a translucent ghost of an overlapping townsperson sits on the player's face (`crops/R08-player`). Hats are discs wider than the shoulders that hide the torso in the walk cycle (`strips/R13`, `crops/R03-player`). The street crowd is four copies of the same bonnet woman (`desktop/R04`, `desktop/R10`). The pixel grid is legal everywhere: every run in my measurements is a multiple of 2 device px. But soft, non-grid tint gradients are still on the meadow (`desktop/R03`, `desktop/R13`) and the lake (`desktop/R07`). There are translucent "ghost" tiles where paths meet water (`desktop/R07`), and window glows at night are blurred orbs (`desktop/R05`). The asset families don't match: characters use about 40–65 colours with flat 2-tone shading. Building, crop and animal packs run much denser (a 300×280 px crop bed holds 501 colours, and one goat 60), so the people look pasted onto a different game. Every category is below gate. Continue.

## Scores

### 1. Pixel craft: 5.5
- **Grid holds:** run lengths are multiples of 2 device px in every region I measured. That covers the grass, hotel and bathhouse (`desktop/R04`), crops (`desktop/R03`), cabin (`desktop/R02`) and the animals (`desktop/R15`). The new grass is legal 2×2-cluster camo (4-px runs dominate).
- **Soft overlays break the art grid:**
  - **Meadow:** `desktop/R03` and `desktop/R13` carry smooth darker tint bands with feathered edges. Zoomed, the band edge in R13 is a vertical gradient across about 10 art px, not a crisp 2-px edge. That region holds about 120 distinct colours, against 35 for the plain meadow in `desktop/R02`, so the claimed crisp meadow patches aren't what renders here.
  - **Lake:** the deep-water patches in `desktop/R07` have the same soft edges.
  - **Translucent shore pieces:** where the herringbone path meets the lake there is a semi-transparent slab, and the ramp at the left edge is a washed-out translucent grey with a smeared wedge in it (`desktop/R07`, top-right and top-left).
  - **Night glows:** window glows and the sign halo are blurred orbs, and a soft smear runs down the lamp post (`desktop/R05`, around the Quapaw sign).
- **Mismatched asset families:**
  - **Characters** are chunky, with flat 2-step shading and big uniform clusters (`crops/R04-player`).
  - **Crops** are leaf-level fine detail with stacked repeats (`crops/R03-field`).
  - **Animals** have soft speckled shading at about 60 colours per sprite (`crops/R15-pen`).
  - **Props:** the woodpile in `desktop/R02` is a tangle of black lines that doesn't read as split logs.
- **Benchmarks:** CAL-A `stardew-1.jpg` (7.5) has one consistent shading language across people, buildings and crops. CAL-B `chained-5.jpg` (8.5) has disciplined ramps on everything. This sits at the rubric's 5 ("one grid, but noisy clusters, inconsistent between asset families"), with a half point for the clean buildings. The anchor rule also caps pixel at 7 while non-grid gradients cover the scene.

### 2. Characters: 4.5
- **Broken face window:** side and back frames show a skin rectangle on the back of the head. Two bonnet women in `desktop/R04` (zoomed) have a stray skin block and a floating eye pixel on the side of the bonnet, and one has a brown block across the bonnet. In `desktop/R19` the woman walking up the lawn has a skin patch on the side of her hair. The woman walking left has her face on the back of her head.
- **Fog ghost:** in `crops/R08-player` Nora's face and apron are covered by a translucent grey figure, apparently the townsperson behind her rendered half-transparent.
- **Named people missing or turned away:**
  - In `desktop/R16` / `crops/R16-npcs` the "EZRA" label floats over the tent with no Ezra sprite.
  - In `desktop/R11` / `crops/R11-npcs`, Augustin, the person being talked to, is drawn from behind as a white blob.
- **Silhouettes:**
  - Caleb's slouch hat is a mushroom disc about 1.6× the shoulder width (`crops/R03-player`, `crops/R09-player`). In the side-on walk it covers head and torso, so only legs show (`strips/R13`).
  - Ray's fedora is a grey dome with no pinch and no snapped brim (`crops/R17-player`, `crops/R05-player`).
  - Sam's ball cap has no bill. A brown smear crosses its front, and blue cap pixels are left inside the face (`crops/R19-player`, `crops/R07-player`).
  - June Vale has no ponytail and reads as a bald boy (`crops/R06-player`).
- **Checklist passes against `research/refs/characters.md`:**
  - **Hattie** passes: white cap, white dress and apron, skin 4.
  - **Margaux** passes: scarf, blue shirt, long skirt.
  - **Nora** gets about 4/5: bonnet, blue dress and apron are right, but her hair is blond, not `#5a3a22`, and she has no prop (`crops/R04-player`).
  - **Ada** gets 3/5: her hair reads tan-olive, not `#3b2a1c`, and she has no pole or hoe (`crops/R02-player`).
  - **Walt** fails: long dark trousers, no knickers or white stockings, and his hair or beard reads white, not ginger (`crops/R11-npcs`).
  - **Josiah** is borderline: grey beard and olive hunting shirt are right, but the fur cap reads as a flat cap with no tail (`crops/R16-npcs`).
- **One body for everyone:** every person shares one body template and one dot-eye face.
- **Benchmarks:** CAL-A `stardew-1.jpg` (6.5) has small, distinct farmers. CAL-C `seastars-2.jpg` (9) has about 14 people distinct in silhouette, age and costume. Below the rubric's 5 because of the rendering bugs and the clones.

### 3. Environment: 6.5
- **Strengths:**
  - Buildings show construction everywhere: mansards, brackets, porches and brick coursing (`crops/R04-row`), Spanish tile and the Quapaw dome (`crops/R19-row`), and the Craftsman bungalow (`desktop/R17`).
  - Crops show every stage (`crops/R03-field`).
  - Animals have contact shadows (`crops/R15-pen`).
  - Era props: wagon, pump, trough, Model A, hydrant, Googie drive-in (`desktop/R13`, `desktop/R17`, `desktop/R06`).
- **Weaknesses:**
  - **Empty meadow:** farm frames are 50–70% uniform camo grass with sparse 3-px flower stamps (`desktop/R03`, `desktop/R13`, `desktop/R15`, `desktop/R17`).
  - **Flat lake:** about 60% of `desktop/R07` is one repeated caustic net. The dock has no posts, shadow or reflection.
  - **Repeated layouts:** 1871 and 1931 put the crate, path, fence and trough in the same places (`desktop/R13` vs `desktop/R17`).
  - **Stacked crops:** corn and wheat are the same stalk stacked four times (`crops/R03-field`).
  - **Goat defect:** the goat has a green-olive patch through its back (`crops/R15-pen`, zoomed).
  - **Clutter:** townsfolk walk on the lawns (`desktop/R06`, `desktop/R19`).
- **Benchmarks:** below CAL-A `stardew-1.jpg` (8), whose grass is clustered blades with planted edges, and CAL-B `chained-5.jpg` (8.5).

### 4. Lighting: 5.5
- **Strengths:**
  - At night the lamp pools are banded on the grid, and the five-globe lamps are right for 1931 (`desktop/R05`, `mobile/R05`).
  - Steam rises from the spring pools (`desktop/R08`).
  - Snow sits on the roofs (`desktop/R10`).
- **Weaknesses:**
  - **Bullseye pools:** the bands are three concentric ellipses. They read as targets, not light falling off.
  - **Blurred glows:** window glows are soft orbs (`desktop/R05`).
  - **Weak time of day:** dusk at 19:10 looks like a dull afternoon (`desktop/R06`), and the 18:20 lake evening is daylit (`desktop/R07`).
  - **Weak weather:** rain adds 1-px streaks but no darkening, sheen or puddles (`desktop/R09`). Fog is a flat milky wash on the right half while the town on the left stays almost clear (`desktop/R08`).
  - **No shadows on people:** player and townsfolk have no contact shadow, though props do (`desktop/R04`, `desktop/R19`).
- **Benchmarks:** CAL-B `chained-5.jpg` (7) has consistent cast shadows and a puddle reflection. CAL-C `seastars-2.jpg` (9.5) mixes coloured sources.

### 5. Animation: 5.5
- **Walk (`strips/R13`, `strips/R13-mobile`):**
  - The legs go through several distinct stride poses over 8 frames.
  - There is no arm swing or head and hat bob I can see, and no secondary motion.
  - Side-on, the hat hides everything above the knees, so it reads as a walking mushroom.
- **Hoe (`strips/R14`):**
  - It has a real structure: wind-up (frames 1–2, raised behind the head), strike with a crouch (frame 4), then recoil and settle (frames 5–8).
  - **Legs vanish:** during the rise in frames 1–2 the figure floats with no legs.
  - **Draw-order bug:** from frame 4 the tilled tile is drawn over the player's lower body and feet.
  - **Tool pops away:** the hoe vanishes between frames 5 and 6 instead of lowering.
  - **Dust puff:** I can only find a few scattered single pixels in frames 7–8.
  - **Hands:** in frame 4 they don't meet the handle.
- **Benchmarks:** rubric 7 needs a 6-frame walk with tool wind-up, impact and settle. The tool beats are present, but the bugs and the lifeless walk keep it at about 5.5. Stardew's tools (CAL-A) settle without popping.

### 6. UI: 6.5
- **Strengths:**
  - On desktop the 5×7 pixel face is crisp and integer-scaled (`desktop/R11`, `desktop/R18`, zoomed).
  - Icons are native-size and crisp (`desktop/R18`, `desktop/R12`).
  - Each era has its own colourway: green in 1807, cream in 1871/1886, navy and gold in 1931, cream and teal in 1955, navy in 2026.
  - On phones DotGothic16 is crisp (`mobile/R11`, `mobile/R12`).
- **Weaknesses:**
  - **Slot numbers hidden:** the number chips of slots 7 and 8 are covered by the item icons (`desktop/R02`, zoomed; also `mobile/R02`).
  - **Overlaps:**
    - The shop panel overlaps the goals HUD, leaving "Motel b…" cut off (`desktop/R18`).
    - The phone dialogue box is drawn over a half-visible hotbar (`mobile/R11`).
  - **Text flaws:**
    - The "(0/15)" counter wraps onto its own line (`desktop/R11`).
    - The friendship hearts are a fallback glyph at a different weight.
    - The subtitle "THROUGH THE AGES" is almost illegible over the busy title art (`desktop/R01`).
  - **Flat panels:** frames are flat 2-px borders, not crafted nine-slice materials (`desktop/R12`).
  - **Phone controls:** the joystick is a smooth translucent shape (`mobile/R02`).
- **Benchmarks:** below `stardew-5.jpg` (7.5), which has a wooden frame and a portrait box with a large painted portrait. Here the portrait is a tiny sprite crop.

### 7. Readability: 6.5
- **Strengths:**
  - Crop stages are clear (`crops/R03-field`).
  - The player usually pops by value, and the night shot stays playable thanks to the player's own light pool (`desktop/R05`, `mobile/R05`).
  - Phone art sits at 1 art px = 1 CSS px. The player is about 60 CSS px tall, and HUD text is at or above 12 CSS px (`mobile/R04`).
- **Weaknesses:**
  - **Fog:** the player's face is muddied (`crops/R08-player`).
  - **Ripe markers:** they are 2×2 white dots that read like noise or sparkles (`crops/R03-field`).
  - **Overlapping labels:** JOSIAH / TRADE / MARGAUX collide in one row (`crops/R16-npcs`).
  - **Lamp posts over people:** posts overlap townsfolk's faces (`desktop/R06`), and in the walk the player is behind a post (`strips/R13`).
  - **Phone screen space:** the HUD stack takes the top 19% of the screen (`mobile/R04`).
- **Benchmarks:** CAL-A (8.5) separates figure from ground more strongly.

### 8. Authenticity: 6.5
- **Strengths:**
  - A blind viewer could sort the six eras:
    - 1807: log cabin and trade tents (`desktop/R16`).
    - 1871: board-and-batten fronts plus STAGE and DRUGS (`desktop/R09`).
    - 1886: Victorian Row (`desktop/R04`).
    - 1931: five-globe lamps and CLUB (`desktop/R05`).
    - 1955: drive-in, motor hotel, hydrant and lane stripes (`desktop/R06`).
    - 2026: the Row with the right modern uses, Superior as a brewery, Quapaw as a spa with its dome, Ozark as a cultural centre, Hotel Hale (`desktop/R19`, `crops/R19-row`).
- **Weaknesses:**
  - **Quapaw dome:** the Quapaw (1922) has no dome in 1931 or 1955 (`desktop/R05`, `desktop/R06`) but has one in 2026.
  - **Ozark:** it is drawn as a Beaux-Arts temple front in 1955 and 2026. The real building is Spanish Colonial Revival with twin towers.
  - **1931 Row:** it reads as darkened Victorian silhouettes, not the 1910s–20s brick and stucco bathhouses.
  - **Clothing:** generic chibi, every 1886 townswoman in the same bonnet, Walt without knickers or stockings (`crops/R11-npcs`).
- **Benchmarks:** the calibration images (7–7.5) have no internal contradictions. This one has a few.

## Ranked gaps

1. **G-face-window-directions** (characters, WS2, severity 5, effort S, gain +1.0)
   - **Defect:** the face window is applied to side and back frames and pasted onto hair and bonnets (`desktop/R04`, `desktop/R19`).
   - **Fix:**
     - Apply the window only to down-facing and three-quarter frames. On side frames, place it on the facing side only; on back frames, never.
     - Clip it to the head mask, not a rectangle.
     - Clear hat pixels left inside it (`crops/R19-player`).
     - Make the townsfolk overlap rule hide or offset the whole sprite, never leave a translucent remnant (`crops/R08-player`).
     - Never hide a named NPC: Ezra is missing in `desktop/R16`.
2. **G-asset-family-palette** (pixel, WS1/WS3, severity 4, effort L, gain +1.0)
   - **Defect:** characters, building packs, crops and animals look like different games.
   - **Fix:**
     - Quantize every building, crop and animal pack to a per-era master palette of at most 32 colours, with at most 8–12 colours per sprite. The goat is 60 now, and the crop bed region 501.
     - Raise character shading to the same 3–4-step hue-shifted ramps the buildings use.
     - Clean noisy props: the woodpile in `desktop/R02`, the stacked corn in `crops/R03-field`.
     - Benchmark: CAL-B `chained-5.jpg`.
3. **G-soft-overlays** (pixel / lighting, WS1/WS4, severity 4, effort M, gain +0.5 pixel, +0.5 lighting)
   - **Defect:** soft, non-grid gradients remain in the meadow, lake, shore pieces and night glows.
   - **Fix:**
     - Snap meadow tint bands and deep-water patches to 2-art-px edges with at most 2 tone steps (`desktop/R03`, `desktop/R13`, `desktop/R07`).
     - Replace the translucent path/water junction pieces with opaque tiles (`desktop/R07`).
     - Quantize window glows and the sign halo to 2–3 dithered bands (`desktop/R05`).
4. **G-hat-silhouettes** (characters, WS2, severity 4, effort M, gain +0.5)
   - **Defect:** hats are discs that swallow the head and torso, and some checklist features are missing.
   - **Fix:**
     - Redraw each hat kind with a brim overhang of at most 2–3 art px past the head: Caleb's slouch hat (`crops/R03-player`), Ray's pinched fedora (`crops/R17-player`), Sam's billed cap (`crops/R19-player`).
     - In side frames, show the face under the brim (`strips/R13`).
     - Add June's ponytail (`crops/R06-player`), Walt's knickers and white stockings, and the tail on Josiah's fur cap.
5. **G-townsfolk-variety** (characters, WS2, severity 3, effort M, gain +0.5)
   - **Defect:** the crowd is copies of one sprite.
   - **Fix:**
     - Replace the 4 identical bonnet women (`desktop/R04`, `desktop/R10`) with at least 6 variants per era: men and women, varied hats, coats and heights.
     - Keep them on streets, not lawns (`desktop/R06`, `desktop/R19`).
     - Add contact shadows under all people.
6. **G-hoe-layering-and-settle** (animation, WS5, severity 3, effort S, gain +0.5)
   - **Defect:** draw-order and pose bugs spoil a well-structured swing (`strips/R14`).
   - **Fix:**
     - Draw the tilled-soil decal below the actor layer, since it covers the feet from frame 4.
     - Keep the legs during the wind-up rise.
     - Add 2 frames that lower and return the hoe instead of popping it away.
     - Make the dust puff a 3–4-frame burst of 3–6 px clusters.
     - Connect the hands to the handle.
7. **G-walk-secondary** (animation, WS5, severity 3, effort M, gain +0.5)
   - **Defect:** the walk moves only the legs.
   - **Fix:** add arm swing, a 1-px body and hat bob on contact frames, and visible faces in side frames (`strips/R13`, `strips/R13-mobile`).
8. **G-empty-meadow** (environment, WS3, severity 3, effort M, gain +0.5)
   - **Defect:** farm frames are mostly empty camo grass, and the farmyards repeat.
   - **Fix:**
     - Replace the uniform camo with clustered blade tufts and planted edges, as in CAL-A `stardew-1.jpg`.
     - Dress farm frames with stumps, rocks, bushes, worn paths and era junk (`desktop/R13`, `desktop/R17`, `desktop/R15`).
     - Make farmyard layouts differ per era.
     - Give the dock posts and a shadow (`desktop/R07`).
9. **G-time-of-day-weather** (lighting, WS4, severity 3, effort M, gain +0.5)
   - **Defect:** dusk, evening, rain and fog barely change the light.
   - **Fix:**
     - Give dusk and evening per-era palette ramps with a real warm-to-cool grade (`desktop/R06`, `desktop/R07`).
     - Give rain darkening, wet ground and puddles (`desktop/R09`).
     - Apply fog across the whole view (`desktop/R08`).
     - Replace bullseye lamp pools with falloff bands that light nearby sprites.
     - Benchmark: CAL-C `seastars-2.jpg`.
10. **G-row-architecture** (authenticity, WS7, severity 3, effort M, gain +0.5)
    - **Defect:** the Quapaw and Ozark don't match their real buildings or stay consistent across eras.
    - **Fix:**
      - Show the Quapaw's dome from 1922 on (`desktop/R05`, `desktop/R06` vs `desktop/R19`).
      - Draw the Ozark as Spanish Colonial Revival with twin towers.
      - Give the 1931 Row distinct 1910s–20s brick and stucco bathhouses instead of darkened Victorian sprites.
11. **G-ui-overlaps** (ui, WS6, severity 2, effort S, gain +0.5)
    - **Defect:** several overlaps and text flaws, and flat panels.
    - **Fix:**
      - Keep slot-number chips above the icons (`desktop/R02`).
      - Hide the HUD goals under modal panels (`desktop/R18`) and hide the hotbar under the phone dialogue (`mobile/R11`).
      - Keep counters on the same line (`desktop/R11`).
      - Draw pixel hearts.
      - Give the title subtitle a backing plate (`desktop/R01`).
      - Give panels an era material in nine-slice: hide, plank, brass, chrome.
      - Benchmark: `stardew-5.jpg`.
12. **G-goat-sprite-hole** (environment, WS3, severity 2, effort S, gain +0.0 alone)
    - **Defect:** a green-olive patch shows through the goat's back (`crops/R15-pen`).
    - **Fix:** repaint or re-key the goat sprite.

```json
{
  "loop": 4,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "desktop/R13", "note": "meadow tint bands have feathered gradient edges (~120 colours in a plain-grass region vs 35 in R02)" },
        { "shot": "desktop/R03", "note": "soft dark blob over camo grass; crop bed region holds 501 colours" },
        { "shot": "desktop/R07", "note": "translucent ghost slabs at path/water junction and left ramp; soft deep-water patches" },
        { "shot": "desktop/R05", "note": "blurred window-glow orbs and sign halo, soft smear on lamp post" },
        { "shot": "crops/R03-field", "note": "crop pack detail and density mismatch chunky characters; stacked repeated stalks" },
        { "shot": "crops/R15-pen", "note": "animals ~60 colours, soft speckle shading in a different style from people" },
        { "shot": "desktop/R02", "note": "grid legal (2-px runs), woodpile is a noisy black-line tangle" }
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "desktop/R04", "note": "townsfolk side/back frames get a skin rectangle and stray eye on the bonnet; four identical clones" },
        { "shot": "desktop/R19", "note": "face window pasted on the side/back of hair on walking townsfolk" },
        { "shot": "crops/R08-player", "note": "translucent ghost figure over Nora's face and apron" },
        { "shot": "crops/R03-player", "note": "Caleb's slouch hat is a disc ~1.6x shoulder width" },
        { "shot": "crops/R06-player", "note": "June Vale has no ponytail, reads as a bald boy" },
        { "shot": "crops/R19-player", "note": "Sam's cap has no bill, brown smear, blue cap pixels inside the face" },
        { "shot": "crops/R11-npcs", "note": "Hattie passes; Walt fails (no knickers or stockings, wrong hair); Augustin drawn from behind in his own dialogue" },
        { "shot": "crops/R16-npcs", "note": "EZRA label with no sprite; Margaux passes; Josiah's fur cap reads as a flat cap" }
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/R04-row", "note": "rich Victorian construction: mansards, brackets, porches, coursing" },
        { "shot": "crops/R03-field", "note": "every crop stage readable; corn and wheat are stacked repeats" },
        { "shot": "desktop/R13", "note": "dogtrot cabin, wagon, pump well dressed, but 60% of the frame is empty camo meadow" },
        { "shot": "desktop/R17", "note": "same crate, path, fence and trough layout as 1871; Craftsman and Model A good" },
        { "shot": "desktop/R07", "note": "lake is one repeated caustic net; dock has no posts, shadow or reflection" },
        { "shot": "crops/R15-pen", "note": "green patch through the goat's back" }
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R05", "note": "banded on-grid lamp pools and five-globe lamps, but bullseye rings and blurred window orbs" },
        { "shot": "desktop/R06", "note": "dusk at 19:10 reads as a dull afternoon" },
        { "shot": "desktop/R07", "note": "18:20 evening is daylit" },
        { "shot": "desktop/R09", "note": "rain is streaks only: no darkening, sheen or puddles" },
        { "shot": "desktop/R08", "note": "fog is a flat wash on half the frame, town nearly clear" },
        { "shot": "desktop/R19", "note": "no contact shadows under people while props have them" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "strips/R13", "note": "legs cycle, but no arm swing or bob; hat hides everything above the knees side-on" },
        { "shot": "strips/R13-mobile", "note": "same cycle, no secondary motion" },
        { "shot": "strips/R14", "note": "wind-up, crouch strike and settle present; legs vanish during the rise, tilled tile drawn over feet, hoe pops away at frame 6, dust puff barely visible" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R11", "note": "crisp 5x7 pixel face; (0/15) wraps onto its own line; fallback heart glyphs" },
        { "shot": "desktop/R18", "note": "crisp native icons; shop panel overlaps the goals HUD" },
        { "shot": "desktop/R02", "note": "slot 7 and 8 number chips covered by item icons" },
        { "shot": "mobile/R11", "note": "dialogue box drawn over a half-visible hotbar" },
        { "shot": "desktop/R12", "note": "per-era colourway, but flat 2-px frames, no material" },
        { "shot": "desktop/R01", "note": "pixel wordmark ok; subtitle almost illegible over busy art" }
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "mobile/R04", "note": "1 art px = 1 CSS px, player ~60 CSS px tall, text at or above 12 CSS px; HUD takes the top 19%" },
        { "shot": "mobile/R05", "note": "night stays playable via the player's light pool" },
        { "shot": "crops/R03-field", "note": "crop stages clear; ripe markers are 2x2 white dots that read as noise" },
        { "shot": "crops/R08-player", "note": "player's face muddied in fog" },
        { "shot": "crops/R16-npcs", "note": "name labels collide in one row" },
        { "shot": "desktop/R06", "note": "lamp posts drawn over townsfolk faces" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "desktop/R19", "note": "2026 Row uses correct: Superior brewery, Quapaw spa with dome, Ozark cultural centre, Hotel Hale" },
        { "shot": "desktop/R09", "note": "1871 board-and-batten and false fronts, STAGE and DRUGS" },
        { "shot": "desktop/R06", "note": "1955 drive-in, motor hotel, hydrant, lane stripes; but Quapaw has no dome and Ozark is a temple front" },
        { "shot": "desktop/R05", "note": "1931 five-globe lamps correct; Row reads as darkened Victorian silhouettes, Quapaw dome missing" },
        { "shot": "crops/R11-npcs", "note": "Walt without knickers or stockings; clothing generic" },
        { "shot": "desktop/R16", "note": "1807 trade tents and campfire grounded" }
      ]
    }
  },
  "gaps": [
    { "id": "G-face-window-directions", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R19", "crops/R08-player", "crops/R19-player", "desktop/R16"], "benchmark": "seastars-2.jpg", "fix": "Apply the face window only to down and three-quarter frames (never back, facing side only on side frames), clip it to the head mask, clear leftover hat pixels inside it; the townsfolk overlap rule must hide or offset the whole sprite with no translucent remnant, and never hide a named NPC (Ezra)." },
    { "id": "G-asset-family-palette", "category": "pixel", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R15-pen", "desktop/R02", "crops/R04-player"], "benchmark": "chained-5.jpg", "fix": "Quantize building, crop and animal packs to a per-era master palette (32 colours or fewer, 8-12 per sprite); raise character shading to matching 3-4-step hue-shifted ramps; clean noisy props (woodpile, stacked corn)." },
    { "id": "G-soft-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["desktop/R13", "desktop/R03", "desktop/R07", "desktop/R05"], "benchmark": "chained-5.jpg", "fix": "Snap meadow tint bands and deep-water patches to 2-art-px edges with 2 tone steps or fewer; replace translucent path/water junction tiles with opaque art; quantize window glows and sign halos to 2-3 dithered bands." },
    { "id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R17-player", "crops/R19-player", "crops/R06-player", "strips/R13"], "benchmark": "stardew-1.jpg", "fix": "Redraw hat kinds with 2-3 art px of brim overhang (slouch, pinched fedora, billed cap), show the face under the brim in side frames, add June's ponytail, Walt's knickers and stockings, and the tail on Josiah's fur cap." },
    { "id": "G-townsfolk-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "Replace the identical bonnet-woman clones with at least 6 per-era variants (sex, hat, coat, height), keep them on streets, and add contact shadows under all people." },
    { "id": "G-hoe-layering-and-settle", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Draw the tilled-soil decal below the actor, keep the legs during the wind-up, add 2 frames lowering the hoe instead of popping it away, make the dust puff a 3-4-frame burst of 3-6 px clusters, connect the hands to the handle." },
    { "id": "G-walk-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "Add arm swing, a 1-px body and hat bob on contact frames, and visible faces in side frames." },
    { "id": "G-empty-meadow", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R13", "desktop/R17", "desktop/R15", "desktop/R03", "desktop/R07"], "benchmark": "stardew-1.jpg", "fix": "Replace uniform camo grass with clustered blade tufts and planted edges; dress farms with stumps, rocks, bushes, worn paths and era junk; vary farmyard layouts per era; give the dock posts and a shadow." },
    { "id": "G-time-of-day-weather", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R09", "desktop/R08", "desktop/R05"], "benchmark": "seastars-2.jpg", "fix": "Per-era dusk and evening palette grades, rain darkening with wet ground and puddles, fog across the full view, lamp falloff bands that light nearby sprites instead of bullseye rings." },
    { "id": "G-row-architecture", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R06", "desktop/R19"], "fix": "Show the Quapaw dome from 1922 on, draw the Ozark as Spanish Colonial Revival with twin towers, and give the 1931 Row distinct 1910s-20s brick and stucco bathhouses rather than darkened Victorian sprites." },
    { "id": "G-ui-overlaps", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R02", "desktop/R18", "mobile/R11", "desktop/R11", "desktop/R01", "desktop/R12"], "benchmark": "stardew-5.jpg", "fix": "Slot-number chips above icons, hide the goals HUD under modal panels and the hotbar under the phone dialogue, no orphan counter wraps, pixel hearts, a backing plate for the title subtitle, era-material nine-slice frames." },
    { "id": "G-goat-sprite-hole", "category": "environment", "expectedGain": 0.0, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/R15-pen"], "fix": "Repaint or re-key the goat sprite so no green-olive patch shows through its back." }
  ],
  "verdict": "continue"
}
```
