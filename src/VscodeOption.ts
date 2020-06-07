import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({ type: String })
  set value(val: string) {
    const oldVal = this._value;

    this._value = typeof val !== 'string' ? '' : val;
    this.requestUpdate('value', oldVal);
  }
  get value(): string {
    if (typeof this._value === 'string') {
      return this._value;
    } else if (this._value === undefined) {
      return this._label || '';
    }

    return '';
  }
  @property({ type: String })
  set label(val: string) {
    const oldVal = this._label;

    this._label = val;
    this.requestUpdate('label', oldVal);
  }
  get label(): string {
    if (typeof this._label === 'string') {
      return this._label;
    }

    return '';
  }
  @property({ type: String }) description: string = '';

  private _value: string | undefined;
  private _label: string | undefined;
  private _mainSlot: HTMLSlotElement;

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

    this.label = this.innerText;
    console.log('label', this.label);
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
