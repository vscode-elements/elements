import fs from 'node:fs';
import util from 'node:util';
import path, {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateVsCodeCustomElementData} from 'custom-element-vs-code-integration';

const readFile = util.promisify(fs.readFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const fc = await readFile(
    path.join(__dirname, '..', 'custom-elements.json'),
    'utf-8'
  );
  const manifest = JSON.parse(fc);

  const options = {};

  generateVsCodeCustomElementData(manifest, options);
}

main();
