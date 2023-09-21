import {DOMAttributes} from 'react';
import '@bendera/vscode-webview-elements/dist/vscode-button/index.js';
import {VscodeButton} from '@bendera/vscode-webview-elements/dist/vscode-button/vscode-button.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <vscode-button>Primary button</vscode-button>
      <vscode-button secondary>Secondary button</vscode-button>
    </div>
  );
}

export default App;

type CustomElement<T> = Partial<T & DOMAttributes<T> & {children: any}>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['vscode-button']: CustomElement<VscodeButton>;
    }
  }
}
