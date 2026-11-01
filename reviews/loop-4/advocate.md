# Advocate: loop 4, tier T32

Paths are relative to `games/farm-sim/screenshots/review-loop-4/`. I opened every capture cited below. For the disputed claims I also zoomed with nearest-neighbour scaling and took mean HSV value (V) and saturation (S, 0–255) over matching regions. Critic A (critic-claude) category sum: 47.0. Critic B (critic-codex) category sum: 47.5. B's stated "48" doesn't count. Critic mean: 47.25.

**Hard gates.** B wrote that "an all-tests-green result was not supplied". It was: `reviews/loop-4/GATES.md` records 88/88 on the pixel suite and 88/88 on the painted suite, pixel integrity passing on all 26 captures, and performance inside budget. B's caveat is settled, so the loop can be scored.

## Facts a critic got plainly wrong

1. **A, rain "no darkening" (`desktop/R09`).** Wrong. Across the playfield (y 120–700), R09 measures V 100 / S 64. The 1871 farm by day measures V 135 / S 101 (`desktop/R13`) and V 134 / S 99 (`desktop/R03`). Rain is about 26% darker and 37% less saturated, and you can see it: the timber fronts and road are visibly greyer than in the dry frames. A's other points stand: there are no puddles or sheen.
2. **A, fog "on the right half while the town on the left stays almost clear" (`desktop/R08`).** Wrong. The left-hand town block (x 100–740, y 120–330) measures S 50 in R08, against S 111 for the same block in clear `desktop/R04`, and V rises from 123 to 159. The veil covers the whole frame and is thicker over the springs on the right, which is where the vapour should be densest. B's reading, "a pale veil that reduces material separation across the scene", is the correct one.
3. **A, "legs vanish during the rise" (`strips/R14`).** Wrong cause. The actor is Ada (1807), and her dress has no visible legs in any frame. That includes the idle pose in `desktop/R14` (zoomed: the hem sits directly on the ground with no feet) and the settle frames 6–8. Frames 1–2 aren't losing legs that exist elsewhere.
4. **A, "tilled tile drawn over the player's lower body and feet" (`strips/R14`).** Partly right, but overstated. There are no feet to cover. Comparing frame 1 with frame 6 (same head height), the hem stops about 3 art px higher once the soil decal appears, so the decal clips the bottom of the hem. That is a real draw-order bug, but a small one.
5. **A, Caleb's hat "about 1.6× the shoulder width" (`crops/R03-player`).** Overstated. Measured in the close-up, the brim is about 285 px wide, the torso about 200 px, and the span across the hands about 240 px. That is about 1.4× the torso and 1.2× the full width. Seen from the front, the face shows clearly under the brim. The real problem is the side and back walk frames (`strips/R13`), where the disc hides the torso.
6. **A, "corn and wheat are the same stalk stacked four times" (`crops/R03-field`).** Wrong cause. Each column is four planted tiles of the same crop at the same stage, one plant per tile, and each tall plant overlaps the tile above. That is how a planted row reads in the benchmark farms too. It isn't a sprite defect.
7. **A, "the shop panel overlaps the goals HUD" (`desktop/R18`).** Severity overstated. The shop is a modal over a dimmed backdrop. The HUD behind it is darkened along with the world. That is normal modal behaviour, not two live panels colliding.
8. **A, JOSIAH / TRADE / MARGAUX "collide" (`crops/R16-npcs`).** Overstated. The three plates touch edge to edge but don't overlap, and every letter can be read.
9. **B, walk "alternating strides and arm positions" (`strips/R13`, `strips/R13-mobile`).** Wrong. No arm can be seen in any of the 16 frames, because the hat disc covers the whole upper body. Only the legs alternate. A is correct here.
10. **B, hoe "subsequent settling particles" (`strips/R14`).** Overstated. Frames 7–8 contain only two or three single scattered pixels beside the tile. In frames 4–5, where the brief says the puff should be, I can't find one. A is correct.

## Category by category

### 1. Pixel: A 5.5, B 6 (mean 5.75). Proposed 5.5
- **Concede to A, soft overlays.** Zoomed, `desktop/R13` has a light horizontal tint band with feathered edges across the lower-left meadow, and `desktop/R03` has a soft dark blob right of the player (x 660–960, y 240–440). The edges are gradients, not the crisp 2-px patches the brief promised. `desktop/R14` has the same soft dark halo around the bushes.
- **Concede to A, translucent shore pieces.** `desktop/R07` (zoomed, x 960–1200) shows a translucent rectangle where the herringbone path meets the water, with waves visible through it, and a washed-out grey slab at the top-left ramp.
- **Concede to A, night glows.** In `desktop/R05` (zoomed on the Quapaw), the two window lanterns are blurred orbs and a soft glow runs down the lamp post.
- **Rebut B.** B wrote "rather than demonstrated resampling failure" and gave the overlays no weight. The overlays above are the non-grid soft light the rubric penalises, so B's 6 doesn't account for them.
- **Partly concede to A, asset families.** The family mismatch is visible. Leaf-level crops in `crops/R03-field` and speckle-shaded cows in `crops/R15-pen` sit beside flat 2–3-tone people in `crops/R04-player`. But the colour counts (501 in a crop-bed region) are weak evidence. Those regions include the soil, the grass and the global tint, so they overstate per-sprite palettes.
- **For the build.** The grid itself is clean. Building craft in `crops/R04-row` (mansards, brackets, coursing, crisp pixel signage) is close to the 7 anchor.
- **Score.** 5.5: one grid, but with soft overlays and inconsistent asset families.

### 2. Characters: A 4.5, B 5 (mean 4.75). Proposed 4.5
- **Concede to A, face window.** In `desktop/R04` (zoomed, x 780–1140), all three bonnet women seen from behind or the side carry a skin block with an eye pixel pasted onto the side of the bonnet, and one has a brown block across it. In `desktop/R19` the woman on the lawn by the crate has a skin rectangle on the back of her hair. The walker on the left has a stray eye pixel on the back of her head.
- **More evidence for A's overlap point.** `desktop/R06`: the blue-hatted townsperson at the far left (x 150–260) is drawn as two overlapping translucent figures, the same remnant A found in `crops/R08-player`. In `crops/R08-player` the fedora townsperson behind Nora is drawn half-transparent across her face and apron.
- **Concede to A, named NPCs.**
  - No Ezra sprite anywhere under his label (`desktop/R16`, `crops/R16-npcs`).
  - Augustin is a white back view in his own dialogue (`crops/R11-npcs`). His portrait in the dialogue box (`desktop/R11`, `mobile/R11`) is front-facing, with toque and face.
- **Concede to A, silhouettes.**
  - Ray's fedora is an unpinched grey dome (`crops/R17-player`).
  - Sam's cap has no bill, a grey-brown band across it, and blue pixels inside the face by the eye (`crops/R19-player`).
  - June has a bowl cut and no ponytail (`crops/R06-player`).
  - Walt has long dark trousers and a white beard (`crops/R11-npcs`).
  - Josiah's cap reads as a flat cap (`crops/R16-npcs`).
- **Concede to B.** Nora's bonnet is shallow, not a deep sun bonnet (`crops/R04-player`).
- **Rebut A, scope.** A's score ignores the animals, and the rubric includes them in this category. The cows and hens in `crops/R15-pen` have volume, anatomy and contact shadows near the 7 anchor. B notices this. The goat's green patch is real.
- **Rebut A, named people.** Front-facing named people do read apart by headwear and palette: Hattie's white cap and dress, Margaux's red scarf and blue shirt, Nora's bonnet and apron, Augustin's toque in the portrait, Walt's blue cap and white beard (`crops/R11-npcs`, `crops/R16-npcs`). This loop's front-facing faces work: eyes show under every brim in `crops/R04-player`, `crops/R03-player` and `crops/R17-player`.
- **Score.** The rendering bugs reach named people (Ezra hidden, Augustin turned away, Nora ghosted), so I don't argue above the mean. 4.5.

### 3. Environment: A 6.5, B 6 (mean 6.25). Proposed 6.5
- **Concede to both, farms and lake.**
  - The farm frames are mostly empty camo meadow (`desktop/R13`, `desktop/R15`, `desktop/R17`, lower halves).
  - The 1871 and 1931 farmyards share the crate, path, fence, trough and pump positions (`desktop/R13` vs `desktop/R17`).
  - The lake is one repeated caustic net, and the dock has no posts (`desktop/R07`).
  - The goat patch is real (`crops/R15-pen`).
- **Rebut B, "sparse intermediate dressing" in town.** `desktop/R04` has benches, barrels, hanging lanterns at every corner and flower beds at each porch. `desktop/R19` has a stocked farmers' market, a planter, a produce crate and solar panels on the roof. `desktop/R16` has a winding stream, two tents with patches and a cookpot tripod, a campfire ring, and oaks. `desktop/R02` has a cabin with chimney and porch, barrels, a crate, a woodpile, a fire pit, rocks and bushes. These town and camp frames are dressed. The sparse ones are the farm interiors and the lake.
- **Rebut A, stacked crops.** See fact 6.
- **Score.** A's 6.5 fits better: town and camp scenes approach the 7 anchor, farms sit around 5.5–6.

### 4. Lighting: A 5.5, B 5.5 (mean 5.5). Proposed 6.0
- **Concede to both.**
  - The lamp pools are three concentric rings (`desktop/R05`, `mobile/R05`).
  - The window glows are blurred.
  - People have no contact shadow, while props and animals do (`desktop/R04` barrels and player, `crops/R15-pen`).
  - The 18:20 lake is only mildly graded: shore grass is V 121 against V 141 by day, with the same saturation (`desktop/R07` vs `desktop/R19`).
- **Rebut A, two of five weaknesses are wrong.** Rain does darken and desaturate (fact 1), and fog covers the whole view (fact 2). With those corrected, the scenes carry real weather moods.
  - Rain: about 26% darker, plus streaks (`desktop/R09`).
  - Fog: a frame-wide veil with steam columns over the spring pools (`desktop/R08`).
  - Snow: on roofs, lawns and path edges, with falling flakes (`desktop/R10`).
- **Partly rebut A on dusk.** "Dull afternoon" (`desktop/R06`) undersells it. The 1955 dusk grass is V 94 / S 63 against V 141 / S 106 at midday (`desktop/R04`, `desktop/R19`), a strong grade. What it lacks is warm-to-cool character, which B describes accurately as "a broad muted tint".
- **For the build, era light sources.** Hanging lanterns in 1886 (`desktop/R04`), five-globe standards in 1931 (`desktop/R05`) and slim mid-century streetlights in 1955 (`desktop/R06`). The pools are banded on the grid.
- **Score.** Against the 7 anchor (era light sources, weather moods, coherent shadows, on-grid), two of four are met, and the shadows and glows fall short. 6.0.

### 5. Animation: A 5.5, B 6 (mean 5.75). Proposed 5.5
- **Concede to A, walk (`strips/R13`, `strips/R13-mobile`).** I can't see arm swing or a hat bob. The hat hides the torso.
- **Concede to A, hoe (`strips/R14`).** The hoe disappears between frames 5 and 6. The dust is negligible. In frame 4 the hands don't close around the handle.
- **Rebut A.** The vanishing legs aren't a bug in the rise (fact 3). The decal clips about 3 art px of hem, not feet (fact 4).
- **For the build.** The swing has a readable wind-up with the hoe raised behind the head (frames 1–2) and a lowered strike pose (frame 4). The tile turns from grass to soil exactly at impact (frames 3→4).
- **Rebut B's upward argument.** It rests on arm motion that can't be seen (fact 9) and particles that are almost absent (fact 10).
- **Score.** 5.5.

### 6. UI: A 6.5, B 6.5 (mean 6.5). Proposed 6.5
- **Concede.**
  - The slot 7 and 8 numbers are partly covered by the seed-packet icons, and 4 and 5 by the tool heads (`desktop/R02`, zoomed).
  - "(0/15)" wraps onto its own line (`desktop/R11`).
  - The hearts are thin outline glyphs (`desktop/R11`).
  - The subtitle is faint over the title art (`desktop/R01`).
  - On the phone, hotbar slots 1–2 show under the dialogue (`mobile/R11`), and the joystick is a translucent smooth shape (`mobile/R04`).
  - B is right that the portrait is a small detached box (`mobile/R11`), and that the HUD book and pack symbols are plainer than the inventory icons (`mobile/R04`).
- **Rebut A, R18.** The goals HUD isn't overlapping the shop. It is dimmed behind a modal (fact 7).
- **For the build.**
  - Per-era frames: navy and gold in 1931 (`desktop/R12`), cream and teal in 1955 (`desktop/R18`), navy in 2026 (`desktop/R19`).
  - The 5×7 pixel face is crisp on desktop.
  - The shop hen is the hen sprite at native size (`desktop/R18`).

### 7. Readability: A 6.5, B 6.5 (mean 6.5). Proposed 6.5
- **Concede.**
  - The phone HUD takes the top 19% of the screen (`mobile/R04`, down to y ≈ 320 of 1688).
  - A lamp post crosses a townswoman's face (`desktop/R06`), and in the walk the player passes behind a post (`strips/R13`).
  - Nora's face is muddied in fog (`crops/R08-player`).
  - The ripe markers are tiny 2×2 dots (`crops/R03-field`).
- **Rebut A, labels.** They abut but don't overlap (fact 8).
- **Partly rebut B, `mobile/R05`.** Unlit façades are dark, but the townsperson in the lamp pool by the Quapaw reads clearly, and so do the player, the CLUB sign and the benches.

### 8. Authenticity: A 6.5, B 6 (mean 6.25). Proposed 6.5
- **Concede to A.**
  - The Quapaw has no dome in 1931 (`desktop/R05`) or 1955 (`desktop/R06`) but has one in 2026 (`desktop/R19`), and it is a different building between those eras.
  - The Ozark is a temple front, not Spanish Colonial Revival with twin towers.
  - The 1931 Row reads as darkened silhouettes.
- **Concede to B.** Caleb in 1871 and Ray in 1931 wear the same red shirt and blue trousers (`crops/R03-player`, `crops/R17-player`).
- **For A's higher score.** The 2026 Row's uses match the real Row: Superior as a brewery, Quapaw as a spa, Ozark as a cultural centre, Hale as Hotel Hale (`desktop/R19`). 1871 has board-and-batten false fronts with VAPOR BATHS, STAGE and DRUGS (`desktop/R09`). 1955 has a Googie drive-in, a motor hotel with a pole sign, lane stripes and a hydrant (`desktop/R06`). 1931 has a Craftsman bungalow and a Model A pickup (`desktop/R17`). 1807 has a log cabin and trade tents (`desktop/R02`, `desktop/R16`).
- **Score.** Every era is recognisable and grounded at the building level, and clothing trails behind. 6.5.

## Gap adjustments (no new gaps)
- **G-face-window-directions:** stands at severity 5. `desktop/R06` gives a second translucent remnant.
- **G-asset-family-palette:** lowered to severity 3, gain 0.5. The colour-count evidence counts the tint and the ground. It overlaps B's G-cluster-consistency.
- **G-hat-silhouettes:** lowered to severity 3. The 1.6× figure is overstated, and front faces already show. The side frames are the real problem.
- **G-hoe-layering-and-settle:** drop "keep the legs during the wind-up" (fact 3). The decal clip is about 3 art px of hem. The pop and the dust fixes stand.
- **G-time-of-day-weather:** severity unchanged, but the cause is corrected. Drop "rain darkening" and "fog across the whole view", because both exist (facts 1–2). What remains: warm/cool dusk and evening grades, puddles or sheen, and falloff pools in place of rings.
- **G-ui-overlaps:** drop the R18 item (fact 7). The rest stands.
- **G-human-costume (B):** lowered to severity 4, gain 1.0. The biggest visible character failures are rendering bugs covered by G-face-window-directions. The costume work overlaps G-hat-silhouettes.
- **G-purposeful-dressing (B):** lowered to severity 3, gain 0.5. The town and camp frames are dressed. The deficit is on farm interiors and the lake, which overlaps G-empty-meadow.
- **G-night-surface-light (B):** lowered to severity 3, gain 0.5. It overlaps G-soft-overlays (glows) and G-time-of-day-weather (pools).
- **G-cluster-consistency (B):** lowered to severity 3, gain 0.5. It overlaps G-asset-family-palette.
- **G-body-mechanics (B):** gain lowered to 0.5. Its walk evidence is wrong (fact 9). Upper-body motion in the walk can't be seen until G-hat-silhouettes is fixed.
- **G-ui-material-portrait (B):** lowered to severity 2.

Proposed total: 47.5 (critic mean 47.25). Every category is still below its gate. Verdict: continue.

```json
{
  "loop": 4,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "desktop/R13", "note": "zoomed: feathered light tint band across the lower-left meadow, not crisp 2-px patches (concede A)" },
        { "shot": "desktop/R03", "note": "soft dark blob right of the player (concede A); B missed the overlays" },
        { "shot": "desktop/R07", "note": "zoomed: translucent slab at the path/water junction, grey ramp slab at the top left" },
        { "shot": "desktop/R05", "note": "zoomed: blurred lantern orbs and glow on the lamp post by the Quapaw" },
        { "shot": "crops/R04-row", "note": "clean building clusters and pixel signage close to the 7 anchor; the grid holds" },
        { "shot": "crops/R15-pen", "note": "animal speckle shading differs from flat people (asset-family mismatch real; the colour-count metric is weak)" }
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "desktop/R04", "note": "zoomed: skin block and eye pixel on the side of every bonnet seen from behind (concede A)" },
        { "shot": "desktop/R06", "note": "far-left townsperson drawn as two overlapping translucent figures; more support for A's overlap-remnant point" },
        { "shot": "crops/R08-player", "note": "half-transparent townsperson over Nora's face (concede A)" },
        { "shot": "crops/R16-npcs", "note": "no Ezra sprite under his label; Margaux reads; Josiah's cap reads as a flat cap" },
        { "shot": "crops/R11-npcs", "note": "Augustin from behind; Hattie and Walt distinct by headwear and palette; Walt lacks knickers" },
        { "shot": "crops/R15-pen", "note": "cows and hens near the 7 anchor (volume, contact shadows), ignored in A's character score" },
        { "shot": "crops/R03-player", "note": "front face shows under the brim; hat about 1.4x the torso, not 1.6x" }
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R16", "note": "1807 camp densely dressed: stream, patched tents, cookpot tripod, fire ring, oaks" },
        { "shot": "desktop/R19", "note": "stocked farmers' market, planter, crate, solar roof; rebuts B's sparse frontage" },
        { "shot": "desktop/R04", "note": "benches, barrels, corner lanterns, porch flower beds" },
        { "shot": "desktop/R17", "note": "same yard layout as desktop/R13 (concede); era props swapped: Craftsman, Model A, hay" },
        { "shot": "desktop/R07", "note": "repeated caustic net, dock without posts (concede)" },
        { "shot": "crops/R03-field", "note": "one plant per tile; a planted row, not a stacked-sprite defect (rebut A)" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "desktop/R09", "note": "rain V 100 / S 64 vs V 135 / S 101 for the 1871 day farm (desktop/R13): darkening exists, A wrong" },
        { "shot": "desktop/R08", "note": "town block S 50 vs S 111 in desktop/R04: the fog covers the whole frame, A wrong; steam over the pools" },
        { "shot": "desktop/R10", "note": "snow on roofs, lawns and path edges, falling flakes" },
        { "shot": "desktop/R06", "note": "dusk grass V 94 / S 63 vs V 141 / S 106 at midday; graded but not warm-to-cool" },
        { "shot": "desktop/R05", "note": "era five-globe lamps, banded on-grid pools; but bullseye rings and blurred window orbs (concede)" },
        { "shot": "desktop/R07", "note": "evening only about 14% darker than day (concede A)" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/R14", "note": "wind-up, crouch strike, tile turns at impact; hoe pops away at 5->6, dust negligible (concede A); legs never exist on Ada (rebut A)" },
        { "shot": "strips/R13", "note": "only the legs alternate; no arm can be seen under the hat (B wrong)" },
        { "shot": "strips/R13-mobile", "note": "same cycle, no visible upper-body motion" },
        { "shot": "desktop/R14", "note": "idle Ada: the hem meets the ground, no feet in any pose" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "desktop/R02", "note": "zoomed: slot 7 and 8 numbers partly under the icons (concede)" },
        { "shot": "desktop/R18", "note": "modal over a dimmed HUD, not a collision (rebut A); hen sprite at native size" },
        { "shot": "desktop/R12", "note": "1931 navy and gold frame, crisp pixel face; flat 2-px border" },
        { "shot": "mobile/R11", "note": "hotbar peeks under the dialogue; small detached portrait (concede both)" },
        { "shot": "desktop/R11", "note": "(0/15) wraps; outline heart glyphs (concede)" }
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "mobile/R04", "note": "HUD stack reaches y about 320 of 1688 (19%); player and objective legible" },
        { "shot": "mobile/R05", "note": "townsperson in the lamp pool, player, CLUB sign and benches read at night (partly rebuts B)" },
        { "shot": "crops/R16-npcs", "note": "name plates abut but don't overlap; all legible (rebut A)" },
        { "shot": "desktop/R06", "note": "lamp post across a townswoman's face (concede)" },
        { "shot": "crops/R08-player", "note": "face muddied by the translucent remnant (concede)" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "desktop/R19", "note": "2026 uses match the real Row: Superior brewery, Quapaw spa, Ozark cultural centre, Hotel Hale" },
        { "shot": "desktop/R09", "note": "1871 board-and-batten false fronts: VAPOR BATHS, STAGE, DRUGS" },
        { "shot": "desktop/R06", "note": "1955 Googie drive-in, motor hotel pole sign, hydrant, lane stripes; Quapaw dome missing (concede A)" },
        { "shot": "desktop/R17", "note": "1931 Craftsman bungalow and Model A pickup" },
        { "shot": "crops/R17-player", "note": "same red shirt and blue trousers as crops/R03-player (concede B)" }
      ]
    }
  },
  "gaps": [
    { "id": "G-face-window-directions", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R19", "desktop/R06", "crops/R08-player", "crops/R19-player", "desktop/R16"], "benchmark": "seastars-2.jpg", "fix": "Apply the face window only to down and three-quarter frames (never back, facing side only on side frames), clip it to the head mask, clear leftover hat pixels inside it; the overlap rule must hide or offset the whole sprite with no translucent remnant (R08, R06), and never hide a named NPC (Ezra). Unchanged; R06 adds evidence." },
    { "id": "G-asset-family-palette", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R15-pen", "crops/R04-player"], "benchmark": "chained-5.jpg", "fix": "Bring the shading language of crops, animals and people together (3-4-step ramps on people, fewer micro-highlights on crops). Lowered: the region colour counts include soil, grass and global tint, and this overlaps G-cluster-consistency." },
    { "id": "G-soft-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["desktop/R13", "desktop/R03", "desktop/R14", "desktop/R07", "desktop/R05"], "benchmark": "chained-5.jpg", "fix": "Snap meadow tint bands and deep-water patches to 2-art-px edges with 2 tone steps or fewer; replace the translucent path/water slabs with opaque art; quantize window glows and halos to 2-3 dithered bands. Confirmed as stated." },
    { "id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/R13", "crops/R17-player", "crops/R19-player", "crops/R06-player"], "benchmark": "stardew-1.jpg", "fix": "Redraw the hat kinds (pinched fedora, billed cap, slouch brim within 2-3 px) with priority on side and back frames, where the torso is hidden; add June's ponytail, Walt's knickers and stockings, the tail on Josiah's cap. Lowered: 1.6x is overstated (about 1.4x the torso) and front faces already show." },
    { "id": "G-townsfolk-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "At least 6 per-era townsfolk variants, kept on streets, with contact shadows under all people. Unchanged." },
    { "id": "G-hoe-layering-and-settle", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "benchmark": "stardew-1.jpg", "fix": "Draw the tilled decal below the actor (it clips about 3 art px of hem), add 2 frames lowering the hoe instead of popping it away at 5->6, make the dust a visible 3-4-frame burst at impact, close the hands on the handle. Dropped 'keep the legs during the wind-up': Ada has no visible legs in any frame." },
    { "id": "G-walk-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "Arm swing, a 1-px body and hat bob on contact frames, faces visible in side frames. Unchanged." },
    { "id": "G-empty-meadow", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R13", "desktop/R17", "desktop/R15", "desktop/R07"], "benchmark": "stardew-1.jpg", "fix": "Clustered tufts and planted edges, farm dressing (stumps, worn paths, era junk), farmyard layouts that differ per era, dock posts and shadow. Unchanged; the stacked-corn item is not a defect." },
    { "id": "G-time-of-day-weather", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R05", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Warm-to-cool per-era dusk and evening grades, puddles or wet sheen in rain, falloff pools instead of bullseye rings. Cause corrected: rain already darkens about 26% (desktop/R09) and fog already covers the whole frame (desktop/R08), so drop those two items." },
    { "id": "G-row-architecture", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R06", "desktop/R19"], "fix": "Quapaw dome from 1922 on and one consistent Quapaw across eras, Ozark as Spanish Colonial Revival with twin towers, distinct 1910s-20s bathhouses in 1931. Unchanged." },
    { "id": "G-ui-overlaps", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R02", "mobile/R11", "desktop/R11", "desktop/R01", "desktop/R12"], "benchmark": "stardew-5.jpg", "fix": "Slot chips above icons, hide the hotbar under the phone dialogue, no orphan counter wrap, pixel hearts, subtitle backing plate, era-material frames. Dropped the R18 item: that is a modal over a dimmed HUD." },
    { "id": "G-goat-sprite-hole", "category": "environment", "expectedGain": 0.0, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/R15-pen"], "fix": "Repaint or re-key the goat sprite. Confirmed." },
    { "id": "G-human-costume", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R04-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Distinct proportions, garment construction, deep bonnet brims, fur-cap silhouettes, role props. Lowered from 1.5: the largest visible failures are rendering bugs covered by G-face-window-directions, and the costume work overlaps G-hat-silhouettes." },
    { "id": "G-purposeful-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R17", "desktop/R07", "desktop/R13"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Work areas, worn approaches and supplies on farm frames; shoreline and dock construction. Lowered: town and camp frames are already dressed (desktop/R04, desktop/R19, desktop/R16, desktop/R02); overlaps G-empty-meadow." },
    { "id": "G-night-surface-light", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "Shape lamp light around surfaces, give the player's light a visible source, add contact shadows under people. Lowered: overlaps G-soft-overlays (glows) and G-time-of-day-weather (pools); the NPC in the lamp pool in mobile/R05 already reads." },
    { "id": "G-cluster-consistency", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/R19-player", "crops/R04-row", "crops/R15-pen", "desktop/R07"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Quieter paving and ground clusters, selective clothing volume, a common outline treatment. Lowered: overlaps G-asset-family-palette." },
    { "id": "G-body-mechanics", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile", "strips/R14"], "benchmark": "Rubric animation 7 descriptor", "fix": "Shoulders, elbows and hands around a two-handed grip; torso rotation and recovery. Gain lowered: the walk arm motion B cites can't be seen (the hat covers the upper body), so G-hat-silhouettes is a prerequisite." },
    { "id": "G-ui-material-portrait", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "mobile/R04", "mobile/R11"], "benchmark": "stardew-5.jpg; seastars-4.jpg", "fix": "Era-specific frame details, HUD symbols that match the inventory icon craft, an integrated portrait in a compact phone dialogue. Lowered: era colourways already separate the panels (desktop/R12, desktop/R18)." }
  ],
  "verdict": "continue"
}
```
