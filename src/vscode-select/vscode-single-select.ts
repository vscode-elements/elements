import {html, customElement, property, TemplateResult} from 'lit-element';
import {nothing} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
import {icon} from './includes/template-elements';
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
  selectedIndex = -1;

  constructor() {
    super();
    this._multiple = false;
  }

  protected _toggleDropdown(visible: boolean): void {
    if (visible) {
      this._activeIndex = this._selectedIndex;
      window.addEventListener('click', this._onClickOutsideBound);
    } else {
      window.removeEventListener('click', this._onClickOutsideBound);
    }

    super._toggleDropdown(visible);
  }

  private _onClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this._toggleDropdown(false);
      window.removeEventListener('click', this._onClickOutsideBound);
    }
  }

  private _onClickOutsideBound = this._onClickOutside.bind(this);

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

  private _renderOptions() {
    return this._options.map((op, index) => {
      const classes = classMap({
        option: true,
        active: index === this._activeIndex,
      });

      return html`<li class="${classes}" data-index="${index}">
        ${op.label}
      </li>`;
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

  render(): TemplateResult {
    const labelText =
      this._selectedIndex > -1 ? this._options[this._selectedIndex].label : ' ';

    const dropdown = this._showDropdown
      ? html`<div class="dropdown">
          <ul
            class="options"
            @mouseover="${this._onOptionMouseOver}"
            @click="${this._onOptionClick}"
          >
            ${this._renderOptions()}
          </ul>
          ${this._renderDescription()}
        </div>`
      : nothing;

    return html`
      <slot class="main-slot" @slotchange="${this._onSlotChange}"></slot>
      <div class="select-face" @click="${this._onFaceClick}">
        <span class="text">${labelText}</span>
        ${icon}
      </div>
      ${dropdown}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-single-select': VscodeSingleSelect;
  }
}
