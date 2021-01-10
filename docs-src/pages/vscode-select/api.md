---
layout: page.11ty.cjs
title: <vscode-select> ⌲ API
tags: api
customElement: vscode-select
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-select

A dropdown menu element.

## Properties

| Property               | Attribute               | Type       | Default   | Description                                      |
|------------------------|-------------------------|------------|-----------|--------------------------------------------------|
| `ariaActivedescendant` | `aria-activedescendant` | `string`   | ""        |                                                  |
| `ariaExpanded`         | `aria-expanded`         | `string`   | "false"   |                                                  |
| `ariaLabel`            | `aria-label`            | `string`   | ""        |                                                  |
| `ariaMultiselectable`  | `aria-multiselectable`  | `string`   | "false"   |                                                  |
| `multiple`             | `multiple`              | `boolean`  | false     |                                                  |
| `options`              | `options`               | `Option[]` |           |                                                  |
| `role`                 | `role`                  | `string`   | "listbox" |                                                  |
| `selectedIndex`        | `selectedIndex`         | `number`   |           |                                                  |
| `selectedIndexes`      | `selectedIndexes`       | `number[]` |           |                                                  |
| `tabindex`             | `tabindex`              | `number`   | 0         |                                                  |
| `value`                | `value`                 | `string`   |           | If value is not presented in the options list, the selectedIndex will be -1 |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ multiple: boolean; selectedIndex: number; selectedIndexes: number[]; selectedOptions: Option; value: string; }>` |
