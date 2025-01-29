// Command to run the benchmark:
// npx tsx benchmark/benchmark

import {Bench} from 'tinybench';

import {inverseMod} from '../src/inverse_mod';
import {solveQuadraticCongruence} from '../src/quadratic_congruence';
import {randomInt} from '../tests/helper';

const bench = new Bench();

bench.add('inverseMod 200x', () => {
  const prime = 23209;
  for (let i = 1; i <= 200; i++) inverseMod(i, prime);
});

bench.add('solveQuadraticCongruence', () => {
  const m = randomInt(1, 1e7);
  const a = randomInt(-m, m);
  const b = randomInt(-m, m);
  const c = randomInt(-m, m);
  solveQuadraticCongruence(a, b, c, m);
});

await bench.run();

console.table(bench.table());
