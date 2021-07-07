import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-form-helper')
export class VscodeFormHelper extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 4px;
      margin-top: 4px;
      max-width: 720px;
    }
  `;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-helper': VscodeFormHelper;
  }
}
