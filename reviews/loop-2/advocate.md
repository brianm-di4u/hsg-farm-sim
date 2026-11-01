# Advocate: loop 2, tier T16

## Summary

Most of what both critics say holds up when checked against the captures. The new building art is the strongest thing in the build. The people are one generic template. Ground is speckled. The 1931 night is too dark, the fog is a veil, the tool swing has no body follow-through, and the UI looks like a web form. I concede all of that.

The critics did get some facts wrong, and a few gaps blame the wrong cause:

- **The sign "clipping" is not clipping.**
  - In 1931, "IPERI" and "UAPA" (`desktop/R05`) come from a lit-sign glow mask that is narrower than the board. The full names render on the same boards in 1955 (`desktop/R06`: SUPERIOR, QUAPAW, OZARK, HALE). Faint S and OR letters are still visible outside the glow in a zoom of `desktop/R05`.
  - "TRAD" in `desktop/R16` and `crops/R16-npcs` is the word TRADE with its E hidden under the "Margaux" name label. The board is not too small.
- **The towns do have street props.** Lantern and hitching posts line both sides of the street and stand in front of every building. Every Row facade has purple planter boxes (`desktop/R04`, `desktop/R09`, `desktop/R10`, `mobile/R04`). There are still no people, vehicles, benches or barrels in town.
- **The farms are not bare.** They have barrels, a crate, a log pile, a campfire and rocks (`desktop/R02`); hay, a sawhorse, the 1920s truck, a trough and a joined fence (`desktop/R17`); and a crop plot with bushes at its corners (`desktop/R03`). The lower half of each farm frame is still empty grass.
- **The 1931 Row is not invisible.** It is far too dark, but a zoom of `desktop/R05` shows arched window grids, gables and roof outlines at a low value. All four Row names, CLUB and HOTEL are readable.
- **Dusk has warm light.** At 19:10 the street lamps are off, but the Row windows are lit warm on Superior, Quapaw, Ozark and Hale (`desktop/R06`).
- **The hoe swing does show an impact chip.** Frames 4 and 5 of `strips/R14` show a grey chip flying off the blade. Codex says no burst is shown; that is wrong. The chip is small, it lands on grass, and no tile gets tilled. Claude's description, "at most 2–3 px", is accurate.
- **Hard gates are established.** Codex calls its scores "provisional pending verification". `GATES.md` records:
  - Pixel suite 88/88.
  - Painted suite 87/88. The one failure was a mobile fps reading taken while the GPU capture was running; re-run alone, it passed 2/2.
  - Pixel integrity passed on all 25 captures.
  - Performance is inside budget.

  That caveat can be dropped.
- **Some character calls are overstated.**
  - Margaux has a salmon-terracotta head covering that is a different colour from her brown hair.
  - Josiah has a tan cap over a grey hair band.
  - Hattie has a white band on a brown crown.

  None of these has a correct silhouette, so they still fail as checklist headwear. They are not absent, though.

A capture note: I confirm Claude's observation that no `crops/*-player` or `crops/*-npcs` image contains a reference sheet, even though the brief says they sit beside one. Both critics scored characters against the text checklist. That is a capture-tooling defect, not an art defect.

My proposed total is **46.5/80**. Claude gave 44.0 and Codex gave 46.0. Every category is still below its gate except authenticity.

---

## 1. pixel: proposed 6.0 (critics 6.0 / 5.5, mean 5.75)

**Concede:**
- **Ground speckle.** It is real (`crops/R03-field`, `crops/R04-player`, `desktop/R10`).
- **Two asset families.** Characters have flat two- or three-tone fills and a brown outline. The buildings beside them use four- or five-step ramps (`crops/R04-player` next to `crops/R04-row`).
- **Title screen.** `desktop/R01` is a downscaled painting with a smooth serif title.
- **Faces at 1×.** Codex says eyes merge with the nose block. At 1× they do; in `crops/R03-player` the two eye columns sit either side of a tan block that reads as one mark.

**Rebut:**
- **The sign defect is in the 3×5 font and the board.** That is the wrong cause. See the summary: in 1955 (`desktop/R06`) the same boards show complete names. The clipped look in 1931 comes from the night sign-glow mask, a lighting issue, and "TRAD" comes from a label overlapping the board, a UI issue. This point should not count against pixel craft.
- **"No clusters or tufts."** Slightly overstated. `crops/R03-player` has small orange flower clusters of 3–4 px, and `crops/R15-pen` has pink and yellow flecks. They are sparse and do not change the verdict.
- **Codex's "mechanically clean lettering".** True in `crops/R04-row` ("FREE BATHS"). But clean, consistent lettering is a pixel-craft virtue, not a fault. The real issue is sign size, which belongs to authenticity.

The buildings in `crops/R04-row` and `desktop/R09` match the 7 descriptor: clean clusters, one outline, coherent palettes per era. The ground and characters drag the score to the 5 anchor. Claude's 6.0 credits both sides, so I propose 6.0.

## 2. characters: proposed 5.0 (critics 4.5 / 5.0, mean 4.75)

**Concede:**
- **Every head is a dome** (`crops/R03-player`, `crops/R05-player`, `crops/R04-player`).
  - Caleb's hat has a band and no brim.
  - Ray's grey dome has no pinch.
  - Nora's bonnet brim sits at the brow and does not wrap the face (`crops/R04-player`). The brief says it frames the face; I can't see that.
- **Ada.** Her hair is khaki, and her white stockings show below a knee-length apron (`crops/R16-player`).
- **Ezra.** He is not visible; only his label floats over the tent (`desktop/R16`).
- **Augustin.** He is a faceless white column (`crops/R11-npcs`).
- **Facing away in dialogue.** Walt, Augustin and Hattie face away (`crops/R11-npcs`, `desktop/R11`).

**Rebut, as overstatements rather than errors:**
- **Margaux.** In `crops/R16-npcs` and a zoom of `desktop/R16`, her crown is a salmon-terracotta covering, clearly different from the brown hair under it. Claude says she has "no red head scarf". The colour is partly there; the knotted silhouette is not. Codex says she "has the scarf". That is too generous for the same reason.
- **Josiah.** Claude says "no fur cap". In `crops/R16-npcs` a tan cap sits above a grey hair band, with a rust patch at the right temple. It doesn't read as fur, but there is a cap. Codex has this right: "bulky cap, tail does not read".
- **Hattie.** Claude says she wears "a brown hat, not the white cap". `crops/R11-npcs` shows a white band around a brown crown, so Codex's "headband" reading is defensible. It still is not the checklist cap.

**Evidence the scores under-weight:**
- **Animals.** They have clear silhouettes, outlines and contact shadows (`crops/R15-pen`). Both critics note this, but Claude's 4.5 is the 3–5 anchor ("can't tell people apart").
- **The people are separable.** At 1× each figure carries at least one checklist feature:
  - Josiah: grey beard.
  - Margaux: blue bodice and dark long skirt.
  - Nora: blue sleeves and white apron.
  - Augustin: all-white chef costume.
  - Walt: blue headwear and dark knickers.

  That is the 5 anchor, "readable figures, generic; few checklist features", not below it.

I propose 5.0.

## 3. environment: proposed 6.0 (critics 6.0 / 6.0, mean 6.0)

**Concede:**
- No townsfolk or vehicles in town (`desktop/R04`, `desktop/R09`, `desktop/R10`).
- Large empty grass on the farms (`desktop/R03`, `desktop/R17`).
- Repeating diagonal water pattern and a pier with no posts (`desktop/R07`).
- The lying-animal prop by the cabin. A zoom of `desktop/R13` confirms it: an elongated brown body with white "socks".
- The box-dog (`desktop/R08`).
- The white rectangle on the 1871 cabin wall (`desktop/R13`, `strips/R13`).

**Rebut:**
- **Claude says the towns have no "hitching posts … barrels or benches".** The hitching posts are plainly wrong. Lantern and hitching posts line both street edges, and there is a post at every door in `desktop/R04`, `desktop/R09`, `desktop/R10` and `mobile/R04`. Purple planters sit under every 1886 facade. Benches and barrels are indeed absent in town.
- **Claude says the lake has "nothing else".** `desktop/R07` also has water glints, a sand shoreline and a herringbone brick plaza at the top right. It is thin dressing, but it exists.
- **The farm dressing is uneven, not absent.**
  - `desktop/R02`: barrels, crate, log pile, campfire, rocks, bushes.
  - `desktop/R17`: hay bale, sawhorse, truck, crate, trough, joined pen fence.
  - `desktop/R15`: pen, trough, animals.

Both critics give 6.0. I agree with 6.0, and with the "competent buildings, sparse dressing" reading.

## 4. lighting: proposed 5.5 (critics 5.0 / 5.5, mean 5.25)

**Concede:**
- **1931 night.** Facades are far too dark (`desktop/R05`, `mobile/R05`).
- **Lamp pools** are repeated ellipses.
- **The seam is real.** A bright horizontal seam runs along the street edge in `desktop/R05` (y≈455) and twice in `mobile/R05`.
- **Fog** is mostly a flat veil over the player too (`desktop/R08`, `crops/R08-player`).
- **2026 evening** has no golden light (`desktop/R07`).
- **Rain** has no splashes (`desktop/R09`).

**Rebut:**
- **1931 facades "cannot be seen at all".** Overstated. Zoomed, `desktop/R05` shows Quapaw's arched window grid, the gables and the roof outlines. Signs and windows are lit, as the brief describes. The value floor is too low, but these are not black shapes.
- **Claude says there is no warm light at dusk.** Wrong. The street lamps are unlit at 19:10, but the Row windows glow warm in `desktop/R06`.
- **"One uniform alpha layer".** Mostly fair. The right half of `desktop/R08` has patchier, denser fog than the left, but there are no depth bands and it does not avoid the player.
- **On-grid light is under-credited.** Both critics note that the pool edges are stepped on the art grid (`crops/R05-player`), and "light kept on-grid" is a 7-anchor criterion. Snow-roof variants that follow each roof (`desktop/R10`) and the darkening in rain (`desktop/R09`, `desktop/R02`) are weather moods. Light sources match their era: five-globe clusters in 1931, curved arm lamps in 1955.

This is above "day/night present, generic pools" but well short of 7. I propose 5.5.

## 5. animation: proposed 5.5 (critics 5.0 / 5.5, mean 5.25)

**Concede:**
- **Walk.** It has about four leg poses and a rigid upper body (`strips/R13`, `strips/R13-mobile`).
- **Hoe body.** The body sprite does not change through the swing, and the tool covers the face in frames 1–2 (`strips/R14`).
- **No tilled tile** appears in frames 6–8.
- **No visible ambient motion** in any capture.

**Rebut:**
- **Codex says the strip does not show an impact burst.** Wrong. `strips/R14` frame 4 shows a grey chip flying off to the right of the blade, and frame 5 shows a second chip higher up. It is small, but the impact feedback exists. The missing piece is the tile result.
- **The missing tilled tile is partly a capture problem.** The brief bills R14 as "Hoe swing on the field". The strip, and `desktop/R14`, were captured on grass beside the campfire, next to a path. The field may simply not have been the target. I can't credit a tilled tile I can't see, but this gap may be partly a capture fix.
- **Claude's occlusion timing.** Claude says the post stays opaque over the player in frames 1–6. In `strips/R13` it overlaps in frames 1–4; by frames 5–6 it has slid to the player's left edge. Either way, the brief's see-through rule for lamp posts visibly fails here. That is a real bug.

A five-pose tool arc with an impact chip is a tool-specific action, which sits above the 5 anchor's "basic walk; little secondary motion". The static body and missing tile cap it well below 7. I propose 5.5, at low confidence.

## 6. ui: proposed 6.0 (critics 5.5 / 6.0, mean 5.75)

**Concede:**
- **Shop.** Flat panels with web-form buttons (`desktop/R18`: "Buy", "x5", "Close Esc").
- **Placeholder icons.** The Hen icon is an empty oval and Hardware is a gear (`desktop/R18`).
- **Slot numbers** print over the icon art (`desktop/R12`, the hotbar in every frame).
- **Portrait.** It is small: about 76 px wide in `desktop/R11` and smaller still in `mobile/R11`.
- **Title.** Smooth serif (`desktop/R01`).
- **Phone HUD.** It covers the top ~26% (`mobile/R04`).

**Rebut, or credit missed:**
- **Era themes.** The per-era themes are consistent and complete, which both critics mention but Claude's score does not reflect:
  - 1807: dark green (`desktop/R02`, `desktop/R16`).
  - 1871 and 1886: cream (`desktop/R09`, `desktop/R04`).
  - 1931: navy and gold (`desktop/R05`, `desktop/R12`).
  - 1955: cream and teal (`desktop/R06`, `desktop/R18`).
  - 2026: blue (`desktop/R07`).
- **Type.** DotGothic16 body text and Silkscreen headings are pixel-crisp on both viewports (`desktop/R12`, `mobile/R11`).
- **Hierarchy.** It is clear in every panel.

That meets two of the three parts of the 7 descriptor: pixel-crisp fonts and colours per era, and clear hierarchy. Era materials are missing. I propose 6.0.

## 7. readability: proposed 6.0 (critics 6.0 / 6.0, mean 6.0)

**Concede:**
- **Phone HUD cost** (`mobile/R04`, `mobile/R11`).
- **Night town.** Buildings and doors are hard to read at night (`mobile/R05`).
- **Fog contrast** loss (`desktop/R08`).
- **Ezra** is hidden (`desktop/R16`).
- **Labels** collide on the phone (`mobile/R11`).
- **Mature crops merge.** Codex's point that mature vertical crops merge across tiles is right; see the bean column in `crops/R03-field`.

**Credit:**
- The target bracket always finds the player (`desktop/R03`, `mobile/R04`, `mobile/R05`).
- Phone text is comfortably legible (`mobile/R04`, `mobile/R11`).
- The cabbage column shows five clearly distinct stages (`crops/R03-field`).

**A cause note:** NPCs telling apart "only by colour" in `mobile/R11` is a character-art cause (one shared head template), already charged under characters. It should not be double-charged here.

I hold 6.0.

## 8. authenticity: proposed 6.5 (critics 6.0 / 6.5, mean 6.25)

**Concede:**
- **Clothing** fails most headwear checks (see characters).
- **2026** has no modern cue at the lake (`desktop/R07`).
- **Flower boxes** bloom in the snow (`desktop/R10`).
- **R02** is billed as a "spring morning" but was captured in rain (`desktop/R02`). That is a capture-script slip, not an art defect.

**Rebut:**
- **"The 1931 Row is invisible".** It is very dark, but its four real Row names (SUPERIOR, QUAPAW, OZARK, HALE) are lit, and so are the five-globe lamp clusters (`desktop/R05`, `mobile/R05`). The era reads at night through its signs and lamps. It is a lighting defect more than an authenticity one.
- **The architecture progresses across five chapters with distinct, sourced signatures:**
  - 1807: log cabin and patched trade tents (`desktop/R02`, `desktop/R16`).
  - 1871: weathered board-and-batten, false fronts and a stage office (`desktop/R09`).
  - 1886: brick and frame Second Empire mansards and the grand hotel (`desktop/R04`).
  - 1931: Craftsman bungalow and 1920s pickup (`desktop/R17`).
  - 1955: real Row names, drive-in with a fin sign, motor hotel and road markings (`desktop/R06`).

  Claude itself says "a blind viewer could mostly order the buildings". That is above the 6 gate.
- **2026 coverage.** Its weakness is partly capture coverage. The brief says the four restored Row bathhouses and "Hotel Hale" exist, but the only 2026 capture is the lake.

I propose 6.5.

---

## Gaps (critics' gaps, with my adjustments)

Several gaps from the two critics are the same defect under different IDs. Where they overlap, I keep the fuller one at full value and cut the duplicate to its extra value only, so the gains don't double-count.

| Gap | Critic | Their sev / gain | Mine | Reason |
|---|---|---|---|---|
| G-headwear-and-garment-silhouettes | Claude | 5 / 1.5 | 5 / 1.5 | Concede. Headwear silhouettes are the biggest lever (`crops/R03-player`, `crops/R05-player`, `crops/R04-player`). |
| G-character-construction | Codex | 5 / 1.5 | 4 / 0.5 | Duplicates the gap above. Extra value only: faces with separated eyes, and occupation props. |
| G-ground-texture-noise | Claude | 4 / 1.0 | 4 / 1.0 | Concede (`crops/R03-field`, `desktop/R10`). |
| G-texture-hierarchy | Codex | 5 / 1.0 | 4 / 0.5 | Duplicates the ground gap. Severity 5 is overstated: the buildings are clean (`crops/R04-row`) and the streets read clearly (`desktop/R04`). Extra value: water repetition (`desktop/R07`) and matching the outline and ramp rules across asset families. |
| G-night-facades-crushed | Claude | 4 / 1.0 | 4 / 1.0 | Concede on value and seam. The facades aren't fully black (zoom of `desktop/R05`), but the value floor costs a full point. |
| G-light-value-separation | Codex | 4 / 1.0 | 3 / 0.5 | Duplicates night facades plus fog. Extra value only: depth-dependent fog. |
| G-empty-towns-and-fields | Claude | 4 / 1.0 | 4 / 1.0 | Keep the value, correct the problem statement. Lantern and hitching posts and planters exist (`desktop/R04`, `desktop/R09`). Farms have barrels, crates, hay and a truck (`desktop/R02`, `desktop/R17`). The cost is no townsfolk, no vehicles in town, and empty lower farm halves. |
| G-inhabited-environments | Codex | 4 / 1.0 | 3 / 0.5 | Duplicates the gap above. Extra value: dressed entrances and irregular transitions. |
| G-tool-body-poses-and-feedback | Claude | 4 / 1.0 | 4 / 1.0 | Concede the body poses. The burst already exists as a small chip (`strips/R14` frames 4–5), so the fix is to enlarge it, not create it. |
| G-motion-and-contact | Codex | 3 / 1.0 | 3 / 0.5 | Duplicates the gap above. Its premise of no burst at all is wrong (`strips/R14` frame 4). The tilled-tile part is partly a capture fix: the swing was captured on grass. |
| G-weather-time-moods | Claude | 3 / 0.5 | 3 / 0.5 | Concede, with a correction: Row windows are lit at dusk (`desktop/R06`). Only the street lamps are off. |
| G-ui-material-and-icons | Claude | 3 / 1.0 | 3 / 1.0 | Concede (`desktop/R18`, `desktop/R12`). |
| G-ui-art-language | Codex | 3 / 1.0 | 3 / 0.5 | Duplicates the gap above. |
| G-mobile-world-space | Codex | 4 / 1.0 | 4 / 0.5 | Concede severity (`mobile/R04`). Gain lowered: phone text and targets are already legible, and night and NPC sameness cap readability on their own. It also overlaps the phone-HUD item in G-ui-material-and-icons. |
| G-npc-facing-labels-visibility | Claude | 3 / 0.5 | 3 / 0.5 | Concede (`desktop/R11`, `desktop/R16`). This gap should own the "TRAD" label overlap. |
| G-sign-clipping-and-blank-board | Claude | 3 / 0.5 | 2 / 0.3 | Wrong cause. The boards and 3×5 font fit full names (`desktop/R06`). "IPERI"/"UAPA" come from the glow mask (`desktop/R05`) and "TRAD" from a label overlap (`desktop/R16`). What's left: widen the glow mask to the board, and fix the blank white rectangle (`desktop/R13`). |
| G-occlusion-artifacts | Claude | 2 / 0.3 | 2 / 0.3 | Concede. The see-through rule for lamp posts from the brief fails visibly in `strips/R13` frames 1–4. |
| G-2026-era-signals | Claude | 3 / 0.5 | 3 / 0.5 | Concede for the lake (`desktop/R07`). Part of the fix is a restored-Row capture. |
| G-era-lived-detail | Codex | 3 / 0.5 | 3 / 0.5 | Keep. Partly overlaps the empty-towns gap. |
| G-ambiguous-props | Claude | 2 / 0.3 | 2 / 0.3 | Concede. A zoom of `desktop/R13` confirms the lying-animal read. |
| G-seasonal-dressing | Claude | 2 / 0.2 | 2 / 0.2 | Concede (`desktop/R10`). |

```json
{
  "loop": 2,
  "role": "advocate",
  "tier": "T16",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Buildings meet the 7 descriptor: one outline, clean clusters, coherent era palette"},
        {"shot": "crops/R03-field", "note": "Concede: grass is per-pixel speckle"},
        {"shot": "crops/R04-player", "note": "Concede: flat 2-3 tone character fills next to 4-5 step building ramps; cobble confetti"},
        {"shot": "desktop/R06", "note": "Same 3x5 boards show full SUPERIOR/QUAPAW/OZARK/HALE, so the R05 'clipping' is a light-mask issue, not pixel craft"},
        {"shot": "desktop/R01", "note": "Concede: title is a downscaled painting with a serif title"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R16-npcs", "note": "Margaux has a salmon head covering separate from her hair; Josiah has a tan cap over grey hair and a beard; Ezra invisible; same dome template"},
        {"shot": "crops/R11-npcs", "note": "Hattie white band on brown crown; Augustin faceless; NPCs face away"},
        {"shot": "crops/R04-player", "note": "Nora's bonnet brim sits at the brow, not around the face; blue sleeves and white apron"},
        {"shot": "crops/R16-player", "note": "Concede: Ada's khaki hair and knee-length apron"},
        {"shot": "crops/R15-pen", "note": "Animals: clear silhouettes, outlines, contact shadows"}
      ]
    },
    "environment": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R04", "note": "Strong buildings; lantern/hitching posts and planters exist; no townsfolk or vehicles"},
        {"shot": "desktop/R17", "note": "Hay, sawhorse, truck, crate, trough, joined fence; empty lower half"},
        {"shot": "desktop/R02", "note": "Barrels, crate, log pile, campfire, rocks around the 1807 cabin"},
        {"shot": "desktop/R07", "note": "Concede: repeating water pattern, pier without posts"},
        {"shot": "desktop/R13", "note": "Concede: lying-animal prop and blank white board on the cabin"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R05", "note": "Facades very dark but window grids and gables visible when zoomed; repeated pools; seam at y~455; era five-globe lamps"},
        {"shot": "crops/R05-player", "note": "Pool edges stepped on the art grid (7-anchor criterion)"},
        {"shot": "desktop/R06", "note": "Row windows lit warm at dusk; street lamps unlit"},
        {"shot": "desktop/R08", "note": "Concede: fog is a mostly flat veil, including over the player"},
        {"shot": "desktop/R10", "note": "Snow-roof variants follow each roof"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.55,
      "evidence": [
        {"shot": "strips/R14", "note": "Five-pose tool arc; grey impact chip in frames 4-5; body static; no tilled tile, captured on grass"},
        {"shot": "strips/R13", "note": "About 4 leg poses, rigid upper body; post opaque over player in frames 1-4"},
        {"shot": "strips/R13-mobile", "note": "Same cycle at phone scale"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R12", "note": "Crisp DotGothic16/Silkscreen, 1931 navy and gold theme, clear hierarchy; slot numbers over icons"},
        {"shot": "desktop/R18", "note": "Concede: web-form buttons, placeholder Hen and Hardware icons; 1955 teal theme"},
        {"shot": "desktop/R07", "note": "2026 blue theme: one consistent colour theme per era"},
        {"shot": "mobile/R11", "note": "Concede: small portrait, big dialogue panel"},
        {"shot": "mobile/R04", "note": "Concede: HUD covers ~26% of the phone screen"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "mobile/R04", "note": "Player bracket and text legible; HUD costs a quarter of the playfield"},
        {"shot": "mobile/R05", "note": "Player lit; buildings and doors hard to read"},
        {"shot": "crops/R03-field", "note": "Cabbage stages distinct; mature bean column merges across tiles"},
        {"shot": "desktop/R16", "note": "Ezra hidden behind the tent"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 board-and-batten, false fronts, stage office"},
        {"shot": "desktop/R04", "note": "1886 Second Empire mansards and grand hotel"},
        {"shot": "desktop/R17", "note": "1931 Craftsman bungalow and 1920s pickup"},
        {"shot": "desktop/R06", "note": "1955 real Row names, drive-in, motor hotel, road markings"},
        {"shot": "desktop/R07", "note": "Concede: no modern cue at the 2026 lake"},
        {"shot": "desktop/R10", "note": "Concede: flower boxes bloom in the snow"}
      ]
    }
  },
  "gaps": [
    {"id": "G-headwear-and-garment-silhouettes", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R04-player", "crops/R05-player", "crops/R16-npcs", "crops/R16-player"], "benchmark": "stardew-1.jpg; seastars-2.jpg", "fix": "Per-kind hat sprites in 4 directions (slouch brim, pinched fedora, face-framing bonnet, toque, fur cap with tail, knotted scarf, billed cap); ankle-length skirt silhouette; per-person hat colour; 1-px mouth/brow."},
    {"id": "G-character-construction", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/R11-npcs", "crops/R16-npcs", "crops/R04-player"], "benchmark": "stardew-1.jpg; chained-5.jpg; research/refs/characters.md", "fix": "Overlaps G-headwear; extra value only: native-size faces with separated eyes and nose shadow, plus checklist occupation props."},
    {"id": "G-ground-texture-noise", "category": "pixel", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/R03-field", "crops/R04-player", "desktop/R10"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Calm two-tone base plus hand-placed 3-6 px clusters, about 10-15% detail, with decals instead of per-pixel noise."},
    {"id": "G-texture-hierarchy", "category": "pixel", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "crops/R04-row"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Overlaps G-ground-texture-noise; extra value: break up water repetition and use one outline/ramp rule for characters and buildings."},
    {"id": "G-night-facades-crushed", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Raise the facade value floor under a cool moon ramp; widen the sign glow to the full board; vary lamp-pool shapes; remove the street-edge seam."},
    {"id": "G-light-value-separation", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R08", "mobile/R05"], "benchmark": "seastars-2.jpg; chained-5.jpg", "fix": "Overlaps G-night-facades-crushed; extra value: depth-dependent fog that protects gameplay-layer contrast."},
    {"id": "G-empty-towns-and-fields", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R03", "desktop/R07"], "benchmark": "chained-5.jpg", "fix": "Ambient townsfolk and era vehicles in town, benches and barrels beside the existing posts and planters, contact shadows; break up the lower farm grass; lake reeds, boats, pier posts."},
    {"id": "G-inhabited-environments", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R17"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Overlaps G-empty-towns-and-fields; extra value: dressed entrances, worn access paths, irregular terrain transitions."},
    {"id": "G-tool-body-poses-and-feedback", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "fix": "Body poses that match the 5 tool poses; enlarge the existing impact chip into a 6-10 px soil burst with 1-2 frames of hit-stop; immediate tilled tile; 6-frame walk with arm swing and head bob."},
    {"id": "G-motion-and-contact", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R14"], "benchmark": "pixel-anchors.md section 3.5 Stardew-level motion anchor", "fix": "Overlaps G-tool-body-poses; extra value: torso counter-motion and clothing follow-through; recapture R14 on a field tile."},
    {"id": "G-weather-time-moods", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R08", "desktop/R07", "desktop/R06", "desktop/R09"], "fix": "Banded drifting fog sprites kept off the player; warm 2026 evening ramp; street lamps on at dusk (windows already lit); rain splashes and puddles."},
    {"id": "G-ui-material-and-icons", "category": "ui", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R12", "desktop/R11", "mobile/R04"], "benchmark": "stardew-5.jpg", "fix": "Nine-slice era-material frames; real Hen and Hardware icons; portrait at 2x or more with a name plate; slot numbers off the icon art; pixel title font; compact phone HUD."},
    {"id": "G-ui-art-language", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "mobile/R12"], "benchmark": "stardew-5.jpg; seastars-4.jpg", "fix": "Overlaps G-ui-material-and-icons; extra value: one unified icon language."},
    {"id": "G-mobile-world-space", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R05", "mobile/R11"], "benchmark": "stardew-1.jpg; seastars-2.jpg", "fix": "Compact status and goals into one strip and tighten dialogue spacing; overlaps the phone-HUD item in G-ui-material-and-icons."},
    {"id": "G-npc-facing-labels-visibility", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R11", "crops/R11-npcs", "desktop/R16"], "fix": "Turn NPCs toward the player on talk; de-collide labels (including the Margaux label covering the TRADE board); keep NPC spawns out of building footprints."},
    {"id": "G-sign-clipping-and-blank-board", "category": "environment", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R05", "desktop/R06", "desktop/R13"], "fix": "Boards and font already fit full names (R06). Widen the 1931 night sign-glow mask to cover the whole board; remove or texture the white rectangle on the 1871 cabin."},
    {"id": "G-occlusion-artifacts", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["strips/R13", "crops/R08-player"], "fix": "Make the lamp-post see-through rule actually trigger (it fails in R13 frames 1-4); draw the faded post behind the player's face."},
    {"id": "G-2026-era-signals", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R07"], "fix": "Modern dock, kayaks, LED lamps and park signage at the lake; add a restored-Row daytime capture."},
    {"id": "G-era-lived-detail", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R09", "desktop/R06", "desktop/R17"], "benchmark": "chained-5.jpg; research/refs/characters.md", "fix": "Referenced street furniture, occupation objects and costume silhouettes per chapter; partly overlaps G-empty-towns-and-fields."},
    {"id": "G-ambiguous-props", "category": "environment", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R13", "desktop/R15", "desktop/R08"], "fix": "Redraw or replace the lying-animal-looking prop by the cabin and the box-shaped dog by the springs."},
    {"id": "G-seasonal-dressing", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["desktop/R10"], "fix": "Bare or evergreen boxes in winter; winter clothing layers."}
  ],
  "verdict": "continue"
}
```
