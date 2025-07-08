import {createContext} from '@lit/context';
import type {VscodeListItem} from '../vscode-list-item';
import type {VscodeList} from './vscode-list';
import {ListController} from './ListController';

export interface ListContext {
  indent: number;
  arrows: boolean;
  multiSelect: boolean;
  selectedItems: Set<VscodeListItem>;
  allItems: NodeListOf<VscodeListItem> | null;
  itemListUpToDate: boolean;
  focusedItem: VscodeListItem | null;
  prevFocusedItem: VscodeListItem | null;
  /** If arrows are visible and `List` component has not any branch item, the
   * extra padding should be removed in the leaf elements before the content
   */
  hasBranchItem: boolean;
  rootElement: VscodeList | null;
}

export const listContext = createContext<ListContext>('vscode-list');

export const listControllerContext = createContext<ListController>(
  Symbol('listControllerContext')
);
