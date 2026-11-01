# Critic A (critic-claude): loop 2, tier T16

## Verdict

Loop 2's new building art is the first part of this game that holds up next to the shipped benchmarks. The 1871 board-and-batten street (`desktop/R09`), the 1886 mansard Row (`desktop/R04`), the 1931 Craftsman bungalow with its 1920s truck (`desktop/R17`) and the 1955 Mission and Neoclassical Row with the drive-in and motor hotel (`desktop/R06`) are each clean, outlined, era-readable pixel art.

Everything around those buildings is still behind:
- **People** are one dome-headed template that differs only by colour. Faces are two dark pixels. Almost every checklist headwear item fails: no slouch brim, no fedora brim, no scarf, no fur cap. Several named neighbours are invisible or turned away.
- **Ground** in every era is salt-and-pepper speckle with large empty stretches.
- **Towns** have no people, wagons or street props.
- **Lighting** turns 1931 night into black silhouettes and fog into a flat milky veil.
- **Tool swing** rotates a tool over a body that does not change pose.
- **UI** is crisp DotGothic16 type in flat CSS boxes, with at least one placeholder icon.

This is a solid mid-scale build, carried by its buildings, and it fails the 7 gate in every category.

Capture note: the brief says character close-ups "sit beside their reference sheet". None of the `crops/*-player` or `crops/*-npcs` images contains a reference sheet. I scored characters against the text checklist in `research/refs/characters.md`.

---

## 1. pixel: 6.0

- **Buildings are good.** The Row facades in `crops/R04-row` and `desktop/R09` have one dark outline, readable mansard and dormer clusters, and brick coursing that reads at 1×. That is close to CAL-A (`stardew-1.jpg`) for buildings.
- **Ground fails the 7 descriptor.** Grass is per-pixel noise in three or four greens of similar value, with no clusters or tufts (`crops/R03-field` around the plot, `desktop/R02`, `desktop/R13`). Cobbles are uniform grey-brown confetti (`crops/R04-player`, `crops/R10-player`), and snow is the same confetti in blue-white (`desktop/R10`). Compare `stardew-1.jpg`: its ground is deliberate tufts and pebbles on a calm fill. Ours is the "noisy clusters, especially in foliage and ground" of the 5 anchor.
- **Two asset families.** Characters use a dark-brown outline, flat two- or three-tone fills and no hue-shifted ramp (`crops/R03-player`, `crops/R06-player`). The buildings beside them use four- or five-step ramps with black outlines. They don't look like they come from the same game.
- **Signs clip.** The 3×5 sign text cuts letters off: "IPERI" and "UAPA" in `desktop/R05`, "TRAD" in `crops/R16-npcs`.
- **Title screen is a downscaled painting.** `desktop/R01` has hundreds of colours, speckle and soft value noise, and the "Valley of Vapors" title is in a smooth serif.
- **Fog wash.** In `desktop/R08` the fog is a uniform alpha wash, so every sprite sits under a non-grid veil.

## 2. characters: 4.5

Checklist pass/fail, from the close-ups:
- **Caleb, 1871** (`crops/R03-player`, `crops/R09-player`): the hat is a tan dome with a grey band, not a low-crown wide slouch brim, so headwear fails. The shirt reads salmon-orange, not brick `#8e3b2b`.
- **Nora, 1886** (`crops/R04-player`, `crops/R10-player`): the "sun bonnet" is the same bowl dome sitting above the eyes. Its brim does not frame the face. The blue `#2b4c9b` dress shows only at the shoulders; below the arms are tan side panels and a white apron.
- **Ray, 1931** (`crops/R05-player`, `crops/R17-player`): a grey dome with no brim and no pinch. It is not a fedora.
- **June, 1955** (`crops/R06-player`): brown dome hair with no ponytail.
- **Sam, 2026** (`crops/R07-player`): back view only. The cap is a blue band with no bill silhouette.
- **Ada, 1807** (`crops/R16-player`, `crops/R02-player`): the hair is light khaki, not `#3b2a1c`. The apron and skirt stop around the knee, with white legs showing below, which breaks the ankle-length rule for every era before 1955.
- **R16 trade camp** (`crops/R16-npcs`):
  - Margaux has no red head scarf, and her skirt is a rounded barrel shape.
  - Josiah has grey hair and beard but no fur cap.
  - Ezra is not on screen at all: only his "Ezra" label floats over the tent.
- **R11 dialogue** (`crops/R11-npcs`):
  - Augustin is a white column with no visible face; the toque merges into the jacket.
  - Hattie wears a brown hat, not the white cap.
  - Walt, Augustin and Hattie are all shown from behind while you talk to them.

Every head is the same oval dome at the same size, and every face is two dark pixels with no mouth or brows. In grayscale the cast would be indistinguishable, which is the 3–5 anchor.

Not a single named person passes 4 of 5 checks with confidence. CAL-A (`stardew-1.jpg`, pegged 6.5) has a tiny farmer, but its straw hat has a real brim and townsfolk differ by hair shape.

The animals are the bright spot. Cows, goat and hens in `crops/R15-pen` have clear silhouettes, outlines and small shadows.

## 3. environment: 6.0

What works:
- Buildings show construction: log courses in `desktop/R02`, board-and-batten with porches and false fronts in `desktop/R09`, mansards, brick and dormers in `desktop/R04`, the Craftsman knee-braces in `desktop/R17`.
- Crops read in five stages at one scale (`crops/R03-field`).
- The pen fences join (`desktop/R15`).
- The open spring box in `desktop/R08` is a good new sprite.

What doesn't:
- **Empty streets.** The towns have no townsfolk, carriages, hitching posts, boardwalks, barrels or benches on the streets (`desktop/R04`, `desktop/R09`, `desktop/R10`).
- **Empty fields.** Farm frames are 50–70% empty speckle grass (`desktop/R03`, `desktop/R13`, `desktop/R17`).
- **Empty lake.** `desktop/R07` is about 80% flat tiled water with a plank pier and nothing else: no posts under the pier, no boats, no reeds.
- **Unreadable props.**
  - A brown four-legged shape lies on its side by the cabin in `desktop/R13`, `desktop/R15` and `mobile/R13`. It reads as a dead animal.
  - The animal by the springs in `desktop/R08` reads as a cardboard box with ears.
  - A solid white rounded rectangle sits on the 1871 cabin wall in `desktop/R13` and every frame of `strips/R13`.
- **No contact shadows.** Rocks and crates sit on the grass with none.

CAL-A (8) and CAL-B (`chained-5.jpg`, 8.5) are dense, layered scenes with wares, rugs, crates and puddles. This build is "competent buildings, sparse dressing".

## 4. lighting: 5.0

- **1931 night** (`desktop/R05`, `mobile/R05`): the "re-darken buildings" pass crushes every facade to near black. The Mission, tiled-dome and Neoclassical Row this loop added cannot be seen at all, only a few small window lamps.
  - Lamp pools are identical overlapping ellipses repeated on a grid. Their edges are stepped on the art grid (`crops/R05-player`), which is good.
  - A bright horizontal seam runs along the street edge at y≈455.
  - CAL-C (`seastars-2.jpg`) keeps faces, ground and rock readable at night while lights mix. Ours loses the buildings outright.
- **Fog** (`desktop/R08`, `crops/R08-player`): one uniform milky alpha layer over everything, player included. A lamp post is also blended visibly through the player's face and torso.
- **1955 dusk** (`desktop/R06`): reads as overcast pink-grey. There are no long shadows, and the street lamps are off at 19:10.
- **2026 evening** (`desktop/R07`): grey-teal with no golden or warm light anywhere.
- **Rain** (`desktop/R09`, `desktop/R02`): thin streaks and a slight darkening, with no splashes or puddles.
- **Snow roofs** (`desktop/R10`) are a real improvement.
- **Shadows**: animals have soft contact shadows; buildings and characters barely do.

Overall: day/night is present, but the light pools are generic and the weather is a filter. That is the 5 anchor.

## 5. animation: 5.0

- **Walk** (`strips/R13`, `strips/R13-mobile`): the side walk shows about four distinct leg poses across eight samples (frames 1–2 spread, 3–6 near-passing, 7–8 spread).
  - No visible arm swing or head bob, and the dome hat covers roughly 40% of the sprite.
  - A lamp or hitching post with lanterns stays fully opaque in front of the player in frames 1–6.
  - The white rectangle on the wall persists through all eight frames.
- **Hoe** (`strips/R14`): the tool shows five poses (frames 1–5), but the body sprite is the same standing frame throughout. The tool rotates over the torso, and in frames 1–2 it covers her face.
  - On impact (frame 4) there is at most a 2–3 px grey chip, with no readable soil burst.
  - No tilled tile appears in frames 6–8, which are idle.
  - The swing lands on grass beside the campfire (`desktop/R14`).
- **Ambient motion**: no chimney smoke, water motion or idle NPC motion shows in any capture.

This sits at the anchor-5 baseline. The tool has a wind-up but no body follow-through, hit-stop or squash.

## 6. ui: 5.5

What works:
- DotGothic16 body text is crisp and integer-scaled on both viewports (`desktop/R12`, `mobile/R11`).
- Each era has its own colour theme: dark green in 1807 (`desktop/R02`), cream in 1871 and 1886, navy and gold in 1931 (`desktop/R12`), cream and teal in 1955 (`desktop/R18`), blue in 2026 (`desktop/R07`).
- Hotbar icons are pixel art.

What doesn't:
- **Flat panels.** They are CSS rectangles with thin double borders, not nine-slice frames in an era material. "Close [Esc]" and "Buy / x5" in `desktop/R18` look like a web form.
- **Placeholder icons.** The shop's Hen icon is an empty outline oval, and Hardware is a generic gear (`desktop/R18`).
- **Numbers on icons.** Slot numbers print over the icon art (`desktop/R12`, the hotbar in every frame).
- **Colliding labels.** NPC name labels overlap each other and the sprites: "Augustin" over Walt in `desktop/R11`, "Josiah TRADE Margaux" in one run in `desktop/R16`.
- **Small portrait.** The dialogue portrait in `desktop/R11` is about 64 px of low-detail upscaled sprite in a plain cream box. `stardew-5.jpg` (pegged 7.5) has a large framed portrait, a name plate and a wooden frame.
- **Title.** `desktop/R01` uses a smooth anti-aliased serif.
- **Phone HUD.** On the phone, the HUD stack takes the top ~26% of the screen and covers the Row buildings (`mobile/R04`, `mobile/R02`).

## 7. readability: 6.0

What works:
- The player is always findable thanks to the corner-bracket target (`desktop/R03`, `mobile/R04`).
- Crop stages and ripeness read (`crops/R03-field`).
- Phone text is at least 10 CSS px (`mobile/R12`, `mobile/R11`).

What doesn't:
- **NPCs read only by colour.** In `mobile/R11` you can tell the three NPCs apart only by hue, and their labels overlap.
- **Night hides the town.** In `mobile/R05` you cannot see any building, door or interactable except the signs.
- **Fog** halves contrast on the gameplay layer, player included (`desktop/R08`).
- **Hidden neighbour.** Ezra, a quest neighbour, is invisible behind the tent in `desktop/R16`.
- **Phone HUD cost.** The HUD stack costs a quarter of the playfield (`mobile/R02`, `mobile/R13`).

Compared with CAL-A's phone pegging of 8.5, which comes from bright values and strong outlines, this is "readable with effort".

## 8. authenticity: 6.0

A blind viewer could mostly order the buildings:
- 1807: log cabin and patched canvas trade tents (`desktop/R02`, `desktop/R16`).
- 1871: weathered board-and-batten, false fronts and a stage office (`desktop/R09`).
- 1886: brick and frame Second Empire mansards and a grand hotel (`desktop/R04`).
- 1931: Craftsman bungalow, 1920s pickup and five-globe lamp clusters (`desktop/R17`, `desktop/R05`).
- 1955: Row with real names, drive-in with a fin sign, motor hotel (`desktop/R06`).

That is a real step toward the 7 descriptor, but:
- **Clothing fails the checklist almost entirely.** See characters: no slouch hats, no fedoras, no scarf, no fur cap, Ada's knee-length skirt.
- **2026 has no modern cue.** `desktop/R07` is a generic lake and pier; nothing in frame is 2026.
- **The 1931 Row is invisible** at night in `desktop/R05`.
- **Seasonal slips.** Purple flower boxes bloom in the snow in `desktop/R10`.
- **Sign scale.** The 1886 signs are oversized boards that dominate the facades.
- **Weather mismatch.** `desktop/R02`, billed as a "spring morning", is captured in rain.

This sits at the gate, not above it.

---

## Ranked gaps

The 13 gaps are ranked by points at stake. Each has a severity (1–5) and an effort (S/M/L).

1. **G-headwear-and-garment-silhouettes**: characters, WS2. Severity 5, effort L, expected gain +1.5.
   - **Problem:** every head is the same dome (`crops/R03-player`, `crops/R05-player`, `crops/R04-player`, `crops/R16-npcs`).
   - **Fix:**
     - Build distinct per-kind hat sprites in all four directions: slouch with a 2-px brim wider than the head; fedora with a pinch notch and a snapped brim; deep sun bonnet whose brim surrounds the face; dress bonnet; soft toque; fur cap with tail; knotted head scarf; ball cap with a visible bill; round brim.
     - Add a `lower: skirt` silhouette down to the ankle.
     - Use per-person hat colour (Hattie white).
     - Give faces a 1-px mouth or brow so expressions read.
   - **Benchmark:** `stardew-1.jpg` (straw brim), `seastars-2.jpg` (distinct heads).

2. **G-ground-texture-noise**: pixel, WS1 and WS3. Severity 4, effort M, expected gain +1.0.
   - **Problem:** grass, cobble and snow are per-pixel speckle (`crops/R03-field`, `crops/R04-player`, `desktop/R10`).
   - **Fix:** re-author the terrain as a calm two-tone base with hand-placed 3–6 px clusters (tufts, pebbles, cobble outlines), and keep detail sparse, around 10–15% of pixels. Scatter extra detail decals rather than raising per-pixel noise.
   - **Benchmark:** `stardew-1.jpg`, `chained-5.jpg`.

3. **G-night-facades-crushed**: lighting, WS4. Severity 4, effort M, expected gain +1.0.
   - **Problem:** the 1931 night Row is black silhouettes (`desktop/R05`, `mobile/R05`).
   - **Fix:**
     - Keep facades at about 35–45% value under a cool moonlight ramp.
     - Light every window warm and add a lit sign glow.
     - Vary the lamp-pool shapes, two or three banded steps, and stop repeating identical ellipses.
     - Remove the bright seam at the street edge.
   - **Benchmark:** `seastars-2.jpg`.

4. **G-empty-towns-and-fields**: environment, WS3. Severity 4, effort M, expected gain +1.0.
   - **Problem:** streets and fields are empty (`desktop/R04`, `desktop/R09`, `desktop/R03`, `desktop/R07`).
   - **Fix:**
     - Add ambient townsfolk and era vehicles: buggies in 1871 and 1886, cars in 1931 and 1955.
     - Add street dressing: boardwalks, hitching rails, barrels, benches, planters.
     - Add contact shadows under props.
     - Break up the farm grass with flowers, rocks and worn paths.
     - Give the lake reeds, boats and pier posts.
   - **Benchmark:** `chained-5.jpg`.

5. **G-tool-body-poses-and-feedback**: animation, WS5. Severity 4, effort M, expected gain +1.0.
   - **Problem:** the body is static during the hoe swing, impact feedback is invisible, and the walk has no arm swing or bob (`strips/R14`, `strips/R13`).
   - **Fix:**
     - Draw body poses that match the five tool poses: arms raised, torso lean, recoil.
     - Add a 2–3 frame soil burst of 6–10 px, plus 1–2 frames of hit-stop on impact.
     - Show the tilled tile at once.
     - Give the walk six frames with arm swing and a 1-px head bob.

6. **G-weather-time-moods**: lighting, WS4. Severity 3, effort M, expected gain +0.5.
   - **Problem:** the fog veil, the grey evening and the unlit dusk (`desktop/R08`, `desktop/R07`, `desktop/R06`).
   - **Fix:**
     - Replace the flat fog alpha with banded drifting fog sprites, kept off the player.
     - Add a warm golden ramp and low sun on water in the 2026 evening.
     - Turn lamps on and lengthen shadows at dusk.
     - Add rain splashes and puddles.

7. **G-ui-material-and-icons**: ui, WS6. Severity 3, effort M, expected gain +1.0.
   - **Problem:** flat CSS boxes, a placeholder icon, a small portrait and a heavy phone HUD (`desktop/R18`, `desktop/R12`, `desktop/R11`, `mobile/R04`).
   - **Fix:**
     - Nine-slice frames in each era's material.
     - Real Hen and Hardware icons.
     - A portrait of at least 2× with a name plate.
     - Move slot numbers off the icon art.
     - A pixel title font.
     - Collapse the phone HUD into one strip.
   - **Benchmark:** `stardew-5.jpg`.

8. **G-npc-facing-labels-visibility**: readability, WS2. Severity 3, effort S, expected gain +0.5.
   - **Problem:** NPCs turn away in dialogue, labels collide, and Ezra is hidden (`desktop/R11`, `crops/R11-npcs`, `desktop/R16`).
   - **Fix:** turn the NPC toward the player on talk, de-collide labels or show only the nearest one, and keep NPC spawn points out of building footprints.

9. **G-sign-clipping-and-blank-board**: environment, WS3. Severity 3, effort S, expected gain +0.5.
   - **Problem:** clipped sign text and a blank white board (`desktop/R05`, `crops/R16-npcs`, `desktop/R13`).
   - **Fix:** size each board to its text or use a narrower glyph set, so names like "SUPERIOR" and "QUAPAW" fit. Remove or texture the white rectangle on the 1871 cabin wall.

10. **G-occlusion-artifacts**: readability, WS1. Severity 2, effort S, expected gain +0.3.
    - **Problem:** the post is solid over the player in `strips/R13`, and a post is blended through the player's face in `crops/R08-player`.
    - **Fix:** apply the see-through rule to every post and lantern prop, and draw the faded post behind the player's face rather than through it.

11. **G-2026-era-signals**: authenticity, WS7. Severity 3, effort M, expected gain +0.5.
    - **Problem:** nothing in `desktop/R07` says 2026, and the restored Row is not in the captures.
    - **Fix:** add a modern pontoon dock, kayaks, LED lamps and a park sign at the lake, and add a restored-Row daytime capture.

12. **G-ambiguous-props**: environment, WS3. Severity 2, effort S, expected gain +0.3.
    - **Problem:** the dead-animal-looking prop (`desktop/R13`, `desktop/R15`) and the box-dog (`desktop/R08`).
    - **Fix:** redraw or replace both.

13. **G-seasonal-dressing**: authenticity, WS7. Severity 2, effort S, expected gain +0.2.
    - **Problem:** flower boxes bloom in the snow (`desktop/R10`).
    - **Fix:** swap them for bare or evergreen boxes in winter, and add winter clothing layers.

```json
{
  "loop": 2,
  "role": "critic-claude",
  "tier": "T16",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Buildings: clean single dark outline, readable mansard/dormer clusters and brick coursing"},
        {"shot": "crops/R03-field", "note": "Grass around plot is per-pixel speckle with no clusters; anchor-5 ground noise"},
        {"shot": "crops/R04-player", "note": "Cobbles are uniform confetti; character uses flat 2-3 tone fills vs 4-5 step ramps on buildings"},
        {"shot": "desktop/R05", "note": "3x5 sign text clips: IPERI, UAPA"},
        {"shot": "desktop/R01", "note": "Title art reads as a downscaled painting; anti-aliased serif title"},
        {"shot": "desktop/R08", "note": "Fog is a flat alpha veil over all sprites"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/R03-player", "note": "Caleb: dome cap with band, not slouch brim; shirt salmon not brick red"},
        {"shot": "crops/R04-player", "note": "Nora: bonnet is a bowl dome above the eyes, does not frame face; dress blue only at shoulders"},
        {"shot": "crops/R05-player", "note": "Ray: grey dome, no fedora brim or pinch"},
        {"shot": "crops/R16-npcs", "note": "Margaux no red scarf; Josiah no fur cap; Ezra invisible behind tent; same face on all"},
        {"shot": "crops/R11-npcs", "note": "Augustin faceless white column; Hattie brown hat not white cap; NPCs face away in dialogue"},
        {"shot": "crops/R16-player", "note": "Ada hair khaki not #3b2a1c; skirt to knee, breaks ankle-length rule"},
        {"shot": "crops/R15-pen", "note": "Animals are the strong point: clear silhouettes and shadows"}
      ]
    },
    "environment": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 board-and-batten, porches, false fronts: good construction detail"},
        {"shot": "crops/R03-field", "note": "Crops read across five stages at one scale"},
        {"shot": "desktop/R04", "note": "Town streets empty: no people, vehicles or street props"},
        {"shot": "desktop/R07", "note": "Lake frame ~80% flat tiled water; pier with no posts, no dressing"},
        {"shot": "desktop/R13", "note": "Blank white rectangle on cabin wall; lying-animal-like prop; 60% empty speckle grass"},
        {"shot": "desktop/R15", "note": "Joined post-and-rail pen fences, trough, wagon: decent dressing near farm"}
      ]
    },
    "lighting": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R05", "note": "Facades crushed to black; identical lamp ellipses on a grid; bright seam at street edge"},
        {"shot": "crops/R05-player", "note": "Pool edges are stepped on the art grid (good)"},
        {"shot": "desktop/R08", "note": "Fog is one flat milky alpha layer, including the player"},
        {"shot": "desktop/R06", "note": "Dusk reads overcast; no long shadows; lamps unlit at 19:10"},
        {"shot": "desktop/R07", "note": "Evening shows no warm/golden light"},
        {"shot": "desktop/R10", "note": "Snow roof variants are a real improvement"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "About 4 distinct leg poses in 8 samples; no arm swing or bob; post stays opaque over player"},
        {"shot": "strips/R13-mobile", "note": "Same cycle on phone; white board persists every frame"},
        {"shot": "strips/R14", "note": "Five tool poses but body sprite static; tool covers face in 1-2; impact chip 2-3 px; no tilled tile"},
        {"shot": "desktop/R14", "note": "Swing lands on grass beside campfire with no visible result"}
      ]
    },
    "ui": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R12", "note": "Crisp DotGothic16, 1931 navy/gold theme; flat CSS boxes; slot numbers over icons"},
        {"shot": "desktop/R18", "note": "Shop is a web-form list; Hen icon is an empty oval placeholder"},
        {"shot": "desktop/R11", "note": "Small 64-px portrait in plain box vs stardew-5 framed portrait; colliding name labels"},
        {"shot": "mobile/R04", "note": "Phone HUD stack covers the top ~26% and hides Row buildings"},
        {"shot": "desktop/R01", "note": "Title uses smooth anti-aliased serif"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "Player findable via bracket; HUD covers a quarter of the playfield"},
        {"shot": "crops/R03-field", "note": "Crop stages and ripeness distinguishable"},
        {"shot": "mobile/R11", "note": "NPCs separable only by colour; labels overlap"},
        {"shot": "mobile/R05", "note": "Night hides all buildings and doors"},
        {"shot": "desktop/R08", "note": "Fog halves contrast on gameplay layer"},
        {"shot": "desktop/R16", "note": "Quest NPC Ezra invisible behind tent"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 weathered board-and-batten and false fronts"},
        {"shot": "desktop/R04", "note": "1886 brick/frame mansards and grand hotel"},
        {"shot": "desktop/R17", "note": "1931 Craftsman bungalow and 1920s pickup"},
        {"shot": "desktop/R06", "note": "1955 Superior/Quapaw/Ozark/Hale, drive-in, motor hotel"},
        {"shot": "desktop/R07", "note": "2026 shows no modern cue"},
        {"shot": "crops/R16-npcs", "note": "Clothing checklist fails (no scarf, no fur cap, knee skirt)"},
        {"shot": "desktop/R10", "note": "Flower boxes blooming in snow"}
      ]
    }
  },
  "gaps": [
    {"id": "G-headwear-and-garment-silhouettes", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R04-player", "crops/R05-player", "crops/R16-npcs", "crops/R16-player"], "benchmark": "stardew-1.jpg; seastars-2.jpg", "fix": "Per-kind hat sprites in 4 directions (slouch with 2-px brim wider than head, pinched fedora with snapped brim, deep sun bonnet framing face, dress bonnet, soft toque, fur cap with tail, knotted scarf, ball cap with visible bill, round brim); add ankle-length skirt lower silhouette; per-person hat colour; 1-px mouth/brow."},
    {"id": "G-ground-texture-noise", "category": "pixel", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R04-player", "desktop/R10"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Re-author grass/cobble/snow as calm two-tone base plus hand-placed 3-6 px clusters, about 10-15% detail coverage, with scattered decals instead of per-pixel noise."},
    {"id": "G-night-facades-crushed", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Keep facades at 35-45% value under cool moonlight ramp; light all windows and signs warm; vary lamp-pool shapes with 2-3 banded steps; remove street-edge seam."},
    {"id": "G-empty-towns-and-fields", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R03", "desktop/R07"], "benchmark": "chained-5.jpg", "fix": "Ambient townsfolk and era vehicles, boardwalks, hitching rails, barrels, benches, contact shadows; break farm grass with flowers/rocks/worn paths; lake reeds, boats and pier posts."},
    {"id": "G-tool-body-poses-and-feedback", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Body poses matching the 5 tool poses (arms up, torso lean, recoil); 2-3 frame soil burst of 6-10 px with 1-2 frame hit-stop; immediate tilled tile; 6-frame walk with arm swing and 1-px head bob."},
    {"id": "G-weather-time-moods", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R08", "desktop/R07", "desktop/R06", "desktop/R09"], "fix": "Banded drifting fog sprites kept off the player; warm golden ramp for 2026 evening; lamps on and long shadows at dusk; rain splashes and puddles."},
    {"id": "G-ui-material-and-icons", "category": "ui", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R12", "desktop/R11", "mobile/R04"], "benchmark": "stardew-5.jpg", "fix": "Nine-slice era-material frames; real Hen/Hardware icons; portrait at least 2x with name plate; slot numbers off icon art; pixel title font; compact single-strip phone HUD."},
    {"id": "G-npc-facing-labels-visibility", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R11", "crops/R11-npcs", "desktop/R16"], "fix": "Turn NPCs toward the player on talk; de-collide or show only the nearest label; keep NPC spawns out of building footprints."},
    {"id": "G-sign-clipping-and-blank-board", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R05", "crops/R16-npcs", "desktop/R13"], "fix": "Size sign boards to text or use narrower glyphs so SUPERIOR/QUAPAW/TRADE fit; remove or texture the white rectangle on the 1871 cabin."},
    {"id": "G-occlusion-artifacts", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["strips/R13", "crops/R08-player"], "fix": "Apply see-through rule to all post and lantern props; draw the faded post behind the player's face rather than through it."},
    {"id": "G-2026-era-signals", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R07"], "fix": "Modern pontoon dock, kayaks, LED lamps and park signage at the lake; add a restored-Row daytime capture."},
    {"id": "G-ambiguous-props", "category": "environment", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R13", "desktop/R15", "desktop/R08"], "fix": "Redraw or replace the lying-animal-looking prop by the cabin and the box-shaped dog by the springs."},
    {"id": "G-seasonal-dressing", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["desktop/R10"], "fix": "Winter swaps for flower boxes and winter clothing layers."}
  ],
  "verdict": "continue"
}
```
