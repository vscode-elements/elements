import {html, LitElement, TemplateResult} from 'lit';
import {property, query} from 'lit/decorators.js';
import {customElement} from '../includes/VscElement.js';
import {chevronDownIcon} from '../includes/vscode-select/template-elements.js';
import {VscodeSelectBase} from '../includes/vscode-select/vscode-select-base.js';
import styles from './vscode-single-select.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

export type VscSingleSelectCreateOptionEvent = CustomEvent<{value: string}>;

/**
 * Allows to select an item from multiple options.
 *
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @tag vscode-single-select
 *
 * ## Types
 *
 * ```typescript
 *interface Option {
 *  label: string;
 *  value: string;
 *  description: string;
 *  selected: boolean;
 *  disabled: boolean;
 *}
 * ```
 * @prop {boolean} invalid
 * @attr {boolean} invalid
 * @attr name - Name which is used as a variable name in the data of the form-container.
 *
 * @cssprop [--dropdown-z-index=2]
 * @cssprop [--vscode-badge-background=#616161]
 * @cssprop [--vscode-badge-foreground=#f8f8f8]
 * @cssprop [--vscode-settings-dropdownBorder=#3c3c3c]
 * @cssprop [--vscode-settings-checkboxBackground=#313131]
 * @cssprop [--vscode-settings-dropdownBackground=#313131]
 * @cssprop [--vscode-settings-dropdownForeground=#cccccc]
 * @cssprop [--vscode-settings-dropdownListBorder=#454545]
 * @cssprop [--vscode-focusBorder=#0078d4]
 * @cssprop [--vscode-foreground=#cccccc]
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-inputValidation-errorBackground=#5a1d1d]
 * @cssprop [--vscode-inputValidation-errorBorder=#be1100]
 * @cssprop [--vscode-list-activeSelectionBackground=#04395e]
 * @cssprop [--vscode-list-activeSelectionForeground=#ffffff]
 * @cssprop [--vscode-list-focusOutline=#0078d4]
 * @cssprop [--vscode-list-focusHighlightForeground=#2aaaff]
 * @cssprop [--vscode-list-highlightForeground=#2aaaff]
 * @cssprop [--vscode-list-hoverBackground=#2a2d2e]
 * @cssprop [--vscode-list-hoverForeground=#ffffff]
 */
@customElement('vscode-single-select')
export class VscodeSingleSelect
  extends VscodeSelectBase
  implements AssociatedFormControl
{
  static override styles = styles;

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @internal */
  static formAssociated = true;

  @property({attribute: 'default-value'})
  defaultValue = '';

  /** @internal */
  @property({type: String, attribute: true, reflect: true})
  override role = 'listbox';

  @property({reflect: true})
  name: string | undefined = undefined;

  @property({type: Number, attribute: 'selected-index'})
  set selectedIndex(val: number) {
    this._selectedIndex = val;
    this._value = this._options[this._selectedIndex]
      ? this._options[this._selectedIndex].value
      : '';
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @property({type: String})
  set value(val: string) {
    if (this._options[this._selectedIndex]) {
      this._options[this._selectedIndex].selected = false;
    }

    this._selectedIndex = this._options.findIndex((op) => op.value === val);

    if (this._selectedIndex > -1) {
      this._options[this._selectedIndex].selected = true;
      this._value = val;
      this._requestedValueToSetLater = '';
    } else {
      this._value = '';
      this._requestedValueToSetLater = val;
    }
  }
  get value(): string {
    if (this._options[this._selectedIndex]) {
      return this._options[this._selectedIndex]?.value ?? '';
    }

    return '';
  }

  @property({type: Boolean, reflect: true})
  required = false;

  get validity(): ValidityState {
    return this._internals.validity;
  }

  get validationMessage(): string {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  @query('.face')
  private _face!: HTMLDivElement;

  private _internals: ElementInternals;

  private updateInputValue() {
    if (!this.combobox) {
      return;
    }

    const input = this.renderRoot.querySelector(
      '.combobox-input'
    ) as HTMLInputElement;

    if (input) {
      input.value = this._options[this._selectedIndex]
        ? this._options[this._selectedIndex].label
        : '';
    }
  }

  constructor() {
    super();
    /** @internal */
    this._multiple = false;
    this._internals = this.attachInternals();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._manageRequired();
    });
  }

  /** @internal */
  formResetCallback(): void {
    this.value = this.defaultValue;
  }

  /** @internal */
  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    this.updateComplete.then(() => {
      this.value = state;
    });
  }

  /** @internal */
  get type(): 'select-one' {
    return 'select-one';
  }

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  private _requestedValueToSetLater = '';

  private async _createAndSelectSuggestedOption() {
    const nextIndex = this._createSuggestedOption();

    await this.updateComplete;

    this.selectedIndex = nextIndex;
    this._dispatchChangeEvent();
    const opCreateEvent: VscSingleSelectCreateOptionEvent = new CustomEvent(
      'vsc-single-select-create-option',
      {detail: {value: this._options[nextIndex]?.value ?? ''}}
    );
    this.dispatchEvent(opCreateEvent);
    this._toggleDropdown(false);
  }

  protected override _onSlotChange(): void {
    super._onSlotChange();

    if (this._requestedValueToSetLater) {
      // the value is set before the available options are appended
      const foundIndex = this._options.findIndex(
        (op) => op.value === this._requestedValueToSetLater
      );

      if (foundIndex > 0) {
        this._selectedIndex = foundIndex;
        this._requestedValueToSetLater = '';
      }
    }

    if (this._selectedIndex > -1 && this._options.length > 0) {
      this._internals.setFormValue(this._options[this._selectedIndex].value);
    } else {
      this._internals.setFormValue(null);
    }
  }

  protected override _onArrowUpKeyDown(): void {
    super._onArrowUpKeyDown();

    if (this.open || this._selectedIndex <= 0) {
      return;
    }

    this._filterPattern = '';
    this._selectedIndex -= 1;
    this._activeIndex = this._selectedIndex;
    this._value = this._options[this._selectedIndex].value;
    this._internals.setFormValue(this._value);
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  protected override _onArrowDownKeyDown(): void {
    super._onArrowDownKeyDown();

    if (this.open || this._selectedIndex >= this._options.length - 1) {
      return;
    }

    this._filterPattern = '';
    this._selectedIndex += 1;
    this._activeIndex = this._selectedIndex;
    this._value = this._options[this._selectedIndex].value;
    this._internals.setFormValue(this._value);
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  protected override _onEnterKeyDown(): void {
    super._onEnterKeyDown();

    this.updateInputValue();
    this._internals.setFormValue(this._value);
    this._manageRequired();
  }

  protected override _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) =>
      (et as HTMLElement)?.matches('li.option')
    ) as HTMLElement | undefined;

    if (!optEl || optEl.matches('.disabled')) {
      return;
    }

    const isPlaceholderOption = optEl.classList.contains('placeholder');

    if (isPlaceholderOption) {
      if (this.creatable) {
        this._createAndSelectSuggestedOption();
      }
    } else {
      this._selectedIndex = Number((optEl as HTMLElement).dataset.index);
      this._value = this._options[this._selectedIndex].value;

      this._toggleDropdown(false);
      this._internals.setFormValue(this._value);
      this._manageRequired();
      this._dispatchChangeEvent();
    }
  }

  private _manageRequired() {
    const {value} = this;
    if (value === '' && this.required) {
      this._internals.setValidity(
        {valueMissing: true},
        'Please select an item in the list.',
        this._face
      );
    } else {
      this._internals.setValidity({});
    }
  }

  protected override _renderSelectFace(): TemplateResult {
    const label = this._options[this._selectedIndex]?.label ?? '';

    return html`
      <div
        class="select-face face"
        @click=${this._onFaceClick}
        tabindex=${this.tabIndex > -1 ? 0 : -1}
      >
        <span class="text">${label}</span> ${chevronDownIcon}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-single-select': VscodeSingleSelect;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-single-select-create-option': VscSingleSelectCreateOptionEvent;
  }
}
