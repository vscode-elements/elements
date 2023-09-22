import {VscodeIcon} from './vscode-icon.js';

export {VscodeIcon} from './vscode-icon.js';

VscodeIcon.registerAs('vscode-icon');

declare global {
  interface HTMLElementTagNameMap {
    'vscode-icon': VscodeIcon;
  }
}
