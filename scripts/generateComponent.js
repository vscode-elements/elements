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

const pascalToKebab = (s) =>
  s.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();

const kebabToPascal = (kebab) => {
  const parts = kebab.split('-');

  return parts.reduce(
    (prevVal, currentVal) => prevVal + camelize(currentVal),
    ''
  );
};

const generateFile = async (templateFile, filePath, templateVars) => {
  if (fs.existsSync(filePath)) {
    console.log(`${filePath} exists, skipped`);
    return;
  }

  const {className, componentName, tagName} = templateVars;

  let template = await readFile(path.resolve(__dirname, templateFile), 'utf-8');

  await mkdir(dirname(filePath), {recursive: true});

  template = template.replace(/%tagName%/gm, tagName);
  template = template.replace(/%className%/gm, className);
  template = template.replace(/%componentName%/gm, componentName);

  try {
    await writeFile(filePath, template);
    console.log(filePath, 'has been created');
  } catch (err) {
    throw err;
  }
};

const main = async () => {
  const componentName = process.argv[2];

  if (!componentName) {
    console.log('Usage: npm run generate <componentname>');
    process.exit(0);
  }

  console.log('Generate', `${componentName}...`);

  const className = `Vscode${camelize(componentName)}`;
  const tagName = `vscode-${pascalToKebab(componentName)}`;

  const templateVars = {
    className,
    componentName,
    tagName,
  };

  try {
    await generateFile(
      './component.template.ts',
      `src/${tagName}.ts`,
      templateVars
    );
    await generateFile(
      './component.test.template.ts',
      `src/test/${tagName}.test.ts`,
      templateVars
    );
    await generateFile(
      './index.template.md',
      `docs-src/components/${tagName}/index.md`,
      templateVars
    );
    await generateFile(
      './api.template.md',
      `docs-src/components/${tagName}/api.md`,
      templateVars
    );
    await generateFile(
      './dev-page.template.html',
      `dev/${tagName}.html`,
      templateVars
    );

    console.log('Done.');
    console.log("Don't forget to import your component in the main.ts file");
    console.log("Don't forget to import your component in the main.ts file");
  } catch (err) {
    console.log(err);
  }
};

main();
