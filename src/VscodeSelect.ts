import { LitElement, html, css, property, customElement } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';

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
  @property({ type: String }) value: string = '';
  @property({ type: Array, reflect: false })
  set options(val: Option[]) {
    this._options = val;
    this._currentLabel = this.options[this.selectedIndex].label;
    this.requestUpdate();
  }
  get options(): Option[] {
    return this._options;
  }
  @property({ type: Number }) defaultIndex: number = 0;
  @property({ type: Number }) selectedIndex: number = 0;

  private _showDropdown: boolean = false;
  private _currentDescription: string;
  private _mainSlot: HTMLSlotElement;
  private _options: Option[];
  private _currentLabel: string;

  constructor() {
    super();
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
    }

    if (lastInsertedIndex === this.selectedIndex) {
      this._currentLabel = (<OptionElement>lastInserted).innerText;
      this.requestUpdate();
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
    const path = event.composedPath();
    const optionElement = (<HTMLElement>path[0]);

    this.selectedIndex = Number(optionElement.dataset.index);
    this._currentLabel = optionElement.innerText;
    this._showDropdown = false;
    this.requestUpdate();
  }

  private _onOptionSlotChange(event: CustomEvent) {
    const optionElement = event.composedPath()[0] as OptionElement;

    if (Number(optionElement.dataset.index) === this.defaultIndex) {
      this._currentLabel = event.detail.innerText;
      this.requestUpdate();
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
        width: 320px;
      }

      .select-face {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-textInputBorder);
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.3;
        padding: 4px;
        user-select: none;
        width: 100%;
      }

      .dropdown {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        top: 26px;
        width: 100%;
        z-index: 1;
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
      }
    `;
  };

  render() {
    let current: string;
    let descriptionTemplate: TemplateResult | Object;
    let optionsTemplate: TemplateResult | Object;

    if (this.options && this.options[this.selectedIndex]) {
      current = this.options[this.selectedIndex].label || this.options[this.selectedIndex].value;
    } else {
      current = '';
    }

    if (this._currentDescription) {
      descriptionTemplate = html`<div class="description">${this._currentDescription}</div>`;
    } else {
      descriptionTemplate = nothing;
    }

    if (this.options) {
      optionsTemplate = this.options.map((op, index) => html`
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

    return html`
      <style>
        .dropdown {
          display: ${display};
        }
      </style>
      <div class="select-face" @click="${this._onFaceClick}">${this._currentLabel}</div>
      <div class="dropdown">
        <div class="options">
          ${optionsTemplate}
        </div>
        ${descriptionTemplate}
      </div>
    `;
  }
}
