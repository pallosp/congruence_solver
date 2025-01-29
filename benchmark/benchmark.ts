// Command to run the benchmark:
// npx tsx benchmark/benchmark

import {Bench} from 'tinybench';

import {factor} from '../src/factor';
import {inverseMod} from '../src/inverse_mod';
import {solveQuadraticCongruence} from '../src/quadratic_congruence';
import {randomInt} from '../tests/helper';

const bench = new Bench();

bench.add('inverseMod 1000x', () => {
  const prime = 23209;
  for (let i = 1; i <= 1000; i++) inverseMod(i, prime);
});

bench.add('solveQuadraticCongruence', () => {
  const m = randomInt(1, 1e7);
  const a = randomInt(-m, m);
  const b = randomInt(-m, m);
  const c = randomInt(-m, m);
  solveQuadraticCongruence(a, b, c, m);
});

bench.add('factor 10k..11k', () => {
  for (let i = 10000; i < 11000; i++) factor(i);
});

await bench.run();

console.table(bench.table());
