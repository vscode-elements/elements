import { LitElement, html, css, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { nothing } from 'lit-html';

interface Option {
  label: string;
  value: string;
  description: string;
}

interface OptionElement extends Element {
  label: string;
  value: string;
  description: string;
}

@customElement('vscode-select')
export class VscodeSelect extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: Array }) options: Option[];
  @property({ type: Number }) defaultIndex: number = 0;
  @property({ type: Number }) selectedIndex: number = 0;

  private _showDropdown: boolean = false;
  private _currentDescription: string;

  constructor() {
    super();
    this.selectedIndex = 0;
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
      optionsTemplate = this.options.map((op) => html`
        <vscode-option
          @mouseenter="${this._onOptionMouseEnter}"
          @mouseleave="${this._onOptionMouseLeave}"
          description="${op.description || ''}"
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
      <div class="select-face" @click="${this._onFaceClick}">${current}</div>
      <div class="dropdown">
        <div class="options">
          ${optionsTemplate}
        </div>
        ${descriptionTemplate}
      </div>
    `;
  }
}
