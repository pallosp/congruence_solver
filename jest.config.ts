import type {Config} from 'jest';

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
} satisfies Config;
