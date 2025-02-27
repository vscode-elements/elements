import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-body.styles.js';

/**
 * @tag vscode-table-body
 *
 * @cssprop --vscode-keybindingTable-rowsBackground
 */
@customElement('vscode-table-body')
export class VscodeTableBody extends VscElement {
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
    'vscode-table-body': VscodeTableBody;
  }
}
