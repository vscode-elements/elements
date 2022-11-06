---
layout: component.njk
title: CheckboxGroup
tags: component
component: vscode-checkbox-group
toc:
  - label: Horizontal group
    path: horizontal-group
  - label: Vertical group
    path: vertical-group
---

# CheckboxGroup

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-checkbox-group';
```

## Horizontal group

<component-preview>
  <vscode-checkbox-group>
    <vscode-checkbox label="Lorem"></vscode-checkbox>
    <vscode-checkbox label="Ipsum"></vscode-checkbox>
    <vscode-checkbox label="Dolor"></vscode-checkbox>
  </vscode-checkbox-group>
</component-preview>

### HTML

```html
<vscode-checkbox-group>
  <vscode-checkbox label="Lorem"></vscode-checkbox>
  <vscode-checkbox label="Ipsum"></vscode-checkbox>
  <vscode-checkbox label="Dolor"></vscode-checkbox>
</vscode-checkbox-group>
```

## Vertical group

<component-preview>
  <vscode-checkbox-group variant="vertical">
    <vscode-checkbox label="Lorem"></vscode-checkbox>
    <vscode-checkbox label="Ipsum"></vscode-checkbox>
    <vscode-checkbox label="Dolor"></vscode-checkbox>
  </vscode-checkbox-group>
</component-preview>

### HTML

```html
<vscode-checkbox-group variant="vertical">
  <vscode-checkbox label="Lorem"></vscode-checkbox>
  <vscode-checkbox label="Ipsum"></vscode-checkbox>
  <vscode-checkbox label="Dolor"></vscode-checkbox>
</vscode-checkbox-group>
```