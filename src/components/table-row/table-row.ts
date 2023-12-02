import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../../includes/VscElement.js';
import styles from './table-row.styles.js';

/**
 * @cssprop --vscode-editorGroup-border
 */
@customElement('vsc-table-row')
export class VscTableRow extends VscElement {
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
    'vsc-table-row': VscTableRow;
  }
}
