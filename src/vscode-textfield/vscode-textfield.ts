import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-textfield.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

type InputType =
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
  | 'week';

/**
 * A simple inline textfield
 *
 * @slot content-before
 * @slot content-after
 *
 * @fires {InputEvent} input
 * @fires {InputEvent} change
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
export class VscodeTextfield
  extends VscElement
  implements AssociatedFormControl
{
  static styles = styles;

  /** @internal */
  static get formAssociated() {
    return true;
  }

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean, reflect: true})
  autofocus = false;

  @property({attribute: 'default-value'})
  defaultValue = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  focused = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  /**
   * @internal
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

  @property({reflect: true})
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

  /** @internal */
  @property({type: Number, reflect: true})
  tabindex = 0;

  /**
   * Same as the `type` of the native `<input>` element but only a subset of types are supported.
   * The supported ones are: `color`,`date`,`datetime-local`,`email`,`file`,`month`,`number`,`password`,`search`,`tel`,`text`,`time`,`url`,`week`
   */
  @property({reflect: true})
  set type(val: InputType) {
    const validTypes: InputType[] = [
      'color',
      'date',
      'datetime-local',
      'email',
      'file',
      'month',
      'number',
      'password',
      'search',
      'tel',
      'text',
      'time',
      'url',
      'week',
    ];

    this._type = (
      validTypes.includes(val as InputType) ? val : 'text'
    ) as InputType;
  }
  get type(): InputType {
    return this._type;
  }

  @property()
  set value(val: string) {
    if (this.type !== 'file') {
      this._value = val;
      this._internals.setFormValue(val);
    }
  }
  get value(): string {
    return this._value;
  }

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  get validity(): ValidityState {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  checkValidity() {
    this._setValidityFromInput();
    return this._internals.checkValidity();
  }

  reportValidity() {
    this._setValidityFromInput();
    return this._internals.reportValidity();
  }

  get wrappedElement(): HTMLInputElement {
    return this._inputEl;
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._inputEl.checkValidity();
      this._setValidityFromInput();
    });
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);

    const validationRelatedAttributes = [
      'max',
      'maxlength',
      'min',
      'minlength',
      'pattern',
      'required',
      'step'
    ];

    if (validationRelatedAttributes.includes(name)) {
      this.updateComplete.then(() => {
        this._setValidityFromInput();
      });
    }
  }

  /** @internal */
  formResetCallback(): void {
    this.value = this.defaultValue;
    this.requestUpdate();
  }

  /** @internal */
  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    this.value = state;
  }

  @query('#input')
  private _inputEl!: HTMLInputElement;

  @state()
  private _value = '';

  @state()
  private _type: InputType = 'text';

  private _internals: ElementInternals;

  private _dataChanged() {
    this._value = this._inputEl.value;

    if (this.type === 'file' && this._inputEl.files) {
      for (const f of this._inputEl.files) {
        this._internals.setFormValue(f);
      }
    } else {
      this._internals.setFormValue(this._inputEl.value);
    }
  }

  private _setValidityFromInput() {
    this._internals.setValidity(
      this._inputEl.validity,
      this._inputEl.validationMessage,
      this._inputEl
    );
  }

  private _onInput() {
    this._dataChanged();
    this._setValidityFromInput();
  }

  private _onChange(ev: InputEvent) {
    this._dataChanged();
    this._setValidityFromInput();
    this.dispatchEvent(new InputEvent('change', {data: ev.data}));
  }

  private _onFocus() {
    this.focused = true;
  }

  private _onBlur() {
    this.focused = false;
  }

  private _onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Enter' && this._internals.form) {
      this._internals.form?.requestSubmit();
    }
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
        .value=${ifDefined(this.type !== 'file' ? this._value : undefined)}
        @blur=${this._onBlur}
        @change=${this._onChange}
        @focus=${this._onFocus}
        @input=${this._onInput}
        @keydown=${this._onKeyDown}
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
