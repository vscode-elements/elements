/**
 * Import the custom element definition. The custom element will be registered automatically.
 */
import '@bendera/vscode-webview-elements/dist/vscode-button';
import '@bendera/vscode-webview-elements/dist/events/click';
import './App.css';
import {useEffect, useRef} from 'react';
import {VscodeButton} from '@bendera/vscode-webview-elements/dist/vscode-button';

function App() {
  const buttonRef = useRef<VscodeButton>();

  useEffect(() => {
    buttonRef.current?.addEventListener('vsc-click', (ev) => {
      console.log(ev.detail.originalEvent);
    });
  }, []);

  // vscode-button is registered as a valid HTML element in the global.d.ts
  return (
    <div className="App">
      <vscode-button ref={buttonRef}>Primary button</vscode-button>
      <vscode-button secondary>Secondary button</vscode-button>
    </div>
  );
}

export default App;
