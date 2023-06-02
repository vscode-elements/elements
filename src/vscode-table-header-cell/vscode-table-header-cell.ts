import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-table-header-cell.styles';

/**
 * @cssprop [--foreground=var(--vscode-foreground)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-family=var(--vscode-font-family)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-size=var(--vscode-font-size)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends VscElement {
  static styles = styles;

  @property({reflect: true})
  role = 'columnheader';

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header-cell': VscodeTableHeaderCell;
  }
}
