import fs from 'fs';

fs.readFile('./node_modules/@vscode/codicons/src/template/mapping.json', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  const iconMap = JSON.parse(data);
  const keys = Object.keys(iconMap).sort();

  keys.forEach((k) => {
    // eslint-disable-next-line no-undef
    console.log(`<vscode-icon name="${k}" title="${k}"></vscode-icon>`);
  });
});


