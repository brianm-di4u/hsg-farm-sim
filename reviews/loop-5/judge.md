# Judge: loop 5, tier T32

Capture paths are relative to `games/farm-sim/screenshots/review-loop-5/`. I made nearest-neighbour zoom crops in the session scratchpad, `loop-5/`:
- `r13-hats.png`: walk-strip hat tops, side by side.
- `r14-hem-f1.png`, `r14-hem-f4.png`: hoe-strip hem against the tilled tile.
- `r05-quapaw.png`: 1931 night lamp and windows.
- `r07-ramp.png`, `r07-deep.png`: the lake ramp and the deep-water edge.
- `r03-meadow.png`: meadow tile.
- `r17-truckshadow.png`: prop shadow.
- `m12-text.png`, `m12-icons.png`, `m12-slot5.png`: phone text, HUD icons and slot 5.

## Inputs and gates

- **Category sums:**
  - Critic A (critic-claude): 47.5.
  - Critic B (critic-codex): 48.5. Its headline "49" is wrong, and the category scores are what count.
  - Advocate: 48.5.
- **Spread:** no category differs by more than 1.0 between the critics; the widest gap is 0.5 (pixel, characters, lighting, animation, ui, authenticity). The advocate disputed 14 facts, so I checked each one against the captures myself.
- **Hard gates** (`reviews/loop-5/GATES.md`, `reviews/loop-5/perf.json`):
  - **Tests:** 88/88 pixel and 88/88 painted. B's "the brief does not establish the remaining test gates" is void.
  - **Pixel integrity:** passes on all 26 captures.
  - **Performance:** desktop min 405 fps. Phone 4×: min 74 fps, median p95 ≤ 41.9 ms. Phone 6×: min 47 fps. Heap 9.5 MB. All inside budget. The 201 ms first-visit p95 run at 6× in the snow town is logged but not gated.
  - **Result:** the loop is scored.

## Disputed facts: my rulings

1. **Grass tufts (`crops/R03-field`, zoom `r03-meadow.png`).** The advocate is right: dark 3–5 px chevron tufts are scattered over the meadow. A's "no authored tufts" is wrong. The base tile is still a high-contrast speckle.
2. **Walk bob (`strips/R13`, zoom `r13-hats.png`).** The advocate is right that a bob exists: the hat top sits one art pixel higher in frames 1, 5 and 6 than in frames 2–4 and 7–8. The rhythm is irregular, not a clean contact/passing alternation. The hat is rigid on the head, and there is no arm swing.
3. **Tilled tile over the hem (`strips/R14`, zooms `r14-hem-f1/f4.png`).** Not supported, so the advocate is right. In frame 4 the soil starts directly below an intact hem line. Frame 1 on grass shows no feet below the hem either. Side note: the front-view dress figure has no visible feet at all, which is a character-sprite issue, not a z-order bug.
4. **Hoe "lowers to rest" (`strips/R14`).** A and the advocate are right; B is wrong. In frames 5–8 the hoe holds almost the same angle as at the strike, so the brief's two-frame settle does not read. The dust is a flat tan horizontal bar that grows across frames 4–8 and never breaks up.
5. **Rain darkening (`desktop/R09`).** The advocate is right. Grass and road are visibly greyer and darker than in `desktop/R04`, and the windows are lit at 13:20. There are no puddles, sheen or splashes, and the streaks are sparse.
6. **Dusk (`desktop/R06`).** The advocate and B are right that it is graded: desaturated, with the Superior, Quapaw, Ozark and Hale windows lit warm. A is right on the rest: no orange key, no long shadows, unlit lamp heads. It reads as an overcast afternoon rather than 19:10.
7. **1886 Row "uniform Second Empire" (`desktop/R04`, `desktop/R10`).** The advocate is right. The Row mixes a clapboard Free Baths, a cream Second Empire Baths, a red-brick Hot Baths, a yellow Queen Anne Bath House, a brick store front and a Gothic cottage. Only the green roofs repeat.
8. **R07 shore props (`desktop/R07`, zoom `r07-ramp.png`).** The advocate is right: there is a plank pier at centre, which A missed. The ramp is an opaque two-tone slab with a dark waterline. It sits flat across the bank, not running down into the water. 80% of the frame is still open water with no reeds, rocks or boats.
9. **Buildings on "bare lawn, no walks".** Wrong as a general claim:
   - Herringbone walk and foundation beds in `desktop/R19`.
   - Path, pump, hay, crate and pen around the bungalow in `desktop/R17`.
   - The farm lower halves are still open meadow (`desktop/R17`, `desktop/R03`).
10. **Night phone readability (`mobile/R05`).** Half right, as the advocate says. Signs and lit windows identify the buildings; doors and unlit figures are lost.
11. **"Every face is the same".** Partly wrong, as the advocate says. The eye template is shared, but Caleb and Josiah have beards and Hattie's skin is darker (`crops/R03-player`, `crops/R16-npcs`, `crops/R11-npcs`).
12. **Phone font and "57" (`mobile/R12`, `mobile/R11`; zooms `m12-text.png`, `m12-slot5.png`).**
    - A is right and B missed both defects.
    - "fi lls", "Too l", "Duva l", "hote l" and "strawberr ies" all have gaps after narrow glyphs.
    - The zoom also shows the phone body text drawn with 1-device-px strokes and grey antialiased edge pixels. It is not an integer-scaled bitmap face.
    - Slot 5 reads "57", in the pack and the hotbar alike.
13. **HUD emoji icons (`mobile/R12`, zoom `m12-icons.png`; also on every desktop frame).** Confirmed: the book and backpack are smooth, gradient-shaded emoji at device resolution, off the art grid.
14. **Quapaw dome.** Confirmed: no dome in 1931 (`desktop/R05`) or 1955 (`desktop/R06`), a tiled dome in 2026 (`desktop/R19`).

## New findings (neither critic)

- **Night glows are still soft (`desktop/R05`, zoom `r05-quapaw.png`).**
  - The two window lanterns beside each sign are feathered orbs.
  - A soft glow runs down the lamp post.
  - The five globes themselves are drawn unlit (grey and white) at 21:30.
  - The 300×290 crop holds 1,002 colours.
  - Light is not kept on the art grid here.
- **The lake's deep-water patch edge is a smooth curve stepped at 1 screen px, finer than the art pixel, with a darker soft rim (`desktop/R07`, zoom `r07-deep.png`).**
- **Prop shadows are oversized translucent ellipses with sub-grid edges (`desktop/R17` truck, zoom `r17-truckshadow.png`; also the wagon in `desktop/R15`).**
- **Sort order:** the fence trough is drawn over Caleb's hat (`crops/R15-player`). This confirms A's gap.

## Category rulings

### 1. Pixel: 6.0
- **What holds:**
  - The grid is legal, and the buildings are near the 7 anchor: clean outlines and hue-shifted ramps (`crops/R04-row`, `crops/R19-row`, `desktop/R17`).
  - Crops share the props' outline rule (`crops/R03-field`). A's "painterly" is overstated.
  - The hotbar chips are now clean.
- **What fails:**
  - The new 50% checker drops a dark mesh across Nora's face and apron (`crops/R08-player`).
  - Off-grid soft light remains: window orbs and post glow (`desktop/R05`).
  - Off-grid water edges and translucent shadow ellipses (`desktop/R07`, `desktop/R17`).
  - Emoji HUD icons in every frame.
  - People use broad flat clusters while buildings carry fine texture (`crops/R03-player`).
  - The meadow and snow base tiles are high-contrast speckle (`desktop/R03`, `desktop/R10`).
- **Score:** rubric 5 ("one grid, but noisy clusters ... inconsistent outlines between asset families") plus one step for building craft. B and the advocate are right; A's 6.5 did not count the soft overlays or the emoji icons. Below `stardew-1.jpg`.

### 2. Characters: 5.0
- **What works:**
  - The profile face window no longer cuts a skin band across hats; front faces read under brims (`crops/R03-player`, `crops/R06-player`).
  - Named people separate by palette and headwear: Josiah, Margaux, Hattie, Walt (`crops/R16-npcs`, `crops/R11-npcs`).
  - The animals are better than the people (`crops/R15-pen`).
- **What fails:**
  - Every hat is a disc. Caleb's is wider than his shoulders (`crops/R03-player`, `crops/R15-player`).
  - June Vale reads as a bald boy (`crops/R06-player`).
  - Ezra is absent under his label (`crops/R16-npcs`).
  - Walt wears full-length dark trousers (`crops/R11-npcs`).
  - Nora's bonnet reads as a pale cap (`crops/R08-player`).
  - The bonnet women are four exact clones (`desktop/R04`, `desktop/R10`).
  - Figures have no feet below dresses (`strips/R14`).
- **Score:** this is the 5 anchor as written: "readable figures, generic; few checklist features". Nobody is identifiable by silhouette, which the 7 anchor requires. A is closer than B. The advocate's 5.5 credits palette separation that the 5 anchor already covers.

### 3. Environment: 6.5
- **Strong:**
  - Dressed town fronts: benches, barrels, lanterns, beds, herringbone walk, market pavilion (`desktop/R04`, `desktop/R19`).
  - The 1931 bungalow yard, with pickup, pump and pen (`desktop/R17`).
  - The board-sided 1871 street (`desktop/R09`).
  - Snow roofs (`desktop/R10`).
- **Weak:**
  - The lower farm meadows are empty (`desktop/R03`, `desktop/R17`).
  - The lake is 80% open water with one pier and no shore dressing (`desktop/R07`).
  - No mountain backdrop behind the Row.
  - Oversized prop shadows.
- **Score:** both critics and the advocate gave 6.5, and the captures support it. Below `stardew-1.jpg` in farm composition.

### 4. Lighting: 5.5
- **For the build:**
  - Era light sources: five-globe lamps and neon CLUB in 1931 (`desktop/R05`); gas lanterns in 1886 (`desktop/R04`).
  - Weather moods: fog and steam (`desktop/R08`), snow (`desktop/R10`).
  - Rain darkens the scene (`desktop/R09`), and dusk is graded (`desktop/R06`).
- **Against the 7 anchor:**
  - Light is not kept on-grid: soft window orbs and post glow (`desktop/R05`, new finding).
  - The pools are 3–4-ring bullseyes that turn the grass bright yellow-green.
  - The globes are drawn unlit at night, and no sprite responds to a pool (the fedora NPC stays grey).
  - Dusk has no warm key, and the 18:20 lake is daylit (`desktop/R07`).
  - Shadows are generic translucent ellipses.
- **Score:** two of the anchor's four conditions are met, and the on-grid one fails visibly. A's 5.5 stands even after its two factual errors (rain, dusk) are corrected. B and the advocate's 6.0 did not check the glows at pixel level.

### 5. Animation: 5.5
- **Walk (`strips/R13`, `strips/R13-mobile`):**
  - About four leg poses, and frames 3 and 5 are near-duplicates.
  - A 1 art px bob exists but is irregular (fact 2).
  - No arm swing; the profile brim hides the torso.
- **Hoe (`strips/R14`):**
  - Wind-up over the head in frames 1–2, arms gripping low at the strike in frame 4, grass to soil on impact.
  - The hoe no longer vanishes; it stays in hand.
  - But there is no lean or squash, frames 5–8 are frozen, and the dust is one flat bar.
- **Score:** the 5 anchor with real extras. B and the advocate are right; A's 5.0 rested partly on "no bob" and the unsupported z-order claim.

### 6. UI: 6.0
- **What works:**
  - Desktop type is a crisp bitmap face (`desktop/R12`, `desktop/R18`).
  - Per-era frame colourways: 1931 navy and gold, 1955 cream and teal, 2026 blue (`desktop/R05`, `desktop/R18`, `desktop/R19`).
  - Native-pixel shop icons (`desktop/R18`).
  - Crisp new hotbar chips.
- **What fails:**
  - Phone body text has gaps after narrow glyphs and is drawn at 1 device px with antialiased edges (`mobile/R12`, `mobile/R11`).
  - Emoji HUD icons (`mobile/R12`).
  - The portrait is the walk sprite in a box detached from the dialogue panel (`mobile/R11`, `desktop/R11`).
  - Nameplates collide (JOSIAH, TRADE and MARGAUX) and EZRA floats (`desktop/R16`).
  - The shop is a list of flat rows (`desktop/R18`).
- **Score:** A and the advocate are right; B's 6.5 missed the phone font defect. Rubric 7 asks for "pixel-crisp ... fonts per era", which the phone text does not meet.

### 7. Readability: 6.5
- **What reads:**
  - The player is always findable, the controls are large and signs read (`mobile/R04`, `mobile/R13`).
  - Crop stages and ripe sparkles are distinct (`crops/R03-field`).
  - At night, the signs and windows identify the buildings (`mobile/R05`).
- **Against:**
  - Slot 5 reads "57" (`mobile/R12`).
  - The checker hides the player's face (`crops/R08-player`).
  - Labels sit over heads (`desktop/R11`).
  - Tall corn and wheat columns merge (`crops/R03-field`).
  - Doors and unlit figures are lost at night on phone (`mobile/R05`).
- **Score:** 6.5, as all three proposed.

### 8. Authenticity: 6.5 (gate ≥ 6 met, evidence from five chapters)
- **Grounded buildings; the eras sort blind:**
  - 1807 cabin and tents (`desktop/R02`, `desktop/R16`).
  - 1871 board-sided Valley Street (`desktop/R09`).
  - A mixed Victorian 1886 Row (`desktop/R04`).
  - 1931 Craftsman bungalow and Model-A pickup (`desktop/R17`).
  - 1955 Googie drive-in and motor hotel (`desktop/R06`).
  - 2026 adaptive reuse: brewery, spa, cultural centre, Hotel Hale, farmers' market (`desktop/R19`).
- **Against:**
  - The Quapaw has no dome in 1931 or 1955 (`desktop/R05`, `desktop/R06`), though the dome dates from 1922.
  - Clothing misses the checklist: Nora's bonnet, Walt's knickers, June Vale (`crops/R08-player`, `crops/R11-npcs`, `crops/R06-player`).
- **Score:** A and the advocate are better supported than B, whose 6.0 under-credited the varied 1886 Row.

**Total: 47.5** (loop 4: 47.0, +0.5). Every category except authenticity is below its gate. Verdict: **continue**.

## Ranked gaps (top 12, by expected gain ÷ effort)

1. **G-occlusion-and-sort** (pixel, WS1, sev 3, S, +0.5)
   - **Problem:**
     - The 50% checker of a dark lamp post covers the player's face (`crops/R08-player`).
     - The trough is drawn over Caleb's hat (`crops/R15-player`).
   - **Fix:**
     - Exempt occluders under 6 art px wide (lamp posts, fence posts) from see-through.
     - For canopies, tall crops and buildings, keep the occluder opaque and draw the hidden player as a 1-art-px outline in the player's darkest shirt colour.
     - Sort actors and fence-mounted props by foot y.
   - **Test:** no checker pixel inside the player's head box in `crops/R08-player`; the trough sits behind the hat in `crops/R15-player`.
2. **G-night-dusk-light** (lighting, WS4, sev 4, M, +1.0)
   - **Problem:** bullseye pools, unlit globes, no sprite response, and a dusk and evening that read as day (`desktop/R05`, `desktop/R06`, `desktop/R07`).
   - **Fix:**
     - Lamp pools as one warm hue in 2 bands with a 1-band ordered-dither edge, multiplied over the ground rather than hue-replaced.
     - Draw the globes lit (palette-swap to the light-yellow ramp) from dusk on.
     - Add a trapezoid of window spill on the street.
     - Apply a +1 ramp-step warm tint to sprites inside a pool.
     - At dusk: an orange key grade and 4–6 art px cast shadows. At evening on the lake: a sun-glint column of 2–3 dithered bands.
   - **Test:** pool regions hold at most 3 distinct tints, and the NPC in a pool is warmer than one outside it.
3. **G-mobile-font-metrics** (ui, WS6, sev 3, S, +0.5)
   - **Problem:** gaps after narrow glyphs, and 1-device-px antialiased strokes on phone (`mobile/R12`, `mobile/R11`).
   - **Fix:** render phone body text from the bitmap font at an integer 2× device scale with per-glyph advance widths and smoothing off.
   - **Test:** no grey edge pixels in "Tool" (`m12-text.png` region), and no gap wider than 1 font px inside "fills", "Duval" or "strawberries".
4. **G-hoe-settle-and-dust** (animation, WS5, sev 3, S, +0.5)
   - **Problem:** frozen frames 5–8, a flat dust bar and no body weight (`strips/R14`).
   - **Fix:**
     - Frames 5–8 must lower the hoe head by at least 3 art px per frame to a resting pose.
     - Add a 1–2 px lean-back on the wind-up, and a 1 px squash with a 2-frame hold at impact.
     - Replace the dust bar with 3–4 opaque puff clusters plus 2–3 soil chips that drift up and shrink over 4 frames.
   - The tilled-decal z-order clause from A is dropped (fact 3).
5. **G-hud-icons-and-numerals** (ui, WS6, sev 3, S, +0.5)
   - **Problem:** emoji book and backpack icons in every frame (`mobile/R12`), and slot 5 reads "57" (`mobile/R12`, `desktop/R04`).
   - **Fix:**
     - Replace the HUD emoji with 12–16 art px native sprites drawn on the 4-colour HUD palette.
     - Give the slot numerals a dark 1-px-padded backing chip with a 1-art-px gap from the icon, or move them into the slot frame. Hide them on touch.
6. **G-hat-silhouettes** (characters, WS2, sev 4, M, +0.75)
   - **Problem:** every hat is a disc, and brims hide the torso in profile (`crops/R03-player`, `crops/R05-player`, `crops/R07-player`, `strips/R13`).
   - **Fix:** per-kind hat sprites in every direction:
     - fedora with a pinched crown and snapped brim (Ray);
     - slouch hat no wider than 1.3× the head (Caleb);
     - ball cap with a 3–4 px bill toward the facing direction (Sam);
     - fur cap with a tail (Josiah);
     - deep sun bonnet with a projecting brim (Nora).
   - In side and back frames the brim may overhang by at most 2–3 art px so the shoulders and arms show.
7. **G-soft-overlays** (pixel, WS1 with WS4, sev 3, M, +0.5 pixel, +0.25 lighting)
   - **Problem:** off-grid soft rendering in three places (`desktop/R05`, `desktop/R07`, `desktop/R17`):
     - window orbs and post glow;
     - deep-water edges at sub-art-pixel steps;
     - translucent shadow ellipses.
   - **Fix:**
     - Quantize the glows to 2–3 ordered-dither bands on the art grid.
     - Re-bake the deep-water patch masks at art-pixel resolution with an opaque 1-tone rim.
     - Draw prop shadows as opaque one-step-darker art-pixel ellipses no wider than the prop's footprint plus 2 px.
   - **Test:** at most 60 colours in the `r05-quapaw.png` crop region; edge steps at multiples of the art pixel in `r07-deep.png`.
8. **G-character-identity-and-clothing** (characters, WS2 with WS7, sev 3, M, +0.5 characters, +0.25 authenticity)
   - **Problem:** clone crowds (`desktop/R04`, `desktop/R10`), a missing Ezra (`crops/R16-npcs`), a bald June Vale (`crops/R06-player`), Walt in trousers (`crops/R11-npcs`), and no feet under dresses (`strips/R14`).
   - **Fix:**
     - At least 4 palette and garment variants for ambient townsfolk, with no two adjacent ones identical.
     - Render Ezra with a walking stick.
     - Give June Vale a ponytail, and Walt knickers and white stockings.
     - Add 2 boot pixels below dress hems in front and ¾ frames.
     - Give each named person 2–3 eye and mouth variants.
9. **G-walk-cycle** (animation, WS5, sev 3, M, +0.5)
   - **Problem:** about four leg poses with frames 3 and 5 duplicated, an irregular bob and no arm swing (`strips/R13`, `strips/R13-mobile`).
   - **Fix:** a 6-frame walk with a 1 px drop on both contact frames only, a 2-pose arm swing visible below a narrowed profile brim, and a 1 px hair or hat lag on the frame after contact.
10. **G-quapaw-dome** (authenticity, WS7, sev 2, S, +0.25)
    - **Problem:** the Quapaw has no dome in 1931 and 1955 but has one in 2026 (`desktop/R05`, `desktop/R06` vs `desktop/R19`).
    - **Fix:** reuse the 2026 tiled-dome sprite on the 1931 and 1955 Quapaw (dome built 1922), with era signage kept.
11. **G-rain-ground** (lighting, WS4, sev 2, S, +0.25)
    - **Problem:** rain already darkens the scene, but the ground doesn't react (`desktop/R09`).
    - **Fix:**
      - Puddle tiles on the road with 1–2 highlight pixels.
      - 2–3-frame splash sprites where drops land.
      - Double the streak density.
12. **G-farm-and-lake-dressing** (environment, WS3, sev 3, M, +0.5)
    - **Problem:** empty lower meadows (`desktop/R03`, `desktop/R17`), and a lake that is 80% open water (`desktop/R07`). Tufts already exist.
    - **Fix:**
      - Lower the base meadow and snow tile contrast by one ramp step and remove isolated single-pixel speckle.
      - Add 6–10 props per farm screen: fence runs, woodpile, stumps, bushes.
      - Add reeds, rocks, a moored boat and buoys along the lake shore, and run the ramp down into the water.
      - Paint a wooded mountain backdrop behind the Row.

Not kept in the top 12: 48×48 bust portraits and the nameplate collision offset (ui, L, +0.5), and a unified outline rule for people (covered in part by gaps 6 and 8).

```json
{
  "loop": 5,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R19-row", "note": "buildings near the 7 anchor: clean outlines and hue-shifted ramps"},
        {"shot": "crops/R08-player", "note": "new 50% checker of a dark lamp post covers Nora's face and apron"},
        {"shot": "desktop/R05", "note": "zoom r05-quapaw.png: feathered window orbs and post glow, 1,002 colours in a 300x290 crop"},
        {"shot": "desktop/R07", "note": "zoom r07-deep.png: deep-water edge stepped at 1 screen px with a soft rim, off the art grid"},
        {"shot": "desktop/R17", "note": "zoom r17-truckshadow.png: oversized translucent shadow ellipse with sub-grid edge"},
        {"shot": "mobile/R12", "note": "zoom m12-icons.png: gradient emoji HUD icons off the grid"},
        {"shot": "crops/R03-field", "note": "authored tufts exist; crops share the props' outline rule; base meadow speckle"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R03-player", "note": "mushroom-disc slouch hat wider than the shoulders; front face reads; beard"},
        {"shot": "crops/R06-player", "note": "June Vale reads as a bald boy"},
        {"shot": "crops/R16-npcs", "note": "Josiah and Margaux separable by palette; Ezra absent under his label"},
        {"shot": "crops/R11-npcs", "note": "Hattie passes; Walt in full-length trousers; shared eye template"},
        {"shot": "desktop/R10", "note": "four identical bonnet-woman clones"},
        {"shot": "crops/R15-pen", "note": "animals better shaded than the people"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R19", "note": "herringbone walk, beds, market pavilion, varied restored facades"},
        {"shot": "desktop/R04", "note": "mixed Victorian Row with benches, barrels, lanterns"},
        {"shot": "desktop/R17", "note": "dressed bungalow yard but empty lower meadow"},
        {"shot": "desktop/R07", "note": "80% open water, one pier, ramp flat on the bank, no shore dressing"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "era lamps and neon; bullseye pools tint grass; globes drawn unlit; soft off-grid window orbs; NPC in pool stays grey"},
        {"shot": "desktop/R06", "note": "dusk is a desaturated grade with lit windows but no warm key, unlit lamps"},
        {"shot": "desktop/R09", "note": "rain darkens the scene; no puddles or splashes"},
        {"shot": "desktop/R08", "note": "fog wash and spring steam"},
        {"shot": "desktop/R07", "note": "18:20 lake is daylit, no glint"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "zoom r13-hats.png: irregular 1 art px bob; about four leg poses, frames 3 and 5 near-duplicate, no arm swing"},
        {"shot": "strips/R14", "note": "wind-up, low grip at strike, soil change, hoe stays in hand; frames 5-8 frozen, dust a flat bar; no z-order error"},
        {"shot": "strips/R13-mobile", "note": "same cycle on phone"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R12", "note": "crisp desktop bitmap type, 1931 navy and gold frame, clean chips"},
        {"shot": "mobile/R12", "note": "zoom m12-text.png: 1-device-px antialiased strokes, gaps in 'fi lls', 'Too l'; emoji HUD icons"},
        {"shot": "mobile/R11", "note": "'Duva l', 'strawberr ies'; portrait detached from the panel"},
        {"shot": "desktop/R16", "note": "JOSIAH/TRADE/MARGAUX plates collide, EZRA floats"},
        {"shot": "desktop/R18", "note": "flat shop rows, though native-pixel icons and a 1955 frame"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "player findable, signs legible, large controls"},
        {"shot": "crops/R03-field", "note": "stages and ripe sparkles distinct; tall columns merge"},
        {"shot": "mobile/R12", "note": "slot 5 reads '57'"},
        {"shot": "crops/R08-player", "note": "checker hides the player's face"},
        {"shot": "mobile/R05", "note": "signs and windows read at night; doors and figures lost"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R04", "note": "1886 Row mixes clapboard, Second Empire, brick, Queen Anne and Gothic"},
        {"shot": "desktop/R19", "note": "correct 2026 adaptive reuse: brewery, spa, cultural centre, Hotel Hale, market"},
        {"shot": "desktop/R17", "note": "1931 Craftsman bungalow and Model-A pickup"},
        {"shot": "desktop/R06", "note": "1955 Googie drive-in and motor hotel; Quapaw domeless (anachronism)"},
        {"shot": "desktop/R05", "note": "five-globe lamps and neon; Quapaw domeless in 1931"},
        {"shot": "crops/R11-npcs", "note": "clothing misses the checklist (Walt)"}
      ]
    }
  },
  "gaps": [
    {"id": "G-occlusion-and-sort", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "crops/R15-player"], "fix": "Exempt occluders under 6 art px wide (lamp and fence posts) from see-through; for canopies, tall crops and buildings keep the occluder opaque and draw the hidden player as a 1-art-px outline in the player's darkest shirt colour; sort actors and fence-mounted props by foot y. Test: no checker pixel in the player's head box in crops/R08-player; trough behind the hat in crops/R15-player."},
    {"id": "G-night-dusk-light", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R06", "desktop/R07", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Lamp pools as one warm hue in 2 bands with a 1-band ordered-dither edge, multiplied (not hue-replaced); globes palette-swapped to lit from dusk; window spill trapezoids on the street; +1 ramp-step warm tint on sprites inside a pool; dusk orange key grade with 4-6 art px cast shadows; sun-glint column of 2-3 dithered bands on the evening lake. Test: at most 3 tints per pool; the NPC in a pool is warmer than one outside it."},
    {"id": "G-mobile-font-metrics", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R12", "mobile/R11"], "fix": "Render phone body text from the bitmap font at integer 2x device scale with per-glyph advance widths and smoothing off. Test: no grey edge pixels in 'Tool' and no gap wider than 1 font px inside 'fills', 'Duval', 'strawberries'."},
    {"id": "G-hoe-settle-and-dust", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Frames 5-8 lower the hoe head at least 3 art px per frame to a resting pose; 1-2 px lean-back on wind-up; 1 px squash and 2-frame hold at impact; replace the dust bar with 3-4 opaque puff clusters plus 2-3 soil chips that drift up and shrink over 4 frames. (The tilled-decal z-order clause is dropped: the hem is intact in strips/R14.)"},
    {"id": "G-hud-icons-and-numerals", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R12", "desktop/R04"], "fix": "Replace the emoji book and backpack HUD icons with 12-16 art px native sprites on the HUD palette; give slot numerals a dark 1-px-padded backing chip with a 1-art-px gap from the icon (or move them into the slot frame) and hide them on touch, so slot 5 no longer reads '57'."},
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R07-player", "strips/R13"], "benchmark": "seastars-2.jpg", "fix": "Per-kind hat sprites in every direction: fedora with pinched crown and snapped brim (Ray); slouch hat no wider than 1.3x the head (Caleb); ball cap with a 3-4 px bill toward the facing direction (Sam); fur cap with tail (Josiah); deep sun bonnet with projecting brim (Nora). Side and back brims overhang by at most 2-3 art px so shoulders and arms show."},
    {"id": "G-soft-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["desktop/R05", "desktop/R07", "desktop/R17", "desktop/R15"], "fix": "Quantize window orbs and lamp-post glow to 2-3 ordered-dither bands on the art grid; re-bake deep-water patch masks at art-pixel resolution with an opaque 1-tone rim; draw prop shadows as opaque one-step-darker art-pixel ellipses no wider than the footprint plus 2 px. Test: at most 60 colours in the r05-quapaw crop region; water edge steps at multiples of the art pixel. Also worth about +0.25 lighting."},
    {"id": "G-character-identity-and-clothing", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "crops/R16-npcs", "crops/R06-player", "crops/R11-npcs", "strips/R14"], "benchmark": "chained-5.jpg", "fix": "At least 4 palette and garment variants for ambient townsfolk with no two adjacent identical; render Ezra with a walking stick; ponytail for June Vale; knickers and white stockings for Walt; 2 boot pixels below dress hems in front and 3/4 frames; 2-3 eye and mouth variants per named person. Also worth about +0.25 authenticity."},
    {"id": "G-walk-cycle", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "benchmark": "stardew-1.jpg", "fix": "6-frame walk with a 1 px drop on both contact frames only (replacing the irregular bob), a 2-pose arm swing visible under a narrowed profile brim, de-duplicated frames 3 and 5, and a 1 px hair or hat lag on the frame after contact."},
    {"id": "G-quapaw-dome", "category": "authenticity", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R06", "desktop/R19"], "fix": "Reuse the 2026 tiled-dome sprite on the 1931 and 1955 Quapaw (dome built 1922), keeping each era's signage."},
    {"id": "G-rain-ground", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R09"], "benchmark": "chained-5.jpg", "fix": "Rain already darkens the scene; add puddle tiles on the road with 1-2 highlight pixels, 2-3-frame splash sprites where drops land, and double the streak density."},
    {"id": "G-farm-and-lake-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R17", "desktop/R07", "desktop/R10"], "benchmark": "stardew-1.jpg", "fix": "Lower base meadow and snow tile contrast one ramp step and remove isolated single-pixel speckle (tufts already exist); add 6-10 props per farm screen (fence runs, woodpile, stumps, bushes); reeds, rocks, a moored boat and buoys along the lake shore, with the ramp running into the water; wooded mountain backdrop behind the Row."}
  ],
  "verdict": "continue"
}
```
