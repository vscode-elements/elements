import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-tabs')
export class VscodeTabs extends LitElement {
  @property({ type: Number }) selected: number = 0;

  private _headerSlot: HTMLSlotElement;
  private _mainSlot: HTMLSlotElement;

  private _setActiveTab() {
    Array.from(this._mainSlot.assignedElements()).forEach((el: HTMLElement, i) => {
      el.style.display = i === this.selected ? 'block' : 'none';
    });

    Array.from(this._headerSlot.assignedElements()).forEach((el: HTMLElement, i) => {
      el.dataset.index = String(i);
      el.classList.toggle('is-active', i === this.selected);
    });
  }

  private _onSlotChanged() {
    this._setActiveTab();
  }

  private _onHeaderClick(event: MouseEvent) {
    const index = (<HTMLElement>event.target).dataset.index;

    if (!index) {
      return;
    }

    this.selected = Number(index);
    this._setActiveTab();
  }

  firstUpdated() {
    this._headerSlot = this.shadowRoot.querySelector('slot[name=header]');
    this._mainSlot = this.shadowRoot.querySelector('slot:not([name=header])');

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

      ::slotted(.is-active) {
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <div class="header" @click="${this._onHeaderClick}">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    `;
  }
}
