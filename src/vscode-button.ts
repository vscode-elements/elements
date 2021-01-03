import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-button')
export class VscodeButton extends LitElement {
  @property({ type: Number, reflect: true }) tabindex: number = 0;
  @property({ type: Boolean }) secondary: boolean = false;

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      button {
        background-color: var(--vscode-button-background);
        border: 0;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--vscode-button-foreground);
        cursor: pointer;
        display: block;
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
        padding: 2px 14px;
        user-select: none;
      }

      button.secondary {
        color: var(--vscode-button-secondaryForeground);
        background-color: var(--vscode-button-secondaryBackground);
      }

      button:hover {
        background-color: var(--vscode-button-hoverBackground);
      }

      button:focus,
      button:active {
        outline: none;
      }

      button.secondary:hover {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }

      :host(:focus) {
        outline: none;
      }

      :host(:focus) button {
        outline: 1px solid var(--vscode-focusBorder);
        outline-offset: 2px;
      }
    `;
  }

  render() {
    return html`
      <button class="${this.secondary ? 'secondary' : 'primary'}">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
