import './lib/matchers';

import {gcd} from '../src/gcd';
import {inverseMod} from '../src/inverse_mod';

const MAX_SAFE_PRIME = 9007199254740881;

test('inverseMod', () => {
  // |m| = 1
  expect(inverseMod(0, 1)).toBe(0);
  expect(inverseMod(1, 1)).toBe(0);
  expect(inverseMod(-3, -1)).toBe(0);

  // gcd(a, m) > 1
  expect(inverseMod(0, 2)).toBe(NaN);
  expect(inverseMod(10, 15)).toBe(NaN);

  // gcd(a, m) = 1
  expect(inverseMod(1, 2)).toBe(1);
  expect(inverseMod(-1, 2)).toBe(1);
  expect(inverseMod(7, 15)).toBe(13);
  expect(inverseMod(-7, 10)).toBe(7);
  expect(inverseMod(-7, -10)).toBe(7);

  // https://www.wolframalpha.com/input?i=42x≡1+mod+9007199254740881
  expect(inverseMod(42, MAX_SAFE_PRIME)).toBe(5361428127821953);

  for (let m = 2; m <= 10; m++) {
    for (let i = 0; i < m; i++) {
      if (gcd(m, i) > 1) {
        expect(inverseMod(i, m)).toBe(NaN);
      } else {
        expect(i * inverseMod(i, m)).toBeCongruent(1, m);
        expect(i * inverseMod(i, -m)).toBeCongruent(1, m);
        expect(-i * inverseMod(-i, m)).toBeCongruent(1, m);
      }
    }
  }
});

function inverseModLoose(a: number, m: number): number {
  return inverseMod(a, m, false);
}

test('inverseMod, loose mode', () => {
  // |m| = 1
  expect(inverseModLoose(0, 1)).toBe(0);
  expect(inverseModLoose(1, 1)).toBe(0);
  expect(inverseModLoose(-3, -1)).toBe(0);

  // gcd(a, m) > 1
  expect(inverseModLoose(0, 2)).toBe(0);
  expect(inverseModLoose(10, 15)).toBe(2);

  // gcd(a, m) = 1
  expect(inverseModLoose(1, 2)).toBe(1);
  expect(inverseModLoose(-1, 2)).toBe(1);
  expect(inverseModLoose(7, 15)).toBe(13);
  expect(inverseModLoose(-7, 10)).toBe(7);
  expect(inverseModLoose(-7, -10)).toBe(7);

  // Big integers
  expect(42n * BigInt(inverseModLoose(42, MAX_SAFE_PRIME)))
      .toBeCongruent(1n, BigInt(MAX_SAFE_PRIME));
  expect(60n * BigInt(inverseModLoose(60, 2 ** 53)))
      .toBeCongruent(4n, 2n ** 53n);

  for (let m = 2; m <= 10; m++) {
    for (let a = 0; a < m; a++) {
      const g = gcd(a, m);
      const inv = inverseModLoose(a, m);
      expect(inv).toBeInRange(0, m / g - 1);
      expect(a * inv).toBeCongruent(g, m);
      expect(a * inverseModLoose(a, -m)).toBeCongruent(g, m);
      expect(-a * inverseModLoose(-a, m)).toBeCongruent(g, m);
    }
  }
});
