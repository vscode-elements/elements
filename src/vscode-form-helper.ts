import {
  LitElement,
  html,
  css,
  customElement,
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

    :host([vertical]) {
      margin-left: 0;
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
