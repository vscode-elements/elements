import fs from 'fs';
import util from 'util';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const camelize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const kebabToPascal = (kebab) => {
  const parts = kebab.split('-');

  return parts.reduce(
    (prevVal, currentVal) => prevVal + camelize(currentVal),
    ''
  );
};

const generateFile = async (templateFile, filePath, componentName) => {
  if (fs.existsSync(filePath)) {
    console.log(`${filePath} exists, skipped`);
    return;
  }

  let template = await readFile(
    path.resolve(__dirname, templateFile),
    'utf-8'
  );

  await mkdir(dirname(filePath), { recursive: true });

  template = template.replace(/\%tagName\%/gm, componentName);
  template = template.replace(/\%className\%/gm, kebabToPascal(componentName));

  try {
    await writeFile(filePath, template);
    console.log(filePath, 'has been created');
  } catch (err) {
    throw(err);
  }
}

const main = async () => {
  const componentName = process.argv[2];

  if (!componentName) {
    console.log('Usage: npm run generate <componentname>');
    process.exit(0);
  }

  console.log('Generate', `${componentName}...`);

  try {
    await generateFile('./component-template.txt', `src/${componentName}.ts`, componentName);
    await generateFile('./test-template.txt', `src/test/${componentName}_test.ts`, componentName);
    await generateFile('./overview-md-template.txt', `docs-src/pages/${componentName}/overview.md`, componentName);
    await generateFile('./example-basic-md-template.txt', `docs-src/pages/${componentName}/examples/index.md`, componentName);
    await generateFile('./example-another-md-template.txt', `docs-src/pages/${componentName}/examples/another-example.md`, componentName);
    await generateFile('./api-md-template.txt', `docs-src/pages/${componentName}/api.md`, componentName);
    await generateFile('./install-md-template.txt', `docs-src/pages/${componentName}/install.md`, componentName);
    await generateFile('./demo-html-template.txt', `dev/${componentName}.html`, componentName);

    console.log('Done.');
    console.log('Don\'t forget to import your component in the main.ts file');
  } catch (err) {
    console.log(err);
  }
};

main();
