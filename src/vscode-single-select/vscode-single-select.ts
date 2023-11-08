import {html, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {chevronDownIcon} from '../includes/vscode-select/template-elements.js';
import {VscodeSelectBase} from '../includes/vscode-select/vscode-select-base.js';
import styles from './vscode-single-select.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

/**
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
 * @cssprop [--dropdown-z-index=2]
 * @cssprop [--badge-background=var(--vscode-badge-background)]
 * @cssprop [--badge-foreground=var(--vscode-badge-foreground)]
 * @cssprop [--border=var(--vscode-settings-dropdownBorder)]
 * @cssprop [--checkbox-background=var(--vscode-settings-checkboxBackground)]
 * @cssprop [--dropdown-background=var(--vscode-settings-dropdownBackground)]
 * @cssprop [--dropdown-border=var(--vscode-settings-dropdownListBorder)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 * @cssprop [--foreground=var(--vscode-foreground)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--list-active-selection-background=var(--vscode-list-activeSelectionBackground)]
 * @cssprop [--list-active-selection-foreground=var(--vscode-list-activeSelectionForeground)]
 * @cssprop [--list-focus-outline=var(--vscode-list-focusOutline)]
 * @cssprop [--list-hover-background=var(--vscode-list-hoverBackground)]
 * @cssprop [--list-hover-foreground=var(--vscode-list-hoverForeground)]
 * @cssprop [--selected-background=var(--vscode-list-hoverBackground)]
 * @cssprop [--input-background=var(--vscode-settings-textInputBackground)]
 * @cssprop [--list-hover-background=var(--vscode-list-hoverBackground)]
 */
@customElement('vscode-single-select')
export class VscodeSingleSelect
  extends VscodeSelectBase
  implements AssociatedFormControl
{
  static styles = styles;

  static formAssociated = true;

  @property({attribute: 'default-value'})
  defaultValue = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  /** @internal */
  @property({type: String, attribute: true, reflect: true})
  role = 'listbox';

  @property({reflect: true})
  name: string | undefined = undefined;

  @property({type: Number, attribute: 'selected-index'})
  set selectedIndex(val: number) {
    this._selectedIndex = val;
    this._value = this._options[this._selectedIndex]
      ? this._options[this._selectedIndex].value
      : '';
    this._labelText = this._options[this._selectedIndex]
      ? this._options[this._selectedIndex].label
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
      this._labelText = this._options[this._selectedIndex].label;
      this._value = val;
    } else {
      this._labelText = '';
      this._value = '';
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

  @state()
  private _labelText = '';

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

  connectedCallback(): void {
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

  protected _onSlotChange(): void {
    super._onSlotChange();

    if (this._selectedIndex > -1) {
      this._labelText = this._options[this._selectedIndex].label;
    }
  }

  protected _onArrowUpKeyDown(): void {
    super._onArrowUpKeyDown();

    if (this._showDropdown || this._selectedIndex <= 0) {
      return;
    }

    this._filterPattern = '';
    this._selectedIndex -= 1;
    this._activeIndex = this._selectedIndex;
    this._labelText = this._options[this._selectedIndex].label;
    this._value = this._options[this._selectedIndex].value;
    this._internals.setFormValue(this._value);
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  protected _onArrowDownKeyDown(): void {
    super._onArrowDownKeyDown();

    if (this._showDropdown || this._selectedIndex >= this._options.length) {
      return;
    }

    this._filterPattern = '';
    this._selectedIndex += 1;
    this._activeIndex = this._selectedIndex;
    this._labelText = this._options[this._selectedIndex].label;
    this._value = this._options[this._selectedIndex].value;
    this._internals.setFormValue(this._value);
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  protected _onEnterKeyDown(): void {
    super._onEnterKeyDown();

    if (this._selectedIndex > -1) {
      this._labelText = this._options[this._selectedIndex].label;
    }

    this.updateInputValue();
    this._internals.setFormValue(this._value);
    this._manageRequired();
  }

  private _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) =>
      (et as HTMLElement)?.matches('li.option')
    ) as HTMLElement | undefined;

    if (!optEl || optEl.matches('.disabled')) {
      return;
    }

    this._selectedIndex = Number((optEl as HTMLElement).dataset.index);
    this._value = this._options[this._selectedIndex].value;

    if (this._selectedIndex > -1) {
      this._labelText = this._options[this._selectedIndex].label;
    }

    this._toggleDropdown(false);
    this._internals.setFormValue(this._value);
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  private _manageRequired() {
    const {value} = this;
    if (value === '' && this.required) {
      this._internals.setValidity(
        {
          valueMissing: true,
        },
        'Please select an item in the list.'
      );
    } else {
      this._internals.setValidity({});
    }
  }

  private _renderLabel() {
    const labelContent =
      this._labelText || html`<span class="empty-label-placeholder"></span>`;

    return html`<span class="text">${labelContent}</span>`;
  }

  protected _renderSelectFace(): TemplateResult {
    return html`
      <div class="select-face" @click="${this._onFaceClick}">
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected _renderComboboxFace(): TemplateResult {
    const inputVal =
      this._selectedIndex > -1 ? this._options[this._selectedIndex].label : '';

    return html`
      <div class="combobox-face">
        <input
          class="combobox-input"
          spellcheck="false"
          type="text"
          .value="${inputVal}"
          @focus="${this._onComboboxInputFocus}"
          @input="${this._onComboboxInputInput}"
        />
        <button
          class="combobox-button"
          type="button"
          @click="${this._onComboboxButtonClick}"
          @keydown="${this._onComboboxButtonKeyDown}"
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
  }

  protected _renderOptions(): TemplateResult {
    const list = this.combobox ? this._filteredOptions : this._options;
    const options = list.map((op, index) => {
      const classes = classMap({
        option: true,
        active: index === this._activeIndex && !op.disabled,
        disabled: op.disabled,
      });

      return html`
        <li
          class="${classes}"
          data-index="${op.index}"
          data-filtered-index="${index}"
        >
          ${op.label}
        </li>
      `;
    });

    return html`
      <ul
        class="options"
        @mouseover="${this._onOptionMouseOver}"
        @click="${this._onOptionClick}"
      >
        ${options}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-single-select': VscodeSingleSelect;
  }
}
