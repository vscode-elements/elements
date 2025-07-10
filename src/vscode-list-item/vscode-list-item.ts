import {PropertyValues, TemplateResult, html, nothing} from 'lit';
import {consume} from '@lit/context';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-list-item.styles';
import {classMap} from 'lit/directives/class-map.js';
import {
  ConfigContext,
  configContext,
  listContext,
  type ListContext,
} from '../vscode-list/list-context';
import {initPathTrackerProps} from '../vscode-list/helpers';

const BASE_INDENT = 3;
const ARROW_CONTAINER_WIDTH = 30;

const arrowIcon = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
  />
</svg>`;

@customElement('vscode-list-item')
export class VscodeListItem extends VscElement {
  static override styles = styles;

  //#region properties

  @property({type: Boolean})
  active = false;

  @property({type: Boolean, reflect: true})
  branch = false;

  @property({type: Boolean, reflect: true})
  open = false;

  @property({type: Number, reflect: true})
  level = 0;

  @property({type: Boolean, reflect: true})
  set selected(val: boolean) {
    this._selected = val;
    this._listContextState.selectedItems.add(this);
  }
  get selected(): boolean {
    return this._selected;
  }
  private _selected = false;

  set path(newPath: number[]) {
    this._path = newPath;
  }
  get path(): number[] {
    return this._path;
  }

  //#endregion

  //#region private variables

  private _path: number[] = [];

  @consume({context: listContext, subscribe: true})
  private _listContextState: ListContext = {
    selectedItems: new Set(),
    allItems: null,
    itemListUpToDate: false,
    focusedItem: null,
    prevFocusedItem: null,
    hasBranchItem: false,
    rootElement: null,
    activeItem: null,
  };

  @consume({context: configContext, subscribe: true})
  private _configContext!: ConfigContext;

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _initiallyAssignedListItems!: VscodeListItem[];

  @queryAssignedElements({selector: 'vscode-list-item', slot: 'children'})
  private _childrenListItems!: VscodeListItem[];

  //#endregion

  //#region lifecycle methods

  override connectedCallback(): void {
    super.connectedCallback();
    this._mainSlotChange();

    this.addEventListener('focus', this._handleComponentFocus);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('focus', this._handleComponentFocus);
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('active')) {
      if (this.active) {
        if (this._listContextState.activeItem) {
          this._listContextState.activeItem.active = false;
        }

        this._listContextState.activeItem = this;
        this.tabIndex = 0;
      } else {
        if (this._listContextState.activeItem === this) {
          this._listContextState.activeItem = null;
        }

        this.tabIndex = -1;
      }
    }
  }

  //#endregion

  //#region private methods

  private _selectItem(isCtrlDown: boolean) {
    const {selectedItems, multiSelect} = this._listContextState;

    if (multiSelect && isCtrlDown) {
      if (this.selected) {
        this.selected = false;
        selectedItems.delete(this);
      } else {
        this.selected = true;
        selectedItems.add(this);
      }
    } else {
      selectedItems.forEach((li) => (li.selected = false));
      selectedItems.clear();
      this.selected = true;
      selectedItems.add(this);
    }
  }

  private _selectRange() {
    const prevFocused = this._listContextState.prevFocusedItem;

    if (!prevFocused || prevFocused === this) {
      return;
    }

    if (!this._listContextState.itemListUpToDate) {
      this._listContextState.allItems =
        this._listContextState.rootElement!.querySelectorAll(
          'vscode-list-item'
        );

      if (this._listContextState.allItems) {
        this._listContextState.allItems.forEach((li, i) => {
          li.dataset.score = i.toString();
        });
      }

      this._listContextState.itemListUpToDate = true;
    }

    let from = +(prevFocused.dataset.score ?? -1);
    let to = +(this.dataset.score ?? -1);

    if (from > to) {
      [from, to] = [to, from];
    }

    this._listContextState.selectedItems.forEach((li) => (li.selected = false));
    this._listContextState.selectedItems.clear();

    this._selectItemsAndAllVisibleDescendants(from, to);
  }

  private _selectItemsAndAllVisibleDescendants(from: number, to: number) {
    let i = from;

    while (i <= to) {
      if (this._listContextState.allItems) {
        const item = this._listContextState.allItems[i];

        if (item.branch && !item.open) {
          item.selected = true;
          const numChildren = item.querySelectorAll('vscode-list-item').length;
          i += numChildren;
        } else if (item.branch && item.open) {
          item.selected = true;
          i += this._selectItemsAndAllVisibleDescendants(i + 1, to);
        } else {
          item.selected = true;
          i += 1;
        }
      }
    }

    return i;
  }

  private _mainSlotChange() {
    this._initiallyAssignedListItems.forEach((li) => {
      li.setAttribute('slot', 'children');
    });
  }

  //#endregion

  //#region event handlers

  private _handleChildrenSlotChange() {
    initPathTrackerProps(this, this._childrenListItems);

    if (this._listContextState.rootElement) {
      this._listContextState.rootElement.updateHasBranchItemFlag();
    }
  }

  private _handleMainSlotChange = () => {
    this._mainSlotChange();
    this._listContextState.itemListUpToDate = false;
  };

  // TODO: Will be replace with "activate" logic
  private _handleComponentFocus = () => {
    if (
      this._listContextState.focusedItem &&
      this._listContextState.focusedItem !== this
    ) {
      this._listContextState.prevFocusedItem =
        this._listContextState.focusedItem;
      this._listContextState.focusedItem = null;
    }

    this._listContextState.focusedItem = this;
  };

  private _handleContentClick = (ev: MouseEvent) => {
    ev.stopPropagation();

    const isCtrlDown = ev.ctrlKey;
    const isShiftDown = ev.shiftKey;

    if (isShiftDown) {
      this._selectRange();
    } else {
      this._selectItem(isCtrlDown);

      if (this.branch && !(this._configContext.multiSelect && isCtrlDown)) {
        this.open = !this.open;
      }
    }

    this.active = true;

    if (!isShiftDown) {
      this._listContextState.prevFocusedItem = this;
    }
  };

  //#endregion

  override render(): TemplateResult {
    const {arrows, indent} = this._configContext;
    const {hasBranchItem} = this._listContextState;
    let indentation = BASE_INDENT + this.level * indent;

    if (!this.branch && arrows && hasBranchItem) {
      indentation += ARROW_CONTAINER_WIDTH;
    }

    const contentClasses = {
      content: true,
      active: this.active,
    };

    return html` <div class="wrapper">
      <div
        class=${classMap(contentClasses)}
        @click=${this._handleContentClick}
        style=${styleMap({paddingLeft: `${indentation}px`})}
      >
        ${this.branch && arrows
          ? html`<div
              class=${classMap({
                'arrow-container': true,
                'icon-rotated': this.open,
              })}
            >
              ${arrowIcon}
            </div>`
          : nothing}
        <div class="icon-container">
          <slot name="icon"></slot>
          ${this.branch && !this.open
            ? html`<slot name="icon-branch"></slot>`
            : nothing}
          ${this.branch && this.open
            ? html`<slot name="icon-branch-opened"></slot>`
            : nothing}
          ${!this.branch ? html`<slot name="icon-leaf"></slot>` : nothing}
        </div>
        <div class="text-content" part="text-content">
          <span class="label" part="label"
            ><slot @slotchange=${this._handleMainSlotChange}></slot
          ></span>
          <span class="description" part="description"
            ><slot name="description"></slot
          ></span>
        </div>
        <div class="additional-content" part="additional-content">
          <div class="decorations" part="decorations">
            <slot name="decorations"></slot>
          </div>
          <div class="actions" part="actions"><slot name="actions"></slot></div>
        </div>
      </div>
      <div class="children">
        <slot
          name="children"
          @slotchange=${this._handleChildrenSlotChange}
        ></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-list-item': VscodeListItem;
  }
}
