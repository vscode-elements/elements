import {html, nothing, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import type {
  VscClickEventDetail,
  VscodeContextMenuItem,
} from '../vscode-context-menu-item/vscode-context-menu-item.js';
import '../vscode-context-menu-item/index.js';
import styles from './vscode-context-menu.styles.js';

interface MenuItemData {
  label: string;
  keybinding?: string;
  value?: string;
  separator?: boolean;
  tabindex?: number;
}

export type VscContextMenuSelectEvent = CustomEvent<{
  keybinding: string;
  label: string;
  value: string;
  separator: boolean;
  tabindex: number;
}>;

/**
 * @tag vscode-context-menu
 *
 * @fires {VscMenuSelectEvent} vsc-menu-select - Emitted when a menu item is clicked
 *
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-menu-background
 * @cssprop --vscode-menu-border
 * @cssprop --vscode-menu-foreground
 * @cssprop --vscode-widget-shadow
 */
@customElement('vscode-context-menu')
export class VscodeContextMenu extends VscElement {
  static styles = styles;

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

  /**
   * By default, the menu closes when an item is clicked. This attribute prevents the menu from closing.
   */
  @property({type: Boolean, reflect: true, attribute: 'prevent-close'})
  preventClose = false;

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

  /** @internal */
  @property({type: Number, reflect: true})
  tabIndex = 0;

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
      this.show = false;
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
    this.show = false;
    document.removeEventListener('click', this._onClickOutsideBound);
  }

  private _dispatchSelectEvent(selectedOption: VscodeContextMenuItem) {
    const {keybinding, label, value, separator, tabindex} = selectedOption;

    this.dispatchEvent(
      new CustomEvent('vsc-context-menu-select', {
        detail: {
          keybinding,
          label,
          separator,
          tabindex,
          value,
        },
      }) as VscContextMenuSelectEvent
    );
  }

  private _dispatchLegacySelectEvent(selectedOption: VscodeContextMenuItem) {
    const {keybinding, label, value, separator, tabindex} = selectedOption;
    const detail: VscClickEventDetail = {
      keybinding,
      label,
      value,
      separator,
      tabindex,
    };

    /** @deprecated - Renamed to `vsc-context-menu-select` */
    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
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

    this._dispatchLegacySelectEvent(selectedOption);
    this._dispatchSelectEvent(selectedOption);

    if (!this.preventClose) {
      this.show = false;
      document.removeEventListener('click', this._onClickOutsideBound);
    }
  }

  private _onItemClick(event: CustomEvent) {
    const et = event.currentTarget as VscodeContextMenuItem;

    this._dispatchLegacySelectEvent(et);
    this._dispatchSelectEvent(et);

    if (!this.preventClose) {
      this.show = false;
    }
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

  render(): TemplateResult {
    if (!this._show) {
      return html`${nothing}`;
    }

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
                  label=${label}
                  keybinding=${keybinding}
                  value=${value}
                  ?separator=${separator}
                  tabindex=${tabindex}
                  @vsc-click=${this._onItemClick}
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

  interface GlobalEventHandlersEventMap {
    'vsc-context-menu-select': VscContextMenuSelectEvent;
  }
}
