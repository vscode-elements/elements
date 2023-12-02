import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../../includes/VscElement.js';
import styles from './table-body.styles.js';

/**
 * @cssprop --vscode-keybindingTable-rowsBackground
 */
@customElement('vsc-table-body')
export class VscTableBody extends VscElement {
  static styles = styles;

  /** @internal */
  @property({reflect: true})
  role = 'rowgroup';

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vsc-table-body': VscTableBody;
  }
}
