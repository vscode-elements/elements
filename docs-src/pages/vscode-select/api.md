---
layout: page.11ty.cjs
title: <vscode-select> ⌲ API
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-select

A dropdown menu element.

## Properties

| Property          | Attribute         | Modifiers | Type       | Default | Description                                      |
|-------------------|-------------------|-----------|------------|---------|--------------------------------------------------|
| `multiple`        | `multiple`        |           | `boolean`  | false   |                                                  |
| `options`         | `options`         | readonly  | `Option[]` |         |                                                  |
| `selectedIndex`   | `selectedIndex`   |           | `number`   |         |                                                  |
| `selectedIndexes` | `selectedIndexes` |           | `number[]` |         |                                                  |
| `tabIndex`        | `tabIndex`        |           | `number`   | -1      |                                                  |
| `value`           | `value`           |           | `string`   |         | If value is not represented in the options list, the selectedIndex will be -1 |

## Events

| Event        |
|--------------|
| `vsc-change` |
