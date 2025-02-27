import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-row.styles.js';

/**
 * @tag vscode-table-row
 *
 * @cssprop --vscode-editorGroup-border
 */
@customElement('vscode-table-row')
export class VscodeTableRow extends VscElement {
  static override styles = styles;

  /** @internal */
  @property({reflect: true})
  override role = 'row';

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-row': VscodeTableRow;
  }
}
