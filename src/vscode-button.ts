import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-button')
export class VscodeButton extends LitElement {
  @property({ type: Number, reflect: true }) tabindex: number = 0;
  @property({ type: Boolean }) secondary: boolean = false;

  private _handleClick(event: MouseEvent) {
    this.dispatchEvent(new MouseEvent('click', event));
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--vscode-button-background);
        border: 0;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--vscode-button-foreground);
        cursor: pointer;
        display: inline-block;
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
        padding: 2px 14px;
        user-select: none;
      }

      :host([secondary]) {
        color: var(--vscode-button-secondaryForeground);
        background-color: var(--vscode-button-secondaryBackground);
      }

      :host(:hover) {
        background-color: var(--vscode-button-hoverBackground);
      }

      :host(:focus),
      :host(:active) {
        outline: none;
      }

      :host([secondary]:hover) {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }

      :host(:focus) {
        background-color: var(--vscode-button-hoverBackground);
        outline: 1px solid var(--vscode-focusBorder);
      }

      :host([secondary]:focus) {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }
    `;
  }

  render() {
    return html`
      <slot @click="${this._handleClick}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
