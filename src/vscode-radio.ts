import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  state,
} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';

@customElement('vscode-radio')
export class VscodeRadio extends LitElement {
  @property()
  label = '';

  @property({type: Boolean})
  set checked(val: boolean) {
    this._checked = val;
  }
  get checked(): boolean {
    return this._checked;
  }

  @property()
  name = '';

  @property()
  value = '';

  @property({type: Number, reflect: true})
  tabindex = 0;

  @property({type: Boolean})
  disabled = false;

  @state()
  _checked = false;

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
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

  private _prevTabindex = 0;

  private _uid = `id_${new Date().valueOf()}_${Math.floor(
    Math.random() * 9999
  )}`;

  private _checkButton() {
    const root = this.getRootNode({composed: true}) as Document | ShadowRoot;

    if (!root) {
      return;
    }

    const radios = root.querySelectorAll('vscode-radio');
    this._checked = true;

    radios.forEach((r) => {
      if (r !== this) {
        r.checked = false;
      }
    });
  }

  private _handleClick() {
    if (this.disabled) {
      return;
    }

    this._checkButton();

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {
          checked: this.checked,
          label: this.label,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      this.checked = true;
    }
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
      }

      :host(:focus) {
        outline: none;
      }

      :host([disabled]) {
        opacity: 0.4;
      }

      .wrapper {
        cursor: pointer;
        display: block;
        font-size: var(--vscode-font-size);
        margin-bottom: 4px;
        margin-top: 4px;
        min-height: 18px;
        position: relative;
        user-select: none;
      }

      :host([disabled]) .wrapper {
        cursor: default;
      }

      .checkbox {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
      }

      .icon {
        align-items: center;
        background-color: var(--vscode-settings-checkboxBackground);
        background-size: 16px;
        border: 1px solid var(--vscode-settings-checkboxBorder);
        border-radius: 9px;
        box-sizing: border-box;
        display: flex;
        height: 18px;
        justify-content: center;
        left: 0;
        margin-left: 0;
        margin-right: 9px;
        padding: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 18px;
      }

      .icon.checked:before {
        background-color: currentColor;
        border-radius: 4px;
        content: '';
        height: 8px;
        left: 50%;
        margin: -4px 0 0 -4px;
        position: absolute;
        top: 50%;
        width: 8px;
      }

      :host(:focus):host(:not([disabled])) .icon {
        outline: 1px solid var(--vscode-focusBorder);
        outline-offset: -1px;
      }

      .label {
        cursor: pointer;
        padding-left: 27px;
      }

      .label-text {
        color: var(--vscode-breadcrumb-foreground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
      }

      :host([disabled]) .label-text {
        cursor: default;
      }
    `;
  }

  render(): TemplateResult {
    const icon = html`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`;
    const check = this._checked ? icon : nothing;
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
    });

    return html`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="checkbox"
          type="checkbox"
          ?checked="${this.checked}"
          value="${this.value}"
          tabindex="-1"
        />
        <div class="${iconClasses}"></div>
        <label for="${this._uid}" class="label" @click="${this._handleClick}">
          <slot><span class="label-text">${this.label}</span></slot>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-radio': VscodeRadio;
  }
}
