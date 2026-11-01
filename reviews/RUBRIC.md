# Pixel-art review rubric (Valley of Vapors)

Eight categories, each scored 1–10 in 0.5 steps (total out of 80). The bar is shipped pixel-art games in the genre
and its 16-bit ancestors, not "good for a browser game". Benchmarks are in `games/farm-sim/benchmarks/`
(`SOURCES.md` names each image). Only pixel-art images are anchors; 3D benchmarks (`coral-*`) are not used for scoring.
Detailed per-category anchor notes, once written, are in `games/farm-sim/research/pixel-anchors.md`.

**Evidence rule:** every score cites at least 2 captures by path. `animation` must cite a motion strip.
`characters` must cite at least one character close-up beside its reference sheet. Uncited claims are dropped.

## Gates
Every category ≥ 7, except `authenticity` ≥ 6. Hard gates (pass/fail, not scored): all tests green, the
automated pixel-integrity check passes on every capture, and the performance budget in
`research/pixel-budget.md` holds. A loop that fails a hard gate is not scored.

## Categories and anchors

| # | Category | 3 | 5 | 7 | 9 |
|---|---|---|---|---|---|
| 1 | `pixel` — pixel craft: one pixel grid everywhere, no mixels or resampling blur, deliberate clusters, controlled palettes with hue-shifted ramps, consistent outline rule, no stray noise | downscaled painting: speckle, blur, mixed pixel sizes, hundreds of colours | one grid, but noisy clusters, muddy ramps, inconsistent outlines between asset families | clean clusters and ramps, one outline rule, palettes coherent per era; only small noisy spots | every sprite looks hand-placed; palette and cluster discipline of the best benchmarks |
| 2 | `characters` — people and animals: silhouette and readability at 1×, match to the reference checklist (`research/refs/characters.md`), detail at the chosen cell size, faces and hands, distinct named people | blobs; can't tell people apart | readable figures, generic; few checklist features | each named person identifiable by silhouette, headwear and palette; checklist mostly met | benchmark-grade sprites: expressive, period-accurate, instantly distinct |
| 3 | `environment` — terrain, buildings, trees, props, crops, water: shapes, materials, set dressing density, variety, tile seams | flat fill, repeated stamps, visible seams | competent tiles and buildings, sparse dressing | rich, varied, dressed scenes with readable materials | benchmark density and charm; every screen worth a screenshot |
| 4 | `lighting` — time of day, night, light sources, shadows, weather, and whether light respects the pixel grid | flat; smooth gradients smear over pixel art | day/night present, light pools generic | era light sources, coherent shadows, weather moods; light kept on-grid (banded or dithered) | lighting as memorable as the best modern pixel games |
| 5 | `animation` — walk cycles, tool actions, idle life, effects, feedback (judge from strips) | static or sliding sprites | basic walk cycle; little secondary motion | smooth cycles, tool-specific actions, ambient life, juicy feedback | benchmark fluidity and personality |
| 6 | `ui` — HUD, panels, hotbar, menus, pixel fonts, icons; integer-scaled and crisp; consistent with the world | web UI over pixel art; blurry type | themed but clashing with the world's pixels | pixel-crisp frames and fonts per era, clear hierarchy | benchmark-grade, era-distinct UI |
| 7 | `readability` — what's interactive, crop stages, targets, contrast; desktop and 390×844 phone | can't tell objects or states apart | readable with effort; small on phone | everything legible at 1× on phone and desktop | instantly readable, even at a glance |
| 8 | `authenticity` — era distinctness and fidelity to the real valley (1807–2026) in architecture, clothing, vehicles, light sources | eras look alike or wrong | eras distinct in palette, generic in detail | each era recognisable and grounded in the references | a local historian would nod |

## Scores
Total = sum of the 8. Halves only. A category at its gate needs evidence from at least two different chapters.
