export default {
  files: ['./dist/**/*.test.js'],
  nodeResolve: true,
  preserveSymlinks: true,
  filterBrowserLogs: ({args}) =>
    !args[0].startsWith(
      'Lit is in dev mode. Not recommended for production!'
    ) && !args[0].includes('https://lit.dev/msg/change-in-update'),
};
