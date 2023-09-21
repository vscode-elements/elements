import {html, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-textfield.styles.js';

/**
 * A simple inline textfield
 *
 * @slot content-before
 * @slot content-after
 *
 * @cssprop [--background=var(--vscode-settings-textInputBackground)]
 * @cssprop [--border=var(--vscode-settings-textInputBorder)]
 * @cssprop [--foreground=var(--vscode-settings-textInputForeground)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--placeholder=var(--vscode-input-placeholderForeground)]
 * @cssprop [--button-background=var(--vscode-button-background)]
 * @cssprop [--button-foreground=var(--vscode-button-foreground)]
 * @cssprop [--button-hover=var(--vscode-button-hoverBackground)]
 */
@customElement('vscode-textfield')
export class VscodeTextfield extends VscElement {
  static styles = styles;

  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean})
  autofocus = false;

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

  @property({type: Number})
  max: number | undefined = undefined;

  @property({type: Number})
  maxlength: number | undefined = undefined;

  @property({type: Number})
  min: number | undefined = undefined;

  @property({type: Number})
  minlength: number | undefined = undefined;

  @property({type: Boolean, reflect: true})
  multiple = false;

  @property()
  name: string | undefined = undefined;

  @property()
  pattern: string | undefined = undefined;

  @property()
  placeholder: string | undefined = undefined;

  @property({type: Boolean, reflect: true})
  readonly = false;

  @property({type: Boolean, reflect: true})
  required = false;

  @property({type: Number})
  step: number | undefined = undefined;

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

  render(): TemplateResult {
    return html`
      <slot name="content-before"></slot>
      <input
        id="input"
        type=${this.type}
        ?autofocus=${this.autofocus}
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
