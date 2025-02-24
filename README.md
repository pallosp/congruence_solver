# Congruence Solver

[![NPM package](https://img.shields.io/npm/v/congruence-solver.svg?style=flat)](https://npmjs.org/package/congruence-solver "View this project on npm")
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

**Congruence Solver** is a TypeScript library designed to solve linear and quadratic congruences, as well as systems of such equations. Unlike most other solvers, it gives the solutions with the least possible modulus, which in effect minimizes the number of distinct residues.

The library also provides access to underlying modular arithmetic utilities, including algorithms for calculating modular inverses and modular square roots.

## Examples

Try the examples below on [CodePen](https://codepen.io/Peter-Pallos/pen/KwKMJOV)

### Quadratic congruence

`x² + 18x ≡ 0 (mod 27)`

```typescript
import {solveQuadraticCongruence} from 'congruence-solver';

const {res, mod} = solveQuadraticCongruence(1, 18, 0, 27);
console.log(`x ≡ ${res} (mod ${mod})`);  // x ≡ 0 (mod 9)
```

For comparison, [WolframAlpha](https://www.wolframalpha.com/input?i=x%C2%B2%2B18x%E2%89%A10+%28mod+27%29) returns `x ≡ 0 (mod 27)`, `x ≡ 9 (mod 27)`, `x ≡ 18 (mod 27)`

### Pre-factored modulus

If the prime factors of the modulus are known, they can be passed as an `Array` of numbers in increasing order.

`3x² + 4x + 5 ≡ 0 (mod 2·2·3·5)`

```typescript
import {solveQuadraticCongruence} from 'congruence-solver';

const inputModFactors = [2, 2, 3, 5];
const {res, mod} = solveQuadraticCongruence(3, 4, 5, inputModFactors);
console.log(`x ≡ ${res} (mod ${mod})`);  // x ≡ 7,25 (mod 30)
```

### Congruence system

`3x + 1 ≡ 0 (mod 10)`  
`4x + 3 ≡ 0 (mod 15)`  
`x² + x + 2 ≡ 0 (mod 4)`

```typescript
import {intersectResidues, solveLinearCongruence, solveQuadraticCongruence} from 'congruence-solver';

const {res, mod} = intersectResidues(
    solveLinearCongruence(3, 1, 10),
    solveLinearCongruence(4, 3, 15),
    solveQuadraticCongruence(1, 1, 2, 4));

console.log(`x ≡ ${res} (mod ${mod})`);  // x ≡ 33 (mod 60)
```

### Primitives

```typescript
import {factor, gcd, inverseMod, powMod, sqrtModPrime} from 'congruence-solver';

const LOOSE = false;

console.log(`Prime factors of 315: ${factor(315)}`);              // 3,3,5,7
console.log(`gcd(121, 143) = ${gcd(121, 143)}`);                  // 11
console.log(`2^-1 ≡ ${inverseMod(2, 5)} (mod 5)`);                // 3
console.log(`10^-1 (mod 15) is ${inverseMod(10, 15)}`);           // NaN
console.log(`4·${inverseMod(4, 6, LOOSE)} ≡ gcd(4, 6) (mod 6)`);  // 2
console.log(`3⁸ ≡ ${powMod(3, 8, 7)} (mod 7)`);                   // 1
console.log(`√3 (mod 11) = ±${sqrtModPrime(3, 11)}`);             // ±5
```
