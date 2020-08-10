import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  external: ['lit-element', 'lit-html'],
  input: './index.js',
  output: {
    file: 'esm/formsey-fields-native.min.js',
    sourcemap: false
  },
  plugins: [
    resolve(),
    minifyHTML(),
    terser({
      format: {
        comments: false
      }
    })]
}