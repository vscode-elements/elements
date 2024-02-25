import {createContext} from '@lit/context';
import type {VscodeListItem} from '../vscode-list-item';
import type {VscodeList} from './vscode-list';

export interface ListContext {
  indent: number;
  arrows: boolean;
  selectedItems: Set<VscodeListItem>;
  /** If arrows are visible and `List` component has not any branch item, the
   * extra padding should be removed in the leaf elements before the content
   */
  hasBranchItem: boolean;
  rootElement: VscodeList | null;
}

export const listContext = createContext<ListContext>('vscode-list');
