import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {chevronDownIcon} from './includes/vscode-select/template-elements';
import {VscodeSelectBase} from './includes/vscode-select/vscode-select-base';

/**
 * @attr name - Name which is used as a variable name in the data of the form-container.
 * @cssprop [--dropdown-z-index=2]
 */
@customElement('vscode-multi-select')
export class VscodeMultiSelect extends VscodeSelectBase {
  @property({type: Array, attribute: false})
  set selectedIndexes(val: number[]) {
    this._selectedIndexes = val;
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Array})
  set value(val: string[]) {
    this._values = val;

    const valMap: {[key: string]: number} = {};

    this._options.forEach(({value}, index) => {
      valMap[value] = index;
    });

    this._selectedIndexes = [];

    val.forEach((v) =>{
      if (valMap[v]) {
        this._selectedIndexes.push(valMap[v]);
      }
    });
  }
  get value(): string[] {
    return this._values;
  }

  constructor() {
    super();
    this._multiple = true;
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

    this._dispatchChangeEvent();
  }

  private _onMultiAcceptClick(): void {
    this._toggleDropdown(false);
  }

  private _onMultiDeselectAllClick(): void {
    this._selectedIndexes = [];
    this._values = [];
    this._options = this._options.map((op) => ({...op, selected: false}));
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
      <div class="select-face multiselect" @click="${this._onFaceClick}">
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected _renderComboboxFace(): TemplateResult {
    const inputVal =
      this._selectedIndex > -1 ? this._options[this._selectedIndex].label : '';

    return html`
      <div class="combobox-face">
        ${this._renderLabel()}
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
                <span class="option-label">${op.label}</span>
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
        >
          <vscode-icon name="checklist"></vscode-icon>
        </button>
        <button
          type="button"
          @click="${this._onMultiDeselectAllClick}"
          title="Deselect all"
          class="action-icon"
        >
          <vscode-icon name="clear-all"></vscode-icon>
        </button>
        <vscode-button @click="${this._onMultiAcceptClick}">OK</vscode-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-multi-select': VscodeMultiSelect;
  }
}
