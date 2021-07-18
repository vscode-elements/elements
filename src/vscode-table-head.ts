import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-head')
export class VscodeTableHead extends LitElement {
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
    'vscode-table-head': VscodeTableHead;
  }
}
