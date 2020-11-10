module.exports = function(data) {
  const versionInfo = process.env.SHOW_VERSION_INFO == 'true' ? `<span class="pkg-version">Current version: ${data.pkg.version}</span>` : '';

  return `
<header>
  <h1>My Library</h1>
  <h2>A web component library just for me.</h2>
  ${versionInfo}
</header>`;
};
