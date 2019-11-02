import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-button')
export class VscodeButton extends LitElement {
  @property({ type: Number, reflect: true }) tabindex: number = 0;

  static get styles() {
    return css`
      :host {
        background-color: var(--vscode-button-background);
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

      :host(:hover) {
        background-color: var(--vscode-button-hoverBackground);
      }

      :host(:focus) {
        outline: 1px solid var(--vscode-focusBorder);
        outline-offset: 2px;
      }
    `;
  };

  render() {
    return html`
      <slot></slot>
    `;
  }
}
