# VSCode Elements

For the end-user documentation, [click here](https://vscode-elements.github.io).

This documentation is intended for developers who would like to contribute to or modify the code on their own.

VSCode Elements is based on the [Lit](https://lit.dev/) library. The local development environment requires `NodeJS 22` or newer.

## Setup

Install dependencies:

```bash
npm ci
```

## The scripts defined in `package.json`

Each script can be run using the `npm run <script_name>` format. Wireit is used to cache the script
results.

### build

Build everything. This command generates all of the files that will be included in the package.

### built:ts

Transpiles TypeScript files into standard ES6 JavaScript, without minification. These files can then be imported and optimized in the end-user application.

### build:watch

Same as the above, but the TypeScript compiler run in watch mode and recompile the modified files
automatically.

### clean

Removes the generated files.

## lint

Code style check with [ESLint](https://eslint.org/).

## lint:fix

Automatically fixing code style issues.

## prettier

Checks code formatting with [Prettier](https://prettier.io/).

## prettier:fix

Automatically fixing code format issues.

## analyze

Generates a [custom elements manifest file](https://custom-elements-manifest.open-wc.org/). This file is shipped with the package, and it is the file on which the API view in the documentation site is based.

## serve

Start the [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) development server.

## start

Start the development server and the TypeScript compiler in watch mode, then opens the default
browser. This is the most used command during the development.
