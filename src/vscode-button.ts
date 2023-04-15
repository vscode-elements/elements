import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import declareThemeVariables from './includes/declareThemeVariables';
import {VscElement} from './includes/VscElement';
import './vscode-icon';

/**
 * @fires vsc-click Dispatched only when button is not in disabled state.
 *
 * @cssprop [--background=var(--vscode-button-background)]
 * @cssprop [--foreground=var(--vscode-button-foreground)]
 * @cssprop [--icon-foreground=var(--vscode-button-foreground)]
 * @cssprop [--hover-background=var(--vscode-button-hoverBackground)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--secondary-foreground=var(--vscode-button-secondaryForeground)]
 * @cssprop [--secondary-background=var(--vscode-button-secondaryBackground)]
 * @cssprop [--secondary-hover-background=var(--vscode-button-secondaryHoverBackground)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 */
@customElement('vscode-button')
export class VscodeButton extends VscElement {
  @property({type: Number, reflect: true})
  tabindex = 0;

  @property({type: Boolean})
  secondary = false;

  @property({reflect: true})
  role = 'button';

  @property({type: Boolean})
  disabled = false;

  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) before the label
   */
  @property()
  icon = '';

  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) after the label
   */
  @property({attribute: 'icon-after'})
  iconAfter = '';

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
      declareThemeVariables([
        {
          componentProp: '--background',
          vscodeProp: '--vscode-button-background',
        },
        {
          componentProp: '--border',
          vscodeProp: '--vscode-button-border',
        },
        {
          componentProp: '--foreground',
          vscodeProp: '--vscode-button-foreground',
        },
        {
          componentProp: '--focus-border',
          vscodeProp: '--vscode-focusBorder',
        },
        {
          componentProp: '--icon-foreground',
          vscodeProp: '--vscode-button-foreground',
        },
        {
          componentProp: '--hover-background',
          vscodeProp: '--vscode-button-hoverBackground',
        },
        {
          componentProp: '--font-family',
          vscodeProp: '--vscode-font-family',
        },
        {
          componentProp: '--font-size',
          vscodeProp: '--vscode-font-size',
        },
        {
          componentProp: '--font-weight',
          vscodeProp: '--vscode-font-weight',
        },
        {
          componentProp: '--secondary-background',
          vscodeProp: '--vscode-button-secondaryBackground',
        },
        {
          componentProp: '--secondary-foreground',
          vscodeProp: '--vscode-button-secondaryForeground',
        },
        {
          componentProp: '--secondary-hover-background',
          vscodeProp: '--vscode-button-secondaryHoverBackground',
        },
      ]),
      css`
        :host {
          align-items: center;
          background-color: var(--background);
          border-color: var(--border);
          border-style: solid;
          border-radius: 2px;
          border-width: 1px;
          color: var(--foreground);
          cursor: pointer;
          display: inline-block;
          font-family: var(--font-family);
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          line-height: 22px;
          overflow: hidden;
          padding: 1px 13px;
          user-select: none;
        }

        :host([secondary]) {
          color: var(--secondary-foreground);
          background-color: var(--secondary-background);
        }

        :host([disabled]) {
          cursor: default;
          opacity: 0.4;
          pointer-events: none;
        }

        :host(:hover) {
          background-color: var(--hover-background);
        }

        :host([disabled]:hover) {
          background-color: var(--background);
        }

        :host([secondary]:hover) {
          background-color: var(--secondary-hover-background);
        }

        :host([secondary][disabled]:hover) {
          background-color: var(--secondary-background);
        }

        :host(:focus),
        :host(:active) {
          outline: none;
        }

        :host(:focus) {
          background-color: var(--hover-background);
          outline: 1px solid var(--focus-border);
          outline-offset: 2px;
        }

        :host([disabled]:focus) {
          background-color: var(--background);
          outline: 0;
        }

        :host([secondary]:focus) {
          background-color: var(--secondary-hover-background);
        }

        :host([secondary][disabled]:focus) {
          background-color: var(--secondary-background);
        }

        .wrapper {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          position: relative;
          width: 100%;
        }

        slot {
          display: block;
        }

        .icon {
          --foreground: var(--icon-foreground);
          display: block;
          margin-right: 3px;
        }

        .icon-after {
          --foreground: var(--icon-foreground);
          display: block;
          margin-left: 3px;
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
