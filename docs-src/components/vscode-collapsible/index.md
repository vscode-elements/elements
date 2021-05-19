---
layout: component.njk
title: Collapsible
tags: component
component: vscode-collapsible
---

# vscode-collapsible

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-collapsible';
```

## Basic example

<style>
  vscode-collapsible p {
    color: var(--vscode-editor-foreground);
    font-size: var(--vscode-font-size);
    margin: 10px;
  }
</style>

<component-preview>
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
</component-preview>

### CSS

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

## Actions

The action icons are clickable. See the developer console.

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

<component-preview>
  <vscode-collapsible title="Basic example" class="collapsible">
    <ul slot="actions">
      <li><vscode-icon name="file-add" aria-role="button" id="btn-file-add" title="New File"></vscode-icon></li>
      <li><vscode-icon name="refresh" aria-role="button" id="btn-refresh" title="Refresh"></vscode-icon></li>
    </ul>
    <div slot="body">
      <p>Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et efficitur augue.</p>
    </div>
  </vscode-collapsible>
</component-preview>

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

### CSS

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

### HTML

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

### JavaScript

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