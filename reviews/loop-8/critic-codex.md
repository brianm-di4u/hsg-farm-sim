The T32 presentation scores **49/80** and should **continue**. Buildings, crops and period changes establish a credible foundation, but the art lacks the consistency of a shipped pixel-art farming game. Flat, oversized character heads clash with densely textured scenery; repeated ground patterns and isolated prop stamps weaken composition; lighting creates mood but often suppresses material and costume detail. The phone layouts are usable and crisp, although controls occupy substantial space. Hard gates pass according to `loop-8/GATES.md`; the remaining failures are visual quality gates.

All capture paths below are relative to `games/farm-sim/screenshots/review-loop-8/`; benchmarks are relative to `games/farm-sim/benchmarks/`.

1. **Pixel craft — 6/10.** `crops/R04-row` has convincing roof courses, trim and architectural clusters, but shrubbery and ground dissolve into small, competing marks. `crops/R03-field` shows densely shaded soil islands and crops with inconsistent edge weight; `crops/R19-player` exposes much simpler, broad character clusters against busy paving. Grid integrity passes, but grid legality does not resolve this mismatch. Compared with `stardew-1.jpg` and especially `chained-5.jpg`, outlines, texture frequency and palette relationships need stronger shared direction.

2. **Characters — 5/10.** `crops/R04-player`, beside its period reference, communicates bonnet, blue bodice and apron, but the bonnet is a large pale dome and the garment lacks convincing construction. `crops/R16-player` gives Ada a readable apron and long skirt, yet her silhouette is very close to Nora’s. In `crops/R16-npcs`, Ezra lacks the stoop and long coat that should distinguish him; Josiah’s hunting-shirt shape and fur-cap identity are weak. `crops/R11-npcs` gives Hattie a white cap and long white garment, but Walt lacks clear knickers and white stockings. The animals in `crops/R15-pen` have stronger species silhouettes than the people have individual identities. Below `stardew-1.jpg`’s character peg and substantially below the varied bodies, garments and postures in `seastars-2.jpg`.

3. **Environment — 6.5/10.** `desktop/R04` and `desktop/R19` contain attractive, materially differentiated buildings, with substantial changes between Victorian and restored streets. `desktop/R17` adds a useful truck, pump and outbuilding composition. However, `desktop/R02` and `desktop/R15` spread repeated flowers and shrubs over large expanses of similarly textured grass; dressing frequently reads as scattered stamps rather than purposeful activity areas. `desktop/R07` is dominated by a conspicuously repeating water pattern and a very plain dock. Below `stardew-1.jpg`’s integrated farm layout and `chained-5.jpg`’s layered, inhabited market.

4. **Lighting — 6/10.** `desktop/R05` supplies distinct warm street pools, illuminated windows and a red club sign; the dithered treatment respects the pixel presentation. Nevertheless, much of the architecture falls into nearly uniform darkness, and the player’s illumination lacks convincing directional modelling. `desktop/R06` applies a muted dusk wash that reduces character separation. `desktop/R08` communicates fog, but broad whitening flattens surfaces; `desktop/R10` conveys winter more successfully through actual snow coverage. More atmospheric range than flat daylight in `stardew-1.jpg`, but below `chained-5.jpg`’s grounded shadows and far below `seastars-2.jpg`’s selective, form-revealing illumination.

5. **Animation — 5.5/10.** `strips/R13` and `strips/R13-mobile` show alternating feet and arms with the head and shoulders visible in profile. The torso and oversized head remain comparatively rigid, giving the gait limited weight or personality. `strips/R14` supplies a visible raised-tool anticipation, downward swing and changed soil tile. However, the body remains largely upright, the hand-to-tool relationship is weak, and frames 5–8 linger in very similar poses without a strong impact burst or convincing recovery. This exceeds the rubric’s basic swing baseline but does not establish its seven-point standard. `stardew-1.jpg` supplies the visual character comparison; its still image cannot establish animation quality, so the motion judgment rests on the supplied strips.

6. **UI — 6.5/10.** `desktop/R18` has clear prices, consistent rows and readable actions; `mobile/R12` successfully reflows inventory into six columns. `mobile/R11` retains readable dialogue and a large dismissal button, while the smaller hotbar numerals in `mobile/R04` leave icons visible. Presentation remains dominated by plain rectangular panels and repeated bevels, with era identity carried mainly by colour. The tiny sprite-derived dialogue portrait lacks the expressive presence of `stardew-5.jpg`; frames and spacing lack the refinement of `seastars-4.jpg`. Phone action buttons also retain prominent keyboard letters that compete with their action labels.

7. **Readability — 6.5/10.** `desktop/R03` and `crops/R03-field` distinguish broad crop stages through height, leaves and fruit, although mature plants crowd adjacent rows. `mobile/R02` and `mobile/R04` keep the player, selected tile and tools findable at phone scale. In `mobile/R05`, unlit doors, surrounding terrain and the passing figure lose separation; bright interface elements dominate the darker gameplay layer. `mobile/R11` is readable but consumes much of the lower viewport. Below `stardew-1.jpg`’s strong gameplay/background separation and short of reliable seven-point visibility across conditions.

8. **Authenticity — 6.5/10.** `desktop/R16`’s canvas trade camp, `desktop/R09`’s timber town, `desktop/R04`’s ornate buildings, `desktop/R17`’s truck and `desktop/R06`’s motor hotel create an intelligible historical progression. `desktop/R19` adds restored architecture, solar panels and market use. These exceed a palette-only era treatment. Clothing remains a substantial weakness: `crops/R16-npcs` lacks Ezra’s defining coat/posture, and `crops/R11-npcs` does not clearly deliver Walt’s period uniform. Repeated street geometry and oversized generic signboards further limit place-specific credibility. Below the coherent setting construction of `chained-5.jpg`; `snes-earthbound-1.png` also demonstrates how street furniture, vehicles and architecture can establish a period with fewer details.

Ranked gaps follow. Expected gains are estimates within the named category and are not guaranteed to add independently.

| Rank | Gap and evidence | Concrete fix | Workstream | Gain | Severity | Effort |
|---|---|---|---|---:|---:|---|
| 1 | Generic bodies and weak costume identities: `crops/R16-npcs`, `crops/R11-npcs`, `crops/R04-player` | Give named people distinct body/posture templates; draw Ezra’s coat and stoop, Josiah’s hunting shirt/fur cap, Walt’s knickers/stockings, and a deeper bonnet profile. Add defining props where readable. | WS2 characters | +1.5 characters | 5 | L |
| 2 | Environment texture and character rendering disagree: `crops/R03-field`, `crops/R19-player`, `crops/R04-row` | Establish shared outline weights and material ramps; simplify soil/foliage noise and add controlled garment modelling so characters belong in the scenery. | WS1 render core / pixel pipeline | +1 pixel | 4 | L |
| 3 | Dressing repeats without enough spatial purpose: `desktop/R02`, `desktop/R15`, `desktop/R07` | Group props around work areas, vary ground wear and vegetation density, break water repetition, and give dock/shore edges material detail. | WS3 environment art | +1 environment | 4 | M |
| 4 | Tool action lacks weight and resolved recovery: `strips/R14`; rigid gait in `strips/R13` | Animate two-handed grip, torso lean, contact pose, soil displacement and return to idle; add modest head/shoulder counter-motion to walking. | WS5 animation and feel | +1 animation | 4 | M |
| 5 | Darkness and washes flatten forms: `desktop/R05`, `desktop/R06`, `desktop/R08`, `mobile/R05` | Preserve cool ambient midtones, apply directional sprite highlights and grounded shadows, and reduce fog coverage over gameplay silhouettes. | WS4 lighting/weather/effects | +1 lighting | 4 | M |
| 6 | Functional panels lack authored character: `desktop/R18`, `mobile/R11`, `mobile/R12` | Create restrained era-specific frame details and expressive portraits; simplify phone action labels and tighten modal spacing. | WS6 UI/typography/mobile | +0.5 ui | 3 | M |
| 7 | Repeated street staging limits historical specificity: `desktop/R04`, `desktop/R06`, `desktop/R19` | Differentiate streetscape use by era through curb treatment, transport staging, signage scale and period-specific activity clusters. | WS7 era authenticity | +0.5 authenticity | 3 | M |

```json
{
  "loop": 8,
  "role": "critic-codex",
  "tier": "T32",
  "verdict": "continue",
  "scores": {
    "pixel": {
      "score": 6,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Architectural clusters are stronger than noisy vegetation and terrain."},
        {"shot": "crops/R03-field", "note": "Dense soil shading and crop edges lack a consistent cluster treatment."},
        {"shot": "crops/R19-player", "note": "Broad character clusters conflict with detailed surroundings."}
      ]
    },
    "characters": {
      "score": 5,
      "evidence": [
        {"shot": "crops/R04-player", "note": "Viewed beside period reference; bonnet and apron read, garment construction remains generic."},
        {"shot": "crops/R16-player", "note": "Viewed beside period reference; Ada has limited silhouette distinction from Nora."},
        {"shot": "crops/R16-npcs", "note": "Ezra lacks defining stoop and long coat; Josiah's costume identity is weak."},
        {"shot": "crops/R11-npcs", "note": "Hattie reads in white; Walt lacks clear knickers and stockings."}
      ]
    },
    "environment": {
      "score": 6.5,
      "evidence": [
        {"shot": "desktop/R04", "note": "Strong ornate architectural materials."},
        {"shot": "desktop/R19", "note": "Restored streets have meaningful architectural variation."},
        {"shot": "desktop/R02", "note": "Scattered repeated vegetation does not form purposeful activity areas."},
        {"shot": "desktop/R07", "note": "Repeated water pattern and plain dock dominate."}
      ]
    },
    "lighting": {
      "score": 6,
      "evidence": [
        {"shot": "desktop/R05", "note": "Warm dithered light pools, but architecture loses midtone detail."},
        {"shot": "desktop/R06", "note": "Dusk wash reduces character separation."},
        {"shot": "desktop/R08", "note": "Fog communicates weather while flattening materials."}
      ]
    },
    "animation": {
      "score": 5.5,
      "evidence": [
        {"shot": "strips/R13", "note": "Visible alternating limbs; rigid torso and head limit weight."},
        {"shot": "strips/R13-mobile", "note": "Profile remains readable at mobile capture scale."},
        {"shot": "strips/R14", "note": "Anticipation and soil change present; weak grip, impact and recovery."}
      ]
    },
    "ui": {
      "score": 6.5,
      "evidence": [
        {"shot": "desktop/R18", "note": "Clear shop hierarchy, generic panel construction."},
        {"shot": "mobile/R12", "note": "Inventory reflows clearly into six columns."},
        {"shot": "mobile/R11", "note": "Readable dialogue, weak portrait expression and bulky layout."}
      ]
    },
    "readability": {
      "score": 6.5,
      "evidence": [
        {"shot": "desktop/R03", "note": "Growth stages distinguishable, mature crops crowd neighbouring rows."},
        {"shot": "mobile/R04", "note": "Player, tile target and hotbar remain findable."},
        {"shot": "mobile/R05", "note": "Unlit gameplay details lose separation."}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "evidence": [
        {"shot": "desktop/R16", "note": "Canvas camp establishes frontier setting."},
        {"shot": "desktop/R09", "note": "Timber architecture distinguishes 1871."},
        {"shot": "desktop/R06", "note": "Motor hotel and roadside architecture establish mid-century change."},
        {"shot": "desktop/R19", "note": "Restoration, solar panels and market distinguish present day."},
        {"shot": "crops/R11-npcs", "note": "Period clothing checklist remains incomplete."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-character-identities",
      "category": "characters",
      "expectedGain": 1.5,
      "severity": 5,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["crops/R16-npcs", "crops/R11-npcs", "crops/R04-player"],
      "benchmark": "seastars-2.jpg",
      "fix": "Create distinct body and posture templates and render defining period garments, headwear and readable signature props."
    },
    {
      "id": "G-art-family-consistency",
      "category": "pixel",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/R03-field", "crops/R19-player", "crops/R04-row"],
      "benchmark": "chained-5.jpg",
      "fix": "Unify outline weights and material ramps, simplify noisy soil and foliage clusters, and strengthen controlled garment modelling."
    },
    {
      "id": "G-purposeful-dressing",
      "category": "environment",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["desktop/R02", "desktop/R15", "desktop/R07"],
      "benchmark": "stardew-1.jpg",
      "fix": "Group props around work areas, vary vegetation density and ground wear, break water repetition and detail dock and shore edges."
    },
    {
      "id": "G-action-weight",
      "category": "animation",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["strips/R14", "strips/R13"],
      "benchmark": "Rubric animation anchors; stardew-1.jpg for visual character context only",
      "fix": "Add convincing grip, torso lean, contact pose, soil displacement and recovery, plus walking counter-motion."
    },
    {
      "id": "G-lighting-form",
      "category": "lighting",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["desktop/R05", "desktop/R06", "desktop/R08", "mobile/R05"],
      "benchmark": "seastars-2.jpg",
      "fix": "Retain ambient midtones, add directional sprite highlights and grounded shadows, and reduce fog coverage over gameplay silhouettes."
    },
    {
      "id": "G-ui-authorship",
      "category": "ui",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS6",
      "evidence": ["desktop/R18", "mobile/R11", "mobile/R12"],
      "benchmark": "stardew-5.jpg and seastars-4.jpg",
      "fix": "Add restrained era-specific frame details and expressive portraits, simplify phone action labels and tighten modal spacing."
    },
    {
      "id": "G-era-streetscapes",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["desktop/R04", "desktop/R06", "desktop/R19"],
      "benchmark": "snes-earthbound-1.png",
      "fix": "Differentiate curb treatment, transport staging, signage scale and activity clusters by era."
    }
  ]
}
```
