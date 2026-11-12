import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals';
import commonjs from '@rollup/plugin-commonjs';

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
    // ace-builds (pulled in by the source code field) ships CommonJS only
    commonjs({
      transformMixedEsModules: true
    }),
    minifyHTML(),
    terser({
      format: {
        comments: false
      }
    })]
}