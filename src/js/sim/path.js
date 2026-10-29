// Breadth-first search on the tile grid (uniform cost, 4-way). Paths are cached per start/goal and
// the cache is dropped whenever the map or its objects change (navVersion).
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export function makeNav() { return { version: -1, cache: new Map() }; }

export function findPath(nav, version, W, H, blocked, sx, sy, gx, gy) {
  if (nav.version !== version) { nav.cache.clear(); nav.version = version; }
  const key = sx + ',' + sy + '>' + gx + ',' + gy;
  if (nav.cache.has(key)) return nav.cache.get(key);
  const start = sy * W + sx, goal = gy * W + gx;
  const prev = new Int32Array(W * H).fill(-1);
  prev[start] = start;
  const q = [start];
  let found = start === goal;
  for (let i = 0; i < q.length && !found; i++) {
    const c = q[i], cx = c % W, cy = (c / W) | 0;
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const n = ny * W + nx;
      if (prev[n] !== -1) continue;
      if (n !== goal && blocked(nx, ny)) continue;
      prev[n] = c;
      if (n === goal) { found = true; break; }
      q.push(n);
    }
  }
  let path = null;
  if (found) {
    path = [];
    for (let c = goal; c !== start; c = prev[c]) path.push({ x: c % W, y: (c / W) | 0 });
    path.reverse();
  }
  if (nav.cache.size > 400) nav.cache.clear();
  nav.cache.set(key, path);
  return path;
}
