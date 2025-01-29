import {factor} from '../src/factor';

test('factor', () => {
  expect(() => factor(0)).toThrow();
  expect(() => factor(-2)).toThrow();
  expect(() => factor(2.5)).toThrow();
  expect(() => factor(Infinity)).toThrow();

  expect(factor(1)).toEqual([]);
  expect(factor(2)).toEqual([2]);
  expect(factor(4)).toEqual([2, 2]);
  expect(factor(9)).toEqual([3, 3]);
  expect(factor(25)).toEqual([5, 5]);
  expect(factor(29)).toEqual([29]);
  expect(factor(35)).toEqual([5, 7]);
  expect(factor(36)).toEqual([2, 2, 3, 3]);
  expect(factor(49)).toEqual([7, 7]);
  expect(factor(105)).toEqual([3, 5, 7]);
});
