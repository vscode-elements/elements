import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-tabs')
export class VscodeTabs extends VscElement {
  @property({type: Number})
  set selectedIndex(index: number) {
    this._selectedIndex = index;

    this.updateComplete.then(() => {
      this._setActiveTab();
    });
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @query('slot[name=header]')
  private _headerSlot!: HTMLSlotElement;

  @query('slot:not([name=header])')
  private _mainSlot!: HTMLSlotElement;

  private _selectedIndex: number;

  constructor() {
    super();
    this._selectedIndex = 0;
  }

  private _setActiveTab() {
    if (!this._mainSlot || !this._headerSlot) {
      return;
    }

    Array.from(this._mainSlot.assignedElements()).forEach((el: Element, i) => {
      (el as HTMLElement).style.display =
        i === this._selectedIndex ? 'block' : 'none';
    });

    Array.from(this._headerSlot.assignedElements()).forEach(
      (el: Element, i) => {
        (el as HTMLElement).dataset.index = String(i);
        el.classList.toggle('is-active', i === this._selectedIndex);
      }
    );

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail: {
          selectedIndex: this._selectedIndex,
        },
        composed: true,
      })
    );
  }

  private _onSlotChanged() {
    this._setActiveTab();
  }

  private _onHeaderClick(event: MouseEvent) {
    const path = event.composedPath();
    const headerEl = path.find((et) => {
      const el = et as Element;

      if (!el.matches) {
        return false;
      }

      return el.matches('[slot=header]');
    });

    const index = (headerEl as HTMLElement)?.dataset.index;

    if (!index) {
      return;
    }

    this._selectedIndex = Number(index);
    this._setActiveTab();
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
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
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <div class="header" @click="${this._onHeaderClick}">
        <slot name="header"></slot>
      </div>
      <slot @slotchange=${this._onSlotChanged}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tabs': VscodeTabs;
  }
}
