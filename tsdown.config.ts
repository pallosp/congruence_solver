import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'neutral',
  target: 'es2020',
  dts: true,
  minify: true,
  sourcemap: true,
  publint: true,
});
