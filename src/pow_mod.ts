/**
 * Computes base ** exp % mod, where base ∈ ℤ, exp ∈ ℕ and mod ∈ ℤ - {0}.
 * Returns an integer between 0 and mod - 1.
 *
 * Preconditions:
 *   base² < 2**53
 *   |exp| < 2**31
 *   mod² < 2**53
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
