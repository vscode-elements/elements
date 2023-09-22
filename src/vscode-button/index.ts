import {VscodeButton} from './vscode-button.js';

export {VscodeButton} from './vscode-button.js';

VscodeButton.registerAs('vscode-button');

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
