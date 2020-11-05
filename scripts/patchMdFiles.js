import fs from 'fs';
import rreaddir from 'recursive-readdir';

const processFile = (path) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const hasFm = /[\n]*[-]{3}[\n]/g.test(data);

    if (!hasFm) {
      let foundMainHeader = [];
      foundMainHeader = [...data.matchAll(/^#{1} (.*)$/gm)];

      const title = foundMainHeader.length > 0 ? foundMainHeader[0][1] : '';

      let frontMatter = '---\n';
      frontMatter += 'layout: page.11ty.cjs\n';
      frontMatter += `title: <${title}> ⌲ API\n`;
      frontMatter += '---\n\n';

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
