import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './index.js',
  output: {
    file: 'esm/formsey-fields-vaadin.min.js',
    sourcemap: false
  },
  plugins: [
    {
      resolveId(id, importer) {
        if (id.startsWith('lit-element') || id.startsWith('lit-html')) {
          console.log("Import "+id+" from "+importer)
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