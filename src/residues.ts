import {gcd} from './gcd';
import {inverseMod} from './inverse_mod';

/**
 * Represents a set of residue classes with a common modulus.
 * Each residue is an integer in the range [0, mod - 1], inclusive.
 * The residue list is sorted in ascending order.
 *
 * For example, {res: [1, 2], mod: 5} denotes the set of integers n
 * such that n ≡ 1 (mod 5) or n ≡ 2 (mod 5).
 */
export interface ResidueClasses {
  readonly res: readonly number[];
  readonly mod: number;
}

/**
 * Empty residue class set.
 */
export const NO_RESIDUES: ResidueClasses = {
  res: [],
  mod: 1
};

/**
 * Residue classes representing all integers.
 */
export const ALL_RESIDUES: ResidueClasses = {
  res: [0],
  mod: 1
};

/**
 * Computes the intersection of multiple residue class sets.
 *
 * The result is a new residue class set that satisfies all the constraints of
 * the input residue classes. This corresponds to finding the minimal modulus
 * and the associated residues such that:
 *   For each input rc[i],
 *   x ≡ any element of rc[i].res (mod rc[i].mod)
 *
 * If no intersection exists (i.e., the constraints are incompatible),
 * the function returns an empty residue class.
 */
export function intersectResidues(...rc: ResidueClasses[]): ResidueClasses {
  let lastRes = [0], lastMod = 1;
  for (let {res, mod} of rc) {
    if (mod === 0) return NO_RESIDUES;
    if (mod < 0) mod = -mod;

    const g = gcd(lastMod, mod);
    const c = inverseMod(lastMod / g, mod / g) * lastMod / g;
    const newMod = lastMod * mod / g;
    const newRes = [];
    for (const r0 of lastRes) {
      for (const r1 of res) {
        const d = r1 - r0;
        if (d % g !== 0) continue;
        const r = (r0 + d * c) % newMod;
        newRes.push(r >= 0 ? r : r + newMod);
      }
    }
    lastRes = newRes;
    lastMod = newMod;
  }
  if (lastRes.length === 0) return NO_RESIDUES;
  return {res: lastRes.sort((a, b) => a - b), mod: lastMod};
}
