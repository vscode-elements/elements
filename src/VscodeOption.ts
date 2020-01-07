import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({ type: String })
  set value(val: string) {
    this._value = typeof val !== 'string' ? '' : val;
  }
  get value(): string {
    if (typeof this._value === 'string') {
      return this._value;
    }

    return this._value;
  }
  @property({ type: String }) description: string = '';

  private _value;
  private _mainSlot;

  constructor() {
    super();
  }

  firstUpdated() {
    this._mainSlot = this.shadowRoot.querySelector('slot');

    if (this._mainSlot) {
      this._mainSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }
  }

  private _onSlotChange(event: Event) {
    this.dispatchEvent(new CustomEvent('vsc-slotchange', {
      detail: {
        innerText: this.innerText,
      },
      composed: true,
      bubbles: false,
    }));
  }

  static get styles() {
    return css`
      :host {
        color: var(--vscode-foreground);
        display: block;
        font-size: var(--vscode-font-size);
        line-height: 1.3;
        padding: 1px 3px;
        user-select: none;
      }

      :host(:hover) {
        background-color: var(--vscode-list-focusBackground);
      }

      .empty-placeholder:before {
        content: '-';
        visibility: hidden;
      }
    `;
  }

  render() {
    return html`
      <slot><span class="empty-placeholder"></span></slot>
    `;
  }
}
