---
layout: component.njk
title: SplitLayout
tags: component
component: vscode-split-layout
---

# SplitLayout

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-split-layout';
```

## Example

<style>
  .split-layout-example {
    border: 1px solid var(--vscode-editorWidget-border);
    height: 200px;
    width: 500px;
  }

  .split-layout-content {
    height: 100%;
    overflow-y: auto;
  }

  .split-layout-content.start {
    border-right: 1px solid var(--vscode-editorWidget-border);
    box-sizing: border-box;
  }
</style>

<component-preview>
  <vscode-split-layout class="split-layout-example" initialpos="25%" split="vertical" resetondblclick>
    <div slot="start" class="split-layout-content start">
      Praesent ultrices mauris lectus, eu molestie erat lacinia vitae. Phasellus vestibulum pellentesque ligula malesuada sollicitudin. Vivamus vitae erat eget nulla laoreet porttitor. Nullam sit amet leo et velit molestie maximus. Vestibulum arcu leo, tempor nec pretium id, vehicula id odio. Etiam ultricies ligula dolor, in tincidunt nunc maximus at. Curabitur tincidunt nulla in magna pharetra commodo. Donec vestibulum mollis quam, ut consequat dolor finibus ac. Nulla suscipit ac sem non fringilla. Nullam eros ante, suscipit hendrerit molestie a, tempor nec turpis. Morbi eget erat suscipit, blandit nibh nec, molestie augue. Aenean consectetur dapibus mauris, eget ultricies sapien porttitor nec.
    </div>
    <div slot="end" class="split-layout-content">
      Praesent ultrices mauris lectus, eu molestie erat lacinia vitae. Phasellus vestibulum pellentesque ligula malesuada sollicitudin. Vivamus vitae erat eget nulla laoreet porttitor. Nullam sit amet leo et velit molestie maximus. Vestibulum arcu leo, tempor nec pretium id, vehicula id odio. Etiam ultricies ligula dolor, in tincidunt nunc maximus at. Curabitur tincidunt nulla in magna pharetra commodo. Donec vestibulum mollis quam, ut consequat dolor finibus ac. Nulla suscipit ac sem non fringilla. Nullam eros ante, suscipit hendrerit molestie a, tempor nec turpis. Morbi eget erat suscipit, blandit nibh nec, molestie augue. Aenean consectetur dapibus mauris, eget ultricies sapien porttitor nec.
    </div>
  </vscode-split-layout>
</component-preview>

### CSS

```css
.split-layout-example {
  border: 1px solid var(--vscode-editorWidget-border);
  height: 200px;
  width: 500px;
}

.split-layout-content {
  height: 100%;
  overflow-y: auto;
}

.split-layout-content.start {
  border-right: 1px solid var(--vscode-editorWidget-border);
  box-sizing: border-box;
}
```

### HTML

```html
<vscode-split-layout class="split-layout-example" initialpos="25%" split="vertical" resetondblclick>
  <div slot="start" class="split-layout-content start">
    Praesent ultrices mauris lectus, eu molestie erat lacinia vitae...
  </div>
  <div slot="end" class="split-layout-content">
    Praesent ultrices mauris lectus, eu molestie erat lacinia vitae...
  </div>
</vscode-split-layout>
```
