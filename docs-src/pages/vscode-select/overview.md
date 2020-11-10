---
layout: page.11ty.cjs
title: <vscode-select> ⌲ Home
customElement: vscode-select
tags: overview
---

# &lt;vscode-select&gt;

`<vscode-select>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<vscode-select>` is just an HTML element. You can it anywhere you can use HTML!

```html
<vscode-select></vscode-select>
```

  </div>
  <div>

<vscode-select></vscode-select>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<vscode-select>` can be configured with attributed in plain HTML.

```html
<vscode-select name="HTML"></vscode-select>
```

  </div>
  <div>

<vscode-select name="HTML"></vscode-select>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<vscode-select>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;vscode-select&gt;</h2>
  <vscode-select .name=${name}></vscode-select>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;vscode-select&gt;</h2>
<vscode-select name="lit-html"></vscode-select>

  </div>
</section>