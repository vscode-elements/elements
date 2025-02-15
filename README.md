# VSCode Elements

For the end-user documentation, [click here](https://vscode-elements.github.io).

This documentation is intended for developers who would like to contribute to or modify the code on their own.

VSCode Elements is based on the [Lit](https://lit.dev/) library. The local development environment requires `NodeJS 22` or newer. If you want to use a local copy of the library in your codebase, you can use the `npm link` command. First, navigate to the VSCode Elements directory and run:

```bash
npm link
```

Then, go to the library where you want to use it and run:

```bash
npm link @vscode-elements/elements
```

> [!WARNING]
> 
> Multiple packages must be linked with a single command. For example:
> 
> ```bash
> npm link @vscode-elements/elements @vscode-elements/webview-playground
> ```

Don't forget to run the build script before using the package.

## Setup

Install dependencies:

```bash
npm ci
```

## The scripts defined in `package.json`

Each script can be run using the `npm run <script_name>` format. Wireit is used to cache the script
results.

### build

Build everything. This command generates all the files that will be included in the package. These include:

- Transpiled JavaScript files with type definitions and source maps.
- The custom elements manifest file.
- VSCode custom data files.
- The entire library as a single, minified JavaScript file.

### built:ts

Transpiles TypeScript files into standard ES6 JavaScript, without minification. These files can then be imported and optimized in the end-user application.

### build:watch

Same as the above, but the TypeScript compiler run in watch mode and recompile the modified files
automatically.

### clean

Removes the generated files.

### lint

Code style check with [ESLint](https://eslint.org/).

### lint:fix

Automatically fixing code style issues.

### prettier

Checks code formatting with [Prettier](https://prettier.io/).

### prettier:fix

Automatically fixing code format issues.

### analyze

Generates a [custom elements manifest file](https://custom-elements-manifest.open-wc.org/). This file is shipped with the package, and it is the file on which the API view in the documentation site is based.

### serve

Start the [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) development server.

### start

Start the development server and the TypeScript compiler in watch mode, then opens the default
browser. This is the most used command during the development.

### test

Compiles the test files and runs them. Because tests are written in TypeScript, a transpilation step
is also needed.

### test:coverage

Same as above, but it also generates coverage.

### test:watch

Watches the transpiled test files and runs them if any changes are detected. This script does not compile the test files; the `build:watch` script needs to be run in a separate terminal. However, it can also be run in parallel with the `start` script instead of build:watch.

### checksize

Displays the file size of the bundled library (dist/bundled.js) in bytes.

### icons

Generates icon list for the documentation site

### vscode-data

Generates HTML and CSS [custom data format](https://code.visualstudio.com/blogs/2020/02/24/custom-data-format) for VSCode code completions.