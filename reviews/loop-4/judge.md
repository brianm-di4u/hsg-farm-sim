# Judge: loop 4, tier T32

Paths are relative to `games/farm-sim/screenshots/review-loop-4/`. Zoom crops I made (nearest-neighbour) are in the session scratchpad, `loop-4/`: `r04-bonnets.png`, `r03-meadow.png`, `r05-quapaw.png`, `r07-slab.png`, `r06-left.png`, `r02-slots.png`, `r04-slots.png`.

## Inputs and gates

- **Category sums.** Critic A (critic-claude): 47.0. Critic B (critic-codex): 47.5 (its stated "48" is wrong, and the category scores are what count). Advocate: 47.5.
- **Spread.** No category differs by more than 1.0 between the critics; the widest gap is 0.5. The advocate disputed ten facts, so I checked each disputed fact against the captures myself (see below).
- **Hard gates** (`reviews/loop-4/GATES.md`, `reviews/loop-4/perf.json`):
  - Tests: 88/88 pixel suite and 88/88 painted suite. B's "not supplied" caveat is void.
  - Pixel integrity: passes on all 26 captures.
  - Performance:
    - Desktop: min 607 fps.
    - Phone 4×: min 73.6 fps, gated (median) p95 ≤ 40.4 ms.
    - Phone 6×: min 55 fps.
    - Heap ≤ 13.6 MB.
    - All inside `research/pixel-budget.md`. The 334 ms first-visit p95 run at 6× in the snow town is logged (> 150 ms) but not gated.
  - The loop is scored.

## Disputed facts: my rulings

1. **Rain darkening (`desktop/R09`).** The advocate is right. Compared with the dry 1871/1886 frames (`desktop/R04`, `desktop/R03`), R09 is visibly greyer and darker: timber, road and grass all lose saturation. There are still no puddles or sheen. A was wrong to say "no darkening".
2. **Fog coverage (`desktop/R08`).** The advocate is right. The left-hand town block is clearly veiled and desaturated, though less than the springs on the right. A's "town almost clear" is wrong.
3. **Ada's legs and the hoe decal (`strips/R14`).**
   - Ada's dress hem sits on the ground in every frame, so A's "legs vanish" is wrong.
   - From frame 4 the soil decal meets and slightly clips the hem. That is a small draw-order bug, as the advocate says.
4. **Hoe pop and dust (`strips/R14`).**
   - The hoe vanishes between frames 5 and 6.
   - Frames 4–5 have no visible puff, and frames 7–8 have only a few loose pixels.
   - A and the advocate are right. B's "settling particles" is overstated.
5. **Walk arms (`strips/R13`).** All 8 frames are back and three-quarter-back views. The slouch-hat disc covers the whole upper body, and only the legs alternate. B's "alternating arm positions" is wrong.
6. **Face window on side and back frames (`desktop/R04`, zoom `r04-bonnets.png`).** Confirmed. Each bonnet woman seen from the side or back has a rectangular skin block with an eye pixel pasted onto the side of the bonnet. The centre one has a brown block across it.
7. **Translucent overlap remnants (`crops/R08-player`, `desktop/R06`, zoom `r06-left.png`).** Confirmed.
   - In R08, a half-transparent townsperson lies across Nora's face and apron.
   - In R06, the far-left townsperson is two overlapping translucent figures.
   - These come from this loop's townsfolk give-way change.
8. **Ezra and Augustin.** Confirmed: no Ezra sprite under his label (`crops/R16-npcs`), and Augustin is drawn from behind in his own dialogue (`crops/R11-npcs`).
9. **Soft overlays.** Confirmed.
   - **Meadow (`desktop/R03`, zoom `r03-meadow.png`):** the dark meadow blobs have feathered gradient edges. That region holds 93 distinct colours, against 15 for plain meadow lower left. The brief's "crisp 2-px patch edges" do not render here.
   - **Lake (`desktop/R07`, zoom `r07-slab.png`):** a translucent slab sits at the path/water junction with the waves visible through it, and the deep-water patches have soft edges.
   - **Night (`desktop/R05`, zoom `r05-quapaw.png`):** the window lanterns are blurred orbs and a soft glow runs down the lamp post.
10. **R18 shop "overlap".** The advocate is right. It is a modal over a dimmed HUD, which is normal.
11. **Labels in R16.** The plates abut but do not overlap, and all are legible. This is a minor issue, not a collision.
12. **Stacked crops (`crops/R03-field`).** One plant per tile in a planted column. This is not a sprite defect, so the advocate is right.
13. **New finding (neither critic): slot numerals have LCD sub-pixel colour fringes.** Zoomed hotbar chips in `desktop/R02` (`r02-slots.png`) and `desktop/R04` (`r04-slots.png`) show white digits with 1-device-px red and blue fringes. That is ClearType-style text antialiasing, off the 2-px art grid, on a UI element the brief says is now pixel-crisp. Slots 7 and 8 also have their numbers half-covered by the seed-packet icons (A is right).

## Category rulings

### 1. Pixel: 5.5
- **What holds:** the grid itself is legal, and building craft is near the 7 anchor (`crops/R04-row`, `desktop/R19`).
- **What fails:** non-grid soft light and tint remain in three places:
  - meadow blobs (`desktop/R03`)
  - lake patches and translucent shore slabs (`desktop/R07`)
  - blurred night glows (`desktop/R05`)
- **Asset families:** they still mismatch. Flat 2–3-tone people sit beside speckle-shaded animals (`crops/R15-pen`) and leaf-level crops (`crops/R03-field`).
- **Score:** A and the advocate are right and B under-weighted the overlays. Rubric 5 ("one grid, noisy spots, inconsistent families") plus a half point for the buildings. Below `stardew-1.jpg` and `chained-5.jpg`.

### 2. Characters: 4.5
- **What works:**
  - Front faces now show under brims (`crops/R03-player`, `crops/R04-player`).
  - Hattie and Margaux meet their checklists (`crops/R11-npcs`, `crops/R16-npcs`).
  - The cows and hens are near the 7 anchor (`crops/R15-pen`).
- **What fails:** the loop's own face-window change broke every side and back frame in the crowd (`desktop/R04`, `desktop/R19`). The give-way change leaves translucent remnants (`crops/R08-player`, `desktop/R06`). One named person is missing and another is turned away (`crops/R16-npcs`, `crops/R11-npcs`).
- **Silhouettes and checklist misses:**
  - Sam's cap has no bill and leaves cap pixels inside the face (`crops/R19-player`).
  - Walt has no knickers or stockings (`crops/R11-npcs`).
  - The 1886 crowd is clones (`desktop/R10`).
- **Animals and score:** the animals don't offset bugs that reach named people. Below the 5 anchor. A and the advocate are right; B's 5 missed the rendering bugs.

### 3. Environment: 6.5
- **Town and camp are dressed:**
  - `desktop/R04` has benches, barrels, corner lanterns and porch beds.
  - `desktop/R19` has a stocked farmers' market, a planter and a solar roof.
  - `desktop/R06` has a Googie drive-in, a motor hotel and a hydrant.
  - `desktop/R16` has a stream, patched tents and a tripod.
  - The snow pass on the roofs and lawns works (`desktop/R10`).
  - These approach the 7 anchor, so B's "sparse frontage" is too harsh for the towns.
- **Farm interiors and the lake are not:**
  - The farms are 50–60% empty camo meadow (`desktop/R02`, `desktop/R17`).
  - The 1807 and 1931 yards repeat the crate, path and fence placement (`desktop/R02` vs `desktop/R17`).
  - The lake is one caustic net with a post-less dock (`desktop/R07`).
  - The goat has a green patch (`crops/R15-pen`).
- **Score:** 6.5. Below `stardew-1.jpg` in farm composition.

### 4. Lighting: 5.5
- **Corrections in the build's favour:** rain darkens and fog covers the whole frame (facts 1 and 2). Snow, steam and fog give real weather moods (`desktop/R08`, `desktop/R09`, `desktop/R10`). The era lamps are right (`desktop/R05`, `desktop/R06`).
- **Against the 7 anchor:**
  - Light is not kept on-grid: blurred window orbs and the lamp-post smear (`desktop/R05`).
  - The pools are bullseye rings, not falloff.
  - People have no contact shadows while props do (`desktop/R04`, `desktop/R19`).
  - The 18:20 lake is daylit (`desktop/R07`).
  - Dusk is a muted grade with no warm-to-cool shift (`desktop/R06`).
- **Score:** two of the four anchor conditions are met, but the on-grid condition fails visibly. I hold at 5.5 rather than the advocate's 6.0: B's 5.5 didn't rest on A's two errors and stands on its own evidence.

### 5. Animation: 5.5
- **Hoe swing (`strips/R14`):** it has a real wind-up, a crouch strike and grass turning to soil at impact (frames 3 to 4). But the hoe pops away at frames 5 to 6, there is no visible dust at impact, and the decal clips the hem.
- **Walk (`strips/R13`, `strips/R13-mobile`):** only the legs move. The hat disc hides the arms and torso, and there is no bob.
- **Score:** A and the advocate are right; B's 6 rested on arm motion and particles that aren't there.

### 6. UI: 6.5
- **What works:**
  - The desktop body text uses the 5×7 pixel face, and it is crisp (`desktop/R18`, `desktop/R12`).
  - Shop icons are native-size sprites (`desktop/R18`).
  - Frames have per-era colourways: 1931 navy and gold (`desktop/R12`), 1955 cream and teal (`desktop/R18`).
  - DotGothic16 is crisp on the phone (`mobile/R11`).
- **Against:**
  - The slot numerals have LCD colour fringes and slots 7 and 8 are half-covered (`desktop/R02`, `desktop/R04`, fact 13).
  - The phone dialogue leaves hotbar slots 1–2 showing, the portrait is a small detached box, and the hearts are thin outline glyphs (`mobile/R11`).
  - Frames are flat 2-px borders with no material (`desktop/R12`).
- **Score:** 6.5, as all three reviewers proposed.

### 7. Readability: 6.5
- **What reads:**
  - Crop stages are distinct (`crops/R03-field`).
  - On the phone the player and the one-line goal read, at 1 art px per CSS px (`mobile/R04`).
  - At night the player's pool and the lit townsperson read (`desktop/R05`).
- **Against:**
  - The phone HUD takes the top ~19% of the screen (`mobile/R04`).
  - Nora's face is muddied by the translucent remnant (`crops/R08-player`).
  - Lamp posts cross figures (`desktop/R06`, `strips/R13`).
  - The ripe markers are 2×2 dots (`crops/R03-field`).
- **Score:** 6.5, as all three reviewers proposed.

### 8. Authenticity: 6.5 (gate ≥ 6 met, evidence from five chapters)
- **Eras sort blind, and the buildings are grounded:**
  - 1807 cabin and trade tents (`desktop/R02`, `desktop/R16`).
  - 1871 board-and-batten fronts with VAPOR BATHS, STAGE and DRUGS (`desktop/R09`).
  - 1886 Victorian Row (`desktop/R04`).
  - 1931 Craftsman bungalow and Model A (`desktop/R17`).
  - 1955 drive-in and motor hotel (`desktop/R06`).
  - 2026 Row with correct modern uses: brewery, spa, cultural centre, Hotel Hale (`desktop/R19`).
- **Against:**
  - The Quapaw has no dome in 1931 and 1955 but has one in 2026 (`desktop/R05`, `desktop/R06` vs `desktop/R19`).
  - The Ozark is a temple front.
  - Clothing lags: Caleb (1871) and Ray (1931) wear the same red shirt and blue trousers (`crops/R03-player`, `crops/R17-player`).
- **Score:** A and the advocate's 6.5 is better supported than B's 6.

**Total: 47.0** (loop 3: 44.5, +2.5). Every category except authenticity is below its gate. Verdict: **continue**.

## Ranked gaps (top 12, by expected gain ÷ effort)

1. **G-face-window-directions** (characters, WS2, sev 5, S, +1.0)
   - **Problem:** the face window is pasted on side and back frames, the overlap rule leaves translucent remnants, and named NPCs are hidden.
   - **Fix:**
     - Apply the face window only to down and ¾-down frames. On side frames, use only the facing half; on back frames, never.
     - Clip the window to the head mask, not a rectangle.
     - Clear any hat pixels left inside it (Sam).
     - The give-way rule must hide or offset the whole sprite in one opaque draw (no alpha) and must never hide a named NPC (Ezra).
     - Test: in `desktop/R04`, `desktop/R19`, `desktop/R06` and `crops/R08-player`, zero skin pixels above the brow on back and side frames, and no alpha < 1 on any actor.
2. **G-hoe-layering-and-settle** (animation, WS5, sev 3, S, +0.5)
   - **Problem:** the soil decal clips the hem, the hoe pops away after the strike, the dust is invisible and the hands miss the handle.
   - **Fix:**
     - Draw the tilled-soil decal on the ground layer below actors.
     - Add 2 frames lowering the hoe back to rest instead of the 5→6 pop.
     - At impact, emit a 3–4-frame dust burst of 3–6 art-px opaque clusters, visible in frames 4–6.
     - Close the hands on the handle in the strike frame.
3. **G-ui-crisp-chips-and-overlaps** (ui, WS6, sev 3, S, +0.5)
   - **Problem:** the slot numerals have LCD fringes and sit under the icons, and several small phone and text flaws remain.
   - **Fix:**
     - Draw slot numerals and stack counts from the 5×7 bitmap font (or as sprites), with no sub-pixel and no greyscale antialiasing. Test: no pixel in a chip has a hue differing from the glyph or chip colours.
     - Draw the chips above the icons.
     - Hide the hotbar under the phone dialogue (`mobile/R11`).
     - Keep "(0/15)" on one line (`desktop/R11`).
     - Use pixel-sprite hearts.
     - Put a backing plate behind the title subtitle (`desktop/R01`).
4. **G-soft-overlays** (pixel, WS1 with WS4, sev 4, M, +0.5 pixel, +0.5 lighting)
   - **Problem:** soft tint, translucent slabs and blurred glows break the art grid (fact 9).
   - **Fix:**
     - Re-bake meadow tint patches and deep-water patches with hard 2-art-px edges and at most 2 tone steps. Test: under 25 colours in a 260×190 meadow region of `desktop/R03`.
     - Replace the translucent path/water and ramp slabs in `desktop/R07` with opaque tiles.
     - Quantize window glows, sign halos and lamp-post glow to 2–3 ordered-dither bands (`desktop/R05`).
5. **G-hat-silhouettes-side-back** (characters, WS2, sev 4, M, +0.5)
   - **Problem:** hat discs swallow the upper body in side and back frames, and several checklist features are missing.
   - **Fix:**
     - Redraw side and back frames so the brim overhangs the head by at most 2–3 art px and the shoulders and arms show below it (`strips/R13`).
     - Draw a pinched fedora crown (Ray), a curved bill (Sam), June's ponytail, Walt's knickers and white stockings, and Josiah's fur-cap tail.
6. **G-townsfolk-variety-and-shadows** (characters, WS2, sev 3, M, +0.5)
   - **Problem:** the crowd is clones walking on lawns, and no person casts a shadow.
   - **Fix:**
     - At least 6 townsfolk variants per era (sex, hat, coat, height) replacing the cloned bonnet women (`desktop/R04`, `desktop/R10`).
     - Path-constrain them to streets (`desktop/R19` lawn walkers).
     - Give every person and the player a 1–2-tone opaque contact-shadow ellipse matching the props.
7. **G-walk-secondary** (animation, WS5, sev 3, M, +0.5)
   - **Problem:** only the legs move in the walk (merges B's G-body-mechanics).
   - **Fix:**
     - Add arm swing visible in all four directions (after gap 5).
     - Add a 1-art-px body and hat bob on contact frames.
     - Rotate the torso 1 px on the passing frames.
8. **G-light-falloff-and-grades** (lighting, WS4, sev 3, M, +0.5)
   - **Problem:** lamp pools are bullseye rings, and dusk, evening and rain lack character (merges B's G-night-surface-light). Rain darkening and full-frame fog already exist and are dropped.
   - **Fix:**
     - Replace the three concentric lamp rings with irregular dithered falloff that also lifts nearby sprites and façades (`desktop/R05`).
     - Give each era a warm-to-cool dusk and evening palette grade (`desktop/R06`, `desktop/R07`: 18:20 must read as evening).
     - Add pixel puddles or wet sheen on roads in rain (`desktop/R09`).
9. **G-farm-dressing** (environment, WS3, sev 3, M, +0.5)
   - **Problem:** farm interiors are mostly empty meadow, the yards repeat between eras, and the lake has no structure (merges A's G-empty-meadow, B's G-purposeful-dressing and the goat).
   - **Fix:**
     - Break the farm meadows with worn paths, stumps, rocks, bushes, work areas and era junk. No more than 30% of a farm frame should be bare camo grass (`desktop/R02`, `desktop/R17`).
     - Lay out each era's farmyard differently.
     - Give the dock posts and a shadow, and vary the lake surface (`desktop/R07`).
     - Re-key the goat's green patch (`crops/R15-pen`).
10. **G-row-architecture** (authenticity, WS7, sev 3, M, +0.5)
    - **Problem:** the Quapaw and Ozark don't match the real buildings or stay consistent across eras.
    - **Fix:**
      - Draw the Quapaw as one building with its dome from 1922 on (`desktop/R05`, `desktop/R06`).
      - Draw the Ozark as Spanish Colonial Revival with twin towers.
      - Give the 1931 Row distinct 1910s–20s brick and stucco bathhouses.
11. **G-human-costume** (characters, WS2, sev 4, L, +1.0)
    - **Problem:** garments are vague and clothing does not change between eras.
    - **Fix:**
      - Per-person garment construction (seams, folds, a deep bonnet brim for Nora) and the signature props from `research/refs/characters.md`.
      - Distinct per-era clothing, so Caleb (1871) and Ray (1931) no longer share a shirt and trousers (`crops/R03-player`, `crops/R17-player`).
      - Test: named people identifiable in greyscale without labels.
12. **G-asset-family-shading** (pixel, WS1, sev 3, L, +0.5)
    - **Problem:** people, crops and animals use different shading languages (merges B's G-cluster-consistency).
    - **Fix:**
      - Give people 3–4-step hue-shifted ramps like the buildings.
      - Cut crop micro-highlights and animal speckle to clustered 3–4-tone shading on a per-era master palette, with at most 12 colours per sprite.
      - Use one selective-outline rule (darkest ramp shade) across people, animals, props and buildings (`crops/R15-pen`, `crops/R03-field`, `crops/R04-player`).

Dropped below the cutoff: B's G-ui-material-portrait (M effort, +0.5, a lower priority than gap 3), to be revisited after gap 3 lands.

```json
{
  "loop": 4,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "desktop/R03", "note": "zoomed: feathered dark meadow blobs, 93 colours vs 15 in plain meadow; crisp-patch change not rendering" },
        { "shot": "desktop/R07", "note": "zoomed: translucent slab at path/water junction, soft deep-water patches" },
        { "shot": "desktop/R05", "note": "zoomed: blurred window orbs and lamp-post glow off the art grid" },
        { "shot": "crops/R04-row", "note": "building clusters and signage near the 7 anchor; grid legal" },
        { "shot": "crops/R15-pen", "note": "speckle-shaded animals vs flat people: asset families mismatch" }
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "desktop/R04", "note": "zoomed: skin block and eye pixel pasted on side/back of every bonnet; cloned crowd" },
        { "shot": "crops/R08-player", "note": "half-transparent townsperson across Nora's face and apron" },
        { "shot": "desktop/R06", "note": "zoomed: far-left townsperson drawn as two overlapping translucent figures" },
        { "shot": "crops/R16-npcs", "note": "EZRA label with no sprite; Margaux passes checklist; Josiah cap flat" },
        { "shot": "crops/R11-npcs", "note": "Augustin from behind in his own dialogue; Hattie passes; Walt lacks knickers/stockings" },
        { "shot": "crops/R19-player", "note": "beside reference: cap has no bill, grey smear, cap pixels inside the face" },
        { "shot": "crops/R15-pen", "note": "cows and hens near the 7 anchor; goat green patch" }
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "desktop/R04", "note": "benches, barrels, corner lanterns, porch beds; dense Victorian construction" },
        { "shot": "desktop/R19", "note": "stocked farmers' market, planter, solar roof; restored Row" },
        { "shot": "desktop/R17", "note": "Craftsman and Model A good, but half the frame is bare meadow; yard layout repeats desktop/R02" },
        { "shot": "desktop/R07", "note": "one repeated caustic net; dock without posts or shadow" },
        { "shot": "desktop/R10", "note": "snow on roofs, lawns and path edges" }
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R09", "note": "rain does darken and desaturate (A wrong); no puddles or sheen" },
        { "shot": "desktop/R08", "note": "fog veils the whole frame, densest over the springs (A wrong)" },
        { "shot": "desktop/R05", "note": "era five-globe lamps, but bullseye rings and blurred window orbs off-grid" },
        { "shot": "desktop/R06", "note": "dusk is a muted grade without warm-to-cool shift" },
        { "shot": "desktop/R07", "note": "18:20 lake reads as daylight" },
        { "shot": "desktop/R19", "note": "no contact shadows under people while props have them" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/R14", "note": "wind-up, crouch strike, tile turns at impact; hoe pops 5->6, no visible dust at impact, decal clips hem" },
        { "shot": "strips/R13", "note": "only legs alternate; hat disc hides arms and torso (B wrong on arms)" },
        { "shot": "strips/R13-mobile", "note": "same cycle, no secondary motion" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "desktop/R02", "note": "zoomed: slot numerals have LCD red/blue fringes; slots 7-8 numbers half under icons" },
        { "shot": "desktop/R18", "note": "crisp 5x7 face, native-size icons, modal over dimmed HUD" },
        { "shot": "desktop/R12", "note": "1931 navy/gold colourway, flat 2-px frames" },
        { "shot": "mobile/R11", "note": "crisp DotGothic16; hotbar shows under dialogue; small detached portrait; outline hearts" }
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "mobile/R04", "note": "player and one-line goal legible; HUD takes top ~19%" },
        { "shot": "crops/R03-field", "note": "crop stages distinct; ripe markers tiny 2x2 dots" },
        { "shot": "desktop/R05", "note": "player pool and lit townsperson read at night" },
        { "shot": "crops/R08-player", "note": "face muddied by translucent remnant" },
        { "shot": "desktop/R06", "note": "lamp post crosses a townsperson" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R09", "note": "1871 board-and-batten fronts: VAPOR BATHS, STAGE, DRUGS" },
        { "shot": "desktop/R06", "note": "1955 drive-in, motor hotel, hydrant; Quapaw dome missing" },
        { "shot": "desktop/R19", "note": "2026 Row uses: brewery, spa with dome, cultural centre, Hotel Hale" },
        { "shot": "desktop/R17", "note": "1931 Craftsman bungalow and Model A" },
        { "shot": "desktop/R16", "note": "1807 trade tents and camp" },
        { "shot": "crops/R17-player", "note": "same shirt and trousers as crops/R03-player: clothing lags architecture" }
      ]
    }
  },
  "gaps": [
    { "id": "G-face-window-directions", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R19", "desktop/R06", "crops/R08-player", "crops/R19-player", "crops/R16-npcs", "crops/R11-npcs"], "benchmark": "seastars-2.jpg", "fix": "Face window only on down and 3/4-down frames (facing half on side frames, never on back), clipped to the head mask; clear hat pixels inside it; give-way rule hides or offsets the whole sprite in one opaque draw (no alpha) and never hides a named NPC (Ezra). Test: zero skin pixels above the brow on back/side frames and no actor drawn with alpha < 1 in R04, R06, R08, R19." },
    { "id": "G-hoe-layering-and-settle", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Draw the tilled decal on the ground layer below actors; add 2 frames lowering the hoe instead of the 5->6 pop; emit a 3-4-frame opaque dust burst of 3-6 art-px clusters visible in frames 4-6; close the hands on the handle at the strike." },
    { "id": "G-ui-crisp-chips-and-overlaps", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R02", "desktop/R04", "mobile/R11", "desktop/R11", "desktop/R01"], "benchmark": "stardew-5.jpg", "fix": "Render slot numerals and stack counts from the 5x7 bitmap font or sprites with no sub-pixel or greyscale antialiasing (test: no fringe hues in chips), drawn above the icons; hide the hotbar under the phone dialogue; keep '(0/15)' on one line; pixel-sprite hearts; backing plate for the title subtitle." },
    { "id": "G-soft-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["desktop/R03", "desktop/R13", "desktop/R07", "desktop/R05"], "benchmark": "chained-5.jpg", "fix": "Re-bake meadow tint and deep-water patches with hard 2-art-px edges and at most 2 tone steps (test: under 25 colours in a 260x190 meadow region of R03); replace translucent path/water and ramp slabs with opaque tiles; quantize window glows, sign halos and lamp-post glow to 2-3 ordered-dither bands. Also worth about +0.5 lighting." },
    { "id": "G-hat-silhouettes-side-back", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/R13", "crops/R17-player", "crops/R19-player", "crops/R06-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "stardew-1.jpg", "fix": "Redraw side and back frames with brim overhang of at most 2-3 art px so shoulders and arms show; pinched fedora crown (Ray), curved bill (Sam), June's ponytail, Walt's knickers and white stockings, Josiah's fur-cap tail." },
    { "id": "G-townsfolk-variety-and-shadows", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "desktop/R19"], "benchmark": "seastars-2.jpg", "fix": "At least 6 townsfolk variants per era (sex, hat, coat, height) replacing the cloned bonnet women; path-constrain townsfolk to streets; add a 1-2-tone opaque contact-shadow ellipse under every person and the player." },
    { "id": "G-walk-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "benchmark": "Rubric animation 7 descriptor", "fix": "Arm swing visible in all four directions (after G-hat-silhouettes-side-back), a 1-art-px body and hat bob on contact frames, 1-px torso rotation on passing frames." },
    { "id": "G-light-falloff-and-grades", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R06", "desktop/R07", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Replace the three concentric lamp rings with irregular dithered falloff that also lifts nearby sprites and facades; per-era warm-to-cool dusk and evening palette grades (18:20 lake must read as evening); pixel puddles or wet sheen on roads in rain. Rain darkening and full-frame fog already exist." },
    { "id": "G-farm-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R17", "desktop/R07", "crops/R15-pen"], "benchmark": "stardew-1.jpg", "fix": "Break farm meadows with worn paths, stumps, rocks, bushes, work areas and era junk so no more than 30% of a farm frame is bare camo; distinct farmyard layout per era; dock posts, shadow and varied lake surface; re-key the goat's green patch." },
    { "id": "G-row-architecture", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R06", "desktop/R19"], "fix": "One consistent Quapaw with its dome from 1922 on; Ozark as Spanish Colonial Revival with twin towers; distinct 1910s-20s brick and stucco bathhouses in the 1931 Row." },
    { "id": "G-human-costume", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R03-player", "crops/R17-player"], "benchmark": "chained-5.jpg", "fix": "Per-person garment construction (seams, folds, deep sun-bonnet brim for Nora), signature props from research/refs/characters.md, and distinct per-era clothing so 1871 and 1931 men do not share a shirt and trousers; test that named people are identifiable in greyscale without labels." },
    { "id": "G-asset-family-shading", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/R15-pen", "crops/R03-field", "crops/R04-player"], "benchmark": "chained-5.jpg; stardew-1.jpg", "fix": "Give people 3-4-step hue-shifted ramps; reduce crop micro-highlights and animal speckle to clustered 3-4-tone shading on a per-era master palette (12 colours or fewer per sprite); one selective-outline rule (darkest ramp shade) across people, animals, props and buildings." }
  ],
  "verdict": "continue"
}
```
