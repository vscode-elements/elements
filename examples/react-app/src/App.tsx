/**
 * Import the custom element definition. The custom element will be registered automatically.
 */
import '@bendera/vscode-webview-elements/dist/vscode-button/index.js';
import './App.css';

function App() {
  // vscode-button is registered as a valid HTML element in the global.d.ts
  return (
    <div className="App">
      <vscode-button>Primary button</vscode-button>
      <vscode-button secondary>Secondary button</vscode-button>
    </div>
  );
}

export default App;
