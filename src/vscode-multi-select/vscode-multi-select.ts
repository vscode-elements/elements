import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {chevronDownIcon} from '../includes/vscode-select/template-elements.js';
import {VscodeSelectBase} from '../includes/vscode-select/vscode-select-base.js';
import styles from './vscode-multi-select.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';
import {highlightRanges} from '../includes/vscode-select/helpers.js';

/**
 * Allows to select multiple items from a list of options.
 *
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @prop {boolean} invalid
 * @attr {boolean} invalid
 * @attr name - Name which is used as a variable name in the data of the form-container.
 *
 * @cssprop [--dropdown-z-index=2]
 * @cssprop --vscode-badge-background
 * @cssprop --vscode-badge-foreground
 * @cssprop --vscode-settings-dropdownBorder
 * @cssprop --vscode-settings-checkboxBackground
 * @cssprop --vscode-settings-dropdownBackground
 * @cssprop --vscode-settings-dropdownListBorder
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-foreground
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-list-activeSelectionBackground
 * @cssprop --vscode-list-activeSelectionForeground
 * @cssprop --vscode-list-focusOutline
 * @cssprop --vscode-list-focusHighlightForeground
 * @cssprop --vscode-list-highlightForeground
 * @cssprop --vscode-list-hoverBackground
 * @cssprop --vscode-list-hoverForeground
 * @cssprop --vscode-list-hoverBackground
 * @cssprop --vscode-settings-textInputBackground
 * @cssprop --vscode-list-hoverBackground
 */
@customElement('vscode-multi-select')
export class VscodeMultiSelect
  extends VscodeSelectBase
  implements AssociatedFormControl
{
  static styles = styles;

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({type: Array, attribute: 'default-value'})
  defaultValue: string[] = [];

  @property({type: Boolean, reflect: true})
  required = false;

  @property({reflect: true})
  name: string | undefined = undefined;

  @property({type: Array, attribute: false})
  set selectedIndexes(val: number[]) {
    this._selectedIndexes = val;
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Array})
  set value(val: string[] | string) {
    const sanitizedVal = Array.isArray(val)
      ? val.map((v) => String(v))
      : [String(val)];
    this._values = sanitizedVal;

    this._selectedIndexes.forEach((i) => {
      this._options[i].selected = false;
    });

    this._selectedIndexes = [];

    sanitizedVal.forEach((v) => {
      if (typeof this._valueOptionIndexMap[v] === 'number') {
        this._selectedIndexes.push(this._valueOptionIndexMap[v]);
        this._options[this._valueOptionIndexMap[v]].selected = true;
      }
    });

    this._setFormValue();
    this._manageRequired();
  }
  get value(): string[] {
    return this._values;
  }

  get form() {
    return this._internals.form;
  }

  /** @internal */
  get type() {
    return 'select-multiple';
  }

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

  private _internals: ElementInternals;

  constructor() {
    super();
    /** @internal */
    this._multiple = true;
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._setDefaultValue();
      this._manageRequired();
    });
  }

  /** @internal */
  formResetCallback(): void {
    this.updateComplete.then(() => {
      this.value = this.defaultValue;
    });
  }

  /** @internal */
  formStateRestoreCallback(
    state: FormData,
    _mode: 'restore' | 'autocomplete'
  ): void {
    const entries = Array.from(state.entries()).map((e) => String(e[1]));

    this.updateComplete.then(() => {
      this.value = entries;
    });
  }

  @query('.face')
  private _faceElement!: HTMLDivElement;

  private _setDefaultValue() {
    if (Array.isArray(this.defaultValue) && this.defaultValue.length > 0) {
      const val = this.defaultValue.map((v) => String(v));
      this.value = val;
    }
  }

  private _manageRequired() {
    const {value} = this;
    if (value.length === 0 && this.required) {
      this._internals.setValidity(
        {
          valueMissing: true,
        },
        'Please select an item in the list.',
        this._faceElement
      );
    } else {
      this._internals.setValidity({});
    }
  }

  private _setFormValue() {
    const fd = new FormData();

    this._values.forEach((v) => {
      fd.append(this.name ?? '', v);
    });

    this._internals.setFormValue(fd);
  }

  private _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) => {
      if ('matches' in et) {
        return (et as HTMLElement).matches('li.option');
      }

      return false;
    });

    if (!optEl) {
      return;
    }

    const index = Number((optEl as HTMLElement).dataset.index);

    if (this._options[index]) {
      this._options[index].selected = !this._options[index].selected;
    }

    this._selectedIndexes = [];
    this._values = [];

    this._options.forEach((op) => {
      if (op.selected) {
        this._selectedIndexes.push(op.index);
        this._values.push(op.value);
      }
    });

    this._setFormValue();
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  private _onMultiAcceptClick(): void {
    this._toggleDropdown(false);
  }

  private _onMultiDeselectAllClick(): void {
    this._selectedIndexes = [];
    this._values = [];
    this._options = this._options.map((op) => ({...op, selected: false}));
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  private _onMultiSelectAllClick(): void {
    this._selectedIndexes = [];
    this._values = [];
    this._options = this._options.map((op) => ({...op, selected: true}));
    this._options.forEach((op, index) => {
      this._selectedIndexes.push(index);
      this._values.push(op.value);
      this._dispatchChangeEvent();
    });

    this._setFormValue();
    this._manageRequired();
  }

  private _renderLabel() {
    switch (this._selectedIndexes.length) {
      case 0:
        return html`<span class="select-face-badge no-item"
          >No items selected</span
        >`;
      case 1:
        return html`<span class="select-face-badge">1 item selected</span>`;
      default:
        return html`<span class="select-face-badge"
          >${this._selectedIndexes.length} items selected</span
        >`;
    }
  }

  protected _renderSelectFace(): TemplateResult {
    return html`
      <div
        class="select-face face multiselect"
        @click="${this._onFaceClick}"
        tabindex="${this.tabIndex > -1 ? 0 : -1}"
      >
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected _renderComboboxFace(): TemplateResult {
    const inputVal =
      this._selectedIndex > -1 ? this._options[this._selectedIndex].label : '';

    return html`
      <div class="combobox-face face">
        ${this._renderLabel()}
        <input
          class="combobox-input"
          spellcheck="false"
          type="text"
          .value="${inputVal}"
          @focus="${this._onComboboxInputFocus}"
          @input="${this._onComboboxInputInput}"
          @click="${this._onComboboxInputClick}"
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

    return html`
      <ul
        class="options"
        @click="${this._onOptionClick}"
        @mouseover="${this._onOptionMouseOver}"
      >
        ${repeat(
          list,
          (op) => op.index,
          (op, index) => {
            const selected = this._selectedIndexes.includes(op.index);
            const optionClasses = classMap({
              active: index === this._activeIndex,
              option: true,
              selected,
            });
            const checkboxClasses = classMap({
              'checkbox-icon': true,
              checked: selected,
            });

            return html`
              <li
                class="${optionClasses}"
                data-index="${op.index}"
                data-filtered-index="${index}"
              >
                <span class="${checkboxClasses}"></span>
                <span class="option-label"
                  >${(op.ranges?.length ?? 0 > 0)
                    ? highlightRanges(op.label, op.ranges ?? [])
                    : op.label}</span
                >
              </li>
            `;
          }
        )}
      </ul>
    `;
  }

  protected _renderDropdownControls(): TemplateResult {
    return html`
      <div class="dropdown-controls">
        <button
          type="button"
          @click="${this._onMultiSelectAllClick}"
          title="Select all"
          class="action-icon"
          id="select-all"
        >
          <vscode-icon name="checklist"></vscode-icon>
        </button>
        <button
          type="button"
          @click="${this._onMultiDeselectAllClick}"
          title="Deselect all"
          class="action-icon"
          id="select-none"
        >
          <vscode-icon name="clear-all"></vscode-icon>
        </button>
        <vscode-button
          class="button-accept"
          @click="${this._onMultiAcceptClick}"
          >OK</vscode-button
        >
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-multi-select': VscodeMultiSelect;
  }
}
