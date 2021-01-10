module.exports = function(data) {
  const versionInfo = process.env.SHOW_VERSION_INFO == 'true' ? `<span class="pkg-version">Current version: ${data.pkg.version}</span>` : '';

  return `
<header>
  <h1>VSCode Webview Elements</h1>
  <h2>Web component library for VSCode extension development.</h2>
  ${versionInfo}
</header>`;
};
