import {html, LitElement, nothing, TemplateResult} from 'lit';
import {property, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../includes/VscElement.js';
import {chevronDownIcon} from '../includes/vscode-select/template-elements.js';
import {VscodeSelectBase} from '../includes/vscode-select/vscode-select-base.js';
import styles from './vscode-multi-select.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

export type VscMultiSelectCreateOptionEvent = CustomEvent<{value: string}>;

/**
 * Allows to select multiple items from a list of options.
 *
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @tag vscode-multi-select
 *
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
@customElement('vscode-multi-select')
export class VscodeMultiSelect
  extends VscodeSelectBase
  implements AssociatedFormControl
{
  static override styles = styles;

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
    this._opts.selectedIndexes = val;
  }
  get selectedIndexes(): number[] {
    return this._opts.selectedIndexes;
  }

  @property({type: Array})
  set value(val: string[]) {
    this._opts.multiSelectValue = val;

    if (this._opts.selectedIndexes.length > 0) {
      this._requestedValueToSetLater = [];
    } else {
      this._requestedValueToSetLater = Array.isArray(val) ? val : [val];
    }

    this._setFormValue();
    this._manageRequired();
  }
  get value(): string[] {
    return this._opts.multiSelectValue;
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

  selectAll() {
    this._opts.selectAll();
  }

  selectNone() {
    this._opts.selectNone();
  }

  private _internals: ElementInternals;

  constructor() {
    super();
    this._opts.multiSelect = true;
    this._internals = this.attachInternals();
  }

  override connectedCallback(): void {
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

  protected override _dispatchChangeEvent(): void {
    super._dispatchChangeEvent();
  }

  protected override _onFaceClick(): void {
    super._onFaceClick();
    this._opts.activeIndex = 0;
  }

  protected override _toggleComboboxDropdown(): void {
    super._toggleComboboxDropdown();
    this._opts.activeIndex = -1;
  }

  protected override _manageRequired() {
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

  private _requestedValueToSetLater: string[] = [];

  protected override async _createAndSelectSuggestedOption() {
    super._createAndSelectSuggestedOption();
    const nextIndex = this._createSuggestedOption();

    await this.updateComplete;

    this.selectedIndexes = [...this.selectedIndexes, nextIndex];
    this._dispatchChangeEvent();
    const opCreateEvent: VscMultiSelectCreateOptionEvent = new CustomEvent(
      'vsc-multi-select-create-option',
      {detail: {value: this._opts.getOptionByIndex(nextIndex)?.value ?? ''}}
    );
    this.dispatchEvent(opCreateEvent);
    this.open = false;
    this._isPlaceholderOptionActive = false;
  }

  //#region event handlers
  protected override _onSlotChange(): void {
    super._onSlotChange();

    if (this._requestedValueToSetLater.length > 0) {
      this._opts.expandMultiSelection(this._requestedValueToSetLater);
      this._requestedValueToSetLater = this._requestedValueToSetLater.filter(
        (v) => this._opts.findOptionIndex(v) === -1
      );
    }
  }

  protected override _onOptionClick = (ev: MouseEvent) => {
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

    const isPlaceholderOption = (optEl as HTMLElement).classList.contains(
      'placeholder'
    );

    if (isPlaceholderOption) {
      this._createAndSelectSuggestedOption();
      return;
    }

    const index = Number((optEl as HTMLElement).dataset.index);

    this._opts.toggleOptionSelected(index);

    this._setFormValue();
    this._manageRequired();
    this._dispatchChangeEvent();
  };

  protected override _onEnterKeyDown(ev: KeyboardEvent): void {
    super._onEnterKeyDown(ev);

    if (!this.open) {
      this._opts.filterPattern = '';
      this.open = true;
    } else {
      if (this._isPlaceholderOptionActive) {
        this._createAndSelectSuggestedOption();
      } else {
        this._opts.toggleActiveMultiselectOption();
        this._setFormValue();
        this._manageRequired();
        this._dispatchChangeEvent();
      }
    }
  }

  private _onMultiAcceptClick(): void {
    this.open = false;
  }

  private _onMultiDeselectAllClick(): void {
    this._opts.selectedIndexes = [];
    this._values = [];
    this._options = this._options.map((op) => ({...op, selected: false}));
    this._manageRequired();
    this._dispatchChangeEvent();
  }

  private _onMultiSelectAllClick(): void {
    this._opts.selectedIndexes = [];
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
  //#endregion

  //#region render functions
  private _renderLabel() {
    switch (this._opts.selectedIndexes.length) {
      case 0:
        return html`<span class="select-face-badge no-item">0 Selected</span>`;
      default:
        return html`<span class="select-face-badge"
          >${this._opts.selectedIndexes.length} Selected</span
        >`;
    }
  }

  protected override _renderComboboxFace(): TemplateResult {
    let inputVal = '';

    if (this._isBeingFiltered) {
      inputVal = this._opts.filterPattern;
    } else {
      const op = this._opts.getSelectedOption();
      inputVal = op?.label ?? '';
    }

    const activeDescendant =
      this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : '';
    const expanded = this.open ? 'true' : 'false';

    return html`
      <div class="combobox-face face">
        ${this._opts.multiSelect ? this._renderLabel() : nothing}
        <input
          aria-activedescendant=${activeDescendant}
          aria-autocomplete="list"
          aria-controls="select-listbox"
          aria-expanded=${expanded}
          aria-haspopup="listbox"
          aria-label=${ifDefined(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${inputVal}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        >
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
  }

  protected override _renderSelectFace(): TemplateResult {
    const activeDescendant =
      this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : '';
    const expanded = this.open ? 'true' : 'false';

    return html`
      <div
        aria-activedescendant=${ifDefined(
          this._opts.multiSelect ? undefined : activeDescendant
        )}
        aria-controls="select-listbox"
        aria-expanded=${ifDefined(
          this._opts.multiSelect ? undefined : expanded
        )}
        aria-haspopup="listbox"
        aria-label=${ifDefined(this.label ?? undefined)}
        class="select-face face multiselect"
        @click=${this._onFaceClick}
        .tabIndex=${this.disabled ? -1 : 0}
      >
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected override _renderDropdownControls(): TemplateResult {
    return this._filteredOptions.length > 0
      ? html`
          <div class="dropdown-controls">
            <button
              type="button"
              @click=${this._onMultiSelectAllClick}
              title="Select all"
              class="action-icon"
              id="select-all"
            >
              <vscode-icon name="checklist"></vscode-icon>
            </button>
            <button
              type="button"
              @click=${this._onMultiDeselectAllClick}
              title="Deselect all"
              class="action-icon"
              id="select-none"
            >
              <vscode-icon name="clear-all"></vscode-icon>
            </button>
            <vscode-button
              class="button-accept"
              @click=${this._onMultiAcceptClick}
              >OK</vscode-button
            >
          </div>
        `
      : html`${nothing}`;
  }

  override render(): TemplateResult {
    return html`
      <div class="multi-select">
        <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
        ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
        ${this._renderDropdown()}
      </div>
    `;
  }
  //#endregion
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-multi-select': VscodeMultiSelect;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-multi-select-create-option': VscMultiSelectCreateOptionEvent;
  }
}
