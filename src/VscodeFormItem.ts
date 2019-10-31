import { LitElement, html, css, customElement } from 'lit-element';

@customElement('vscode-form-item')
export class VscodeFormItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 12px 0 18px;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
