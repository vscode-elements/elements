import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-header')
export class VscodeTableHeader extends LitElement {
  static styles = css`
    :host {
      background-color: rgba(130, 130, 130, 0.04);
      display: flex;
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
    'vscode-table-header': VscodeTableHeader;
  }
}
