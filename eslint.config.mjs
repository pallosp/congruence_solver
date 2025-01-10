import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {ignores: ['dist']},
  {
    languageOptions: {globals: globals.node},
    rules: {'prefer-const': ['error', {'destructuring': 'all'}]},
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
