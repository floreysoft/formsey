import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import corePackage from '../formsey-core/package.json'

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
          return { id: `https://unpkg.com/@floreysoft/lit@0.3.211/esm/lit.min.js?module`, external: true };
        }
        if (id.startsWith('@formsey/core')) {
          return { id: `https://unpkg.com/@formsey/core@${corePackage.version}/esm/formsey-core.min.js?module`, external: true };
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