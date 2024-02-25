import {createContext} from '@lit/context';
import {type VscodeListItem} from '../vscode-list-item';

export interface ListContext {
  indent: number;
  arrows: boolean;
  selectedItems: Set<VscodeListItem>;
}

export const listContext = createContext<ListContext>('vscode-list');
