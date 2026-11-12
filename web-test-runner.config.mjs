import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';

// Runs the *.spec.ts files of all packages in a real (headless) Chrome.
// The TypeScript sources are transpiled on the fly, no compile step needed.
export default {
  files: 'packages/**/test/*.spec.ts',
  // The linked @floreysoft/* sources live in the sibling repository: serve
  // from the common parent directory so that they are inside the server root
  rootDir: fileURLToPath(new URL('..', import.meta.url)),
  nodeResolve: {
    // Resolve '@formsey/core/Registry' and friends to their .ts sources
    // The linked @floreysoft/* components export their sources under this condition
    exportConditions: ['@floreysoft/source'],
    extensions: ['.ts', '.mjs', '.js']
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2022',
      // Picks up experimentalDecorators / useDefineForClassFields
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url))
    })
  ],
  testFramework: {
    config: { timeout: 5000 }
  }
};
