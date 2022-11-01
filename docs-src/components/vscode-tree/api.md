---
layout: component.njk
title: Tree
tags: api
component: vscode-tree
---

# VscodeTree

```typescript
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
  value?: string;
  path?: number[];
}

enum ItemType {
  BRANCH = 'branch',
  LEAF = 'leaf',
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