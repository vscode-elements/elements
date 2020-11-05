module.exports = function({page, collections, globals, eleventyConfig}, parentTemplate) {
  if (page.url === '/') {
    return '';
  }

  const urlParts = page.url.split('/');
  const urlBase = `/${urlParts[1]}/${urlParts[2]}`;

  return `
<nav>
  <a href="${parentTemplate.url('/')}">Home</a>
  <a href="${parentTemplate.url(urlBase + '/overview')}">Overview</a>
  <a href="${parentTemplate.url(urlBase + '/examples')}">Examples</a>
  <a href="${parentTemplate.url(urlBase + '/api')}">API</a>
  <a href="${parentTemplate.url(urlBase + '/install')}">Install</a>
</nav>`;
};
