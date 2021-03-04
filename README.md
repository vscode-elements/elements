# VSCode Webview Elements 

For the end-user documentation, [click here](https://bendera.github.io/vscode-webview-elements/).
This project made with [LitElement](https://lit-element.polymer-project.org/) and based on a modified version of the [LitElement TypeScript starter](https://github.com/PolymerLabs/lit-element-starter-ts).

## Setup

Install dependencies:

```bash
npm ci
```

## The main NPM tasks

### Production build

```bash
npm run build
```

### Start development mode

Start TypeScript compiler in development mode and start the [@web-dev-server](https://modern-web.dev/docs/dev-server/overview/)

```bash
npm run start
```

## Generate the documentation site

```bash
npm run docs
```

## Start the documentation site development server

```bash
npm run docs:start
```

### Testing

```bash
npm run build:watch

# in another terminal instance:
npm run test:watch
```

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Testing

This sample uses Karma, Chai, Mocha, and the open-wc test helpers for testing. See the [open-wc testing documentation](https://open-wc.org/testing/testing.html) for more information.

Tests can be run with the `test` script:

```bash
npm test
```

## Run tests

```bash
npm run test
```
