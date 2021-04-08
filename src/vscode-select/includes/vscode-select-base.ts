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
import '../../vscode-button';
import {VscodeOption} from '../vscode-option';
import dropdownStyles from './styles';
import {InternalOption, Option, SearchMethod} from './types';
import {filterOptionsByPattern} from './helpers';

interface OptionListStat {
  selectedIndexes: number[];
  values: string[];
}

const VISIBLE_OPTS = 10;
const OPT_HEIGHT = 19;
const LIST_HEIGHT = 192;

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

  @internalProperty()
  protected _listScrollTop = 0;

  @query('.main-slot')
  protected _mainSlot!: HTMLSlotElement;

  @query('.options')
  private _listElement!: HTMLUListElement;

  protected _multiple = false;
  private _isHoverForbidden = false;

  protected get _currentOptions(): InternalOption[] {
    return this.combobox ? this._filteredOptions : this._options;
  }

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
          (el as Element).matches('vscode-option')
        )
      ) {
        return;
      }

      const {
        innerText,
        value: elValue,
        description,
        selected,
      } = el as VscodeOption;

      const value = (el as VscodeOption).hasAttribute('value')
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

  protected async _toggleDropdown(visible: boolean): Promise<void> {
    this._showDropdown = visible;
    this.ariaExpanded = String(visible);

    if (visible && !this._multiple && !this.combobox) {
      this._activeIndex = this._selectedIndex;

      if (this._activeIndex > VISIBLE_OPTS - 1) {
        await this.updateComplete;

        this._listElement.scrollTop = Math.floor(
          this._activeIndex * OPT_HEIGHT
        );
      }
    }

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

    if (this._multiple) {
      this._activeIndex = 0;
    }
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

  private _onMouseMove() {
    this._isHoverForbidden = false;
    window.removeEventListener('mousemove', this._onMouseMoveBound);
  }

  private _onMouseMoveBound = this._onMouseMove.bind(this);

  private _toggleComboboxDropdown() {
    this._filterPattern = '';
    this._toggleDropdown(!this._showDropdown);

    if (this._multiple) {
      this._activeIndex = -1;
    }
  }

  protected _onComboboxButtonClick(): void {
    this._toggleComboboxDropdown();
  }

  protected _onComboboxButtonKeyDown(ev: KeyboardEvent): void {
    if (ev.key === 'Enter') {
      this._toggleComboboxDropdown();
    }
  }

  protected _onOptionMouseOver(ev: MouseEvent): void {
    if (this._isHoverForbidden) {
      return;
    }

    const el = ev.target as HTMLElement;

    if (!el.matches('.option')) {
      return;
    }

    this._activeIndex = Number(
      this.combobox ? el.dataset.filteredIndex : el.dataset.index
    );
  }

  private _onEnterKeyDown(): void {
    const showDropdownNext = !this._showDropdown;

    this._toggleDropdown(showDropdownNext);

    if (
      !this._multiple &&
      !showDropdownNext &&
      this._selectedIndex !== this._activeIndex
    ) {
      this._selectedIndex = this._options[this._activeIndex].index;
      this._value = this._options[this._selectedIndex].value;
      this._dispatchChangeEvent();
    }

    if (this.combobox) {
      if (!this._multiple && !showDropdownNext) {
        this._selectedIndex = this._filteredOptions[this._activeIndex].index;
      }

      if (!this._multiple && showDropdownNext) {
        this.updateComplete.then(() => {
          this._scrollActiveElementToTop();
        });
      }
    }

    if (this._multiple && showDropdownNext) {
      this._activeIndex = 0;
    }
  }

  private _onSpaceKeyDown() {
    if (!this._showDropdown) {
      this._toggleDropdown(true);
      return;
    }

    if (this._showDropdown && this._multiple && this._activeIndex > -1) {
      const opts = this.combobox ? this._filteredOptions : this._options;
      const {selected} = opts[this._activeIndex];

      opts[this._activeIndex].selected = !selected;
      this._selectedIndexes = [];

      opts.forEach(({index, selected}) => {
        if (selected) {
          this._selectedIndexes.push(index);
        }
      });
    }
  }

  private _scrollActiveElementToTop() {
    this._listElement.scrollTop = Math.floor(this._activeIndex * OPT_HEIGHT);
  }

  private async _adjustOptionListScrollPos(direction: 'down' | 'up') {
    const numOpts = this.combobox
      ? this._filteredOptions.length
      : this._options.length;

    if (numOpts <= VISIBLE_OPTS) {
      return;
    }

    this._isHoverForbidden = true;
    window.addEventListener('mousemove', this._onMouseMoveBound);

    if (!this._listElement) {
      await this.updateComplete;
    }

    const ulScrollTop = this._listElement.scrollTop;
    const liPosY = this._activeIndex * OPT_HEIGHT;

    if (direction === 'down') {
      if (liPosY + OPT_HEIGHT >= LIST_HEIGHT + ulScrollTop) {
        this._listElement.scrollTop =
          (this._activeIndex - (VISIBLE_OPTS - 1)) * OPT_HEIGHT;
      }
    }

    if (direction === 'up') {
      if (liPosY <= ulScrollTop - OPT_HEIGHT) {
        this._scrollActiveElementToTop();
      }
    }
  }

  protected _onArrowUpKeyDown(): void {
    if (this._showDropdown) {
      if (this._activeIndex <= 0) {
        return;
      }

      this._activeIndex -= 1;
      this._adjustOptionListScrollPos('up');
    }
  }

  protected _onArrowDownKeyDown(): void {
    if (this._showDropdown) {
      if (this._activeIndex >= this._currentOptions.length - 1) {
        return;
      }

      this._activeIndex += 1;
      this._adjustOptionListScrollPos('down');
    }
  }

  private _onComponentKeyDown(event: KeyboardEvent) {
    if ([' ', 'ArrowUp', 'ArrowDown', 'Escape'].includes(event.key)) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this._onEnterKeyDown();
    }

    if (event.key === ' ') {
      this._onSpaceKeyDown();
    }

    if (event.key === 'Escape') {
      this._toggleDropdown(false);
    }

    if (event.key === 'ArrowUp') {
      this._onArrowUpKeyDown();
    }

    if (event.key === 'ArrowDown') {
      this._onArrowDownKeyDown();
    }
  }

  private _onComponentFocus() {
    this.focused = true;
  }

  private _onComponentBlur() {
    this.focused = false;
  }

  protected _onSlotChange(): void {
    const stat = this._addOptionsFromSlottedElements();

    if (stat.selectedIndexes.length > 0) {
      this._selectedIndex = stat.selectedIndexes[0];
      this._selectedIndexes = stat.selectedIndexes;
      this._value = stat.values[0];
      this._values = stat.values;
    }
  }

  protected _onComboboxInputFocus(ev: FocusEvent): void {
    (ev.target as HTMLInputElement).select();
  }

  protected _onComboboxInputInput(ev: InputEvent): void {
    this._filterPattern = (ev.target as HTMLInputElement).value;
    this._activeIndex = -1;
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
        ${this._renderOptions()} ${this._renderDropdownControls()}
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
