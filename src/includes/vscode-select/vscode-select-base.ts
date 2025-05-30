import {html, render, nothing, TemplateResult, PropertyValues} from 'lit';
import {
  eventOptions,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import '../../vscode-button/index.js';
import '../../vscode-option/index.js';
import {VscodeOption} from '../../vscode-option/index.js';
import type {InternalOption, Option, FilterMethod} from './types.js';
import {filterOptionsByPattern, highlightRanges} from './helpers.js';
import {VscElement} from '../VscElement.js';
import {chevronDownIcon} from './template-elements.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {OptionListController} from './OptionListController.js';

export const VISIBLE_OPTS = 10;
export const OPT_HEIGHT = 22;

/**
 * @cssprop --dropdown-z-index - workaround for dropdown z-index issues
 */
export class VscodeSelectBase extends VscElement {
  @property({type: Boolean, reflect: true})
  creatable = false;

  /**
   * Options can be filtered by typing into a text input field.
   */
  @property({type: Boolean, reflect: true})
  set combobox(enabled: boolean) {
    this._opts.toggleComboboxMode(enabled);
  }
  get combobox() {
    return this._opts.comboboxMode;
  }

  /**
   * Accessible label for screen readers. When a `<vscode-label>` is connected
   * to the component, it will be filled automatically.
   */
  @property({reflect: true})
  label = '';

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
    const validValues: FilterMethod[] = [
      'contains',
      'fuzzy',
      'startsWith',
      'startsWithPerTerm',
    ];

    let fm: FilterMethod;

    if (validValues.includes(val as FilterMethod)) {
      // this._filter = val as FilterMethod;
      fm = val;
    } else {
      // this._filter = 'fuzzy';
      // eslint-disable-next-line no-console
      console.warn(
        `[VSCode Webview Elements] Invalid filter: "${val}", fallback to default. Valid values are: "contains", "fuzzy", "startsWith", "startsWithPerm".`,
        this
      );
      fm = 'fuzzy';
    }

    this._opts.filterMethod = fm;
  }
  get filter(): 'contains' | 'fuzzy' | 'startsWith' | 'startsWithPerTerm' {
    return this._opts.filterMethod;
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
    // this._options = opts.map((op, index) => ({...op, index}));
    this._opts.populate(opts);
  }
  get options(): Option[] {
    return this._opts.options.map(
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

  // /** @internal */
  // @property({type: Number, attribute: true, reflect: true})
  // override tabIndex = 0;

  @queryAssignedElements({
    flatten: true,
    selector: 'vscode-option',
  })
  private _assignedOptions!: VscodeOption[];

  protected _opts = new OptionListController(this);

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
    this._setAutoFocus();
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

  protected override update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this._opts.activateDefault();

        if (!this._multiple && !this.combobox) {
          const activeOption = this._opts.getActiveOption();
          const filteredActiveIndex = activeOption?.relativeIndex ?? -1;

          if (filteredActiveIndex > VISIBLE_OPTS - 1) {
            this._optionListScrollPos = Math.floor(
              filteredActiveIndex * OPT_HEIGHT
            );
          }
        }

        window.addEventListener('click', this._onClickOutside);
      } else {
        window.removeEventListener('click', this._onClickOutside);
      }
    }
  }

  @state()
  protected _currentDescription = '';

  @state()
  protected _filter: FilterMethod = 'fuzzy';

  @state()
  protected get _filteredOptions(): InternalOption[] {
    if (!this.combobox || this._opts.filterPattern === '') {
      return this._options;
    }

    return filterOptionsByPattern(
      this._options,
      this._opts.filterPattern,
      this._filter
    );
  }

  @state()
  protected _selectedIndexes: number[] = [];

  @state()
  protected _options: InternalOption[] = [];

  @state()
  protected _value = '';

  @state()
  protected _values: string[] = [];

  @state()
  protected _isPlaceholderOptionActive = false;

  @state()
  private _isBeingFiltered = false;

  @state()
  protected _optionListScrollPos = 0;

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

  private _setAutoFocus() {
    if (this.hasAttribute('autofocus')) {
      if (this.tabIndex < 0) {
        this.tabIndex = 0;
      }

      if (this.combobox) {
        this.updateComplete.then(() => {
          this.shadowRoot
            ?.querySelector<HTMLInputElement>('.combobox-input')!
            .focus();
        });
      } else {
        this.updateComplete.then(() => {
          this.shadowRoot
            ?.querySelector<HTMLInputElement>('.select-face')!
            .focus();
        });
      }
    }
  }

  protected get _isSuggestedOptionVisible() {
    if (!(this.combobox && this.creatable)) {
      return false;
    }

    const filterPatternExistsAsOption =
      this._opts.getOptionByValue(this._opts.filterPattern) !== null;
    const filtered = this._opts.filterPattern.length > 0;
    return !filterPatternExistsAsOption && filtered;
  }

  protected _manageRequired() {}

  protected _setStateFromSlottedElements() {
    const optionElements = this._assignedOptions ?? [];
    this._valueOptionIndexMap = {};
    this._opts.clear();

    optionElements.forEach((el) => {
      const {innerText, description, disabled} = el;
      const value = typeof el.value === 'string' ? el.value : innerText.trim();
      const selected = el.selected ?? false;
      const op: Option = {
        label: innerText.trim(),
        value,
        description,
        selected,
        disabled,
      };

      this._opts.add(op);
    });
  }

  protected _createSuggestedOption() {
    const nextSelectedIndex = this._opts.numOptions;
    const op = document.createElement('vscode-option');
    op.value = this._opts.filterPattern;
    render(this._opts.filterPattern, op);
    this.appendChild(op);

    return nextSelectedIndex;
  }

  protected _dispatchChangeEvent(): void {
    this.dispatchEvent(new Event('change'));
    this.dispatchEvent(new Event('input'));
  }

  protected async _createAndSelectSuggestedOption() {}

  //#region event handlers
  protected _onFaceClick(): void {
    this.open = !this.open;
  }

  private _onClickOutside = (event: MouseEvent): void => {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this.open = false;
    }
  };

  private _onMouseMove = () => {
    this._isHoverForbidden = false;
    window.removeEventListener('mousemove', this._onMouseMove);
  };

  // TODO
  protected _toggleComboboxDropdown() {
    this._opts.filterPattern = '';
    this.open = !this.open;
  }

  protected _onComboboxButtonClick(): void {
    this._toggleComboboxDropdown();
  }

  protected _onComboboxButtonKeyDown(ev: KeyboardEvent): void {
    if (ev.key === 'Enter') {
      this._toggleComboboxDropdown();
    }
  }

  @eventOptions({passive: true})
  protected _onOptionListScroll(ev: Event) {
    this._optionListScrollPos = (ev.target as HTMLUListElement).scrollTop;
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
      this._opts.activeIndex = -1;
    } else {
      this._isPlaceholderOptionActive = false;
      this._opts.activeIndex = +el.dataset.index!;
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
  }

  private _onSpaceKeyDown() {
    if (!this.open) {
      this.open = true;
      return;
    }
  }

  protected _scrollActiveElementToTop() {
    this._optionListScrollPos = Math.floor(
      this._opts.relativeActiveIndex * OPT_HEIGHT
    );
  }

  private async _adjustOptionListScrollPos(
    direction: 'down' | 'up',
    optionIndex: number
  ) {
    let numOpts = this._opts.numOfVisibleOptions;
    const suggestedOptionVisible = this._isSuggestedOptionVisible;

    if (suggestedOptionVisible) {
      numOpts += 1;
    }

    if (numOpts <= VISIBLE_OPTS) {
      return;
    }

    this._isHoverForbidden = true;
    window.addEventListener('mousemove', this._onMouseMove);

    const ulScrollTop = this._optionListScrollPos;
    const liPosY = optionIndex * OPT_HEIGHT;

    const fullyVisible =
      liPosY >= ulScrollTop &&
      liPosY <= ulScrollTop + VISIBLE_OPTS * OPT_HEIGHT - OPT_HEIGHT;

    if (direction === 'down') {
      if (!fullyVisible) {
        this._optionListScrollPos =
          optionIndex * OPT_HEIGHT - (VISIBLE_OPTS - 1) * OPT_HEIGHT;
      }
    }

    if (direction === 'up') {
      if (!fullyVisible) {
        this._optionListScrollPos = Math.floor(
          this._opts.relativeActiveIndex * OPT_HEIGHT
        );
      }
    }
  }

  protected _onArrowUpKeyDown(): void {
    if (this.open) {
      if (this._opts.activeIndex <= 0 && !(this.combobox && this.creatable)) {
        return;
      }

      if (this._isPlaceholderOptionActive) {
        const optionIndex = this._opts.numOfVisibleOptions - 1;
        this._opts.activeIndex = optionIndex;
        this._isPlaceholderOptionActive = false;
      } else {
        const prevOpt = this._opts.activatePrev();
        const prevSelectableIndex = prevOpt?.relativeIndex ?? -1;

        if (prevSelectableIndex > -1) {
          this._adjustOptionListScrollPos('up', prevSelectableIndex);
        }
      }
    } else {
      this.open = true;
      this._opts.activeIndex = 0;
    }
  }

  protected _onArrowDownKeyDown(): void {
    let numOpts = this._opts.numOfVisibleOptions;
    const suggestedOptionVisible = this._isSuggestedOptionVisible;

    if (suggestedOptionVisible) {
      numOpts += 1;
    }

    if (this.open) {
      if (this._isPlaceholderOptionActive && this._opts.activeIndex === -1) {
        return;
      }

      if (suggestedOptionVisible && this._opts.activeIndex === numOpts - 2) {
        this._isPlaceholderOptionActive = true;
        this._adjustOptionListScrollPos('down', numOpts - 1);
        this._opts.activeIndex = -1;
      } else if (this._opts.activeIndex < numOpts - 1) {
        const nextOpt = this._opts.activateNext();
        const nextSelectableIndex = nextOpt?.relativeIndex ?? -1;

        if (nextSelectableIndex > -1) {
          this._adjustOptionListScrollPos('down', nextSelectableIndex);
        }
      }
    } else {
      this.open = true;
      this._opts.activateDefault();
    }
  }

  private _onEscapeKeyDown() {
    this.open = false;
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
      this._onEscapeKeyDown();
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
    this._opts.filterPattern = '';
  }

  protected _onComboboxInputBlur() {
    this._isBeingFiltered = false;
  }

  protected _onComboboxInputInput(ev: InputEvent): void {
    this._isBeingFiltered = true;
    this._opts.filterPattern = (ev.target as HTMLInputElement).value;
    this._opts.activeIndex = -1;
    this.open = true;
  }

  protected _onComboboxInputClick(): void {
    this._isBeingFiltered = this._opts.filterPattern !== '';
    this.open = true;
  }

  protected _onComboboxInputSpaceKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ') {
      ev.stopPropagation();
    }
  }

  protected _onOptionClick(_ev: MouseEvent) {
    this._isBeingFiltered = false;
    return;
  }
  //#endregion

  //#region render functions
  protected _renderOptions(): TemplateResult | TemplateResult[] {
    const list = this._opts.options;

    //aria-multiselectable=${this._multiple ? 'true' : 'false'}

    return html`
      <ul
        aria-label="List of options"
        class="options"
        id="select-listbox"
        role="listbox"
        @click=${this._onOptionClick}
        @mouseover=${this._onOptionMouseOver}
        @scroll=${this._onOptionListScroll}
        .scrollTop=${this._optionListScrollPos}
      >
        ${repeat(
          list,
          (op) => op.index,
          (op, index) => {
            if (!op.visible) {
              return nothing;
            }

            const active = op.index === this._opts.activeIndex && !op.disabled;
            const selected = op.index === this._opts.selectedIndex;

            const optionClasses = {
              active,
              disabled: op.disabled,
              option: true,
              selected,
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
                aria-selected=${selected ? 'true' : 'false'}
                class=${classMap(optionClasses)}
                data-index=${op.index}
                data-filtered-index=${index}
                id=${`op-${op.index}`}
                role="option"
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

    const foundOption = this._opts.getOptionByLabel(this._opts.filterPattern);

    if (foundOption) {
      return nothing;
    }

    if (this.creatable && this._opts.filterPattern.length > 0) {
      return html`<li
        class=${classMap({
          option: true,
          placeholder: true,
          active: this._isPlaceholderOptionActive,
        })}
        @mouseout=${this._onPlaceholderOptionMouseOut}
      >
        Add "${this._opts.filterPattern}"
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
    const op = this._opts.getActiveOption();

    if (!op) {
      return nothing;
    }

    const {description} = op;

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
      inputVal = this._opts.filterPattern;
    } else {
      const op = this._opts.getSelectedOption();
      inputVal = op?.label ?? '';
    }

    const activeDescendant =
      this._opts.activeIndex > -1 ? `op-${this._opts.activeIndex}` : '';

    return html`
      <div class="combobox-face face">
        ${this._multiple ? this._renderMultiSelectLabel() : nothing}
        <input
          aria-activedescendant=${activeDescendant}
          aria-autocomplete="list"
          aria-controls=${this._multiple
            ? 'multi-select-listbox'
            : 'single-select-listbox'}
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-label=${ifDefined(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${inputVal}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        >
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${chevronDownIcon}
        </button>
      </div>
    `;
  }

  protected _renderDropdownControls(): TemplateResult {
    return html`${nothing}`;
  }

  protected _renderDropdown() {
    const classes = {
      dropdown: true,
      multiple: this._multiple,
      open: this.open,
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.position === 'above' ? this._renderDescription() : nothing}
        ${this._renderOptions()} ${this._renderDropdownControls()}
        ${this.position === 'below' ? this._renderDescription() : nothing}
      </div>
    `;
  }
  //#endregion
}
