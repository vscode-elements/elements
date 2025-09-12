import {html, LitElement, nothing, TemplateResult} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../includes/VscElement.js';
import {checkIcon} from '../includes/icons.js';
import {FormButtonWidgetBase} from '../includes/form-button-widget/FormButtonWidgetBase.js';
import {LabelledCheckboxOrRadioMixin} from '../includes/form-button-widget/LabelledCheckboxOrRadio.js';
import styles from './vscode-checkbox.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

/**
 * Allows users to select one or more options from a set. When participating in a form, it supports
 * the `:invalid` pseudo class. Otherwise the error styles can be applied through the `invalid`
 * property.
 *
 * @tag vscode-checkbox
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
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-foreground=#cccccc]
 * @cssprop [--vscode-settings-checkboxBackground=#313131]
 * @cssprop [--vscode-settings-checkboxBorder=#3c3c3c]
 * @cssprop [--vscode-settings-checkboxForeground=#cccccc]
 * @cssprop [--vscode-focusBorder=#0078d4]
 * @cssprop [--vscode-inputValidation-errorBackground=#5a1d1d]
 * @cssprop [--vscode-inputValidation-errorBorder=#be1100]
 */
@customElement('vscode-checkbox')
export class VscodeCheckbox
  extends LabelledCheckboxOrRadioMixin(FormButtonWidgetBase)
  implements AssociatedFormControl
{
  static override styles = styles;

  /** @internal */
  static formAssociated = true;

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Automatically focus on the element when the page loads.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
   */
  @property({type: Boolean, reflect: true})
  override autofocus = false;

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

  /**
   * The element's initial checked state, which will be restored when the containing form is reset.
   */
  @property({type: Boolean, reflect: true, attribute: 'default-checked'})
  defaultChecked = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  @property({reflect: true})
  name: string | undefined = undefined;

  /**
   * When true, renders as a toggle switch instead of a checkbox.
   */
  @property({type: Boolean, reflect: true})
  toggle = false;

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

  /**
   * Returns `true` if the element's value is valid; otherwise, it returns `false`.
   * If the element's value is invalid, an invalid event is triggered on the element.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity)
   */
  checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  /**
   * Returns `true` if the element's value is valid; otherwise, it returns `false`.
   * If the element's value is invalid, an invalid event is triggered on the element, and the
   * browser displays an error message to the user.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity)
   */
  reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._handleKeyDown);

    this.updateComplete.then(() => {
      this._manageRequired();
      this._setActualFormValue();
    });
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this._handleKeyDown);
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

  override render(): TemplateResult {
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
    });

    const check = this.checked && !this.indeterminate ? checkIcon : nothing;
    const indeterminate = this.indeterminate
      ? html`<span class="indeterminate-icon"></span>`
      : nothing;

    const iconContent = this.toggle
      ? html`<span class="thumb"></span>`
      : html`${indeterminate}${check}`;

    return html`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="checkbox"
          type="checkbox"
          ?checked=${this.checked}
          role=${ifDefined(this.toggle ? 'switch' : undefined)}
          aria-checked=${ifDefined(
            this.toggle ? (this.checked ? 'true' : 'false') : undefined
          )}
          value=${this.value}
        >
        <div class=${iconClasses}>${iconContent}</div>
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
    'vscode-checkbox': VscodeCheckbox;
  }
}
