import { LitElement, html, css, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { nothing } from 'lit-html';

interface Option {
  label: string;
  value: string;
}

@customElement('vscode-select')
export class VscodeSelect extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: Array }) options: Option[];
  @property({ type: Number }) defaultIndex: number = 0;
  @property({ type: Number }) selectedIndex: number = 0;

  constructor() {
    super();
    this.selectedIndex = 0;
  }

  updated(changedProperties: Map<string, string>) {
    console.log(changedProperties);
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
        left: 0;
        position: absolute;
        top: 26px;
        width: 100%;
      }

      .options {
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px;
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
        border-width: 0 1px 1px 1px;
      }
    `;
  };

  render() {
    const current =
      this.options[this.selectedIndex].label || this.options[this.selectedIndex].value;
    let description;

    if (this.options[this.selectedIndex].description) {
      description = html`<div class="description">${this.options[this.selectedIndex].description}</div>`;
    } else {
      description = nothing;
    }

    return html`
      <div class="select-face">${current}</div>
      <div class="dropdown">
        <div class="options">
          <div class="option">Lorem</div>
          <div class="option">Ipsum</div>
        </div>
        ${description}
      </div>
    `;
  }
}
