import {html, LitElement, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from '../includes/form-button-widget/FormButtonWidgetBase.js';
import {LabelledCheckboxOrRadioMixin} from '../includes/form-button-widget/LabelledCheckboxOrRadio.js';
import styles from './vscode-radio.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

/**
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @tag vscode-radio
 *
 * @attr name - Name which is used as a variable name in the data of the form-container.
 * @attr label - Attribute pair of the `label` property.
 *
 * @prop label - Label text. It is only applied if component's innerHTML doesn't contain any text.
 *
 * @fires {Event} change - Dispatched when checked state is changed.
 * @fires {Event} invalid - Dispatched when the element is invalid and `checkValidity()` has been called or the form containing this element is submitted.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event)
 *
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vsc-foreground-translucent - Label font color. 90% transparency version of `--vscode-foreground` by default.
 * @cssprop --vscode-settings-checkboxBackground
 * @cssprop --vscode-settings-checkboxBorder
 * @cssprop --vscode-settings-checkboxForeground
 * @cssprop --vscode-focusBorder
 */
@customElement('vscode-radio')
export class VscodeRadio
  extends LabelledCheckboxOrRadioMixin(FormButtonWidgetBase)
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

  @property({type: Boolean, reflect: true})
  autofocus = false;

  @property({type: Boolean, reflect: true})
  checked = false;

  @property({type: Boolean, reflect: true, attribute: 'default-checked'})
  defaultChecked = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  /**
   * Name which is used as a variable name in the data of the form-container.
   */
  @property({reflect: true})
  name = '';

  @property()
  value = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  required = false;

  /** @internal */
  @property({reflect: true})
  role = 'radio';

  /** @internal */
  @property({type: Number, reflect: true})
  tabIndex = 0;

  @state()
  private _slottedText = '';

  @query('#input')
  private _inputEl!: HTMLInputElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('click', this._handleClick);

    this._handleValueChange();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('click', this._handleClick);
  }

  update(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.update(changedProperties);

    if (changedProperties.has('checked')) {
      this._handleValueChange();
    }

    if (changedProperties.has('required')) {
      this._handleValueChange();
    }
  }

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  /** @internal */
  @property()
  type = 'radio';

  get validity(): ValidityState {
    return this._internals.validity;
  }

  get validationMessage(): string {
    return this._internals.validationMessage;
  }

  get willValidate(): boolean {
    return this._internals.willValidate;
  }

  checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  /** @internal */
  formResetCallback(): void {
    const radios = this._getRadios();

    radios.forEach((r) => {
      r.checked = r.defaultChecked;
    });

    this.updateComplete.then(() => {
      this._handleValueChange();
    });
  }

  /** @internal */
  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    if (this.value === state && state !== '') {
      this.checked = true;
    }
  }

  private _dispatchCustomEvent() {
    /** @deprecated - Use the native `change` event instead. */
    this.dispatchEvent(
      new CustomEvent<{checked: boolean; label: string; value: string}>(
        'vsc-change',
        {
          detail: {
            checked: this.checked,
            label: this.label,
            value: this.value,
          },
          bubbles: true,
          composed: true,
        }
      )
    );
  }

  private _getRadios(): VscodeRadio[] {
    const root = this.getRootNode({composed: true}) as Document | ShadowRoot;

    if (!root) {
      return [];
    }

    const radios = root.querySelectorAll(
      `vscode-radio[name="${this.name}"]`
    ) as NodeListOf<VscodeRadio>;

    return Array.from(radios);
  }

  private _uncheckOthers(radios: VscodeRadio[]) {
    radios.forEach((r) => {
      if (r !== this) {
        r.checked = false;
      }
    });
  }

  private _checkButton() {
    const radios = this._getRadios();
    this.checked = true;

    radios.forEach((r) => {
      if (r !== this) {
        r.checked = false;
      }
    });
  }

  /**
   * @internal
   */
  setComponentValidity(isValid: boolean) {
    if (isValid) {
      this._internals.setValidity({});
    } else {
      this._internals.setValidity(
        {
          valueMissing: true,
        },
        'Please select one of these options.',
        this._inputEl
      );
    }
  }

  private _setGroupValidity(radios: VscodeRadio[], isValid: boolean) {
    this.updateComplete.then(() => {
      radios.forEach((r) => {
        r.setComponentValidity(isValid);
      });
    });
  }

  private _setActualFormValue() {
    let actualValue: string | null = '';

    if (this.checked) {
      actualValue = !this.value ? 'on' : this.value;
    } else {
      actualValue = null;
    }

    this._internals.setFormValue(actualValue);
  }

  private _handleValueChange() {
    const radios = this._getRadios();
    const anyRequired = radios.some((r) => {
      return r.required;
    });

    this._setActualFormValue();

    if (this.checked) {
      this._uncheckOthers(radios);
      this._setGroupValidity(radios, true);
    } else {
      const anyChecked = !!radios.find((r) => r.checked);
      const isInvalid = anyRequired && !anyChecked;

      this._setGroupValidity(radios, !isInvalid);
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) {
      return;
    }

    if (!this.checked) {
      this._checkButton();
      this._handleValueChange();
      this._dispatchCustomEvent();
      this.dispatchEvent(new Event('change', {bubbles: true}));
    }
  };

  protected _handleKeyDown = (ev: KeyboardEvent): void => {
    if (!this.disabled && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();

      if (ev.key === ' ' && !this.checked) {
        this.checked = true;
        this._handleValueChange();
        this._dispatchCustomEvent();
        this.dispatchEvent(new Event('change', {bubbles: true}));
      }

      if (ev.key === 'Enter') {
        this._internals.form?.requestSubmit();
      }
    }
  };

  render(): TemplateResult {
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
      'is-slot-empty': this._slottedText === '',
    });

    return html`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="radio"
          type="checkbox"
          ?checked=${this.checked}
          value=${this.value}
          tabindex=${this.tabIndex}
        />
        <div class=${iconClasses}></div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${labelInnerClasses}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
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
