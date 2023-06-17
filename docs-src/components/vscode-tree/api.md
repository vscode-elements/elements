---
layout: component.njk
title: Tree
tags: api
component: vscode-tree
---

# Tree

<details>
<summary>Custom types</summary>

```typescript
type ListenedKey = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape' | ' ';

type IconType = 'themeicon' | 'image';

type IconVariant = 'branch' | 'leaf' | 'open';

export interface TreeItemIconConfig {
  branch?: string;
  open?: string;
  leaf?: string;
}

/** Action icon configuration. */
export interface TreeItemAction {
  /** A unique name that identifies the clicked action item. */
  actionId: string;
  /** A Codicon name. */
  icon: string;
  /** Text description of the action. */
  tooltip?: string;
}

/**
 * The decoration is additional content on the right side of the tree item. It can be a short text,
 * a counter, or a small, filled circle. A color can be defined for the different states. If
 * multiple states are applied to the item, the color with higher precedence will be used. The color
 * precedence from higher to lower is selected, focused, hover, normal. Colors will not be applied
 * to the counter badge.
 */
export interface TreeItemDecoration {
  /** Text content of the decoration. If the appearance is `filled-circle`, it will be ignored. */
  content?: string;
  /** Appearance of the decoration. */
  appearance?: 'text' | 'counter-badge' | 'filled-circle';
  /**
   * When is decoration visible?
   * - `active`: visible when the tree item is focused, selected or hovered
   * - `normal`: visible when there is not any interaction on the tree item
   * - `always`: always visible
   */
  visibleWhen?: 'active' | 'normal' | 'always';
  /** A valid CSS property value to define a default color. */
  color?: string;
  /** A valid CSS property value to define the color for the mouse over state. */
  hoverColor?: string;
  /** A valid CSS property value to define the color for the focused state. */
  focusedColor?: string;
  /** A valid CSS property value to define the color for the selected state. */
  selectedColor?: string;
}

export interface TreeItem {
  label: string;
  description?: string;
  subItems?: TreeItem[];
  actions?: TreeItemAction[];
  open?: boolean;
  selected?: boolean;
  focused?: boolean;
  hasSelectedItem?: boolean;
  hasFocusedItem?: boolean;
  icons?: TreeItemIconConfig | boolean;
  iconUrls?: TreeItemIconConfig;
  value?: string;
  path?: number[];
  decorations?: TreeItemDecoration[];
}

type ItemType = 'branch' | 'leaf';

/** Event payload of the `vsc-select` event. */
interface SelectEventDetail {
  /** Icon configuration of the clicked item */
  icons: TreeItemIconConfig | undefined | boolean;
  /** Is item type branch or leaf. */
  itemType: ItemType;
  /** The visible label of the item. */
  label: string;
  /** The value associated to the item. */
  value: string;
  /** Is the item opened if it's a branch. */
  open: boolean;
  /** Path represents the item place in the tree. For example 1/2/3 means:
   * `data[1].subItems[2].subItems[3]` */
  path: string; // ex.: 0/0/1
}
```

</details>