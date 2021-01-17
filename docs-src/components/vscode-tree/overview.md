---
layout: page.njk
title: <vscode-tree> ⌲ Home
customElement: vscode-tree
tags: overview
---

# &lt;vscode-tree&gt;

`<vscode-tree>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<vscode-tree>` is just an HTML element. You can it anywhere you can use HTML!

```html
<vscode-tree></vscode-tree>
```

  </div>
  <div>

<vscode-tree></vscode-tree>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<vscode-tree>` can be configured with attributed in plain HTML.

```html
<vscode-tree name="HTML"></vscode-tree>
```

  </div>
  <div>

<vscode-tree name="HTML"></vscode-tree>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<vscode-tree>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;vscode-tree&gt;</h2>
  <vscode-tree .name=${name}></vscode-tree>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;vscode-tree&gt;</h2>
<vscode-tree name="lit-html"></vscode-tree>

  </div>
</section>