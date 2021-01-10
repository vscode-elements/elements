module.exports = function({page, collections, globals, eleventyConfig}, parentTemplate) {
  if (page.url === '/') {
    return '';
  }

  const urlParts = page.url.split('/');
  const urlBase = `/${urlParts[1]}/${urlParts[2]}`;

  const activeClass = (slug) => {
    return page.url.includes(slug) ? ' class="active"' : '';
  };

  return `
<nav>
  <a href="${parentTemplate.url('/')}">Home</a>
  <a href="${parentTemplate.url(urlBase + '/examples')}"${activeClass('examples')}>Examples</a>
  <a href="${parentTemplate.url(urlBase + '/api')}"${activeClass('api')}>API</a>
</nav>`;
};
