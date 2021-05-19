---
layout: component.njk
title: SingleSelect
tags: api
component: vscode-single-select
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeSingleSelect

## Types

```typescript
interface Option {
  label: string;
  value: string;
  description: string;
  selected: boolean;
}
```

## Properties

| Property        | Attribute       | Type                                             | Default   | Description   |
|-----------------|-----------------|--------------------------------------------------|-----------|---------------|
| `ariaExpanded`  | `aria-expanded` | `string`                                         | "false"   |               |
| `combobox`      | `combobox`      | `boolean`                                        | false     |               |
| `dataCloak`     | `data-cloak`    | `boolean`                                        | false     |               |
| `filter`        | `filter`        | `"fuzzy"|"contains"|"startsWith"|"startsWithPerTerm"` | "fuzzy"   | Filter method |
| `focused`       | `focused`       | `boolean`                                        | false     |               |
| `options`       | `options`       | `Option[]`                                       | "[]"      |               |
| `role`          | `role`          | `string`                                         | "listbox" |               |
| `selectedIndex` | `selectedIndex` | `number`                                         |           |               |
| `tabindex`      | `tabindex`      | `number`                                         | 0         |               |
| `value`         | `value`         | `string`                                         |           |               |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ selectedIndex: number; value: string; }>` |
