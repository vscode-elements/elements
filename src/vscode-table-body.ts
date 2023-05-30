import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from './includes/default.styles';
import {VscElement} from './includes/VscElement';

/**
 * @cssprop [--tinted-row-background=var(--vscode-keybindingTable-rowsBackground)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-body')
export class VscodeTableBody extends VscElement {
  @property({reflect: true})
  role = 'rowgroup';

  static get styles(): CSSResultGroup {
    return [
      defaultStyles,
      css`
        :host {
          display: table;
          table-layout: fixed;
          width: 100%;
        }

        :host-context(vscode-table[zebra])
          ::slotted(vscode-table-row:nth-child(even)) {
          background-color: var(--tinted-row-background);
        }

        :host-context(vscode-table[zebra-odd])
          ::slotted(vscode-table-row:nth-child(odd)) {
            background-color: var(--tinted-row-background);
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
    'vscode-table-body': VscodeTableBody;
  }
}
