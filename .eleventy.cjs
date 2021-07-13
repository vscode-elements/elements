require('dotenv').config();

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  const markdownIt = require('markdown-it');
  const githubHeadings = require('@gerhobbelt/markdown-it-github-headings');

  const mdOpts = {
    html: true,
  };
  const mdLib = markdownIt(mdOpts).use(githubHeadings, {
    prefixHeadingIds: false,
  });

  eleventyConfig.setLibrary('md', mdLib);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({
    'node_modules/vscode-codicons/dist/codicon.css': 'codicon.css',
    'node_modules/vscode-codicons/dist/codicon.ttf': 'codicon.ttf',
  });
  eleventyConfig.addPassthroughCopy({'dist/bundled.js': 'bundled.js'});
  eleventyConfig.addPassthroughCopy('docs-src/docs.css');
  eleventyConfig.addPassthroughCopy('docs-src/.nojekyll');
  eleventyConfig.addPassthroughCopy('dev-assets');

  eleventyConfig.addCollection('component', function (collectionApi) {
    return collectionApi
      .getFilteredByTag('component')
      .sort((firstEl, secondEl) => {
        if (firstEl.data.title > secondEl.data.title) {
          return 1;
        } else if (firstEl.data.title < secondEl.data.title) {
          return -1;
        } else {
          return 0;
        }
      });
  });

  eleventyConfig.addCollection('forms', function (collectionApi) {
    return collectionApi
      .getFilteredByTag('forms')
      .sort((firstEl, secondEl) => {
        if (firstEl.data.weight > secondEl.data.weight) {
          return 1;
        } else if (firstEl.data.weight < secondEl.data.weight) {
          return -1;
        } else {
          return 0;
        }
      });
  });

  eleventyConfig.setBrowserSyncConfig({
    notify: true,
    open: true,
  });

  let conf = {
    dir: {
      input: 'docs-src',
      output: 'docs',
    },
  };

  if (process.env.PATH_PREFIX && process.env.NODE_ENV !== 'development') {
    conf.pathPrefix = process.env.PATH_PREFIX;
  }

  return conf;
};
