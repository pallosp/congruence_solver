/**
 * Computes a⁻¹ (mod m) with the extended Euclidean algorithm.
 * Returns a number between 0 and m - 1, or NaN if the inverse doesn't exist.
 *
 * In case strict = false, returns the smallest non-negative solution to the
 * a·x = gcd(a, m) (mod m) congruence. The result will be in the
 * [0, m / gcd(a, m) - 1] range.
 *
 * The inverse of each integer is 0 (mod 1), because a * 0 = 0 ≡ 1 (mod 1).
 */
export function inverseMod(a: number, m: number, strict = true): number {
  // a and m must be non-negative in order to the result to be correct
  if (m < 0) m = -m;
  if (a < 0) a = a % m + m;

  let x = 1, y = 0;
  while (m !== 0) {
    const r = a % m;
    const q = (a - r) / m;
    const t = x;

    a = m;
    m = r;
    x = y;
    y = t - q * y;
  }

  // After the loop
  //   a = gcd(a₀, m₀)
  //   m = 0
  //   y = m₀ / gcd(a₀, m₀)
  //   x = an inverse of a₀ (mod m₀), in the (-y, y) open interval
  //       x + k·y is also solution for every k ∈ ℤ

  if (a !== 1 && strict) return NaN;
  return x >= 0 ? x : x + y;
}
