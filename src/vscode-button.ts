import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from './includes/VscElement';
import './vscode-icon';

/**
 * @fires vsc-click - Dispatched only if the disabled attribute is false.
 */
@customElement('vscode-button')
export class VscodeButton extends VscElement {
  @property({type: Number, reflect: true}) tabindex = 0;
  @property({type: Boolean}) secondary = false;
  @property({reflect: true}) role = 'button';
  @property({type: Boolean}) disabled = false;
  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) before the label
   */
  @property() icon = '';
  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) after the label
   */
  @property() iconAfter = '';

  @property({type: Boolean, reflect: true})
  focused = false;

  private _prevTabindex = 0;

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.addEventListener('click', this._handleClick.bind(this));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._handleFocusBound);
    this.addEventListener('blur', this._handleBlurBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._handleFocusBound);
    this.removeEventListener('blur', this._handleBlurBound);
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    super.attributeChangedCallback(name, oldVal, newVal);

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
        new CustomEvent<{
          originalEvent: MouseEvent;
        }>('vsc-click', {
          detail: {
            originalEvent: new MouseEvent('click'),
          },
        })
      );
    }
  }

  private _handleClick(event: MouseEvent) {
    if (!this.hasAttribute('disabled')) {
      this.dispatchEvent(
        new CustomEvent<{
          originalEvent: MouseEvent;
        }>('vsc-click', {
          detail: {
            originalEvent: event,
          },
        })
      );
    }
  }

  private _handleFocus() {
    this.focused = true;
  }

  private _handleFocusBound = this._handleFocus.bind(this);

  private _handleBlur() {
    this.focused = false;
  }

  private _handleBlurBound = this._handleBlur.bind(this);

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          align-items: center;
          background-color: var(--vscode-button-background);
          border: 0;
          border-radius: 2px;
          box-sizing: border-box;
          color: var(--vscode-button-foreground);
          cursor: pointer;
          display: inline-flex;
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          line-height: 22px;
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
          outline-offset: 2px;
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

        .wrapper {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          position: relative;
          width: 100%;
        }

        .wrapper.has-icon-before {
          padding-left: 21px;
        }

        .wrapper.has-icon-after {
          padding-right: 21px;
        }

        .icon {
          color: var(--vscode-button-foreground);
          left: 0;
          position: absolute;
        }

        .icon-after {
          color: var(--vscode-button-foreground);
          position: absolute;
          right: 0;
        }
      `,
    ];
  }

  render(): TemplateResult {
    const hasIcon = this.icon !== '';
    const hasIconAfter = this.iconAfter !== '';
    const wrapperClasses = {
      wrapper: true,
      'has-icon-before': hasIcon,
      'has-icon-after': hasIconAfter,
    };

    const iconElem = hasIcon
      ? html`<vscode-icon name="${this.icon}" class="icon"></vscode-icon>`
      : nothing;

    const iconAfterElem = hasIconAfter
      ? html`<vscode-icon
          name="${this.iconAfter}"
          class="icon-after"
        ></vscode-icon>`
      : nothing;

    return html`
      <span class="${classMap(wrapperClasses)}">
        ${iconElem}
        <slot></slot>
        ${iconAfterElem}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
