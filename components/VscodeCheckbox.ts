import { LitElement, nothing, html, css, svg, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { render } from 'lit-html/lib/shady-render';

@customElement('vscode-checkbox')
export class VscodeCheckbox extends LitElement {
  @property({ type: String }) label: string;
  @property({ type: Boolean }) checked: boolean = false;

  private _uid = `id_${new Date().valueOf()}_${Math.floor(Math.random() * 9999)}`;

  private onElementClick() {
    this.checked = !this.checked;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .wrapper {
        cursor: pointer;
        display: block;
        position: relative;
        user-select: none;
      }

      .checkbox {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
      }

      .icon {
        background-color: var(--vscode-settings-checkboxBackground);
        background-size: 16px;
        border: 1px solid var(--vscode-settings-checkboxBorder);
        border-radius: 3px;
        box-sizing: border-box;
        height: 18px;
        left: 0;
        margin-left: 0;
        margin-right: 9px;
        padding: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 18px;
      }

      svg {
        display: block;
        height: 16px;
        width: 16px;
      }

      .label {
        color: var(--vscode-breadcrumb-foreground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
        padding-left: 27px;
      }
    `;
  };

  render() {
    const icon = svg`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.052-9.506.762.646z" fill="#424242"/>
      </svg>
    `;

    const check = this.checked ? icon : nothing;

    return html`
      <div class="wrapper">
        <input type="checkbox" id="${this._uid}" class="checkbox" ?checked="${this.checked}">
        <div class="icon">${check}</div>
        <label for="${this._uid}" class="label" @click="${this.onElementClick}">
          ${this.label}
        </label>
      </div>
    `;
  }
}
