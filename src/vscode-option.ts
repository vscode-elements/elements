import {LitElement, html, css, property, customElement, CSSResult} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({type: String})
  set value(val: string) {
    const oldVal = this._value;

    this._value = typeof val !== 'string' ? '' : val;
    this.requestUpdate('value', oldVal);
  }
  get value(): string {
    if (typeof this._value === 'string') {
      return this._value;
    } else if (this._value === undefined) {
      return this._label || '';
    }

    return '';
  }
  @property({type: String})
  set label(val: string) {
    const oldVal = this._label;

    this._label = val;
    this.requestUpdate('label', oldVal);
  }
  get label(): string {
    return this.innerText;
  }
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: Boolean, reflect: true}) active = false;
  @property({type: Boolean, attribute: false}) multiple = false;

  private _value: string | undefined;
  private _label: string | undefined;
  private _mainSlot: HTMLSlotElement | null = null;

  constructor() {
    super();
  }

  firstUpdated() {
    this._mainSlot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;

    if (this._mainSlot) {
      this._mainSlot.addEventListener(
        'slotchange',
        this._onSlotChange.bind(this)
      );
    }
  }

  private _onSlotChange() {
    this.dispatchEvent(
      new CustomEvent('vsc-slotchange', {
        detail: {
          innerText: this.innerText,
        },
        composed: true,
        bubbles: false,
      })
    );

    this.label = this.innerText;
  }

  static get styles(): CSSResult {
    return css`
      .wrapper {
        align-items: center;
        color: var(--vscode-foreground);
        cursor: pointer;
        display: flex;
        font-size: var(--vscode-font-size);
        line-height: 1.3;
        min-height: calc(var(--vscode-font-size) * 1.3);
        padding: 1px 3px;
        user-select: none;
      }

      :host([active]) .wrapper {
        background-color: var(--vscode-quickInput-list\\.focusBackground, var(--vscode-list-focusBackground));
      }

      .wrapper:hover {
        background-color: var(--vscode-quickInput-list\\.focusBackground, var(--vscode-list-focusBackground));
      }

      input {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .icon {
        background-color: var(--vscode-settings-checkboxBackground);
        border: 1px solid currentColor;
        border-radius: 2px;
        box-sizing: border-box;
        height: 14px;
        margin-right: 5px;
        overflow: hidden;
        position: relative;
        width: 14px;
      }

      .icon.checked:before,
      .icon.checked:after {
        content: '';
        display: block;
        height: 5px;
        position: absolute;
        transform: rotate(-45deg);
        width: 10px;
      }

      .icon.checked:before {
        background-color: currentColor;
        left: 1px;
        top: 2.5px;
      }

      .icon.checked:after {
        background-color: var(--vscode-settings-checkboxBackground);
        left: 1px;
        top: -0.5px;
      }

      .empty-placeholder:before {
        content: '-';
        visibility: hidden;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        ${this.multiple
          ? html`
              <span
                class="${classMap({ icon: true, checked: this.selected })}"
              ></span>
            `
          : nothing}
        <slot><span class="empty-placeholder"></span></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-option': VscodeOption;
  }
}
