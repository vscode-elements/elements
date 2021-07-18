import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-cell')
export class VscodeTableCell extends LitElement {
  @property({reflect: true})
  role = 'cell';

  static styles = css`
    :host {
      display: table-cell;
      height: 24px;
      vertical-align: middle;
    }

    :host-context(vscode-table[bordered]) {
      border-top: 1px solid var(--vscode-editorGroup-border);
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
    'vscode-table-cell': VscodeTableCell;
  }
}
