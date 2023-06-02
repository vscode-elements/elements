import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-table-header.styles';

/**
 * @cssprop [--header-background=var(--vscode-keybindingTable-headerBackground)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-header')
export class VscodeTableHeader extends VscElement {
  static styles = styles;

  @property({reflect: true})
  role = 'rowgroup';

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header': VscodeTableHeader;
  }
}
