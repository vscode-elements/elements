/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {visualizer} from 'rollup-plugin-visualizer';
import * as minify from 'minify-html-literals';
import {createFilter} from 'rollup-pluginutils';

function minifyHTML(options = {}) {
  if (!options.minifyHTMLLiterals) {
    options.minifyHTMLLiterals = minify.minifyHTMLLiterals;
  }

  if (!options.filter) {
    options.filter = createFilter(options.include, options.exclude);
  }

  const minifyOptions = options.options || {};

  return {
    name: 'minify-html-literals',
    transform(pluginContext, code, id) {
      if (options.filter(id)) {
        try {
          return options.minifyHTMLLiterals(code, {
            ...minifyOptions,
            fileName: id,
          });
        } catch (error) {
          // check if Error ese treat as string
          const message = error instanceof Error ? error.message : error;

          if (options.failOnError) {
            pluginContext.error(message);
          } else {
            pluginContext.warn(message);
          }
        }
      }
    },
  };
}

export default {
  input: 'dist/main.js',
  output: {
    file: 'dist/bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    minifyHTML(),
    replace({
      preventAssignment: true,
      values: {'Reflect.decorate': 'undefined'},
    }),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
      format: {
        comments: false,
      },
    }),
    visualizer(),
  ],
};
