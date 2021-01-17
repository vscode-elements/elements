---
layout: component.njk
title: ContextMenuItem
tags: api
component: vscode-context-menu-item
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-context-menu-item

## Properties

| Property     | Attribute    | Type      | Default |
|--------------|--------------|-----------|---------|
| `keybinding` | `keybinding` | `string`  | ""      |
| `label`      | `label`      | `string`  | ""      |
| `separator`  | `separator`  | `boolean` | false   |
| `tabindex`   | `tabindex`   | `number`  | 0       |
| `value`      | `value`      | `string`  | ""      |

## Events

| Event       | Type                                             |
|-------------|--------------------------------------------------|
| `vsc-click` | `CustomEvent<{ label: string; keybinding: string; value: string; separator: boolean; tabindex: number; }>` |
