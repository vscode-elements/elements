import {
  customElement,
  property,
  html,
  TemplateResult,
  internalProperty,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {chevronDownIcon} from './includes/vscode-select/template-elements';
import {VscodeSelectBase} from './includes/vscode-select/vscode-select-base';

/**
 * ## Types
 *
 * ```typescript
 *interface Option {
 *  label: string;
 *  value: string;
 *  description: string;
 *  selected: boolean;
 *}
 * ```
 */
@customElement('vscode-single-select')
export class VscodeSingleSelect extends VscodeSelectBase {
  @property({type: String, attribute: true, reflect: true})
  role = 'listbox';

  @property({type: Number})
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
    this._value = val;

    if (this._options[this._selectedIndex]) {
      this._options[this._selectedIndex].selected = false;
    }

    this._selectedIndex = this._options.findIndex((op) => op.value === val);

    if (this._selectedIndex > -1) {
      this._options[this._selectedIndex].selected = true;
      this._labelText = this._options[this._selectedIndex].label;
    } else {
      this._labelText = '';
    }
  }
  get value(): string {
    return this._value as string;
  }

  @internalProperty()
  private _labelText = '';

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
    this._multiple = false;
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
    this._dispatchChangeEvent();
  }

  protected _onEnterKeyDown(): void {
    super._onEnterKeyDown();

    if (this._selectedIndex > -1) {
      this._labelText = this._options[this._selectedIndex].label;
    }

    this.updateInputValue();
  }

  private _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) =>
      (et as HTMLElement)?.matches('li.option')
    );

    if (!optEl) {
      return;
    }

    this._selectedIndex = Number((optEl as HTMLElement).dataset.index);
    this._value = this._options[this._selectedIndex].value;

    if (this._selectedIndex > -1) {
      this._labelText = this._options[this._selectedIndex].label;
    }

    this._toggleDropdown(false);
    this._dispatchChangeEvent();
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
        active: index === this._activeIndex,
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
