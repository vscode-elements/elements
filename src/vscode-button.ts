import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-button')
export class VscodeButton extends LitElement {
  @property({type: Number, reflect: true}) tabindex = 0;
  @property({type: Boolean}) secondary = false;
  @property({type: String, reflect: true}) role = 'button';
  @property({type: Boolean, reflect: false}) disabled = false;

  private _prevTabindex = 0;

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.addEventListener('click', this._handleClick.bind(this));
  }

  attributeChangedCallback(name: string): void {
    if (name === 'disabled' && this.hasAttribute('disabled')) {
      this._prevTabindex = this.tabindex;
      this.tabindex = -1;
    } else if (name === 'disabled' && !this.hasAttribute('disabled')) {
      this.tabindex = this._prevTabindex;
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      !this.hasAttribute('disabled')
    ) {
      this.dispatchEvent(
        new CustomEvent('vsc-click', {
          detail: {
            originalEvent: event,
          },
        })
      );
    }
  }

  private _handleClick(event: MouseEvent) {
    if (!this.hasAttribute('disabled')) {
      this.dispatchEvent(
        new CustomEvent('vsc-click', {
          detail: {
            originalEvent: event,
          },
        })
      );
    }
  }

  static get styles(): CSSResult {
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

      :host([disabled]) {
        cursor: default;
        opacity: 0.4;
        pointer-events: none;
      }

      :host(:hover) {
        background-color: var(--vscode-button-hoverBackground);
      }

      :host([disabled]:hover) {
        background-color: var(--vscode-button-background);
      }

      :host([secondary]:hover) {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }

      :host([secondary][disabled]:hover) {
        background-color: var(--vscode-button-secondaryBackground);
      }

      :host(:focus),
      :host(:active) {
        outline: none;
      }

      :host(:focus) {
        background-color: var(--vscode-button-hoverBackground);
        outline: 1px solid var(--vscode-focusBorder);
      }

      :host([disabled]:focus) {
        background-color: var(--vscode-button-background);
        outline: 0;
      }

      :host([secondary]:focus) {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }

      :host([secondary][disabled]:focus) {
        background-color: var(--vscode-button-secondaryBackground);
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
