---
layout: component.njk
title: Tree
tags: api
component: vscode-tree
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeTree

## Type definitions

```typescript
type ItemType = 'branch' | 'leaf';

interface TreeItemIconConfig {
   branch?: string;
   open?: string;
   leaf?: string;
}

interface TreeItem {
   label: string;
   subItems?: TreeItem[];
   open?: boolean;
   selected?: boolean;
   focused?: boolean;
   icons?: TreeItemIconConfig;

   // If it's not defined the value will be equal to the label
   value?: string;

   // Item path in the tree. For example [0,0,1] means:
   // tree[0].subItems[0].subItems[1]
   path?: number[];
}


interface SelectEventDetail {
   icons: TreeItemIconConfig | undefined;
   itemType: ItemType;
   label: string;
   open: boolean;
   value: string;
   path: string; // ex.: 0/0/1
}
```

## Properties

| Property    | Attribute   | Type         | Default |
|-------------|-------------|--------------|---------|
| `arrows`    | `arrows`    | `boolean`    | false   |
| `data`      | `data`      | `TreeItem[]` |         |
| `indent`    | `indent`    | `number`     | 8       |
| `multiline` | `multiline` | `boolean`    | false   |
| `tabindex`  | `tabindex`  | `number`     | 0       |

## Methods

| Method     | Type       |
|------------|------------|
| `closeAll` | `(): void` |

## Events

| Event        | Type                             |
|--------------|----------------------------------|
| `vsc-select` | `CustomEvent<SelectEventDetail>` |
