---
layout: component.njk
title: Textfield
tags: component
component: vscode-textfield
---

# Textfield

## Basic example

<component-preview>
  <vscode-textfield placeholder="Type something" value="Test value"></vscode-textfield>
</component-preview>

### HTML

```html
<vscode-textfield
  placeholder="Type something"
  value="Test value"
></vscode-textfield>
```

## Using slots

<component-preview>
  <p>
    <vscode-textfield placeholder="Type something">
      <vscode-badge slot="content-after">308 Settings Found</vscode-badge>
      <vscode-icon
        slot="content-after"
        name="clear-all"
        title="clear-all"
        action-icon
      ></vscode-icon>
      <vscode-icon slot="content-after" name="filter" action-icon></vscode-icon>
    </vscode-textfield>
  </p>
  <p>
    <vscode-textfield placeholder="Type something">
      <vscode-icon
        slot="content-before"
        name="search"
        title="search"
      ></vscode-icon>
    </vscode-textfield>
  </p>
</component-preview>

### HTML

```html
<p>
  <vscode-textfield placeholder="Type something">
    <vscode-badge slot="content-after">308 Settings Found</vscode-badge>
    <vscode-icon
      slot="content-after"
      name="clear-all"
      title="clear-all"
      action-icon
    ></vscode-icon>
    <vscode-icon slot="content-after" name="filter" action-icon></vscode-icon>
  </vscode-textfield>
</p>
<p>
  <vscode-textfield placeholder="Type something">
    <vscode-icon
      slot="content-before"
      name="search"
      title="search"
    ></vscode-icon>
  </vscode-textfield>
</p>
```

## File input

<component-preview>
  <vscode-textfield type="file"></vscode-textfield>
</component-preview>

### HTML

```html
<vscode-textfield type="file"></vscode-textfield>
```
