import {html, TemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-cell.styles.js';

/**
 * @tag vscode-table-cell
 *
 * @cssprop --vscode-editorGroup-border
 * @cssprop --vscode-foreground
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 */
@customElement('vscode-table-cell')
export class VscodeTableCell extends VscElement {
  static override styles = styles;

  /** @internal */
  @property({reflect: true})
  override role = 'cell';

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

  override render(): TemplateResult {
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
