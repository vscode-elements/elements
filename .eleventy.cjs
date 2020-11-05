require('dotenv').config();

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({
    'node_modules/prismjs/themes/prism-okaidia.css': 'prism-okaidia.css',
  });
  eleventyConfig.addPassthroughCopy({'dist/bundled.js': 'bundled.js'});
  eleventyConfig.addPassthroughCopy('docs-src/docs.css');
  eleventyConfig.addPassthroughCopy('docs-src/.nojekyll');

  let conf = {
    dir: {
      input: 'docs-src',
      output: 'docs',
    },
    templateExtensionAliases: {
      '11ty.cjs': '11ty.js',
      '11tydata.cjs': '11tydata.js',
    },
  };

  if (process.env.PATH_PREFIX) {
    conf.pathPrefix = process.env.PATH_PREFIX;
  }

  return conf;
};
