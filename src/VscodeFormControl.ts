import { LitElement, html, css, customElement } from 'lit-element';

@customElement('vscode-form-control')
export class VscodeFormControl extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-top: 9px;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
