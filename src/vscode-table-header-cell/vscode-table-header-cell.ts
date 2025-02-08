import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-header-cell.styles.js';

/**
 * @tag vscode-table-header-cell
 *
 * @cssprop --vscode-foreground
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 */
@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends VscElement {
  static override styles = styles;

  /** @internal */
  @property({reflect: true})
  override role = 'columnheader';

  override render(): TemplateResult {
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
