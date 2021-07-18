import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-table-body')
export class VscodeTableBody extends LitElement {
  static styles = css`
    :host {
      border-top: 1px solid var(--vscode-editorGroup-border);
      display: table;
      width: 100%;
    }

    ::slotted(vscode-table-row:nth-child(odd)) {
      background-color: rgba(130, 130, 130, 0.04);;
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
    'vscode-table-body': VscodeTableBody;
  }
}
