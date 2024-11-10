/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';
import {directoryIndexPlugin} from '@bendera/wds-plugin-directory-index';

export default {
  appIndex: 'dev/index.html',
  nodeResolve: true,
  open: true,
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
    directoryIndexPlugin(),
  ],
};
