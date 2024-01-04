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
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @slot content-before - A slot before the editable area but inside of the component. It is used to place icons.
 * @slot content-after - A slot after the editable area but inside of the component. It is used to place icons.
 *
 * @fires {InputEvent} input
 * @fires {Event} change
 *
 * @cssprop --vscode-settings-textInputBackground
 * @cssprop --vscode-settings-textInputBorder
 * @cssprop --vscode-settings-textInputForeground
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-input-placeholderForeground
 * @cssprop --vscode-button-background
 * @cssprop --vscode-button-foreground
 * @cssprop --vscode-button-hoverBackground
 */
@customElement('vscode-textfield')
export class VscodeTextfield
  extends VscElement
  implements AssociatedFormControl
{
  static styles = styles;

  /** @internal */
  static formAssociated = true;

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
  maxLength: number | undefined = undefined;

  @property({type: Number})
  min: number | undefined = undefined;

  @property({type: Number})
  minLength: number | undefined = undefined;

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

  /**
   * Lowercase alias to minLength
   */
  set minlength(val: number) {
    this.minLength = val;
  }

  get minlength(): number | undefined {
    return this.minLength;
  }

  /**
   * Lowercase alias to maxLength
   */
  set maxlength(val: number) {
    this.maxLength = val;
  }

  get maxlength(): number | undefined {
    return this.maxLength;
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
      this._internals.setFormValue(this._inputEl.value);
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
      'step',
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

  private _onInput(ev: InputEvent) {
    this._dataChanged();
    this._setValidityFromInput();

    // native input event dispatched automatically
    /** @deprecated */
    this.dispatchEvent(
      new CustomEvent('vsc-input', {detail: {data: ev.data, originalEvent: ev}})
    );
  }

  private _onChange(ev: Event) {
    this._dataChanged();
    this._setValidityFromInput();
    this.dispatchEvent(new Event('change'));
    /** @deprecated */
    this.dispatchEvent(
      new CustomEvent<{data: string; originalEvent: Event}>('vsc-change', {
        detail: {data: this.value, originalEvent: ev},
      })
    );
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
        maxlength=${ifDefined(this.maxLength)}
        min=${ifDefined(this.min)}
        minlength=${ifDefined(this.minLength)}
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
