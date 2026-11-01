# Valley of Vapors — 16-bit pixel-art campaign

Goal: replace the painted look (`VISUAL-PLAN.md`, `VISUAL-REPORT.md`: 44/80) with classic 16-bit pixel art,
detailed as far as the performance budget allows. Decisions are grounded in how shipped games made them, and the
work runs as a loop of development → blind adversarial review → refinement (`reviews/PROTOCOL.md`).
Constraints: free tools and data only; the game stays playable on desktop and phones.

**Decisions (user, 2026-11-01):**
- The loops run autonomously and stop when every gate passes or after 2 loops in a row without a new best total.
- Pixel replaces painted. Painted stays behind a flag during the campaign for A/B comparison, then is removed. The "Simple" vector fallback stays.
- Credited free CC-BY-SA/GPL art (e.g. LPC) may ship.

## Root cause of the earlier rejection, and the fix
The painted pass rejected pixel art because image generators keep a style but not a pixel grid. So no shipped pixel
comes straight from a generator. Everything goes through deterministic pack-time tools onto one grid:
- `tools/pixelize.py`:
  - key the background;
  - recover the grid or set the target width;
  - quantize in OKLab, then majority-vote each art pixel;
  - binary alpha;
  - median flattening of painted texture;
  - a bounded selective outline (one shade per palette entry);
  - a shared palette per sprite sheet.
- `tools/pack-px.py`: every image at exactly the size the game draws it. Sizes come from the drawn-size survey `tools/px-sizes.mjs`. Images are written as lossless PNG to `assets/px/<T>/`.
- `tools/pack-chars-px.py`: Blender layer renders → a joint layer+shade label map → majority vote to the native cell. Eyes and mouth are weighted up so faces survive. Each (layer, shade) becomes a binary mask row, which the game fills with a hue-shifted ramp (`sprites.js` `ramp()`), plus a 1-px outline.

Readback of loaded images is impossible under file://, so all pixel processing happens at pack time. Runtime pixel work uses only canvases made in code.

## Renderer (`?style=pixel`, Settings → Graphics → Pixel)
- The world draws into a low-res canvas: `R.u = T` canvas px per tile (16 / 24 / 32 via `?tile=`). It is scaled up by a whole number `k` of device px with `image-rendering: pixelated`.
- `R.ts` stays CSS px per tile, so the tests and touch input are unchanged.
- The camera is snapped to art pixels and locked to the player's pixel while following.
- Every `drawImage` lands on whole pixels.
- The night overlay is drawn at the same resolution.
- Snow flakes are 1–2 px squares and blob shadows are hard-edged.

## Gates
- **Hard gates:** both test suites green; pixel integrity (`tools/shots-gpu.mjs`); performance budget (`research/pixel-budget.md`, provisional below).
- **Scored:** 8 categories, each gated at 7 (authenticity at 6): `reviews/RUBRIC.md`.

**Provisional performance budget** (until the Phase 2 ladder replaces it):

| Profile | Requirement |
|---|---|
| Desktop GPU | ≥ 58 fps |
| SwiftShader | ≥ 55 fps and < 8 ms script (`perf.test`) |
| Phone 390×844@3, 4× CPU throttle | ≥ 30 fps, worst frame ≤ 50 ms |
| Phone, 6× throttle | ≥ 24 fps |
| Everywhere | heap < 40 MB; pixel assets ≤ 4 MB |

## Phases
- **R:** research (`research/pixel-tradeoffs.md`, benchmarks, `research/refs/`, LPC survey). Runs in a separate session.
- **0:** review tooling, adapted from games/football v3: `reviews/`, `tools/review-*.mjs`, `shots-gpu.mjs`, `perf-gpu.mjs`.
- **1:** pixel render core. Steps:
  1. virtual canvas and snapped camera (done);
  2. pixel assets drawn at native size (done);
  3. pixel characters (done, first pass);
  4. crisp terrain masks;
  5. dithered / banded light modes;
  6. bitmap font;
  7. pixel UI.
- **2:** the complexity ladder (`tools/perf-ladder.mjs`) and the tier study (16×32 … 48×64 characters), which fix `research/pixel-budget.md`.
- **3:** asset pipelines and a vertical slice: Codex generation in a pixel-friendly style → pixelizer; a Blender rework of the characters; LPC bases as an alternate path.
- **4:** autonomous review loops.

## Pivots
(Logged here whenever the wall protocol in `reviews/PROTOCOL.md` changes the plan.)

- **2026-11-01, after loop 1 (critics 39.5 and 40.5; baseline 33): the art source changes from the painted pictures to
  images generated as pixel art.**
  - **Evidence:** both critics' top gap was the painted texture surviving the pixelizer (speckle, thousands of colours).
  - **Pilot (`art-src/px-pilot/`):** Codex produced a bathhouse, springs props, a soaking pool and a tufa tile with the prompt
    "16-bit SNES-era pixel art, three-quarter top-down, light from the upper left, limited hue-shifted palette, flat
    clusters, dark outline, white background". The results are flat-cluster pixel art with clean outlines, at a drawn
    pitch of about 5 px (about 47 art px per tile for a 5-tile building).
  - **Comparison:** pixelized, the pilot is clean at 16 px/tile and holds twice the detail at 32 px/tile; the painted
    source stays muddy at either size.
  - **New pipeline:** Codex generates pixel art → `pixelize.py` → `pack-px.py`. The generated sources keep every tier open.
  - **Prompts:** recorded in `art-src/px-prompts/`.

