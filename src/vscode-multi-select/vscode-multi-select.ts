import {html, LitElement, nothing, TemplateResult} from 'lit';
import {property, query} from 'lit/decorators.js';
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
    const newIndexes: number[] = [];

    val.forEach((v) => {
      if (typeof this._options[v] !== 'undefined') {
        if (!newIndexes.includes(v)) {
          this._options[v].selected = true;
          newIndexes.push(v);
        }
      }
    });

    this._selectedIndexes = newIndexes;
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Array})
  set value(val: string[] | string) {
    const sanitizedVal = Array.isArray(val)
      ? val.map((v) => String(v))
      : [String(val)];
    this._values = [];

    this._selectedIndexes.forEach((i) => {
      this._options[i].selected = false;
    });

    this._selectedIndexes = [];

    sanitizedVal.forEach((v) => {
      if (typeof this._valueOptionIndexMap[v] === 'number') {
        this._selectedIndexes.push(this._valueOptionIndexMap[v]);
        this._options[this._valueOptionIndexMap[v]].selected = true;
        this._values.push(v);
      }
    });

    if (this._selectedIndexes.length > 0) {
      this._requestedValueToSetLater = [];
    } else {
      this._requestedValueToSetLater = Array.isArray(val) ? val : [val];
    }

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
    /** @deprecated */
    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {
          selectedIndexes: this._selectedIndexes,
          value: this._values,
        },
      })
    );

    super._dispatchChangeEvent();
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
      {detail: {value: this._options[nextIndex]?.value ?? ''}}
    );
    this.dispatchEvent(opCreateEvent);
    this._toggleDropdown(false);
    this._isPlaceholderOptionActive = false;
  }

  protected override _onSlotChange(): void {
    super._onSlotChange();

    if (this._requestedValueToSetLater.length > 0) {
      this.options.forEach((o, i) => {
        if (this._requestedValueToSetLater.includes(o.value)) {
          this._selectedIndexes.push(i);
          this._values.push(o.value);
          this._options[i].selected = true;
          this._requestedValueToSetLater =
            this._requestedValueToSetLater.filter((v) => v !== o.value);
        }
      });
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

    if (this._options[index]) {
      if (this._options[index].disabled) {
        return;
      }

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
  };

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

  protected override _renderSelectFace(): TemplateResult {
    return html`
      <div
        class="select-face face multiselect"
        @click=${this._onFaceClick}
        tabindex=${this.tabIndex > -1 ? 0 : -1}
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
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-multi-select': VscodeMultiSelect;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-multi-select-create-option': VscMultiSelectCreateOptionEvent;
  }
}
