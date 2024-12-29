import {expect, test} from '@jest/globals';

import {gcd} from '../src/gcd';

test('gcd', () => {
  expect(gcd(0, 0)).toBe(0);

  expect(gcd(0, 3)).toBe(3);
  expect(gcd(4, 0)).toBe(4);
  expect(gcd(0, -5)).toBe(5);
  expect(gcd(-6, 0)).toBe(6);

  expect(gcd(1, 1)).toBe(1);
  expect(gcd(1, 10)).toBe(1);
  expect(gcd(10, 1)).toBe(1);

  expect(gcd(48, 78)).toBe(6);
  expect(gcd(-48, 78)).toBe(6);
  expect(gcd(48, -78)).toBe(6);
  expect(gcd(-48, -78)).toBe(6);
});
