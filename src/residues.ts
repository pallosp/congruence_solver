/**
 * Represents a set of residue classes with a common modulus.
 * Each residue is an integer in the range [0, mod - 1], inclusive.
 * The residue list is sorted in ascending order.
 *
 * For example, {res: [1, 2], mod: 5} denotes the set of integers n
 * such that n ≡ 1 (mod 5) or n ≡ 2 (mod 5).
 */
export interface ResidueClasses {
  readonly res: ReadonlyArray<number>;
  readonly mod: number;
}

/**
 * Empty residue class set.
 */
export const NO_RESIDUES: ResidueClasses = {
  res: [],
  mod: 1
};

/**
 * Residue classes representing all integers.
 */
export const ALL_RESIDUES: ResidueClasses = {
  res: [0],
  mod: 1
};
