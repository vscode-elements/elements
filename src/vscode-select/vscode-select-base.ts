import {
  LitElement,
  property,
  internalProperty,
  query,
  html,
  TemplateResult,
} from 'lit-element';
import {nothing} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
import '../vscode-button';
import {chevronDownIcon} from './includes/template-elements';
import {VscodeSelectOption} from './vscode-select-option';
import dropdownStyles from './vscode-select-base.styles';
import {InternalOption, Option, SearchMethod} from './includes/types';
import {filterOptionsByPattern} from './includes/helpers';

interface OptionListStat {
  selectedIndexes: number[];
  values: string[];
}

export class VscodeSelectBase extends LitElement {
  @property({type: String, reflect: true, attribute: 'aria-expanded'})
  ariaExpanded = 'false';

  @property({type: Boolean})
  combobox = false;

  @property({type: Boolean, reflect: true, attribute: 'data-cloak'})
  dataCloak = false;

  @property({type: String})
  set filter(val: string) {
    const validValues: SearchMethod[] = [
      'contains',
      'fuzzy',
      'startsWith',
      'startsWithPerTerm',
    ];

    if (validValues.includes(val as SearchMethod)) {
      this._filter = val as SearchMethod;
    } else {
      this._filter = 'fuzzy';
      console.warn(
        `[VSCode Webview Elements] Invalid filter: "${val}", fallback to default. Valid values are: "contains", "fuzzy", "startsWith", "startsWithPerm".`,
        this
      );
    }
  }
  get filter(): string {
    return this._filter;
  }

  @property({type: Boolean, reflect: true})
  focused = false;

  @property({type: Array})
  set options(opts: Option[]) {
    this._options = opts.map((op, index) => ({...op, index}));
  }
  get options(): Option[] {
    return this._options.map(({label, value, description, selected}) => ({
      label,
      value,
      description,
      selected,
    }));
  }

  @property({type: Number, attribute: true, reflect: true})
  tabindex = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.dataCloak = false;
    this.addEventListener('keydown', this._onComponentKeyDown);
    this.addEventListener('focus', this._onComponentFocus);
    this.addEventListener('blur', this._onComponentBlur);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onComponentKeyDown);
    this.removeEventListener('focus', this._onComponentFocus);
    this.removeEventListener('blur', this._onComponentBlur);
  }

  @internalProperty()
  protected _activeIndex = -1;

  @internalProperty()
  protected _currentDescription = '';

  @internalProperty()
  protected _filter: SearchMethod = 'fuzzy';

  @internalProperty()
  protected get _filteredOptions(): InternalOption[] {
    if (!this.combobox || this._filterPattern === '') {
      return this._options;
    }

    return filterOptionsByPattern(
      this._options,
      this._filterPattern,
      this._filter
    );
  }

  @internalProperty()
  protected _filterPattern = '';

  @internalProperty()
  protected _selectedIndex = -1;

  @internalProperty()
  protected _selectedIndexes: number[] = [];

  @internalProperty()
  protected _showDropdown = false;

  @internalProperty()
  protected _options: InternalOption[] = [];

  @internalProperty()
  protected _value = '';

  @internalProperty()
  protected _values: string[] = [];

  @query('.main-slot')
  protected _mainSlot!: HTMLSlotElement;

  protected _multiple = false;

  protected _addOptionsFromSlottedElements(): OptionListStat {
    const options: InternalOption[] = [];
    let currentIndex = 0;
    const nodes = this._mainSlot.assignedNodes();
    const optionsListStat: OptionListStat = {
      selectedIndexes: [],
      values: [],
    };

    nodes.forEach((el: Node) => {
      if (
        !(
          el.nodeType === Node.ELEMENT_NODE &&
          (el as Element).matches('vscode-select-option')
        )
      ) {
        return;
      }

      const {
        innerText,
        value: elValue,
        description,
        selected,
      } = el as VscodeSelectOption;

      const value = (el as VscodeSelectOption).hasAttribute('value')
        ? elValue
        : innerText;

      const op: InternalOption = {
        label: innerText,
        value,
        description,
        selected,
        index: currentIndex,
      };

      currentIndex = options.push(op);

      if (selected) {
        optionsListStat.selectedIndexes.push(options.length - 1);
        optionsListStat.values.push(value);
      }
    });

    this._options = options;

    return optionsListStat;
  }

  protected _toggleDropdown(visible: boolean): void {
    this._showDropdown = visible;
    this.ariaExpanded = String(visible);

    if (visible) {
      window.addEventListener('click', this._onClickOutsideBound);
    } else {
      window.removeEventListener('click', this._onClickOutsideBound);
    }
  }

  protected _dispatchChangeEvent(): void {
    if (!this._multiple) {
      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            selectedIndex: this._selectedIndex,
            value: this._value,
          },
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            selectedIndexes: this._selectedIndexes,
            value: this._values,
          },
        })
      );
    }
  }

  protected _onFaceClick(): void {
    this._toggleDropdown(!this._showDropdown);
  }

  protected _onClickOutside(event: MouseEvent): void {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this._toggleDropdown(false);
      window.removeEventListener('click', this._onClickOutsideBound);
    }
  }

  protected _onClickOutsideBound = this._onClickOutside.bind(this);

  protected _onComboboxButtonClick(): void {
    this._filterPattern = '';
    this._toggleDropdown(!this._showDropdown);
  }

  protected _onOptionMouseOver(ev: MouseEvent): void {
    const el = ev.target as HTMLElement;

    if (!el.matches('.option')) {
      return;
    }

    this._activeIndex = Number(el.dataset.index);
  }

  private _onComponentKeyDown(event: KeyboardEvent) {
    if (
      event.key === ' ' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this._toggleDropdown(!this._showDropdown);
    }

    if (event.key === ' ') {
      this._showDropdown = true;
    }

    if (event.key === 'Escape' || event.key == 'Tab') {
      this._showDropdown = false;
    }

    if (event.key === 'ArrowUp' && this._selectedIndex > 0) {
      this._options[this._selectedIndex].selected = false;
      this._selectedIndex -= 1;
      this._activeIndex = this._selectedIndex;
      this._options[this._selectedIndex].selected = true;
      this._dispatchChangeEvent();
    }

    if (
      event.key === 'ArrowDown' &&
      this._selectedIndex < this._options.length - 1
    ) {
      if (this._selectedIndex === -1) {
        this._selectedIndex = 0;
      } else {
        this._options[this._selectedIndex].selected = false;
        this._selectedIndex += 1;
      }

      this._activeIndex = this._selectedIndex;
      this._options[this._selectedIndex].selected = true;
      this._dispatchChangeEvent();
    }
  }

  private _onComponentFocus() {
    this.focused = true;
  }

  private _onComponentBlur() {
    this.focused = false;
  }

  private _onSlotChange(): void {
    const stat = this._addOptionsFromSlottedElements();

    if (stat.selectedIndexes.length > 0) {
      this._selectedIndex = stat.selectedIndexes[0];
      this._selectedIndexes = stat.selectedIndexes;
    }
  }

  protected _onComboboxInputFocus(ev: FocusEvent): void {
    (ev.target as HTMLInputElement).select();
  }

  protected _onComboboxInputInput(ev: InputEvent): void {
    this._filterPattern = (ev.target as HTMLInputElement).value;
    this._toggleDropdown(true);
  }

  protected _renderOptions(): TemplateResult | TemplateResult[] {
    return [];
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

  protected _renderSelectFace(): TemplateResult {
    return html`${nothing}`;
  }

  protected _renderComboboxFace(): TemplateResult {
    return html`${nothing}`;
  }

  protected _renderDropdownControls(): TemplateResult {
    return html`${nothing}`;
  }

  private _renderDropdown() {
    const classes = classMap({
      dropdown: true,
      multiple: this._multiple,
    });

    return html`
      <div class="${classes}">
        ${this._renderOptions()}
        ${this._renderDropdownControls()}
        ${this._renderDescription()}
      </div>
    `;
  }

  static styles = dropdownStyles;

  render(): TemplateResult {
    return html`
      <slot class="main-slot" @slotchange="${this._onSlotChange}"></slot>
      ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
      ${this._showDropdown ? this._renderDropdown() : nothing}
    `;
  }
}
