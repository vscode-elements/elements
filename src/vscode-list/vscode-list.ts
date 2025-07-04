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
  static override styles = styles;

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
  override role = 'tree';

  @property({type: Number, reflect: true})
  numChildren = 0;

  @provide({context: listContext})
  private _listContextState: ListContext = {
    arrows: false,
    indent: 8,
    multiSelect: false,
    selectedItems: new Set(),
    allItems: null,
    itemListUpToDate: false,
    focusedItem: null,
    prevFocusedItem: null,
    hasBranchItem: false,
    rootElement: this,
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

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _assignedListItems!: VscodeListItem[];

  private _activatePrevItem() {
    if (this._listContextState.focusedItem) {
      const item = findPrevItem(this._listContextState.focusedItem);

      if (item) {
        // this._listContextState.focusedItem.focused = false;
        // this._listContextState.focusedItem = item;
        // item.focused = true;
        // item.focus();
        this._activateItem(item);
      }
    }
  }

  private _activateNextItem() {
    if (this._listContextState.focusedItem) {
      const item = findNextItem(this._listContextState.focusedItem);

      if (item) {
        // this._listContextState.focusedItem.focused = false;
        // this._listContextState.focusedItem = item;
        // item.focused = true;
        // item.focus();
        this._activateItem(item);
      }
    }
  }

  private _activateItem(item: VscodeListItem) {
    if (this._listContextState.focusedItem) {
      this._listContextState.focusedItem.active = false;
      this._listContextState.focusedItem = null;
    }

    item.active = true;
    this._listContextState.focusedItem = item;

    this.updateComplete.then(() => {
      this._listContextState.focusedItem?.focus();
    });
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
          this._activateNextItem();
        }

        if (key === 'ArrowUp') {
          this._activatePrevItem();
        }
      } else {
        this._activateItem(this._assignedListItems[0]);
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
    this._listContextState.itemListUpToDate = false;
    initPathTrackerProps(this, this._assignedListItems);

    const firstChild = this.querySelector('vscode-list-item');

    if (firstChild) {
      firstChild.active = true;
    }
  };

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    const {arrows, indent} = this;

    if (changedProperties.has('arrows')) {
      this._listContextState = {...this._listContextState, arrows};
    }

    if (changedProperties.has('indent')) {
      this._listContextState = {...this._listContextState, indent};
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._handleComponentKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._handleComponentKeyDown);
  }

  override render(): TemplateResult {
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
