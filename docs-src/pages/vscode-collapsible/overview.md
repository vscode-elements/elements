---
layout: page.11ty.cjs
title: <vscode-collapsible> ⌲ Home
customElement: vscode-collapsible
tags: overview
---

# &lt;vscode-collapsible&gt;

`<vscode-collapsible>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<vscode-collapsible>` is just an HTML element. You can it anywhere you can use HTML!

```html
<vscode-collapsible></vscode-collapsible>
```

  </div>
  <div>

<vscode-collapsible></vscode-collapsible>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<vscode-collapsible>` can be configured with attributed in plain HTML.

```html
<vscode-collapsible name="HTML"></vscode-collapsible>
```

  </div>
  <div>

<vscode-collapsible name="HTML"></vscode-collapsible>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<vscode-collapsible>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;vscode-collapsible&gt;</h2>
  <vscode-collapsible .name=${name}></vscode-collapsible>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;vscode-collapsible&gt;</h2>
<vscode-collapsible name="lit-html"></vscode-collapsible>

  </div>
</section>