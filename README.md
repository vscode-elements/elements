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

### Generate the documentation site

```bash
npm run docs
```

### Start the documentation site development server

```bash
npm run docs:start
```

### Testing

```bash
npm run build:watch

# in another terminal instance:
npm run test:watch
```

### Run tests

```bash
npm run test
```
