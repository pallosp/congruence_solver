import {expect, test} from '@jest/globals';

import {solveLinearCongruence} from '../src/linear_congruence';
import {ALL_RESIDUES, NO_RESIDUES} from '../src/types';

test('solveLinearCongruence', () => {
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
