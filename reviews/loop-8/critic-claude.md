# Critic A (critic-claude): loop 8, tier T32

## Verdict
On environment art, *Valley of Vapors* now looks like a shipped pixel game. The Second Empire bathhouses (`desktop/R04`, `crops/R04-row`), the restored 2026 Row (`crops/R19-row`), the crop rows (`crops/R03-field`) and the animals (`crops/R15-pen`) all sit close to Chained Echoes (CAL-B) in cluster and ramp discipline. The people walking around in it are the weak point. Every human comes from one chibi template: big grey eyes, no mouth, mitten hands. Several named people fail their checklist on headwear or garment. Caleb's "slouch hat" draws as a newsboy cap, Sam's ball-cap bill is a stripe across the crown, June Vale reads as a bald boy, Walt wears long trousers, and Josiah and Ezra share one silhouette. Back views of passers-by turn into hat blobs that read as animals. The towns have a second structural problem: every era uses the same cross-road plan set on an empty lawn, with no mountain backdrop. Weather and time of day are uneven. The 1931 night is good (dithered, on-grid lamp pools, neon), but the 1955 dusk and the 2026 evening look like daytime, the rain barely changes the mood, and the fog uses smooth, off-grid alpha shapes. Six categories are below 7: characters most of all, then lighting and animation (6), then pixel, environment and ui (6.5). Readability is exactly 7, and authenticity (6.5) clears its 6 gate. **Total 50.0 / 80.**

## Scores

### 1. pixel: 6.5
- One grid holds in play. Building art is very clean: 1–2 px trim lines, hue-shifted green roof ramps, brick coursing, lit windows (`crops/R04-row`, `crops/R19-row`). Crops (`crops/R03-field`) and animals (`crops/R15-pen`) have deliberate clusters and dark outlines. These assets reach CAL-B (8.5) level.
- The rest pulls the score down:
  - **Weed and berry-shrub stamps are noisy.** Seen zoomed (`desktop/R14`, my zoom of it), they are dark speckle clusters with no readable form. They look like the "noisy clusters in foliage" in the 5 anchor.
  - **Fog uses off-grid overlays** (`desktop/R08`): the curl streaks are thin, soft-edged lines, the green ovals on the spring terraces are smooth translucent ellipses, and the steam is a blurred blob. None of it is drawn on the 4-px art grid. The anchor rule applies: smooth overlays on top of pixel art cap pixel craft.
  - **The deep-water boundary in `desktop/R07` is a soft curve.**
  - **There are two outline rules.** Buildings, props and crops are dense, many-coloured generated art with near-black outlines. People are flat 3–4-tone chibis with brown outlines and muddy brown smears across the face (`crops/R02-player`, `crops/R16-player`). Grass has no outlines. The scene does not read as one artist's palette.
  - **The title art is a downscaled painting** (`desktop/R01`, `mobile/R01`): speckle and one-pixel noise everywhere, with no cluster discipline.
- Net: between 5 and 7. The best assets are at 8+, but the noise and smooth overlays are too visible to give 7.

### 2. characters: 5.0
Checked against `research/refs/characters.md`, using the close-ups beside their reference sheets:
- **Caleb Vale** (`crops/R03-player`, `crops/R09-player`, `crops/R15-player`) **fails on headwear.** The hat is a flat newsboy cap with a narrow peak, not a low-crown, wide soft-brim slouch hat. A brown smear on the chest reads as a beard or a bag. He has no prop. About 3 of 5 checks.
- **Ada Vale** (`crops/R02-player`, `crops/R16-player`) has an apron over a white column. The short-gown over a petticoat is not legible, and the hair is a helmet-shaped mass. Borderline pass.
- **Nora Vale** (`crops/R04-player`, `crops/R08-player`, `crops/R10-player`) passes: bonnet, blue bodice, apron. But the bonnet is a mushroom dome, not a deep brim framing the face.
- **Ray Vale** (`crops/R05-player`, `crops/R17-player`) has a grey fedora with a crease line. A weak pass.
- **June Vale** (`crops/R06-player`) **fails.** There is no ponytail, the head is a round brown cap of hair, and the silhouette reads as a boy. Her trousers are not rolled.
- **Sam Vale** (`crops/R07-player`, `crops/R19-player`): the cap bill is drawn as a grey band halfway across the dome, so it reads as a headband or helmet stripe, not a curved bill.
- **Josiah and Ezra** (`crops/R16-npcs`, my 3× zoom of `desktop/R16`) have the same dome hat and pale face. Josiah's fur cap with tail and his fringed hunting shirt are not readable; the EZRA label also covers him. Ezra has no long coat and no stick. **Margaux** passes: red head scarf, blue shirt, long skirt.
- **Walt** (`crops/R11-npcs`) wears dark full-length trousers, not knickers with white stockings, and his white collar reads as a beard. **Hattie** passes: white cap, white dress, skin 4. **Augustin**, seen from the back, is an egg-shaped toque on a brown blob.
- **Passers-by** (`desktop/R04`, `desktop/R08`, `desktop/R10`): two of the three women next to each other are the same bonnet-and-blue-kerchief sprite with a purple sack skirt, so the clone problem is only partly fixed. Back and side views (`desktop/R06`, `desktop/R19`, my zoom of `desktop/R05`) are dominated by hair or hat; the 1955 and 2026 walkers with flared hair read as dogs.
- No face has a mouth or an expression, and hands are 2-tone mittens.
- Compared with CAL-A (6.5): Stardew's townsfolk differ in hair, garment and body. Here bodies and faces are identical, and named people cannot be told apart in grayscale (Josiah and Ezra). Animals (`crops/R15-pen`) are good, but they don't rescue the people.

### 3. environment: 6.5
- **Strong:**
  - **Buildings carry their era's construction:** board-and-batten and false fronts with a mud street in 1871 (`desktop/R09`); mansards, porches and brick in 1886 (`desktop/R04`); a Craftsman bungalow with a Model A pickup, hay bales and a pump in 1931 (`desktop/R17`); a Googie drive-in and motor hotel in 1955 (`desktop/R06`); a Mission-style brewery, a domed spa and a market pavilion on herringbone brick in 2026 (`desktop/R19`).
  - **Crops show every growth stage** (`crops/R03-field`), and props have contact shadows (`desktop/R13`).
- **Weak:**
  - **Every town is the same cross-shaped road plan** with buildings dropped onto flat lawn and an empty grass field above (`desktop/R04`, `desktop/R05`, `desktop/R09`, `desktop/R19`). There are no sidewalks, yards, fences, side lots or mountain behind the Row.
  - **Building stamps repeat:** two identical green villas on the left in `mobile/R04`.
  - **The farm layout is identical across eras:** the same path, crate and three shrubs in the same spots in `desktop/R02`, `desktop/R13` and `desktop/R17`.
  - **The unworked field is a near-grid of one weed stamp** (`desktop/R14`).
  - **The new creek reeds are one sprite repeated** in a vertical column (`desktop/R16`).
  - **The 2026 lake is two-thirds empty water** with a visibly tiling diamond caustic pattern, and no reeds or rowboat are visible (`desktop/R07`).
- Compared with CAL-A (8): Stardew's farm (`benchmarks/stardew-1.jpg`) has worn dirt, fence variety, planters and grass tufts everywhere. This game's single buildings match that, but the scenes around them are sparse.

### 4. lighting: 6.0
- **Best:**
  - **The 1931 night is the best frame** (`desktop/R05`, `mobile/R05`, my 3× zoom). Lamp light is an ordered dither, on grid, and warms the bricks and the player sprite. Windows glow, and the pink CLUB neon is a nice era light.
  - **The 1886 snow scene works** (`desktop/R10`): snow caps on every roof, ragged snow edges along the road.
- **Short of 7:**
  - **The lamp pools are diagonal shafts** that don't sit under their lamps, and there are no cast shadows from sprites.
  - **The 1955 "dusk" at 19:10 looks like overcast day** (`desktop/R06`): no lamps lit, no warm sky light, no long shadows. The 2026 "evening" at 18:20 (`desktop/R07`) shows no visible change either.
  - **Rain changes almost nothing** (`desktop/R09`): sparse thin streaks over full-saturation green grass, with no wet darkening, puddles or splashes.
  - **Fog is a flat grey wash** with smooth off-grid curls and steam (`desktop/R08`).
- Compared with CAL-B (7): Chained Echoes has consistent cast shadows and a puddle reflection. Here only one scene has light that works. Compared with CAL-C (9.5), this is a long way off.

### 5. animation: 6.0
- **Walk** (`strips/R13`, `strips/R13-mobile`, my half-strip zooms): the side-view walk has a real stride (frames 7–8) and a forward arm swing. But frames 2–6 are near-identical passing poses. There is no head or hat bob and no secondary motion, and the cap still covers most of the head in profile; only a sliver of face shows under it. A two-lantern lamp post stands in front of the walker for frames 1–6, which hides the cycle.
- **Hoe** (`strips/R14`, my zooms): this is better. The hoe is raised behind the head (frames 1–2), swings (3), and hits on frame 4, where the body leans and squashes and the tilled tile appears. Frames 5–8 are a held settle with a few dust specks; the hold is too long and has no recoil.
- The stills show some ambient life: steam in `desktop/R08` and water glints in `desktop/R07`.
- Net: the hoe nearly meets the 7 anchor (wind-up, impact, settle). The walk sits between the 5 and 7 anchors.

### 6. ui: 6.5
- **Good:**
  - **The pixel font is crisp, at integer scale, with no anti-aliasing** (my 3× zoom of `desktop/R11`).
  - **HUD frames change per era:** dark green in 1807 (`desktop/R02`), cream in 1871 and 1886 (`desktop/R03`), navy and gold in 1931 (`desktop/R05`, `desktop/R12`), blue in 2026 (`desktop/R07`).
  - **Item icons match the world's art** (`desktop/R12`, `desktop/R18`).
  - **On the phone, the hotbar numbers no longer cover the icons** (`mobile/R02`, `mobile/R12`).
- **Short of 7:**
  - **Panels are plain 2-px-bordered boxes,** not nine-slice frames in one material, and the shop (cream and teal, `desktop/R18`) and the pack (navy, `desktop/R12`) don't look like one family.
  - **The dialogue "portrait" is the walking sprite scaled up** (`desktop/R11`, `mobile/R11`). Stardew's portrait box (`benchmarks/stardew-5.jpg`, pegged 7.5) has a hand-drawn bust with expression.
  - **NPC name tags collide:** JOSIAH, TRADE and MARGAUX overlap in `desktop/R16`.
  - **The title menu is a generic cream button stack** over noisy art (`desktop/R01`).

### 7. readability: 7.0
- **Player, interactables and crops read well:**
  - **The player is always findable**, inside the target bracket.
  - **Crop stages and ripeness markers read at a glance** (`crops/R03-field`).
  - **NPCs carry name tags with quest markers** (`desktop/R11`).
  - **The 1931 night stays playable on the phone** (`mobile/R05`).
- **Text is big enough on the phone:** dialogue and HUD text is about 12–16 CSS px (`mobile/R11`, `mobile/R12`), and the A/B buttons and hotbar slots are large.
- **Problems keeping it at 7, not above:**
  - **Labels sit on top of heads** (`desktop/R16`).
  - **The lamp post occludes the player** (`strips/R13`).
  - **Passers-by from behind can't be read as people** (`desktop/R06`, `desktop/R19`).
  - **The fog flattens the spring props** into the ground (`desktop/R08`).
- Compared with CAL-A (8.5): this game has less value separation between characters and the ground. Mid-brown people on a mid-brown cobble street (`desktop/R04`) pop less than Stardew's farmer does.

### 8. authenticity: 6.5
- **Six eras a blind viewer would sort correctly:**
  - **1807:** log cabin, campfire and canvas trade tents (`desktop/R02`, `desktop/R16`).
  - **1871:** board-and-batten storefronts and a mud street, with STAGE and DRUGS signs (`desktop/R09`).
  - **1886:** brick and mansard Victorian bathhouses and hotel (`desktop/R04`).
  - **1931:** the real Superior, Quapaw, Ozark and Hale bathhouse names, a neon club, multi-globe lamp posts, a Craftsman bungalow and a Model A (`desktop/R05`, `desktop/R17`).
  - **1955:** Googie drive-in, motor hotel, fire hydrant, painted centre line (`desktop/R06`).
  - **2026:** restored Row with Superior as a brewery, Hotel Hale, herringbone paving and a farmers market (`desktop/R19`).
- **Below 7:**
  - **The 1886 Row uses generic BATHS / HOT BATHS signs** where the bathhouses should be named, and **it sits on open lawn**, not along Central Avenue at the foot of the mountain.
  - **Clothing misses the checklist:** Walt's knickers and stockings, Josiah's buckskin and fur cap, Ada's short-gown and Caleb's slouch hat are all missing (`crops/R11-npcs`, `crops/R16-npcs`, `crops/R03-player`).
  - **Townsfolk wear no winter clothing in the snow** (`desktop/R10`).
  - **Street lanterns on posts appear in 1886** (`desktop/R04`), before the 1897 gas date that `pixel-anchors.md` cites.

## Ranked gaps
1. **G-char-checklist-headwear** (characters, WS2, severity 5, effort M, +1.0).
   - Problem: on-screen named people fail their checklist on headwear and garment (`crops/R03-player`, `crops/R19-player`, `crops/R06-player`, `crops/R11-npcs`, `crops/R16-npcs`).
   - Fix:
     - Redraw Caleb's hat as a low-crown slouch hat whose wide soft brim breaks the head outline.
     - Draw Sam's cap bill as a curved shape sticking out past the forehead edge, not a stripe across the crown.
     - Give June a ponytail and rolled cuffs.
     - Add a `knickers` lower-body variant with white stockings for Walt.
     - Give Josiah a fur cap with a tail, a gray beard and a fringed shirt; give Ezra a long coat and a walking stick.
2. **G-env-town-lawn-layout** (environment, WS3, severity 4, effort L, +0.5 environment, +0.5 authenticity).
   - Problem: every era's town is the same cross-shaped road with buildings dropped on open lawn (`desktop/R04`, `desktop/R09`, `desktop/R19`).
   - Fix:
     - Put a rocky, wooded mountain slope tile band behind the Row, as the real Row backs onto Hot Springs Mountain.
     - Add sidewalks, yard fences, side lots and era street furniture.
     - Vary the street plan per era.
     - Replace the generic BATHS signs in 1886 with named houses.
3. **G-light-time-weather** (lighting, WS4, severity 4, effort M, +1.0).
   - Problem: dusk and evening read as day, and rain has no mood (`desktop/R06`, `desktop/R07`, `desktop/R09`).
   - Fix:
     - Grade dusk and evening with a warm-to-violet palette shift and turn the lamps on from 18:00.
     - Add long banded sprite shadows at dusk.
     - Rain: darken and desaturate the ground, and add on-grid puddle and splash tiles.
     - Centre lamp pools under their lamps instead of diagonal shafts.
4. **G-char-backviews-clones** (characters, WS2, severity 4, effort M, +0.5).
   - Problem: back and side views are oversized hat or hair blobs, and adjacent passers-by are clones (`desktop/R05`, `desktop/R08`, `desktop/R19`).
   - Fix:
     - Cap hair and hat at about 40% of sprite height in the back and side frames, and show the shoulders and back of the garment.
     - Recolour garments per instance, never repeating a skirt and kerchief pair on screen.
     - Give winter scenes shawls and coats.
5. **G-pixel-offgrid-overlays** (pixel, WS1, severity 3, effort S, +0.5).
   - Problem: fog curls, terrace ovals, steam blobs and the deep-water edge are smooth alpha, not pixel art (`desktop/R08`, `desktop/R07`).
   - Fix: quantize them to the 4-px art grid with ordered dither and a two- or three-step alpha, as the lamp pools in R05 already are.
6. **G-env-stamp-repetition** (environment, WS3, severity 3, effort S, +0.5).
   - Problem: one weed stamp on a near-grid, a column of one reed sprite, and identical villas (`desktop/R14`, `desktop/R16`, `mobile/R04`).
   - Fix:
     - Draw 3–4 variants per prop, with flips and sub-tile jitter.
     - Break up the field weeds with tall grass and bare patches.
     - Don't place the same building sprite twice on one screen.
7. **G-ui-portrait-frames** (ui, WS6, severity 3, effort M, +0.5).
   - Problem: the dialogue portrait is the upscaled walking sprite, panels are plain boxes, and NPC name tags overlap (`desktop/R11`, `desktop/R18`, `desktop/R16`).
   - Fix:
     - Draw real 48–64 px bust portraits for named people.
     - Build one nine-slice frame material per era, shared by the shop, pack and dialogue panels.
     - Stagger or stack NPC name tags so they never overlap.
8. **G-anim-walk-secondary** (animation, WS5, severity 3, effort M, +0.5).
   - Problem: the walk has near-identical passing frames and no secondary motion, the hoe settle is held too long, and a lamp post blocks the walker (`strips/R13`, `strips/R14`).
   - Fix:
     - Make 6 distinct walk poses with a 1-px body bob and a 1-frame-lagged hat or hair bob.
     - Shorten the hoe settle to 2 frames and add a recoil and a dirt-clod burst.
     - Move the double-lantern post away from the cabin door, so it stops occluding the player.
9. **G-char-faces-hands** (characters, WS2, severity 3, effort M, +0.5).
   - Problem: faces have no mouth or nose and are smeared with mid-brown shading; hands are 2-tone mittens (`crops/R02-player`, `crops/R16-npcs`).
   - Fix:
     - Add a 1–2 px mouth and brow, and clean the face ramp to skin, shadow and highlight.
     - Separate the cuff from the hand.
     - Vary eye shape and size by age and sex.
10. **G-pixel-title-art** (pixel, WS6, severity 2, effort M, +0.25).
    - Problem: the title background is a downscaled painting with speckle noise (`desktop/R01`, `mobile/R01`).
    - Fix: clean the clusters by hand, or rebuild the backdrop from in-game tiles, and give the menu an era frame.

```json
{
  "loop": 8,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R04-row", "note": "clean building clusters and hue-shifted roof ramps, CAL-B level"},
        {"shot": "crops/R19-row", "note": "clean Mission and spa facades"},
        {"shot": "desktop/R14", "note": "weed stamps are noisy dark speckle"},
        {"shot": "desktop/R08", "note": "fog curls, terrace ovals and steam are smooth off-grid alpha"},
        {"shot": "crops/R02-player", "note": "flat chibi with muddy face smears, different outline rule from the buildings"},
        {"shot": "desktop/R01", "note": "title art is a downscaled painting with speckle"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R03-player", "note": "Caleb's slouch hat drawn as a newsboy cap"},
        {"shot": "crops/R19-player", "note": "Sam's cap bill is a band across the crown"},
        {"shot": "crops/R06-player", "note": "June Vale has no ponytail and reads as a boy"},
        {"shot": "crops/R16-npcs", "note": "Josiah and Ezra share one silhouette; Margaux passes"},
        {"shot": "crops/R11-npcs", "note": "Walt in long trousers, no knickers or stockings; Hattie passes"},
        {"shot": "desktop/R08", "note": "adjacent bonnet women are clones"},
        {"shot": "crops/R15-pen", "note": "animals are good"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 board-and-batten and false fronts, mud street"},
        {"shot": "crops/R03-field", "note": "every crop growth stage"},
        {"shot": "desktop/R17", "note": "bungalow, Model A, pump and hay bales"},
        {"shot": "desktop/R04", "note": "town on bare lawn, same cross plan as every era"},
        {"shot": "desktop/R14", "note": "one weed stamp repeated on a near-grid"},
        {"shot": "desktop/R07", "note": "empty lake with tiling caustic pattern, no shore dressing visible"},
        {"shot": "mobile/R04", "note": "identical villa sprite twice on one screen"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "dithered on-grid lamp pools, glowing windows, neon; pools are diagonal shafts"},
        {"shot": "mobile/R05", "note": "night stays readable on the phone"},
        {"shot": "desktop/R06", "note": "dusk at 19:10 looks like overcast day, lamps unlit"},
        {"shot": "desktop/R09", "note": "rain is thin streaks only, no wet ground"},
        {"shot": "desktop/R08", "note": "fog is a flat wash with smooth off-grid curls"},
        {"shot": "desktop/R10", "note": "snow-capped roofs read well"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "strips/R13", "note": "stride and arm swing, frames 2-6 near-identical, no bob; lamp post occludes the walker"},
        {"shot": "strips/R13-mobile", "note": "same cycle at phone scale"},
        {"shot": "strips/R14", "note": "hoe wind-up, impact squash, tilled tile appears; 4-frame held settle"},
        {"shot": "desktop/R08", "note": "steam, as ambient life"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R11", "note": "crisp integer pixel font; portrait is the upscaled walking sprite"},
        {"shot": "desktop/R12", "note": "navy and gold 1931 pack, icons match the world"},
        {"shot": "desktop/R18", "note": "cream and teal shop, a different frame family"},
        {"shot": "desktop/R16", "note": "NPC name tags overlap"},
        {"shot": "mobile/R12", "note": "phone pack is legible; hotbar numbers no longer cover the icons"}
      ]
    },
    "readability": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/R03-field", "note": "crop stages and ripeness read at a glance"},
        {"shot": "mobile/R11", "note": "dialogue text about 13-16 CSS px, large buttons"},
        {"shot": "mobile/R05", "note": "night playable on the phone"},
        {"shot": "desktop/R16", "note": "labels cover heads"},
        {"shot": "desktop/R19", "note": "back-view passers-by do not read as people"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R05", "note": "real bathhouse names, neon club, globe lamps"},
        {"shot": "desktop/R06", "note": "Googie drive-in, motor hotel, hydrant"},
        {"shot": "desktop/R19", "note": "restored Row: Superior brewery, Hotel Hale, market"},
        {"shot": "desktop/R04", "note": "1886 Row has generic BATHS signs and sits on lawn"},
        {"shot": "crops/R11-npcs", "note": "Walt's 1880s ball uniform missing"},
        {"shot": "desktop/R16", "note": "1807 trade camp tents and cabin"}
      ]
    }
  },
  "gaps": [
    {"id": "G-char-checklist-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R19-player", "crops/R06-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Redraw Caleb's hat as a low-crown wide-brim slouch hat; draw Sam's bill sticking out past the forehead; give June a ponytail and rolled cuffs; add a knickers lower-body variant with white stockings for Walt; give Josiah a fur cap with tail, gray beard and fringed shirt; give Ezra a long coat and walking stick"},
    {"id": "G-env-town-lawn-layout", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Put a mountain slope band behind the Row; add sidewalks, yard fences, side lots and era street furniture; vary the street plan per era; name the 1886 bathhouses instead of generic BATHS signs"},
    {"id": "G-light-time-weather", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Grade dusk and evening with a warm-to-violet palette shift, turn lamps on from 18:00 and add long banded shadows; darken and desaturate rain scenes and add on-grid puddles and splashes; centre lamp pools under their lamps"},
    {"id": "G-char-backviews-clones", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R05", "desktop/R08", "desktop/R19"], "benchmark": "seastars-2.jpg", "fix": "Cap hat and hair at about 40% of sprite height in back and side views and show the shoulders and back of the garment; recolour garments per instance so no skirt and kerchief pair repeats on screen; give winter scenes coats and shawls"},
    {"id": "G-pixel-offgrid-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R08", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Quantize fog curls, terrace ovals, steam and the deep-water edge to the 4-px art grid with ordered dither and stepped alpha, as the R05 lamp pools already are"},
    {"id": "G-env-stamp-repetition", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R14", "desktop/R16", "mobile/R04"], "benchmark": "stardew-1.jpg", "fix": "Draw 3-4 variants per weed, reed and shrub with flips and sub-tile jitter; break up the field with tall grass and bare patches; never show the same building sprite twice on one screen"},
    {"id": "G-ui-portrait-frames", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R11", "desktop/R18", "desktop/R16"], "benchmark": "stardew-5.jpg", "fix": "Draw real 48-64 px bust portraits for named people; build one nine-slice frame material per era shared by shop, pack and dialogue; stagger or stack NPC name tags so they never overlap"},
    {"id": "G-anim-walk-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Make 6 distinct walk poses with a 1-px body bob and a lagged hat or hair bob; cut the hoe settle to 2 frames and add a recoil and a dirt-clod burst; move the double-lantern post away from the cabin door"},
    {"id": "G-char-faces-hands", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Add a 1-2 px mouth and brow, clean the face ramp to skin, shadow and highlight, separate cuff from hand, and vary eye shape by age and sex"},
    {"id": "G-pixel-title-art", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R01", "mobile/R01"], "benchmark": "snes-chronotrigger-1.png", "fix": "Clean the title backdrop clusters by hand or rebuild it from in-game tiles, and give the menu an era frame"}
  ],
  "verdict": "continue"
}
```
