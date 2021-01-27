import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  internalProperty,
} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import './vscode-button';
import {VscodeOption} from './vscode-option';

interface Option {
  label: string;
  value: string;
  description?: string;
  selected?: boolean;
}

interface OptionElement extends HTMLElement {
  label: string;
  value: string;
  description?: string;
  selected?: boolean;
  multiple?: boolean;
  active?: boolean;
}

const isOptionElement = (el: Element) =>
  el.nodeType === Node.ELEMENT_NODE && (el as Element).matches('vscode-option');

const findOptionEl = (event: Event) => {
  const path = event.composedPath();
  return path.find((el) => isOptionElement(el as Element)) as OptionElement;
};

let componentCounter = 0;

/**
 * A dropdown menu element.
 *
 * @element vscode-select
 *
 * @fires vsc-change
 */
@customElement('vscode-select')
export class VscodeSelect extends LitElement {
  /**
   * If value is not presented in the options list, the selectedIndex will be -1
   */
  @property({type: String, reflect: true, attribute: 'value'})
  set value(val: string) {
    this._selectedIndex = this.options.findIndex((opt) => opt.value === val);
    this._selectedIndexes = [this._selectedIndex];
    this._value = val || '';
    this._updateCurrentLabel();
  }
  get value(): string {
    return this._value;
  }

  @property({type: Array, reflect: false})
  set options(opts: Option[]) {
    let markup = '';

    opts.forEach((opt) => {
      const {value, selected, description, label} = opt;
      const valueAttr = value ? ` value="${value}"` : '';
      const selectedAttr = selected && !this.multiple ? ' selected' : '';
      const descriptionAttr = description
        ? ` description="${description}"`
        : '';

      markup += `<vscode-option${valueAttr}${descriptionAttr}${selectedAttr}>`;
      markup += label;
      markup += '</vscode-option>';
    });

    this._options = opts;
    this.innerHTML = markup;
  }
  get options(): Option[] {
    return this._options;
  }

  @property({type: Number})
  set selectedIndex(val: number) {
    this._selectedIndex = val;
    this._selectedIndexes = [this._selectedIndex];
    this._value = this._options[this._selectedIndex]?.value || '';
    this._updateCurrentLabel();
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @property({type: Array})
  set selectedIndexes(val: number[]) {
    this._selectedIndexes = val;

    let firstSelectedElementIndex = -1;

    this._options.forEach((_, index) => {
      const selected = this._selectedIndexes.includes(index);

      if (firstSelectedElementIndex === -1 && selected) {
        firstSelectedElementIndex = index;
      }

      this._optionElements[index].selected = selected;
      this._optionElements[index].setAttribute(
        'aria-selected',
        selected ? 'true' : 'false'
      );
      this._options[index].selected = selected;
    });

    this._value =
      firstSelectedElementIndex !== -1
        ? this._options[firstSelectedElementIndex].value
        : '';
    this._selectedIndex = firstSelectedElementIndex;
    this._updateCurrentLabel();
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Boolean, reflect: true})
  multiple = false;

  @property({type: String, attribute: true, reflect: true})
  role = 'listbox';

  @property({type: Number, attribute: true, reflect: true})
  tabindex = 0;

  @property({type: String, reflect: true, attribute: 'aria-expanded'})
  ariaExpanded = 'false';

  @property({type: String, reflect: true, attribute: 'aria-activedescendant'})
  ariaActivedescendant = '';

  @property({type: String, reflect: true, attribute: 'aria-label'})
  ariaLabel = '';

  @property({type: String, reflect: true, attribute: 'aria-multiselectable'})
  ariaMultiselectable = 'false';

  @internalProperty()
  private set _showDropdown(val: boolean) {
    this._dropdownVisible = val;
    this.ariaExpanded = String(val);

    if (val && !this.multiple) {
      this._optionElements.forEach((_, index) => {
        this._optionElements[index].active = this._optionElements[
          index
        ].selected;

        if (this._optionElements[index].active) {
          this._activeOptionElement = this._optionElements[index];
        }
      });
    }
  }
  private get _showDropdown() {
    return this._dropdownVisible;
  }

  private _componentId = 0;
  private _ownedOptionIds: string[] = [];
  private _value = '';
  private _currentDescription = '';
  private _optionElements: VscodeOption[] = [];
  private _options: Option[] = [];
  private _selectedOptions: Option[] = [];
  private _currentLabel = '';
  private _selectedIndex = -1;
  private _selectedIndexes: number[] = [];
  private _dropdownVisible = false;
  private _onClickOutsideBound: (event: MouseEvent) => void;
  private _activeOptionElement: OptionElement | null = null;

  constructor() {
    super();
    componentCounter++;
    this._componentId = componentCounter;
    this._onClickOutsideBound = this._onClickOutside.bind(this);
  }

  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): void {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === 'multiple') {
      this.ariaMultiselectable = this.multiple ? 'true' : 'false';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this._onOptionClick);
    this.addEventListener('mouseover', this._onOptionMouseOver);
    this.addEventListener('mouseout', this._onOptionMouseOut);
    this.addEventListener('keydown', this._onComponentKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('click', this._onOptionClick);
    this.removeEventListener('mouseover', this._onOptionMouseOver);
    this.removeEventListener('mouseout', this._onOptionMouseOut);
  }

  private _toggleOption(optIndex: number, selected: boolean) {
    this._options[optIndex].selected = selected;
    this._optionElements[optIndex].selected = selected;
    this._optionElements[optIndex].setAttribute(
      'aria-selected',
      String(selected)
    );

    if (selected) {
      this.ariaActivedescendant =
        this._optionElements[optIndex].getAttribute('id') || '';
    } else {
      this.ariaActivedescendant = '';
    }

    this._updateCurrentLabel();
  }

  private _multipleLabelText() {
    const l = this._selectedIndexes.length;

    if (l === 0) {
      return '<No item selected>';
    } else if (l === 1) {
      return this._options[this._selectedIndexes[0]].label;
    } else {
      return `${l} items selected`;
    }
  }

  private _singleLabelText() {
    if (this._selectedIndex === -1) {
      return '';
    } else if (this._options && this._options[this._selectedIndex]) {
      return this._options[this._selectedIndex].label;
    } else {
      return '';
    }
  }

  private _updateCurrentLabel() {
    if (this.multiple) {
      this._currentLabel = this._multipleLabelText();
    } else {
      this._currentLabel = this._singleLabelText();
      this.ariaLabel = this._singleLabelText();
    }

    this.requestUpdate();
  }

  private _setActiveOptionElement(element: OptionElement) {
    if (this._activeOptionElement) {
      this._activeOptionElement.active = false;
    }

    element.active = true;
    this._activeOptionElement = element;
  }

  private _onSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot');
    const nodes = slot!.assignedNodes();

    this._optionElements = nodes.filter((el) =>
      isOptionElement(el as Element)
    ) as VscodeOption[];
    this._ownedOptionIds = [];

    let firstSelectedElementFound = false;

    this._optionElements.forEach((el: OptionElement, index) => {
      const label = el.innerText;
      const value = el.value || label;
      const description = el.getAttribute('description') || '';
      const selected = el.selected;
      const id = `s${this._componentId}_${index}`;

      el.dataset.index = String(index);
      el.multiple = this.multiple;
      el.setAttribute('id', id);
      el.setAttribute('role', 'option');
      el.setAttribute('aria-selected', selected ? 'true' : 'false');

      if (selected && !this.multiple) {
        this.ariaActivedescendant = id;
      }

      this._ownedOptionIds.push(id);

      if (!firstSelectedElementFound && selected) {
        this._selectedIndex = index;
        this._value = value;
        firstSelectedElementFound = true;
      }

      if (this.multiple && selected) {
        this._selectedIndexes.push(index);
      }

      if(value === this._value) {
        this._selectedIndex = index;
      }

      this._options[index] = {
        label,
        value,
        description,
        selected,
      };
    });

    this._updateCurrentLabel();
  }

  private _onClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this._showDropdown = false;
      window.removeEventListener('click', this._onClickOutsideBound);
    }
  }

  private _onFaceClick() {
    this._showDropdown = !this._showDropdown;
    window.addEventListener('click', this._onClickOutsideBound);
  }

  private _onOptionMouseOver(event: MouseEvent) {
    const element = findOptionEl(event);

    if (!element || this.multiple) {
      return;
    }

    this._setActiveOptionElement(element);
    this._currentDescription = element.description || '';
    this.requestUpdate();
  }

  private _onOptionMouseOut(event: MouseEvent) {
    const element = findOptionEl(event);

    if (!element) {
      return;
    }

    this._currentDescription = '';
    this.requestUpdate();
  }

  private _onOptionClick(event: MouseEvent) {
    const optionElement = findOptionEl(event);

    if (!optionElement) {
      return;
    }

    const optionElementIndex = Number(optionElement.dataset.index);
    const optionElementSelected = optionElement.selected;
    const prevSelectedIndex = this.selectedIndex;

    this._selectedIndex = Number(optionElementIndex);
    this._selectedIndexes = [this._selectedIndex];
    this._value = optionElement.value;

    if (!this.multiple) {
      if (prevSelectedIndex !== this.selectedIndex) {
        this.dispatchEvent(
          new CustomEvent('vsc-change', {
            detail: {
              multiple: false,
              selectedIndex: this._selectedIndex,
              selectedIndexes: this._selectedIndexes,
              selectedOptions: this._options[this._selectedIndex],
              value: this._value,
            },
          })
        );

        optionElement.selected = true;
        this.ariaActivedescendant = optionElement.id;

        if (prevSelectedIndex !== -1) {
          this._optionElements[prevSelectedIndex].selected = false;
        }
      }

      this._showDropdown = false;
    } else {
      const nextSelectedValue = !optionElementSelected;

      optionElement.selected = nextSelectedValue;
      optionElement.setAttribute(
        'aria-selected',
        nextSelectedValue ? 'true' : 'false'
      );
      this._options[optionElementIndex].selected = nextSelectedValue;

      let firstSelectedElementFound = false;
      this._selectedIndexes = [];
      this._selectedOptions = [];

      this._options.forEach((option, index) => {
        if (option.selected) {
          this._selectedIndexes.push(index);
          this._selectedOptions.push(option);

          if (!firstSelectedElementFound) {
            this._selectedIndex = index;
            this._value = this._options[this._selectedIndex]?.value || '';
            firstSelectedElementFound = true;
          }
        }
      });

      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            multiple: true,
            selectedIndex: this._selectedIndex,
            selectedIndexes: this._selectedIndexes,
            selectedOptions: this._selectedOptions,
            value: this._value,
          },
        })
      );
    }

    this._updateCurrentLabel();
  }

  private _onAcceptClick() {
    this._showDropdown = false;
  }

  private _onResetClick() {
    this._options.forEach((option, index) => {
      this._optionElements[index].selected = false;
      this._optionElements[index].setAttribute('aria-selected', 'false');
      option.selected = false;
    });

    this._selectedIndexes = [];
    this._selectedIndex = -1;
    this._value = '';
    this._updateCurrentLabel();
  }

  /*   private _onComponentKeyUp(event: KeyboardEvent) {
    console.log(event);

    event.stopPropagation();
    event.preventDefault();
  } */

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
      this._showDropdown = !this._showDropdown;
    }

    if (event.key === ' ') {
      this._showDropdown = true;
    }

    if (event.key === 'Escape' || event.key == 'Tab') {
      this._showDropdown = false;
    }

    if (event.key === 'ArrowUp' && this._selectedIndex > 0) {
      this._toggleOption(this._selectedIndex, false);
      this._selectedIndex--;
      this._toggleOption(this._selectedIndex, true);
    }

    if (
      event.key === 'ArrowDown' &&
      this._selectedIndex < this._options.length - 1
    ) {
      if (this._selectedIndex !== -1) {
        this._toggleOption(this._selectedIndex, false);
      }

      this._selectedIndex++;
      this._toggleOption(this._selectedIndex, true);
    }
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
        outline: none;
        position: relative;
        width: 320px;
      }

      .select-face {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-dropdownBorder, rgba(0, 0, 0, 0));
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.3;
        padding: 4px;
        position: relative;
        user-select: none;
        width: 100%;
      }

      :host(:focus) .select-face {
        border-color: var(--vscode-focusBorder);
        outline: none;
      }

      .icon {
        display: block;
        height: 14px;
        pointer-events: none;
        position: absolute;
        right: 8px;
        top: 5px;
        width: 14px;
      }

      .icon svg {
        height: 100%;
        width: 100%;
      }

      .select-face:empty:before {
        content: '\\00a0';
      }

      .dropdown {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 2;
      }

      :host(:focus) .dropdown {
        border-color: var(--vscode-focusBorder);
      }

      .options {
        box-sizing: border-box;
        cursor: pointer;
        padding: 1px;
      }

      .option:hover {
        background-color: var(--vscode-list-hoverBackground);
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        padding: 4px;
      }

      .buttons :not(:last-child) {
        margin-right: 4px;
      }

      .description {
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px 0 0;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.3;
        padding: 6px 4px;
      }
    `;
  }

  render(): TemplateResult {
    let descriptionTemplate: TemplateResult | Record<string, never>;

    if (this._currentDescription) {
      descriptionTemplate = html`<div class="description">
        ${this._currentDescription}
      </div>`;
    } else {
      descriptionTemplate = nothing;
    }

    const display = this._showDropdown === true ? 'block' : 'none';
    const currentLabelMarkup =
      this._currentLabel === ''
        ? unsafeHTML('&nbsp;')
        : html`${this._currentLabel}`;

    return html`
      <style>
        .dropdown {
          display: ${display};
        }
      </style>
      <div class="select-face" @click="${this._onFaceClick}">
        <span class="text">${currentLabelMarkup}</span
        >
        <span class="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
            />
          </svg>
        </span>
      </div>
      <div class="dropdown">
        <div class="options">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
        ${this.multiple
          ? html`<div class="buttons">
              <vscode-button @click="${this._onAcceptClick}">OK</vscode-button>
              <vscode-button secondary @click="${this._onResetClick}"
                >Reset</vscode-button
              >
            </div>`
          : null}
        ${descriptionTemplate}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-select': VscodeSelect;
  }
}
