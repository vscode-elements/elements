---
layout: component.njk
title: MultiSelect
tags: api
component: vscode-multi-select
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-multi-select

## Properties

| Property       | Attribute       | Type       | Default |
|----------------|-----------------|------------|---------|
| `ariaExpanded` | `aria-expanded` | `string`   | "false" |
| `combobox`     | `combobox`      | `boolean`  | false   |
| `dataCloak`    | `data-cloak`    | `boolean`  | false   |
| `tabindex`     | `tabindex`      | `number`   | 0       |
| `value`        | `value`         | `string[]` | []      |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ selectedIndex: number; value: string \| string[]; }>` |
