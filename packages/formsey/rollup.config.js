import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './index.js',
  output: {
    file: 'esm/formsey.min.js',
    sourcemap: false
  },
  plugins: [
    {
      resolveId(id) {
        if (id.startsWith('lit')) {
          return { id: `https://cdn.skypack.dev/${id}`, external: true };
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