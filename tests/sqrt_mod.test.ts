import {expect, test} from '@jest/globals';

import {sqrtModPrime} from '../src/sqrt_mod';
import {NO_RESIDUES} from '../src/types';

test('sqrtModPrime', () => {
  expect(sqrtModPrime(0, 2)).toEqual({res: [0], mod: 2});
  expect(sqrtModPrime(0, -2)).toEqual({res: [0], mod: 2});
  expect(sqrtModPrime(1, 2)).toEqual({res: [1], mod: 2});

  expect(sqrtModPrime(2, 5)).toEqual(NO_RESIDUES);

  expect(sqrtModPrime(1, 3)).toEqual({res: [1, 2], mod: 3});
  expect(sqrtModPrime(2, 7)).toEqual({res: [3, 4], mod: 7});
  expect(sqrtModPrime(-1, 13)).toEqual({res: [5, 8], mod: 13});

  expect(sqrtModPrime(-1, 94906249))
      .toEqual({res: [1393955, 93512294], mod: 94906249})
  expect(() => sqrtModPrime(-1, 94906297)).toThrow();
  expect(() => sqrtModPrime(-1, -94906297)).toThrow();

  for (const p of [2, 3, 5, 7, 11, 13]) {
    for (let a = 0; a < p; a++) {
      const {res, mod} = sqrtModPrime(a, p);
      if (res.length > 0) {
        expect(mod).toBe(p);
      }
      if (res.length > 1) {
        expect(res[0]).toBeLessThan(res[1]);
      }
      for (const r of res) {
        expect((r * r) % p).toBe(a);
        expect(r).toBeGreaterThanOrEqual(0);
        expect(r).toBeLessThan(p);
      }
    }
  }
});
