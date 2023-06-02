import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-table-row.styles';

/**
 * @cssprop [--border=var(--vscode-editorGroup-border)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-row')
export class VscodeTableRow extends VscElement {
  static styles = styles;

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
