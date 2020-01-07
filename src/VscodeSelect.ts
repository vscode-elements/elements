import { LitElement, html, css, property, customElement } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface Option {
  label: string;
  value: string;
  description?: string;
}

interface OptionElement extends HTMLElement {
  label: string;
  value: string;
  description?: string;
}

@customElement('vscode-select')
export class VscodeSelect extends LitElement {
  @property({ type: String })
  set value(val: string) {
    const found = this.options.findIndex(opt => opt.value === val);

    if (found !== -1) {
      this._selectedIndex = found;
      this._value = val;
    } else {
      this._selectedIndex = -1;
      this._value = '';
    }

    this._updateCurrentLabel();
  }
  get value(): string {
    return this._value;
  }
  @property({ type: Array, reflect: false })
  set options(val: Option[]) {
    this._options = val;
    this._optionsPopulatedBy = 'prop';

    const v = this._options[this.selectedIndex].value;
    const l = this._options[this.selectedIndex].label;

    this._currentLabel = l;
    this._value = v !== undefined ? v : l;
    this.requestUpdate();
  }
  get options(): Option[] {
    return this._options;
  }
  @property({ type: Number })
  set selectedIndex(val: number) {
    this._selectedIndex = val;
    this._updateCurrentLabel();
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  @property({ type: Number, reflect: true }) tabIndex: number = -1;

  private _value: string;
  private _showDropdown: boolean = false;
  private _currentDescription: string;
  private _mainSlot: HTMLSlotElement;
  private _options: Option[];
  private _currentLabel: string;
  private _selectedIndex: number;
  private _optionsPopulatedBy: 'slot' | 'prop';

  constructor() {
    super();
    this._options = [];
    this.selectedIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._onClickOutside.bind(this));
  }

  disconnectedCallback() {
    super.connectedCallback();
    window.removeEventListener('click', this._onClickOutside);
  }

  firstUpdated() {
    this._mainSlot = this.shadowRoot.querySelector('slot');

    if (this._mainSlot) {
      this._mainSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }
  }

  private _updateCurrentLabel() {
    if (this._selectedIndex === -1) {
      this._currentLabel = '';
    } else if (this._options && this._options[this._selectedIndex]) {
      this._currentLabel = this._options[this._selectedIndex].label;
    } else {
      this._currentLabel = '';
    }

    this.requestUpdate();
  }

  private _onSlotChange(event: Event) {
    const nodes = this._mainSlot.assignedNodes();
    const l = nodes.length;

    if (
      l < 1 ||
      nodes[l - 1].nodeType !== Node.ELEMENT_NODE ||
      (<Element>nodes[l - 1]).tagName.toLowerCase() !== 'vscode-option'
    ) {
      return;
    }

    const optElements = nodes.filter(
      el =>
        el.nodeType === Node.ELEMENT_NODE &&
        (<Element>el).tagName.toLowerCase() === 'vscode-option'
    );

    const lastInsertedIndex = optElements.length - 1;
    const lastInserted = (optElements[lastInsertedIndex]) as Element;

    if (lastInserted.tagName.toLowerCase() === 'vscode-option') {
      const el = (<OptionElement>lastInserted);

      el.dataset.index = String(lastInsertedIndex);
      el.addEventListener('click', this._onOptionClick.bind(this));
      el.addEventListener('mouseenter', this._onOptionMouseEnter.bind(this));
      el.addEventListener('mouseleave', this._onOptionMouseLeave.bind(this));
      el.addEventListener('vsc-slotchange', this._onOptionSlotChange.bind(this));

      this._optionsPopulatedBy = 'slot';
    }

    if (lastInsertedIndex === this._selectedIndex) {
      this._updateCurrentLabel();
    }
  }

  private _onClickOutside(event: MouseEvent) {
    if (event.target !== this) {
      this._showDropdown = false;
      this.requestUpdate();
    }
  }

  private _toogleDropdown() {
    this._showDropdown = !this._showDropdown;
    this.requestUpdate();
  }

  private _onFaceClick() {
    this._toogleDropdown();
  }

  private _onOptionMouseEnter(event: MouseEvent) {
    const element = event.target as OptionElement;

    this._currentDescription = element.description || undefined;
    this.requestUpdate();
  }

  private _onOptionMouseLeave() {
    this._currentDescription = '';
    this.requestUpdate();
  }

  private _onOptionClick(event: MouseEvent) {
    const optionElement = (event.target as OptionElement);
    const prevSelected = this.selectedIndex;

    this.selectedIndex = Number(optionElement.dataset.index);
    this._value = optionElement.value;
    this._currentLabel = optionElement.label;
    this._showDropdown = false;

    if (prevSelected !== this.selectedIndex) {
      this.dispatchEvent(new CustomEvent('vsc-change', {
        detail: {
          value: this._value,
        },
      }));
    }

    this.requestUpdate();
  }

  private _onOptionSlotChange(event: CustomEvent) {
    const optionElement = event.composedPath()[0] as OptionElement;
    const index = Number(optionElement.dataset.index);

    this._options[index] = {
      label: optionElement.innerText,
      value: optionElement.value || optionElement.innerText,
      description: optionElement.description,
    };

    if (index === this.selectedIndex) {
      this._value = optionElement.value !== undefined ? optionElement.value : optionElement.innerText;
      this._updateCurrentLabel();
    }
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

      .select-face:after {
        border-color: var(--vscode-foreground) transparent transparent transparent;
        border-style: solid;
        border-width: 6px 3px;
        content: '';
        display: block;
        margin-top: -3px;
        position: absolute;
        right: 6px;
        top: 50%;
        z-index: 1;
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
  };

  render() {
    let descriptionTemplate: TemplateResult | Object;
    let optionsTemplate: TemplateResult | Object;

    if (this._currentDescription) {
      descriptionTemplate = html`<div class="description">${this._currentDescription}</div>`;
    } else {
      descriptionTemplate = nothing;
    }

    if (this._optionsPopulatedBy === 'prop') {
      optionsTemplate = this._options.map((op, index) => html`
        <vscode-option
          @click="${this._onOptionClick}"
          @mouseenter="${this._onOptionMouseEnter}"
          @mouseleave="${this._onOptionMouseLeave}"
          description="${op.description || ''}"
          data-index="${index}"
          value="${op.value}"
        >${op.label}</vscode-option>
      `);
    } else {
      optionsTemplate = html`<slot></slot>`;
    }

    const display = this._showDropdown === true ? 'block' : 'none';
    const currentLabelMarkup = this._currentLabel === '' ? unsafeHTML('&nbsp;') : html`${this._currentLabel}`;

    return html`
      <style>
        .dropdown {
          display: ${display};
        }
      </style>
      <div class="select-face" @click="${this._onFaceClick}">${currentLabelMarkup}</div>
      <div class="dropdown">
        <div class="options">
          ${optionsTemplate}
        </div>
        ${descriptionTemplate}
      </div>
    `;
  }
}
