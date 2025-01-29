import {factor} from './factor';
import {inverseMod} from './inverse_mod';
import {solveLinearCongruence} from './linear_congruence';
import {ALL_RESIDUES, NO_RESIDUES, ResidueClasses} from './residues';
import {sqrtModPrime} from './sqrt_mod';

/**
 * Solves ax² + bx + c ≡ 0 (mod p) where p is a prime.
 * Returns up to two residue classes.
 */
export function solveQuadraticCongruenceModPrime(
    a: number, b: number, c: number, p: number): ResidueClasses {
  a %= p;
  if (a === 0) return solveLinearCongruence(b, c, p);
  if (p < 0) p = -p;
  const inv = inverseMod(a + p, p);
  b = (b * inv) % p;
  c = (c * inv) % p;
  // p = 2 is a special case
  if (p === 2) {
    if (b === 0) return {res: [c], mod: 2};
    return c === 0 ? ALL_RESIDUES : NO_RESIDUES;
  }
  // x² + bx + c ≡ 0 (mod p) is equivalent to (x + b/2)² ≡ b²/4 - c (mod p)
  const bHalf = (b % 2 !== 0 ? b - p : b) / 2;
  const y = sqrtModPrime(bHalf * bHalf - c, p);
  if (y !== y) return NO_RESIDUES;
  if (y === 0) return {res: [(p - bHalf) % p], mod: p};
  const x1 = (p + y - bHalf) % p;
  const x2 = (p - y - bHalf) % p;
  return {res: x1 < x2 ? [x1, x2] : [x2, x1], mod: p};
}

/**
 * Solves the quadratic congruence equation ax² + bx + c ≡ 0 (mod pᵏ) where p is
 * a prime and k ∈ ℕ. Returns up to two residue classes. The modulus of the
 * return value is a power of p that may be less than pᵏ.
 *
 * The algorithm is based on Hensel lifting explained at
 * https://sites.millersville.edu/bikenaga/number-theory/prime-power-congruences/prime-power-congruences.html
 */
export function solveQuadraticCongruenceModPrimePower(
    a: number, b: number, c: number, p: number, k: number): ResidueClasses {
  // Step 0: handle the k = 0 case
  if (k === 0) return ALL_RESIDUES;

  // Step 1: solve the congruence (mod p)
  const solutionModP = solveQuadraticCongruenceModPrime(a, b, c, p);
  if (k === 1) return solutionModP;
  let {res: r, mod} = solutionModP;
  if (r.length === 0) return NO_RESIDUES;
  let res = r.concat() as number[];
  if (p < 0) p = -p;

  // If all integers are solutions modulo 2, Hensel lifting needs to be done for
  // x ≡ 0 (mod 2) and x ≡ 1 (mod 2) separately.
  if (mod === 1 && p === 2) [res, mod] = [[0, 1], 2];

  // Step 2
  //
  // For each solution x (mod p ** exp)
  //   While p | 2ax + b, apply the corresponding case of the Hensel lifting
  //   algorithm to calculate the lifted solution (mod p ** (exp + 1)).
  //
  // There is an 1:1 relationship between the original and the lifted solutions.
  let exp = 1;
  let pp = p;
  if (mod > 1) {
    for (let j = 0; j < res.length; j++) {
      let deriv: number;
      let x = res[j];
      pp = p;
      // The derivative is ≠0 up to the same exponent for each residue.
      for (exp = 1; exp < k && (deriv = (2 * a * x + b) % p) !== 0; exp++) {
        const value = (a * x + b) * x + c;
        x += pp * ((inverseMod(p - deriv, p) * (value / pp)) % p);
        pp *= p;
        x %= pp;
      }
      res[j] = x < 0 ? x + pp : x;
    }
    res.sort((a, b) => a - b);
    mod = pp;
  }

  // Step 3
  //
  // From now on p ∤ 2ax + b.
  //
  // Apply the corresponding case of the Hensel lifting algorithm case to get
  // the solutions for the next power of p until reaching pᵏ. While there is an
  // 1:n relationship between the original and the lifted solutions, the total
  // number of the latter won't exceed two modulo a suitable power of p. It's
  // enough to find 3 solutions to determine the new modulus.
  for (; exp < k; exp++) {
    const newRes: number[] = [];
    const nextPp = pp * p;
    outerloop: for (let i = 0; i < pp; i += mod) {
      for (let x of res) {
        x += i;
        if (((a * x + b) * x + c) % nextPp === 0) {
          if (newRes.push(x) > 2) break outerloop;
        }
      }
    }
    res = newRes;

    // Normalize the result. Find the appropriate modulus for which there are at
    // most 2 residues.
    if (res.length === 0) return NO_RESIDUES;
    if (res.length === 2 && pp === 2) {
      mod = 1;
      res.length = 1;
    } else if (res.length <= 2) {
      mod = pp;
    } else if (res[1] - res[0] === res[2] - res[1]) {
      mod = res[1] - res[0];
      res.length = 1;
    } else {
      mod = res[2] - res[0];
      res.length = 2;
    }
    pp = nextPp;
  }

  return {res, mod};
}

/**
 * Solves the quadratic congruence equation ax² + bx + c ≡ 0 (mod m).
 *
 * The modulus can be specified either as a number or a list of monotonously
 * growing positive prime factors.
 *
 * Number of results ≤ 2 ** (number of distinct prime factors).
 */
export function solveQuadraticCongruence(
    a: number, b: number, c: number, m: number|number[]): ResidueClasses {
  if (m === 0) return NO_RESIDUES;
  const modFactors = Array.isArray(m) ? m : factor(m);
  let res = [0];
  let mod = 1;
  // Step 1: Split the modulus to the product of prime factors.
  let p = modFactors[0];
  let k = 1;
  for (let i = 1; i <= modFactors.length; i++) {
    if (modFactors[i] !== p) {
      // Step 2: Solve the congruence (mod pᵏ)
      const {res: fRes, mod: fMod} =
          solveQuadraticCongruenceModPrimePower(a, b, c, p, k);
      // Step 3: Combine the solutions using the Chinese remainder theorem.
      if (fRes.length === 0) return NO_RESIDUES;
      if (fMod > 1) {
        const coeff = (inverseMod(mod, fMod) + fMod) * mod;
        mod *= fMod;
        const newRes: number[] = [];
        for (const x of res) {
          const c = x + (mod - x) * coeff;
          for (const y of fRes) {
            newRes.push((c + y * coeff) % mod);
          }
        }
        res = newRes;
      }
      p = modFactors[i];
      k = 1;
    } else {
      k++;
    }
  }
  return {res: res.sort((a, b) => a - b), mod};
}
