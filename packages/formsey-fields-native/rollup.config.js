import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './index.js',
  output: {
    file: 'esm/formsey-fields-native.min.js',
    sourcemap: false
  },
  plugins: [
    {
      resolveId(id) {
        if (id.startsWith('lit')) {
          return { id: `https://cdn.skypack.dev/lit`, external: true };
        }
        if (id.startsWith('@formsey/core')) {
          return { id: `https://unpkg.com/@formsey/core?module`, external: true };
        }
      }
    },
    resolve(),
    minifyHTML(),
    terser({
      format: {
        comments: false
      }
    })]
}