// Seeded randomness. The running stream lives on a plain object ({ rs }) so it saves with the game.

// mulberry32 PRNG (Tommy Ettinger), JS form from bryc/code jshash/PRNGs.md
// https://github.com/bryc/code/blob/88c1317ea6f9b25c153afa9c369c365fed11b482/jshash/PRNGs.md
// Public domain (MIT fallback, Copyright (c) 2024 bryc). State kept on o.rs so it saves with the game.
export function rnd(o) {
  o.rs = (o.rs + 0x6D2B79F5) | 0;
  let t = o.rs;
  t = Math.imul(t ^ (t >>> 15), 1 | t);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// FNV-1a over the joined parts: stable sub-seeds for days, tiles and chapters.
export function hash(...parts) {
  const s = parts.join('|');
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

export const stream = (...parts) => ({ rs: hash(...parts) | 0 });
export const ri = (o, a, b) => a + Math.floor(rnd(o) * (b - a + 1));
export const pick = (o, arr) => arr[Math.floor(rnd(o) * arr.length)];
export const chance = (o, p) => rnd(o) < p;
// Cheap deterministic noise for drawing (no stream needed).
export const noise = (x, y, k = 0) => (hash(x, y, k) % 1000) / 1000;
