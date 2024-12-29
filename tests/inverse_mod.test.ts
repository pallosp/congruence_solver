import {expect, test} from '@jest/globals';

import {gcd} from '../src/gcd';
import {inverseMod} from '../src/inverse_mod';

test('inverseMod', () => {
  // |m| = 1
  expect(inverseMod(0, 1)).toBe(0);
  expect(inverseMod(1, 1)).toBe(0);
  expect(inverseMod(-3, -1)).toBe(0);

  // gcd(a, m) > 1
  expect(inverseMod(0, 2)).toBe(NaN);
  expect(inverseMod(10, 15)).toBe(NaN);

  expect(inverseMod(1, 2)).toBe(1);
  expect(inverseMod(-1, 2)).toBe(1);
  expect(inverseMod(7, 15)).toBe(13);
  expect(inverseMod(-7, 10)).toBe(7);
  expect(inverseMod(-7, -10)).toBe(7);

  for (let m = 2; m <= 10; m++) {
    for (let i = 0; i < m; i++) {
      if (gcd(m, i) > 1) {
        expect(inverseMod(i, m)).toBe(NaN);
      } else {
        expect((i * inverseMod(i, m)) % m).toBe(1);
        expect((i * inverseMod(i, -m)) % m).toBe(1);
        expect(((m - i) * inverseMod(-i, m)) % m).toBe(1);
      }
    }
  }
});

test('inverseMod benchmark', () => {
  const prime = 23209;
  let sum = 0;
  const start = performance.now();
  for (let i = 1; i < prime; i++) sum += inverseMod(i, prime);
  const elapsed = performance.now() - start;
  console.info(`Computed the inverse of the all residues mod ${prime} in ${
      elapsed.toFixed(1)} ms`);
  expect(sum).toBe(prime * (prime - 1) / 2);
});
