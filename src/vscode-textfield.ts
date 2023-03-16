import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from './includes/VscElement';

/**
 * A simple inline textfield
 *
 * @slot content-before
 * @slot content-after
 */
@customElement('vscode-textfield')
export class VscodeTextfield extends VscElement {
  @property()
  autocomplete = undefined;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  focused = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  /**
   * Set `aria-label` for the inner input element. Should not be set,
   * vscode-label will do it automatically.
   */
  @property({attribute: false})
  label = '';

  @property()
  max = undefined;

  @property()
  maxlength = undefined;

  @property()
  min = undefined;

  @property()
  minlength = undefined;

  @property({type: Boolean})
  multiple = false;

  @property()
  name = undefined;

  @property()
  pattern = undefined;

  @property()
  placeholder = undefined;

  @property({type: Boolean, reflect: true})
  readonly = false;

  @property({type: Boolean, reflect: true})
  required = false;

  @property()
  step = undefined;

  @property()
  type:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = 'text';

  @property()
  set value(val: string) {
    this._value = val;
  }

  get value(): string {
    return this._value;
  }

  get wrappedElement(): HTMLInputElement {
    return this._inputEl;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._validate();
    });
  }

  focus(): void {
    this._inputEl.focus();
  }

  checkValidity(): boolean {
    this._validate();
    return !this.invalid;
  }

  @query('#input')
  private _inputEl!: HTMLInputElement;

  private _value = '';

  private _validate() {
    this.invalid = !this._inputEl.checkValidity();
  }

  private _onInvalid(ev: Event) {
    this.dispatchEvent(
      new CustomEvent('vsc-invalid', {detail: {originalEvent: ev}})
    );
  }

  private _onInput(ev: InputEvent) {
    this._value = this._inputEl.value;

    this.dispatchEvent(
      new CustomEvent('vsc-input', {detail: {data: ev.data, originalEvent: ev}})
    );
  }

  private _onChange(ev: InputEvent) {
    this._value = this._inputEl.value;

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {data: ev.data, originalEvent: ev},
      })
    );
  }

  private _onFocus() {
    this.focused = true;
  }

  private _onBlur() {
    this.focused = false;
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          align-items: center;
          background-color: var(--vscode-input-background, #ffffff);
          border-color: var(--vscode-settings-textInputBorder, #cecece);
          border-radius: 2px;
          border-style: solid;
          border-width: 1px;
          display: inline-flex;
          max-width: 100%;
          position: relative;
          width: 320px;
        }

        :host([focused]) {
          border-color: var(--vscode-focusBorder, #0090f1);
        }

        :host([disabled]) {
          cursor: not-allowed;
          opacity: 0.5;
        }

        :host([invalid]) {
          border-color: var(--vscode-inputValidation-errorBorder, #be1100);
        }

        ::slotted([slot='content-before']) {
          display: block;
          margin-left: 2px;
        }

        ::slotted([slot='content-after']) {
          display: block;
          margin-right: 2px;
        }

        slot[name='content-before'],
        slot[name='content-after'] {
          align-items: center;
          display: flex;
        }

        input {
          background-color: var(--vscode-input-background, #ffffff);
          border: 0;
          box-sizing: border-box;
          color: var(--vscode-input-foreground, #616161);
          display: block;
          font-family: var(
            --vscode-font-family,
            "'Segoe WPC', 'Segoe UI', sans-serif"
          );
          font-size: var(--vscode-font-size, 13px);
          font-weight: var(--vscode-font-weight);
          line-height: 18px;
          outline: none;
          padding-bottom: 3px;
          padding-left: 4px;
          padding-right: 4px;
          padding-top: 3px;
          width: 100%;
        }

        input:read-only {
          cursor: not-allowed;
        }

        input::placeholder {
          color: var(--vscode-input-placeholderForeground, #767676);
          opacity: 1;
        }

        input[type=file] {
          line-height: 26px;
          padding-bottom: 0;
          padding-left: 2px;
          padding-top: 0;
        }

        input[type=file]::file-selector-button {
          background-color: var(--vscode-button-background);
          border: 0;
          border-radius: 2px;
          color: var(--vscode-button-foreground);
          cursor: pointer;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          line-height: 20px;
          padding: 1px 14px;
        }

        input[type=file]::file-selector-button:hover {
          background-color: var(--vscode-button-hoverBackground);
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <slot name="content-before"></slot>
      <input
        id="input"
        type=${this.type}
        autocomplete=${ifDefined(this.autocomplete)}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        max=${ifDefined(this.max)}
        maxlength=${ifDefined(this.maxlength)}
        min=${ifDefined(this.min)}
        minlength=${ifDefined(this.minlength)}
        ?multiple=${this.multiple}
        name=${ifDefined(this.name)}
        pattern=${ifDefined(this.pattern)}
        placeholder=${ifDefined(this.placeholder)}
        ?readonly=${this.readonly}
        ?required=${this.required}
        step=${ifDefined(this.step)}
        .value=${this._value}
        @blur=${this._onBlur}
        @change=${this._onChange}
        @focus=${this._onFocus}
        @input=${this._onInput}
        @invalid=${this._onInvalid}
      />
      <slot name="content-after"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-textfield': VscodeTextfield;
  }
}
