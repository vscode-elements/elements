---
layout: page.11ty.cjs
title: <vscode-icon> ⌲ Home
customElement: vscode-icon
tags: overview
---

# &lt;vscode-icon&gt;

`<vscode-icon>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<vscode-icon>` is just an HTML element. You can it anywhere you can use HTML!

```html
<vscode-icon></vscode-icon>
```

  </div>
  <div>

<vscode-icon></vscode-icon>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<vscode-icon>` can be configured with attributed in plain HTML.

```html
<vscode-icon name="HTML"></vscode-icon>
```

  </div>
  <div>

<vscode-icon name="HTML"></vscode-icon>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<vscode-icon>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;vscode-icon&gt;</h2>
  <vscode-icon .name=${name}></vscode-icon>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;vscode-icon&gt;</h2>
<vscode-icon name="lit-html"></vscode-icon>

  </div>
</section>