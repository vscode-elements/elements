import {LitElement, html, css, property, customElement} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import './vscode-button';

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
}

const findOptionEl = (event: Event) => {
  const path = event.composedPath();

  return path.find(
    (el) => (el as OptionElement)?.tagName?.toLowerCase() === 'vscode-option'
  ) as OptionElement;
};

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
   * If value is not represented in the options list, the selectedIndex will be -1
   */
  @property({type: String})
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
    this._updateCurrentLabel();
  }
  get selectedIndexes(): number[] {
    return this._selectedIndexes;
  }

  @property({type: Number, reflect: true}) tabIndex = -1;

  @property({type: Boolean, reflect: true}) multiple = false;

  private _value = '';
  private _showDropdown = false;
  private _currentDescription = '';
  private _mainSlot: HTMLSlotElement | null = null;
  private _options: Option[] = [];
  private _selectedOptions: Option[] = [];
  private _currentLabel = '';
  private _selectedIndex = -1;
  private _selectedIndexes: number[] = [];
  private _onClickOutsideBound: (event: MouseEvent) => void;

  constructor() {
    super();
    this._onClickOutsideBound = this._onClickOutside.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', this._onOptionClick);
    this.addEventListener('mouseover', this._onOptionMouseEnter);
    this.addEventListener('mouseout', this._onOptionMouseLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('click', this._onOptionClick);
    this.removeEventListener('mouseover', this._onOptionMouseEnter);
    this.removeEventListener('mouseout', this._onOptionMouseLeave);
  }

  firstUpdated() {
    this._mainSlot = this.shadowRoot!.querySelector('slot');

    if (this._mainSlot) {
      this._mainSlot.addEventListener(
        'slotchange',
        this._onSlotChange.bind(this)
      );
    }
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
    }

    this.requestUpdate();
  }

  private _onSlotChange() {
    const nodes = this._mainSlot!.assignedNodes();

    const optElements = nodes.filter(
      (el) =>
        el.nodeType === Node.ELEMENT_NODE &&
        (el as Element).tagName.toLowerCase() === 'vscode-option'
    ) as OptionElement[];

    let firstSelectedElementFound = false;

    optElements.forEach((el: OptionElement, index) => {
      const label = el.innerText;
      const value = el.value || label;
      const description = el.getAttribute('description') || '';
      const selected = el.selected;

      el.dataset.index = String(index);
      el.multiple = this.multiple;

      if (!firstSelectedElementFound && selected) {
        this._selectedIndex = index;
        this._value = value;
        firstSelectedElementFound = true;
      }

      if (this.multiple && selected) {
        this._selectedIndexes.push(index);
      }

      this._options[index] = {
        label,
        value,
        description,
        selected,
      };
    });

    // this._optionElements = optElements;
    this._updateCurrentLabel();
  }

  private _onClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    const found = path.findIndex((et) => et === this);

    if (found === -1) {
      this._showDropdown = false;
      window.removeEventListener('click', this._onClickOutsideBound);
      this.requestUpdate();
    }
  }

  private _onFaceClick() {
    this._showDropdown = !this._showDropdown;
    this.requestUpdate();
    window.addEventListener('click', this._onClickOutsideBound);
  }

  private _onOptionMouseEnter(event: MouseEvent) {
    const element = findOptionEl(event);

    if (!element) {
      return;
    }

    this._currentDescription = element.description || '';
    this.requestUpdate();
  }

  private _onOptionMouseLeave(event: MouseEvent) {
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
    const prevSelected = this.selectedIndex;

    this._selectedIndex = Number(optionElementIndex);
    this._selectedIndexes = [this._selectedIndex];
    this._value = optionElement.value;

    if (!this.multiple) {
      if (prevSelected !== this.selectedIndex) {
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
      }

      this._showDropdown = false;
    } else {
      const nextSelectedValue = !optionElementSelected;

      optionElement.selected = nextSelectedValue;
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

      this.dispatchEvent(new CustomEvent('vsc-change', {
        detail: {
          multiple: true,
          selectedIndex: this._selectedIndex,
          selectedIndexes: this._selectedIndexes,
          selectedOptions: this._selectedOptions,
          value: this._value,
        }
      }));
    }

    this._updateCurrentLabel();
  }

  private _onAcceptClick() {
    this._showDropdown = false;
    this.requestUpdate();
  }

  private _onResetClick() {
    const optionElements = this._mainSlot
      ?.assignedElements()
      .filter((el) => el.tagName.toLocaleLowerCase() === 'vscode-option') as OptionElement[];

    this._options.forEach((option, index) => {
      optionElements[index].selected = false;
      option.selected = false;
    });

    this._selectedIndexes = [];
    this._updateCurrentLabel();
  }

  static get styles() {
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

      :host(:focus) .select-face {
        border-color: var(--vscode-focusBorder);
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

  render() {
    let descriptionTemplate: TemplateResult | {};

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
        <span class="text">${currentLabelMarkup}</span>
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
        <div class="options"><slot></slot></div>
        ${this.multiple
          ? html`<div class="buttons">
              <vscode-button @click="${this._onAcceptClick}"
                >OK</vscode-button
              >
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
