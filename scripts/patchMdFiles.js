import fs from 'fs';
import rreaddir from 'recursive-readdir';
import { kebabToPascal } from './utils.mjs';

const processFile = (path) => {
  if (!/api\.md$/g.test(path)) {
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const isAlreadyPatched = /---\nlayout: component.njk\n/g.test(data);

    if (!isAlreadyPatched) {
      let foundMainHeader = [];
      foundMainHeader = [...data.matchAll(/^#{1} (.*)$/gm)];

      const fullKebab = foundMainHeader.length > 0 ? foundMainHeader[0][1] : '';
      const plainKebab = fullKebab.replace('vscode-', '');
      const fullClassName = kebabToPascal(fullKebab);
      const plainClassName = kebabToPascal(plainKebab);

      let frontMatter = '---\n';
      frontMatter += 'layout: component.njk\n';
      frontMatter += `title: ${plainClassName}\n`;
      frontMatter += `tags: api\n`;
      frontMatter += `component: ${fullKebab}\n`;
      frontMatter += '---\n\n';
      frontMatter += '<!-- This file is auto-generated. Do not edit! -->\n\n';

      let fixedData = data;

      fixedData = fixedData.replace(/\\\|/g, '|');
      fixedData = fixedData.replace(`# ${fullKebab}`, `# ${fullClassName}`);

      const newData = frontMatter + fixedData;

      fs.writeFile(path, newData, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
};

rreaddir('docs-src/components', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((f) => {
    processFile(f);
  });
});
