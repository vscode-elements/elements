import {css, html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';

@customElement('vscode-table-row')
export class VscodeTableRow extends LitElement {
  @property({reflect: true})
  role = 'row';

  static styles = css`
    :host {
      display: table-row;
      width: 100%;
    }

    :host-context(vscode-table[compact]) {
      display: block;
    }

    :host-context(vscode-table[compact][bordered]) {
      border-top: 1px solid var(--vscode-editorGroup-border);
    }
  `;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-row': VscodeTableRow;
  }
}
