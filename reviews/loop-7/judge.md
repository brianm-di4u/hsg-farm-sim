# Judge ruling: loop 7, tier T32

Capture paths are relative to `games/farm-sim/screenshots/review-loop-7/`. I opened every capture cited below. Zoom crops are nearest-neighbour enlargements of the named frame.

## Hard gates

`reviews/loop-7/GATES.md` shows all three hard gates green:
- Tests: 88/88 on the pixel suite and 88/88 on the painted suite.
- Pixel integrity: pass on all 26 captures.
- Performance (`perf.json`): phone 4× median p95 ≤ 17.7 ms; phone 6× at 62 fps or better, against a floor of 24; heap ≤ 24.8 MB.

Critic B's caveat that the test gates were "not established" is superseded by GATES.md. The loop is scored.

## Spread and disputes

No category differs by more than 1.0 between the critics. The largest gap is 0.5, in pixel, characters, ui and authenticity. The advocate disputed several facts, and I re-checked each one against the captures.

| Claim | Who | My check | Ruling |
|---|---|---|---|
| The 1931 lamps are three-globe, not five-globe | A | 5× zoom of `desktop/R05` at the lamp near x≈385: three unlit upper globes plus two lit lower globes | **Advocate right.** There are five globes. |
| The 1807 name tags overlap | A | `crops/R16-npcs`: JOSIAH, the TRADE plate and MARGAUX are separated by gaps of 1–3 art px | **Advocate right.** The tags don't overlap, but they abut into a single line that reads as one phrase. That is a minor readability issue. |
| Lamp post drawn over the player | A | `crops/R08-player`: the post's foot is well above the player's feet, yet the post draws over her torso | **A right.** This is a genuine sort bug. |
| Trough drawn over the player's hat | A | `crops/R15-player`: the trough sits on the fence line behind the player but draws over her hat | **A right.** This is a genuine sort bug. |
| `strips/R13` and `desktop/R06` are sort bugs | A | In both, the post's foot is level with or below the actor's feet | **Advocate right on the cause.** The sort is correct; the actors walk through the post. The fix is a collision footprint and pathing. |
| Ezra is hidden | A | `crops/R16-npcs`: his tag floats over the tent with nobody under it | **A right.** The cause is staging: he stands behind Ada. |
| The side and back headwear change is "not supported" | A | See below | **Partly landed.** |
| Head shading in `strips/R14` is "renderer noise" | A | The shading change between frames 1–3 and 4 follows the head moving from tilted to level; frames 5–8 are stable | **Advocate right.** |
| The fence is "plainly shaded" | B | `crops/R15-pen`: dark outline and a 3-tone wood ramp | **Advocate right.** |
| The 1886 townswomen are identical clones | A | `desktop/R04`, `desktop/R08` and `mobile/R04` all show the same purple-skirted, cream-bonnet women | **A right.** The variant roll only shows in 1871 (`desktop/R09`, the hooded woman at x≈420). |

Headwear check, place by place:
- In `desktop/R09` the 1871 profile man at x≈890 shows a brim hat over a visible face, shoulders and torso. In `desktop/R06` the back view at x≈650 reads as a person.
- The player's profile in `strips/R13` is still a dome about 40–45% of body height.
- My 5× zoom of `desktop/R05` shows the 1931 passer-by as a straw disc that covers the whole torso, with only legs below.

## Category rulings

### pixel: 6.5
- **Buildings.** `crops/R04-row` and `crops/R19-row` are hand-placed quality: one dark outline rule, deliberate shingle and brick clusters, warm hue-shifted window ramps. This is the best art in the game.
- **Animals.** `crops/R15-pen` is clean, and the goat's white coat is solid.
- **Characters.** They are a softer family with broad 2–3 tone gradients. The Ray fedora dome in `crops/R17-player` and the player hat in `strips/R13` sit beside crisp cabin logs.
- **Grass.** The meadow in `desktop/R03` is a uniform mottle.
- **Title screen.** `desktop/R01` is a many-coloured painting.
- **Verdict.** One grid, coherent palettes, with a split between asset families. That is above the 5 anchor and short of 7. A's 6.5 holds. B's specific charges (the fence, crowded highlights) didn't survive the check.

### characters: 5.0
**Checklist, against `research/refs/characters.md`.** Every miss below is verified:
- Caleb wears a flat cap instead of a slouch hat (`crops/R03-player`).
- Ray's fedora is a grey dome with no pinch and no snapped brim (`crops/R17-player`).
- Josiah has a grey flat cap instead of a fur cap with a tail (`crops/R16-npcs`).
- Walt has no knickers or stockings (`crops/R11-npcs`).
- Ezra is invisible (`crops/R16-npcs`).
- Every face is the same two-dot, no-mouth template.

**This loop's claims:**
- The side and back headwear change landed on some townsfolk (`desktop/R09`, `desktop/R06`).
- It failed on the player's profile (`strips/R13`) and the 1931 straw hat (`desktop/R05`).
- The bonnet variety did not reach the 1886 spawns (`desktop/R04`, `desktop/R08`).

**Positives:**
- Walt, Augustin and Hattie can be told apart by headwear and palette (`crops/R11-npcs`).
- The animals are good (`crops/R15-pen`).

This is the rubric's 5: readable figures, generic, with few checklist features. The improvements are real but partial, and the 1931 disc is as bad as anything earlier. I side with A over B and the advocate's 5.5. The gate is 2 points away.

### environment: 6.5
- **Towns.** `desktop/R04`, `desktop/R09` and `desktop/R19` are richly built: mansards, false fronts, the reused Row, the market pavilion.
- **Farm.** `desktop/R03` is about 65% open meadow.
- **Lake.** In `desktop/R07` the water has shallow and deep zones with caustics and glints, so it isn't flat (advocate right against A). But it has no reeds, rocks or boats, and the pier just ends.
- **Springs.** The springs plain in `desktop/R08` holds four stone boxes.
- **Verdict.** Town screens reach 7; farm, lake and springs sit at about 5.5. Both critics' 6.5 stands.

### lighting: 6.0
- **Night.** `desktop/R05` keeps light on the grid: checkerboard-dithered lamp pools, lit windows, a neon CLUB sign and five-globe lamps. This scene reaches 7.
- **Evening.** `desktop/R07` (18:20) has no warmth at all.
- **Rain.** `desktop/R09` mutes the grade, but the road stays dry, with no sheen or puddles.
- **Fog.** `desktop/R08` is a flat milky wash on one half of the screen.
- **Dusk.** `desktop/R06` is a weak warm desaturation.
- **Snow.** `desktop/R10` is good.
- **Shadows.** No cast shadows follow a sun direction.
- **Verdict.** One strong scene and thin moods elsewhere. All three reviewers say 6.0, and so do I.

### animation: 5.5
- **Walk.** `strips/R13` and `strips/R13-mobile` show a stride with arm swing, but the hat dome is rigid and frames 5 and 6 are near duplicates.
- **Hoe.** In `strips/R14` the anticipation and strike read, and the tilled tile appears and settles (frames 4–5). Then frames 4–8 hold one body pose, with no dust, squash, hit-stop or recovery.
- **Verdict.** All three reviewers say 5.5, and so do I.

### ui: 7.0
- **Era frames.** They are pixel-crisp and differ by era across five chapters:
  - forest green in 1807 (`desktop/R16`)
  - cream and wood in 1886 (`desktop/R04`)
  - navy and gold in 1931 (`desktop/R12`)
  - cream and teal in 1955 (`desktop/R18`)
  - blue in 2026 (`desktop/R07`)
- **Hierarchy.** The dialogue box in `desktop/R11` has clear hierarchy. The pack reflows on phone and drops the Esc hint (`mobile/R12`).
- **Pack panel.** The desktop pack in `desktop/R12` has some dead margin, not "an empty box" (advocate right).
- **New chips.** This loop's chips cover 30–40% of the slot 7 and 8 icons on phone, in both the hotbar and the pack (`mobile/R04`, `mobile/R12`).
- **Other weaknesses.** The shop body font (`desktop/R18`) is smaller than the title face, and the dialogue portrait is small.
- **Verdict.** It meets the 7 anchor with evidence from five chapters. B and the advocate are right; the chip regression costs points under readability, not here.

### readability: 6.5
- **Strengths.** The player is findable and the HUD legible on phone (`mobile/R02`, `mobile/R04`). Crop stages separate in `desktop/R03`. The night stays legible (`mobile/R05`).
- **Objects disappear or get covered:**
  - the post over the player (`crops/R08-player`)
  - the trough over the hat (`crops/R15-player`)
  - Ezra hidden (`crops/R16-npcs`)
  - a lamp post through the 1955 woman (`desktop/R06`)
  - chips over the hotbar icons (`mobile/R04`)
- **Verdict.** All three reviewers say 6.5.

### authenticity: 7.0
- **Eras sort blind:**
  - 1807 trade camp (`desktop/R16`)
  - 1871 board false fronts with STAGE and DRUGS signs (`desktop/R09`)
  - 1886 Victorian bathhouses (`desktop/R04`)
  - 1931 named Row, neon and five-globe lamps (`desktop/R05`)
  - 1955 Googie drive-in, motor hotel and hydrant (`desktop/R06`)
  - 2026 reused Row (`desktop/R19`)
- **A's key detail objection was wrong.** The five-globe lamps exist.
- **Shortfalls.** Clothing carries less history than the architecture (`crops/R17-player`). The Row is a lawn grid, not a continuous Central Avenue frontage. The 2026 street has no vehicles.
- **Verdict.** It holds 7, above its gate of 6.

**Total: 50.0/80.** Loop 6 judged 50.5, so this is −0.5.

## Ranked gaps

Ranked by expected gain ÷ effort, counting S=1, M=2, L=3. Duplicates are merged: B's G-character-construction into G-checklist-headwear, G-tool-weight into G-tool-feel, G-terrain-composition into G-empty-screens, G-light-form into G-sprite-light-shadow, and G-occlusion-and-icons split between the sort and chip gaps. Causes are corrected where the advocate showed a different cause.

1. **G-sort-collision-staging** (readability, WS1, S, +0.75, severity 4). There are three distinct causes.
   - **Sort bugs** (`crops/R08-player` post, `crops/R15-player` trough). Sort each prop by its own foot line.
   - **Pass-through** (`strips/R13`, `desktop/R06`). Give lamp posts and signposts a 1-tile collision footprint, and keep NPC paths off it.
   - **Staging** (`crops/R16-npcs` Ezra; the woman behind the player in `desktop/R08`). In scripted groups, place no NPC within 1 tile behind the player.
   - **Test:** no prop whose foot y is less than an actor's foot y draws over that actor, in any capture.
2. **G-mobile-hotbar-chips** (ui, WS6, S, +0.5, severity 3).
   - **Evidence:** `mobile/R04`, `mobile/R12`.
   - **Fix:** below 768 px, draw the slot number as a 1× digit outside the slot's top edge. Show the stack count only when it is above 1, in a chip no larger than 25% of the slot area, bottom-right.
   - **Test:** the icon keeps at least 80% of its pixels visible in slots 7 and 8.
3. **G-1886-townsfolk-variety** (characters, WS2, S, +0.5, severity 3).
   - **Evidence:** the bonnet/headscarf/no-hat roll works in 1871 (`desktop/R09`) but not in the 1886 spawns (`desktop/R04`, `desktop/R08`, `mobile/R04`).
   - **Fix:** send 1886 passers-by through the same roll, with skirt colour drawn from at least 3 swatches.
   - **Test:** no two visible 1886 women share both headwear and skirt colour.
4. **G-checklist-headwear** (characters, WS2, M, +1.0, severity 5).
   - **Evidence:** `crops/R03-player`, `crops/R17-player`, `crops/R16-npcs`, `crops/R11-npcs`, `crops/R06-player`.
   - **Fix:** build the missing items as separate rig parts:
     - Caleb's wide slouch brim, breaking the head outline by at least 2 px each side
     - Ray's fedora with a pinched crown and a snapped brim
     - Josiah's fur cap with a tail
     - Margaux's knotted scarf, in a hue at least 60° away from her hair
     - June's ponytail
     - Walt's knickers and white stockings
     - Ada's pinned hair
     - 3 mouth and brow variants assigned per named person
5. **G-tool-feel** (animation, WS5, M, +1.0, severity 3).
   - **Evidence:** `strips/R14` frames 4–8 hold one pose; `strips/R13` hat rigid, frames 5 and 6 near duplicates.
   - **Fix (hoe):** a 2-frame crouch before the swing, a 3–5 particle soil burst plus a clod pop on impact, a 1-frame squash with 60 ms hit-stop, and a 2-frame recovery to idle.
   - **Fix (walk):** a 1 px head and hat bob on the passing frames, and 6 distinct poses.
6. **G-profile-back-headwear** (characters, WS2, M, +0.75, severity 4).
   - **Evidence:** the change landed on the 1871 profile man (`desktop/R09`) but not on the player's profile (`strips/R13`), the 1931 straw hat (`desktop/R05`) or the 1886 bonnets.
   - **Fix:** in side and back views, cap brim width at shoulder width plus 2 art px, and show nape and collar below the brim.
   - **Test:** a sheet script measures every townsfolk and player side or back frame.
7. **G-weather-time-grade** (lighting, WS4, M, +0.75, severity 3).
   - **Evidence:** `desktop/R09`, `desktop/R07`, `desktop/R08`, `desktop/R06`.
   - **Rain:** a 2-tone dithered wet sheen on roads, puddle tiles with 3-frame splash rings, and a 10% darker, cooler grade.
   - **Evening and dusk:** a warm, low-angle banded grade from 17:30, unmistakably different from noon.
   - **Fog:** 3 banded density layers with distance falloff, replacing the flat wash.
8. **G-empty-screens** (environment, WS3, M, +0.75, severity 3).
   - **Evidence:** `desktop/R03`, `desktop/R07`, `desktop/R08`, `desktop/R02`.
   - **Farm meadow:** at least 4 activity clusters (woodpile, stump and rock group, fence run, tall-grass patch) plus a path network, and 2–3 large light and dark grass patches to break the mottle.
   - **Lake:** reeds and lily pads along the shore, rocks, a moored boat, and a proper pier end with posts.
   - **Springs:** tufa terraces, steaming runnels and a boardwalk.
   - **Seed and sprout rows:** merge the individually outlined pads into continuous worked soil.
9. **G-label-spacing** (readability, WS6, S, +0.25, severity 1).
   - **Evidence:** in `crops/R16-npcs` and `crops/R11-npcs`, adjacent tags abut into one line.
   - **Fix:** enforce at least 4 art px between tag boxes, staggering them vertically when needed, or show names only for the targeted NPC.
10. **G-character-ramps** (pixel, WS1, M, +0.5, severity 3).
    - **Evidence:** `strips/R13`, `crops/R17-player`, `desktop/R05`.
    - **Fix:** posterize each character material to a 3–4 tone, hue-shifted ramp drawn from the era palette, matching the building clusters. Keep the existing outline.
    - **Test:** the colour count per character material is 4 or fewer.
11. **G-sprite-light-shadow** (lighting, WS4, L, +0.5, severity 3).
    - **Evidence:** `desktop/R05`, `crops/R05-player`, `desktop/R10`.
    - **Fix:** directional cast shadows from the sun angle for actors and tall props, replacing the blob shadows. Add a lamp tint plus a 1 px rim on sprites within a lamp pool, with lighter dither coverage over sprite faces.
12. **G-row-vehicles-layout** (authenticity, WS7, L, +0.5, severity 2).
    - **Evidence:** `desktop/R04`, `desktop/R05`, `desktop/R19`.
    - **Fix:** period vehicles parked or moving on the 1931, 1955 and 2026 streets, then the Row as one continuous Central Avenue frontage with the mountain behind. The five-globe lamps already exist.

## Verdict

**continue.** The gates are not met:
- **Below 7:** characters (5.0), animation (5.5), lighting (6.0), pixel, environment and readability (6.5 each).
- **Met:** ui and authenticity.

```json
{
  "loop": 7,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R04-row", "note": "buildings hand-placed: one outline rule, deliberate clusters, hue-shifted window ramps"},
        {"shot": "crops/R19-row", "note": "2026 facades equally crisp"},
        {"shot": "crops/R15-pen", "note": "animals clean; fence has outline and 3-tone ramp (B's 'plain' charge rejected)"},
        {"shot": "crops/R17-player", "note": "character family softer: broad 2-3 tone gradient hat dome beside crisp porch"},
        {"shot": "strips/R14", "note": "head shading change follows the pose, not noise (A rejected)"},
        {"shot": "desktop/R03", "note": "uniform mottled meadow"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "player's profile hat still a dome about 40-45% of height"},
        {"shot": "desktop/R05", "note": "5x zoom: 1931 passer-by is a straw disc covering the torso"},
        {"shot": "desktop/R09", "note": "side-view change landed on the 1871 profile man; 1871 headscarf variant present"},
        {"shot": "desktop/R04", "note": "1886 bonnet clones; variety roll not reaching 1886"},
        {"shot": "crops/R16-npcs", "note": "Ezra hidden; Josiah flat cap instead of fur cap; one face template"},
        {"shot": "crops/R17-player", "note": "Ray's fedora a grey dome, beside reference"},
        {"shot": "crops/R11-npcs", "note": "Walt, Augustin and Hattie distinct by headwear; Walt lacks knickers and stockings"},
        {"shot": "crops/R15-pen", "note": "animals strong; goat solid white"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "richly built Victorian town"},
        {"shot": "desktop/R19", "note": "reused Row and market pavilion"},
        {"shot": "desktop/R03", "note": "about 65% open meadow"},
        {"shot": "desktop/R07", "note": "water zoned with caustics but undressed; pier just ends"},
        {"shot": "desktop/R08", "note": "springs plain with four stone boxes"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R05", "note": "on-grid dithered pools, lit windows, neon, five-globe lamps"},
        {"shot": "desktop/R07", "note": "18:20 with no warmth"},
        {"shot": "desktop/R09", "note": "muted grade but dry road, no sheen or puddles"},
        {"shot": "desktop/R08", "note": "flat milky fog wash"},
        {"shot": "desktop/R10", "note": "convincing snow"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/R13", "note": "stride with arm swing; rigid hat; frames 5 and 6 near duplicates"},
        {"shot": "strips/R13-mobile", "note": "same cycle"},
        {"shot": "strips/R14", "note": "anticipation and strike read, tile settles; frames 4-8 hold one pose, no dust or recovery"}
      ]
    },
    "ui": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R11", "note": "crisp 1886 dialogue, clear hierarchy; small portrait"},
        {"shot": "desktop/R12", "note": "1931 navy and gold pack, tabs and detail strip"},
        {"shot": "desktop/R18", "note": "1955 teal and cream shop, legible; smaller body face"},
        {"shot": "desktop/R16", "note": "1807 forest-green frames"},
        {"shot": "mobile/R12", "note": "reflows, no Esc on touch; chips cover 30-40% of item 7 and 8 icons"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R02", "note": "player findable, HUD legible on phone"},
        {"shot": "mobile/R05", "note": "night legible on phone"},
        {"shot": "crops/R08-player", "note": "true sort bug: post drawn over the player"},
        {"shot": "crops/R15-player", "note": "true sort bug: trough drawn over the hat"},
        {"shot": "crops/R16-npcs", "note": "Ezra hidden by staging; tags abut into one line"},
        {"shot": "mobile/R04", "note": "hotbar chips hide icons"}
      ]
    },
    "authenticity": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "named 1931 Row, neon, five-globe lamps (A's three-globe claim wrong)"},
        {"shot": "desktop/R09", "note": "1871 board false fronts"},
        {"shot": "desktop/R06", "note": "1955 Googie drive-in and motor hotel"},
        {"shot": "desktop/R19", "note": "2026 reuse grounded; no vehicles"},
        {"shot": "desktop/R16", "note": "1807 trade camp"},
        {"shot": "crops/R17-player", "note": "clothing carries less era than architecture"}
      ]
    }
  },
  "gaps": [
    {"id": "G-sort-collision-staging", "category": "readability", "expectedGain": 0.75, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "crops/R15-player", "strips/R13", "desktop/R06", "crops/R16-npcs", "desktop/R08"], "benchmark": "chained-5.jpg", "fix": "Foot-line sort for props (R08 post, R15 trough); 1-tile collision footprint on lamp posts and signposts with NPC paths kept off it (R13, R06); scripted groups keep NPCs out of the tile behind the player (R16 Ezra). Test: no prop whose foot y is less than an actor's foot y draws over that actor in any capture."},
    {"id": "G-mobile-hotbar-chips", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R12"], "benchmark": "stardew-5.jpg", "fix": "Below 768 px: slot number as a 1x digit outside the slot's top edge; stack count only above 1, bottom-right, chip at most 25% of slot area. Test: at least 80% of icon pixels visible in slots 7 and 8."},
    {"id": "G-1886-townsfolk-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R08", "mobile/R04", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Send 1886 passers-by through the bonnet/headscarf/no-hat roll that already works in 1871, plus at least 3 skirt swatches. Test: no two visible 1886 women share both headwear and skirt colour."},
    {"id": "G-checklist-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R17-player", "crops/R16-npcs", "crops/R11-npcs", "crops/R06-player"], "benchmark": "chained-5.jpg", "fix": "Rig parts for Caleb's slouch brim (breaking the head outline by at least 2 px a side), Ray's pinched fedora with snapped brim, Josiah's fur cap with tail, Margaux's scarf at least 60 degrees of hue from her hair, June's ponytail, Walt's knickers and stockings, Ada's pinned hair; 3 mouth and brow variants per named person."},
    {"id": "G-tool-feel", "category": "animation", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Hoe: 2-frame crouch, a 3-5 particle soil burst plus clod pop, 1-frame squash with 60 ms hit-stop, 2-frame recovery. Walk: 1 px head and hat bob on passing frames, 6 distinct poses."},
    {"id": "G-profile-back-headwear", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/R13", "desktop/R05", "desktop/R04", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Side and back views: brim width at most shoulder width plus 2 art px, with nape and collar visible, for the player, the 1931 straw hat and the 1886 bonnets; a sheet script checks every side and back frame."},
    {"id": "G-weather-time-grade", "category": "lighting", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R09", "desktop/R07", "desktop/R08", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "Rain: 2-tone dithered road sheen, puddle tiles with 3-frame splash rings, 10% darker and cooler grade. A warm, low-angle banded grade from 17:30. Fog: 3 banded density layers with distance falloff instead of a flat wash."},
    {"id": "G-empty-screens", "category": "environment", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R08", "desktop/R02"], "benchmark": "stardew-1.jpg", "fix": "Farm: at least 4 activity clusters, a path network and 2-3 large grass patches. Lake: reeds, lily pads, rocks, moored boat, posted pier end. Springs: tufa terraces, runnels, boardwalk. Merge the seed and sprout pads into continuous soil."},
    {"id": "G-label-spacing", "category": "readability", "expectedGain": 0.25, "severity": 1, "effort": "S", "workstream": "WS6", "evidence": ["crops/R16-npcs", "crops/R11-npcs"], "fix": "At least 4 art px between name-tag boxes, staggered vertically when needed, or show names only for the targeted NPC."},
    {"id": "G-character-ramps", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["strips/R13", "crops/R17-player", "desktop/R05"], "benchmark": "chained-5.jpg", "fix": "Posterize each character material to a 3-4 tone hue-shifted ramp from the era palette, keeping the outline. Test: at most 4 colours per character material."},
    {"id": "G-sprite-light-shadow", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["desktop/R05", "crops/R05-player", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Directional cast shadows from the sun angle for actors and tall props instead of blob shadows; lamp tint and a 1 px rim on sprites inside lamp pools, with lighter dither over faces."},
    {"id": "G-row-vehicles-layout", "category": "authenticity", "expectedGain": 0.5, "severity": 2, "effort": "L", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R05", "desktop/R19"], "fix": "Period vehicles on the 1931, 1955 and 2026 streets; then the Row as one continuous Central Avenue frontage under the mountain. Five-globe lamps already exist."}
  ],
  "verdict": "continue"
}
```
