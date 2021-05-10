---
layout: component.njk
title: MultiSelect
tags: api
component: vscode-multi-select
---

<!-- This file is auto-generated. Do not edit! -->

# vscode-multi-select

## Properties

| Property          | Attribute         | Type                                             | Default | Description   |
|-------------------|-------------------|--------------------------------------------------|---------|---------------|
| `ariaExpanded`    | `aria-expanded`   | `string`                                         | "false" |               |
| `combobox`        | `combobox`        | `boolean`                                        | false   |               |
| `dataCloak`       | `data-cloak`      | `boolean`                                        | false   |               |
| `filter`          | `filter`          | `"fuzzy"|"contains"|"startsWith"|"startsWithPerTerm"` | "fuzzy" | Filter method |
| `focused`         | `focused`         | `boolean`                                        | false   |               |
| `options`         | `options`         | `Option[]`                                       | "[]"    |               |
| `selectedIndexes` | `selectedIndexes` | `number[]`                                       |         |               |
| `tabindex`        | `tabindex`        | `number`                                         | 0       |               |
| `value`           | `value`           | `string[]`                                       |         |               |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ selectedIndex: number; value: string; }>` |
