import {html, customElement, property, TemplateResult} from 'lit-element';
import {nothing} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
import {chevronDownIcon} from './includes/template-elements';
import {VscodeSelectBase} from './vscode-select-base';

@customElement('vscode-single-select')
export class VscodeSingleSelect extends VscodeSelectBase {
  @property({type: String, attribute: true, reflect: true})
  role = 'listbox';

  @property({type: String})
  set value(val: string) {
    this._value = val;

    if (this._options[this._selectedIndex]) {
      this._options[this._selectedIndex].selected = false;
    }

    this._selectedIndex = this._options.findIndex((op) => op.value === val);

    if (this._selectedIndex > -1) {
      this._options[this._selectedIndex].selected = true;
    }
  }
  get value(): string {
    return this._value as string;
  }

  @property({type: Number})
  set selectedIndex(val: number) {
    this._selectedIndex = val;
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  constructor() {
    super();
    this._multiple = false;
  }

  protected _toggleDropdown(visible: boolean): void {
    if (visible) {
      this._activeIndex = this._selectedIndex;
    }

    super._toggleDropdown(visible);
  }

  private _onSlotChange(): void {
    const stat = this._addOptionsFromSlottedElements();

    if (stat.selectedIndexes.length > 0) {
      this._selectedIndex = stat.selectedIndexes[0];
    }
  }

  private _onOptionMouseOver(ev: MouseEvent) {
    const el = ev.target as HTMLElement;

    if (!el.matches('.option')) {
      return;
    }

    this._activeIndex = Number(el.dataset.index);
  }

  private _onOptionClick(ev: MouseEvent) {
    const evTarget = ev.target as HTMLElement;
    this._selectedIndex = Number(evTarget.dataset.index);
    this._value = this._options[this._selectedIndex].value;
    this._toggleDropdown(false);
    this._dispatchChangeEvent();
  }

  private _onComboboxInputFocus(ev: FocusEvent) {
    (ev.target as HTMLInputElement).select();
  }

  private _onComboboxInputInput(ev: InputEvent) {
    this._filterPattern = (ev.target as HTMLInputElement).value;
    this._toggleDropdown(true);
  }

  private _renderOptions() {
    const list = this.combobox ? this._filteredOptions : this._options;

    return list.map((op) => {
      const classes = classMap({
        option: true,
        active: op.index === this._activeIndex,
      });

      return html`
        <li class="${classes}" data-index="${op.index}">${op.label}</li>
      `;
    });
  }

  private _renderDescription() {
    if (!this._options[this._activeIndex]) {
      return nothing;
    }

    const {description} = this._options[this._activeIndex];

    return description
      ? html`<div class="description">${description}</div>`
      : nothing;
  }

  private _renderLabel() {
    const labelText =
      this._selectedIndex > -1
        ? this._options[this._selectedIndex].label
        : html`<span class="empty-label-placeholder"></span>`;

    return html`<span class="text">${labelText}</span>`;
  }

  private _renderSelectFace() {
    return html`
      <div class="select-face" @click="${this._onFaceClick}">
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  private _renderComboboxFace() {
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
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
  }

  render(): TemplateResult {
    const dropdown = this._showDropdown
      ? html`
          <div class="dropdown">
            <ul
              class="options"
              @mouseover="${this._onOptionMouseOver}"
              @click="${this._onOptionClick}"
            >
              ${this._renderOptions()}
            </ul>
            ${this._renderDescription()}
          </div>
        `
      : nothing;

    return html`
      <slot class="main-slot" @slotchange="${this._onSlotChange}"></slot>
      ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
      ${dropdown}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-single-select': VscodeSingleSelect;
  }
}
