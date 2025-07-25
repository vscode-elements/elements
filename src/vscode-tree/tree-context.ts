import {createContext} from '@lit/context';
import type {VscodeTreeItem} from '../vscode-tree-item';
import type {ExpandMode, IndentGuideDisplay, VscodeTree} from './vscode-tree';

export interface TreeContext {
  isShiftPressed: boolean;
  selectedItems: Set<VscodeTreeItem>;
  allItems: NodeListOf<VscodeTreeItem> | null;
  itemListUpToDate: boolean;
  focusedItem: VscodeTreeItem | null;
  prevFocusedItem: VscodeTreeItem | null;
  /** If arrows are visible and `List` component has not any branch item, the
   * extra padding should be removed in the leaf elements before the content
   */
  hasBranchItem: boolean;
  rootElement: VscodeTree | null;
  activeItem: VscodeTreeItem | null;
  highlightedItems?: Set<VscodeTreeItem>;
  highlightIndentGuides?: () => void;
  emitSelectEvent?: () => void;
}

export const treeContext = createContext<TreeContext>('vscode-list');

export interface ConfigContext {
  readonly hideArrows: boolean;
  readonly expandMode: ExpandMode;
  readonly indent: number;
  readonly indentGuides: IndentGuideDisplay;
  readonly multiSelect: boolean;
}

export const configContext = createContext<ConfigContext>(
  Symbol('configContext')
);
