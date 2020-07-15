import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';

const baseConfig = createBasicConfig({
  nodeResolve: { browser: true, dedupe: ['lit-html'] },
  babel: true,
  terser: { exclude: ['node_modules*'] },
  html: false,
  polyfillsLoader: false,
  workbox: false,
  developmentMode: process.env.ROLLUP_WATCH === 'true'
});

export default merge(baseConfig, {
  input: 'packages/formsey-fields-native/basic.ts',
  output: {
    dir: 'output',
    sourcemap: false
  },
  plugins: [typescript()]
});