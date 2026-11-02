# Judge ruling: loop 8, tier T32

All capture paths are relative to `games/farm-sim/screenshots/review-loop-8/`. My nearest-neighbour zooms and measurements are in the session scratchpad (`.../scratchpad/loop-8/j_*.png`).

**Hard gates:** pass (`reviews/loop-8/GATES.md`: 88/88 on both suites, pixel integrity passes on all 26 captures, performance inside budget), so the loop is scored.

**Critic spread:** no category differs by more than 1.0 between the critics; the widest is 0.5, in pixel, animation and readability. The advocate disputes several facts, so I re-checked each of them against the captures. Results are below.

## Disputed facts: what I found
| Claim | Source | Verdict | What I checked |
|---|---|---|---|
| Rain has "no wet darkening" | A | **Advocate right** | In `desktop/R09` the grass is visibly darker and greyer than in `desktop/R04`; windows are lit at 13:20. Puddles and splashes are missing. |
| 1955 dusk has "no lamps lit" | A | **Advocate right, partly** | `desktop/R06`: every bathhouse window is lit, and the motor-hotel roof lights glow over a warm, darker grade. The street lamps are unlit and there are no long shadows. |
| JOSIAH, TRADE and MARGAUX tags overlap | A | **Advocate right** | `crops/R16-npcs`: the three abut, and TRADE is the tent sign. The real collision is the EZRA tag over Josiah's body. |
| The 1886 lanterns predate the 1897 gas date | A | **Advocate right** | `desktop/R04`: single lanterns on wooden posts, i.e. oil. |
| The R13 "cap" covers the head | A | **Advocate right on cause** | `strips/R13` is hatless Ada (same cabin as `desktop/R02`). Her hair mass dominates the head. |
| The R07 deep-water edge is a "soft curve" | A | **Advocate right** | Measured: 98% of 4-px blocks across the edge in `desktop/R07` are uniform, so the edge steps on the terrain grid (zoom `j_r07edge.png`). |
| The fog is off-grid smooth alpha | A | **A right** | Zoom `j_r08fog.png` of `desktop/R08`: the curls are one-art-pixel hairlines with soft alpha, the terrace ovals are smooth translucent ellipses, and the steam is a soft blur. The advocate conceded this. |
| Phone A/B are "keyboard letters" | B | **Advocate right** | `mobile/R05`, `mobile/R11`: A/B face buttons labelled Use and Talk. |
| R05 architecture is in "nearly uniform darkness" | B | **Advocate right** | `desktop/R05`, `mobile/R05`: arches, balustrades and lit windows stay legible. |

### A finding neither critic named: mixed art-pixel density
I measured block uniformity on the frames. Every surface is on the 2-px screen grid, which is why integrity passes, but the art is drawn at two densities:
- **Fine (2-px art pixel):** buildings, shrubs and crops (`desktop/R04` hotel block: 82% of 4-px blocks are non-uniform, 0% of 2-px blocks).
- **Coarse (4-px art pixel):** grass, cobble and water (`desktop/R04` grass: 95% of 4-px blocks uniform; cobble 91%; `desktop/R07` water 99.8%).

Zoom `j_r04mix.png` shows it: chunky grass and cobble speckle sit next to finely drawn shrubs and the Row. The cobble is random two-tone speckle with no stone shapes. The 3 anchor names "mixed pixel sizes", and this is a milder form of it. Critic B's "texture frequency" complaint is pointing at the same thing.

## Category rulings

### pixel: 6.0
- **Strong:** buildings, crops and animals have clean, hue-shifted clusters (`crops/R04-row`, `crops/R03-field`, `crops/R15-pen`).
- **Holding it at 6.0:**
  - The terrain and the buildings use different art densities, and the cobble is unstructured speckle (`desktop/R04`, zoom `j_r04mix.png`).
  - The fog is soft hairline alpha (`desktop/R08`, `j_r08fog.png`).
  - Characters and scenery follow two outline rules: characters have flat fills with brown outlines (`crops/R03-player`, `crops/R06-player`), while buildings have near-black outlines.
  - The title art is a speckled downscaled painting (`desktop/R01`). The advocate counted about 5,400 colours in one quadrant.
- **Disputes:** A's "weed speckle" claim is overstated; the field stamps are outlined (`desktop/R14`, zoom `j_r14.png`). A's water-edge claim is wrong.
- **Net:** the density mismatch and the outline split are systemic, not "small noisy spots". This sits at B's 6.0, not the 7 anchor.

### characters: 5.0
All three reviewers agree, and I confirmed it beside the reference sheets:
- **Caleb** wears a newsboy cap, not a slouch hat, and has a brown chest smear (`crops/R03-player`).
- **June** reads as a bald boy, with no ponytail (`crops/R06-player`).
- **Josiah and Ezra** share one hat and face, and the EZRA tag sits on Josiah (`crops/R16-npcs`).
- **Walt** wears long dark trousers, and his white collar reads as a beard (`crops/R11-npcs`).
- **Passers-by:**
  - The two bonnet, blue-kerchief and purple-skirt women are clones (`desktop/R04`, `desktop/R08`).
  - The side-view bonnet woman in `desktop/R09` reads as a squirrel.
  - The 1931 back-view walker is a hat blob (`mobile/R05`).
- **Passes:** Hattie, Margaux and Ray.
- **Net:** readable figures, generic, with few checklist features. That is the 5 anchor.

### environment: 6.5
- **Strong:** era buildings carry their construction: 1871 false fronts and a mud street (`desktop/R09`), the 1886 mansards (`desktop/R04`), the 1931 bungalow, Model A and pump (`desktop/R17`), the 1955 Googie (`desktop/R06`).
- **Weak:**
  - **The farm is pixel-identical across eras:** `desktop/R02` and `desktop/R17` have the same path, crate, three shrubs and flower spots.
  - **The new batch-10 shore dressing does not appear in the lake capture:** `desktop/R07` has no reeds and no rowboat, and its caustic tile repeats.
  - **Towns use the same cross plan on lawn,** with no mountain behind (`desktop/R04`, `desktop/R09`).
  - **The lower farm is sparse** (`desktop/R02`).
- **Net:** competent and partly rich, but not "dressed scenes" throughout. 6.5.

### lighting: 6.0
- **What the advocate's corrections establish:**
  - Rain darkens the ground (`desktop/R09`).
  - Dusk has lit windows and motel glow (`desktop/R06`).
  - The 1931 night is dithered and on grid, with neon (`desktop/R05`).
  - The snow reads (`desktop/R10`).
- **What still falls short of the 7 anchor ("coherent shadows; light kept on-grid"):**
  - Characters cast no shadows (`desktop/R04`, `j_r04mix.png`; `desktop/R06`).
  - The R05 lamp pools are diagonal bands that sit between the posts, not under them.
  - Street lamps are unlit at 19:10 (`desktop/R06`).
  - The 2026 evening is indistinguishable from day (`desktop/R07`).
  - The fog is soft, off-grid alpha (`desktop/R08`).
  - Rain has no puddles or splashes (`desktop/R09`).
- **Net:** two of A's points were wrong, but enough real defects remain that the advocate's 6.5 is not earned. 6.0.

### animation: 6.0
- **Hoe** (`strips/R14`): wind-up in frames 1–2, swing in frame 3, impact squash with the tile appearing in frame 4. That is a real tool-specific action. The settle then holds for four near-identical frames with no recoil, and the hands don't grip the haft.
- **Walk** (`strips/R13`, `strips/R13-mobile`): the double-lantern post hides the legs in frames 1–6. Frames 7–8 show a real stride with opposite arm swing. There is no body or hair bob and no secondary motion.
- **Net:** between the 5 and 7 anchors. I side with A and the advocate over B's 5.5, because the hoe impact is clearly there. I give no credit for walk frames that can't be seen.

### ui: 6.5
- **Good:**
  - Crisp integer pixel font, era HUD colours, and each era's panels match its own HUD (`desktop/R12` is 1931 and `desktop/R18` is 1955, so A's frame-family point is withdrawn).
  - On the phone, the hotbar numbers clear the icons (`mobile/R12`).
- **Short of 7:**
  - The portrait is the walking sprite scaled up (`mobile/R11`, `desktop/R11`).
  - Panels are plain bevelled boxes.
  - The EZRA tag covers Josiah (`desktop/R16`).
- **Net:** unanimous 6.5, confirmed.

### readability: 7.0
- **Meets the 7 anchor on the phone:**
  - `mobile/R05`: the player, bracket, lamps, sign and walker stay separate at night.
  - `mobile/R12`: the pack is legible.
  - `mobile/R11`: dialogue is legible.
  - Crop stages and ripeness read at a glance (`crops/R03-field`).
- **Defects, all on non-interactive or minor elements:**
  - Back-view passers-by don't read as people (`desktop/R09`).
  - The EZRA tag covers Josiah.
  - Tall crops overlap the row above.
- **Net:** B's `mobile/R05` objection does not hold up. 7.0.

### authenticity: 6.5
- **Strong:** the six eras sort at a glance, from the 1807 camp (`desktop/R16`) to the 1931 named bathhouses and neon (`desktop/R05`), the 1955 motor hotel (`desktop/R06`) and the restored 2026 Row (`desktop/R19`).
- **Weak:**
  - The 1886 Row uses generic BATHS / HOT BATHS signs (`desktop/R04`).
  - No one wears winter clothing in the snow (`desktop/R10`).
  - Walt, Josiah, Ezra and Caleb miss their clothing checklists (`crops/R11-npcs`, `crops/R16-npcs`).
- **Correction:** A's 1897 lantern anachronism is withdrawn.
- **Net:** unanimous 6.5, confirmed. It is above its 6 gate.

**Total: 49.5 / 80.** Gates met: authenticity only (readability sits exactly at 7). Six categories are below 7, so the verdict is **continue**.

## Ranked gaps (gain ÷ effort; duplicates merged)
1. **G-char-checklist-headwear** (characters, WS2, M, +1.0)
   - Caleb: a low-crown slouch hat whose wide soft brim breaks the head outline by at least 2 art pixels each side, and no chest smear.
   - Sam: a cap bill projecting past the forehead edge, not a stripe across the crown.
   - June: a ponytail visible in the front and side frames, and rolled cuffs.
   - Walt: a knickers lower body with white stockings, and a collar recoloured so it doesn't read as a beard.
   - Josiah: a fur cap with a tail, a grey beard and a fringed shirt. Ezra: a long coat and a walking stick.
2. **G-pixel-fog-quantize** (pixel, WS1, S, +0.5): redraw the R08 fog curls at least 2 art pixels thick with hard edges. Render the terrace ovals and steam as 2–3-step ordered-dither alpha, the same treatment as the R05 lamp pools.
3. **G-light-sprite-shadows** (lighting, WS4, S, +0.5): give every character and animal a hard-edged, darkest-ramp contact shadow, 2 art pixels tall. Elongate it at dusk.
4. **G-auth-1886-signs-winter** (authenticity, WS7, S, +0.5): replace the 1886 BATHS / HOT BATHS signs with the period bathhouse names from `research/bathhouse-row-and-springs.md`. In snow scenes, put townsfolk and the player in coats and shawls.
5. **G-env-farm-variation-shore** (environment, WS3, S, +0.5):
   - Seed the farm's prop, shrub and flower placement per era, so `desktop/R02` and `desktop/R17` differ.
   - Use 3–4 variants per weed, reed and shrub, with flips and sub-tile jitter.
   - Check that the batch-10 reeds and rowboats actually render on the shore in the R07 capture.
6. **G-char-backviews-clones** (characters, WS2, M, +0.5): cap hair and hats at about 40% of sprite height in the side and back frames, with the shoulders and the back of the garment visible. Never show the same garment and headwear combination twice on screen.
7. **G-light-dusk-evening-rain** (lighting, WS4, M, +0.5):
   - Light the street lamps from 18:00.
   - Give the 2026 evening a warm-to-violet grade.
   - Add on-grid puddle and splash tiles in rain.
   - Centre the lamp pools under their posts.
8. **G-anim-walk-staging-secondary** (animation, WS5, M, +0.5):
   - Move the double-lantern post, or the R13 walk path, so nothing occludes the walker.
   - Add a 1-px body bob and a hair or hat bob lagged by one frame.
   - Cut the hoe settle to 2 frames, then add a recoil and a dirt-clod burst.
9. **G-ui-portraits-tags** (ui, WS6, M, +0.5): draw 48–64-px bust portraits for named people. Give each era its own nine-slice panel frame. Lay out name tags so they never cover another NPC's sprite.
10. **G-pixel-terrain-grain** (pixel, WS1, M, +0.5): redraw the grass, cobble and water tiles at the same 2-px art grain as the buildings. Draw cobbles as outlined stone clusters, not random speckle.
11. **G-char-body-template** (characters, WS2, L, +0.5):
    - Add at least 3 body and posture templates: stooped elder, broad man, slim youth.
    - Add a 1–2-px mouth and brow.
    - Separate the cuffs from the hands.
    - Give characters the same darkest-ramp outline rule as the buildings.
12. **G-env-town-backdrop** (environment, WS3, L, +0.5 environment, +0.5 authenticity): add a wooded mountain-slope tile band behind the Row, plus sidewalks, fences and side lots. Vary the street plan per era.

**Dropped below the cut:** the title art cleanup (G-pixel-title-art, +0.25, M).

```json
{
  "loop": 8,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R04-row", "note": "clean building clusters and hue-shifted ramps at 2-px art grain"},
        {"shot": "desktop/R04", "note": "grass and cobble drawn at 4-px art grain beside 2-px buildings (measured); cobble is unstructured speckle (zoom j_r04mix.png)"},
        {"shot": "desktop/R08", "note": "fog curls are hairline soft alpha, terrace ovals smooth, steam blurred (zoom j_r08fog.png)"},
        {"shot": "crops/R03-player", "note": "flat-fill, brown-outline character rule differs from the buildings"},
        {"shot": "desktop/R01", "note": "title art is a speckled downscaled painting"},
        {"shot": "desktop/R07", "note": "deep-water edge steps on the terrain grid (98% uniform 4-px blocks): A's soft-curve claim dropped"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R03-player", "note": "beside its reference: Caleb in a newsboy cap, not a slouch hat; chest smear"},
        {"shot": "crops/R06-player", "note": "beside its reference: June reads as a bald boy, no ponytail"},
        {"shot": "crops/R16-npcs", "note": "Josiah and Ezra share one hat and face; Margaux passes"},
        {"shot": "crops/R11-npcs", "note": "Walt in long trousers; Hattie passes"},
        {"shot": "desktop/R08", "note": "adjacent bonnet women are clones"},
        {"shot": "desktop/R09", "note": "side-view bonnet passer-by reads as an animal"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R17", "note": "bungalow, Model A, pump, hay; but path, crate, shrubs and flowers pixel-identical to desktop/R02"},
        {"shot": "desktop/R02", "note": "same farm layout as 1931; sparse lower field"},
        {"shot": "desktop/R09", "note": "1871 false fronts and mud street"},
        {"shot": "desktop/R07", "note": "empty lake, repeating caustic tile, no reeds or rowboat visible"},
        {"shot": "desktop/R04", "note": "town on lawn, cross plan, no mountain backdrop"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "dithered on-grid night light and neon; pools sit between the posts"},
        {"shot": "desktop/R06", "note": "dusk has lit windows and motel glow (advocate right), but street lamps unlit and no shadows"},
        {"shot": "desktop/R09", "note": "rain darkens the ground (advocate right); no puddles or splashes"},
        {"shot": "desktop/R07", "note": "18:20 evening indistinguishable from day"},
        {"shot": "desktop/R08", "note": "fog is soft off-grid alpha"},
        {"shot": "desktop/R10", "note": "snow caps read well"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "strips/R14", "note": "wind-up, swing, impact squash with the tile appearing in frame 4; 4-frame held settle, weak grip"},
        {"shot": "strips/R13", "note": "lamp post hides legs in frames 1-6; stride and arm swing in frames 7-8; no bob"},
        {"shot": "strips/R13-mobile", "note": "same cycle and occlusion at phone scale"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R11", "note": "legible dialogue; portrait is the upscaled walking sprite; A/B face buttons labelled"},
        {"shot": "mobile/R12", "note": "pack reflows cleanly; hotbar numbers clear the icons"},
        {"shot": "desktop/R18", "note": "1955 shop matches the 1955 HUD; plain bevelled panels"},
        {"shot": "desktop/R16", "note": "EZRA tag covers Josiah; other tags abut without overlapping"}
      ]
    },
    "readability": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "mobile/R05", "note": "player, bracket, lamps, sign and walker separate at night on the phone"},
        {"shot": "crops/R03-field", "note": "crop stages and ripeness read at a glance; tall crops overlap the row above"},
        {"shot": "mobile/R12", "note": "pack legible on the phone"},
        {"shot": "desktop/R09", "note": "back-view passer-by doesn't read as a person"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "real 1931 bathhouse names, neon club, multi-globe posts"},
        {"shot": "desktop/R06", "note": "Googie drive-in, motor hotel, hydrant"},
        {"shot": "desktop/R16", "note": "1807 trade camp and canvas tents"},
        {"shot": "desktop/R04", "note": "1886 generic BATHS signs; oil lanterns on wooden posts, no anachronism"},
        {"shot": "desktop/R10", "note": "no winter clothing in snow"},
        {"shot": "crops/R11-npcs", "note": "Walt's period uniform missing"}
      ]
    }
  },
  "gaps": [
    {"id": "G-char-checklist-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R06-player", "crops/R19-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Caleb: low-crown slouch hat whose wide brim breaks the head outline by at least 2 art px each side, no chest smear; Sam: cap bill projecting past the forehead edge; June: ponytail in front and side frames plus rolled cuffs; Walt: knickers lower body with white stockings and a recoloured collar; Josiah: fur cap with tail, grey beard, fringed shirt; Ezra: long coat and walking stick"},
    {"id": "G-pixel-fog-quantize", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R08"], "benchmark": "seastars-2.jpg", "fix": "Redraw fog curls at least 2 art px thick with hard edges, and render terrace ovals and steam as 2-3-step ordered-dither alpha like the R05 lamp pools"},
    {"id": "G-light-sprite-shadows", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R04", "desktop/R06"], "benchmark": "chained-5.jpg", "fix": "Hard-edged 2-art-px darkest-ramp contact shadow under every character and animal, elongated at dusk"},
    {"id": "G-auth-1886-signs-winter", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R10"], "benchmark": "snes-earthbound-1.png", "fix": "Replace the 1886 BATHS/HOT BATHS signs with the period bathhouse names from research/bathhouse-row-and-springs.md; put townsfolk and the player in coats and shawls in snow scenes"},
    {"id": "G-env-farm-variation-shore", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R17", "desktop/R07", "desktop/R14"], "benchmark": "stardew-1.jpg", "fix": "Seed farm prop, shrub and flower placement per era so R02 and R17 differ; 3-4 variants per weed, reed and shrub with flips and sub-tile jitter; check that batch-10 reeds and rowboats render on the R07 shore"},
    {"id": "G-char-backviews-clones", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R08", "desktop/R09", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Cap hair and hats at about 40% of sprite height in side and back frames, with shoulders and garment back visible; never show the same garment and headwear combination twice on screen"},
    {"id": "G-light-dusk-evening-rain", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R09", "desktop/R05"], "benchmark": "seastars-2.jpg", "fix": "Light street lamps from 18:00; warm-to-violet grade for the 2026 evening; on-grid puddle and splash tiles in rain; centre lamp pools under their posts"},
    {"id": "G-anim-walk-staging-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Move the double-lantern post or the R13 path so nothing occludes the walker; add a 1-px body bob and a hair or hat bob lagged by one frame; cut the hoe settle to 2 frames and add a recoil and dirt-clod burst"},
    {"id": "G-ui-portraits-tags", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R11", "desktop/R11", "desktop/R16"], "benchmark": "stardew-5.jpg", "fix": "48-64 px bust portraits for named people; one nine-slice panel frame per era; lay out name tags so they never cover another NPC sprite"},
    {"id": "G-pixel-terrain-grain", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["desktop/R04", "desktop/R07"], "benchmark": "chained-5.jpg", "fix": "Redraw grass, cobble and water tiles at the 2-px art grain used by the buildings; draw cobbles as outlined stone clusters instead of random speckle"},
    {"id": "G-char-body-template", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["crops/R16-npcs", "crops/R03-player", "crops/R11-npcs"], "benchmark": "seastars-2.jpg", "fix": "At least 3 body and posture templates (stooped elder, broad man, slim youth); 1-2 px mouth and brow; separate cuffs from hands; darkest-ramp outline rule matching the buildings"},
    {"id": "G-env-town-backdrop", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Wooded mountain-slope tile band behind the Row; sidewalks, fences and side lots; per-era street plan (also +0.5 authenticity)"}
  ],
  "verdict": "continue"
}
```
