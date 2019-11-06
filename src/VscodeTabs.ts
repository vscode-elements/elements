import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-tabs')
export class VscodeTabs extends LitElement {
  @property({ type: Number }) selectedIndex: number = 0;

  private _headerSlot: HTMLSlotElement;
  private _mainSlot: HTMLSlotElement;

  private _setActiveTab() {
    Array.from(this._mainSlot.assignedElements()).forEach((el: HTMLElement, i) => {
      el.style.display = i === this.selectedIndex ? 'block' : 'none';
    });

    Array.from(this._headerSlot.assignedElements()).forEach((el: HTMLElement, i) => {
      el.dataset.index = String(i);
      el.classList.toggle('is-active', i === this.selectedIndex);
    });

    this.dispatchEvent(new CustomEvent('vsc-select', {
      detail: {
        selected: this.selectedIndex,
      },
      composed: true,
    }));
  }

  private _onSlotChanged() {
    this._setActiveTab();
  }

  private _onHeaderClick(event: MouseEvent) {
    const index = (<HTMLElement>event.target).dataset.index;

    if (!index) {
      return;
    }

    this.selectedIndex = Number(index);
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

      .header {
        display: flex;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        width: 100%;
      }

      :host-context(.vscode-light) .header {
        border-bottom: 1px solid #ccc;
      }

      ::slotted(header) {
        border-bottom: 1px solid transparent;
        color: var(--vscode-foreground);
        cursor: pointer;
        display: block;
        margin-bottom: -1px;
        overflow: hidden;
        padding: 7px 8px;
        text-overflow: ellipsis;
        user-select: none;
        white-space: nowrap;
      }

      ::slotted(.is-active) {
        border-bottom-color: var(--vscode-settings-headerForeground);
        color: var(--vscode-settings-headerForeground);
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
