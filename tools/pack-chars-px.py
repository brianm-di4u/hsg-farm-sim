#!/usr/bin/env python3
"""Pixel-art character atlases for one tile size, from the Blender layer renders (art-src/chars-*.png).

    python -I tools/pack-chars-px.py [--tile 16] [--cell 1.3]

The Blender atlases (art-src/blender/characters.py) hold one row per layer in soft toon greys, 128 x 192 per cell,
21 cells (3 directions x idle, walk 0-3, use 0-1). For the pixel style each cell becomes a native-size sprite:

1. At full resolution every pixel gets one label: which layer is on top there and which of three shades it is
   (the shade thresholds are found per layer by k-means over all its frames), or transparent.
2. The label map is reduced to the target cell by MAJORITY vote, so layers never overlap or leave gaps. Small
   features are weighted up (eyes and mouth x6, hair x1.5) so a face survives at 16 px.
3. Each (layer, shade) becomes a binary mask row: the game fills it with that person's colour ramp (hue-shifted
   shadow and highlight, see src/js/render/sprites.js) and outlines the silhouette at runtime.
   The `fixed` layer (eyes, shoes, mouth) keeps its own colours, quantized to a few.

Rows per atlas: skin, hair, shirt, legs x 3 shades (12 rows) + fixed (1 row) + the face window (skin x 3, eyes;
see face_window) for `trousers` and `dress`;
10 overlays (hats, beard, glasses) x 3 shades for `overlay`. Cell size: round(cell * T) wide, x 1.5 tall.
Writes assets/px/<T>/chars-<atlas>.png and merges assets/px/manifest.json.
"""
import argparse
import json
import os
import sys

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)
import importlib.util
_spec = importlib.util.spec_from_file_location('pixelize', os.path.join(HERE, 'pixelize.py'))
PZ = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(PZ)
SRC_W, SRC_H = 128, 192
COLS = 21  # set from the source atlas: 21 (characters.py) or 39 (characters-px.py)
BASE = ['skin', 'hair', 'shirt', 'legs', 'fixed']
OVER = ['hat-brim', 'hat-fedora', 'hat-cap', 'hat-helmet', 'hat-bonnet', 'hat-scarf', 'hat-toque', 'hat-capfur', 'beard', 'glasses',
        'apron', 'vest', 'overalls', 'ponytail']
PREFIX = 'chars'  # 'chars2' when the pixel-style renders (art-src/blender/characters-px.py) exist
WEIGHT = {'fixed': 6.0, 'hair': 1.5}


def load(name):
    return np.asarray(Image.open(os.path.join(GAME, 'art-src', f'{PREFIX}-{name}.png')).convert('RGBA')).astype(np.float32) / 255


def cell(atlas, row, col):
    return atlas[row * SRC_H:(row + 1) * SRC_H, col * SRC_W:(col + 1) * SRC_W]


def shade_thresholds(atlas, row):
    """Two thresholds splitting a layer's opaque greys (all frames) into dark / mid / light by 1-D k-means."""
    strip = atlas[row * SRC_H:(row + 1) * SRC_H]
    g = strip[..., 0][strip[..., 3] > 0.5]
    if len(g) < 3:
        return 0.33, 0.66
    c = np.percentile(g, [15, 50, 85])
    for _ in range(20):
        a = np.abs(g[:, None] - c[None]).argmin(1)
        c = np.array([g[a == k].mean() if (a == k).any() else c[k] for k in range(3)])
    c.sort()
    return (c[0] + c[1]) / 2, (c[1] + c[2]) / 2


def reduce_labels(lab, wts, nlab, cw, chh):
    """Majority vote of a label map (-1 = transparent) into cw x chh, with per-label weights."""
    h, w = lab.shape
    out = np.full((chh, cw), -1, np.int32)
    ys = np.linspace(0, h, chh + 1).round().astype(int)
    xs = np.linspace(0, w, cw + 1).round().astype(int)
    for j in range(chh):
        for i in range(cw):
            blk = lab[ys[j]:ys[j + 1], xs[i]:xs[i + 1]].ravel()
            n_t = (blk < 0).sum()
            v = blk[blk >= 0]
            if not len(v):
                continue
            score = np.bincount(v, minlength=nlab) * wts
            # transparent wins only if most of the block is empty (keeps thin limbs and hat brims)
            if n_t > len(blk) * 0.62 and score.max() < len(blk) * 0.45:
                continue
            out[j, i] = int(score.argmax())
    return out


def base_atlas(name, cw, chh):
    at = load(name)
    th = [shade_thresholds(at, r) for r in range(len(BASE))]
    # the fixed layer's colours, clustered to at most 6
    fx = at[4 * SRC_H:5 * SRC_H]
    fpx = fx[..., :3][fx[..., 3] > 0.5]
    rng = np.random.default_rng(1)
    pal = fpx[rng.choice(len(fpx), 6, replace=False)] if len(fpx) > 6 else fpx
    for _ in range(15):
        a = ((fpx[:, None] - pal[None]) ** 2).sum(-1).argmin(1)
        pal = np.array([fpx[a == k].mean(0) if (a == k).any() else pal[k] for k in range(len(pal))])
    # labels: layer*3+shade for the 4 tinted layers (0..11), 12+k for fixed colour k
    nlab = 12 + len(pal)
    wts = np.ones(nlab)
    wts[3:6] = WEIGHT['hair']
    wts[12:] = WEIGHT['fixed']
    rows = np.zeros(((len(BASE) - 1) * 3 + 1 + 4, chh, cw * COLS, 4), np.uint8)
    for c in range(COLS):
        alpha = np.stack([cell(at, r, c)[..., 3] for r in range(len(BASE))])
        top = alpha.argmax(0)
        lab = np.full(top.shape, -1, np.int32)
        for r, L in enumerate(BASE):
            m = (top == r) & (alpha[r] > 0.5)
            if not m.any():
                continue
            px = cell(at, r, c)
            if L == 'fixed':
                k = ((px[..., :3][m][:, None] - pal[None]) ** 2).sum(-1).argmin(1)
                lab[m] = 12 + k
            else:
                g = px[..., 0][m]
                lab[m] = r * 3 + (g > th[r][0]).astype(int) + (g > th[r][1]).astype(int)
        red = reduce_labels(lab, wts, nlab, cw, chh)
        red = stamp_face(red, lab, pal, cw, chh)
        win = face_window(red, pal, chh)
        for l in range(3):  # face-window skin rows (13-15)
            rows[13 + l, :, c * cw:(c + 1) * cw][win & (red == l)] = (255, 255, 255, 255)
        for l in range(12):
            m = red == l
            rows[l, :, c * cw:(c + 1) * cw][m] = (255, 255, 255, 255)
        fm = red >= 12
        if fm.any():
            col = (pal[red[fm] - 12] * 255).round().astype(np.uint8)
            blk = rows[12, :, c * cw:(c + 1) * cw]
            blk[fm, :3] = col
            blk[fm, 3] = 255
            wm = fm & win  # face-window eyes (row 16), in their own colours
            blk = rows[16, :, c * cw:(c + 1) * cw]
            blk[wm, :3] = (pal[red[wm] - 12] * 255).round().astype(np.uint8)
            blk[wm, 3] = 255
    return rows.reshape(-1, cw * COLS, 4)


def components(mask):
    """Connected components (4-neighbour) of a boolean mask: list of (pixel count, mean y, mean x)."""
    seen = np.zeros_like(mask)
    out = []
    for y0, x0 in zip(*np.where(mask)):
        if seen[y0, x0]:
            continue
        stack, pts = [(y0, x0)], []
        seen[y0, x0] = True
        while stack:
            y, x = stack.pop(); pts.append((y, x))
            for yy, xx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= yy < mask.shape[0] and 0 <= xx < mask.shape[1] and mask[yy, xx] and not seen[yy, xx]:
                    seen[yy, xx] = True; stack.append((yy, xx))
        a = np.array(pts)
        out.append((len(pts), a[:, 0].mean(), a[:, 1].mean()))
    return out


def stamp_face(red, lab, pal, cw, chh):
    """Feature-preserving face: majority voting smears eyes into grey 2x2 blots and cheek blush into pink patches.
    So the darkest fixed colour (the eyes) is cleared from the reduced cell and re-stamped as one crisp dark pixel
    column per eye, at the centroid of that eye in the full-resolution render; blush and the mouth line (the reddish
    fixed colour) are dropped, leaving skin. Shoes keep their voted pixels."""
    lum = pal.mean(1)
    eye = int(lum.argmin())
    red_c = np.array([abs(c[0] - c[1]) + abs(c[0] - c[2]) for c in pal])
    blush = [k for k in range(len(pal)) if k != eye and red_c[k] > 0.25 and pal[k][0] > pal[k][2]]
    skin_mid = 1  # skin layer, mid shade
    out = red.copy()
    head = np.arange(chh)[:, None] < chh * 0.62  # the eye colour also clusters with the shoes: clear it on the head only
    out[(out == 12 + eye) & head] = skin_mid
    for k in blush:
        out[(out == 12 + k) & head] = skin_mid
    sx, sy = cw / SRC_W, chh / SRC_H
    w = max(1, round(cw / 21)); h = 2 * w
    for n, my, mx in components(lab == 12 + eye):
        if n < 6 or my > SRC_H * 0.62:  # eyes only (ignore specks, and the shoes low in the cell)
            continue
        cx, cy = int(mx * sx), int(round(my * sy - h / 2))
        out[max(0, cy):cy + h, max(0, cx):cx + w] = 12 + eye
    return out


def face_window(red, pal, chh):
    """The face below the brow line: skin and eye pixels from 3 rows above the eyes to 4 rows below them. The game
    redraws it over any headwear, so a cap, bonnet or toque never hides the eyes (a 16-bit convention: hats sit on
    the brow, the face always reads). Empty in back views, which have no eyes."""
    eye = 12 + int(pal.mean(1).argmin())
    ys = np.where(((red == eye) & (np.arange(chh)[:, None] < chh * 0.62)).any(1))[0]
    win = np.zeros(red.shape, bool)
    if not len(ys):
        return win
    y0, y1 = max(0, ys[0] - 3), min(chh, ys[-1] + 5)
    win[y0:y1] = (red[y0:y1] <= 2) | (red[y0:y1] == eye)
    return win


def overlay_atlas(cw, chh):
    at = load('overlay')
    n_over = at.shape[0] // SRC_H
    rows = np.zeros((n_over * 3, chh, cw * COLS, 4), np.uint8)
    for r in range(n_over):
        t0, t1 = shade_thresholds(at, r)
        for c in range(COLS):
            px = cell(at, r, c)
            m = px[..., 3] > 0.5
            lab = np.full(m.shape, -1, np.int32)
            g = px[..., 0][m]
            lab[m] = (g > t0).astype(int) + (g > t1).astype(int)
            red = reduce_labels(lab, np.array([1.0, 1.0, 1.0]), 3, cw, chh)
            for s in range(3):
                rows[r * 3 + s, :, c * cw:(c + 1) * cw][red == s] = (255, 255, 255, 255)
    return rows.reshape(-1, cw * COLS, 4)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--tile', type=int, default=16)
    ap.add_argument('--cell', type=float, default=1.3, help='cell width in tiles (the painted style draws people 1.3 tiles wide)')
    a = ap.parse_args()
    global PREFIX, COLS
    PREFIX = 'chars2' if os.path.exists(os.path.join(GAME, 'art-src', 'chars2-trousers.png')) else 'chars'
    COLS = Image.open(os.path.join(GAME, 'art-src', f'{PREFIX}-trousers.png')).width // SRC_W
    T = a.tile
    cw = round(a.cell * T)
    chh = round(cw * SRC_H / SRC_W)
    out_dir = os.path.join(GAME, 'assets', 'px', str(T))
    os.makedirs(out_dir, exist_ok=True)
    pm_path = os.path.join(GAME, 'assets', 'px', 'manifest.json')
    pm = json.load(open(pm_path, encoding='utf-8')) if os.path.exists(pm_path) else {}
    mt = pm.setdefault(str(T), {})
    for name, img in (('trousers', base_atlas('trousers', cw, chh)), ('dress', base_atlas('dress', cw, chh)), ('overlay', overlay_atlas(cw, chh))):
        f = f'chars-{name}'
        PZ.save_png(img, os.path.join(out_dir, f + '.png'))
        mt[f] = {'file': f'px/{T}/{f}.png', 'w': int(img.shape[1]), 'h': int(img.shape[0]), 'cell': [cw, chh], 'perDir': COLS // 3}
        print(f, img.shape[1], img.shape[0], 'cell', cw, chh)
    json.dump(pm, open(pm_path, 'w', encoding='utf-8'), indent=1, sort_keys=True)


if __name__ == '__main__':
    sys.exit(main())
