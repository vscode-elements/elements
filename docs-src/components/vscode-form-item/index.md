---
layout: component.njk
title: FormItem
tags: component
component: vscode-form-item
deprecated: true
---

# FormItem

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-form-item';
```

## Basic example

<style>
  .narrow {
    display: block;
    width: 200px;
  }

  .wide {
    display: block;
    width: 498px;
  }
</style>

<component-preview>
  <vscode-form-item>
    <vscode-form-label>Editor: Font Size</vscode-form-label>
    <vscode-form-description>Controls the font size in pixels.</vscode-form-description>
    <vscode-form-control>
      <vscode-inputbox value="15" class="narrow"></vscode-inputbox>
    </vscode-form-control>
  </vscode-form-item>
  <vscode-form-item>
    <vscode-form-label>Editor: Font Family</vscode-form-label>
    <vscode-form-description>Controls the font family.</vscode-form-description>
    <vscode-form-control>
      <vscode-inputbox value="Consolas, 'Courier New', monospace" class="wide"></vscode-inputbox>
    </vscode-form-control>
  </vscode-form-item>
</component-preview>

### HTML

```html
<vscode-form-item>
  <vscode-form-label>Editor: Font Size</vscode-form-label>
  <vscode-form-description>Controls the font size in pixels.</vscode-form-description>
  <vscode-form-control>
    <vscode-inputbox value="15" class="narrow"></vscode-inputbox>
  </vscode-form-control>
</vscode-form-item>
<vscode-form-item>
  <vscode-form-label>Editor: Font Family</vscode-form-label>
  <vscode-form-description>Controls the font family.</vscode-form-description>
  <vscode-form-control>
    <vscode-inputbox value="Consolas, 'Courier New', monospace" class="wide"></vscode-inputbox>
  </vscode-form-control>
</vscode-form-item>
```

### CSS

```css
.narrow {
  display: block;
  width: 200px;
}

.wide {
  display: block;
  width: 498px;
}
```
