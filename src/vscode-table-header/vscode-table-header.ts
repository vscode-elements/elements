import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-header.styles.js';

/**
 * @tag vscode-table-header
 *
 * @cssprop --vscode-keybindingTable-headerBackground - Table header background
 */
@customElement('vscode-table-header')
export class VscodeTableHeader extends VscElement {
  static override styles = styles;

  /** @internal */
  @property({reflect: true})
  override role = 'rowgroup';

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header': VscodeTableHeader;
  }
}
