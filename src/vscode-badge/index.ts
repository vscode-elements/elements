import {VscodeBadge} from './vscode-badge.js';

export {VscodeBadge} from './vscode-badge.js';

VscodeBadge.registerAs('vscode-badge');

declare global {
  interface HTMLElementTagNameMap {
    'vscode-badge': VscodeBadge;
  }
}
