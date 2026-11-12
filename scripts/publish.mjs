// Publishes every public package under packages/ to npm.
//
//   node scripts/publish.mjs [--dry-run] [--otp=123456] [other npm publish flags]
//
// Packages whose current version is already on the registry are skipped, so
// the script can simply be run again after a failure (expired one-time
// password, missing rights for one package, ...). Build first: the script
// publishes whatever is in the package folders.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const flags = process.argv.slice(2);
// npm is a .cmd shim on Windows and needs a shell there
const shell = process.platform === 'win32';

function isPublished(name, version) {
  try {
    const out = execFileSync('npm', ['view', `${name}@${version}`, 'version'], { encoding: 'utf8', shell, stdio: ['ignore', 'pipe', 'ignore'] });
    return out.trim() === version;
  } catch {
    return false;
  }
}

const published = [], skipped = [], failed = [];
for (const dir of readdirSync(join(root, 'packages')).sort()) {
  const folder = join(root, 'packages', dir);
  const manifest = join(folder, 'package.json');
  if (!existsSync(manifest)) continue;
  const { name, version, private: isPrivate } = JSON.parse(readFileSync(manifest, 'utf8'));
  const id = `${name}@${version}`;
  if (isPrivate) continue;
  if (isPublished(name, version)) {
    skipped.push(id);
    continue;
  }
  console.log(`\n--- ${id}`);
  const result = spawnSync('npm', ['publish', '--access', 'public', ...flags], { cwd: folder, stdio: 'inherit', shell });
  (result.status === 0 ? published : failed).push(id);
}

console.log(`\nPublished: ${published.length ? published.join(', ') : 'none'}`);
if (skipped.length) console.log(`Already on npm: ${skipped.join(', ')}`);
if (failed.length) {
  console.log(`FAILED: ${failed.join(', ')}`);
  process.exit(1);
}
