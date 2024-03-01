import {PropertyValues, TemplateResult, html} from 'lit';
import {provide} from '@lit/context';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import type {VscodeListItem} from '../vscode-list-item';
import styles from './vscode-list.styles';
import {listContext, type ListContext} from './list-context';

type ListenedKey = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape' | ' ';

const listenedKeys: ListenedKey[] = [
  ' ',
  'ArrowDown',
  'ArrowUp',
  'Enter',
  'Escape',
];

const findLastChildItem = (item: VscodeListItem): VscodeListItem => {
  const children = item.querySelectorAll<VscodeListItem>('vscode-list-item');

  if (children.length < 1) {
    return item;
  }

  const lastItem = children[children.length - 1];

  if (lastItem.branch && !lastItem.closed) {
    return findLastChildItem(lastItem);
  } else {
    return lastItem;
  }
};

const findNextItem = (item: VscodeListItem) => {
  if (item.branch && !item.closed) {
    return item.querySelector<VscodeListItem>('vscode-list-item');
  }

  const {level, parentElement, dataset} = item;
  const index = parseInt(dataset.index ?? '-1', 10);

  if (!parentElement) {
    return null;
  }

  const numSiblings = parentElement.dataset.children
    ? parseInt(parentElement.dataset.children, 10)
    : 1;




  const nextElementIndex = Math.min(numSiblings - 1, index + 1);

  return parentElement.querySelector<VscodeListItem>(
    `vscode-list-item[level="${level}"][data-index="${nextElementIndex}"]`
  );
};

const findPrevItem = (item: VscodeListItem): VscodeListItem | null => {
  const {parentElement, dataset} = item;
  const index = parseInt(dataset.index ?? '-1', 10);

  if (!parentElement) {
    return null;
  }

  const prevSibling = parentElement.querySelector<VscodeListItem>(
    `vscode-list-item[data-index="${index - 1}"]`
  );

  if (!prevSibling) {
    if (parentElement.tagName.toUpperCase() === 'VSCODE-LIST-ITEM') {
      return parentElement as VscodeListItem;
    }
  }

  if (prevSibling && prevSibling.branch && !prevSibling.closed) {
    return findLastChildItem(prevSibling);
  }

  return prevSibling;
};

@customElement('vscode-list')
export class VscodeList extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  arrows = false;

  @property({type: Number, reflect: true})
  indent = 8;

  /** @internal */
  @property({type: String, reflect: true})
  role = 'tree';

  @property({type: Number, reflect: true})
  tabIndex = 0;

  @provide({context: listContext})
  private _listContextState: ListContext = {
    arrows: false,
    indent: 8,
    selectedItems: new Set(),
    focusedItem: null,
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
        this._listContextState.focusedItem.focused = false;
        this._listContextState.focusedItem = item;
        item.focused = true;
        item.focus();
      }
    }
  }

  private _focusNextItem() {
    const {closed, branch} = this._listContextState
      .focusedItem as VscodeListItem;

    if (this._listContextState.focusedItem) {
      const item = findNextItem(this._listContextState.focusedItem);

      if (item) {
        this._listContextState.focusedItem.focused = false;
        this._listContextState.focusedItem = item;
        item.focused = true;
        item.focus();
      }
    }
  }

  private _focusItem(item: VscodeListItem) {
    const {focusedItem} = this._listContextState;

    if (focusedItem) {
      focusedItem.focused = false;
      this._listContextState.focusedItem = null;
    }

    item.focused = true;
    item.focus();
    this._listContextState.focusedItem = item;
  }

  private _handleComponentFocus = () => {
    this._originalTabIndex = this.tabIndex;

    if (this._listContextState.focusedItem) {
      this.tabIndex = -1;
      this._listContextState.focusedItem.tabIndex = 0;
      this._listContextState.focusedItem.focus();
    }
  };

  private _handleComponentBlur = () => {};

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
  };

  private _handleSlotChange = () => {
    this.dataset.children = this._assignedListItems.length.toString();
    this._assignedListItems.forEach((li, i) => {
      li.level = 0;
      li.dataset.index = String(i);
    });
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

    this.addEventListener('focus', this._handleComponentFocus);
    this.addEventListener('blur', this._handleComponentBlur);
    this.addEventListener('keydown', this._handleComponentKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('focus', this._handleComponentFocus);
    this.removeEventListener('blur', this._handleComponentBlur);
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
