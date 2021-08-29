/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import minifyHTML from 'rollup-plugin-minify-html-literals';

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
