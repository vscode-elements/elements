import fs from 'fs';
import prettier from 'prettier';

fs.readFile(
  './node_modules/@vscode/codicons/src/template/mapping.json',
  'utf-8',
  async (err, data) => {
    if (err) {
      throw err;
    }

    const iconMap = JSON.parse(data);
    const keys = Object.keys(iconMap).sort();
    const raw = keys
      .map((k) => `<vscode-icon name="${k}" title="${k}"></vscode-icon>`)
      .join('\n');
    const formatted = await prettier.format(raw, {parser: 'html'});

    // eslint-disable-next-line no-undef
    console.log(formatted);
  }
);
