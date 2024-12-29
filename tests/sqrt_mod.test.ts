import {expect, test} from '@jest/globals';

import {sqrtModPrime} from '../src/sqrt_mod';

test('sqrtModPrime', () => {
  expect(sqrtModPrime(0, 2)).toBe(0);
  expect(sqrtModPrime(0, -2)).toBe(0);
  expect(sqrtModPrime(1, 2)).toBe(1);

  expect(sqrtModPrime(2, 5)).toBe(NaN);

  expect(sqrtModPrime(1, 3)).toBe(1);
  expect(sqrtModPrime(2, 7)).toBe(3);
  expect(sqrtModPrime(-1, 13)).toBe(5);

  expect(sqrtModPrime(-1, 94906249)).toBe(1393955);
  expect(() => sqrtModPrime(-1, 94906297)).toThrow();
  expect(() => sqrtModPrime(-1, -94906297)).toThrow();

  for (const p of [2, 3, 5, 7, 11, 13]) {
    for (let a = 0; a < p; a++) {
      const r = sqrtModPrime(a, p);
      if (isNaN(r)) continue;
      expect((r * r) % p).toBe(a);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(p / 2);
    }
  }
});
