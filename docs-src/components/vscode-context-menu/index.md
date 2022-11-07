---
layout: component.njk
title: ContextMenu
tags: component
component: vscode-context-menu
a11y: low
kbd: high
---

# ContextMenu

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-context-menu';
```

## Basic example

<style>
.menu-wrapper {
  overflow: visible;
  position: relative;
}

.toggle-menu-button {
  cursor: pointer;
  display: block;
}

.context-menu {
  bottom: 36px;
  left: 16px;
  position: absolute;
  z-index: 2;
}
</style>

<component-preview>
  <div class="menu-wrapper">
    <vscode-icon name="menu" size="32" id="toggle-menu-button" action-icon title="Toggle Menu" class="toggle-menu-button"></vscode-icon>
    <vscode-context-menu id="context-menu" class="context-menu"></vscode-context-menu>
  </div>
</component-preview>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#context-menu');
  const button = document.querySelector('#toggle-menu-button');

  document.querySelector('#context-menu').data = [
    {
      label: 'Command palette...',
      keybinding: 'Ctrl+Shift+A',
      value: 'menuitem1',
    },
    {
      separator: true,
    },
    {
      label: 'Settings',
      keybinding: 'Ctrl+Comma',
      value: 'menuitem2',
    },
    {
      label: 'Extensions',
      keybinding: 'Ctrl+Shift+X',
      value: 'menuitem3',
    },
  ];

  button.addEventListener('click', () => {
    menu.show = !menu.show;
  });

  menu.addEventListener('vsc-select', (event) => {
    console.log(event);
  });
});
</script>

### HTML

```html
<div class="menu-wrapper">
  <vscode-icon name="menu" size="32" id="toggle-menu-button" role="button" title="Toggle Menu" class="toggle-menu-button"></vscode-icon>
  <vscode-context-menu id="context-menu" class="context-menu"></vscode-context-menu>
</div>
```

### CSS

```css
.menu-wrapper {
  overflow: visible;
  position: relative;
}

.toggle-menu-button {
  cursor: pointer;
  display: block;
}

.context-menu {
  bottom: 36px;
  left: 16px;
  position: absolute;
}
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#context-menu');
  const button = document.querySelector('#toggle-menu-button');

  document.querySelector('#context-menu').data = [
    {
      label: 'Command palette...',
      keybinding: 'Ctrl+Shift+A',
      value: 'menuitem1',
    },
    {
      separator: true,
    },
    {
      label: 'Settings',
      keybinding: 'Ctrl+Comma',
      value: 'menuitem2',
    },
    {
      label: 'Extensions',
      keybinding: 'Ctrl+Shift+X',
      value: 'menuitem3',
    },
  ];

  button.addEventListener('click', () => {
    menu.show = !menu.show;
  });

  menu.addEventListener('vsc-select', (event) => {
    console.log(event);
  });
});
```