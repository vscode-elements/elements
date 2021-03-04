---
layout: component.njk
title: Select
tags: component
component: vscode-select
---

# vscode-select

## Basic example

<component-preview>
  <vscode-select id="select-example">
    <vscode-option>Lorem</vscode-option>
    <vscode-option selected>Ipsum</vscode-option>
    <vscode-option>Dolor</vscode-option>
  </vscode-select>
</component-preview>
<script>
  const select = document.querySelector('#select-example');
  select.addEventListener('vsc-change', (event) => {
    console.log(event);
  });
</script>

### HTML

```html
<vscode-select>
  <vscode-option value="option 1">Lorem</vscode-option>
  <vscode-option value="option 2" selected>Ipsum</vscode-option>
  <vscode-option value="option 3">Dolor</vscode-option>
</vscode-select>
```

### Javascript

```javascript
const select = document.querySelector('#select-example');
select.addEventListener('vsc-change', (event) => {
  console.log(event);
});
```