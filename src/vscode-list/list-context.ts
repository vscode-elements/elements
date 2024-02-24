import {createContext} from '@lit/context';

export interface ListContext {
  indent: number;
  arrows: boolean;
}

export const listContext = createContext<ListContext>('vscode-list');
