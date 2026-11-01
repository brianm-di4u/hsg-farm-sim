# Pixel-art generation prompts (Codex image generation)

Generated images go to `art-src/px-gen/<name>.png` (git-ignored like all art-src PNGs). `tools/pack-px.py` uses a
`px-gen` source when one exists and the painted asset otherwise, then pixelizes it at the drawn size for each tile tier.

**Style reference** for every batch: `art-src/px-pilot/bathhouse-1886.png` (approved pilot, 2026-11-01).

**Style block** (prepended to every item):

> 16-bit SNES-era pixel art for a top-down farming game set in the Hot Springs valley, Arkansas. Three-quarter
> top-down view (you see the roof from above and the front facade below it, like classic 16-bit farming and RPG
> games), light from the upper left. A limited palette with hue-shifted shading: cool shadows, warm highlights. Flat
> colour clusters, with no gradients, no painterly texture and no noise. A clean dark outline around the silhouette.
> Chunky, readable shapes, drawn so that every art pixel is a clearly visible square block of the same size. Match
> the style of the reference image exactly: same pixel size, outline weight, shading and level of detail. A plain flat
> pure-white background (#FFFFFF) filling the whole image, nothing else in the frame, the subject centred and filling
> about 85% of the width. No text, no letters, no signs with writing, no logos, no frame, no ground shadow.

**Rules for buildings:**
- The front door sits at the horizontal centre of the facade.
- The facade faces the viewer. The building is seen square-on (not rotated), so its base is a straight horizontal line.
- The base sits at the bottom of the subject: no lawn, path or ground around it.

Batches: `batch-1.md` (1807, 1871, farm cabin and plank house), `batch-2.md` (1886), `batch-3.md` (1931),
`batch-4.md` (1955, 2026), `batch-5.md` (nature and lamps), `batch-6.md` (farm and street props), `batch-7.md` (crops),
`batch-8.md` (terrain textures), `batch-9.md` (panoramas), `batch-10.md` (farm and shore dressing).
