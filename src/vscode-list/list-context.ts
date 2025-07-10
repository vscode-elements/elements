import {createContext} from '@lit/context';
import type {VscodeListItem} from '../vscode-list-item';
import type {VscodeList} from './vscode-list';

export interface ListContext {
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
  activeItem: VscodeListItem | null;
}

export const listContext = createContext<ListContext>('vscode-list');

export interface ConfigContext {
  readonly arrows: boolean;
  readonly indent: number;
  readonly indentGuides: boolean;
  readonly multiSelect: boolean;
}


export const configContext = createContext<ConfigContext>(
  Symbol('configContext')
);
