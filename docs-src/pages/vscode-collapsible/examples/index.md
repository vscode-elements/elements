---
layout: example.11ty.cjs
title: <vscode-collapsible> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: Basic example
---

<style>
  vscode-collapsible p {
    font-size: var(--vscode-font-size);
    margin: 10px;
  }
</style>

<vscode-collapsible title="Basic example" open>
  <div slot="body">
    <p>Open by default</p>
  </div>
</vscode-collapsible>
<vscode-collapsible title="Basic example">
  <div slot="body">
    <p>Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et efficitur augue.</p>
  </div>
</vscode-collapsible>

<h3>CSS</h3>

```css
vscode-collapsible p {
  font-size: var(--vscode-font-size);
  margin: 10px;
}
```

<h3>HTML</h3>

```html
<vscode-collapsible title="Basic example" open>
  <div slot="body">
    <p>Open by default</p>
  </div>
</vscode-collapsible>
<vscode-collapsible title="Basic example">
  <div slot="body">
    <p>Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et efficitur augue.</p>
  </div>
</vscode-collapsible>
```
