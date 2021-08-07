import {css, html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('vscode-table-header')
export class VscodeTableHeader extends LitElement {
  @property({reflect: true})
  role = 'rowgroup';

  static styles = css`
    :host {
      background-color: rgba(130, 130, 130, 0.04);
      display: table;
      table-layout: fixed;
      width: 100%;
    }
  `;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header': VscodeTableHeader;
  }
}
