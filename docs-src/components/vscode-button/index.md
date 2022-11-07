---
layout: component.njk
title: Button
tags: component
component: vscode-button
a11y: high
kbd: high
---

# Button

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-button';
```

## Basic example

Disabled buttons don't dispatch click events, even if the event listener is added.

<component-preview>
  <vscode-button id="button-1">Button</vscode-button>
  <vscode-button id="button-2" secondary>Secondary button</vscode-button>
  <vscode-button id="button-3" disabled>Disabled button</vscode-button>
  <vscode-button id="button-4" disabled secondary>Disabled secondary button</vscode-button>
  <vscode-button id="button-5" icon="account" icon-after="chevron-right">Icons</vscode-button>
</component-preview>

<script>
  document.getElementById('button-1').addEventListener('vsc-click', (ev) => {
    console.log(ev);
  });
  document.getElementById('button-2').addEventListener('vsc-click', (ev) => {
    console.log(ev);
  });
  document.getElementById('button-3').addEventListener('vsc-click', (ev) => {
    console.log(ev);
  });
  document.getElementById('button-4').addEventListener('vsc-click', (ev) => {
    console.log(ev);
  });
  document.getElementById('button-5').addEventListener('vsc-click', (ev) => {
    console.log(ev);
  });
</script>

### HTML

```html
<vscode-button id="button-1">Button</vscode-button>
<vscode-button id="button-2" secondary>Secondary button</vscode-button>
<vscode-button id="button-3" disabled>Disabled button</vscode-button>
<vscode-button id="button-4" disabled secondary>Disabled secondary button</vscode-button>
<vscode-button id="button-5" icon="account" icon-after="chevron-right">Icons</vscode-button>
```

### JavaScript

```javascript
document.getElementById('button-1').addEventListener('vsc-click', (ev) => {
  console.log(ev);
});
document.getElementById('button-2').addEventListener('vsc-click', (ev) => {
  console.log(ev);
});
document.getElementById('button-3').addEventListener('vsc-click', (ev) => {
  console.log(ev);
});
document.getElementById('button-4').addEventListener('vsc-click', (ev) => {
  console.log(ev);
});
document.getElementById('button-5').addEventListener('vsc-click', (ev) => {
  console.log(ev);
});
```

## Customized styles

Styles can be tweaked.

<style>
  .settings-button-example {
    line-height: 18px;
    padding: 2px 14px;
  }

  .scm-button-example {
    line-height: 26px;
    width: 179px;
  }
</style>

<component-preview>
  <vscode-button class="settings-button-example">Add item</vscode-button>
  <vscode-button class="scm-button-example" icon="check">Commit</vscode-button>
</component-preview>

### HTML

```html
<vscode-button class="settings-button-example">Add item</vscode-button>
<vscode-button class="scm-button-example" icon="check">Commit</vscode-button>
```

### CSS

```css
.settings-button-example {
  line-height: 18px;
  padding: 2px 14px;
}

.scm-button-example {
  line-height: 26px;
  width: 179px;
}
```
