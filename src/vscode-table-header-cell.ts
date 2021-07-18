import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends LitElement {
  static styles = css`
    :host {
      align-items: center;
      display: flex;
      font-weight: bold;
      height: 30px;
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
