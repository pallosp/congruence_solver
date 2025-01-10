import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {files: ['src/**/*.ts', 'tests/**/*.ts']},
  {
    languageOptions: {globals: globals.node},
    rules: {'prefer-const': ['error', {'destructuring': 'all'}]}
  },
];
