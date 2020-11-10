import fs from 'fs';
import rreaddir from 'recursive-readdir';

const processFile = (path) => {
  if (!/api\.md$/g.test(path)) {
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const isAlreadyPatched = /---\nlayout: page.11ty.cjs\ntitle: <[a-z0-9\-]+> ⌲ Install\n---/g.test(data);

    if (!isAlreadyPatched) {
      let foundMainHeader = [];
      foundMainHeader = [...data.matchAll(/^#{1} (.*)$/gm)];

      const title = foundMainHeader.length > 0 ? foundMainHeader[0][1] : '';

      let frontMatter = '---\n';
      frontMatter += 'layout: page.11ty.cjs\n';
      frontMatter += `title: <${title}> ⌲ API\n`;
      frontMatter += '---\n\n';
      frontMatter += '<!-- This file is auto-generated. Do not edit! -->\n\n';

      const newData = frontMatter + data;

      fs.writeFile(path, newData, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
};

rreaddir('docs-src/pages', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((f) => {
    processFile(f);
  });
});
