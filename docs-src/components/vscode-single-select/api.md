---
layout: component.njk
title: SingleSelect
tags: api
component: vscode-single-select
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-single-select

## Properties

| Property        | Attribute       | Type      | Default   |
|-----------------|-----------------|-----------|-----------|
| `ariaExpanded`  | `aria-expanded` | `string`  | "false"   |
| `combobox`      | `combobox`      | `boolean` | false     |
| `dataCloak`     | `data-cloak`    | `boolean` | false     |
| `role`          | `role`          | `string`  | "listbox" |
| `selectedIndex` | `selectedIndex` | `number`  | -1        |
| `tabindex`      | `tabindex`      | `number`  | 0         |
| `value`         | `value`         | `string`  |           |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ selectedIndex: number; value: string \| string[]; }>` |
