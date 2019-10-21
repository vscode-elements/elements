import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-tab')
export class VscodeTab extends LitElement {
  @property({ type: String }) label: string;

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
    `;
  };

  render() {
    return html`
      <slot></slot>
    `;
  }
}
