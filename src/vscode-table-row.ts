import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';
import declareThemeVariables from './includes/declareThemeVariables';

/**
 * @cssprop [--border=var(--vscode-editorGroup-border)]
 */
@customElement('vscode-table-row')
export class VscodeTableRow extends VscElement {
  @property({reflect: true})
  role = 'row';

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      declareThemeVariables([
        {
          componentProp: '--border',
          vscodeProp: '--vscode-editorGroup-border'
        }
      ]),
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
