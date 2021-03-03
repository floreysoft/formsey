import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './index.js',
  output: {
    file: 'esm/formsey-core.min.js',
    sourcemap: false
  },
  plugins: [
    {
      resolveId(id) {
        if (id.startsWith('lit')) {
          return { id: `https://cdn.skypack.dev/lit`, external: true };
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