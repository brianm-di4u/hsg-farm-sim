#!/usr/bin/env python3
"""Pack the pixel-art asset set for one tile size from the painted assets.

    python -I tools/pack-px.py [--tile 16] [--only name1,name2] [--group bld-]

Source for every image is the packed painted asset (assets/<name>.webp: already keyed, trimmed, split and,
for textures, seamless), so the keying work in pack-art.mjs is reused. Each one goes through tools/pixelize.py
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
             'tree-magnolia': 1.9, 'bld-farm-*': 6, 'bld-*': 5, 'campfire': 1.0, 'lamp-lantern': 0.62, 'icon-*': 1.0}
# Texture repeat sizes in tiles (terrain.js REPEAT).
REPEAT = {'tex-grass': 5, 'tex-forest': 5, 'tex-path': 3, 'tex-road': 4, 'tex-gravel': 3, 'tex-brick': 3, 'tex-asphalt': 4,
          'tex-pavers': 2.5, 'tex-flagstone': 3, 'tex-sand': 4, 'tex-clay': 4, 'tex-tufa': 4, 'tex-creek': 3, 'tex-lake': 6,
          'tex-soil': 2, 'tex-soil-wet': 2, 'tex-snow': 4, 'tex-rock': 4}
# Per family: adaptive palette size, median smoothing, outline.
FAMILY = [('tex-', dict(colors=10, smooth=3, outline='none')),
          ('vista-', dict(colors=40, smooth=3, outline='none')),
          ('bld-', dict(colors=28, smooth=5, outline='selout')),
          ('tree-', dict(colors=18, smooth=5, outline='selout')),
          ('crop-', dict(colors=14, smooth=3, outline='selout')),
          ('icon-', dict(colors=14, smooth=3, outline='selout')),
          ('', dict(colors=18, smooth=3, outline='selout'))]
SKIP = ('chars-',)  # character atlases: the character pipeline renders these natively


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
    for name, ent in sorted(man.items()):
        if only and name not in only or a.group and not name.startswith(a.group) or name.startswith(SKIP):
            continue
        src = Image.open(os.path.join(GAME, 'assets', ent['file']))
        o = opts_for(name, over)
        if name.startswith('tex-'):
            px = max(8, round(REPEAT.get(name, 4) * T))
            rgba = np.asarray(src.convert('RGBA')).copy()
            rgba[..., 3] = 255
            ix, pal = PZ.pixelize(rgba, px, None, o['colors'], smooth=o['smooth'])
            ix = ix[:px, :px] if ix.shape[0] >= px else np.pad(ix, ((0, px - ix.shape[0]), (0, 0)), mode='wrap')
            out = PZ.to_rgba(ix, pal)
        elif name.startswith('vista-'):
            ix, pal = PZ.pixelize(np.asarray(src.convert('RGBA')).copy(), o.get('w', 480), None, o['colors'], smooth=o['smooth'])
            out = PZ.to_rgba(ix, pal)
        elif name in sheets:
            cols, rows = sheets[name]
            wt = width_tiles(name, sizes) or 1.08
            cw, chh = src.width // cols, src.height // rows
            args = A(width=max(4, round(wt * T)), **{k: v for k, v in o.items() if k in ('colors', 'smooth', 'outline')})
            pal = PZ.sheet_palette(src, args)
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
            args = A(width=max(3, round(wt * T)), **{k: v for k, v in o.items() if k in ('colors', 'smooth', 'outline')})
            out = PZ.run(src, args)
        PZ.save_png(out, os.path.join(out_dir, name + '.png'))
        mt[name] = {'file': f'px/{T}/{name}.png', 'w': int(out.shape[1]), 'h': int(out.shape[0])}
        done += 1
    json.dump(pm, open(pm_path, 'w', encoding='utf-8'), indent=1, sort_keys=True)
    write_inline(T)
    total = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
    print(json.dumps({'tile': T, 'packed': done, 'skipped (no size)': skipped, 'bytes': total}))


if __name__ == '__main__':
    sys.exit(main())
