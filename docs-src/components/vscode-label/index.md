---
layout: component.njk
title: Label
tags: component
component: vscode-label
---

# Label

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-label';
```

## Basic example

Label font weight is bold by default. It can be changed to normal by wrapping it into `<span class="normal"></span>` element.

<component-preview>
  <vscode-label for="select-01" side-aligned="end" required
    ><span class="normal">Editor:</span> Font Size</vscode-label
  >
</component-preview>

### HTML

```html
<vscode-label for="select-01" side-aligned="end" required
  ><span class="normal">Editor:</span> Font Size</vscode-label
>
```