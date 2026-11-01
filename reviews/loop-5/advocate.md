# Advocate: loop 5, tier T32

All capture paths are relative to `games/farm-sim/screenshots/review-loop-5/`. I opened every capture I cite. Where a claim turned on a few pixels, I measured it: nearest-neighbour zooms of the strips, and mean RGB over the same screen region across frames. The zoom crops are throwaway files in the scratchpad.

**Hard gates** (`reviews/loop-5/GATES.md`): tests pass 88/88 on the pixel suite and 88/88 on the painted suite, pixel integrity passes on all 26 captures, and performance is inside budget. Critic B wrote that "the brief does not establish the remaining test gates". GATES.md does establish them, so the loop can be scored.

**Critic means** (A / B → mean):

| Category | A | B | Mean |
|---|---|---|---|
| pixel | 6.5 | 6.0 | 6.25 |
| characters | 5.0 | 5.5 | 5.25 |
| environment | 6.5 | 6.5 | 6.5 |
| lighting | 5.5 | 6.0 | 5.75 |
| animation | 5.0 | 5.5 | 5.25 |
| ui | 6.0 | 6.5 | 6.25 |
| readability | 6.5 | 6.5 | 6.5 |
| authenticity | 6.5 | 6.0 | 6.25 |

Critic A's category scores sum to 47.5. Critic B's headline says 49, but its category scores sum to 48.5, and the category scores are what count.

## Plain factual errors

**Critic A**

1. **"No authored grass tufts"** (pixel, about `desktop/R03`). Wrong.
   - `crops/R03-field` shows dozens of dark-green, 3–5 px chevron tuft sprites scattered over the meadow around the plot.
   - `crops/R04-row` shows the same tufts on the lawn behind the Row, and `crops/R03-player` has one at the top left.
   - The base tile is speckled (true), but the tufts exist.
2. **"No vertical body bob"** in the walk (`strips/R13`). Wrong.
   - I measured the top row of the dark hat outline in each of the eight frames:
     - frames 1, 5 and 6: y = 66;
     - frames 2, 3, 4, 7 and 8: y = 70.
   - The strip is drawn at about 4 capture px per art pixel, so the whole figure bobs by 1 art pixel in a regular up/down pattern.
   - The hat doesn't move relative to the head (true).
3. **"The freshly tilled tile is drawn over Nora's hem and feet, a z-order error"** (`strips/R14`). Not supported.
   - At 16× zoom, frames 1 (on grass), 3, 4 and 8 have the same hem: the dark hem line and the pale stocking sliver at lower left sit on the same rows.
   - In frames 4 and 8 the soil starts directly below the intact hem line.
   - No feet show below the hem in frame 1 either, so nothing is being covered.
4. **"Rain: no darkening"** (`desktop/R09`). Wrong. The scene is darker than the clear-day frames over the same screen region:
   - grass: mean RGB 92/113/83, against 117/149/87 in `desktop/R04`;
   - road: 118/90/79, against 158/137/118;
   - the windows are lit at 13:20.
   - Puddles and wet sheen are absent (true).
5. **"Dusk barely differs from day"** (`desktop/R06`). Overstated.
   - Grass in the same screen region: 93/94/77, against 117/149/87 in `desktop/R04`. That is a strong desaturating, warm-neutral grade.
   - The windows of the Quapaw, Ozark and Hale are lit warm.
   - The lamp heads are unlit and there are no long shadows. That part stands.
6. **"The 1886 Row is a uniform set of green-roofed Second Empire piles"** (`desktop/R04`). Wrong on the style. In the same frame:
   - FREE BATHS is a single-storey, hip-roofed clapboard building.
   - BATH HOUSE is a yellow frame Queen Anne/Stick design with gables, bargeboards and a cupola.
   - STORE is a red-brick commercial front with an awning.
   - The green-gabled house beside it is Gothic Revival.
   - The walls vary too: white, cream, red brick and yellow.
   - Only the roof colour is uniform.
7. **"`desktop/R07` has no shoreline props"**. A wooden pier runs from the bank about 270 px into the water at centre, and A never mentions it. The new ramp at top left does end in a dark blue-grey waterline band, as the brief describes. It stops at the bank rather than continuing into the water (true).
8. **"Buildings sit on bare lawn with no … walks"**. Wrong as a general claim.
   - `desktop/R19`: every Row building fronts a herringbone brick walk, with flower beds at the foundations.
   - `desktop/R04`: flower beds, lanterns and porch steps meet a cobbled street.
   - `desktop/R17`: the bungalow has an attached outbuilding, a path, a hay bale, a pump, a pickup and a fenced pen beside it.
9. **"At night, buildings and doors are unreadable on phone"** (`mobile/R05`). Half right.
   - The QUAPAW, OZARK and CLUB signs and the lit windows read clearly, so the buildings can be identified.
   - The doors are lost in the dark (true).
10. **"Crop art looks more painterly than the rest"** (`crops/R03-field`). Overstated. The crops carry the same 1 px dark outline and 3–4 step ramps as the props. The cabbages, potatoes and beans are clean clusters.
11. **"Every face is the same"**. Partly wrong.
    - Caleb has a grey beard (`crops/R03-player`, `crops/R15-player`) and Josiah a beard (`crops/R16-npcs`).
    - Hattie has a darker skin tone (`crops/R11-npcs`), and Augustin's portrait shows a moustache (`desktop/R11`).
    - The eye template is shared (true).

**Critic B**

1. **B describes "a lowering sequence" in `strips/R14`**. This error favours the build. The hoe head is lowest at the strike (frame 4). In frames 5–8 it sits slightly higher and stays almost still, so the "lowers to rest over two more frames" in the brief doesn't show in the strip. A is right that frames 5–8 hold almost the same angle.
2. **B calls the hotbar number chips "crisp" (`mobile/R02`)** but misses that slot 5 reads "57". The "5" butts against the sickle blade in `mobile/R12` (both in the pack and in the hotbar) and in `mobile/R05`. On desktop (`desktop/R12`) it is milder.
3. **B scores ui 6.5 without seeing the phone font spacing defect.** It is plainly visible: "fi lls" and "Too l" in `mobile/R12`, "Duva l" and "strawberr ies" in `mobile/R11`.

## Category by category

### 1. pixel: proposed 6.0 (mean 6.25)

**Concede**
- **Checker see-through, `crops/R08-player`:** a grey/near-black checker runs across Nora's eyes, nose and apron and reads as dither noise. It is this loop's new regression. Both critics are right.
- **Character outline rule (`crops/R03-player`):** the bodies have an outer outline but broad flat interior clusters, which differs from the buildings.
- **Profile face window (`strips/R13`, frames 1, 5 and 7):** it leaves a pale skin square at the front edge of the brim.
- **Ground speckle:** the base meadow tile is high-contrast speckle in `desktop/R02`, `desktop/R03` and `desktop/R17`, and so is the snow in `desktop/R10`.
- **HUD icons (B's evidence under ui):** I zoomed the book and backpack buttons in `mobile/R04`. They are smooth, anti-aliased, gradient-shaded emoji at a finer resolution than the art grid. Every capture carries them in the top-right HUD. They sit outside the pixel-craft rule, and neither critic counted them under pixel.

**Rebut**
- **Tufts:** A's "no authored tufts" is wrong (see error 1).
- **Crops:** A's "painterly crops" is overstated. `crops/R03-field` is on the same outline rule as the props.
- **Buildings:** `crops/R04-row` and `crops/R19-row` are genuinely clean, as A says.

A gave 6.5 despite the emoji icons. Taking those into account, the checker, the person/prop outline split and the speckle keep this at 6.0, a little under the mean.

### 2. characters: proposed 5.5 (mean 5.25)

**Concede**
- **Hats:** Caleb's hat is a disc wider than his shoulders (`crops/R03-player`, `crops/R15-player`). Ray's fedora has no pinch (`crops/R05-player`). Sam's cap band sits mid-crown, so it reads as a beanie (`crops/R07-player`).
- **June Vale** reads as a bald boy (`crops/R06-player`).
- **Ezra** is not visible: his label floats over the tent (`crops/R16-npcs`, `desktop/R16`).
- **Walt** has dark full-length trousers, with no knickers or stockings (`crops/R11-npcs`).
- **Clones:** the bonnet women repeat exactly ×3 in `desktop/R08` and ×4 in `desktop/R04` and `desktop/R10`.
- **Nora's bonnet** reads as a pale cap, not a deep sun bonnet (`crops/R04-player`, B).
- **The goat** has green patches on its white coat (`crops/R15-pen`).

**Rebut**
- **Named cast:** the named cast is separable by palette, headwear and facial hair. That is part of the rubric's 7 description, though the critics treat the cast as generic. In `crops/R16-npcs`:
  - Josiah: grey cap, beard, buckskin.
  - Margaux: blue blouse, brown skirt, red-brown head wrap.
  - The centre figure: pale dress.
  - In `crops/R11-npcs`, Hattie has a white cap and dress over a darker skin tone, and Walt a blue cap and white shirt.
- **Faces:** A's "every face is the same" is partly wrong (error 11).
- **Animals:** they are good: shaded cows, a goat and hens with clean outlines (`crops/R15-pen`).

The cast clears the 5 anchor ("readable figures, generic") on palette and headwear, but the hat silhouettes and the clones keep it well short of 7. 5.5 is fair.

### 3. environment: proposed 6.5 (mean 6.5)

**Concede**
- **Empty ground:** the lower halves of `desktop/R03` and `desktop/R17` are open meadow, and `desktop/R07` is about 75% water.
- **Prop shadows:** the wagon in `desktop/R15` has an oversized dark ellipse.
- **No backdrop:** there is no mountain behind the Row.
- **Fence (B):** the fence in `crops/R15-pen` is plainer than the buildings, though its posts do have lit and shaded faces.

**Rebut**
- **R07:** A overlooked the pier (error 7).
- **Bare lawn:** A's "bare lawn, no walks" is wrong (error 8).
- **Dressing:** `desktop/R15` (pump, wagon, crate, pen with five animals, creek, plank bridge, buggy), `desktop/R17` and `desktop/R16` (two tents, a fire ring, a creek, trees) are reasonably dressed scenes, not sparse ones.

Both critics landed on 6.5, and the evidence supports that.

### 4. lighting: proposed 6.0 (mean 5.75)

**Concede**
- **Night pools:** they are 3–4 hard concentric bands (zoom of `desktop/R05`, also `mobile/R05`). On grass they go bright yellow-green.
- **Facades:** they drop to near black.
- **Sprite response:** the fedora NPC beside the Quapaw lamp stays grey.
- **Dusk lamps:** they are unlit at dusk (`desktop/R06`).
- **Evening water:** `desktop/R07` has no sun glint.
- **Rain:** `desktop/R09` has no puddles or splashes.

**Rebut**
- **Rain darkening:** "no darkening" in rain is wrong (error 4).
- **Dusk grade:** "dusk barely differs" is wrong (error 5). B's reading, that dusk is separated, is the correct one.
- **Rubric 7:** the anchor asks for "era light sources … weather moods; light kept on-grid (banded or dithered)". The build meets those parts:
  - Era light sources: five-globe clusters and a neon CLUB sign in 1931 (`desktop/R05`); gas lanterns in 1886 (`desktop/R04`); Victorian posts in 2026 (`desktop/R19`).
  - Weather moods: fog wash with spring steam (`desktop/R08`); snow roofs and wash (`desktop/R10`); the rain grade.
  - The pools are banded on the grid.
- **What's missing:** coherent shadows and sprite response, which A is right about.

6.0 sits between the 5 and 7 anchors and a quarter point over the mean.

### 5. animation: proposed 5.5 (mean 5.25)

**Concede**
- **Walk (`strips/R13`):**
  - Frames 3 and 5 are near-duplicate leg poses.
  - There is no arm swing.
  - The profile brim hides the torso.
- **Hoe (`strips/R14`):**
  - No lean-back or squash.
  - The dust is a flat tan bar that grows instead of breaking up.
  - Frames 5–8 hold the same hoe angle; the hoe even sits slightly higher than at the strike, not lower.

**Rebut**
- **Bob:** A's "no body bob" is wrong. There is a 1 art px bob (error 2).
- **Body motion:** "the body never moves" in the hoe action is overstated. Frame 1 shows the arm raised beside the head holding the hoe behind it. By frame 4 both arms are down in front, gripping the shaft. The shoulders and hands change pose.
- **Z-order:** A's tilled-tile error is not supported (error 3).
- **B's 5.5:** B's account of wind-up, strike, soil change and dust is accurate, apart from the "lowering".

That is a basic cycle with a small amount of secondary motion, on the 5 anchor with real extras. 5.5.

### 6. ui: proposed 6.0 (mean 6.25)

**Concede**
- **Phone font gaps** (`mobile/R11`, `mobile/R12`).
- **Emoji HUD icons** (zoom of `mobile/R04`; B).
- **Portrait:** it is an upscaled walking sprite in a detached box, on desktop (`desktop/R11`) as well as on phone (`mobile/R11`).
- **Nameplates:** they collide: JOSIAH/TRADE/MARGAUX, with EZRA floating (`desktop/R16`); the AUGUSTIN label sits over his head (`desktop/R11`).
- **Shop:** it is flat rows (`desktop/R18`).

**Rebut**
- **Desktop type:** the type is crisp, with no gap in "Duval" (`desktop/R11`).
- **Era HUD frames:** they are distinct in each era, as both critics say.
- **Shop finish:** the shop does have native-pixel item icons and a 1955 teal-and-cream frame, so it is not a raw web table (`desktop/R18`).

The mobile font defect, which B missed, outweighs those points. 6.0, matching A.

### 7. readability: proposed 6.5 (mean 6.5)

**Concede**
- **"57"** on slot 5 (`mobile/R12`, `mobile/R05`).
- **Labels over heads** (`desktop/R11`).
- **Checker over the player's face** (`crops/R08-player`).
- **Tall crops overlap** (`crops/R03-field`, B).

**Rebut**
- **Phone at night:** night on phone is not unreadable (error 9).
- **Player:** always findable, with large controls (`mobile/R04`, `mobile/R13`).

Both critics gave 6.5; keep it.

### 8. authenticity: proposed 6.5 (mean 6.25)

**Concede**
- **Quapaw dome:** the Quapaw has no dome in 1955 (`desktop/R06`), and in 1931 either (`desktop/R05`, which A did not cite). The dome appears in 2026 (`desktop/R19`). That is an internal anachronism across two eras.
- **Clothing misses:** Nora's bonnet (`crops/R04-player`), Walt's knickers (`crops/R11-npcs`), June Vale (`crops/R06-player`).

**Rebut**
- **1886 Row:** "uniform 1886 Row" is wrong (error 6).
- **Era sorting:** the eras are each recognisable and grounded in specific references, which is the rubric's 7 description for buildings:
  - 1807: tents and a log cabin (`desktop/R16`, `desktop/R02`).
  - 1871: board-sided Valley Street (`desktop/R09`).
  - 1886: mixed Victorian Row (`desktop/R04`).
  - 1931: five-globe lamps, neon, Model-A-style pickup and Craftsman bungalow (`desktop/R05`, `desktop/R17`).
  - 1955: Googie drive-in, motor hotel and fire hydrant (`desktop/R06`).
  - 2026: adaptive-reuse Row and farmers' market (`desktop/R19`).
- **Clothing:** clothing holds it back.

6.5 is A's score and a quarter point over the mean, inside the band.

## Proposed total

6.0 + 5.5 + 6.5 + 6.0 + 5.5 + 6.0 + 6.5 + 6.5 = **48.5 / 80**. No category meets its visual gate except authenticity (≥ 6). Verdict: continue.

## Gap adjustments

**Gains overlap.** A's hat and identity gaps overlap B's G-human-construction. A's walk and hoe gaps overlap B's G-motion-weight. A's night gap overlaps B's G-night-form. A's ground and dressing gaps overlap B's G-terrain-and-dressing. The gains below are not additive within those pairs.

**Changed severity or gain**

| Gap | Critic's value | Advocate's value | Reason |
|---|---|---|---|
| G-walk-cycle-6f | sev 4, +1.0 | sev 3, +0.5 | The 1 px bob already exists. What remains is arm swing, torso visibility and de-duplicating frames 3 and 5. |
| G-night-dusk-light | +1.0 | sev 4 kept, +0.75 | The dusk grade and the rain darkening already exist. |
| G-hoe-feel | sev 3, +0.5 kept | sev 3, +0.5 kept | Drop the tilled-decal z-order clause, which `strips/R14` does not support. Add that the post-strike frames should actually lower. |
| G-ground-clusters | sev 3, +0.5 kept | sev 3, +0.5 kept | Cause corrected: tufts exist (`crops/R03-field`). The defect is the high-contrast speckle in the base tile. |
| G-row-per-era | sev 3, +0.5 | sev 2, +0.25 | The Quapaw dome is valid for 1931 and 1955. The "uniform 1886 Row" half is wrong per `desktop/R04`. |
| G-hotbar-numerals | +0.5 | sev 2 kept, +0.25 | One small item. |
| G-weather-ground | +0.5 | sev 2 kept, +0.25 | Rain already darkens the ground; only puddles and splashes are missing. |
| G-human-construction | sev 5, +1.5, L | sev 4, +1.0 | Named people are already separable by palette and headwear. +1.5 from one L-effort loop is optimistic. |
| G-terrain-and-dressing | sev 4, +1 | sev 3, +0.5 | `desktop/R15`, `R16`, `R17` and `R19` are dressed. The empty areas are the lower meadows and the lake. |
| G-motion-weight | sev 4, +1 | sev 4 kept, +0.75 | |
| G-night-form | sev 4, +1 | sev 4 kept, +0.75 | |
| G-cluster-cohesion | sev 4, +1 | sev 3, +0.5 | Buildings and crops already share one outline rule. The split is people against props, plus the checker. |
| G-hat-silhouettes | +1.0 | sev 4 kept, +0.75 | Overlaps G-human-construction. |

**Kept as the critics proposed:** G-character-identity, G-checker-occlusion, G-mobile-font-metrics, G-portrait-nameplates, G-scene-dressing, G-sort-order, G-ui-finish, G-period-clothing.

**Sort-order check:** I confirmed G-sort-order in `crops/R15-player`. The trough's lower rim covers the top of Caleb's hat disc.

```json
{
  "loop": 5,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R08-player", "note": "conceded: 50% checker of the lamp post runs across Nora's face and apron as dither noise"},
        {"shot": "crops/R03-field", "note": "rebuts A: authored 3-5 px grass tufts are present; crops carry the same 1 px outline as props"},
        {"shot": "crops/R04-row", "note": "clean building clusters and ramps; tufts on the lawn"},
        {"shot": "mobile/R04", "note": "zoom: book and backpack HUD icons are anti-aliased gradient emoji, off the art grid (B's evidence, uncounted in pixel)"},
        {"shot": "strips/R13", "note": "profile face window leaves a skin square at the brim edge"}
      ]
    },
    "characters": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R16-npcs", "note": "Josiah (cap, beard, buckskin) and Margaux (blue blouse, brown skirt, red wrap) separable by palette and headwear; Ezra not visible (conceded)"},
        {"shot": "crops/R11-npcs", "note": "Hattie passes; Walt has no knickers or stockings (conceded)"},
        {"shot": "crops/R03-player", "note": "hat disc wider than shoulders (conceded); grey beard shows faces are not all identical"},
        {"shot": "crops/R06-player", "note": "June Vale reads as a bald boy (conceded)"},
        {"shot": "desktop/R10", "note": "four identical bonnet-woman clones (conceded)"},
        {"shot": "crops/R15-pen", "note": "animals cleanly shaded; goat has green patches"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R19", "note": "herringbone walk and flower beds at every facade, rebutting A's 'bare lawn, no walks'"},
        {"shot": "desktop/R15", "note": "pump, wagon, crate, pen with animals, creek, plank bridge, buggy; oversized wagon shadow conceded"},
        {"shot": "desktop/R07", "note": "about 75% water (conceded) but a wooden pier A overlooked; ramp ends in a dark waterline at the bank"},
        {"shot": "desktop/R03", "note": "lower meadow open (conceded)"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "era five-globe lamps and neon, banded on-grid pools; concentric rings and grey NPC in a pool conceded"},
        {"shot": "desktop/R06", "note": "grass mean 93/94/77 vs 117/149/87 at day in desktop/R04, windows lit: dusk is graded; lamps unlit (conceded)"},
        {"shot": "desktop/R09", "note": "rain darkens: grass 92/113/83, road 118/90/79 vs 158/137/118 in R04; no puddles (conceded)"},
        {"shot": "desktop/R08", "note": "fog wash and spring steam"},
        {"shot": "desktop/R10", "note": "snow roofs and wash"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "measured 1 art px body bob (hat top y=66 in frames 1/5/6, y=70 in 2/3/4/7/8), rebutting 'no bob'; frames 3 and 5 near-duplicate, no arm swing (conceded)"},
        {"shot": "strips/R14", "note": "arms change from raised (frame 1) to gripping low (frame 4); hem intact above the tilled tile (no z-order error); dust bar and frozen frames 5-8 conceded"},
        {"shot": "strips/R13-mobile", "note": "same cycle on phone"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R12", "note": "phone font gaps 'fi lls', 'Too l' (missed by B); slot 5 reads '57'"},
        {"shot": "mobile/R11", "note": "'Duva l', 'strawberr ies'; portrait detached from the box"},
        {"shot": "desktop/R11", "note": "crisp desktop type; upscaled-sprite portrait; label over Augustin's head"},
        {"shot": "desktop/R18", "note": "flat rows but native-pixel icons and a 1955 teal frame"},
        {"shot": "desktop/R16", "note": "JOSIAH/TRADE/MARGAUX labels collide, EZRA floats"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R05", "note": "QUAPAW, OZARK and CLUB signs and lit windows read at night; doors dim; slot 5 reads '57'"},
        {"shot": "mobile/R04", "note": "player findable, large controls"},
        {"shot": "crops/R03-field", "note": "stages and ripe sparkles clear; tall crops overlap"},
        {"shot": "crops/R08-player", "note": "checker hides the player's face (conceded)"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R04", "note": "1886 Row is mixed: clapboard Free Baths, Queen Anne Bath House, brick Hot Baths, brick Store; rebuts 'uniform Second Empire'"},
        {"shot": "desktop/R19", "note": "2026 adaptive-reuse Row and farmers' market; Quapaw dome present"},
        {"shot": "desktop/R05", "note": "five-globe lamps, neon club; Quapaw domeless in 1931 (anachronism, conceded)"},
        {"shot": "desktop/R06", "note": "Googie drive-in, motor hotel, hydrant; Quapaw domeless in 1955 (conceded)"},
        {"shot": "crops/R04-player", "note": "Nora's bonnet reads as a cap (conceded)"}
      ]
    }
  },
  "gaps": [
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R07-player", "crops/R17-player"], "benchmark": "seastars-2", "fix": "Per-kind hat sprites: fedora with pinched crown and snapped brim; slouch hat brim no more than 1.3x head width; ball cap with a 3-4 px forward bill; fur cap with tail; knotted scarf; 1886 short-bill cap. Narrow brims in profile so the torso shows. Overlaps G-human-construction."},
    {"id": "G-walk-cycle-6f", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "benchmark": "stardew-1", "fix": "A 1 px bob already exists. Add a 2-pose arm swing and 1 px hat and hair lag, de-duplicate frames 3 and 5, and show the torso under a narrower profile brim."},
    {"id": "G-night-dusk-light", "category": "lighting", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05", "desktop/R06", "desktop/R07"], "benchmark": "seastars-2", "fix": "Lamp pools as one warm hue in 2 bands with a dithered edge (multiply, not hue replace on grass); window spill on the street; warm tint on sprites inside pools; light the lamp heads at dusk; sun-glint column on evening water. The dusk grade already exists."},
    {"id": "G-character-identity", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "crops/R16-npcs", "crops/R06-player", "crops/R11-npcs"], "benchmark": "chained-5", "fix": "Vary ambient NPC palettes and garments; ponytail for June Vale, knickers and stockings for Walt, visible Ezra with stick; 2-3 eye and mouth variants per person."},
    {"id": "G-hoe-feel", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14"], "benchmark": "stardew-1", "fix": "1-2 px lean-back on wind-up, 1 px squash and 2-frame hold on impact, make frames 5-8 actually lower the hoe to rest, and replace the dust bar with 3-4 puff clusters plus soil chips that shrink over 4 frames. (The tilled-tile z-order clause is dropped: the hem is intact in strips/R14.)"},
    {"id": "G-checker-occlusion", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "desktop/R08"], "fix": "Skip see-through for thin props like lamp posts; for canopies and buildings, show the hidden player as a 1 px player-coloured outline instead of checkering the occluder across the face."},
    {"id": "G-ground-clusters", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R02", "desktop/R10"], "benchmark": "stardew-1", "fix": "Cause corrected: authored tufts already exist (crops/R03-field). Lower the contrast of the base meadow and snow tiles and remove isolated single-pixel speckle so the tufts carry the texture."},
    {"id": "G-mobile-font-metrics", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R11", "mobile/R12", "mobile/R01"], "fix": "Use per-glyph advance widths at integer scale on mobile, the same metrics as desktop, so 'l', 'i' and '.' leave no gaps."},
    {"id": "G-portrait-nameplates", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS6", "evidence": ["desktop/R11", "desktop/R16"], "benchmark": "stardew-5", "fix": "48x48 bust portraits for the named cast, attached to the dialogue frame; show the nameplate only for the nearest or targeted NPC, with collision offset."},
    {"id": "G-scene-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07"], "benchmark": "stardew-1", "fix": "Dress the open lower meadows (fences, woodpiles, bushes, stumps) and the lake (reeds, rocks, boat, buoys; carry the ramp into the water); wooded mountain backdrop behind the Row. The town fronts already have walks and beds (desktop/R19, desktop/R04)."},
    {"id": "G-row-per-era", "category": "authenticity", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R06", "desktop/R19"], "fix": "Give the Quapaw its 1922 dome in 1931 and 1955. The 1886 Row already mixes clapboard, brick and Queen Anne (desktop/R04), so the 'vary 1886 materials' part is dropped."},
    {"id": "G-hotbar-numerals", "category": "readability", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R12", "mobile/R05", "desktop/R12"], "fix": "Put slot numerals on a dark backing chip with a 1 px gap from the icon, or move them to the slot frame; hide them on touch. Slot 5 plus sickle reads '57'."},
    {"id": "G-weather-ground", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R09"], "benchmark": "chained-5", "fix": "Rain already darkens the scene; add puddle tiles with highlight pixels and splash sprites."},
    {"id": "G-sort-order", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/R15-player"], "fix": "Sort sprites by foot y; treat fence-mounted props like the trough as part of the fence layer so they never cover the player's hat (confirmed in crops/R15-player)."},
    {"id": "G-human-construction", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R16-npcs", "crops/R11-npcs"], "benchmark": "chained-5.jpg", "fix": "Direction-specific headwear, garment layers, stocking breaks and individual posture, starting with Nora, Josiah and Walt. Overlaps G-hat-silhouettes and G-character-identity."},
    {"id": "G-terrain-and-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R07", "desktop/R17", "crops/R15-pen"], "benchmark": "stardew-1.jpg", "fix": "Quiet the grass texture, vary water clusters, dress the open farm zones, and improve fence and dock construction. Overlaps G-ground-clusters and G-scene-dressing."},
    {"id": "G-motion-weight", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile", "strips/R14"], "benchmark": "pixel-anchors.md section 3.5, Stardew-level motion anchor", "fix": "Torso counter-motion, grounded footsteps, body compression at impact, a real recovery that lowers the hoe, and changing dust clusters. Overlaps G-walk-cycle-6f and G-hoe-feel."},
    {"id": "G-night-form", "category": "lighting", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "Raise entrance and NPC values at night, obstacle-aware light shapes, directional shadows and selective highlights. Overlaps G-night-dusk-light."},
    {"id": "G-cluster-cohesion", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/R03-player", "crops/R04-row", "crops/R08-player"], "benchmark": "chained-5.jpg", "fix": "Bring people onto the outline and cluster rule that buildings and crops already share; preserve the player's face under foreground occlusion."},
    {"id": "G-ui-finish", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R11", "desktop/R18"], "benchmark": "stardew-5.jpg; seastars-4.jpg", "fix": "Replace the anti-aliased emoji book and backpack icons with native-grid icons, integrate portraits into dialogue frames, refine era-specific panel frames and compact the phone HUD."},
    {"id": "G-period-clothing", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["crops/R04-player", "crops/R16-npcs", "crops/R11-npcs"], "benchmark": "research/refs/characters.md and period reference panels", "fix": "Audit visible people against the five checklist features: Nora's deep sun bonnet, Josiah's hunting outfit, Walt's knickers and stockings; add readable signature props."}
  ],
  "verdict": "continue"
}
```
