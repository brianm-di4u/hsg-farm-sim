#!/usr/bin/env python3
"""Build "Vapors Pixel", a webfont of the game's own 5x7 bitmap glyphs (src/js/render/pxfont.js), for the pixel style's
DOM text. Every dot is a square of 128 units in a 1024-unit em (8 dots per em; ink spans 7 dots above the baseline and 2 below), so at 1rem (16 CSS px on desktop)
one dot is exactly 2 px, the same size as an art pixel on the canvas: the text is as crisp as the art.

    python -I tools/build-pxfont.py      ->  vendor/fonts/vapors-pixel.woff2

Glyphs missing here (symbols such as the goal diamond) fall back to DotGothic16 in the CSS font stack.
"""
import os
import re
import sys

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)
DOT, ROWS = 128, 7

# Punctuation the UI uses that the canvas font never needed. 7 rows each, '#' = ink.
EXTRA = {
    '(': ['.#', '#.', '#.', '#.', '#.', '#.', '.#'], ')': ['#.', '.#', '.#', '.#', '.#', '.#', '#.'],
    '[': ['##', '#.', '#.', '#.', '#.', '#.', '##'], ']': ['##', '.#', '.#', '.#', '.#', '.#', '##'],
    ';': ['..', '..', '.#', '..', '..', '.#', '#.'], '"': ['#.#', '#.#', '...', '...', '...', '...', '...'],
    '+': ['.....', '.....', '..#..', '.###.', '..#..', '.....', '.....'], '=': ['....', '....', '####', '....', '####', '....', '....'],
    '%': ['##..#', '##.#.', '..#..', '..#..', '.#...', '#.##.', '..##.'], '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
    '<': ['...', '..#', '.#.', '#..', '.#.', '..#', '...'], '>': ['...', '#..', '.#.', '..#', '.#.', '#..', '...'],
    '#': ['.#.#.', '#####', '.#.#.', '.#.#.', '#####', '.#.#.', '.....'], '_': ['....', '....', '....', '....', '....', '....', '####'],
    '·': ['.', '.', '.', '#', '.', '.', '.'], '•': ['..', '..', '##', '##', '..', '..', '..'],
    '…': ['.....', '.....', '.....', '.....', '.....', '.....', '#.#.#'], '–': ['....', '....', '....', '####', '....', '....', '....'],
    '—': ['......', '......', '......', '######', '......', '......', '......'],
    '’': ['#', '#', '.', '.', '.', '.', '.'], '‘': ['#', '#', '.', '.', '.', '.', '.'],
    '“': ['#.#', '#.#', '...', '...', '...', '...', '...'], '”': ['#.#', '#.#', '...', '...', '...', '...', '...'],
    '→': ['.....', '...#.', '....#', '#####', '....#', '...#.', '.....'], '←': ['.....', '.#...', '#....', '#####', '#....', '.#...', '.....'],
}


# Body text needs true descenders (the canvas font raises g, p, q, y, j to fit 7 rows, which reads as '9' in a
# sentence): 9 rows, the last 2 below the baseline. And a 3-dot word space.
DESC = {
    'g': ['....', '....', '.###', '#..#', '#..#', '#..#', '.###', '...#', '###.'],
    'p': ['....', '....', '###.', '#..#', '#..#', '#..#', '###.', '#...', '#...'],
    'q': ['....', '....', '.###', '#..#', '#..#', '#..#', '.###', '...#', '...#'],
    'y': ['....', '....', '#..#', '#..#', '#..#', '#..#', '.###', '...#', '###.'],
    'j': ['..#', '...', '..#', '..#', '..#', '..#', '..#', '#.#', '.#.'],
    ',': ['..', '..', '..', '..', '..', '.#', '.#', '#.', '..'],
    ' ': ['..'] * ROWS,
}


def glyphs_from_js():
    src = open(os.path.join(GAME, 'src', 'js', 'render', 'pxfont.js'), encoding='utf-8').read()
    body = src[src.index('const G = {'):src.index('};', src.index('const G = {'))]
    out = {}
    for m in re.finditer(r"""(?:(\w)|'((?:\\'|[^'])+)'|"([^"]+)")\s*:\s*\[([^\]]*)\]""", body):
        key = m.group(1) or (m.group(2) or '').replace("\\'", "'") or m.group(3)
        rows = re.findall(r"'([.#]*)'", m.group(4))
        if len(key) == 1 and len(rows) == ROWS:
            out[key] = rows
    return out


def draw(rows):
    pen = TTGlyphPen(None)
    for r, row in enumerate(rows):  # one rectangle per horizontal run of ink, clockwise (TrueType)
        y0, y1 = (ROWS - 1 - r) * DOT, (ROWS - r) * DOT
        x = 0
        while x < len(row):
            if row[x] != '#':
                x += 1
                continue
            x1 = x
            while x1 < len(row) and row[x1] == '#':
                x1 += 1
            pen.moveTo((x * DOT, y0)); pen.lineTo((x * DOT, y1)); pen.lineTo((x1 * DOT, y1)); pen.lineTo((x1 * DOT, y0)); pen.closePath()
            x = x1
    return pen.glyph()


def main():
    g = glyphs_from_js()
    g.update({k: v for k, v in EXTRA.items() if k not in g})
    g.update(DESC)
    names = {ch: ('space' if ch == ' ' else f'uni{ord(ch):04X}') for ch in g}
    order = ['.notdef'] + [names[ch] for ch in sorted(g)]
    fb = FontBuilder(1024, isTTF=True)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap({ord(ch): names[ch] for ch in g})
    glyf = {'.notdef': draw(['###', '#.#', '#.#', '#.#', '#.#', '#.#', '###'])}
    metrics = {'.notdef': (4 * DOT, 0)}
    for ch, rows in g.items():
        glyf[names[ch]] = draw(rows)
        metrics[names[ch]] = ((len(rows[0]) + 1) * DOT, 0)  # 1 dot of spacing after each glyph
    fb.setupGlyf(glyf)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=ROWS * DOT, descent=-2 * DOT)
    fb.setupNameTable({'familyName': 'Vapors Pixel', 'styleName': 'Regular', 'copyright': 'Original to Valley of Vapors'})
    fb.setupOS2(sTypoAscender=ROWS * DOT, sTypoDescender=-2 * DOT, sTypoLineGap=0, usWinAscent=ROWS * DOT, usWinDescent=2 * DOT, fsType=0)
    fb.setupPost()
    fb.font.flavor = 'woff2'
    out = os.path.join(GAME, 'vendor', 'fonts', 'vapors-pixel.woff2')
    fb.save(out)
    print(out, len(g), 'glyphs', os.path.getsize(out), 'bytes')


if __name__ == '__main__':
    sys.exit(main())
