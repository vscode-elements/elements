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
    <script type="module" src="${this.url('/bundled.js')}"></script>
  </head>
  <body>
    ${header()}
    ${nav(data, this)}
    <div id="main-wrapper">
      <main>
        ${content}
      </main>
    </div>
    ${footer()}
  </body>
</html>`;
};
