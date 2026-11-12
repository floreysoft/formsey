// Removes the build output that `npm run compile` (tsc) and `npm run rollup`
// write next to the TypeScript sources.
//
// tsc emits Foo.js, Foo.js.map, Foo.d.ts and Foo.d.ts.map beside every Foo.ts.
// To stay safe this script only deletes such a file when the matching .ts
// source exists, so hand-written files (rollup.config.js, ...) are never
// touched. Rollup bundles live in each package's `esm/` folder.
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED = ['.js.map', '.d.ts.map', '.d.ts', '.js'];
let removed = 0;

function clean(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      if (entry.name === 'esm' || entry.name === 'dist') {
        rmSync(path, { recursive: true, force: true });
        removed++;
      } else {
        clean(path);
      }
      continue;
    }
    const suffix = GENERATED.find(s => entry.name.endsWith(s));
    if (suffix && existsSync(join(dir, entry.name.slice(0, -suffix.length) + '.ts'))) {
      rmSync(path);
      removed++;
    }
  }
}

for (const folder of ['packages', 'demo']) {
  const path = join(root, folder);
  if (existsSync(path)) clean(path);
}
console.log(`Removed ${removed} generated files/folders.`);
