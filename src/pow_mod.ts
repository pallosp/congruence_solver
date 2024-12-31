/**
 * Computes (base ** exp) % mod. Returns an integer between 0 and mod - 1.
 *
 * Preconditions:
 *   base, exp, mod ∈ ℤ
 *   base² < 2**53
 *   0 ≤ exp < 2**31
 *   0 < mod² < 2**53
 */
export function powMod(base: number, exp: number, mod: number): number {
  let result = 1;
  while (exp > 0) {
    if (exp % 2) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1;
  }
  return result < 0 ? result + mod : result;
}
