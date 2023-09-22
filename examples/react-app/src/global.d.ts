import {DOMAttributes} from 'react';
// Import the custom element definition class 
import {VscodeButton} from '@bendera/vscode-webview-elements/dist/vscode-button/vscode-button.js';

type CustomElement<T> = Partial<T & DOMAttributes<T> & {children: any}>;

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['vscode-button']: CustomElement<VscodeButton>;
    }
  }
}
