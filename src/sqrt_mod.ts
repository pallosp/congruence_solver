import assert from 'minimalistic-assert';

import {powMod} from './pow_mod';

/**
 * Computes the square root of a modulo p using the Tonelli-Shanks algorithm.
 * Solves the congruence x² ≡ a (mod p) and returns the smallest non-negative
 * solution, or NaN if no solution exists.
 *
 * If the equation has solutions, they are symmetric modulo p. Specifically,
 * if x is a solution, then -x (or equivalently p-x) is also a solution.
 *
 * Preconditions:
 *   - p must be a prime number.
 *   - p ≤ 94906249 (to ensure that p² ≤ Number.MAX_SAFE_INTEGER, avoiding
 *     incorrect results or infinite loops caused by floating-point rounding
 *     errors).
 */
export function sqrtModPrime(a: number, p: number): number {
  p = Math.abs(p);
  assert(p <= 94906249);
  a %= p;
  if (a === 0) return 0;
  if (a < 0) a += p;
  if (p === 2 || a === 1) return 1;
  if (powMod(a, (p - 1) / 2, p) !== 1) return NaN;
  let q = p - 1;
  let s = 0;
  for (; q % 2 === 0; q /= 2) s++;
  // The solution is straightforward when s = 1, i.e. p ≡ 3 (mod 4)
  if (s === 1) {
    const x = powMod(a, (p + 1) / 4, p);
    return Math.min(x, p - x);
  }
  let nonResidue = 2;
  while (powMod(nonResidue, (p - 1) / 2, p) === 1) nonResidue++;
  let c = powMod(nonResidue, q, p);
  const f = powMod(a, (q - 1) / 2, p);
  let x = (f * a) % p;
  let t = (f * x) % p;
  while (t !== 1) {
    let i = 1;
    for (let n = (t * t) % p; n !== 1; n = (n * n) % p) i++;
    while (--s > i) c = (c * c) % p;
    x = (x * c) % p;
    c = (c * c) % p;
    t = (t * c) % p;
  }
  return Math.min(x, p - x);
}
