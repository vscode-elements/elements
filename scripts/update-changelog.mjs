/**
 * Replace the `## [Unreleased]` header to the version number and the release date.
 */
import fs from 'fs';
import util from 'util';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const UNRELEASED_BLOCK_HEADER = '## [Unreleased]';
const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');

async function main() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
  const { version } = pkg;

  const fc = await readFile(CHANGELOG_PATH, 'utf-8');

  if (!fc.includes(UNRELEASED_BLOCK_HEADER)) {
    console.error('Missing ##[Unreleased] header!');
    process.exit(1);
  }

  const now = new Date();
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  const date = `${now.getFullYear()}-${m}-${d}`;

  const newContent = fc.replace(
    UNRELEASED_BLOCK_HEADER,
    `## [${version}] - ${date}`
  );

  await writeFile(CHANGELOG_PATH, newContent);

  console.log('Changelog updated successfully');
}

main();
