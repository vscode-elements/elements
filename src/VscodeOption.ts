import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: String }) description: string = '';

  static get styles() {
    return css`
      :host {
        display: block;
        user-select: none;
      }

      :host(:hover) {
        background-color: var(--vscode-list-hoverBackground);
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
