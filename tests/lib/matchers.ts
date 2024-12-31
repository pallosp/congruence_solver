export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInRange(expected: number, modulus: number): CustomMatcherResult;
      toBeCongruent(expected: number, modulus: number): CustomMatcherResult;
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

  toBeCongruent(received: number, expected: number, modulus: number):
      jest.CustomMatcherResult {
        const pass = (received - expected) % modulus === 0;
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
