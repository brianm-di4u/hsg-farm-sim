// Art loader. The pixel-art set for the tile size (assets/px/<T>/, listed in assets/px/manifest.json, inlined at build
// time as ART_MANIFEST_PX) is loaded with new Image() + decode(), which works from file:// as well as http, and only
// ever drawn (never read back), except the terrain textures, inlined as data URLs. Loading is progressive: the current
// chapter's set first, everything else after first paint. Until an image is decoded the vector art in art.js is drawn
// instead; `?art=0` or Settings → Graphics → Simple keeps the vector art. (The painted set this replaced lives on in
// art-src/painted/ as pack sources only.)
const gfx = (() => { try { return JSON.parse(localStorage.getItem('vov-farm-settings') || '{}').gfx || ''; } catch { return ''; } })();
const query = typeof location !== 'undefined' ? location.search : '';
const off = /[?&]art=0\b/.test(query) || gfx === 'simple';
// Pixel style (the art style whenever art is on): the world is drawn into a low-resolution canvas, one canvas pixel
// per art pixel, `PX.T` pixels to a tile, and the browser scales it up by a whole number with no smoothing.
// T = art px per tile: 32 by default (chosen in the blind tier study, VISUAL-PLAN-PX.md "Pivots"); ?tile=16|24 for A/B.
// S = whole-number scale for code-drawn pixel elements (bitmap text, fences, badges) so they keep their screen size.
const tileQ = +(query.match(/[?&]tile=(\d+)/) || [])[1];
const T = [16, 24, 32].includes(tileQ) ? tileQ : 32;
export const PX = { on: !off, T, S: T >= 24 ? 2 : 1 };

/* global ART_MANIFEST_PX */
const PXMAN = PX.on && typeof ART_MANIFEST_PX !== 'undefined' ? ART_MANIFEST_PX[PX.T] || {} : {};
const MAN = PXMAN;
export const isPx = (name) => !!PXMAN[name];
// Pixel terrain textures inlined as data URLs (tools/pack-px.py): they don't taint the terrain chunks they're
// drawn into, so scene.js can read the chunks back and clean their edges.
/* global ART_PX_INLINE */
const PXINLINE = PX.on && typeof ART_PX_INLINE !== 'undefined' ? ART_PX_INLINE[PX.T] || {} : {};

export const ART = { on: !off && Object.keys(MAN).length > 0, imgs: new Map(), loading: new Map(), pending: 0, failed: [], dirty: false, loaded: 0, fresh: [] };

export const hasArt = (name) => ART.on && !!MAN[name];
export const img = (name) => (ART.on ? ART.imgs.get(name) || null : null);
export const manifest = () => MAN;

export function want(names) {
  if (!ART.on) return Promise.resolve();
  const jobs = [];
  for (const n of names) {
    if (!MAN[n] || ART.imgs.has(n)) continue;
    if (ART.loading.has(n)) { jobs.push(ART.loading.get(n)); continue; }
    const im = new Image();
    ART.pending++;
    const p = new Promise((res) => {
      im.onload = () => {
        const done = () => { ART.imgs.set(n, im); ART.pending--; ART.loaded++; ART.fresh.push(n); ART.dirty = true; ART.loading.delete(n); res(); };
        if (im.decode) im.decode().then(done, done); else done();
      };
      im.onerror = () => { ART.pending--; ART.failed.push(n); ART.loading.delete(n); res(); };
    });
    im.src = PXINLINE[n] || 'assets/' + MAN[n].file;
    ART.loading.set(n, p);
    jobs.push(p);
  }
  return Promise.all(jobs);
}

export const allNames = () => Object.keys(MAN);
