import js from '@eslint/js';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['coverage', 'dist']),
  {
    languageOptions: {globals: globals.node},
    rules: {'prefer-const': ['error', {destructuring: 'all'}]},
  },
  js.configs.recommended,
  tseslint.configs.recommended,
]);
