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
import {listContext, type ListContext} from '../vscode-list/list-context';
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
  static styles = styles;

  @property({type: Boolean, reflect: true})
  branch = false;

  @property({type: Boolean, reflect: true})
  closed = false;

  @property({type: Number, reflect: true})
  level = 0;

  @property({type: Boolean, reflect: true})
  selected = false;

  @property({type: Number, reflect: true})
  tabIndex = -1;

  @consume({context: listContext, subscribe: true})
  private _listContextState: ListContext = {
    arrows: false,
    indent: 8,
    selectedItems: new Set(),
    focusedItem: null,
    focusItem: () => {
      return;
    },
    hasBranchItem: false,
    rootElement: null,
  };

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _initiallyAssignedListItems!: VscodeListItem[];

  @queryAssignedElements({selector: 'vscode-list-item', slot: 'children'})
  private _childrenListItems!: VscodeListItem[];

  private _focusItem(item: VscodeListItem) {
    const {focusedItem} = this._listContextState;

    if (focusedItem) {
      this._listContextState.focusedItem = null;
    }

    item.focus();
    this._listContextState.focusedItem = item;
  }

  private _selectItem(isCtrlDown: boolean) {
    const {selectedItems} = this._listContextState;

    if (isCtrlDown) {
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

  private _mainSlotChange() {
    this._initiallyAssignedListItems.forEach((li) => {
      li.setAttribute('slot', 'children');
    });
  }

  private _handleChildrenSlotChange() {
    initPathTrackerProps(this, this._childrenListItems);

    if (this._listContextState.rootElement) {
      this._listContextState.rootElement.updateHasBranchItemFlag();
    }
  }

  private _handleMainSlotChange = () => {
    this._mainSlotChange();
  };

  private _handleComponentFocus = () => {
    if (
      this._listContextState.focusedItem &&
      this._listContextState.focusedItem !== this
    ) {
      this._listContextState.focusedItem.tabIndex = -1;
      this._listContextState.focusedItem = null;
    }

    this._listContextState.focusedItem = this;
  };

  private _handleContentClick = (ev: MouseEvent) => {
    ev.stopPropagation();

    const isCtrlDown = ev.ctrlKey;
    this._selectItem(isCtrlDown);

    if (this.branch && !isCtrlDown) {
      this.closed = !this.closed;
    }

    this._focusItem(this);
  };

  connectedCallback(): void {
    super.connectedCallback();
    this._mainSlotChange();

    this.addEventListener('focus', this._handleComponentFocus);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('focus', this._handleComponentFocus);
  }

  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('selected') && this.selected) {
      this._listContextState.selectedItems.add(this);
    }
  }

  render(): TemplateResult {
    const {arrows, indent, hasBranchItem} = this._listContextState;
    let indentation = BASE_INDENT + this.level * indent;

    if (!this.branch && arrows && hasBranchItem) {
      indentation += ARROW_CONTAINER_WIDTH;
    }

    return html` <div class="wrapper">
      <div
        class="content"
        @click=${this._handleContentClick}
        style=${styleMap({paddingLeft: `${indentation}px`})}
      >
        ${this.branch && arrows
          ? html`<div
              class=${classMap({
                'arrow-container': true,
                'icon-rotated': !this.closed,
              })}
            >
              ${arrowIcon}
            </div>`
          : nothing}
        <div class="icon-container">
          <slot name="icon"></slot>
          ${this.branch && this.closed
            ? html`<slot name="icon-branch"></slot>`
            : nothing}
          ${this.branch && !this.closed
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
