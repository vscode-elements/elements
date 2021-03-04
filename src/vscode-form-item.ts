import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-form-item')
export class VscodeFormItem extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        padding: 12px 0 18px;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-item': VscodeFormItem;
  }
}
