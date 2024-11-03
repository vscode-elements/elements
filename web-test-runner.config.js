import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: ['./dist/**/*.test.js'],
  nodeResolve: true,
  preserveSymlinks: true,
  browsers: [playwrightLauncher({product: 'chromium'})],
  filterBrowserLogs: ({args}) =>
    !args[0].startsWith(
      'Lit is in dev mode. Not recommended for production!'
    ) && !args[0].includes('https://lit.dev/msg/change-in-update'),
};
