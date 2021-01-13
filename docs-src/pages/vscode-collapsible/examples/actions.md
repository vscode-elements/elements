---
layout: example.11ty.cjs
title: <vscode-collapsible> ⌲ Examples ⌲ Actions
tags: example
name: Actions
description: Actions
---

<style>
  .collapsible ul {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .collapsible li {
    align-items: center;
    display: flex;
    height: 22px;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 28px;
  }
</style>

<vscode-collapsible title="Basic example" class="collapsible">
  <ul slot="actions">
    <li><vscode-icon name="file-add" aria-role="button" id="btn-file-add" title="New File"></vscode-icon></li>
    <li><vscode-icon name="refresh" aria-role="button" id="btn-refresh" title="Refresh"></vscode-icon></li>
  </ul>
  <div slot="body">
    <p>Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et efficitur augue.</p>
  </div>
</vscode-collapsible>

<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#btn-file-add').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('New File');
  });

  document.querySelector('#btn-refresh').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Refresh');
  });
});
</script>

<h3>CSS</h3>

```css
.collapsible ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.collapsible li {
  align-items: center;
  display: flex;
  height: 22px;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 28px;
}
```

<h3>HTML</h3>

```html
<vscode-collapsible title="Basic example" class="collapsible">
  <ul slot="actions">
    <li><vscode-icon name="file-add" aria-role="button" id="btn-file-add" title="New File"></vscode-icon></li>
    <li><vscode-icon name="refresh" aria-role="button" id="btn-refresh" title="Refresh"></vscode-icon></li>
  </ul>
  <div slot="body">
    <p>Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et efficitur augue.</p>
  </div>
</vscode-collapsible>
```

<h3>JavaScript</h3>

```javascript
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#btn-file-add').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('New File');
  });

  document.querySelector('#btn-refresh').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Refresh');
  });
});
```