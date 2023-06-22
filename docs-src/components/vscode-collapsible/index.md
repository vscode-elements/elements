---
layout: component.njk
title: Collapsible
tags: component
component: vscode-collapsible
toc:
  - label: Basic example
    path: basic-example
  - label: Actions
    path: actions
  - label: Decorations
    path: decorations
  - label: Description
    path: description
  - label: Complex example
    path: a-complex-example-using-tree-and-scrollable-components
a11y: low
kbd: medium
---

# Collapsible

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

<details>
  <summary>Code</summary>

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
    <p>
      Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
      efficitur augue.
    </p>
  </div>
</vscode-collapsible>
```

</details>

## Actions

The action icons are clickable. Check the developer console for the logged messages. Action icons
are only visible when the component is in the opened state.

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
  <vscode-collapsible title="Actions example" class="collapsible" open>
    <vscode-icon
      name="file-add"
      action-icon
      aria-role="button"
      id="btn-file-add"
      title="New File"
      slot="actions"
    ></vscode-icon>
    <vscode-icon
      name="refresh"
      action-icon
      aria-role="button"
      id="btn-refresh"
      title="Refresh"
      slot="actions"
    ></vscode-icon>
    <div slot="body">
      <p>
        Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
        efficitur augue.
      </p>
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

<details>
  <summary>Code</summary>

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
<vscode-collapsible title="Actions example" class="collapsible" open>
  <vscode-icon
    name="file-add"
    action-icon
    aria-role="button"
    id="btn-file-add"
    title="New File"
    slot="actions"
  ></vscode-icon>
  <vscode-icon
    name="refresh"
    action-icon
    aria-role="button"
    id="btn-refresh"
    title="Refresh"
    slot="actions"
  ></vscode-icon>
  <div slot="body">
    <p>
      Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
      efficitur augue.
    </p>
  </div>
</vscode-collapsible>
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#btn-file-add').addEventListener('click', (event) => {
    // Stop the propagation of the event otherwise the component will close.
    event.stopPropagation();
    console.log('New File');
  });

  document.querySelector('#btn-refresh').addEventListener('click', (event) => {
    // Stop the propagation of the event otherwise the component will close.
    event.stopPropagation();
    console.log('Refresh');
  });
});
```

</details>

## Decorations

Elements in the decorations slot are always visible

<component-preview>
  <vscode-collapsible title="Decorations example" class="collapsible">
    <vscode-badge variant="counter" slot="decorations">99</vscode-badge>
    <div slot="body">
      <p>
        Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
        efficitur augue.
      </p>
    </div>
  </vscode-collapsible>
</component-preview>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-collapsible title="Decorations example" class="collapsible">
  <vscode-badge variant="counter" slot="decorations">99</vscode-badge>
  <div slot="body">
    <p>
      Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
      efficitur augue.
    </p>
  </div>
</vscode-collapsible>
```

</details>

## Description

Less prominent text in the header

<component-preview>
  <vscode-collapsible title="Lorem ipsum dolor sit amet" description="consectetur adipiscing elit" class="collapsible">
    <div slot="body">
      <p>
        Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
        efficitur augue.
      </p>
    </div>
  </vscode-collapsible>
</component-preview>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-collapsible
  title="Lorem ipsum dolor sit amet"
  description="consectetur adipiscing elit"
  class="collapsible"
>
  <div slot="body">
    <p>
      Suspendisse potenti. Maecenas eu egestas metus. Nulla eget placerat mi, et
      efficitur augue.
    </p>
  </div>
</vscode-collapsible>
```

</details>

## A complex example using Tree and Scrollable components

<style>
  .collapsible.complex-example vscode-scrollable {
    height: 200px;
  }
</style>

<component-preview>
  <vscode-collapsible title="Timeline" description="vscode-collapsible.ts" class="collapsible complex-example" open>
    <vscode-icon name="pin" action-icon slot="actions" id="pin-icon"></vscode-icon>
    <vscode-icon name="refresh" action-icon slot="actions" id="refresh-icon"></vscode-icon>
    <vscode-icon name="filter" action-icon slot="actions" id="filter-icon"></vscode-icon>
    <div slot="body">
      <vscode-scrollable>
        <vscode-tree id="tree-example"></vscode-tree>
      </vscode-scrollable>
    </div>
  </vscode-collapsible>
</component-preview>

<script type="module">
  const icons = {
    leaf: 'circle-outline',
  };
  const tree = document.getElementById('tree-example');
  document.getElementById('pin-icon').addEventListener('click', (ev) => {
    ev.stopPropagation(); 
  });
  document.getElementById('refresh-icon').addEventListener('click', (ev) => {
    ev.stopPropagation(); 
  });
  document.getElementById('filter-icon').addEventListener('click', (ev) => {
    ev.stopPropagation(); 
  });

  tree.data = [
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
    {icons, label: 'File Saved'},
  ];
</script>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-collapsible
  title="Timeline"
  description="vscode-collapsible.ts"
  class="collapsible complex-example"
  open
>
  <vscode-icon
    name="pin"
    action-icon
    slot="actions"
    id="pin-icon"
  ></vscode-icon>
  <vscode-icon
    name="refresh"
    action-icon
    slot="actions"
    id="refresh-icon"
  ></vscode-icon>
  <vscode-icon
    name="filter"
    action-icon
    slot="actions"
    id="filter-icon"
  ></vscode-icon>
  <div slot="body">
    <vscode-scrollable>
      <vscode-tree id="tree-example"></vscode-tree>
    </vscode-scrollable>
  </div>
</vscode-collapsible>
```

## CSS

```css
.collapsible.complex-example vscode-scrollable {
  height: 200px;
}
```

### JavaScript

```javascript
const icons = {
  leaf: 'circle-outline',
};
const tree = document.getElementById('tree-example');

document.getElementById('pin-icon').addEventListener('click', (ev) => {
  ev.stopPropagation(); 
});
document.getElementById('refresh-icon').addEventListener('click', (ev) => {
  ev.stopPropagation(); 
});
document.getElementById('filter-icon').addEventListener('click', (ev) => {
  ev.stopPropagation(); 
});

tree.data = [
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
  {icons, label: 'File Saved'},
];
```

</details>
