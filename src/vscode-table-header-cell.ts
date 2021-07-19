import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property,
} from 'lit-element';

@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends LitElement {
  @property({reflect: true})
  role = 'columnheader';

  static styles = css`
    :host {
      align-items: center;
      display: flex;
      font-family: var(--vscode-font-style);
      font-size: var(--vscode-font-size);
      font-weight: bold;
      line-height: 20px;
      padding-bottom: 5px;
      padding-top: 5px;
      vertical-align: middle;
    }

    .wrapper {
      padding-bottom: var(--padding-bottom, 0);
      padding-left: var(--padding-left, 10px);
      padding-right: var(--padding-right, 0);
      padding-top: var(--padding-top, 0);
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
    'vscode-table-header-cell': VscodeTableHeaderCell;
  }
}
