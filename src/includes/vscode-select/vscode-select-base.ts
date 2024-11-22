import {html, nothing, TemplateResult} from 'lit';
import {property, query, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../vscode-button/index.js';
import '../../vscode-option/index.js';
import {VscodeOption} from '../../vscode-option/index.js';
import type {InternalOption, Option, SearchMethod} from './types.js';
import {filterOptionsByPattern} from './helpers.js';
import {VscElement} from '../VscElement.js';

interface OptionListStat {
  selectedIndexes: number[];
  values: string[];
}

const VISIBLE_OPTS = 10;
const OPT_HEIGHT = 22;
const LIST_HEIGHT = VISIBLE_OPTS + OPT_HEIGHT + 2;

/**
 * @cssprop --dropdown-z-index - workaround for dropdown z-index issues
 */
export class VscodeSelectBase extends VscElement {
  /** @internal */
  @property({type: String, reflect: true, attribute: 'aria-expanded'})
  ariaExpanded = 'false';

  @property({type: Boolean, reflect: true})
  combobox = false;

  @property({type: Boolean, reflect: true})
  set disabled(newState: boolean) {
    this._disabled = newState;
    this.ariaDisabled = newState ? 'true' : 'false';

    if (newState === true) {
      this._originalTabIndex = this.tabIndex;
      this.tabIndex = -1;
    } else {
      this.tabIndex = this._originalTabIndex ?? 0;
      this._originalTabIndex = undefined;
    }

    this.requestUpdate();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Sets the invalid state manually.
   */
  @property({type: Boolean, reflect: true})
  invalid = false;

  /**
   * Search method in the filtered list within the combobox mode.
   *
   * - contains - The list item includes the searched pattern at any position.
   * - fuzzy - The list item contains the letters of the search pattern in the same order, but at any position.
   * - startsWith - The search pattern matches the beginning of the searched text.
   * - startsWithPerTerm - The search pattern matches the beginning of any word in the searched text.
   *
   * @default 'fuzzy'
   */
  @property()
  set filter(val: 'contains' | 'fuzzy' | 'startsWith' | 'startsWithPerTerm') {
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
  get filter(): 'contains' | 'fuzzy' | 'startsWith' | 'startsWithPerTerm' {
    return this._filter;
  }

  @property({type: Boolean, reflect: true})
  focused = false;

  /**
   * @attr [options=[]]
   * @type {Option[]}
   */
  @property({type: Array})
  set options(opts: Option[]) {
    this._options = opts.map((op, index) => ({...op, index}));
  }
  get options(): Option[] {
    return this._options.map(
      ({label, value, description, selected, disabled}) => ({
        label,
        value,
        description,
        selected,
        disabled,
      })
    );
  }

  /**
   * Position of the options list when visible.
   */
  @property({reflect: true})
  position: 'above' | 'below' = 'below';

  /** @internal */
  @property({type: Number, attribute: true, reflect: true})
  tabIndex = 0;

  @queryAssignedElements({
    flatten: true,
    selector: 'vscode-option',
  })
  private _assignedOptions!: VscodeOption[];

  connectedCallback(): void {
    super.connectedCallback();
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

  @state()
  protected _activeIndex = -1;

  @state()
  protected _currentDescription = '';

  @state()
  protected _filter: SearchMethod = 'fuzzy';

  @state()
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

  @state()
  protected _filterPattern = '';

  @state()
  protected _selectedIndex = -1;

  @state()
  protected _selectedIndexes: number[] = [];

  @state()
  protected _showDropdown = false;

  @state()
  protected _options: InternalOption[] = [];

  @state()
  protected _value = '';

  @state()
  protected _values: string[] = [];

  @state()
  protected _listScrollTop = 0;

  @query('.options')
  private _listElement!: HTMLUListElement;

  /** @internal */
  protected _multiple = false;

  /**
   * @internal
   * Quick-searchable map for searching a value in the options list.
   * Keys are the options values, values are the option indexes.
   */
  protected _valueOptionIndexMap: {[key: string]: number} = {};

  private _isHoverForbidden = false;
  private _disabled = false;
  private _originalTabIndex: number | undefined = undefined;

  protected get _currentOptions(): InternalOption[] {
    return this.combobox ? this._filteredOptions : this._options;
  }

  protected _addOptionsFromSlottedElements(): OptionListStat {
    const options: InternalOption[] = [];
    let nextIndex = 0;
    const optionElements = this._assignedOptions ?? [];
    const optionsListStat: OptionListStat = {
      selectedIndexes: [],
      values: [],
    };
    this._valueOptionIndexMap = {};

    optionElements.forEach((el) => {
      const {innerText, description, disabled} = el;
      const value = (el.value ?? '') ? el.value : innerText.trim();
      const selected = el.selected ?? false;
      const op: InternalOption = {
        label: innerText.trim(),
        value,
        description,
        selected,
        index: nextIndex,
        disabled,
      };

      nextIndex = options.push(op);

      if (selected) {
        optionsListStat.selectedIndexes.push(options.length - 1);
        optionsListStat.values.push(value);
      }

      this._valueOptionIndexMap[op.value] = op.index;
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
      window.addEventListener('click', this._onClickOutside);
    } else {
      window.removeEventListener('click', this._onClickOutside);
    }
  }

  protected _dispatchChangeEvent(): void {
    if (!this._multiple) {
      /** @deprecated */
      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            selectedIndex: this._selectedIndex,
            value: this._value,
          },
        })
      );
    } else {
      /** @deprecated */
      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            selectedIndexes: this._selectedIndexes,
            value: this._values,
          },
        })
      );
    }
    this.dispatchEvent(new Event('change'));
    this.dispatchEvent(new Event('input'));
  }

  protected _onFaceClick(): void {
    this._toggleDropdown(!this._showDropdown);

    if (this._multiple) {
      this._activeIndex = 0;
    }
  }

  private _onClickOutside = (event: MouseEvent): void => {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this._toggleDropdown(false);
      window.removeEventListener('click', this._onClickOutside);
    }
  };

  private _onMouseMove = () => {
    this._isHoverForbidden = false;
    window.removeEventListener('mousemove', this._onMouseMove);
  };

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

  protected _onEnterKeyDown(): void {
    const list = this.combobox ? this._filteredOptions : this._options;
    const showDropdownNext = !this._showDropdown;

    this._toggleDropdown(showDropdownNext);

    if (
      !this._multiple &&
      !showDropdownNext &&
      this._selectedIndex !== this._activeIndex
    ) {
      this._selectedIndex = list[this._activeIndex].index;
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
    window.addEventListener('mousemove', this._onMouseMove);

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

    if (
      !this._multiple &&
      !this.combobox &&
      stat.selectedIndexes.length === 0
    ) {
      this._selectedIndex = 0;
    }

    this.requestUpdate();
  }

  protected _onComboboxInputFocus(ev: FocusEvent): void {
    (ev.target as HTMLInputElement).select();
  }

  protected _onComboboxInputInput(ev: InputEvent): void {
    this._filterPattern = (ev.target as HTMLInputElement).value;
    this._activeIndex = -1;
    this._toggleDropdown(true);
  }

  protected _onComboboxInputClick(): void {
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
        ${this.position === 'above' ? this._renderDescription() : nothing}
        ${this._renderOptions()} ${this._renderDropdownControls()}
        ${this.position === 'below' ? this._renderDescription() : nothing}
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <slot class="main-slot" @slotchange="${this._onSlotChange}"></slot>
      ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
      ${this._showDropdown ? this._renderDropdown() : nothing}
    `;
  }
}
