---
layout: component.njk
title: Checkbox
tags: component
component: vscode-checkbox
a11y: medium
kbd: medium
---

# Checkbox

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-checkbox';
```

## Basic example

<component-preview>
  <vscode-checkbox label="Checkbox example" value="testvalue1" checked></vscode-checkbox>
</component-preview>

### HTML

```html
<vscode-checkbox label="Checkbox example" value="testvalue1" checked></vscode-checkbox>
```

## Indeterminate state

<component-preview>
  <vscode-checkbox label="Indeterminate example" indeterminate></vscode-checkbox>
</component-preview>

### HTML

```html
<vscode-checkbox label="Indeterminate example" indeterminate></vscode-checkbox>
```

## Slotted content

<style>
.slotted-example {
  color: var(--vscode-foreground);
}

.slotted-example a {
  color: var(--vscode-textLink-foreground);
}
</style>

<component-preview>
  <vscode-checkbox class="slotted-example">I agree to the <a href="#">terms &amp; conditions</a></vscode-checkbox>
</component-preview>

### HTML

```html
<vscode-checkbox>I agree to the <a href="#">terms &amp; conditions</a></vscode-checkbox>
```



