import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-tabs')
export class VscodeTabs extends LitElement {
  @property({ type: Number }) selected: number = 0;

  private _mainSlot;

  private _onSlotChanged(event) {
    console.dir(this._mainSlot.assignedElements());
  }

  firstUpdated() {
    this._mainSlot = this.shadowRoot.querySelector('slot');

    console.log('first updated');
    this._mainSlot.addEventListener(
      'slotchange',
      this._onSlotChanged.bind(this)
    );
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <div>
        <b>tabs</b>
        <slot></slot>
      </div>
    `;
  }
}
