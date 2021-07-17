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
      display: table-header-group;
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
