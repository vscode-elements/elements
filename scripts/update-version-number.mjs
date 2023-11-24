import fs from 'fs';
import util from 'util';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

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
  const newContent = fc.replace(/readonly version = '[a-z0-9-]+';/g, `readonly version = '${version}';`);

  await writeFile(BASE_CLASS_PATH, newContent);

  console.log('VscElement.ts updated successfully');
}

main();
