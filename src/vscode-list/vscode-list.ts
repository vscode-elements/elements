import {PropertyValues, TemplateResult, html} from 'lit';
import {provide} from '@lit/context';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import type {VscodeListItem} from '../vscode-list-item';
import styles from './vscode-list.styles';
import {listContext, type ListContext} from './list-context';
import {findNextItem, findPrevItem, initPathTrackerProps} from './helpers';

type ListenedKey = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape' | ' ';

const listenedKeys: ListenedKey[] = [
  ' ',
  'ArrowDown',
  'ArrowUp',
  'Enter',
  'Escape',
];

@customElement('vscode-list')
export class VscodeList extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  arrows = false;

  @property({type: Number, reflect: true})
  indent = 8;

  @property({type: Boolean, reflect: true, attribute: 'multi-select'})
  set multiSelect(val: boolean) {
    this._multiSelect = val;
    this._listContextState.multiSelect = val;
  }
  get multiSelect(): boolean {
    return this._multiSelect;
  }
  private _multiSelect = false;

  /** @internal */
  @property({type: String, reflect: true})
  role = 'tree';

  @property({type: Number, reflect: true})
  numChildren = 0;

  @provide({context: listContext})
  private _listContextState: ListContext = {
    arrows: false,
    indent: 8,
    multiSelect: false,
    selectedItems: new Set(),
    focusedItem: null,
    prevFocusedItem: null,
    hasBranchItem: false,
    rootElement: this,
    focusItem: this._focusItem,
  };

  /**
   * @internal
   * Updates `hasBranchItem` property in the context state in order to removing
   * extra padding before the leaf elements, if it is required.
   */
  updateHasBranchItemFlag() {
    const hasBranchItem = this._assignedListItems.some((li) => li.branch);
    this._listContextState = {...this._listContextState, hasBranchItem};
  }

  private _originalTabIndex = 0;

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _assignedListItems!: VscodeListItem[];

  private _focusPrevItem() {
    if (this._listContextState.focusedItem) {
      const item = findPrevItem(this._listContextState.focusedItem);

      if (item) {
        // this._listContextState.focusedItem.focused = false;
        // this._listContextState.focusedItem = item;
        // item.focused = true;
        // item.focus();
        this._focusItem(item);
      }
    }
  }

  private _focusNextItem() {
    if (this._listContextState.focusedItem) {
      const item = findNextItem(this._listContextState.focusedItem);

      if (item) {
        // this._listContextState.focusedItem.focused = false;
        // this._listContextState.focusedItem = item;
        // item.focused = true;
        // item.focus();
        this._focusItem(item);
      }
    }
  }

  private _focusItem(item: VscodeListItem) {
    const {focusedItem} = this._listContextState;

    if (focusedItem) {
      this._listContextState.focusedItem = null;
    }

    item.focus();
    this._listContextState.focusedItem = item;
  }

  private _handleComponentKeyDown = (ev: KeyboardEvent) => {
    const key = ev.key as ListenedKey;

    if (listenedKeys.includes(key)) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (this._listContextState.focusedItem) {
        if (key === 'ArrowDown') {
          this._focusNextItem();
        }

        if (key === 'ArrowUp') {
          this._focusPrevItem();
        }
      } else {
        this._focusItem(this._assignedListItems[0]);
      }
    }

    if (key === 'Enter' || key === ' ') {
      const {focusedItem} = this._listContextState;

      if (focusedItem) {
        this._listContextState.selectedItems.forEach(
          (li) => (li.selected = false)
        );

        focusedItem.selected = true;

        if (focusedItem.branch) {
          focusedItem.open = !focusedItem.open;
        }
      }
    }
  };

  private _handleSlotChange = () => {
    initPathTrackerProps(this, this._assignedListItems);

    const firstChild = this.querySelector('vscode-list-item');

    if (firstChild) {
      firstChild.tabIndex = 0;
    }
  };

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    const {arrows, indent} = this;

    if (changedProperties.has('arrows')) {
      this._listContextState = {...this._listContextState, arrows};
    }

    if (changedProperties.has('indent')) {
      this._listContextState = {...this._listContextState, indent};
    }
  }

  setOriginalTabIndex() {
    this.tabIndex = this._originalTabIndex;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._originalTabIndex = this.tabIndex;
    this.addEventListener('keydown', this._handleComponentKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._handleComponentKeyDown);
  }

  render(): TemplateResult {
    return html`<div>
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-list': VscodeList;
  }
}
