import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultClientConditions, defineConfig, type Plugin } from 'vite';

const require = createRequire(import.meta.url);
const formseyRoot = realpathSync(join(dirname(fileURLToPath(import.meta.url)), '..'));

/**
 * The source code field wraps the Ace editor (`@floreysoft/ace`), which loads
 * its language modes, themes and workers on demand from the fixed URL `/ace`.
 * This plugin serves those files from the installed `ace-builds` package.
 *
 * A production deployment has to do the equivalent: copy
 * `node_modules/ace-builds/src-min-noconflict` to `/ace` on the web server.
 */
function serveAce(): Plugin {
  // ace-builds is a dependency of @floreysoft/ace, so look it up from there.
  // With a linked floreysoft-components checkout it is not installed here.
  const acePackage = realpathSync(require.resolve('@floreysoft/ace/package.json'));
  const aceRoot = join(dirname(createRequire(acePackage).resolve('ace-builds/package.json')), 'src-min-noconflict');
  return {
    name: 'formsey-serve-ace',
    configureServer(server) {
      server.middlewares.use('/ace', (req, res, next) => {
        const file = normalize(join(aceRoot, (req.url || '').split('?')[0]));
        if (!file.startsWith(aceRoot) || !existsSync(file) || !statSync(file).isFile()) {
          return next();
        }
        res.setHeader('Content-Type', 'text/javascript');
        createReadStream(file).pipe(res);
      });
    }
  };
}

/**
 * The @floreysoft/* components are linked from the sibling repository
 * `floreysoft-components` (see "overrides" in the root package.json). Their
 * sources live outside this repository and would resolve `lit` from their own
 * node_modules, which puts a second copy of Lit on the page. This plugin
 * resolves Lit for those files from this repository instead.
 *
 * `resolve.dedupe` cannot be used for this: it would also force the Material
 * Web Components onto Lit 3, and they only work with their own Lit 2.
 */
function shareLitWithLinkedPackages(): Plugin {
  const anchor = join(formseyRoot, 'demo', 'index.html');
  return {
    name: 'formsey-share-lit',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !/^(lit|lit-html|lit-element|@lit\/reactive-element)(\/|$)/.test(source)) {
        return null;
      }
      const file = normalize(importer.split('?')[0]);
      if (file.startsWith(formseyRoot + sep) || file.includes(`${sep}node_modules${sep}`)) {
        return null;
      }
      return this.resolve(source, anchor, { ...options, skipSelf: true });
    }
  };
}

// Dev server for the Formsey playground.
//
// The @formsey/* packages are npm workspaces, so they are symlinked into
// node_modules and Vite serves their TypeScript sources directly. No separate
// compile step is needed while developing: edit a field, save, and the page
// reloads. The same holds for the linked @floreysoft/* components.
export default defineConfig({
  plugins: [shareLitWithLinkedPackages(), serveAce()],
  resolve: {
    // "npm run compile" emits .js files next to the .ts sources (that is what
    // gets published). Prefer .ts so a stale compiled file is never served.
    extensions: ['.ts', '.mjs', '.js', '.json'],
    // The @floreysoft/* packages export their TypeScript sources under this
    // condition, so they do not have to be compiled first.
    conditions: ['@floreysoft/source', ...defaultClientConditions]
  },
  build: {
    rollupOptions: {
      input: ['index.html', 'libraries.html']
    }
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      // Allow serving the linked component sources next to this repository
      allow: [formseyRoot, join(formseyRoot, '..', 'floreysoft-components')]
    }
  }
});
