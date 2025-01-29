import './lib/matchers';

import {gcd} from '../src/gcd';
import {solveLinearCongruence} from '../src/linear_congruence';
import {ALL_RESIDUES, NO_RESIDUES} from '../src/residues';

import {randomInt} from './helper';

test('solveLinearCongruence', () => {
  // mod 0
  expect(solveLinearCongruence(1, 1, 0)).toEqual(NO_RESIDUES);
  // no solution
  expect(solveLinearCongruence(0, 3, 2)).toEqual(NO_RESIDUES);
  expect(solveLinearCongruence(2, 3, 4)).toEqual(NO_RESIDUES);
  // simple cases
  expect(solveLinearCongruence(0, 4, 2)).toEqual(ALL_RESIDUES);
  expect(solveLinearCongruence(2, 2, 5)).toEqual({res: [4], mod: 5});
  // composite m
  expect(solveLinearCongruence(3, 6, 10)).toEqual({res: [8], mod: 10});
  // gcd(a,m) > 1
  expect(solveLinearCongruence(2, 2, 4)).toEqual({res: [1], mod: 2});
  expect(solveLinearCongruence(2, 6, 10)).toEqual({res: [2], mod: 5});
  // |coefficient| ≥ |modulus|
  expect(solveLinearCongruence(2, 4, 4)).toEqual({res: [0], mod: 2});
  // negative coefficient or modulus
  expect(solveLinearCongruence(-7, 6, 10)).toEqual({res: [8], mod: 10});
  expect(solveLinearCongruence(3, -4, 10)).toEqual({res: [8], mod: 10});
  expect(solveLinearCongruence(3, 6, -10)).toEqual({res: [8], mod: 10});
  expect(solveLinearCongruence(-2, -4, 6)).toEqual({res: [1], mod: 3});
});

test('solveLinearCongruence, random values', () => {
  for (let i = 0; i < 100; i++) {
    const a = randomInt(-9, 9);
    const b = randomInt(-9, 9);
    const m = randomInt(-9, 9);
    const {res, mod} = solveLinearCongruence(a, b, m);
    expect(mod).toBeGreaterThan(0);
    if (res.length > 0) {
      expect(mod * gcd(a, m)).toBe(Math.abs(m));
      expect(res[0]).toBeInRange(0, mod - 1);
      expect(a * res[0] + b).toBeCongruent(0, m);
      expect(a * (res[0] + mod) + b).toBeCongruent(0, m);
    } else {
      expect(mod).toBe(1);
      expect(m === 0 || b % gcd(a, m) !== 0).toBe(true);
    }
  }
});
