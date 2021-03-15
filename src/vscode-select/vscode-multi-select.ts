import {html, customElement, property, TemplateResult} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {chevronDownIcon} from './includes/template-elements';
import {VscodeSelectBase} from './vscode-select-base';

@customElement('vscode-multi-select')
export class VscodeMultiSelect extends VscodeSelectBase {
  @property({type: Array})
  set selectedIndexes(val: number[]) {
    this._selectedIndexes = val;
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Array})
  set value(val: string[]) {
    this._values = val;
  }
  get value(): string[] {
    return this._values;
  }

  _multiple = true;

  private _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) =>
      (et as HTMLElement)?.matches('li.option')
    );

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

  private _onMultiResetClick(): void {
    this._selectedIndexes = [];
    this._values = [];
    this._options = this._options.map((op) => ({...op, selected: false}));
    this._dispatchChangeEvent();
  }

  private _renderLabel() {
    switch (this._selectedIndexes.length) {
      case 0:
        return html`<span class="select-face-badge no-item">No items selected</span>`;
      case 1:
        return html`<span class="select-face-badge">1 item selected</span>`;
      default:
        return html`<span class="select-face-badge">${this._selectedIndexes.length} items selected</span>`;
    }

  }

  protected _renderSelectFace(): TemplateResult {
    return html`
      <div class="select-face multiselect" @click="${this._onFaceClick}">
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected _renderOptions(): TemplateResult {
    const list = this.combobox ? this._filteredOptions : this._options;

    const options = list.map((op) => {
      // TODO: binary search
      const selected = this._selectedIndexes.includes(op.index);
      const optionClasses = classMap({
        option: true,
        selected,
      });
      const checkboxClasses = classMap({
        'checkbox-icon': true,
        checked: selected,
      });

      return html`
        <li class="${optionClasses}" data-index="${op.index}">
          <span class="${checkboxClasses}"></span>
          <span class="option-label">${op.label}</span>
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

  protected _renderDropdownControls(): TemplateResult {
    return html`
      <div class="dropdown-controls">
        <vscode-button @click="${this._onMultiAcceptClick}">OK</vscode-button>
        <vscode-button secondary @click="${this._onMultiResetClick}"
          >Reset</vscode-button
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
