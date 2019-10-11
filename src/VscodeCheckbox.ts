import { LitElement, html, css, property, customElement } from 'lit-element';
import { nothing } from 'lit-html';

@customElement('vscode-checkbox')
export class VscodeCheckbox extends LitElement {
  @property({ type: String }) label: string;
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) value: string;

  private _uid = `id_${new Date().valueOf()}_${Math.floor(Math.random() * 9999)}`;

  private onElementClick() {
    this.checked = !this.checked;

    this.dispatchEvent(new CustomEvent('vsc-change', {
      detail: {
        checked: this.checked,
        label: this.label,
        value: this.value,
      },
      bubbles: true,
      composed: true,
    }));
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

      .label {
        padding-left: 27px;
      }

      .label-text {
        color: var(--vscode-breadcrumb-foreground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
      }
    `;
  };

  render() {
    const icon = html`<vscode-icon name="check"></vscode-icon>`;
    const check = this.checked ? icon : nothing;

    return html`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="checkbox"
          type="checkbox"
          ?checked="${this.checked}"
          value="${this.value}"
        >
        <div class="icon">${check}</div>
        <label for="${this._uid}" class="label" @click="${this.onElementClick}">
          <slot><span class="label-text">${this.label}</span></slot>
        </label>
      </div>
    `;
  }
}
