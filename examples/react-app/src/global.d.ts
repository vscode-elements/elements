import {DOMAttributes, MutableRefObject} from 'react';
// Import the custom element definition class
import {VscodeButton} from '@bendera/vscode-webview-elements/dist/vscode-button/vscode-button.js';

type CustomElement<T> = Partial<
  T & DOMAttributes<T> & {children: any; ref: MutableRefObject}
>;

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['vscode-button']: CustomElement<VscodeButton>;
    }
  }
}
