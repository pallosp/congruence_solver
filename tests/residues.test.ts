import './lib/matchers';

import {ALL_RESIDUES, intersectResidues, NO_RESIDUES} from '../src/residues';

import {randomInt} from './helper';

test('intersectResidues', () => {
  // Zero residue classes to 'intersect'
  expect(intersectResidues()).toEqual(ALL_RESIDUES);

  // One residue classes to 'intersect'
  expect(intersectResidues({res: [1, 2], mod: 3}))
      .toEqual({res: [1, 2], mod: 3});

  // modulo 0
  expect(intersectResidues(ALL_RESIDUES, {res: [0], mod: 0}))
      .toEqual(NO_RESIDUES);

  // modulo 1
  expect(intersectResidues(NO_RESIDUES, ALL_RESIDUES)).toEqual(NO_RESIDUES);
  expect(intersectResidues(ALL_RESIDUES, ALL_RESIDUES)).toEqual(ALL_RESIDUES);

  // x ≡ 2 (mod 3), x ≡ 3 (mod 5)
  // gcd(moduli) = 1
  expect(intersectResidues({res: [2], mod: 3}, {res: [3], mod: 5}))
      .toEqual({res: [8], mod: 15});

  // x ≡ 1 (mod 6), x ≡ 3 (mod 10)
  // gcd(moduli) > 1
  expect(intersectResidues({res: [1], mod: 6}, {res: [3], mod: 10}))
      .toEqual({res: [13], mod: 30});

  // x ≡ 3 (mod 4), x ≡ 1 (mod 2)
  expect(intersectResidues({res: [3], mod: 4}, {res: [1], mod: 2}))
      .toEqual({res: [3], mod: 4});

  // x ≡ -5 (mod 6), x ≡ -7 (mod -10)
  // Negative coefficients, gcd(moduli) > 1
  expect(intersectResidues({res: [-5], mod: 6}, {res: [-7], mod: -10}))
      .toEqual({res: [13], mod: 30});

  // x ≡ 2 (mod 6), x ≡ 3 (mod 6)
  // no solution
  expect(intersectResidues({res: [2], mod: 6}, {res: [3], mod: 6}))
      .toEqual(NO_RESIDUES);

  // x ≡ 1∨2 (mod 3), x ≡ 3∨4 (mod 5)
  // multiple residues
  expect(intersectResidues({res: [1, 2], mod: 3}, {res: [-1, -2], mod: -5}))
      .toEqual({res: [4, 8, 13, 14], mod: 15});

  expect(intersectResidues(
             {res: [-1], mod: 2}, {res: [-1], mod: 3}, {res: [-1], mod: 4},
             {res: [-1], mod: 5}, {res: [-1], mod: 6}))
      .toEqual({res: [59], mod: 60});
});

test('intersectResidues, random', () => {
  for (let i = 0; i < 100; i++) {
    const mod1 = randomInt(-5, 20);
    const mod2 = randomInt(-5, 20);
    const res1: number[] = [];
    for (let j = 0; j < mod1; j++)
      if (Math.random() < 0.25) res1.push(j);
    const res2: number[] = [];
    for (let j = 0; j < mod2; j++)
      if (Math.random() < 0.25) res2.push(j);

    const {res, mod} =
        intersectResidues({res: res1, mod: mod1}, {res: res2, mod: mod2});

    if (res.length > 0) {
      expect(res).toBeStrictlyAscending();
      expect(mod).toBeCongruent(0, mod1);
      expect(mod).toBeCongruent(0, mod2);
      for (const r of res) {
        expect(r).toBeInRange(0, mod - 1);
        expect(res1).toContain(r % mod1);
        expect(res2).toContain(r % mod2);
      }
    }

    let numSolutions = 0;
    for (let r = 0; r < mod; r++)
      if (res1.includes(r % mod1) && res2.includes(r % mod2)) numSolutions++;
    expect(res.length).toBe(numSolutions);
  }
});
