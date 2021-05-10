---
layout: component.njk
title: Tree
tags: api
component: vscode-tree
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-tree

## Properties

| Property    | Attribute   | Type         | Default |
|-------------|-------------|--------------|---------|
| `arrows`    | `arrows`    | `boolean`    | false   |
| `data`      | `data`      | `TreeItem[]` | []      |
| `indent`    | `indent`    | `number`     | 8       |
| `multiline` | `multiline` | `boolean`    | false   |
| `tabindex`  | `tabindex`  | `number`     | 0       |

## Methods

| Method     | Type       |
|------------|------------|
| `closeAll` | `(): void` |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-select` | `CustomEvent<{ icons: TreeItemIconConfig | undefined; itemType: ItemType; label: string; open: boolean; value: string; path: string; }>` |
