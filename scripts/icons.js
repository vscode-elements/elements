const fs = require('fs');
const util = require('util');

const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

async function getIconNames() {
  const list = await readDir('../vscode-icons/icons/light');

  return list.map((val) => {
    return val.replace(/\.svg$/, '');
  });
}

function getCssString(iconNames) {
  const iconCss = (icon) => {
    let css = '';

    ['light', 'dark', 'high-contrast'].forEach((theme) => {
      const themeDir = theme === 'dark' || theme === 'high-contrast' ? 'dark' : 'light';
      css += `body.vscode-${theme} .vscode-icon.${icon}{background-image:url(icons/${themeDir}/${icon}.svg);}`;
    });

    return css;
  }

  return iconNames.reduce(
    (acc, val) => acc + iconCss(val),
    ''
  );
}

async function main() {
  const iconNames = await getIconNames();

  try {
    await writeFile('dist/icons.css', getCssString(iconNames));
  } catch(e) {
    console.log(e);
  }
}

main();
