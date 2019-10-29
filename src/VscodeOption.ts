import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: String }) description: string = '';

  private _mainSlot;

  firstUpdated() {
    console.log('option first updated', this.options);
    this._mainSlot = this.shadowRoot.querySelector('slot');

    if (this._mainSlot) {
      this._mainSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }
  }

  private _onSlotChange(event: Event) {
    console.log('opt onslotchange');
  }

  static get styles() {
    return css`
      :host {
        display: block;
        user-select: none;
      }

      :host(:hover) {
        background-color: var(--vscode-list-hoverBackground);
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
