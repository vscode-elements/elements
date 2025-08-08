import {playwrightLauncher} from '@web/test-runner-playwright';

export default {
  files: ['./dist/**/*.test.js'],
  nodeResolve: true,
  preserveSymlinks: true,
  browsers: [playwrightLauncher({product: 'chromium'})],
  testsFinishTimeout: 10000,
  filterBrowserLogs: ({args}) =>
    !(
      typeof args[0] === 'string' &&
      (args[0]?.startsWith(
        'Lit is in dev mode. Not recommended for production!'
      ) ||
        args[0]?.startsWith('[VSCode Elements]') ||
        args[0]?.includes('https://lit.dev/msg/change-in-update'))
    ),
};
