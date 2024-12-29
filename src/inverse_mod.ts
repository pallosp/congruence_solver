/**
 * Computes a⁻¹ (mod m) with the extended Euclidean algorithm.
 * Returns a number between 0 and m - 1, or NaN if the inverse doesn't exist.
 *
 * The inverse of each integer is 0 (mod 1), because a * 0 = 0 ≡ 1 (mod 1).
 */
export function inverseMod(a: number, m: number): number {
  if (m < 0) m = -m;
  if (m === 1) return 0;
  a = ((a % m) + m) % m;
  const m0 = m;
  let x = 1;
  let y = 0;
  while (a > 1) {
    // q = Math.floor(a / m);
    const q = (a - a % m) / m;
    // [m, a] = [a % m, m];
    let t = m;
    m = a % m;
    a = t;
    // [x, y] = [y, x - q * y];
    t = y;
    y = x - q * y;
    x = t;
  }
  if (a === 0) return NaN;
  return x < 0 ? x + m0 : x;
}
