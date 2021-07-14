---
layout: component.njk
title: RadioGroup
tags: component
component: vscode-radio-group
toc:
  - label: Horizontal group
    path: horizontal-group
  - label: Vertical group
    path: vertical-group
---

# VscodeRadioGroup

```typescript
import { 
  VscodeRadio, 
  VscodeRadioGroup 
} '@bendera/vscode-webview-elements';
```

## Horizontal group

<component-preview>
  <vscode-radio-group>
    <vscode-radio label="Lorem" name="horizontal-example"></vscode-radio>
    <vscode-radio label="Ipsum" name="horizontal-example"></vscode-radio>
    <vscode-radio label="Dolor" name="horizontal-example"></vscode-radio>
  </vscode-radio-group>
</component-preview>

### HTML

```html
<vscode-radio-group>
  <vscode-radio label="Lorem" name="horizontal-example"></vscode-radio>
  <vscode-radio label="Ipsum" name="horizontal-example"></vscode-radio>
  <vscode-radio label="Dolor" name="horizontal-example"></vscode-radio>
</vscode-radio-group>
```

## Vertical group

<component-preview>
  <vscode-radio-group variant="vertical">
    <vscode-radio name="vertical-example" label="Lorem"></vscode-radio>
    <vscode-radio name="vertical-example" label="Ipsum"></vscode-radio>
    <vscode-radio name="vertical-example" label="Dolor"></vscode-radio>
  </vscode-radio-group>
</component-preview>

### HTML

```html
<vscode-radio-group variant="vertical">
  <vscode-radio name="vertical-example" label="Lorem"></vscode-radio>
  <vscode-radio name="vertical-example" label="Ipsum"></vscode-radio>
  <vscode-radio name="vertical-example" label="Dolor"></vscode-radio>
</vscode-radio-group>
```