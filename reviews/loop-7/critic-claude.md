# Critic A (critic-claude): loop 7, tier T32

## 1. Verdict

The buildings carry this game. The Row façades, the 1931 to 2026 re-skins and the 1955 Googie strip are close to CAL-A (`stardew-1.jpg`) in pixel discipline, and the 1931 night shows real, on-grid dithered light. The people and the moment-to-moment frame fall well short. Loop 7's main claim is that side and back views now show a head and shoulders under the hat. The captures do not support it. In `strips/R13` the farmer in profile is still a dome taking about 45% of his height. The 1931 passer-by in `desktop/R05` is a straw disc wider than her torso. The 1955 woman in `desktop/R06` reads as a brown animal shape. The claim of varied townswomen is also contradicted: `desktop/R04`, `desktop/R08` and `desktop/R10` each show three or four identical bonneted women in the same poses. Depth sorting is broken in at least four captures:
- a lamp post drawn over the player (`crops/R08-player`, `strips/R13`)
- a trough drawn over the player's hat (`crops/R15-player`)
- a lamp post drawn through a walking NPC (`desktop/R06`)
- Ezra hidden entirely behind the player, with his name tag over empty canvas (`crops/R16-npcs`)

Farm and lake screens are 50–70% empty grass or flat water. Rain and fog do not touch the ground. Characters fails its gate badly. Animation, lighting, ui, readability, pixel and environment all sit below 7. Verdict: continue.

## 2. Category scores

### pixel: 6.5
- **Strengths.** Buildings are hand-placed quality. `crops/R04-row` and `crops/R19-row` show one dark outline rule, clean shingle and brick clusters, and warm-lit windows with hue-shifted ramps. That is on par with CAL-A (7.5) on those assets. The crops in `crops/R03-field` are crisp and outlined.
- **Character sprites.** These are a different family. They are Blender renders with soft pillow shading, and the clusters turn to mush at 4×: the hat dome and body in `strips/R13` frames 5–8, the 1931 passer-by in `desktop/R05` (my 4× zoom of the lamp area), and the 1955 woman in `desktop/R06`. The shading on Ada's head also shifts from frame to frame in `strips/R14` (frames 1–2 against 4–8), which is renderer noise, not deliberate pixels.
- **Ground.** The grass is a uniform mottled noise with repeated dark tufts (`desktop/R03`, `desktop/R02`, the background of `crops/R03-player`). It is busier than CAL-B's (`chained-5.jpg`) ground and has less meaning.
- **Title screen.** `desktop/R01` is a dense, noisy painting-style pixel image with hundreds of colours. It doesn't match the in-game sprite discipline.
- **Overall.** One grid, but two asset families with different rules. Below CAL-A.

### characters: 5.0
Per-person checks against `research/refs/characters.md`:
- **Caleb Vale** (`crops/R03-player`, `crops/R09-player`, `crops/R15-player`): he wears a round flat newsboy cap, not the wide-brim slouch hat that should break the head outline. Headwear fails, silhouette fails, there's no prop, and an unexplained brown blob sits on his chest.
- **Ray Vale** (`crops/R05-player`, `crops/R17-player`): the "fedora" is a grey dome with no pinched crown and no snapped brim. Fail.
- **June Vale** (`crops/R06-player`): no ponytail, a round boyish head and plain trousers. She reads as a boy. Silhouette fails.
- **Sam Vale** (`crops/R07-player`): the ball cap reads. Pass, but the generic tee has no prop.
- **Nora** (`crops/R04-player`, `crops/R10-player`): sun bonnet, blue bodice and apron. Mostly passes, though the bonnet from the front is a cream disc over the eyes.
- **Ada** (`crops/R02-player`, `crops/R16-player`): hair hangs loose instead of pinned up. The short-gown over petticoat and apron are roughly right. Borderline.
- **1807 trade camp** (`crops/R16-npcs`): Ezra is not visible at all, because the player sprite covers him. Josiah's fur cap reads as a grey flat cap. Margaux's red scarf merges with her hair and doesn't read as a knotted head scarf.
- **1886 group** (`crops/R11-npcs`): Hattie passes (white cap, white dress). Augustin from the side is a white blob that is passable as a toque. Walt has a blue cap but no knickers or white stockings.
- **Every face** is one template: two large grey eyes and no mouth. No expression, age or body-type variety. Compare CAL-C (`seastars-2.jpg`): 14 people, all distinct in silhouette and age.
- **Side and back views** still show oversize discs (`strips/R13`, the passer-by in `desktop/R05`, `desktop/R06`). Identical bonnet clones repeat in `desktop/R04` and `desktop/R08`.
- **Animals** are the bright spot. `crops/R15-pen` has solid cows, a goat with no holes and readable hens, near CAL-A animals.
- **Overall.** Readable figures, generic, with several checklist misses per person. That is the rubric's 5.

### environment: 6.5
- **Strengths.** Buildings show construction: board-and-batten and false fronts in 1871 (`desktop/R09`), Second Empire mansards and Queen Anne trim in 1886 (`desktop/R04`), and in 2026 a Spanish-revival brewery and a mosaic-dome spa (`crops/R19-row`). Props have contact shadows (wagon and cart in `desktop/R13`, the Model A in `desktop/R17`). The crop growth stages read in `crops/R03-field`.
- **Empty composition.** In `desktop/R03` about 70% of the frame is empty mottled grass. In `desktop/R07` about 70% is a single flat water texture with no boats, reeds, rocks or shoreline detail, and the pier just stops. In `desktop/R08` the springs area is a flat grey plane with four scattered stone boxes. In `desktop/R02` and `mobile/R13` the bottom half of the farm is bare.
- **Town layout.** Towns are four detached buildings on lawns either side of a cross-shaped road, the same layout in every era (`desktop/R04`, `desktop/R05`, `desktop/R19`). The 1871 and 1931 farmyards (`desktop/R13`, `desktop/R17`) share an identical prop layout.
- **Crops.** The full-grown corn and wheat sprites stamp identically down each column.
- **Depth sorting.** Broken sorting puts props over people (`crops/R15-player`, `crops/R08-player`).
- **Comparison.** Below CAL-A's density (8). CAL-B (`chained-5.jpg`) packs awnings, rugs, crates, an ox and a puddle into the same area that `desktop/R03` leaves as grass.

### lighting: 6.0
- **Best case, the 1931 night** (`desktop/R05`, `mobile/R05`). It keeps light on the grid with checkerboard dithering, and the scene mixes warm window glows, lamp pools on the brick and a pink neon CLUB sign. That is close to the rubric's 7. The night stays playable. Lamp pools are faint, though, and sprites take no lamp light or rim light.
- **Dusk** (`desktop/R06`, 19:10) is almost the same as day: a slight desaturation and lit windows.
- **Evening** (`desktop/R07`, 18:20) has no warm or low light at all.
- **Rain** (`desktop/R09`) is sparse streaks on a fully dry, bright road. There's no wet sheen, no puddles, no darker grade and no splashes.
- **Fog** (`desktop/R08`) is a flat milky wash over half the screen, with no banding or depth.
- **Snow** (`desktop/R10`) is good: snow-capped roofs, banked ground, falling flakes.
- **Shadows.** Characters get only a soft blob shadow. There are no cast shadows tied to a sun direction, unlike CAL-B (7).
- **Overall.** One strong scene. The weather and time-of-day moods are thin.

### animation: 5.5
- **Walk** (`strips/R13`, `strips/R13-mobile`). It has a stride with arm swing in frames 7–8, but frames 5 and 6 are nearly identical, and the huge hat dome stays rigid with no bob.
- **Lamp post.** The player walks straight through a lamp post. It draws on top of him in frames 1–4, hiding half the cycle.
- **Hoe swing** (`strips/R14`). There is a wind-up with the hoe behind the head (frames 1–2), a downstroke (3), and impact with the tilled tile appearing (4). Then frames 5–8 are a static hold: no dust puff, no squash, no hit-stop, no settle motion.
- **Missing feedback.** Neither strip shows crops or grass reacting, or any idle secondary motion.
- **Overall.** Above the SNES baseline on tool wind-up, below the rubric's 7 for feel.

### ui: 6.5
- **Strengths.** A pixel font at integer scale, with era-tinted frames: cream and wood in 1871/1886 (`desktop/R04`), navy and gold in 1931 (`desktop/R12`), teal in 1955 (`desktop/R18`), blue in 2026 (`desktop/R19`). That is a real step toward the rubric's 9 idea. The dialogue box in `desktop/R11` is crisp, and its hierarchy (name, role, line, request tag) is clear. The shop (`desktop/R18`) is legible and well structured. On touch, the pack's Close button drops the "Esc" hint as claimed (`mobile/R12`).
- **Hotbar chips on phone.** The new slot and stack chips hide 30–40% of the item icons in slots 7 and 8 (`mobile/R04`, `mobile/R12`, `mobile/R02`).
- **Pack panel.** On desktop (`desktop/R12`) it is a large empty navy box around a small 8×3 grid of 50 px slots.
- **Shop font.** It mixes a smaller body face with the HUD face.
- **Name labels.** They collide: "JOSIAH TRADE MARGAUX" overlaps in `desktop/R16`.
- **Dialogue portrait** (`desktop/R11`, `mobile/R11`). It is a small, low-detail upscale of the sprite, well short of the portrait box in `stardew-5.jpg` (7.5).

### readability: 6.5
- **Strengths.** The player is findable on phone, at roughly 35 CSS px tall (`mobile/R02`, `mobile/R04`). HUD text is 10 CSS px or larger. The crops in `crops/R03-field` are distinct by species. The 1931 night stays legible (`mobile/R05`).
- **Depth sorting hides gameplay objects.** Ezra is invisible (`crops/R16-npcs`), a lamp post sits over the player (`crops/R08-player`), and a trough covers the player's head (`crops/R15-player`).
- **Back views.** Townsfolk seen from behind read as blobs rather than people (`desktop/R06`, `desktop/R19`: the brown shape at x≈280).
- **Phone hotbar.** The chips hide what is selected or held (`mobile/R04`).
- **Overlap.** Overlapping name tags and quest "!" markers clutter the group in `desktop/R11`.
- **Fog.** It washes out the right half of `desktop/R08`.
- **Comparison.** CAL-B is 7.5 with a busy ground. This is lower, because objects actually disappear.

### authenticity: 7.0
- **Strengths.** The eras would sort blind:
  - 1807: log cabin and canvas trade camp (`desktop/R02`, `desktop/R16`)
  - 1871: board false-front town on a dirt street, with STAGE and DRUGS signs (`desktop/R09`)
  - 1886: Victorian brick and frame bathhouses with a grand hotel (`desktop/R04`)
  - 1931: the Row labelled SUPERIOR, QUAPAW, OZARK and HALE, with neon CLUB, globe lamps, a Model A pickup and a Craftsman bungalow (`desktop/R05`, `desktop/R17`)
  - 1955: Googie drive-in, MOTOR HOTEL sign, painted centre line and a fire hydrant (`desktop/R06`)
  - 2026: Superior as a brewery, Quapaw as a domed spa, Ozark as a cultural centre, and Hotel Hale, with a farmers' market pavilion (`desktop/R19`)

  The re-use of each Row building is grounded in the real valley.
- **Row layout.** It is laid out as detached buildings on lawns in a cross grid, not the continuous line along Central Avenue under Hot Springs Mountain, and that grid is identical in every era.
- **Street lights.** The 1931 lamps are three-globe, not the five-globe clusters `pixel-anchors.md` names for 1929 (my zoom of `desktop/R05`).
- **Clothing.** The headwear misses under characters undercut the clothing check: Caleb's slouch hat, Ray's fedora, Josiah's fur cap.
- **2026 street.** No vehicles (`desktop/R19`).
- **Overall.** It holds the 7 anchor, not more.

## 3. Ranked gaps

1. **G-depth-sort-occlusion** (readability, WS1). Severity 5, effort S, expected gain +1.0 (readability +0.5, environment +0.5).
   - **Evidence:** props draw over people and NPCs hide behind the player (`crops/R08-player`, `crops/R15-player`, `strips/R13`, `crops/R16-npcs`, `desktop/R06`).
   - **Fix:** Y-sort every prop and actor by its foot line, not its sprite top. Give lamp posts, troughs and fences collision footprints so actors can't overlap them. Keep NPCs from standing in the 1-tile cone in front of the player during group scenes.
2. **G-profile-back-headwear** (characters, WS2). Severity 4, effort M, expected gain +1.0.
   - **Evidence:** in profile and from behind, hats are still discs or domes wider than the torso (`strips/R13`, `desktop/R05`, `desktop/R06`, `desktop/R04`).
   - **Fix:** scale side and back hats until the brim is no wider than the shoulders plus 2 px. Show the nape, ears and collar. Give the back view a separate hair mass. Then recheck every 1871–1955 townsfolk sprite in a grayscale strip.
3. **G-checklist-headwear-silhouettes** (characters, WS2). Severity 4, effort M, expected gain +1.0.
   - **Evidence:** `crops/R03-player`, `crops/R17-player`, `crops/R06-player`, `crops/R16-npcs`, `crops/R11-npcs`.
   - **Fix:** build the missing hat kinds: Caleb's wide slouch brim, Ray's pinched fedora with a snapped brim, Josiah's fur cap with a tail, and Margaux's knotted scarf in a colour that contrasts with her hair. Add June's ponytail, Walt's knickers and white stockings, and pin up Ada's hair. Add 2–3 mouth and brow variants so faces stop being one template.
4. **G-townsfolk-variety** (characters, WS2). Severity 3, effort M, expected gain +0.5.
   - **Evidence:** three or four identical purple-skirted bonnet women in the same poses in `desktop/R04`, `desktop/R08` and `desktop/R10`, despite the claimed bonnet/headscarf/no-hat mix.
   - **Fix:** check that the variant roll actually reaches the 1886 spawn set. Vary skirt colour, headwear and body height per passer-by, and seed their positions differently per scene.
5. **G-empty-screens** (environment, WS3). Severity 3, effort M, expected gain +1.0.
   - **Evidence:** `desktop/R03`, `desktop/R07`, `desktop/R08`, `mobile/R13`.
   - **Fix:** dress the empty farm and lake screens. Farm: stumps, rock clusters, fence runs, a woodpile, a path network and tall-grass patches. Lake: reeds, lily pads, rocks, a moored boat, ripple rings and shoreline transitions. Springs: tufa terraces, steaming runnels and boardwalks. Break the grass noise with larger darker and lighter patches.
6. **G-weather-time-grade** (lighting, WS4). Severity 3, effort M, expected gain +1.0.
   - **Evidence:** `desktop/R09`, `desktop/R08`, `desktop/R06`, `desktop/R07`.
   - **Fix:** rain darkens and cools the grade, adds dithered wet sheen and puddles with splash frames, and denser streaks. Fog becomes banded layers with distance falloff instead of a flat wash. Dusk and evening get a warm, lowered grade with longer shadows. Give sprites a lamp tint near light sources.
7. **G-tool-feel** (animation, WS5). Severity 3, effort M, expected gain +1.0.
   - **Evidence:** `strips/R14` frames 5–8 are a static hold, and `strips/R13` frames 5 and 6 are near duplicates.
   - **Fix:** add a soil-dust burst and a clod pop, a 1–2 frame squash on impact with a short hit-stop, and a settle pose back to idle. Make sure the walk cycle shows six distinct poses, with a 1 px head and hat bob.
8. **G-character-shading-family** (pixel, WS1). Severity 3, effort M, expected gain +0.5.
   - **Evidence:** `strips/R13`, `desktop/R05`, `desktop/R06`, `strips/R14` (frame-to-frame shade shift).
   - **Fix:** posterize the Blender sprites to 3–4 tone ramps per material, snapped to the era palette. Add the same dark outline the buildings use, and lock the shading per frame so it doesn't shimmer.
9. **G-mobile-hotbar-chips** (ui, WS6). Severity 2, effort S, expected gain +0.5.
   - **Evidence:** the chips hide 30–40% of the icon in `mobile/R04`, `mobile/R12` and `mobile/R02`.
   - **Fix:** shrink the chips to the 1× digit size on phone, move the slot number above or outside the slot, and draw the stack count only when it is above 1, at the bottom-right corner.
10. **G-label-collision** (readability, WS6). Severity 2, effort S, expected gain +0.5.
    - **Evidence:** `desktop/R16`, `desktop/R11`.
    - **Fix:** run a simple overlap-avoidance pass for name tags and markers. Show names only for the nearest or targeted NPC.
11. **G-row-layout** (authenticity, WS7). Severity 2, effort L, expected gain +0.5.
    - **Evidence:** `desktop/R04`, `desktop/R05`, `desktop/R19`.
    - **Fix:** lay the Row out as one continuous frontage along a Central Avenue with the mountain behind. Use five-globe lamp clusters in 1931. Put period vehicles on the street in 1931, 1955 and 2026.

## 4. Scores (JSON)

```json
{
  "loop": 7,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R04-row", "note": "buildings: clean clusters, one dark outline rule, hue-shifted ramps, CAL-A level"},
        {"shot": "crops/R19-row", "note": "brewery and spa facades crisp and deliberate"},
        {"shot": "strips/R13", "note": "character sprites have soft pillow-shaded Blender clusters, a different asset family from the buildings"},
        {"shot": "strips/R14", "note": "head shading shifts between frames 1-2 and 4-8"},
        {"shot": "desktop/R03", "note": "uniform mottled grass noise with repeated tufts"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R03-player", "note": "Caleb wears a flat newsboy cap, not a wide slouch brim"},
        {"shot": "crops/R17-player", "note": "Ray's fedora is a grey dome with no pinch or brim"},
        {"shot": "crops/R06-player", "note": "June Vale has no ponytail and reads as a boy"},
        {"shot": "crops/R16-npcs", "note": "Ezra fully hidden; Josiah's fur cap reads as a flat cap; Margaux's scarf merges with her hair"},
        {"shot": "crops/R11-npcs", "note": "Hattie passes; Walt lacks knickers and stockings; one face template"},
        {"shot": "strips/R13", "note": "profile hat still a dome about 45% of body height"},
        {"shot": "desktop/R04", "note": "three identical bonnet women"},
        {"shot": "crops/R15-pen", "note": "animals solid and readable"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R04", "note": "Victorian construction detail; town is a cross grid of detached buildings on lawns"},
        {"shot": "desktop/R03", "note": "about 70% empty grass"},
        {"shot": "desktop/R07", "note": "about 70% flat water, no shoreline dressing"},
        {"shot": "desktop/R08", "note": "springs are a flat grey plane with scattered boxes"},
        {"shot": "desktop/R17", "note": "good props (Model A, bungalow) but same layout as 1871 desktop/R13"},
        {"shot": "crops/R03-field", "note": "growth stages read; mature corn and wheat stamped"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "dithered on-grid night, warm windows, neon; faint lamp pools, no light on sprites"},
        {"shot": "desktop/R06", "note": "dusk almost the same as day"},
        {"shot": "desktop/R07", "note": "evening has no warm or low light"},
        {"shot": "desktop/R09", "note": "rain streaks over a dry, bright road"},
        {"shot": "desktop/R08", "note": "fog is a flat milky wash"},
        {"shot": "desktop/R10", "note": "snow scene convincing"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "stride with arm swing; frames 5-6 near duplicates; rigid hat; walks through lamp post"},
        {"shot": "strips/R13-mobile", "note": "same cycle, same occlusion"},
        {"shot": "strips/R14", "note": "wind-up and strike, then 4 frames static hold; no dust, squash or hit-stop"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R11", "note": "crisp dialogue box with clear hierarchy; portrait tiny and low-detail"},
        {"shot": "desktop/R18", "note": "legible shop, era teal frame, mixed font sizes"},
        {"shot": "desktop/R12", "note": "pack: small slot grid lost in a large empty panel"},
        {"shot": "mobile/R12", "note": "Esc hint gone on touch; slot chips cover icons"},
        {"shot": "mobile/R04", "note": "hotbar chips hide 30-40% of the slot 7 and 8 icons"},
        {"shot": "desktop/R16", "note": "name labels collide"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R02", "note": "player findable at about 35 CSS px; HUD text 10 CSS px or larger"},
        {"shot": "mobile/R05", "note": "night stays playable on phone"},
        {"shot": "crops/R08-player", "note": "lamp post drawn over the player"},
        {"shot": "crops/R15-player", "note": "trough drawn over the player's head"},
        {"shot": "crops/R16-npcs", "note": "Ezra invisible behind the player"},
        {"shot": "desktop/R06", "note": "back-view NPC reads as an animal blob, impaled by a lamp post"}
      ]
    },
    "authenticity": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R05", "note": "Superior, Quapaw, Ozark, Hale and neon in 1931; three-globe lamps, not five-globe"},
        {"shot": "desktop/R19", "note": "Superior as a brewery, Quapaw spa dome, Ozark cultural centre, Hotel Hale; no vehicles"},
        {"shot": "desktop/R09", "note": "1871 board false fronts on a dirt street"},
        {"shot": "desktop/R06", "note": "1955 Googie drive-in, motor hotel, hydrant"},
        {"shot": "desktop/R16", "note": "1807 trade camp tents"},
        {"shot": "desktop/R04", "note": "Row as a lawn grid, not a continuous Central Avenue frontage"}
      ]
    }
  },
  "gaps": [
    {"id": "G-depth-sort-occlusion", "category": "readability", "expectedGain": 1.0, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "crops/R15-player", "strips/R13", "crops/R16-npcs", "desktop/R06"], "benchmark": "chained-5.jpg", "fix": "Y-sort all props and actors by foot line; give lamp posts, troughs and fences collision footprints; keep NPCs out of the cone in front of the player in group scenes."},
    {"id": "G-profile-back-headwear", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/R13", "desktop/R05", "desktop/R06", "desktop/R04"], "benchmark": "seastars-2.jpg", "fix": "Cap side and back hat width at shoulder width plus 2 px; show nape, ears and collar; separate back-view hair mass; verify every townsfolk sprite in a grayscale strip."},
    {"id": "G-checklist-headwear-silhouettes", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R17-player", "crops/R06-player", "crops/R16-npcs", "crops/R11-npcs"], "benchmark": "seastars-2.jpg", "fix": "Build the slouch hat, pinched fedora, fur cap with tail and contrasting knotted scarf; add June's ponytail, Walt's knickers and stockings, and Ada's pinned hair; add mouth and brow variants per person."},
    {"id": "G-townsfolk-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R08", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Make the bonnet/headscarf/no-hat roll actually reach the 1886 spawns; vary skirt colour, height and pose; seed positions per scene."},
    {"id": "G-empty-screens", "category": "environment", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R08", "mobile/R13"], "benchmark": "stardew-1.jpg", "fix": "Dress the farm (stumps, rocks, tall grass, fences, paths), the lake (reeds, lilies, rocks, boat, ripples, shore transitions) and the springs (tufa terraces, runnels, boardwalks); break up the grass noise with larger patches."},
    {"id": "G-weather-time-grade", "category": "lighting", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R09", "desktop/R08", "desktop/R06", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Rain: darker, cooler grade, dithered wet sheen, puddles and splashes. Fog: banded distance layers. Dusk and evening: warm, low grade with long shadows. Tint sprites near lamps."},
    {"id": "G-tool-feel", "category": "animation", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Add a dust burst and clod pop on hoe impact, a 1-2 frame squash with hit-stop, and a settle pose; make the walk six distinct poses with a 1 px head and hat bob."},
    {"id": "G-character-shading-family", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["strips/R13", "desktop/R05", "desktop/R06", "strips/R14"], "benchmark": "chained-5.jpg", "fix": "Posterize the Blender character renders to 3-4 tone ramps per material in the era palette, apply the building outline rule, and stabilize shading per frame."},
    {"id": "G-mobile-hotbar-chips", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R12", "mobile/R02"], "benchmark": "stardew-5.jpg", "fix": "On phone, shrink the chips, move slot numbers outside the slot, and show the stack count only above 1, bottom-right."},
    {"id": "G-label-collision", "category": "readability", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R16", "desktop/R11"], "fix": "Run overlap avoidance for name tags and quest markers; show names only for the nearest or targeted NPC."},
    {"id": "G-row-layout", "category": "authenticity", "expectedGain": 0.5, "severity": 2, "effort": "L", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R05", "desktop/R19"], "fix": "Build the Row as one continuous Central Avenue frontage under the mountain; use five-globe lamps in 1931; add period vehicles in 1931, 1955 and 2026."}
  ],
  "verdict": "continue"
}
```
