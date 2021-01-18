---
layout: page.njk
title: Getting Started
tags: post
---

# Getting started

VSCode Webview Elements is aimed to provide web components for extension development that fit the 
VSCode's UI design system. You can use these web components with the [Webview API](https://code.visualstudio.com/api/extension-guides/webview).

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
import 'node_modules/@bendera/vscode-webview-elements/dist/vscode-checkbox';
```

### Using in the HTML

After including scripts, you can use any component in the same way as a normal HTML tag. The custom elements will be registered automatically.

```html
<p>Lorem ispum dolor</p>
<vscode-button>Hello World!</vscode-button>
```

If you would like to use the Icon component, you must include the Codicon library on your page (the id attribute is important):

```html
<link rel="stylesheet" href="path/to/codicon.css" id="vscode-codicon-stylesheet">
```

### Demo extension

For more details, see the [demo extension](https://github.com/bendera/vscode-vscwe-demo/releases).
