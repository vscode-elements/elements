import rollupAlias from '@rollup/plugin-alias';
import {fromRollup} from '@web/dev-server-rollup';
import aliases from './aliases.config.js';

const alias = fromRollup(rollupAlias);

export default {
  files: ['./dist/test/**/*.test.js'],
  nodeResolve: true,
  preserveSymlinks: true,
  plugins: [
    alias({
      entries: aliases,
    }),
  ],
};
