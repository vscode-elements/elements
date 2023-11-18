import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-row.styles.js';

/**
 * @cssprop --vscode-editorGroup-border
 */
@customElement('vscode-table-row')
export class VscodeTableRow extends VscElement {
  static styles = styles;

  /** @internal */
  @property({reflect: true})
  role = 'row';

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-row': VscodeTableRow;
  }
}
