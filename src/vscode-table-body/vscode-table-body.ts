import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-body.styles.js';

/**
 * @tag vscode-table-body
 *
 * @cssprop --vscode-keybindingTable-rowsBackground
 */
@customElement('vscode-table-body')
export class VscodeTableBody extends VscElement {
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
    'vscode-table-body': VscodeTableBody;
  }
}
