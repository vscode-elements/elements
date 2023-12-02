import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../../includes/VscElement.js';
import styles from './table-header-cell.styles.js';

/**
 * @cssprop --vscode-foreground
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 */
@customElement('vscode-table-header-cell')
export class VscTableHeaderCell extends VscElement {
  static styles = styles;

  /** @internal */
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
    'vscode-table-header-cell': VscTableHeaderCell;
  }
}
