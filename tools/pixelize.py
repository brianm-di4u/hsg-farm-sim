#!/usr/bin/env python3
"""Pixelize: turn a high-resolution image (generated, painted or rendered) into true pixel art on one grid.

    python -I tools/pixelize.py IN.png OUT.png --width 80 [--palette pal.json | --colors 24]
                                [--outline selout|dark|none] [--key auto|none] [--pitch auto|N]
                                [--snap pal.json] [--cleanup 1] [--smooth 5] [--sheet COLSxROWS]

Image generators keep a style but not a pixel grid, so nothing they make is shipped as-is. Every sprite goes
through these steps at pack time (under file:// the game can't read pixels back, so it never happens at runtime):

1. Background: a flat white or near-white backdrop is removed by flood fill from the borders (enclosed whites,
   e.g. window frames, survive). Images that already have alpha keep it.
2. Grid: the target size is --width art pixels wide (height keeps the aspect), or the pseudo-pixel pitch the
   generator drew is detected (--pitch auto) and the image is resampled to it.
3. Colour: the image is first quantized at an intermediate resolution (to --palette colours, or to --colors
   found by k-means in OKLab), then each art pixel takes the MAJORITY colour of its block. Majority voting
   keeps crisp, deliberate clusters; averaging (what a normal resize does) makes the mud and mixels that
   read as "downscaled painting" instead of pixel art.
4. Alpha is binary (coverage > 50%), so edges have no semi-transparent fringe.
5. Cleanup: lone pixels whose four neighbours agree on another colour are absorbed (noise, not detail).
6. Outline: `selout` draws a 1-px outline outside the silhouette in a darkened shade of the colour it borders
   (the "selective outline" of 16-bit sprites); `dark` uses one dark colour; `none` leaves it.
7. --snap re-maps the final colours to a master palette (e.g. the era palette) in OKLab.

Prints a JSON line with the output size and colour count.
"""
import argparse
import json
import sys

import numpy as np
from PIL import Image, ImageFilter


# ---------- colour ----------
def srgb_to_linear(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def linear_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(c, 1 / 2.4) - 0.055) * 255.0


def rgb_to_oklab(rgb):
    lin = srgb_to_linear(rgb.astype(np.float64))
    m1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929],
                   [0.2119034982, 0.6806995451, 0.1073969566],
                   [0.0883024619, 0.2817188376, 0.6299787005]])
    lms = np.cbrt(lin @ m1.T)
    m2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468],
                   [1.9779984951, -2.4285922050, 0.4505937099],
                   [0.0259040371, 0.7827717662, -0.8086757660]])
    return lms @ m2.T


def oklab_to_rgb(lab):
    m2i = np.array([[1.0, 0.3963377774, 0.2158037573],
                    [1.0, -0.1055613458, -0.0638541728],
                    [1.0, -0.0894841775, -1.2914855480]])
    lms = (lab @ m2i.T) ** 3
    m1i = np.array([[4.0767416621, -3.3077115913, 0.2309699292],
                    [-1.2684380046, 2.6097574011, -0.3413193965],
                    [-0.0041960863, -0.7034186147, 1.7076147010]])
    return np.round(linear_to_srgb(lms @ m1i.T)).astype(np.uint8)


def hex_to_rgb(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def load_palette(path):
    with open(path, encoding='utf-8') as f:
        d = json.load(f)
    cols = d['colors'] if isinstance(d, dict) else d
    return np.array([hex_to_rgb(c) for c in cols], dtype=np.uint8)


def nearest(lab, pal_lab):
    """Index of the nearest palette entry for each OKLab colour (chunked to bound memory)."""
    out = np.empty(len(lab), dtype=np.int32)
    for i in range(0, len(lab), 65536):
        d = ((lab[i:i + 65536, None, :] - pal_lab[None, :, :]) ** 2).sum(-1)
        out[i:i + 65536] = d.argmin(1)
    return out


def kmeans_palette(lab, k, iters=12, seed=1):
    """k-means++ in OKLab on a sample of the opaque pixels; returns k OKLab centres."""
    rng = np.random.default_rng(seed)
    if len(lab) > 40000:
        lab = lab[rng.choice(len(lab), 40000, replace=False)]
    k = min(k, len(np.unique(np.round(lab, 3), axis=0)))
    c = [lab[rng.integers(len(lab))]]
    for _ in range(1, k):
        d = np.min(((lab[:, None, :] - np.array(c)[None]) ** 2).sum(-1), axis=1)
        c.append(lab[rng.choice(len(lab), p=d / d.sum())] if d.sum() > 0 else lab[rng.integers(len(lab))])
    c = np.array(c)
    for _ in range(iters):
        a = nearest(lab, c)
        for j in range(k):
            m = a == j
            if m.any():
                c[j] = lab[m].mean(0)
    return c


# ---------- background, grid ----------
def key_background(rgba, thresh=28):
    """Flood-fill near-white from the borders to transparent (enclosed whites survive)."""
    h, w = rgba.shape[:2]
    rgb = rgba[..., :3].astype(np.int32)
    near = (255 - rgb).max(-1) <= thresh
    bg = np.zeros((h, w), bool)
    stack = [(y, x) for x in range(w) for y in (0, h - 1)] + [(y, x) for y in range(h) for x in (0, w - 1)]
    while stack:
        y, x = stack.pop()
        if y < 0 or x < 0 or y >= h or x >= w or bg[y, x] or not near[y, x]:
            continue
        bg[y, x] = True
        stack.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))
    out = rgba.copy()
    out[bg, 3] = 0
    return out


def detect_pitch(rgba):
    """Pseudo-pixel pitch of an image drawn 'as pixel art' at high resolution: the period of colour edges."""
    g = rgba[..., :3].astype(np.float64).mean(-1)
    best = []
    for axis in (0, 1):
        e = np.abs(np.diff(g, axis=axis)).sum(axis=1 - axis)
        e = e - e.mean()
        ac = np.correlate(e, e, 'full')[len(e) - 1:]
        ac[:2] = -np.inf
        lim = min(64, len(ac) - 1)
        best.append(int(np.argmax(ac[2:lim])) + 2)
    return float(np.mean(best))


def trim(rgba):
    a = rgba[..., 3] > 0
    if not a.any():
        return rgba
    ys, xs = np.where(a)
    return rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


# ---------- the pipeline ----------
def pixelize(rgba, width, pal_rgb=None, colors=24, f=4, smooth=0):
    """Majority-vote downsample of a pre-quantized image. Returns (index image HxW with -1 = transparent, palette rgb).
    smooth > 0 runs an edge-preserving median of that size over the intermediate image first, so painted brush
    texture becomes flat clusters instead of speckle."""
    h0, w0 = rgba.shape[:2]
    height = max(1, round(width * h0 / w0))
    im = Image.fromarray(rgba, 'RGBA').resize((width * f, height * f), Image.Resampling.BOX)
    if smooth:
        a = im.getchannel('A')
        im = im.convert('RGB').filter(ImageFilter.MedianFilter(smooth)).convert('RGBA')
        im.putalpha(a)
    big = np.asarray(im)
    alpha = big[..., 3].reshape(height, f, width, f).astype(np.float64).mean((1, 3)) > 127
    rgb = big[..., :3].reshape(-1, 3)
    opaque = big[..., 3].reshape(-1) > 127
    lab = rgb_to_oklab(rgb)
    if pal_rgb is None:
        pal_lab = kmeans_palette(lab[opaque] if opaque.any() else lab, colors)
        pal_rgb = oklab_to_rgb(pal_lab)
    pal_lab = rgb_to_oklab(pal_rgb.astype(np.float64))
    idx = nearest(lab, pal_lab)
    idx[~opaque] = len(pal_rgb)  # a vote for "transparent" that never wins an opaque pixel
    blocks = idx.reshape(height, f, width, f).transpose(0, 2, 1, 3).reshape(height, width, f * f)
    n = len(pal_rgb) + 1
    flat = blocks.reshape(-1, f * f)
    cnt = np.zeros((flat.shape[0], n), np.int32)
    rows = np.repeat(np.arange(flat.shape[0]), f * f)
    np.add.at(cnt, (rows, flat.reshape(-1)), 1)
    cnt[:, -1] = -1
    out = cnt.argmax(1).reshape(height, width)
    out[~alpha] = -1
    return out, pal_rgb


def cleanup(ix):
    """Absorb lone pixels whose four neighbours all share one other colour."""
    h, w = ix.shape
    out = ix.copy()
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            v = ix[y, x]
            nb = (ix[y - 1, x], ix[y + 1, x], ix[y, x - 1], ix[y, x + 1])
            if nb[0] != v and nb.count(nb[0]) == 4 and nb[0] >= 0 and v >= 0:
                out[y, x] = nb[0]
    return out


def to_rgba(ix, pal):
    h, w = ix.shape
    out = np.zeros((h, w, 4), np.uint8)
    m = ix >= 0
    out[m, :3] = pal[ix[m]]
    out[m, 3] = 255
    return out


def outline(ix, pal, mode, dark='#1c1410'):
    """Grow the silhouette by one pixel. selout: each outline pixel is the darkened shade of the palette colour it
    borders most (one shade per palette entry, so the colour count stays bounded); dark: one colour for all.
    Returns (index image, palette) with the shades appended to the palette."""
    if mode == 'none':
        return ix, pal
    h, w = ix.shape
    pad = np.full((h + 2, w + 2), -1, np.int32)
    pad[1:-1, 1:-1] = ix
    n = len(pal)
    if mode == 'dark':
        shades = np.array([hex_to_rgb(dark)], np.uint8)
    else:
        lab = rgb_to_oklab(pal.astype(np.float64))
        lab[:, 0] *= 0.42  # much darker
        lab[:, 1:] *= 0.85  # and a little less saturated, so it reads as shadow, not a new hue
        shades = oklab_to_rgb(lab)
    votes = np.zeros((h + 2, w + 2, n), np.int32)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        sh = np.roll(np.roll(pad, dy, 0), dx, 1)
        m = (sh >= 0) & (pad < 0)
        ys, xs = np.where(m)
        np.add.at(votes, (ys, xs, sh[m]), 1)
    ring = votes.sum(-1) > 0
    out = pad.copy()
    out[ring] = n + (0 if mode == 'dark' else votes[ring].argmax(-1))
    return out, np.concatenate([pal, shades]).astype(np.uint8)


def save_png(rgba, path):
    """Write as an indexed (palette) PNG when the image has at most 255 colours plus transparency (pixel art always
    does), which is several times smaller than RGBA; otherwise as RGBA."""
    m = rgba[..., 3] > 0
    cols, inv = np.unique(rgba[m][:, :3], axis=0, return_inverse=True)
    if len(cols) > 255 or (m.any() and not np.isin(rgba[..., 3], (0, 255)).all()):
        Image.fromarray(rgba, 'RGBA').save(path, optimize=True)
        return
    ix = np.zeros(rgba.shape[:2], np.uint8)
    ix[m] = inv.reshape(-1) + 1
    im = Image.fromarray(ix, 'P')
    pal = [0, 0, 0] + cols.astype(np.uint8).reshape(-1).tolist()
    im.putpalette(pal + [0] * (768 - len(pal)))
    im.save(path, optimize=True, transparency=0)


def snap(rgba, pal_rgb):
    m = rgba[..., 3] > 0
    if not m.any():
        return rgba
    lab = rgb_to_oklab(rgba[m][:, :3])
    out = rgba.copy()
    out[m, :3] = pal_rgb[nearest(lab, rgb_to_oklab(pal_rgb.astype(np.float64)))]
    return out


def sheet_palette(img, a):
    """One adaptive palette for a whole sprite sheet, so every frame shares its colours."""
    rgba = np.asarray(img.convert('RGBA')).copy()
    if a.key == 'auto' and (rgba[..., 3] == 255).all():
        rgba = key_background(rgba, a.key_thresh)
    small = np.asarray(Image.fromarray(rgba, 'RGBA').resize((max(1, rgba.shape[1] // 4), max(1, rgba.shape[0] // 4)), Image.Resampling.BOX))
    px = small.reshape(-1, 4)
    px = px[px[:, 3] > 127][:, :3]
    return oklab_to_rgb(kmeans_palette(rgb_to_oklab(px), a.colors))


def run(img, a, pal=None):
    rgba = np.asarray(img.convert('RGBA')).copy()
    if a.key == 'auto' and (rgba[..., 3] == 255).all():
        rgba = key_background(rgba, a.key_thresh)
    rgba = trim(rgba)
    width = a.width
    if a.pitch:
        p = detect_pitch(rgba) if a.pitch == 'auto' else float(a.pitch)
        width = max(1, round(rgba.shape[1] / p))
    if pal is None and a.palette:
        pal = load_palette(a.palette)
    ix, pal = pixelize(rgba, width, pal, a.colors, smooth=a.smooth)
    if a.cleanup:
        ix = cleanup(ix)
    ix, pal = outline(ix, pal, a.outline)
    out = to_rgba(ix, pal)
    if a.snap:
        out = snap(out, load_palette(a.snap))
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('src')
    ap.add_argument('dst')
    ap.add_argument('--width', type=int, default=32, help='target width in art pixels (before the outline)')
    ap.add_argument('--pitch', default=None, help="'auto' or a number: derive width from the drawn pseudo-pixel size")
    ap.add_argument('--palette', default=None, help='JSON list of hex colours (or {"colors": [...]}) to quantize to')
    ap.add_argument('--colors', type=int, default=24, help='adaptive palette size when no --palette')
    ap.add_argument('--snap', default=None, help='master palette to snap the final colours to')
    ap.add_argument('--outline', default='selout', choices=['selout', 'dark', 'none'])
    ap.add_argument('--key', default='auto', choices=['auto', 'none'])
    ap.add_argument('--key-thresh', type=int, default=28)
    ap.add_argument('--cleanup', type=int, default=1)
    ap.add_argument('--smooth', type=int, default=0, help='median size (3/5/7) over the intermediate image: flattens painted texture')
    ap.add_argument('--sheet', default=None, help='COLSxROWS: pixelize each cell of a sprite sheet separately (same cell size out)')
    a = ap.parse_args()
    img = Image.open(a.src)
    if a.sheet:
        cols, rows = (int(v) for v in a.sheet.lower().split('x'))
        cw, chh = img.width // cols, img.height // rows
        pal = load_palette(a.palette) if a.palette else sheet_palette(img, a)
        cells = [[run(img.crop((c * cw, r * chh, (c + 1) * cw, (r + 1) * chh)), a, pal) for c in range(cols)] for r in range(rows)]
        ow = max(x.shape[1] for row in cells for x in row)
        oh = max(x.shape[0] for row in cells for x in row)
        sheet = np.zeros((oh * rows, ow * cols, 4), np.uint8)
        for r, row in enumerate(cells):
            for c, x in enumerate(row):  # bottom-centre each cell (sprites stand on their base)
                y0, x0 = r * oh + oh - x.shape[0], c * ow + (ow - x.shape[1]) // 2
                sheet[y0:y0 + x.shape[0], x0:x0 + x.shape[1]] = x
        out = sheet
    else:
        out = run(img, a)
    save_png(out, a.dst)
    m = out[..., 3] > 0
    ncol = len(np.unique(out[m][:, :3], axis=0)) if m.any() else 0
    print(json.dumps({'out': a.dst, 'w': int(out.shape[1]), 'h': int(out.shape[0]), 'colors': int(ncol)}))


if __name__ == '__main__':
    sys.exit(main())
