import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('vscode-table-row')
export class VscodeTableRow extends LitElement {
  @property({reflect: true})
  role = 'row';

  static styles = css`
    :host {
      display: table-row;
      width: 100%;
    }
  `;

  render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-row': VscodeTableRow;
  }
}
