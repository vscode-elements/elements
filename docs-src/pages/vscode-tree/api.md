---
layout: page.11ty.cjs
title: <vscode-tree> ⌲ API
tags: api
customElement: vscode-tree
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

## Methods

| Method     | Type       |
|------------|------------|
| `closeAll` | `(): void` |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-select` | `CustomEvent<{ icons: TreeItemIconConfig \| undefined; itemType: ItemType; label: string; open: boolean; value: string; path: string; }>` |
