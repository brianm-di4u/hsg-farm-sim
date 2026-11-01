#!/usr/bin/env python3
"""Pack the pixel-art asset set for one tile size from the painted assets.

    python -I tools/pack-px.py [--tile 16] [--only name1,name2] [--group bld-]

Source for each image: a generated pixel-art picture in art-src/px-gen/<name>.png when there is one (Codex, prompts
in art-src/px-prompts/; white background keyed here, no smoothing: it is already flat-cluster art), else the packed
painted asset (assets/<name>.webp: already keyed, trimmed, split and, for textures, seamless). Each one goes through tools/pixelize.py
at exactly the size the game draws it, in art pixels:
  - width in tiles from art-src/px-sizes.json (the drawn-size survey, tools/px-sizes.mjs), else the defaults
    below, which mirror the size tables in src/js/render/painted.js and terrain.js;
  - × the tile size (16 / 24 / 32), so one image pixel = one canvas pixel in the pixel style.
Writes assets/px/<T>/<name>.png and merges assets/px/manifest.json: { "<T>": { name: { file, w, h } } }.
Overrides per image (colours, smoothing, outline) live in art-src/px.json: { "<name or prefix*>": {...} }.
"""
import argparse
import importlib.util
import json
import os
import sys

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)
spec = importlib.util.spec_from_file_location('pixelize', os.path.join(HERE, 'pixelize.py'))
PZ = importlib.util.module_from_spec(spec)
spec.loader.exec_module(PZ)

# Widths in tiles for images the survey doesn't reach (mirrors painted.js / terrain.js).
DEFAULT_W = {'animal-cow': 1.55, 'animal-goat': 1.05, 'animal-hen': 0.62, 'tree-oak-*': 2.3, 'tree-pine': 1.75,
             'tree-magnolia': 1.9, 'deco-raisedbeds': 1.9, 'street-car26b': 2.0, 'bld-farm-*': 6, 'bld-*': 5, 'campfire': 1.0, 'lamp-lantern': 0.62, 'icon-*': 1.0}
# Texture repeat sizes in tiles (terrain.js REPEAT).
REPEAT = {'tex-grass': 5, 'tex-forest': 5, 'tex-path': 3, 'tex-road': 4, 'tex-gravel': 3, 'tex-brick': 3, 'tex-asphalt': 4,
          'tex-pavers': 2.5, 'tex-flagstone': 3, 'tex-sand': 4, 'tex-clay': 4, 'tex-tufa': 4, 'tex-creek': 3, 'tex-lake': 6,
          'tex-soil': 2, 'tex-soil-wet': 2, 'tex-snow': 4, 'tex-rock': 4}
# Per family: adaptive palette size, median smoothing, outline.
# line_weight: dark colours win more of the majority vote, so thin lines (spokes, rails, window bars) survive
# large reductions; strongest for small props, which shrink the most.
FAMILY = [('tex-', dict(colors=10, smooth=3, outline='none')),
          ('vista-', dict(colors=40, smooth=3, outline='none')),
          ('bld-', dict(colors=28, smooth=5, outline='selout', line_weight=0.8)),
          ('tree-', dict(colors=18, smooth=5, outline='selout', line_weight=0.4)),
          ('crop-', dict(colors=14, smooth=3, outline='selout', line_weight=1.0)),
          ('icon-', dict(colors=14, smooth=3, outline='selout', line_weight=1.0)),
          ('', dict(colors=18, smooth=3, outline='selout', line_weight=1.5))]
SKIP = ('chars-',)
# Pixel-only images (no painted counterpart): generated sources in art-src/px-gen/, width in tiles.
EXTRA = {'prop-springbox': 0.85, 'prop-springdisplay': 1.15, 'prop-pump': 0.6, 'prop-bench': 1.1, 'prop-pool': 2.3}  # character atlases: the character pipeline renders these natively


def match(table, name):
    if name in table:
        return table[name]
    for k, v in table.items():
        if k.endswith('*') and name.startswith(k[:-1]):
            return v
    return None


def opts_for(name, over):
    o = next(dict(v) for p, v in FAMILY if name.startswith(p))
    o.update(match(over, name) or {})
    return o


def width_tiles(name, sizes):
    if name in sizes:
        ws = sizes[name]
        return ws[len(ws) // 2]  # the median request (trees vary in size; the pixel style uses one size)
    return match(DEFAULT_W, name)


class A:  # the option bag pixelize.run() expects
    def __init__(self, **k):
        self.__dict__.update(dict(width=32, pitch=None, palette=None, colors=18, snap=None, outline='selout', key='none',
                                  key_thresh=28, cleanup=1, smooth=3, sheet=None))
        self.__dict__.update(k)


SNOW = np.array([[244, 247, 251], [216, 226, 238], [170, 186, 206]], np.uint8)


def snow_variant(rgba):
    """A building with snow on its roof: in the roof zone (the top 46% of the sprite, where the three-quarter view puts
    the roof) every pixel that isn't outline-dark or a lit window takes one of three snow shades by its lightness,
    and the first opaque pixel of each column (the ridge or eave line) is the brightest."""
    out = rgba.copy()
    h = rgba.shape[0]
    a = rgba[..., 3] > 0
    lab = PZ.rgb_to_oklab(rgba[..., :3].reshape(-1, 3).astype(np.float64)).reshape(h, -1, 3)
    L, chroma = lab[..., 0], np.hypot(lab[..., 1], lab[..., 2])
    warm = (lab[..., 1] > 0.02) & (lab[..., 2] > 0.06) & (chroma > 0.09) & (L > 0.55)  # lit windows stay
    zone = np.zeros_like(a)
    zone[: int(h * 0.46)] = True
    m = a & zone & (L > 0.22) & ~warm
    shade = np.where(L > 0.62, 0, np.where(L > 0.42, 1, 2))
    out[m, :3] = SNOW[shade[m]]
    return out


def seamless_dither(ix):
    """Make an index image tile seamlessly without blending colours: each pixel takes the original or a half-offset
    copy (whose edges are the original's continuous middle), choosing the copy more often near the edges. The
    choice follows a smooth random field, so the hand-over is ragged blobs, never a checker pattern. Every output
    pixel is still one of the palette's colours."""
    h, w = ix.shape
    off = np.roll(np.roll(ix, h // 2, 0), w // 2, 1)
    yy, xx = np.mgrid[0:h, 0:w]
    edge = np.minimum(np.minimum(xx, w - 1 - xx) / (w / 4), np.minimum(yy, h - 1 - yy) / (h / 4)).clip(0, 1)
    rng = np.random.default_rng(5)
    field = np.asarray(Image.fromarray((rng.random((6, 6)) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)) / 255
    keep = edge > field * 0.9 + 0.05
    return np.where(keep, ix, off)


def drop_strays(rgba, keep=0.3):
    """Clear opaque parts (8-connected) smaller than `keep` x the largest, then trim: an icon held in the hand
    (the hoe, drawn with a loose clod beside it) must not carry a floating piece through the swing."""
    a = rgba[..., 3] > 0
    lab = np.zeros(a.shape, np.int32)
    sizes = []
    for y0, x0 in zip(*np.where(a)):
        if lab[y0, x0]:
            continue
        sizes.append(0)
        n = len(sizes)
        st = [(y0, x0)]
        lab[y0, x0] = n
        while st:
            y, x = st.pop()
            sizes[-1] += 1
            for yy in (y - 1, y, y + 1):
                for xx in (x - 1, x, x + 1):
                    if 0 <= yy < a.shape[0] and 0 <= xx < a.shape[1] and a[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n
                        st.append((yy, xx))
    if len(sizes) < 2:
        return rgba
    big = max(sizes)
    out = rgba.copy()
    for n, sz in enumerate(sizes, 1):
        if sz < big * keep:
            out[lab == n] = 0
    ys, xs = np.where(out[..., 3] > 0)
    return out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def write_inline(T):
    """Terrain textures as data URLs (assets/px/inline.json, inlined into the HTML). Images from data URLs don't taint
    a canvas under file://, so the pixel style can read its baked terrain chunks back and clean their edges."""
    import base64
    path = os.path.join(GAME, 'assets', 'px', 'inline.json')
    d = json.load(open(path, encoding='utf-8')) if os.path.exists(path) else {}
    folder = os.path.join(GAME, 'assets', 'px', str(T))
    d[str(T)] = {f[:-4]: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(folder, f), 'rb').read()).decode('ascii')
                 for f in sorted(os.listdir(folder)) if f.startswith('tex-') and f.endswith('.png')}
    json.dump(d, open(path, 'w', encoding='utf-8'), sort_keys=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--tile', type=int, default=16)
    ap.add_argument('--only', default=None)
    ap.add_argument('--group', default=None)
    a = ap.parse_args()
    T = a.tile
    man = json.load(open(os.path.join(GAME, 'assets', 'manifest.json'), encoding='utf-8'))
    sizes = json.load(open(os.path.join(GAME, 'art-src', 'px-sizes.json'), encoding='utf-8'))
    over_path = os.path.join(GAME, 'art-src', 'px.json')
    over = json.load(open(over_path, encoding='utf-8')) if os.path.exists(over_path) else {}
    art = json.load(open(os.path.join(GAME, 'art-src', 'art.json'), encoding='utf-8'))
    sheets = {it['name']: it['sheet'] for it in art['items'] if it.get('sheet')}
    out_dir = os.path.join(GAME, 'assets', 'px', str(T))
    os.makedirs(out_dir, exist_ok=True)
    pm_path = os.path.join(GAME, 'assets', 'px', 'manifest.json')
    pm = json.load(open(pm_path, encoding='utf-8')) if os.path.exists(pm_path) else {}
    mt = pm.setdefault(str(T), {})
    only = a.only.split(',') if a.only else None
    done = skipped = 0
    items = dict(man)
    for name, wt in EXTRA.items():
        if os.path.exists(os.path.join(GAME, 'art-src', 'px-gen', name + '.png')):
            items[name] = {'file': None}
            DEFAULT_W[name] = wt
    for name, ent in sorted(items.items()):
        if only and name not in only or a.group and not name.startswith(a.group) or name.startswith(SKIP):
            continue
        gen = os.path.join(GAME, 'art-src', 'px-gen', name + '.png')
        is_gen = os.path.exists(gen)
        src = Image.open(gen if is_gen else os.path.join(GAME, 'assets', ent['file']))
        o = opts_for(name, over)
        if is_gen:  # flat-cluster pixel art already: no median flattening, a slightly larger palette, key the white
            o.update(smooth=0, colors=o['colors'] + 8, key='auto')
        if name.startswith('tex-'):
            px = max(8, round(REPEAT.get(name, 4) * T))
            rgba = np.asarray(src.convert('RGBA')).copy()
            rgba[..., 3] = 255
            if is_gen:  # ground stays calm so actors read on it: fewer colours, a light median, lightness range halved,
                o.update(colors=6, smooth=3)  # and every cluster at least 2x2 art px (packed at half size, then doubled)
            ix, pal = PZ.pixelize(rgba, px // 2 if is_gen else px, None, o['colors'], smooth=o['smooth'])
            if is_gen:  # seams are made at half size, so the hand-over keeps the 2x2 clusters too
                hp = px // 2
                ix = ix[:hp, :hp] if ix.shape[0] >= hp else np.pad(ix, ((0, hp - ix.shape[0]), (0, hp - ix.shape[1])), mode='wrap')
                ix = seamless_dither(ix)
                ix = np.kron(ix, np.ones((2, 2), ix.dtype))
                if ix.shape[0] < px:
                    ix = np.pad(ix, ((0, px - ix.shape[0]), (0, px - ix.shape[1])), mode='wrap')
            if is_gen:
                lab = PZ.rgb_to_oklab(pal.astype(np.float64)); L = lab[:, 0]; lab[:, 0] = L.mean() + (L - L.mean()) * 0.55
                lab[:, 1:] = lab[:, 1:] * 0.9
                pal = PZ.oklab_to_rgb(lab)
            ix = ix[:px, :px] if ix.shape[0] >= px else np.pad(ix, ((0, px - ix.shape[0]), (0, 0)), mode='wrap')
            out = PZ.to_rgba(ix, pal)
        elif name.startswith('vista-'):
            ix, pal = PZ.pixelize(np.asarray(src.convert('RGBA')).copy(), o.get('w', 480), None, o['colors'], smooth=o['smooth'])
            out = PZ.to_rgba(ix, pal)
        elif name in sheets:
            cols, rows = sheets[name]
            wt = width_tiles(name, sizes) or 1.08
            cw, chh = src.width // cols, src.height // rows
            args = A(width=max(4, round(wt * T)), **{k: v for k, v in o.items() if k in ('colors', 'smooth', 'outline', 'key', 'line_weight')})
            pal = PZ.sheet_palette(src, args)
            if is_gen:  # one scale for every stage: crop each cell to the union of the stages' bounding boxes
                keyed = [[PZ.key_background(np.asarray(src.crop((c * cw, r * chh, (c + 1) * cw, (r + 1) * chh)).convert('RGBA')).copy(), args.key_thresh) for c in range(cols)] for r in range(rows)]
                boxes = [np.where(k[..., 3] > 0) for row in keyed for k in row]
                y0 = min(b[0].min() for b in boxes if len(b[0])); y1 = max(b[0].max() for b in boxes if len(b[0]))
                x0 = min(b[1].min() for b in boxes if len(b[1])); x1 = max(b[1].max() for b in boxes if len(b[1]))
                args.trim = False
                cells = [[PZ.run(Image.fromarray(k[y0:y1 + 1, x0:x1 + 1], 'RGBA'), args, pal) for k in row] for row in keyed]
            else:
                cells = [[PZ.run(src.crop((c * cw, r * chh, (c + 1) * cw, (r + 1) * chh)), args, pal) for c in range(cols)] for r in range(rows)]
            ow = max(x.shape[1] for row in cells for x in row)
            oh = max(x.shape[0] for row in cells for x in row)
            out = np.zeros((oh * rows, ow * cols, 4), np.uint8)
            for r, row in enumerate(cells):
                for c, x in enumerate(row):  # bottom-centred cells
                    y0, x0 = r * oh + oh - x.shape[0], c * ow + (ow - x.shape[1]) // 2
                    out[y0:y0 + x.shape[0], x0:x0 + x.shape[1]] = x
        else:
            wt = width_tiles(name, sizes)
            if wt is None:
                skipped += 1
                continue
            args = A(width=max(3, round(wt * T)), **{k: v for k, v in o.items() if k in ('colors', 'smooth', 'outline', 'key', 'line_weight')})
            out = PZ.run(src, args)
            if name.startswith('icon-'):
                out = drop_strays(out)
        PZ.save_png(out, os.path.join(out_dir, name + '.png'))
        mt[name] = {'file': f'px/{T}/{name}.png', 'w': int(out.shape[1]), 'h': int(out.shape[0])}
        done += 1
        if name.startswith('bld-'):  # the snow-day variant: snow lying on the roof (no pixel readback at runtime)
            sv = snow_variant(out)
            PZ.save_png(sv, os.path.join(out_dir, name + '-snow.png'))
            mt[name + '-snow'] = {'file': f'px/{T}/{name}-snow.png', 'w': int(sv.shape[1]), 'h': int(sv.shape[0])}
    json.dump(pm, open(pm_path, 'w', encoding='utf-8'), indent=1, sort_keys=True)
    write_inline(T)
    total = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
    print(json.dumps({'tile': T, 'packed': done, 'skipped (no size)': skipped, 'bytes': total}))


if __name__ == '__main__':
    sys.exit(main())
