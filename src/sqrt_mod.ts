import assert from 'minimalistic-assert';

import {powMod} from './pow_mod';
import {NO_RESIDUES, ResidueClasses} from './types';

/**
 * Solves x² ≡ a (mod p) with the Tonelli-Shanks algorithm.
 * Returns 0, 1 or 2 residue classes.
 *
 * Preconditions:
 *   p is a prime number
 *   p ≤ 94906249 (p² ≤ Number.MAX_SAFE_INTEGER in order to avoid wrong
 *     results or infinite loops due to floating point rounding).
 */
export function sqrtModPrime(a: number, p: number): ResidueClasses {
  p = Math.abs(p);
  assert(p <= 94906249);
  a %= p;
  if (a === 0) return {res: [0], mod: p};
  if (a < 0) a += p;
  if (p === 2) return {res: [1], mod: p};
  if (a === 1) return {res: [1, p - 1], mod: p};
  if (powMod(a, (p - 1) / 2, p) !== 1) return NO_RESIDUES;
  let q = p - 1;
  let s = 0;
  for (; q % 2 === 0; q /= 2) s++;
  // The solution is straightforward when s = 1, i.e. p ≡ 3 (mod 4)
  if (s === 1) {
    const x = powMod(a, (p + 1) / 4, p);
    return {res: x < p - x ? [x, p - x] : [p - x, x], mod: p};
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
  return {res: x < p - x ? [x, p - x] : [p - x, x], mod: p};
}
