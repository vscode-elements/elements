import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from './includes/default.styles';
import {VscElement} from './includes/VscElement';

/**
 * @cssprop [--border=var(--vscode-editorGroup-border)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-row')
export class VscodeTableRow extends VscElement {
  @property({reflect: true})
  role = 'row';

  static get styles(): CSSResultGroup {
    return [
      defaultStyles,
      css`
        :host {
          display: table-row;
          width: 100%;
        }

        :host-context(vscode-table[compact]) {
          display: block;
        }

        :host-context(vscode-table[compact][bordered]) {
          border-top: 1px solid var(--border);
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
    'vscode-table-row': VscodeTableRow;
  }
}
