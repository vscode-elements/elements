import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-header.styles.js';

/**
 * @cssprop --vscode-keybindingTable-headerBackground - Table header background
 */
@customElement('vscode-table-header')
export class VscodeTableHeader extends VscElement {
  static styles = styles;

  /** @internal */
  @property({reflect: true})
  role = 'rowgroup';

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header': VscodeTableHeader;
  }
}
