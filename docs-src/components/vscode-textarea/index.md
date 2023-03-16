---
layout: component.njk
title: Textarea
tags: component
component: vscode-textarea
---

# Textarea

## Basic example

<component-preview>
  <vscode-textarea placeholder="Type something"></vscode-textarea>
</component-preview>

### HTML

```html
<vscode-textarea placeholder="Type something"></vscode-textarea>
```

## Monospace mode

In monospace mode, the same font is used as in VSCode in the code editor.

<component-preview>
  <vscode-textarea placeholder="Type something" monospace></vscode-textarea>
</component-preview>

### HTML

```html
<vscode-textarea placeholder="Type something" monospace></vscode-textarea>
```

## Rows and cols attributes

The component default size is 320 x 40. If rows or cols attributes are set it
will be resized to the proper size.

<component-preview>
  <vscode-textarea 
    placeholder="Type something" 
    rows="10" 
    cols="40"
  ></vscode-textarea>
</component-preview>

### HTML

```html
<vscode-textarea 
  placeholder="Type something" 
  rows="10" 
  cols="40"
></vscode-textarea>
```
