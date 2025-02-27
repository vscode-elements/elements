import fs from 'fs';
import util from 'util';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const BASE_CLASS_PATH = path.join(
  __dirname,
  '..',
  'src',
  'includes',
  'VscElement.ts'
);

async function main() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
  const {version} = pkg;

  const fc = await readFile(BASE_CLASS_PATH, 'utf-8');
  const re = /const VERSION = '[0-9a-z-.]+';/g;

  if (!fc.match(re)) {
    console.log('VscElement.ts version number is not found');
    process.exit(1);
  }

  const newContent = fc.replace(re, `const VERSION = '${version}';`);

  await writeFile(BASE_CLASS_PATH, newContent);

  console.log(
    `VscElement.ts version number updated successfully to ${version}`
  );
}

main();
