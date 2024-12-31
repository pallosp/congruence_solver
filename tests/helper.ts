import assert from 'minimalistic-assert';

export function isPowerOfTwo(x: number): boolean {
  return Number.isInteger(Math.log2(x));
}

/**
 * Returns a random integer in the [min, max] closed interval.
 */
export function randomInt(min: number, max: number): number {
  assert(Number.isInteger(min) && Number.isInteger(max) && max >= min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random item of the array.
 */
export function randomItem<T>(array: T[]): T {
  assert(array.length > 0);
  return array[Math.floor(Math.random() * array.length)];
}
