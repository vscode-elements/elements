const header = require('./header.11ty.cjs');
const footer = require('./footer.11ty.cjs');
const nav = require('./nav.11ty.cjs');
const htmlspecialchars = require('./htmlspecialchars');

module.exports = function(data) {
  const {title, content} = data;
  return `
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${htmlspecialchars(title)}</title>
    <link rel="stylesheet" href="${this.url('/docs.css')}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Roboto+Mono">
    <link rel="stylesheet" href="${this.url('/prism-okaidia.css')}">
    <link rel="stylesheet" href="${this.url('/dev-assets/default-dark-theme.css')}">
    <link rel="stylesheet" href="${this.url('/dev-assets/default-high-contrast-theme.css')}">
    <link rel="stylesheet" href="${this.url('/dev-assets/default-light-theme.css')}">
    <link rel="stylesheet" href="${this.url('/dev-assets/preview-styles.css')}">
    <link rel="stylesheet" href="${this.url('/dev-assets/theme-switcher.css')}">
    <script type="module" src="${this.url('/bundled.js')}"></script>
  </head>
  <body class="vscode-light">
    ${header()}
    ${nav(data, this)}
    <div id="main-wrapper">
      <main>
        <div class="theme-switcher">
          <div class="theme-switcher-option light">
            <button value="vscode-light" type="button">Light</button>
          </div>
          <div class="theme-switcher-option dark">
            <button value="vscode-dark" type="button">Dark</button>
          </div>
          <div class="theme-switcher-option hc">
            <button value="vscode-high-contrast" type="button">High contrast</button>
          </div>
        </div>

        <script>
          (function() {
            const buttons = document.querySelectorAll('.theme-switcher-option button');

            Array.from(buttons).forEach(element => {
              element.addEventListener('click', event => {
                document.body.classList.remove(
                  'vscode-light',
                  'vscode-dark',
                  'vscode-high-contrast'
                );
                document.body.classList.add(event.target.value);
              });
            });
          })();
        </script>
        ${content}
      </main>
    </div>
    ${footer()}
  </body>
</html>`;
};
