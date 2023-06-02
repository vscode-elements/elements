import {html, TemplateResult, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-table-cell.styles';

/**
 * @cssprop [--border=var(--vscode-editorGroup-border)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--foreground=var(--vscode-foreground)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-family=var(--vscode-font-family)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-size=var(--vscode-font-size)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-cell')
export class VscodeTableCell extends VscElement {
  static styles = styles;

  @property({reflect: true})
  role = 'cell';

  /**
   * Cell label in the compact view of the responsive mode. For internal use only.
   */
  @property({attribute: 'column-label'})
  columnLabel = '';

  /**
   * Enable compact view in the responsive mode. For internal use only.
   */
  @property({type: Boolean, reflect: true})
  compact = false;

  render(): TemplateResult {
    const columnLabelElement = this.columnLabel
      ? html`<div class="column-label" role="presentation">
          ${this.columnLabel}
        </div>`
      : nothing;

    return html`
      <div class="wrapper">
        ${columnLabelElement}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-cell': VscodeTableCell;
  }
}
