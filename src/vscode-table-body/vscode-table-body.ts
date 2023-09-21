import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-body.styles.js';

/**
 * @cssprop [--tinted-row-background=var(--vscode-keybindingTable-rowsBackground)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-body')
export class VscodeTableBody extends VscElement {
  static styles = styles;

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
