/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import rollupAlias from '@rollup/plugin-alias';
import {legacyPlugin} from '@web/dev-server-legacy';
import {fromRollup} from '@web/dev-server-rollup';
import aliases from './aliases.config.js';

const alias = fromRollup(rollupAlias);

export default {
  appIndex: 'dev/index.html',
  nodeResolve: true,
  open: true,
  preserveSymlinks: true,
  plugins: [
    alias({
      entries: aliases,
    }),
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
