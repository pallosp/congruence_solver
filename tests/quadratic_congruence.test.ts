import './lib/matchers';

import {solveQuadraticCongruence, solveQuadraticCongruenceModPrime, solveQuadraticCongruenceModPrimePower} from '../src/quadratic_congruence';
import {ALL_RESIDUES, NO_RESIDUES} from '../src/residues';

import {isPowerOfTwo, randomInt, randomItem} from './helper';

function quadraticCongruenceNumSolutions(
    a: number, b: number, c: number, mod: number) {
  let n = 0;
  for (let x = 0; x < mod; x++) {
    if (((a * x + b) * x + c) % mod === 0) n++;
  }
  return n;
}

test('solveQuadraticCongruenceModPrime', () => {
  for (const p of [2, 5, 7]) {
    for (let a = 0; a < p; a++) {
      for (let b = 0; b < p; b++) {
        for (let c = 0; c < p; c++) {
          const {res, mod} = solveQuadraticCongruenceModPrime(a, b, c, p);

          expect(res.length).toBeLessThanOrEqual(2);
          expect(res).toBeStrictlyAscending();
          expect(p % mod).toBe(0);

          for (const x of res) {
            expect(x).toBeInRange(0, mod - 1);
            expect((a * x * x + b * x + c) % p).toBe(0);
            expect((a * (x + mod) * (x + mod) + b * (x + mod) + c) % p).toBe(0);
          }

          expect(res.length * p / mod)
              .toBe(quadraticCongruenceNumSolutions(a, b, c, p));
        }
      }
    }
  }
});

test('solveQuadraticCongruenceModPrimePower', () => {
  // x² + 5x + 18 ≡ 0 (mod 7²) - general case
  expect(solveQuadraticCongruenceModPrimePower(1, 5, 18, 7, 2))
      .toEqual({res: [17, 27], mod: 49});

  // x² + x + 7 ≡ 0 (mod 3²) - the solutions are (mod 3), not (mod 9)
  expect(solveQuadraticCongruenceModPrimePower(1, 1, 7, 3, 2))
      .toEqual({res: [1], mod: 3});

  // x² + 2x + 3 ≡ 0 (mod 5²) - no solution
  expect(solveQuadraticCongruenceModPrimePower(1, 2, 3, 5, 2))
      .toEqual(NO_RESIDUES);

  // x² + 2x + 6 ≡ 0 (mod 5²) - has solution mod 5 but not mod 5²
  expect(solveQuadraticCongruenceModPrimePower(1, 2, 6, 5, 2))
      .toEqual(NO_RESIDUES);

  // 3x² ≡ 0 (mod 3) - all integers are solutions
  expect(solveQuadraticCongruenceModPrimePower(3, 0, 0, 3, 1))
      .toEqual(ALL_RESIDUES);

  // 3x² ≡ 0 (mod 3²) - gcd(a, b, c, p) > 1, k > 1
  expect(solveQuadraticCongruenceModPrimePower(3, 0, 0, 3, 2))
      .toEqual({res: [0], mod: 3});

  // 21x² + 15x + 0 ≡ 0 (mod 3³) - gcd(a, b, c, p) > 1
  expect(solveQuadraticCongruenceModPrimePower(21, 15, 0, 3, 3))
      .toEqual({res: [0, 7], mod: 9});

  // x² + 18x ≡ 0 (mod 3³)
  expect(solveQuadraticCongruenceModPrimePower(1, 18, 0, 3, 3))
      .toEqual({res: [0], mod: 9});

  // x² + x + 2 ≡ 0 (mod 2)
  expect(solveQuadraticCongruenceModPrimePower(1, 1, 2, 2, 1))
      .toEqual(ALL_RESIDUES);

  // x² + 3x + 2 ≡ 0 (mod 2²)
  expect(solveQuadraticCongruenceModPrimePower(1, 3, 2, 2, 2))
      .toEqual({res: [2, 3], mod: 4});

  // 2x² + 2x ≡ 0 (mod 2²)
  expect(solveQuadraticCongruenceModPrimePower(2, 2, 0, 2, 2))
      .toEqual(ALL_RESIDUES);

  // 2x² + 2x ≡ 0 (mod 2³)
  expect(solveQuadraticCongruenceModPrimePower(2, 2, 0, 2, 3))
      .toEqual({res: [0, 3], mod: 4});

  // 4x² + 4x ≡ 0 (mod 2³)
  expect(solveQuadraticCongruenceModPrimePower(4, 4, 0, 2, 3))
      .toEqual(ALL_RESIDUES);
});

test('solveQuadraticCongruenceModPrimePower, random equations', () => {
  for (let i = 0; i < 100; i++) {
    const [p, k] = randomItem(
        [[2, 2], [2, 3], [-2, 5], [3, 3], [-5, 2], [7, 1], [-11, 0]]);
    const pk = Math.abs(p ** k);
    const a = randomInt(-1, pk);
    const b = randomInt(-1, pk);
    const c = randomInt(-1, pk);
    const {res, mod} = solveQuadraticCongruenceModPrimePower(a, b, c, p, k);

    expect(res.length).toBeLessThanOrEqual(2);
    expect(res).toBeStrictlyAscending();
    expect(pk).toBeCongruent(0, mod);

    for (const x of res) {
      expect(x).toBeInRange(0, mod - 1);
      expect((a * x + b) * x + c).toBeCongruent(0, pk);
      expect(a * (x + mod) * (x + mod) + b * (x + mod) + c)
          .toBeCongruent(0, pk);
    }

    expect(res.length * pk / mod)
        .toBe(quadraticCongruenceNumSolutions(a, b, c, pk));
  }
});

test('solveQuadraticCongruence', () => {
  // mod 0
  expect(solveQuadraticCongruence(1, 0, 0, 0)).toEqual(NO_RESIDUES);

  // mod 1
  expect(solveQuadraticCongruence(1, 0, 0, 1)).toEqual(ALL_RESIDUES);

  const factors = [2, 3];
  expect(solveQuadraticCongruence(1, 2, 3, factors))
      .toEqual({res: [1, 3], mod: 6});

  expect(solveQuadraticCongruence(1, 2, 3, 6)).toEqual({res: [1, 3], mod: 6});

  // negative coefficient
  expect(solveQuadraticCongruence(1, 1, -6, 30))
      .toEqual({res: [2, 12], mod: 15});

  // coefficient > mod
  expect(solveQuadraticCongruence(1, 31, 24, 30))
      .toEqual({res: [2, 12], mod: 15});

  expect(solveQuadraticCongruence(3, 4, 5, 60))
      .toEqual({res: [7, 25], mod: 30});

  // no solutions
  expect(solveQuadraticCongruence(2, 0, 2, 6)).toEqual(NO_RESIDUES);

  // linear congruence
  expect(solveQuadraticCongruence(0, 1, 2, 6)).toEqual({res: [4], mod: 6});

  // 1 residue class
  expect(solveQuadraticCongruence(2, 0, 0, 6)).toEqual({res: [0], mod: 3});

  // 4 residue classes
  expect(solveQuadraticCongruence(1, 1, 0, 12))
      .toEqual({res: [0, 3, 8, 11], mod: 12});
  expect(solveQuadraticCongruence(2, 2, 0, 60))
      .toEqual({res: [0, 5, 9, 14], mod: 15});
});

test('solveQuadraticCongruence, random equations', () => {
  for (let i = 0; i < 100; i++) {
    const m = randomInt(1, 60);
    const a = randomInt(-9, 9);
    const b = randomInt(-9, 9);
    const c = randomInt(-9, 9);
    const {res, mod} = solveQuadraticCongruence(a, b, c, m);

    expect(res.length === 0 || isPowerOfTwo(res.length)).toBe(true);
    expect(res).toBeStrictlyAscending();
    expect(m).toBeCongruent(0, mod);

    for (const x of res) {
      expect(x).toBeInRange(0, mod - 1);
      expect((a * x + b) * x + c).toBeCongruent(0, m);
      expect(a * (x + mod) * (x + mod) + b * (x + mod) + c).toBeCongruent(0, m);
    }

    expect(res.length * m / mod)
        .toBe(quadraticCongruenceNumSolutions(a, b, c, m));
  }
});
