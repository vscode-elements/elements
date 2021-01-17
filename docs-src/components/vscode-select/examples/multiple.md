---
layout: page.njk
title: <vscode-select> ⌲ Examples ⌲ Multiple
tags: example
name: Multiple
description: Multiple attribute
---

<vscode-select id="select-example" multiple>
  <vscode-option>Lorem</vscode-option>
  <vscode-option selected>Ipsum</vscode-option>
  <vscode-option>Dolor</vscode-option>
</vscode-select>
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