# Advocate: loop 1, tier T16

## Summary

I opened every capture cited below at full size, and zoomed the disputed regions with nearest-neighbour scaling. Most of Critic A's (critic-claude) defects are real, and I concede them: speckled painted texture, glyph collapse, the tilted Augustin sprite, lamp pools drawn over roofs, a flat dusk and evening, and an unreadable hoe swing. Critic A overstates a few points, though. The cows, Augustin's portrait, Hattie's cap, the phone chapter header, the lake water and "no 1871 traffic" all have counter-evidence in the captures. Critic B (critic-codex) missed the most visible UI defect in the build. Every HUD frame misprints glyphs, and two eras misprint their own year: "1955" shows as "1988" in `desktop/R06` and `desktop/R18`, and "2026" shows as "2086" in `desktop/R07`. Critic B also scored animation below the rubric's "basic walk cycle" anchor while describing a working walk. The net effect is small. Environment and animation go up half a point, UI and authenticity settle at the critics' mean, and the other categories stand.

Critic means and my allowed ranges (±1): pixel 4.5 (3.5–5.5), characters 4.5 (3.5–5.5), environment 5.25 (4.5–6.0), lighting 5.0 (4.0–6.0), animation 4.5 (3.5–5.5), ui 5.0 (4.0–6.0), readability 5.5 (4.5–6.5), authenticity 5.75 (5.0–6.5).

---

## 1. pixel: proposed 4.5 (A 4.5, B 4.5)

- **Concede, A: speckle on facades and roofs.** `crops/R04-row` shows exactly this: the Free Baths siding and roof are mottled tan-grey with no deliberate clusters, and the porch posts melt into the wall. The `desktop/R04` hotel mansard is the same.
- **Concede, A: colour count.** I re-counted at the 320-wide art grid, excluding the top HUD strip and the hotbar: `desktop/R04` has about 1.6k distinct colours, `desktop/R03` about 2.1k, `desktop/R05` about 2.1k and `desktop/R15` about 4.6k. My figures are lower than A's (A's frames included the HUD), but they are still well inside the 3-anchor's "hundreds of colours". The pack-time OKLab quantization is clearly per asset, not per scene.
- **Concede, B: fragmented highlights.** `crops/R03-field` has isolated white and cream specks scattered through the bean and wheat columns, which read as leftover paint highlights.
- **Partial rebuttal, A: grass "fights the sprites".** In `desktop/R03` and `desktop/R02` the grass is mottled, but its amplitude is low. The player, crops, sacks and trees all separate cleanly from it. It costs pixel craft, not readability.
- **Credit both gave correctly:** one grid, binary alpha, and a consistent 1-px darkened outline on sprites with none on terrain. That is a stated rule, applied consistently (`crops/R15-pen`, `crops/R16-player`). This is what keeps the score above the 3–4 band.
- **Score:** 4.5 holds. It sits between the 3 anchor (colours) and the 5 anchor (one grid, one outline rule).

## 2. characters: proposed 4.5 (A 4.5, B 4.5)

- **Concede, A: Augustin's in-world sprite.** It is broken. In `desktop/R11` (zoomed) and `mobile/R11` he is a pale shape leaning about 30°, with no readable face or apron.
- **Plainly wrong, A:** "His dialogue portrait is just that sprite cropped… no readable toque." The portrait in `desktop/R11` (lower left, zoomed) is **upright**. It shows a tall white toque, a face with eyes, a red neckerchief and white jacket shoulders. So the in-world tilt is a pose or rotation defect on one sprite frame, not missing art. That makes it cheaper to fix than A's gap implies.
- **Plainly wrong, B:** "Augustin's conspicuous toque identifies the chef." That is true only of the portrait. The in-world sprite in `desktop/R11` and `mobile/R11` has no readable toque.
- **Partial rebuttal, A: Hattie's cap.** In the `desktop/R11` zoom, a white band sits clearly on top of her brown hair, and it is separate from the white dress. It is small, but it is there, and the brief says the cap is white. B's "headwear does not clearly resolve" is the fairer wording.
- **Concede, A: Ada.** In `crops/R16-player` her hair and skin are nearly the same value, and her eyes are grey blocks.
- **Concede, A: Caleb.** In `crops/R03-player`, `mobile/R13` (zoomed) and `strips/R13`, his hat is a dome with a band line, and the brim never breaks the head outline. I checked whether the vertical object beside him in `mobile/R13` is his hoe prop. It is a fence post behind him. He has no prop.
- **Overstated, A: the cows.** A calls them "mushy blobs whose heads and legs smear together", but `crops/R15-pen` shows three cows with separated legs and distinct heads, plus a calf with white patches. B's "recognizable outlines, muddy internal anatomy" is accurate. **Concede, A:** the hens are heart shapes with no beak, comb or tail.
- **Concede, both:** `desktop/R16` shows Margaux passing (scarf, blue shirt, long skirt) and Josiah's cap reading as an olive helmet rather than fur. Ezra is tagged above the trade tent but is not visible.
- **Fact, both:** no character close-up has the reference sheet beside it (`crops/R16-player`, `crops/R11-npcs`), even though the brief says they do. The `crops/R16-npcs` crop catches only the heads. Both critics had to score this category from `research/refs/characters.md` and the frames.
- **Score:** 4.5 holds. Margaux, Nora and Ada pass at about 4/5. Caleb fails, and Augustin's in-world sprite is broken. That puts the cast below the 5 anchor's "1–2 misses per person" on average.

## 3. environment: proposed 5.5 (A 5.0, B 5.5)

- **Concede, A:** the lake is flat (`desktop/R07`), the snow covers only the grass (`desktop/R10`, where the roofs and shrubs are bare), and the truck is fused with an animal head (`desktop/R17`, also seen by B). The same street plan repeats in `desktop/R04`, `desktop/R05`, `desktop/R06` and `desktop/R09`, and the town streets have no props.
- **Partial rebuttal, A: "no water ramp".** `desktop/R07` shows two tones: a lighter teal shallow band along the shore and a darker deep body, with "+" glints. That is a 2-step ramp, not none. It is still well short of the benchmarks, so the gap stands.
- **Rebuttal, A: "farm is mostly empty".** That holds for the lower halves of `desktop/R03` and `desktop/R17`, but A did not weigh the other farm captures.
  - `desktop/R02`: the 1807 farmstead is dressed with a log cabin, woodpile, barrels, crate, campfire, brush pile, rocks and a tree line.
  - `desktop/R15`: a pen, a creek with a plank bridge, a crate and a horse-drawn wagon.
  - `desktop/R16`: two tents, a cabin, a creek and a campfire.
  - `desktop/R17`: a hay bale, crate and trough. The bungalow has brick piers and a gabled porch.
- **Construction evidence for the 7-anchor features.** "Buildings show construction: siding, shingles, brick coursing, trim" is met in `desktop/R04` (mansards, dormers, porch trim, brick hotel), `desktop/R09` (shingle roofs, plank siding) and `desktop/R06` (the boomerang drive-in roof, the motor hotel balcony rail). "Crops show growth stages" is met by the cabbage column in `crops/R03-field`.
- **Concede, B:** the side runs of the pen fence draw as ladders laid on the ground (`desktop/R15`, left and right sides of the pen).
- **Score:** 5.5 (B's number). The scenes have construction and some dressing beyond the 5 anchor. Material speckle, flat water and texture-swap snow keep them well short of 7.

## 4. lighting: proposed 5.0 (A 4.5, B 5.5)

- **Concede, A: lamp pools drawn over roofs.** `desktop/R05` and `mobile/R05` show orange banded ellipses across the twin-tower hotel roof.
- **Concede, A: dusk, evening and rain.**
  - Dusk at 19:10 in `desktop/R06` is indistinguishable from day, and the cobra-head lamps are unlit.
  - Evening at 18:20 in `desktop/R07` has no warm shift.
  - Rain in `desktop/R09` and `desktop/R02` leaves the ground bright and dry, with sparse 1-px streaks.
  - B scored 5.5 without citing R06, R07 or R09, and those three captures pull the score down.
- **Concede, both: fog.** `crops/R08-player` shows the ghosted hotel overlay nearly erasing the player's lower body.
- **Credit A undersold:** the pools light the ground as well as the lawns. In `mobile/R05`, the green lawn bands under the lower lamps are lit, and so is the brick under the player. The windows glow, the CLUB neon is on, and the five-globe clusters date correctly (`desktop/R05`). Lights that respect the grid are a 7-anchor feature.
- **Score:** 5.0, the mean. The light is on-grid but has one colour temperature, the sprites take no light, and there is a depth bug and three flat moods.

## 5. animation: proposed 5.0 (A 5.0, B 4.0)

- **Concede, both: the hoe swing.** In `strips/R14`, frames 1–4 show only a small orange-brown smudge by Ada's head, with some body change, and frames 5–8 are idle. There is no readable shaft, arc, contact or soil response.
- **Rebuttal, B: the walk.** B writes "changing leg and arm poses… more than a sliding static figure" and then scores 4, which is below the rubric's 5 anchor of "basic walk cycle; little secondary motion". `strips/R13` shows six distinct poses with a full stride in frames 7–8, and `strips/R13-mobile` shows the same cycle. That meets the walk frame count in the 7 anchor of `research/pixel-anchors.md` ("6-frame walk"). A tool action that fails and no ambient life balance a walk at 7-anchor level to about 5, not 4.
- **Concede, A:** the domed hat hides most of the arm swing and head bob, a fence post overlaps frames 1–4 of `strips/R13`, and there is no ambient motion in either strip.
- **Score:** 5.0.

## 6. ui: proposed 5.0 (A 4.5, B 5.5)

- **Concede, A, and Critic B missed it: glyph collapse, verified on every HUD frame.**
  - `desktop/R18`: "Olose", "8uy", "×S", "Oollard", "$S0", "sells $7S".
  - `desktop/R12`: "Orafting", "$S00".
  - `desktop/R01`: "Oontinue", "Ohapter select".
  - B called `desktop/R18` an "orderly shop hierarchy" without noting any of this. B's 5.5 rests on incomplete evidence.
- **New evidence for A's existing gap: wrong years.** The date line misprints the year itself. "1955" reads "1988" in `desktop/R06` and `desktop/R18`, and "2026" reads "2086" in `desktop/R07`. The HUD is giving the player wrong information, which is worse than blur.
- **Partial rebuttal, A: the Jacquard header.** The desktop "CHAPTER 1/2 GOALS" header is unreadable in `desktop/R03`, `desktop/R09` and `desktop/R16`, as A says. On the phone, though, `mobile/R13` renders "CHAPTER 2 GOALS · 0/5" large enough to read with effort, so "Cyrillic noise" is overstated. The 1931 Silkscreen header is clean on both desktop and phone (`desktop/R05`, `mobile/R05`).
- **Credit A undersold:** per-era frame materials are visible across eras. They run from green hide (`desktop/R02`) to cream and gilt (`desktop/R04`), navy and brass (`desktop/R05`, `desktop/R12`) and teal (`desktop/R18`). That is a 9-anchor ingredient ("per-era UI material"). The hotbar icons are crisp and consistent, and the phone layout reflows (`mobile/R12`).
- **Concede, both:** the title logo is a smooth serif (`desktop/R01`), and the dialogue portrait is small (`mobile/R11`).
- **Score:** 5.0, the mean. The 5 anchor ("pixel font at non-integer sizes") fits exactly. The glyph errors pull down and the era frames pull up.

## 7. readability: proposed 5.5 (A 5.5, B 5.5)

- **Concede, A:**
  - `crops/R08-player` shows the occlusion fade nearly hiding the player.
  - Numbers misread as described under UI (`desktop/R11`: "(0/1S)").
  - The burlap-looking bushes beside the field in `desktop/R03` read as pickups.
- **Split verdict, B vs A, on crop stages.** In `crops/R03-field`, the cabbage column shows five clean stages from mound to full head, which supports A. The corn, wheat and bean columns merge into continuous ribbons, which supports B's "plant overlap obscures cell boundaries".
- **Concede, B:** at night the target brackets go dim grey (`mobile/R05`).
- **In favour:** the player is findable in every phone frame (`mobile/R02`, `mobile/R04`, `mobile/R13`), and the touch buttons are large.
- **Score:** 5.5 holds.

## 8. authenticity: proposed 6.0 (A 6.0, B 5.5)

- **Evidence across five chapters, which meets the gate's two-chapter rule:**
  - 1807, `desktop/R16`: canvas trade tents and a cabin.
  - 1871, `desktop/R09`: a wooden frame town with a STAGE office.
  - 1871, `desktop/R15`: a horse-drawn wagon at bottom right.
  - 1886, `desktop/R04`: Second Empire and Victorian buildings with oil lantern posts.
  - 1931, `desktop/R05`, `mobile/R05`: Spanish revival and Deco fronts, five-globe lamps, CLUB neon and a radio tower.
  - 1931, `desktop/R17`: a Craftsman bungalow.
  - 1955, `desktop/R06`: cobra-head lamps, a striped road, a drive-in and a motor hotel.
- **Fact A missed:** A's gap asks to "add era traffic: wagons in 1871", but a wagon already sits in `desktop/R15`. The remaining work is narrower: carriages and autos on the town streets.
- **Concede, both:**
  - Generic "BATHS" plates appear in every era (`desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R09`).
  - 2026 is identifiable only by the HUD (`desktop/R07`), so a blind viewer could sort five eras, not six.
  - The truck and animal overlap in `desktop/R17` hurts the 1931 farmyard.
- **Score:** 6.0, at the gate, within ±1 of the 5.75 mean. Five eras are grounded in specific, dated detail, which is more than the 5 anchor's "one or two landmark buildings carry the change".

---

## Plainly wrong or unsupported facts

**Critic A (critic-claude)**
1. "Augustin's portrait is just that sprite cropped… no readable toque." The portrait in `desktop/R11` is upright and shows a toque, eyes and a neckerchief.
2. "Hattie's white cap is not distinguishable." A white band over brown hair is visible in the `desktop/R11` zoom.
3. "Cows are mushy blobs whose heads and legs smear together." `crops/R15-pen` shows separated legs and heads.
4. "1871 header looks like Cyrillic noise on the phone." `mobile/R13` is legible with effort.
5. "Water has no ramp." `desktop/R07` has a shallow and deep two-tone.
6. "Add wagons in 1871" is framed as if 1871 has no traffic. A wagon is present in `desktop/R15`.

**Critic B (critic-codex)**
1. "Augustin's conspicuous toque identifies the chef." The in-world sprite in `desktop/R11` and `mobile/R11` is a tilted smear with no readable toque.
2. `desktop/R18` "orderly shop hierarchy" leaves out that the same capture shows "Olose", "8uy", "×S" and the year "1988". Critic B never mentions glyph collapse.
3. Animation is scored 4 while B describes a working walk with leg and arm changes, which the rubric places at 5 or above (`strips/R13`).
4. "`crops/R16-player` supports Ada's long lower garment." The crop shows the apron down to the target brackets, and no separate petticoat or skirt length can be judged.

---

## Gap adjustments (no new gaps)

| Gap | Critic | Adjustment | Reason |
|---|---|---|---|
| G-painted-speckle | A | keep sev 5, +1.5 | Confirmed by `crops/R04-row` and the colour count |
| G-painted-clusters | B | +2 to +1.5 | Same defect as G-painted-speckle. The cause is the pack-time conversion (WS1) as much as the art (WS3) |
| G-font-glyph-collapse | A | keep sev 5, +1.5 | Wrong years in `desktop/R06`, `desktop/R07` and `desktop/R18` raise the stakes. Best gain per effort on the list |
| G-faces-and-hats | A | keep sev 5, +1.5 | The upright portrait shows Augustin's tilt is a frame or pose defect, which is cheap to fix |
| G-cast-silhouettes | B | keep sev 5, +1.5 | Duplicate of G-faces-and-hats. B's in-world toque claim was wrong |
| G-tool-swing-read | A | sev 4 to 5, +1.0 to +1.5 | The single biggest animation miss (`strips/R14`) |
| G-hoe-contact | B | +2 to +1.5 | Same defect. Ambient life and crop reaction are also needed for a 7 |
| G-light-depth-and-mood | A | keep sev 4, +1.5 | Confirmed by `desktop/R05`, `desktop/R06` and `desktop/R09` |
| G-atmospheric-contrast | B | +1.5 to +1.0 | Overlaps G-light-depth-and-mood and G-occlusion-fade-scope |
| G-occlusion-fade-scope | A | sev 3 to 4, keep +0.5 | `crops/R08-player` shows the player nearly erased. Effort S |
| G-empty-farm-and-lake | A | sev 4 to 3, +1.0 to +0.5 | `desktop/R02`, `desktop/R15` and `desktop/R16` are already dressed. The real shortfall is the R03 and R17 lower halves and the lake |
| G-scene-dressing | B | +1 to +0.5 | Duplicate of G-empty-farm-and-lake |
| G-animals-vehicles | A | keep sev 3, +0.5 | The cows are readable. The hens, ox pose and truck fusion are the real targets |
| G-field-enclosure | B | sev 4 to 3, +1 to +0.5 | The cabbage stages read. Only the merged columns and the side fence runs fail |
| G-interface-construction | B | sev 4 to 3, +1.5 to +0.5 | The era frames already carry materials. B blames frames for what is mainly the font raster defect, which is counted under G-font-glyph-collapse |
| G-era-signage-and-layout | A | keep sev 3, +0.5 | The 1871 wagon exists (`desktop/R15`). The work narrows to signage, street traffic and 2026 |
| G-era-props | B | sev 4 to 3, +1 to +0.5 | Overlaps G-era-signage-and-layout. The truck overlap is counted under G-animals-vehicles |
| G-crop-framing | A | sev 2 to 3, keep 0 | Without reference sheets beside the close-ups, the characters evidence rule cannot be met literally |

Proposed total: 4.5 + 4.5 + 5.5 + 5.0 + 5.0 + 5.0 + 5.5 + 6.0 = **41.0/80** (A 39.5, B 40.5). No category is at its gate except authenticity.

```json
{
  "loop": 1,
  "role": "advocate",
  "tier": "T16",
  "verdict": "continue",
  "scores": {
    "pixel": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Concede: facade and roof speckle with no deliberate clusters; about 1.6k colours at the art grid in desktop/R04"},
        {"shot": "crops/R03-field", "note": "Concede B: stray painted highlight specks in the bean and wheat columns"},
        {"shot": "crops/R15-pen", "note": "Credit: one grid, binary alpha, consistent 1-px darkened sprite outline"},
        {"shot": "desktop/R03", "note": "Grass mottle is low-amplitude; it does not hide the sprites"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R11", "note": "In-world Augustin is tilted and broken; the portrait is upright with a toque, so A's 'no toque' and B's 'conspicuous toque' are each half wrong"},
        {"shot": "crops/R11-npcs", "note": "Walt's cap colour sits across the eyes; Hattie's white cap band is visible but small"},
        {"shot": "crops/R16-player", "note": "Ada: hair and skin share a value, grey block eyes; no reference sheet beside the close-up"},
        {"shot": "crops/R15-pen", "note": "Cows have separate legs and heads (A overstated); the hens read as hearts (concede)"},
        {"shot": "mobile/R13", "note": "Caleb's dome hat, no brim break, no prop (the vertical object is a fence post)"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R02", "note": "1807 farmstead dressed: cabin, woodpile, barrels, crate, campfire, rocks; rebuts 'farm mostly empty'"},
        {"shot": "desktop/R04", "note": "Buildings show construction (mansards, dormers, trim, brick) but the street has no props"},
        {"shot": "desktop/R15", "note": "Pen, creek, plank bridge, wagon; side fence runs read as ladders (concede B)"},
        {"shot": "desktop/R07", "note": "Lake is flat, with only a two-tone shallow and deep band; concede the shortfall"},
        {"shot": "desktop/R10", "note": "Snow on the grass only; roofs bare"},
        {"shot": "desktop/R17", "note": "Good bungalow; truck fused with an animal head"}
      ]
    },
    "lighting": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R05", "note": "Banded on-grid pools, lit windows, neon; pools draw over the hotel roof (concede)"},
        {"shot": "mobile/R05", "note": "Pools also light the ground and lawns, a 7-anchor trait; same roof depth bug"},
        {"shot": "desktop/R06", "note": "Dusk indistinguishable from day; lamps off at 19:10 (B did not cite this)"},
        {"shot": "desktop/R09", "note": "Rain leaves the ground bright and dry"},
        {"shot": "crops/R08-player", "note": "Fog plus occlusion fade nearly erase the player"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/R13", "note": "Six distinct walk poses with full stride in frames 7-8: at or above the 5 anchor, against B's 4"},
        {"shot": "strips/R13-mobile", "note": "Same cycle on the phone; hat hides arm swing and bob"},
        {"shot": "strips/R14", "note": "Hoe swing unreadable: smudge by the head in frames 1-4, idle in 5-8, no contact (concede)"}
      ]
    },
    "ui": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R18", "note": "Glyph collapse (Olose, 8uy, xS, Oollard) and year 1955 shown as 1988; B missed all of it"},
        {"shot": "desktop/R07", "note": "Year 2026 shown as 2086"},
        {"shot": "desktop/R12", "note": "Orafting, $S00; navy and brass era frame is clean"},
        {"shot": "desktop/R02", "note": "Green hide frame; era materials vary across R02, R04, R05 and R18"},
        {"shot": "mobile/R05", "note": "1931 Silkscreen header clean on the phone; the Jacquard header in mobile/R13 is legible with effort"},
        {"shot": "desktop/R01", "note": "Smooth serif logo; Oontinue, Ohapter select"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R04", "note": "Player findable; large touch buttons"},
        {"shot": "crops/R03-field", "note": "Cabbage stages clean; corn, wheat and bean columns merge (split A/B)"},
        {"shot": "crops/R08-player", "note": "Occlusion fade hides the player"},
        {"shot": "mobile/R05", "note": "Night playable; target brackets dim"},
        {"shot": "desktop/R11", "note": "Quest counts misread, e.g. (0/1S); name tags crowd"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R16", "note": "1807 trade tents and cabin"},
        {"shot": "desktop/R15", "note": "1871 horse-drawn wagon present; A's gap overlooked it"},
        {"shot": "desktop/R04", "note": "1886 Second Empire buildings and oil lantern posts"},
        {"shot": "desktop/R05", "note": "1931 five-globe lamps, Spanish revival fronts, neon, radio tower"},
        {"shot": "desktop/R06", "note": "1955 cobra-head lamps, drive-in, motor hotel"},
        {"shot": "desktop/R07", "note": "2026 not grounded; generic BATHS plates in every era (concede)"}
      ]
    }
  },
  "gaps": [
    {"id": "G-painted-speckle", "category": "pixel", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/R04-row", "desktop/R13", "desktop/R02"], "benchmark": "chained-5.jpg", "fix": "Snap all assets and terrain to one master palette per era (about 32-48 colours); merge clusters under 3 px after the median filter; cap each material at a 3-4 step hue-shifted ramp; replace the baked noisy grass and road with hand-made 16 px tiles in 3-4 shades."},
    {"id": "G-painted-clusters", "category": "pixel", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/R04-row", "crops/R03-field"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Duplicate of G-painted-speckle (gain lowered from 2 to avoid double counting). Redraw final-resolution material clusters with shared ramps and remove incidental painted highlight fragments."},
    {"id": "G-font-glyph-collapse", "category": "ui", "expectedGain": 1.5, "severity": 5, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R02", "mobile/R13", "desktop/R06", "desktop/R07"], "benchmark": "stardew-5.jpg", "fix": "Draw every UI font at an integer multiple of its design pixel, aligned to the 4x art grid, with smoothing off; use Jacquard 12 only at 24 px or larger, or swap it; check C, B, 3, 5 and the year line (1955 currently reads 1988, 2026 reads 2086); redraw the title logo as pixel art."},
    {"id": "G-faces-and-hats", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/R02-player", "crops/R03-player", "desktop/R11"], "benchmark": "stardew-1.jpg", "fix": "Hand-place 1-px eyes and keep hair at least 2 ramp steps from skin; give each hat kind its own silhouette; fix Augustin's tilted in-world frame (his portrait is upright, so it is a frame or pose defect) and add real portraits."},
    {"id": "G-cast-silhouettes", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R11-npcs", "desktop/R11", "desktop/R16"], "benchmark": "stardew-1.jpg; seastars-2.jpg; research/refs/characters.md", "fix": "Overlaps G-faces-and-hats. Differentiate body and garment silhouettes, correct visible checklist misses (Walt's stockings, Hattie's cap, Josiah's fur cap), and provide full-body reference comparison captures."},
    {"id": "G-light-depth-and-mood", "category": "lighting", "expectedGain": 1.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "desktop/R06", "desktop/R09", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "Draw lamp pools on the ground layer, masked by building footprints; give dusk and evening a warm sky ramp with lamps on by 19:00; darken the ground in rain and add pixel splashes; add snow caps on roofs and shrubs; draw fog as banded drifting layers."},
    {"id": "G-atmospheric-contrast", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/R08-player", "mobile/R05"], "benchmark": "seastars-2.jpg; chained-5.jpg", "fix": "Overlaps G-light-depth-and-mood and G-occlusion-fade-scope (gain lowered from 1.5). Preserve actor and target contrast through atmosphere and make light pools respect occluders."},
    {"id": "G-tool-swing-read", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "desktop/R14"], "fix": "Draw the hoe 10-12 px long with an overhead-to-ground arc in front of the body; add 1-2 frames of hit-stop and a soil clod and dust puff on strike; capture on tilled soil; add ambient motion (smoke, creek, birds)."},
    {"id": "G-hoe-contact", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "snes-harvestmoon-1.png for implement readability only", "fix": "Duplicate of G-tool-swing-read (gain lowered from 2). Make the hoe shaft and head readable through anticipation, strike and recovery, with visible soil response."},
    {"id": "G-empty-farm-and-lake", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R14"], "benchmark": "stardew-1.jpg", "fix": "Severity and gain lowered: desktop/R02, R15 and R16 are already dressed. Target the empty lower halves of R03 and R17 and the lake: banded water ramp, shore foam, reeds, boat; add a 2026 restored-Row capture."},
    {"id": "G-scene-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R17", "desktop/R07"], "benchmark": "stardew-1.jpg", "fix": "Duplicate of G-empty-farm-and-lake (gain lowered from 1). Compose farm routes and shorelines around purposeful activity areas while preserving actor clearance."},
    {"id": "G-animals-vehicles", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/R15-pen", "desktop/R17", "desktop/R13"], "fix": "Cows already read (crops/R15-pen); focus on hens (beak, comb, tail), a standing ox with an attached shadow, and the 1931 truck no longer fused with the animal sprite."},
    {"id": "G-occlusion-fade-scope", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["desktop/R08", "crops/R08-player"], "fix": "Severity raised: crops/R08-player shows the player nearly erased. Fade only a circle of about 24 px around the player, and only while the player is inside the roof footprint."},
    {"id": "G-field-enclosure", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/R03-field", "desktop/R15"], "benchmark": "stardew-1.jpg; snes-harvestmoon-1.png", "fix": "Severity and gain lowered: cabbage stages already read. Separate the merged corn, wheat and bean columns into cells, and redraw the side fence runs with upright posts."},
    {"id": "G-interface-construction", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R11", "desktop/R18"], "benchmark": "stardew-5.jpg; seastars-4.jpg", "fix": "Severity and gain lowered: era frame materials already exist (R02, R04, R05, R18), and the font raster defect is counted under G-font-glyph-collapse. Unify icon treatment and border weights; design an expressive dialogue portrait."},
    {"id": "G-era-signage-and-layout", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R05", "desktop/R04", "desktop/R07"], "fix": "An 1871 wagon already exists (desktop/R15). Replace the generic BATHS plates with period names, add carriages and autos on the town streets, vary the street dressing per era, and ground 2026."},
    {"id": "G-era-props", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R17", "desktop/R04", "desktop/R07"], "benchmark": "snes-earthbound-1.png; chained-5.jpg", "fix": "Overlaps G-era-signage-and-layout; the truck overlap is counted under G-animals-vehicles. Individualize bathhouse signs and establish contemporary lake identity through coordinated props."},
    {"id": "G-crop-framing", "category": "characters", "expectedGain": 0, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/R11-npcs", "crops/R16-npcs", "crops/R16-player"], "fix": "Severity raised: without the reference sheet beside the close-ups, the characters evidence rule cannot be met literally. Re-aim the NPC crops on the bodies and paste each reference sheet beside its close-up."}
  ]
}
```
