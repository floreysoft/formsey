import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './index.js',
  output: {
    file: 'esm/formsey-core.min.js',
    sourcemap: false
  },
  plugins: [
    {
      resolveId(id, importer) {
        if (id.startsWith('lit-element') || id.startsWith('lit-html')) {
          return { id: `https://unpkg.com/@floreysoft/lit@0.3.211/esm/lit.min.js?module`, external: true };
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