---
layout: page.njk
title: Getting Started
tags: post
---

# Getting started

VSCode Webview Elements is aimed to provide web components for extension development that fit the 
VSCode's UI design system. You can use these web components with the [Webview API](https://code.visualstudio.com/api/extension-guides/webview).

## VSCode Webview UI Toolkit vs VSCode Webview Elements

The [VSCode Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit) is the official component library for creating UI in the webview. Although VSCode Webview Elements seems redundant it already existed when the VSCode Webview UI Toolkit was released. On the other hand, it is still worth considering using it. VSCode Webview Elements are "reverse-engineered" components, which means, it strives to mimic pixel perfectly the VSCode's "native" lookout, while the Webview UI Toolkit just looks similar. Another benefit is the wider choice of components.

## Installation

You can access the library as NPM package:

```bash
npm i @bendera/vscode-webview-elements
```

## Usage

### Including the whole bundle

This is the simplest method. The bundle is minified and contains all the components.

```html
<script src="node_modules/@bendera/vscode-webview-elements/dist/bundled.js" type="module"></script>
```

### Include only the required modules

You can include modules separately. These files only transpiled but not minified.

```html
<script src="node_modules/@bendera/vscode-webview-elements/dist/vscode-checkbox.js" type="module"></script>
```

### Import in JavaScript

Import anywhere in your JavaScript/TypeScript code. Code duplication will be handled by the bundlers (ex.: Webpack).

```javascript
import '@bendera/vscode-webview-elements/dist/vscode-checkbox';
```

### Using in the HTML

After including scripts, you can use any component in the same way as a normal HTML tag. The custom elements will be registered automatically.

```html
<p>Lorem ispum dolor</p>
<vscode-button>Hello World!</vscode-button>
```

If you would like to use the [Icon component](https://bendera.github.io/vscode-webview-elements/components/vscode-icon/), you must include the Codicon library on your page. The id attribute is important in order for the Icon component to find the proper stylesheet on the page:

```html
<link rel="stylesheet" href="path/to/codicon.css" id="vscode-codicon-stylesheet">
```

### Demo extension

For more details, see the [demo extension](https://github.com/bendera/vscode-vscwe-demo/releases).
