import {html, LitElement, nothing, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from '../includes/form-button-widget/FormButtonWidgetBase.js';
import {LabelledCheckboxOrRadioMixin} from '../includes/form-button-widget/LabelledCheckboxOrRadio.js';
import styles from './vscode-checkbox.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

/**
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @attr name - Name which is used as a variable name in the data of the form-container.
 * @attr label - Attribute pair of the `label` property.
 * @prop label - Label text. It is only applied if component's innerHTML doesn't contain any text.
 *
 * @fires {Event} change - Dispatched when checked state is changed. The event is bubbled, so it can be listened on a parent element like the `CheckboxGroup`.
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
@customElement('vscode-checkbox')
export class VscodeCheckbox
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
  set checked(newVal: boolean) {
    this._checked = newVal;
    this._manageRequired();
    this.requestUpdate();
  }
  get checked(): boolean {
    return this._checked;
  }

  private _checked = false;

  @property({type: Boolean, reflect: true, attribute: 'default-checked'})
  defaultChecked = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  @property({reflect: true})
  name: string | undefined = undefined;

  /** @internal */
  @property({reflect: true})
  role = 'checkbox';

  /**
   * Associate a value to the checkbox. According to the native checkbox [specification](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value_2), If the component participates in a form:
   *
   * - If it is unchecked, the value will not be submitted.
   * - If it is checked but the value is not set, `on` will be submitted.
   * - If it is checked and value is set, the value will be submitted.
   */
  @property()
  value = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  indeterminate = false;

  @property({type: Boolean, reflect: true})
  set required(newVal: boolean) {
    this._required = newVal;
    this._manageRequired();
    this.requestUpdate();
  }
  get required() {
    return this._required;
  }
  private _required = false;

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  /** @internal */
  @property()
  type = 'checkbox';

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

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._handleKeyDown);

    this.updateComplete.then(() => {
      this._manageRequired();
      this._setActualFormValue();
    });
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  update(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.update(changedProperties);

    if (changedProperties.has('checked')) {
      this.ariaChecked = this.checked ? 'true' : 'false';
    }
  }

  /** @internal */
  formResetCallback(): void {
    this.checked = this.defaultChecked;
  }

  /** @internal */
  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    if (state) {
      this.checked = true;
    }
  }

  @query('#input')
  private _inputEl!: HTMLInputElement;

  private _internals: ElementInternals;

  // Sets the value of the control according to the native checkbox behavior.
  // - If the checkbox is unchecked, the value will be null, so the control will
  //   excluded from the form.
  // - If the control is checked but the value is not set, the value will be "on".
  // - If the control is checked and value is set, the value won't be changed.
  private _setActualFormValue() {
    let actualValue: string | null = '';

    if (this.checked) {
      actualValue = !this.value ? 'on' : this.value;
    } else {
      actualValue = null;
    }

    this._internals.setFormValue(actualValue);
  }

  private _toggleState() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this._setActualFormValue();
    this._manageRequired();
    this.dispatchEvent(new Event('change', {bubbles: true}));
    /** @deprecated */
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

  private _handleClick = (ev: MouseEvent): void => {
    ev.preventDefault();

    if (this.disabled) {
      return;
    }

    this._toggleState();
  };

  private _handleKeyDown = (ev: KeyboardEvent): void => {
    if (!this.disabled && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();

      if (ev.key === ' ') {
        this._toggleState();
      }

      if (ev.key === 'Enter') {
        this._internals.form?.requestSubmit();
      }
    }
  };

  private _manageRequired() {
    if (!this.checked && this.required) {
      this._internals.setValidity(
        {
          valueMissing: true,
        },
        'Please check this box if you want to proceed.',
        this._inputEl ?? undefined
      );
    } else {
      this._internals.setValidity({});
    }
  }

  render(): TemplateResult {
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
    });

    const icon = html`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="check-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`;
    const check = this.checked && !this.indeterminate ? icon : nothing;
    const indeterminate = this.indeterminate
      ? html`<span class="indeterminate-icon"></span>`
      : nothing;

    return html`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="checkbox"
          type="checkbox"
          ?checked="${this.checked}"
          value="${this.value}"
        />
        <div class="${iconClasses}">${indeterminate}${check}</div>
        <label for="input" class="label" @click="${this._handleClick}">
          <span class="${labelInnerClasses}">
            ${this._renderLabelAttribute()}
            <slot @slotchange="${this._handleSlotChange}"></slot>
          </span>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-checkbox': VscodeCheckbox;
  }
}
