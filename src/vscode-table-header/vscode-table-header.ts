import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from '../includes/default.styles';
import {VscElement} from '../includes/VscElement';

/**
 * @cssprop [--header-background=var(--vscode-keybindingTable-headerBackground)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-header')
export class VscodeTableHeader extends VscElement {
  @property({reflect: true})
  role = 'rowgroup';

  static get styles(): CSSResultGroup {
    return [
      defaultStyles,
      css`
        :host {
          background-color: var(--header-background);
          display: table;
          table-layout: fixed;
          width: 100%;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header': VscodeTableHeader;
  }
}
