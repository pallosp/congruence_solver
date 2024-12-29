/**
 * Returns the greatest common divisor of a and b, or 0 if a = b = 0.
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return Math.abs(a);
}
