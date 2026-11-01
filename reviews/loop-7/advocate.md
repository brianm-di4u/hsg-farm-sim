# Advocate: loop 7, tier T32

Capture paths are relative to `games/farm-sim/screenshots/review-loop-7/`. I opened every capture cited below; zoom crops were nearest-neighbour enlargements of the named frame. Hard gates are green (`reviews/loop-7/GATES.md`: 88/88 on both suites, pixel integrity pass on all 26 captures, performance inside budget). Critic B's line that "the brief does not establish the remaining test and asset-budget gates" is out of date. GATES.md establishes them.

## Summary

Most of what both critics say holds up. The characters are the weak point. The loop's headline claim, that side and back views show a head and shoulders under the hat, landed only in places. The 1886 townswomen really are three identical bonnet clones. Two of the occlusion cases really are depth-sort bugs. I concede all of that.

The critics did make some plain factual errors:
- Critic A says the 1931 lamps are three-globe, not five-globe. They have five globes.
- Critic A says the trade-camp name tags overlap. They abut with gaps.
- Critic A blames depth sorting for two cases where the sort is correct and the real fault is collision.
- Some lighting and environment claims are stated more strongly than the frames support:
  - Rain "on a fully dry, bright road"
  - Dusk "almost the same as day"
  - A "single flat water texture"
  - A "bare" lower farm

My proposed total is **50.5/80**, against a critic mean of 49.5. Characters still fails its gate by a wide margin, and so does every category except authenticity and (at 7.0) ui.

## Category by category

### pixel (A 6.5, B 6.0, mean 6.25), proposed 6.5

**Concede:**
- **Two asset families.** Characters are a simpler, softer family than buildings. The zoom of the player in `desktop/R13` shows a 2–3 tone hat ramp with a soft gradient, next to the crisp shingle and log clusters of the cabin. Both critics are right that the families don't match.
- **Title screen.** `desktop/R01` is a dense, many-coloured painting that doesn't match the in-game discipline.

**Rebut:**
- **Ada's shading in `strips/R14` (A).** A calls the frame-to-frame shading shift "renderer noise". It isn't. In frames 1–3 Ada's head is tilted down and back under the raised hoe, with hair filling the top of the head. From frame 4 her face is level with the camera. The shading change follows the pose change. Frames 5–8 are stable.
- **The fence in `crops/R15-pen` (B).** B calls it "plainly shaded" and in conflict with the other assets. It has the same dark outline as the props and a 3-tone wood ramp (highlight, mid, shadow on each rail and post). It is simpler than the animals but follows the same outline rule.
- **"Crowded highlights" in `crops/R03-field` (B).** The bright single-dot glints sit only on the mature tiles: corn, wheat, potato, beans and cabbage in rows 3–5. They are almost certainly the ready-to-harvest cue, a gameplay marker, not stray noise. The soil pads carry individual outlines only in the top seed and sprout rows. Under the mature crops the soil runs continuous.
- **What both critics agree on.** `crops/R04-row`, `crops/R19-row`, `crops/R15-pen` (animals) and `crops/R03-field` (crop sprites) are near CAL-A discipline. That covers most of the screen area in town frames.

6.5 is within the band and matches Critic A's own figure.

### characters (A 5.0, B 5.5, mean 5.25), proposed 5.5

**Concede (all verified):**
- **The player's profile hat.** In `strips/R13` it is still a dome about 40% of body height.
- **The 1931 passer-by.** In `desktop/R05` (my zoom at x≈470) she is a straw disc wider than her torso, seen from behind.
- **The 1886 clones.** `desktop/R04`, `desktop/R08`, `desktop/R10` and `desktop/R11` all show the same three purple-skirted, cream-bonnet women. My 2× zoom of `desktop/R04` shows identical bonnets.
- **Ezra.** He is not visible in `crops/R16-npcs`. His tag floats over the tent above Ada, and `desktop/R16` confirms nobody else is there.
- **Checklist misses, confirmed against `research/refs/characters.md`:**
  - Caleb wears a flat cap instead of a slouch hat (`crops/R03-player`).
  - Ray wears a grey dome instead of a pinched fedora (`crops/R17-player`, `crops/R05-player`).
  - Josiah has a grey flat cap instead of a fur cap with a tail (`crops/R16-npcs`).
  - Walt has no knickers or stockings (`crops/R11-npcs`).
- **Faces.** Every face is the same template.

**Rebut (evidence Critic A missed):**
- **The headwear change is partly visible.** A says the captures "do not support" it at all. In `desktop/R09` the man in profile at x≈890 has a brim hat over a visible face, shoulders and torso: a head-and-shoulders read, not a disc.
- **The townswoman variety change is partly visible.** In the same frame the 1871 woman at x≈420 wears a headscarf or hood, not the bonnet. So the variant roll works in 1871. It fails to reach the 1886 spawn set, which is a narrower defect than "the claim is contradicted".
- **The 1886 back views read as people.** In `desktop/R06` the back-view figure on the lawn at x≈650 shows a cap, hair, a blue shirt and legs. In `desktop/R19` the back view at x≈630 shows long hair over a white top and legs.
- **The R06 woman is weak, but she is a person.** A calls her an "animal shape". My zoom shows long brown hair, a blue headband, a pink top and striding legs. The silhouette is weak, and the lamp post through her makes it worse (see readability).
- **Group scenes clear part of the 7 anchor.** In `crops/R11-npcs`, Walt (blue cap, white beard), Augustin (white toque) and Hattie (white cap, white dress) are told apart at a glance by headwear and palette. So are Josiah and Margaux in `crops/R16-npcs` (red hair, blue top, brown skirt). The anchor asks for exactly that.
- **Animals.** Both critics agree `crops/R15-pen` is near CAL-A.

I propose 5.5 at low confidence. That is still 1.5 under the gate.

### environment (A 6.5, B 6.5, mean 6.5), proposed 6.5

**Concede:**
- **Empty farm screens.** `desktop/R03` is about 60–65% open meadow.
- **Lake.** `desktop/R07` has no reeds, boats or rocks, and the pier just ends.
- **Springs.** The springs in `desktop/R08` are sparse boxes on a plain.
- **Town layout.** It is the same cross grid in every era.

**Rebut (overstatements):**
- **The lake water (A).** A calls it a "single flat water texture". It has a lighter shallow band along the shore, a darker deep zone with an irregular edge, a caustic net pattern and scattered glints (`desktop/R07`). It is sparse, not flat.
- **The lower farm (A).** A says the bottom half of `desktop/R02` is "bare". It has rocks at (290,680), two bushes, a tree pair and evenly spread flower clusters. B's description, "uniformly decorated", is the accurate one.
- **R13 against R17 (A).** A treats the matching layout as a defect. It is the same farm across eras with every prop re-skinned: log cabin to Craftsman bungalow, woodpile to hay bales, wagon to Model A. That is arguably the game's premise (one valley through the ages), not a lack of variety.
- **Stamped mature crops (A).** In `crops/R03-field` this comes from a showcase field staged with every stage in rows. Ripe crops of one species look alike in every farming benchmark.

Town screens (`desktop/R04`, `desktop/R09`, `desktop/R19`) meet the rubric's 7. Farm, lake and springs don't. 6.5 stands.

### lighting (A 6.0, B 6.0, mean 6.0), proposed 6.0

**Concede:**
- No puddles or wet sheen in rain (`desktop/R09`).
- No warm grade at 18:20 on the lake (`desktop/R07`).
- The fog in `desktop/R08` is a flat wash with steam streaks.
- No cast shadows tied to a sun direction.

**Rebut:**
- **"A fully dry, bright road" in `desktop/R09` (A).** I measured the same grass region against `desktop/R04` in HSV. Rain cuts saturation from 117 to 77 and value from 122 to 113. The ground is dry, but there is a muted rain grade.
- **"Dusk almost the same as day" in `desktop/R06` (A).** In the same region, saturation drops from 117 to 87 and hue shifts warmer (71 to 59), and the windows are lit. The mood is weak, but it is there. B's "distinct subdued dusk" is closer.
- **Checkerboard light on the player in `crops/R05-player` (B).** B says it obscures form. The face, shirt and trousers remain fully readable, and `mobile/R05` is legible on a phone. Dithered light on the grid is what the rubric's 7 asks for. Covering the sprite is a taste issue, not a failure of form.
- **What both critics missed.** The lamps in `desktop/R05` are five-globe clusters (see authenticity), and the snow in `desktop/R10` is strong.

Even so, the weather moods are thin. 6.0 stands.

### animation (A 5.5, B 5.5, mean 5.5), proposed 5.5

**Concede:**
- In `strips/R14`, the body holds the same pose from frame 4 to 8, with no dust or squash.
- In `strips/R13`, the hat stays rigid.

**Rebut:**
- **Soil feedback (A).** A says there is "no feedback" after impact. In `strips/R14` frames 4–8, the tilled tile's texture changes from rough dark clods (4) to lighter, settled clods (5–8). That is a small piece of soil feedback, though weak.
- **The lamp post in `strips/R13` (A).** A says it hides half the cycle "because of depth sorting". The sort is correct: the post's foot sits below the player's feet, so it belongs in front. The fault is that the player walks through the post's footprint. A collision footprint fixes that, not a sort change.

5.5 stands.

### ui (A 6.5, B 7.0, mean 6.75), proposed 7.0

**Concede:**
- **Phone chips.** The slot and stack chips cover 30–40% of the slot 7 and 8 icons (`mobile/R04`, `mobile/R12`).
- **Shop font.** The body face in `desktop/R18` is a smaller face than the title.
- **Portraits.** The dialogue portrait is small (`desktop/R11`).

**Rebut:**
- **"JOSIAH TRADE MARGAUX overlaps" in `desktop/R16` (A). This is plainly wrong.** In `crops/R16-npcs` there is a clear gap between JOSIAH and the TRADE plate, and between the plate and MARGAUX. They abut into one line but never overlap. The tags in `crops/R11-npcs` are also separate.
- **The desktop pack in `desktop/R12` (A).** A calls it "a large empty navy box". The panel holds a title, tabs, an 8×3 grid and an item-detail strip. There is some dead space either side of the grid, nothing more.
- **Era frames (both).** The era identity A credits is real, and it reaches beyond what B says:
  - forest green in 1807 (`desktop/R16`)
  - cream and wood in 1871/1886 (`desktop/R04`)
  - navy and gold in 1931 (`desktop/R12`, `mobile/R05`)
  - cream and teal in 1955 (`desktop/R18`)
  - blue in 2026 (`desktop/R19`)

  Five distinct frame treatments across chapters, with a pixel font at integer scale.
- **Phone reflow.** Dialogue (`mobile/R11`) and pack (`mobile/R12`) reflow cleanly, and Esc is gone on touch.

This meets the 7 anchor ("pixel-crisp frames and fonts per era, clear hierarchy") with evidence from five chapters.

### readability (A 6.5, B 6.5, mean 6.5), proposed 6.5

**Concede, two genuine sort bugs:**
- In `crops/R08-player`, the lamp post's foot sits about 100 crop px above the player's feet, yet the post draws over her torso.
- In `crops/R15-player`, the trough sits on the fence line behind the player but draws over her hat.

Ezra is hidden (`crops/R16-npcs`), and the phone chips cover icons.

**Rebut on cause:**
- **`strips/R13` and `desktop/R06`.** Both are correctly sorted pass-through cases: the post's foot is below the actor's feet. They need collision and NPC path avoidance, not a sort fix.
- **Ezra.** He stands behind Ada, which is the correct order. That is a staging fault.
- **The dark NPC in `mobile/R05` (B).** B says she loses definition. The straw-hat passer-by at x≈220 reads as a straw hat over a green-blue body against the lit brick.

6.5 stands.

### authenticity (A 7.0, B 6.5, mean 6.75), proposed 7.0

**Rebut:**
- **The 1931 lamps (A). This is plainly wrong.** A says they are three-globe, not the five-globe clusters `pixel-anchors.md` names for 1929. My 6× zoom of the lamp at (385,330) in `desktop/R05` shows five globes: two lit lower globes and three unlit upper globes (centre, left, right). `mobile/R05` shows the same cluster. That is a point in the build's favour.
- **Era distinctness.** Both critics agree each era sorts blind: `desktop/R16`, `desktop/R09`, `desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R19`.

**Concede:**
- **Clothing.** It carries less history than the architecture (B; `crops/R03-player`, `crops/R17-player`).
- **Row layout.** The Row is a lawn grid, not a continuous Central Avenue frontage.
- **Vehicles.** There are none on the 2026 street (`desktop/R19`).

With A's main detail objection removed, 7.0 is supported.

## Factual errors by critic

**Critic A:**
1. "Three-globe, not five-globe" (`desktop/R05`). The lamps show five globes.
2. "JOSIAH TRADE MARGAUX overlaps" (`desktop/R16`). The tags abut with gaps (`crops/R16-npcs`).
3. Calls `strips/R13` and `desktop/R06` depth-sort breaks. Both are correctly sorted; the faults are pass-through and collision.
4. "Rain on a fully dry, bright road" (`desktop/R09`). Grass saturation drops by about a third under rain.
5. "Renderer noise" in `strips/R14`. The change is a head-tilt pose.
6. Overstatements:
   - "single flat water texture" (`desktop/R07`)
   - "bottom half bare" (`desktop/R02`)
   - "large empty navy box" (`desktop/R12`)
   - side and back views "not supported" (`desktop/R09` partly supports the change)

**Critic B:**
1. Says the test gates are not established. `GATES.md` establishes them.
2. "Plainly shaded fence" (`crops/R15-pen`). It has an outline and a 3-tone ramp.
3. "Crowded highlights" in `crops/R03-field`. These are likely the harvest-ready glints.
4. The `mobile/R05` NPC "loses definition". She remains discernible.

## Gaps: adjusted severity and expected gain

**Critic A's gaps:**

| Gap | Severity | Gain | Reason |
|---|---|---|---|
| G-depth-sort-occlusion | 5 → 4 | 1.0 → 0.75 | Only `crops/R08-player` and `crops/R15-player` are sort bugs. `strips/R13` and `desktop/R06` need collision footprints; `crops/R16-npcs` needs staging. |
| G-profile-back-headwear | 4 | 1.0 → 0.75 | Partly landed in `desktop/R09`. |
| G-checklist-headwear-silhouettes | 4 | 1.0 | Conceded. |
| G-townsfolk-variety | 3 | 0.5 | Conceded for 1886. The 1871 roll works (`desktop/R09`). |
| G-empty-screens | 3 | 1.0 → 0.75 | Water and lower farm are less bare than stated. |
| G-weather-time-grade | 3 | 1.0 → 0.75 | Rain and dusk grades exist but are weak. |
| G-tool-feel | 3 | 1.0 | Conceded. |
| G-character-shading-family | 3 → 2 | 0.5 | The R14 shift is pose; sprites already carry an outline. |
| G-mobile-hotbar-chips | 2 | 0.5 | Conceded. |
| G-label-collision | 2 → 1 | 0.5 → 0.25 | No overlap; the tags only abut. |
| G-row-layout | 2 | 0.5 | Lamp part struck: the five-globe lamps already exist. |

**Critic B's gaps:**

| Gap | Severity | Gain | Reason |
|---|---|---|---|
| G-character-construction | 5 | 1.5 → 1.0 | Overlaps A's two headwear gaps. |
| G-terrain-composition | 4 → 3 | 1.0 → 0.75 | Soil is continuous under mature crops. |
| G-tool-weight | 4 → 3 | 1.0 | Duplicate of G-tool-feel. |
| G-light-form | 4 → 3 | 1.0 → 0.5 | The dither is on-grid and forms stay readable. |
| G-asset-craft-consistency | 3 → 2 | 0.5 → 0.25 | The fence follows the outline rule; the glints are a gameplay cue. |
| G-occlusion-and-icons | 3 | 0.5 | Conceded. |
| G-era-ui-material | 2 | 0.5 | Conceded. |

```json
{
  "loop": 7,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/R04-row", "note": "buildings at CAL-A discipline, agreed by both critics"},
        {"shot": "crops/R15-pen", "note": "fence has the shared dark outline and a 3-tone ramp, not 'plainly shaded'"},
        {"shot": "strips/R14", "note": "head shading change between frames 1-3 and 4-8 follows a head-tilt pose, not renderer noise"},
        {"shot": "crops/R03-field", "note": "bright dots sit only on mature tiles (likely ready glints); crop sprites crisp"},
        {"shot": "desktop/R13", "note": "conceded: character hat ramps softer than the building clusters"}
      ]
    },
    "characters": {
      "score": 5.5,
      "confidence": 0.5,
      "evidence": [
        {"shot": "desktop/R09", "note": "profile man at x~890 shows face, shoulders and torso under the brim; 1871 woman at x~420 wears a headscarf, so the variant roll works in 1871"},
        {"shot": "crops/R11-npcs", "note": "Walt, Augustin and Hattie distinct by headwear and palette at a glance"},
        {"shot": "crops/R16-npcs", "note": "Josiah and Margaux distinct by palette; conceded: Ezra hidden, fur cap missing"},
        {"shot": "crops/R03-player", "note": "conceded: flat cap, not a slouch hat"},
        {"shot": "desktop/R04", "note": "conceded: three identical 1886 bonnet women"},
        {"shot": "strips/R13", "note": "conceded: profile hat still a dome"},
        {"shot": "crops/R15-pen", "note": "animals near CAL-A"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R07", "note": "water has a shallow band, a deep zone, caustics and glints: sparse, not flat; conceded: no shoreline dressing"},
        {"shot": "desktop/R02", "note": "lower farm has rocks, bushes, trees and flowers: sparse, not bare"},
        {"shot": "desktop/R17", "note": "same farm as desktop/R13 with every prop re-skinned for the era"},
        {"shot": "desktop/R04", "note": "town screens dressed and rich"},
        {"shot": "desktop/R03", "note": "conceded: large open meadow"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R09", "note": "rain grade cuts grass saturation 117 to 77 against desktop/R04; conceded: no puddles or sheen"},
        {"shot": "desktop/R06", "note": "dusk: saturation 117 to 87, warmer hue, lit windows; weak but present"},
        {"shot": "desktop/R05", "note": "dithered on-grid light pools, five-globe lamps, neon"},
        {"shot": "crops/R05-player", "note": "dithered light leaves the face and clothes readable"},
        {"shot": "desktop/R07", "note": "conceded: no evening warmth"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R14", "note": "anticipation, strike, tile appears; soil texture settles in frames 4-8; conceded: body static, no dust"},
        {"shot": "strips/R13", "note": "8-frame stride with arm swing; the post is correctly sorted in front, the fault is pass-through"},
        {"shot": "strips/R13-mobile", "note": "same cycle on phone"}
      ]
    },
    "ui": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/R16-npcs", "note": "name tags abut with gaps, no overlap (Critic A error)"},
        {"shot": "desktop/R12", "note": "pack has a title, tabs, grid and detail strip; modest side space, not an empty box"},
        {"shot": "desktop/R18", "note": "1955 teal and cream frame; body font smaller (conceded)"},
        {"shot": "desktop/R16", "note": "1807 forest-green frames: five era frame treatments across chapters"},
        {"shot": "mobile/R11", "note": "dialogue reflows cleanly on phone"},
        {"shot": "mobile/R04", "note": "conceded: chips cover 30-40% of the slot 7 and 8 icons"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R08-player", "note": "conceded: genuine sort bug; post foot above the player's feet, drawn over her"},
        {"shot": "crops/R15-player", "note": "conceded: trough drawn over the hat"},
        {"shot": "desktop/R06", "note": "lamp post through the woman is correctly sorted; collision or pathing fault"},
        {"shot": "mobile/R05", "note": "night stays legible on phone; straw-hat NPC discernible"},
        {"shot": "mobile/R02", "note": "player findable, HUD legible"}
      ]
    },
    "authenticity": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R05", "note": "lamps are five-globe clusters (two lit lower, three upper), contrary to Critic A"},
        {"shot": "mobile/R05", "note": "same five-globe cluster visible"},
        {"shot": "desktop/R19", "note": "2026 reuse of the Row grounded; conceded: no vehicles"},
        {"shot": "desktop/R09", "note": "1871 board false fronts"},
        {"shot": "desktop/R06", "note": "1955 Googie drive-in and motor hotel"},
        {"shot": "crops/R17-player", "note": "conceded: clothing carries less era than architecture"}
      ]
    }
  },
  "gaps": [
    {"id": "G-depth-sort-occlusion", "category": "readability", "expectedGain": 0.75, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "crops/R15-player", "strips/R13", "crops/R16-npcs", "desktop/R06"], "benchmark": "chained-5.jpg", "fix": "Sort by foot line for the true sort bugs (R08 post, R15 trough); add collision footprints for posts so actors can't walk through them (R13, R06); stage group NPCs so none stand directly behind the player (R16)."},
    {"id": "G-profile-back-headwear", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/R13", "desktop/R05", "desktop/R04", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Extend the head-and-shoulders read already visible on the 1871 profile man (desktop/R09) to the player's profile, the 1931 straw hat and the 1886 bonnets; cap side and back brim width near shoulder width."},
    {"id": "G-checklist-headwear-silhouettes", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R17-player", "crops/R06-player", "crops/R16-npcs", "crops/R11-npcs"], "benchmark": "seastars-2.jpg", "fix": "Build the slouch hat, pinched fedora, fur cap with tail and contrasting knotted scarf; add June's ponytail, Walt's knickers and stockings, and Ada's pinned hair; add mouth and brow variants per person."},
    {"id": "G-townsfolk-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R08", "desktop/R10", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "The variant roll works in 1871 (desktop/R09) but not in the 1886 spawn set; route 1886 passers-by through it and vary skirt colour, height and seed positions."},
    {"id": "G-empty-screens", "category": "environment", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R08", "mobile/R13"], "benchmark": "stardew-1.jpg", "fix": "Dress the farm meadow, lake shoreline and pier end, and springs plain with clustered props, reeds, rocks, boardwalks and larger grass patches."},
    {"id": "G-weather-time-grade", "category": "lighting", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R09", "desktop/R08", "desktop/R06", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Build on the existing rain and dusk grades: add dithered wet sheen, puddles and splashes; banded fog; a warmer, lower evening grade on the lake; lamp tint on sprites."},
    {"id": "G-tool-feel", "category": "animation", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Add a dust burst and clod pop on impact, a squash with hit-stop, and a settle pose; add a 1 px head and hat bob to the walk."},
    {"id": "G-character-shading-family", "category": "pixel", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["strips/R13", "desktop/R05", "desktop/R06"], "benchmark": "chained-5.jpg", "fix": "Posterize character materials to 3-4 tone era-palette ramps to match building clusters; the existing outline can stay."},
    {"id": "G-mobile-hotbar-chips", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R12", "mobile/R02"], "benchmark": "stardew-5.jpg", "fix": "On phone, shrink the chips, move slot numbers outside the slot, and show stack counts only above 1."},
    {"id": "G-label-collision", "category": "readability", "expectedGain": 0.25, "severity": 1, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R16", "desktop/R11"], "fix": "Tags abut rather than overlap; add a little spacing, or show names only for the nearest NPC."},
    {"id": "G-row-layout", "category": "authenticity", "expectedGain": 0.5, "severity": 2, "effort": "L", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R05", "desktop/R19"], "fix": "Lay the Row out as one continuous Central Avenue frontage and add period vehicles in 1931, 1955 and 2026; the five-globe lamps already exist."},
    {"id": "G-character-construction", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Redraw directional heads, shoulders and garment silhouettes together; clarify Nora's bonnet, Josiah's fur cap and hunting shirt, Walt's stockings and knickers, Augustin's stout apron; add occupational props. Overlaps the two headwear gaps above."},
    {"id": "G-terrain-composition", "category": "environment", "expectedGain": 0.75, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R07", "crops/R03-field"], "benchmark": "stardew-1.jpg", "fix": "Cluster props around activities, add worn thresholds and shoreline variety; soil is already continuous under mature crops, so only the seed and sprout pads need merging."},
    {"id": "G-tool-weight", "category": "animation", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "Rubric animation 7 descriptor", "fix": "Crouch and twist anticipation, firm grip, decisive contact pose, soil debris, readable recovery (duplicate of G-tool-feel)."},
    {"id": "G-light-form", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["crops/R05-player", "desktop/R05", "desktop/R08"], "benchmark": "seastars-2.jpg", "fix": "Lighten the dither coverage on sprites (forms already read), add directional cast shadows, and shape fog and steam into deliberate clusters."},
    {"id": "G-asset-craft-consistency", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "L", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R15-pen", "crops/R19-row"], "benchmark": "chained-5.jpg", "fix": "Align character ramps with scenery; the fence already follows the outline rule and the field glints are a gameplay cue."},
    {"id": "G-occlusion-and-icons", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["crops/R08-player", "mobile/R05", "mobile/R12"], "benchmark": "stardew-1.jpg", "fix": "Fix the R08 post sort, fade narrow props over the player, and reserve icon corners for count chips."},
    {"id": "G-era-ui-material", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R11", "desktop/R12", "desktop/R18"], "benchmark": "stardew-5.jpg", "fix": "Add era-specific frame materials and ornament on top of the existing per-era colour schemes; improve the dialogue portrait."}
  ],
  "verdict": "continue"
}
```
