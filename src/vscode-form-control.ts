import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-form-control')
export class VscodeFormControl extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        margin-top: 9px;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-control': VscodeFormControl;
  }
}
