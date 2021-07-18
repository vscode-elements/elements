import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-th')
export class VscodeTableTh extends LitElement {
  static styles = css`
    :host {
      align-items: center;
      display: flex;
      font-weight: bold;
      height: 30px;
      vertical-align: middle;
    }

    .wrapper {
      padding-left: 10px;
    }
  `;

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-th': VscodeTableTh;
  }
}
