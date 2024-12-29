import assert from 'minimalistic-assert';

/**
 * Returns the prime factors of the given positive integer in increasing order.
 */
export function factor(n: number): number[] {
  assert(n > 0 && n % 1 === 0);
  const factors: number[] = [];
  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }
  while (n % 3 === 0) {
    factors.push(3);
    n /= 3;
  }
  for (let i = 5; i * i <= n;) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
    i += 2;
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
    i += 4;
  }
  if (n > 1) factors.push(n);
  return factors;
}
