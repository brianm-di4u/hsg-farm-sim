# Advocate review: loop 8, tier T32

All capture paths are relative to `games/farm-sim/screenshots/review-loop-8/`. Zoom crops I made with nearest-neighbour scaling to check claims are in the session scratchpad (`.../scratchpad/loop-8/`) and are named where used. Hard gates pass (`reviews/loop-8/GATES.md`: 88/88 on both suites, pixel integrity passes on all 26 captures, performance is inside budget), so the loop is scored.

## Summary
Most of the critics' case holds up against the captures:
- Characters are the weakest category.
- Farm layouts are identical across eras.
- Fog overlays are off-grid.
- Passers-by seen from behind read as animals.
- The dialogue portrait is an upscaled walking sprite.

Several claims are factually wrong, though, and most of them cluster in **lighting**:
- The rain scene *does* darken and desaturate the ground.
- The 1955 dusk *does* have lit windows, lit motel lights and a warm darker grade.

Other claims are wrong in smaller ways:
- The R13 "cap" is Ada's hair.
- The 1886 "gas-date anachronism" is about oil lanterns on wooden posts.
- The "colliding name tags" don't overlap.
- The "one weed stamp" is two stamps with readable form, not speckle.
- The shop and pack "frame family mismatch" compares two different eras.
- Codex calls the phone A/B face-button letters "keyboard letters".

The walk judgement in `strips/R13` is partly confounded by a lamp post that hides the legs in frames 1–6. That is a staging fault, not a cycle fault.

I propose +0.5 on lighting, +0.25 on pixel, animation and readability against the critic means, and hold the rest. **Proposed total 50.5 / 80** (critic mean 49.25). Characters stays at 5.0, the clear priority.

## Category by category

### 1. pixel: critic mean 6.25 (A 6.5, B 6.0) → proposed 6.5

**Conceded:**
- **Fog overlays are off-grid** (`desktop/R08`; my 3× zoom `r08_fog.png`). The green terrace shapes are smooth translucent ellipses. The curl streaks are thin lines finer than the 4-px art pixel. The steam plumes are soft blobs. This is a real pixel-craft defect.
- **The title backdrop is noisy** (`desktop/R01`; zoom `r01_z.png`). It is single-pixel speckle with no cluster discipline. The top-left quadrant alone holds about 5,400 distinct colours, against about 190 in a whole Victorian building in `desktop/R04`.
- **There are two outline rules.** People have brown outlines and flat 3–4-tone fills (`crops/R02-player`, `crops/R19-player`). Buildings and props are many-toned with near-black outlines (`crops/R04-row`).

**Rebutted:**
- **Critic A says the weed and berry-shrub stamps are "dark speckle clusters with no readable form".** Wrong. My 3× zoom of `desktop/R14` (`r14_z.png`) shows a spiky grass tuft with a continuous dark outline, a yellow-green highlight ramp and pointed tips. The berry shrub has distinct yellow and pink flower clusters. Repetition is a real problem (environment, below), but this is not the 5-anchor "noisy foliage cluster".
- **Critic A says the deep-water boundary in `desktop/R07` is "a soft curve".** Overstated. In my 3× zoom (`r07_water.png`) the darker deep-water region steps in art-pixel stairs and sits on the grid. It is low-contrast, but it is not a smooth anti-aliased curve.
- **Critic B says `crops/R03-field` has "densely shaded soil islands" with inconsistent edges.** The soil tiles there have a clean dark outline, a 3-tone ramp and a few clods. The crops are the cleanest art in the build, and both critics rank them CAL-B level elsewhere.

**Net:** the best families (buildings, crops, animals: `crops/R04-row`, `crops/R19-row`, `crops/R03-field`, `crops/R15-pen`) are 8+. The real defects are fog overlays, the title art and the character outline rule. 6.5 (A's score) fits better than 6.0.

### 2. characters: critic mean 5.0 (A 5.0, B 5.0) → proposed 5.0

**Conceded (verified):**
- **Caleb** (`crops/R03-player`) wears a flat newsboy-style cap with a narrow peak, not a slouch hat, and has a brown smear on the chest.
- **June Vale** (`crops/R06-player`) is a round brown head with no ponytail and reads as a boy. Fails.
- **Sam** (`crops/R19-player`): the bill is a grey band across the dome, not a projecting bill.
- **Walt** (`crops/R11-npcs`) has dark full-length trousers and no white stockings, and his white collar reads as a beard.
- **Josiah and Ezra** (`crops/R16-npcs`) wear the same tan dome hat. Josiah's fur cap and fringed shirt can't be read.
- **Clones:** in `desktop/R08`, `desktop/R04` and `desktop/R10`, two of the three passing women are the same bonnet, blue-kerchief and purple-skirt sprite.
- **Back views read as animals.** Critic A is right, and there is a stronger example than the ones cited. The bonnet woman seen from the side in `desktop/R09` (my zoom `r09_street.png`) reads as a squirrel or marmot. The left walker in `desktop/R19` reads as a dog.

**Rebutted or corrected:**
- **Critic B says Ada's silhouette is "very close to Nora's"** (`crops/R16-player` vs `crops/R04-player`). The body template is shared, but the two are separated by headwear (Ada's dark loose hair vs Nora's pale bonnet) and palette (brown sleeves vs blue bodice). They live in different eras and never share a screen. The real problem is the shared body template, which is already in B's gap.
- **Critic A reads the R13 walker as wearing a cap that "still covers most of the head in profile".** That walker is Ada (1807, hatless; see `desktop/R02`, which shows the same cabin and player). The dome is her hair. The visual point stands (the head is mostly mass, with a sliver of face), but the cause is the hair shape, not the hat-size change this loop made.
- **Correct "every human is identical" to "most are".** Hattie (white cap, white dress) and Margaux (red scarf, blue shirt) pass their checklists (`crops/R11-npcs`, `crops/R16-npcs`). Ray's grey fedora with brim reads in both `crops/R05-player` and `crops/R17-player`.

**Net:** 5.0 is correct. I don't propose a change.

### 3. environment: critic mean 6.5 (A 6.5, B 6.5) → proposed 6.5

**Conceded:**
- **The farm layout is identical across eras.** This is verified, and it is stronger than A states. `desktop/R02` (1807) and `desktop/R17` (1931) have the same path, the crate at the same pixel position, the three berry shrubs at the same positions and even the same wildflower placements.
- **Building stamps repeat:** the identical green villa appears twice on the left in `mobile/R04`.
- **The reed column is one repeated sprite** along the creek in `desktop/R16`.
- **The lake is mostly empty water with a visibly tiling diamond pattern,** and no reeds or rowboat are visible in `desktop/R07`. The batch-10 shore dressing does not show in that capture.
- **Every town uses the same cross plan on lawn** (`desktop/R04`, `desktop/R05`, `desktop/R09`, `desktop/R19`).
- **The lower half of `desktop/R15` is empty grass,** as B says.

**Rebutted (minor):**
- **The field is not "one weed stamp".** `desktop/R14` has a spiky weed, a flowering shrub, field stones and wildflowers. It is still too regular a grid.
- **B's "scattered stamps rather than purposeful activity areas" is too broad for `desktop/R02`.** The yard there clusters a log pile, barrels, crate and campfire around the cabin. The open field to the right is the sparse part.

**Net:** 6.5 holds. The era buildings (`desktop/R09`, `desktop/R04`, `desktop/R17`, `desktop/R06`, `desktop/R19`) are the strength, and the sparse, repeated grounds are the weakness.

### 4. lighting: critic mean 6.0 (A 6.0, B 6.0) → proposed 6.5

This category contains the clearest factual errors.

- **Rebut, factually wrong. Critic A says rain shows "full-saturation green grass, with no wet darkening".** I measured the mean grass colour over the same top-centre region:

  | Capture | Saturation | Value |
  |---|---|---|
  | `desktop/R09` (1871 rain) | 0.27 | 0.44 |
  | `desktop/R04` (1886 clear day) | 0.42 | 0.59 |
  | `desktop/R15` (1871 clear day, open grass) | 0.38 | 0.57 |

  Rain darkens the ground by about 25% and desaturates it by about a third. The rain streaks sit on the art grid (`r09_street.png`), and the windows are lit at 13:20 in the rain. What is missing is puddles and splashes, nothing more.
- **Rebut, factually wrong. Critic A says the 1955 dusk has "no lamps lit, no warm sky light"** (`desktop/R06`).
  - Every bathhouse (Superior, Quapaw, Ozark, Hale) has lit yellow windows.
  - The motor hotel's roof lights and sign throw warm glows (my zoom `r06_motel.png`).
  - The grade is measurable: grass value is 0.47 vs 0.59 in the 2026 day scene `desktop/R19`, with a warmer red-to-green ratio (0.88 vs 0.72).
  - The street lamps are unlit, and there are no long shadows. So the dusk is *weak*, not absent.
- **Concede:**
  - In `desktop/R05` the lamp pools are diagonal bands that sit between the lamps, not under them (zoom `r05_z.png`).
  - Sprites cast no shadows.
  - The fog is a flat wash with off-grid curls (`desktop/R08`).
  - The 2026 evening (`desktop/R07`) gives little sign of the hour.
- **Critic B says R05 architecture "falls into nearly uniform darkness".** Overstated. In `r05_z.png` the Quapaw's arches, balustrade and doors all stay legible, and the lit windows model the facade. The night keeps readable midtones on the phone too (`mobile/R05`).
- **Still good:** the 1931 night (`desktop/R05`: dithered on-grid light, neon CLUB sign) and the 1886 snow (`desktop/R10`).

**Net:** with the rain and dusk claims corrected, the build has three working moods (night, snow, rain), one weak one (dusk) and one off-grid one (fog). Light stays on grid apart from the fog. That sits between the 5 and 7 anchors, nearer 7 than the critics allowed. I propose 6.5, at moderate confidence.

### 5. animation: critic mean 5.75 (A 6.0, B 5.5) → proposed 6.0

**Rebut the cause.** In `strips/R13` and `strips/R13-mobile` (my zoom `r13_z.png`), a two-lantern post stands in front of the walker's legs in frames 1–6. Part of the "frames 2–6 near-identical" and "rigid" verdicts comes from the legs being hidden, not from the cycle itself. Where the legs are visible (frames 1, 7 and 8), there is a full stride with an opposite arm swing. That is a capture-staging fault and should be scored as such.

**Rebut B's "the body remains largely upright".** In `strips/R14` frame 4, the head drops and the body squashes into the impact. The tilled tile appears on contact, and its clods change through frames 5–8.

**Concede:**
- There is no head bob or secondary motion in the walk.
- The hoe's settle is held for four similar frames with no recoil.
- The hands don't clearly grip the haft.

**Net:** A's 6.0 fits the evidence better than B's 5.5.

### 6. ui: critic mean 6.5 (A 6.5, B 6.5) → proposed 6.5

**Concede:**
- The dialogue portrait is the walking sprite scaled up (`desktop/R11`, `mobile/R11`).
- Panels are plain bevelled boxes.
- The title menu is a generic button stack (`desktop/R01`).

**Rebut, wrong cause. Critic A says the shop (`desktop/R18`) and the pack (`desktop/R12`) "don't look like one family".** R18 is the 1955 chapter: the shop is cream and teal, matching that era's cream HUD in the same frame. R12 is 1931: the pack is navy and gold, matching that era's HUD. The rubric's 9 anchor asks for *era-distinct* UI. Within one era the panels and HUD match.

**Rebut, factually wrong. Critic A says the JOSIAH, TRADE and MARGAUX tags overlap** (`desktop/R16`, `crops/R16-npcs`). They abut with a gap of a few pixels, and TRADE is the tent's sign, not an NPC tag. The real collision is the EZRA tag sitting over Josiah's face and body.

**Rebut, wrong label. Critic B speaks of "prominent keyboard letters" on the phone action buttons** (`mobile/R11`, `mobile/R04`). They are A and B face-button letters, the console convention, with their actions (Talk, Use) written under them.

**Credit:**
- The pixel font is crisp at integer scale (`desktop/R11`).
- Each era has its own HUD colours (`desktop/R02`, `desktop/R05`, `desktop/R07`).
- On the phone, the hotbar numbers no longer cover the icons (`mobile/R04`, `mobile/R12`).

**Net:** 6.5 holds.

### 7. readability: critic mean 6.75 (A 7.0, B 6.5) → proposed 7.0

**Concede:**
- Back-view passers-by don't read as people (`desktop/R09`, `desktop/R19`).
- The EZRA tag covers Josiah (`desktop/R16`).
- Tall mature crops overlap the tile above (`crops/R03-field`).

**Rebut B's `mobile/R05` claim.** The player, lamp posts, lit windows, the CLUB sign and the passer-by all stay separate on the phone at night. Only the unlit lower-left facades are dark, and nothing there is interactive.

**Credit:**
- Crop stages and ripe markers read at a glance (`crops/R03-field`).
- The target bracket and player are findable in every phone frame (`mobile/R04`, `mobile/R05`).
- Pack and dialogue text is legible on the phone (`mobile/R12`, `mobile/R11`).

**Net:** this meets the 7 anchor ("everything legible at 1× on phone and desktop"), with the back-view passers-by as the main exception. I propose 7.0.

### 8. authenticity: critic mean 6.5 (A 6.5, B 6.5) → proposed 6.5

**Rebut, factually wrong. Critic A calls the 1886 street lanterns "before the 1897 gas date".** In `desktop/R04` and `desktop/R10` they are single lanterns hung from plain wooden posts, an oil or kerosene street light. The 1897 date in `pixel-anchors.md` applies to *gas* street lights. The cast-iron multi-globe posts first appear in 1931 (`desktop/R05`), which fits the anchor's five-globe 1929 date.

**Concede:**
- The 1886 Row uses generic BATHS / HOT BATHS / BATH HOUSE signs (`desktop/R04`).
- The towns sit on lawn with no mountain behind.
- The clothing checklist misses: Walt, Josiah, Ezra, Caleb (`crops/R11-npcs`, `crops/R16-npcs`, `crops/R03-player`).
- No one wears winter clothing in the snow. The same three women appear unchanged in `desktop/R10`.

**Credit:** the six eras are sortable at a glance (`desktop/R16`, `desktop/R09`, `desktop/R04`, `desktop/R05`, `desktop/R17`, `desktop/R06`, `desktop/R19`).

**Net:** 6.5 holds.

## Plainly wrong facts

**Critic A (critic-claude):**
1. **"Rain: full-saturation green grass, no wet darkening"** (`desktop/R09`). Rain grass measures saturation 0.27 and value 0.44, against 0.42 and 0.59 on a clear day in `desktop/R04`.
2. **"1955 dusk: no lamps lit"** (`desktop/R06`). All four bathhouses have lit windows, and the motor hotel's roof lights glow.
3. **"NPC name tags JOSIAH, TRADE and MARGAUX overlap"** (`desktop/R16`). They abut, and TRADE is the tent sign. The actual overlap is EZRA over Josiah.
4. **"The cap still covers most of the head in profile"** (`strips/R13`). The walker is hatless Ada (1807), so the mass is hair.
5. **"Street lanterns on posts in 1886, before the 1897 gas date"** (`desktop/R04`). These are oil lanterns on wooden posts, not gas lamps.
6. **"The unworked field is a near-grid of one weed stamp"; "dark speckle with no readable form"** (`desktop/R14`). There are two outlined, readable stamps, plus stones and wildflowers.
7. **"The deep-water boundary is a soft curve"** (`desktop/R07`). It is stepped on the art grid, though low-contrast.
8. **"Shop and pack don't look like one family"** (`desktop/R18`, `desktop/R12`). They are different eras (1955 vs 1931), and each matches its own era's HUD.

**Critic B (critic-codex):**
1. **"Phone action buttons retain prominent keyboard letters"** (`mobile/R11`). They are A/B face-button letters.
2. **"Architecture falls into nearly uniform darkness"** (`desktop/R05`). Arches, balustrades and doors stay legible.
3. **"Body remains largely upright" in the hoe swing** (`strips/R14`). Frame 4 shows a head drop and a body squash.

## Gaps: adjusted

Both critics' gaps follow, unchanged in substance, with my adjustments.

| Gap | Severity | Expected gain | Note |
|---|---|---|---|
| **G-char-checklist-headwear** | 5 (kept) | +1.0 (kept) | Fully verified |
| **G-character-identities** (B) | 5 (kept) | 1.5 → 1.0 | Overlaps the headwear gap; the Ada/Nora point is weak |
| **G-env-town-lawn-layout** | 4 (kept) | +0.5 (kept) | Verified |
| **G-char-backviews-clones** | 4 (kept) | +0.5 (kept) | Verified, with a stronger example in `desktop/R09` |
| **G-light-time-weather** | 4 → 3 | 1.0 → 0.5 | The rain grade and the dusk window light already exist. Left to do: puddles and splashes, street lamps lit at dusk, long shadows, pools centred under lamps |
| **G-lighting-form** (B) | 4 → 3 | 1.0 → 0.5 | The R05 architecture keeps its midtones |
| **G-art-family-consistency** (B) | 4 → 3 | 1.0 → 0.5 | The mismatch is mainly the character outline and ramp; the soil and crops are clean |
| **G-purposeful-dressing** (B) | 4 → 3 | 1.0 → 0.5 | Overlaps G-env-stamp-repetition; the R02 yard is already grouped |
| **G-action-weight** (B) | 4 → 3 | 1.0 → 0.5 | The hoe already has a lean; the walk evidence is confounded by occlusion |
| **G-pixel-offgrid-overlays** | 3 (kept) | +0.5 (kept) | Scope it to the R08 fog ovals, curls and steam; the R07 water edge is already on grid |
| **G-env-stamp-repetition** | 3 (kept) | +0.5 (kept) | Add the identical cross-era farm layout (R02 and R17) to its evidence |
| **G-ui-portrait-frames** | 3 (kept) | +0.5 (kept) | Drop the shop vs pack family point (era-distinct by design); the tag fix applies to EZRA over Josiah |
| **G-ui-authorship** (B) | 3 (kept) | +0.5 (kept) | Drop the "keyboard letters" point |
| **G-anim-walk-secondary** | 3 (kept) | +0.5 (kept) | Moving the lamp post is a capture-staging fix |
| **G-era-streetscapes** (B) | 3 (kept) | +0.5 (kept) | Overlaps G-env-town-lawn-layout |
| **G-char-faces-hands** | 3 → 2 | 0.5 → 0.25 | At this head size the eyes carry the face; this is secondary to silhouette and headwear |
| **G-pixel-title-art** | 2 (kept) | +0.25 (kept) | Verified |

```json
{
  "loop": 8,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/R04-row", "note": "clean building clusters and hue-shifted ramps, 8+ level"},
        {"shot": "crops/R03-field", "note": "clean outlined soil tiles and crops; B's 'dense soil shading' not borne out"},
        {"shot": "desktop/R14", "note": "weed tuft and berry shrub are outlined with readable form (zoom r14_z.png), not speckle; repetition is an environment issue"},
        {"shot": "desktop/R07", "note": "deep-water edge is stepped on the art grid (zoom r07_water.png), not a soft curve"},
        {"shot": "desktop/R08", "note": "conceded: fog ovals, curls and steam are smooth off-grid alpha (zoom r08_fog.png)"},
        {"shot": "desktop/R01", "note": "conceded: title art is speckle, about 5,400 colours in one quadrant"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R03-player", "note": "conceded: Caleb's newsboy-style cap, chest smear"},
        {"shot": "crops/R06-player", "note": "conceded: June reads as a boy, no ponytail"},
        {"shot": "crops/R16-npcs", "note": "conceded: Josiah and Ezra share a hat; Margaux passes"},
        {"shot": "crops/R11-npcs", "note": "conceded: Walt in long trousers; Hattie passes"},
        {"shot": "desktop/R09", "note": "bonnet passer-by in side/back view reads as an animal (zoom r09_street.png)"},
        {"shot": "crops/R16-player", "note": "Ada vs Nora (crops/R04-player) differ in headwear and palette; the shared body template is the issue"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R17", "note": "strong era props (Model A, pump, hay, bungalow), but identical path, crate, shrub and flower positions to desktop/R02"},
        {"shot": "desktop/R02", "note": "yard is grouped (log pile, barrels, crate, campfire); open field sparse"},
        {"shot": "desktop/R19", "note": "varied restored facades, market, solar roof"},
        {"shot": "desktop/R07", "note": "conceded: empty tiling lake, no reeds or rowboat visible"},
        {"shot": "mobile/R04", "note": "conceded: identical villa twice"},
        {"shot": "desktop/R14", "note": "two weed stamps plus stones on a near-grid"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.55,
      "evidence": [
        {"shot": "desktop/R09", "note": "rain grass saturation 0.27, value 0.44 vs desktop/R04 day 0.42 and 0.59: wet darkening present; on-grid streaks, lit windows; no puddles"},
        {"shot": "desktop/R06", "note": "dusk: all bathhouse windows lit, motel roof lights glow (r06_motel.png), grass value 0.47 vs 0.59 day; street lamps unlit, no long shadows"},
        {"shot": "desktop/R05", "note": "dithered on-grid night light, neon, readable facades (r05_z.png); pools sit between lamps"},
        {"shot": "desktop/R10", "note": "snow caps and ragged snow edges"},
        {"shot": "desktop/R08", "note": "conceded: fog wash with off-grid curls"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.55,
      "evidence": [
        {"shot": "strips/R13", "note": "lamp post hides the legs in frames 1-6 (r13_z.png); visible frames 1, 7, 8 show a full stride with opposite arm swing; no head bob"},
        {"shot": "strips/R13-mobile", "note": "same occlusion at phone scale"},
        {"shot": "strips/R14", "note": "wind-up frames 1-2, swing 3, head drop and squash on impact frame 4, tile changes 4-8; settle held too long, weak grip"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R18", "note": "1955 shop matches the 1955 cream HUD in the same frame: era-distinct, not off-family"},
        {"shot": "desktop/R12", "note": "1931 pack matches the 1931 navy and gold HUD"},
        {"shot": "desktop/R11", "note": "crisp integer pixel font; conceded: portrait is the upscaled walking sprite"},
        {"shot": "desktop/R16", "note": "JOSIAH, TRADE (tent sign) and MARGAUX abut without overlapping; EZRA tag covers Josiah"},
        {"shot": "mobile/R11", "note": "A/B are face-button letters with Talk/Use labels, not keyboard letters"}
      ]
    },
    "readability": {
      "score": 7.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "crops/R03-field", "note": "stages and ripe markers read at a glance; tall crops overlap the row above"},
        {"shot": "mobile/R05", "note": "player, lamps, windows, sign and passer-by stay separate at night on the phone"},
        {"shot": "mobile/R04", "note": "player, bracket and hotbar icons clear on the phone"},
        {"shot": "mobile/R12", "note": "pack legible on the phone"},
        {"shot": "desktop/R09", "note": "conceded: back-view passer-by doesn't read as a person"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R04", "note": "1886 oil lanterns on wooden posts, not gas lamps: no 1897 anachronism; conceded: generic BATHS signs, lawn setting"},
        {"shot": "desktop/R05", "note": "multi-globe cast-iron posts first appear in 1931, consistent with the 1929 anchor date; real bathhouse names"},
        {"shot": "desktop/R06", "note": "Googie drive-in, motor hotel, hydrant"},
        {"shot": "desktop/R19", "note": "restored Row, solar roof, farmers market"},
        {"shot": "desktop/R10", "note": "conceded: no winter clothing in snow"},
        {"shot": "crops/R11-npcs", "note": "conceded: Walt's 1880s uniform missing"}
      ]
    }
  },
  "gaps": [
    {"id": "G-char-checklist-headwear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R19-player", "crops/R06-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Redraw Caleb's hat as a low-crown wide-brim slouch hat; draw Sam's bill sticking out past the forehead; give June a ponytail and rolled cuffs; add a knickers lower-body variant with white stockings for Walt; give Josiah a fur cap with tail, gray beard and fringed shirt; give Ezra a long coat and walking stick. Advocate: severity and gain kept, fully verified."},
    {"id": "G-character-identities", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R16-npcs", "crops/R11-npcs", "crops/R04-player"], "benchmark": "seastars-2.jpg", "fix": "Create distinct body and posture templates and render defining period garments, headwear and readable signature props. Advocate: gain cut from 1.5 to 1.0 because it overlaps G-char-checklist-headwear; the Ada/Nora silhouette point is weak (headwear and palette already differ)."},
    {"id": "G-env-town-lawn-layout", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Put a mountain slope band behind the Row; add sidewalks, yard fences, side lots and era street furniture; vary the street plan per era; name the 1886 bathhouses instead of generic BATHS signs. Advocate: kept."},
    {"id": "G-char-backviews-clones", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R05", "desktop/R08", "desktop/R19", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Cap hat and hair at about 40% of sprite height in back and side views and show the shoulders and back of the garment; recolour garments per instance so no skirt and kerchief pair repeats on screen; give winter scenes coats and shawls. Advocate: kept; desktop/R09 is the clearest case (side-view bonnet woman reads as an animal)."},
    {"id": "G-light-time-weather", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07", "desktop/R09"], "benchmark": "seastars-2.jpg", "fix": "Turn street lamps on from 18:00 and add long banded shadows at dusk; strengthen the evening grade; add on-grid puddles and splashes in rain; centre lamp pools under their lamps. Advocate: severity 4 to 3 and gain 1.0 to 0.5, because rain already darkens and desaturates the ground (s 0.27 v 0.44 vs 0.42/0.59) and dusk already has lit windows, motel lights and a warm darker grade."},
    {"id": "G-lighting-form", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R06", "desktop/R08", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Retain ambient midtones, add directional sprite highlights and grounded shadows, and reduce fog coverage over gameplay silhouettes. Advocate: severity 4 to 3 and gain 1.0 to 0.5; R05 facades keep legible midtones, so the remaining work is sprite shadows and fog coverage."},
    {"id": "G-art-family-consistency", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R19-player", "crops/R04-row"], "benchmark": "chained-5.jpg", "fix": "Unify outline weights and material ramps, simplify noisy soil and foliage clusters, and strengthen controlled garment modelling. Advocate: severity 4 to 3 and gain 1.0 to 0.5; soil and crops are clean, the mismatch is mainly the characters' brown-outline flat-fill rule."},
    {"id": "G-purposeful-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R02", "desktop/R15", "desktop/R07"], "benchmark": "stardew-1.jpg", "fix": "Group props around work areas, vary vegetation density and ground wear, break water repetition and detail dock and shore edges. Advocate: severity 4 to 3 and gain 1.0 to 0.5; overlaps G-env-stamp-repetition, and the R02 yard is already grouped round the cabin."},
    {"id": "G-action-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "Rubric animation anchors; stardew-1.jpg for visual character context only", "fix": "Add convincing grip, contact pose, soil displacement and recovery, plus walking counter-motion. Advocate: severity 4 to 3 and gain 1.0 to 0.5; R14 frame 4 already has a head drop and squash, and R13's apparent rigidity is partly the lamp post hiding the legs."},
    {"id": "G-pixel-offgrid-overlays", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R08", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Quantize fog curls, terrace ovals and steam to the 4-px art grid with ordered dither and stepped alpha, as the R05 lamp pools already are. Advocate: kept; scope is the R08 fog, since the R07 deep-water edge already steps on the grid."},
    {"id": "G-env-stamp-repetition", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R14", "desktop/R16", "mobile/R04", "desktop/R02", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Draw 3-4 variants per weed, reed and shrub with flips and sub-tile jitter; break up the field with tall grass and bare patches; never show the same building sprite twice on one screen. Advocate: kept; the field has two stamps, not one, and the identical R02/R17 farm layout belongs in this gap's evidence."},
    {"id": "G-ui-portrait-frames", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R11", "desktop/R16"], "benchmark": "stardew-5.jpg", "fix": "Draw real 48-64 px bust portraits for named people; give each era a nine-slice frame material; keep NPC tags clear of other NPCs' faces. Advocate: kept; dropped the shop vs pack mismatch (R18 is 1955, R12 is 1931, each matches its era HUD); the actual tag collision is EZRA over Josiah."},
    {"id": "G-ui-authorship", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "mobile/R11", "mobile/R12"], "benchmark": "stardew-5.jpg and seastars-4.jpg", "fix": "Add restrained era-specific frame details and expressive portraits and tighten modal spacing. Advocate: kept; dropped the 'keyboard letters' point, since the phone buttons show A/B face-button letters with Talk/Use labels."},
    {"id": "G-anim-walk-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R14"], "benchmark": "stardew-1.jpg", "fix": "Make 6 distinct walk poses with a 1-px body bob and a lagged hat or hair bob; cut the hoe settle to 2 frames and add a recoil and a dirt-clod burst; move the double-lantern post or the strip's path so it no longer hides the walker. Advocate: kept; moving the post is partly a capture-staging fix."},
    {"id": "G-era-streetscapes", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R04", "desktop/R06", "desktop/R19"], "benchmark": "snes-earthbound-1.png", "fix": "Differentiate curb treatment, transport staging, signage scale and activity clusters by era. Advocate: kept; overlaps G-env-town-lawn-layout."},
    {"id": "G-char-faces-hands", "category": "characters", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Add a 1-2 px mouth and brow, clean the face ramp to skin, shadow and highlight, separate cuff from hand, and vary eye shape by age and sex. Advocate: severity 3 to 2 and gain 0.5 to 0.25; at this head size the eyes carry the face, and silhouette and headwear matter far more."},
    {"id": "G-pixel-title-art", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R01", "mobile/R01"], "benchmark": "snes-chronotrigger-1.png", "fix": "Clean the title backdrop clusters by hand or rebuild it from in-game tiles, and give the menu an era frame. Advocate: kept, verified (about 5,400 colours in one quadrant)."}
  ],
  "verdict": "continue"
}
```
