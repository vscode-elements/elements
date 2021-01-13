---
layout: example.11ty.cjs
title: <vscode-context-menu> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: Basic example
---

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
}
</style>

<div class="menu-wrapper">
  <vscode-icon name="settings-gear" size="32" id="toggle-menu-button" role="button" title="Toggle Menu" class="toggle-menu-button"></vscode-icon>
  <vscode-context-menu id="context-menu" class="context-menu" show></vscode-context-menu>
</div>

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

<h3>CSS</h3>

```css
  p {
    border: solid 1px blue;
    padding: 8px;
  }
```

<h3>HTML</h3>

```html
<vscode-context-menu id="context-menu"></vscode-context-menu>
```
