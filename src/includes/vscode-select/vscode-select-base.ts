import {html, render, nothing, TemplateResult, PropertyValues} from 'lit';
import {property, query, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import '../../vscode-button/index.js';
import '../../vscode-option/index.js';
import {VscodeOption} from '../../vscode-option/index.js';
import type {InternalOption, Option, SearchMethod} from './types.js';
import {
  filterOptionsByPattern,
  findNextSelectableOptionIndex,
  findPrevSelectableOptionIndex,
  highlightRanges,
} from './helpers.js';
import {VscElement} from '../VscElement.js';
import {chevronDownIcon} from './template-elements.js';

const VISIBLE_OPTS = 10;
const OPT_HEIGHT = 22;

/**
 * @cssprop --dropdown-z-index - workaround for dropdown z-index issues
 */
export class VscodeSelectBase extends VscElement {
  /** @internal */
  @property({type: String, reflect: true, attribute: 'aria-expanded'})
  override ariaExpanded = 'false';

  @property({type: Boolean, reflect: true})
  creatable = false;

  /**
   * Options can be filtered by typing into a text input field.
   */
  @property({type: Boolean, reflect: true})
  combobox = false;

  /**
   * The element cannot be used and is not focusable.
   */
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

  /**
   * Its value is true when element is focused.
   */
  @property({type: Boolean, reflect: true})
  focused = false;

  /**
   * Toggle the dropdown visibility.
   */
  @property({type: Boolean, reflect: true})
  open = false;

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
  override tabIndex = 0;

  @queryAssignedElements({
    flatten: true,
    selector: 'vscode-option',
  })
  private _assignedOptions!: VscodeOption[];

  constructor() {
    super();
    this.addEventListener('vsc-option-state-change', (ev) => {
      ev.stopPropagation();
      this._setStateFromSlottedElements();
      this.requestUpdate();
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._onComponentKeyDown);
    this.addEventListener('focus', this._onComponentFocus);
    this.addEventListener('blur', this._onComponentBlur);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onComponentKeyDown);
    this.removeEventListener('focus', this._onComponentFocus);
    this.removeEventListener('blur', this._onComponentBlur);
  }

  protected _firstUpdateCompleted = false;

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this._firstUpdateCompleted = true;
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('required') && this._firstUpdateCompleted) {
      this._manageRequired();
    }
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
  protected _options: InternalOption[] = [];

  @state()
  protected _value = '';

  @state()
  protected _values: string[] = [];

  @state()
  protected _listScrollTop = 0;

  @state()
  protected _isPlaceholderOptionActive = false;

  @state()
  private _isBeingFiltered = false;

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

  protected get _isSuggestedOptionVisible() {
    if (!(this.combobox && this.creatable)) {
      return false;
    }

    const filterPatternExistsAsOption =
      typeof this._valueOptionIndexMap[this._filterPattern] !== 'undefined';
    const filtered = this._filterPattern.length > 0;
    return !filterPatternExistsAsOption && filtered;
  }

  protected _manageRequired() {}

  protected _setStateFromSlottedElements() {
    const options: InternalOption[] = [];
    let nextIndex = 0;
    const optionElements = this._assignedOptions ?? [];
    const selectedIndexes: number[] = [];
    const values: string[] = [];
    this._valueOptionIndexMap = {};

    optionElements.forEach((el, i) => {
      const {innerText, description, disabled} = el;
      const value = typeof el.value === 'string' ? el.value : innerText.trim();
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

      if (selected && !this._multiple) {
        this._activeIndex = i;
      }

      if (selected) {
        selectedIndexes.push(options.length - 1);
        values.push(value);
      }

      this._valueOptionIndexMap[op.value] = op.index;
    });

    this._options = options;

    if (selectedIndexes.length > 0) {
      this._selectedIndex = selectedIndexes[0];
      this._selectedIndexes = selectedIndexes;
      this._value = values[0];
      this._values = values;
    }

    if (!this._multiple && !this.combobox && selectedIndexes.length === 0) {
      this._selectedIndex = this._options.length > 0 ? 0 : -1;
    }
  }

  protected async _toggleDropdown(visible: boolean): Promise<void> {
    this.open = visible;
    this.ariaExpanded = String(visible);

    if (visible && !this._multiple) {
      this._activeIndex = this._selectedIndex;
    }

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

  protected _createSuggestedOption() {
    const nextSelectedIndex = this._options.length;
    const op = document.createElement('vscode-option');
    op.value = this._filterPattern;
    render(this._filterPattern, op);
    this.appendChild(op);

    return nextSelectedIndex;
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

  protected async _createAndSelectSuggestedOption() {}

  protected _onFaceClick(): void {
    this._toggleDropdown(!this.open);

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
    this._toggleDropdown(!this.open);

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

    if (el.matches('.placeholder')) {
      this._isPlaceholderOptionActive = true;
      this._activeIndex = -1;
    } else {
      this._isPlaceholderOptionActive = false;
      this._activeIndex = Number(
        this.combobox ? el.dataset.filteredIndex : el.dataset.index
      );
    }
  }

  protected _onPlaceholderOptionMouseOut() {
    this._isPlaceholderOptionActive = false;
  }

  protected _onNoOptionsClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  protected _onEnterKeyDown(ev: KeyboardEvent): void {
    this._isBeingFiltered = false;
    const clickedOnAcceptButton = ev?.composedPath
      ? ev
          .composedPath()
          .find((el) =>
            (el as HTMLElement).matches
              ? (el as HTMLElement).matches('vscode-button.button-accept')
              : false
          )
      : false;

    if (clickedOnAcceptButton) {
      return;
    }

    const list = this.combobox ? this._filteredOptions : this._options;
    const showDropdownNext = !this.open;

    this._toggleDropdown(showDropdownNext);

    if (
      !this._multiple &&
      !showDropdownNext &&
      this._selectedIndex !== this._activeIndex
    ) {
      this._selectedIndex =
        this._activeIndex > -1 ? list[this._activeIndex].index : -1;
      this._value =
        this._selectedIndex > -1
          ? this._options[this._selectedIndex].value
          : '';
      this._dispatchChangeEvent();
    }

    if (this.combobox) {
      if (this._isPlaceholderOptionActive) {
        this._createAndSelectSuggestedOption();
      } else {
        if (!this._multiple && !showDropdownNext) {
          this._selectedIndex =
            this._activeIndex > -1
              ? this._filteredOptions[this._activeIndex].index
              : -1;
        }

        if (!this._multiple && showDropdownNext) {
          this.updateComplete.then(() => {
            this._scrollActiveElementToTop();
          });
        }
      }
    }

    if (this._multiple && showDropdownNext) {
      this._activeIndex = 0;
    }
  }

  private _onSpaceKeyDown() {
    if (!this.open) {
      this._toggleDropdown(true);
      return;
    }

    if (this.open && this._multiple && this._activeIndex > -1) {
      const opts = this.combobox ? this._filteredOptions : this._options;
      const selectedOption = opts[this._activeIndex];
      const nextSelectedIndexes: number[] = [];

      this._options[selectedOption.index].selected = !selectedOption.selected;

      opts.forEach(({index}) => {
        const {selected} = this._options[index];

        if (selected) {
          nextSelectedIndexes.push(index);
        }
      });

      this._selectedIndexes = nextSelectedIndexes;
    }
  }

  private _scrollActiveElementToTop() {
    this._listElement.scrollTop = Math.floor(this._activeIndex * OPT_HEIGHT);
  }

  private async _adjustOptionListScrollPos(
    direction: 'down' | 'up',
    optionIndex: number
  ) {
    let numOpts = this.combobox
      ? this._filteredOptions.length
      : this._options.length;
    const suggestedOptionVisible = this._isSuggestedOptionVisible;

    if (suggestedOptionVisible) {
      numOpts += 1;
    }

    if (numOpts <= VISIBLE_OPTS) {
      return;
    }

    this._isHoverForbidden = true;
    window.addEventListener('mousemove', this._onMouseMove);

    const ulScrollTop = this._listElement.scrollTop;
    const liPosY = optionIndex * OPT_HEIGHT;

    const fullyVisible =
      liPosY >= ulScrollTop &&
      liPosY <= ulScrollTop + VISIBLE_OPTS * OPT_HEIGHT - OPT_HEIGHT;

    if (direction === 'down') {
      if (!fullyVisible) {
        this._listElement.scrollTop =
          optionIndex * OPT_HEIGHT - (VISIBLE_OPTS - 1) * OPT_HEIGHT;
      }
    }

    if (direction === 'up') {
      if (!fullyVisible) {
        this._listElement.scrollTop = Math.floor(
          this._activeIndex * OPT_HEIGHT
        );
      }
    }
  }

  protected _onArrowUpKeyDown(): void {
    if (this.open) {
      if (this._activeIndex <= 0 && !(this.combobox && this.creatable)) {
        return;
      }

      if (this._isPlaceholderOptionActive) {
        const optionIndex = this._currentOptions.length - 1;
        this._activeIndex = optionIndex;
        this._isPlaceholderOptionActive = false;
      } else {
        const currentOptions = this.combobox
          ? this._filteredOptions
          : this._options;

        const prevSelectable = findPrevSelectableOptionIndex(
          currentOptions,
          this._activeIndex
        );

        if (prevSelectable > -1) {
          this._activeIndex = prevSelectable;
          this._adjustOptionListScrollPos('up', prevSelectable);
        }
      }
    }
  }

  protected _onArrowDownKeyDown(): void {
    let numOpts = this.combobox
      ? this._filteredOptions.length
      : this._options.length;
    const currentOptions = this.combobox
      ? this._filteredOptions
      : this._options;
    const suggestedOptionVisible = this._isSuggestedOptionVisible;

    if (suggestedOptionVisible) {
      numOpts += 1;
    }

    if (this.open) {
      if (this._isPlaceholderOptionActive && this._activeIndex === -1) {
        return;
      }

      if (suggestedOptionVisible && this._activeIndex === numOpts - 2) {
        this._isPlaceholderOptionActive = true;
        this._adjustOptionListScrollPos('down', numOpts - 1);
        this._activeIndex = -1;
      } else if (this._activeIndex < numOpts - 1) {
        const nextSelectable = findNextSelectableOptionIndex(
          currentOptions,
          this._activeIndex
        );

        if (nextSelectable > -1) {
          this._activeIndex = nextSelectable;
          this._adjustOptionListScrollPos('down', nextSelectable);
        }
      }
    }
  }

  private _onComponentKeyDown = (event: KeyboardEvent) => {
    if ([' ', 'ArrowUp', 'ArrowDown', 'Escape'].includes(event.key)) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this._onEnterKeyDown(event);
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
  };

  private _onComponentFocus = () => {
    this.focused = true;
  };

  private _onComponentBlur = () => {
    this.focused = false;
  };

  protected _onSlotChange(): void {
    this._setStateFromSlottedElements();
    this.requestUpdate();
  }

  protected _onComboboxInputFocus(ev: FocusEvent): void {
    (ev.target as HTMLInputElement).select();
    this._isBeingFiltered = false;
    this._filterPattern = '';
  }

  protected _onComboboxInputBlur() {
    this._isBeingFiltered = false;
  }

  protected _onComboboxInputInput(ev: InputEvent): void {
    this._isBeingFiltered = true;
    this._filterPattern = (ev.target as HTMLInputElement).value;
    this._activeIndex = -1;
    this._toggleDropdown(true);
  }

  protected _onComboboxInputClick(): void {
    this._isBeingFiltered = this._filterPattern !== '';
    this._toggleDropdown(true);
  }

  protected _onOptionClick(_ev: MouseEvent) {
    this._isBeingFiltered = false;
    return;
  }

  protected _renderOptions(): TemplateResult | TemplateResult[] {
    const list = this.combobox ? this._filteredOptions : this._options;

    return html`
      <ul
        class="options"
        @click=${this._onOptionClick}
        @mouseover=${this._onOptionMouseOver}
      >
        ${repeat(
          list,
          (op) => op.index,
          (op, index) => {
            const optionClasses = {
              active: index === this._activeIndex && !op.disabled,
              disabled: op.disabled,
              option: true,
              selected: op.selected,
            };

            const checkboxClasses = {
              'checkbox-icon': true,
              checked: op.selected,
            };

            const labelText =
              (op.ranges?.length ?? 0 > 0)
                ? highlightRanges(op.label, op.ranges ?? [])
                : op.label;

            return html`
              <li
                class=${classMap(optionClasses)}
                data-index=${op.index}
                data-filtered-index=${index}
              >
                ${this._multiple
                  ? html`<span class=${classMap(checkboxClasses)}></span
                      ><span class="option-label">${labelText}</span>`
                  : labelText}
              </li>
            `;
          }
        )}
        ${this._renderPlaceholderOption(list.length < 1)}
      </ul>
    `;
  }

  protected _renderPlaceholderOption(isListEmpty: boolean) {
    if (!this.combobox) {
      return nothing;
    }

    if (this._valueOptionIndexMap[this._filterPattern]) {
      return nothing;
    }

    if (this.creatable && this._filterPattern.length > 0) {
      return html`<li
        class=${classMap({
          option: true,
          placeholder: true,
          active: this._isPlaceholderOptionActive,
        })}
        @mouseout=${this._onPlaceholderOptionMouseOut}
      >
        Add "${this._filterPattern}"
      </li>`;
    } else {
      return isListEmpty
        ? html`<li class="no-options" @click=${this._onNoOptionsClick}>
            No options
          </li>`
        : nothing;
    }
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

  private _renderMultiSelectLabel() {
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

  protected _renderComboboxFace(): TemplateResult {
    let inputVal = '';

    if (this._isBeingFiltered) {
      inputVal = this._filterPattern;
    } else {
      inputVal =
        this._selectedIndex > -1
          ? (this._options[this._selectedIndex]?.label ?? '')
          : '';
    }

    return html`
      <div class="combobox-face face">
        ${this._multiple ? this._renderMultiSelectLabel() : nothing}
        <input
          class="combobox-input"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${inputVal}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
        >
        <button
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
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
      <div class=${classes}>
        ${this.position === 'above' ? this._renderDescription() : nothing}
        ${this._renderOptions()} ${this._renderDropdownControls()}
        ${this.position === 'below' ? this._renderDescription() : nothing}
      </div>
    `;
  }

  override render(): TemplateResult {
    return html`
      <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
      ${this.combobox ? this._renderComboboxFace() : this._renderSelectFace()}
      ${this.open ? this._renderDropdown() : nothing}
    `;
  }
}
