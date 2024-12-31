import {gcd} from './gcd';
import {inverseMod} from './inverse_mod';
import {NO_RESIDUES, ResidueClasses} from './residues';

/**
 * Solves the congruence equation ax + b ≡ 0 (mod m).
 *
 * If the equation is solvable, returns a residue r and modulus m' such that
 * the complete solution set is given by x ≡ r (mod m'). If the equation has no
 * solution, returns an empty list for residues and sets m' to 1.
 */
export function solveLinearCongruence(
    a: number, b: number, m: number): ResidueClasses {
  const g = gcd(a, m);
  if (b % g !== 0) return NO_RESIDUES;
  m = Math.abs(m);
  const m1 = m / g;
  b %= m;
  if (b > 0) b -= m;
  const x = ((0 - b) / g * (inverseMod(a / g, m1) || 0)) % m1;
  return {res: [x], mod: m1};
}
