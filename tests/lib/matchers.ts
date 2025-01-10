/* eslint-disable @typescript-eslint/no-namespace */

export {}

declare global {
  namespace jest {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    interface Matchers<R> {
      toBeInRange(expected: number, modulus: number): CustomMatcherResult;
      toBeCongruent(expected: number, modulus: number): CustomMatcherResult;
      toBeCongruent(expected: bigint, modulus: bigint): CustomMatcherResult;
      toBeStrictlyAscending(): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeInRange(received: number, min: number, max: number):
      jest.CustomMatcherResult {
        const pass = min <= received && received <= max;
        return {
          pass,
          message: () => `Expected ${received}${pass ? ' not' : ''} to be ` +
              `in the [${min}..${max}] range`
        };
      },

  toBeCongruent(
      received: number|bigint, expected: number|bigint, modulus: number|bigint):
      jest.CustomMatcherResult {
        // @ts-expect-error Can't rule out mixing number and bigint
        let remainder1 = received % modulus;
        if (remainder1 < 0) remainder1 += modulus;
        // @ts-expect-error Can't rule out mixing number and bigint
        let remainder2 = expected % modulus;
        if (remainder2 < 0) remainder2 += modulus;
        const pass = remainder1 === remainder2;
        return {
          pass,
          message: () => `Expected ${received}${pass ? ' not' : ''} to be ` +
              `congruent to ${expected} (mod ${modulus})`
        };
      },

  toBeStrictlyAscending(received: readonly number[]): jest.CustomMatcherResult {
    const pass = received.every((el, i) => i === 0 || received[i - 1] < el);
    return {
      pass,
      message: () => `Expected ${received}${pass ? ' not' : ''} to be ` +
          `in strictly ascending order`
    };
  }
});
