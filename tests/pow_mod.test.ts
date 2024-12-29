import {expect, test} from '@jest/globals';

import {powMod} from '../src/pow_mod';

test('powMod', () => {
  expect(powMod(0, 0, 7)).toBe(1);
  expect(powMod(5, 0, 7)).toBe(1);
  expect(powMod(0, 5, 11)).toBe(0);
  expect(powMod(1, 7, 13)).toBe(1);
  expect(powMod(-1, 7, 17)).toBe(16);
  expect(powMod(-1, 8, 17)).toBe(1);

  expect(powMod(3, 1, 7)).toBe(3);
  expect(powMod(3, 2, 7)).toBe(2);
  expect(powMod(3, 3, 7)).toBe(6);
  expect(powMod(3, 4, 7)).toBe(4);
  expect(powMod(3, 5, 7)).toBe(5);
  expect(powMod(3, 6, 7)).toBe(1);
});
