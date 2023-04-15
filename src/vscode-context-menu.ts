import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';
import {VscClickEventDetail} from './vscode-context-menu-item';
import './vscode-context-menu-item';

interface MenuItemData {
  label: string;
  keybinding?: string;
  value?: string;
  separator?: boolean;
  tabindex?: number;
}

@customElement('vscode-context-menu')
export class VscodeContextMenu extends VscElement {
  @property({type: Array, attribute: false})
  set data(data: MenuItemData[]) {
    this._data = data;

    const indexes: number[] = [];

    data.forEach((v, i) => {
      if (!v.separator) {
        indexes.push(i);
      }
    });

    this._clickableItemIndexes = indexes;
  }
  get data(): MenuItemData[] {
    return this._data;
  }

  @property({type: Boolean, reflect: true})
  set show(show: boolean) {
    this._show = show;
    this._selectedClickableItemIndex = -1;

    if (show) {
      this.updateComplete.then(() => {
        if (this._wrapperEl) {
          this._wrapperEl.focus();
        }

        requestAnimationFrame(() => {
          document.addEventListener('click', this._onClickOutsideBound, {
            once: true,
          });
        });
      });
    }
  }
  get show(): boolean {
    return this._show;
  }

  @property({type: Number, reflect: true})
  tabindex = 0;

  constructor() {
    super();
    this.addEventListener('keydown', this._onKeyDown);
  }

  /* connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._onClickOutsideBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onClickOutsideBound);
  } */

  @state()
  private _selectedClickableItemIndex = -1;

  @state()
  private _show = false;

  @query('.context-menu')
  private _wrapperEl!: HTMLDivElement;

  private _data: MenuItemData[] = [];

  private _clickableItemIndexes: number[] = [];

  private _onClickOutside(ev: MouseEvent) {
    if (!ev.composedPath().includes(this)) {
      this._show = false;
    }
  }

  private _onClickOutsideBound = this._onClickOutside.bind(this);

  private _onKeyDown(ev: KeyboardEvent) {
    const {key} = ev;

    if (
      key === 'ArrowUp' ||
      key === 'ArrowDown' ||
      key === 'Escape' ||
      key === 'Enter'
    ) {
      ev.preventDefault();
    }

    switch (key) {
      case 'ArrowUp':
        this._handleArrowUp();
        break;
      case 'ArrowDown':
        this._handleArrowDown();
        break;
      case 'Escape':
        this._handleEscape();
        break;
      case 'Enter':
        this._handleEnter();
        break;
      default:
    }
  }

  private _handleArrowUp() {
    if (this._selectedClickableItemIndex === 0) {
      this._selectedClickableItemIndex = this._clickableItemIndexes.length - 1;
    } else {
      this._selectedClickableItemIndex -= 1;
    }
  }

  private _handleArrowDown() {
    if (
      this._selectedClickableItemIndex + 1 <
      this._clickableItemIndexes.length
    ) {
      this._selectedClickableItemIndex += 1;
    } else {
      this._selectedClickableItemIndex = 0;
    }
  }

  private _handleEscape() {
    this._show = false;
    document.removeEventListener('click', this._onClickOutsideBound);
  }

  private _handleEnter() {
    if (this._selectedClickableItemIndex === -1) {
      return;
    }

    const realItemIndex =
      this._clickableItemIndexes[this._selectedClickableItemIndex];
    const options = this._wrapperEl.querySelectorAll(
      'vscode-context-menu-item'
    );
    const selectedOption = options[realItemIndex];
    const {keybinding, label, value, separator, tabindex} = selectedOption;
    const detail: VscClickEventDetail = {
      keybinding,
      label,
      value,
      separator,
      tabindex,
    };

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
    this._show = false;
    document.removeEventListener('click', this._onClickOutsideBound);
  }

  private _onItemClick(event: CustomEvent) {
    const {detail} = event;
    this._show = false;

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onItemMouseOver(event: MouseEvent) {
    const el = event.target as HTMLElement;
    const index = el.dataset.index ? +el.dataset.index : -1;
    const found = this._clickableItemIndexes.findIndex(
      (item) => item === index
    );

    if (found !== -1) {
      this._selectedClickableItemIndex = found;
    }
  }

  private _onItemMouseOut() {
    this._selectedClickableItemIndex = -1;
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        /* TODO: drop shadow in HC themes */
        :host {
          display: block;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          line-height: 1.4em;
          position: relative;
          width: 365px;
        }

        .context-menu {
          background-color: var(--vscode-menu-background);
          border-radius: 5px;
          box-shadow: 0 2px 8px var(--vscode-widget-shadow);
          color: var(--vscode-menu-foreground);
          padding: 4px 0;
          white-space: nowrap;
        }

        .context-menu:focus {
          outline: 0;
        }

        .context-menu-item {
          border: 1px solid transparent;
          display: flex;
          user-select: none;
        }

        .rule {
          border-bottom: 1px solid var(--vscode-menu-separatorBackground);
          display: block;
          margin: 0 0.8em 0.2em;
          opacity: 0.4;
          padding-top: 0.2em;
          width: 100%;
        }

        .context-menu-item a {
          align-items: center;
          color: var(--vscode-menu-foreground);
          cursor: default;
          display: flex;
          flex: 1 1 auto;
          height: 2em;
          outline: none;
          position: relative;
          text-decoration: inherit;
        }

        .label {
          background: none;
          display: flex;
          flex: 1 1 auto;
          font-size: 12px;
          line-height: 1;
          padding: 0 2em;
          text-decoration: none;
        }

        .keybinding {
          display: block;
          flex: 2 1 auto;
          line-height: 1;
          padding: 0 2em;
          text-align: right;
        }
      `,
    ];
  }

  render(): TemplateResult {
    if (!this._show) {
      return html`${nothing}`;
    }

    const selectedIndex =
      this._clickableItemIndexes[this._selectedClickableItemIndex];

    return html`
      <div class="context-menu" tabindex="0">
        ${this.data
          ? this.data.map(
              (
                {
                  label = '',
                  keybinding = '',
                  value = '',
                  separator = false,
                  tabindex = 0,
                },
                index
              ) => html`
                <vscode-context-menu-item
                  label="${label}"
                  keybinding="${keybinding}"
                  value="${value}"
                  ?separator="${separator}"
                  ?selected="${index === selectedIndex}"
                  tabindex="${tabindex}"
                  @vsc-click="${this._onItemClick}"
                  @mouseover=${this._onItemMouseOver}
                  @mouseout=${this._onItemMouseOut}
                  data-index=${index}
                ></vscode-context-menu-item>
              `
            )
          : html`<slot></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-context-menu': VscodeContextMenu;
  }
}
