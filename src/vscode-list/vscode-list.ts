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
import {
  ConfigContext,
  configContext,
  listContext,
  type ListContext,
} from './list-context';
import {
  findNextItem,
  findPrevItem,
  getParentItem,
  initPathTrackerProps,
} from './helpers.js';

export const EXPAND_MODE = {
  SINGLE_CLICK: 'singleClick',
  DOUBLE_CLICK: 'doubleClick',
} as const;

export type ExpandMode = (typeof EXPAND_MODE)[keyof typeof EXPAND_MODE];

type ListenedKey =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Escape'
  | 'Shift'
  | ' ';

const listenedKeys: ListenedKey[] = [
  ' ',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'Escape',
  'Shift',
];
const DEFAULT_ARROWS = false;
const DEFAULT_INDENT = 8;
const DEFAULT_INDENT_GUIDES = false;
const DEFAULT_MULTI_SELECT = false;
const DEFAULT_EXPAND_MODE = EXPAND_MODE.SINGLE_CLICK;

@customElement('vscode-list')
export class VscodeList extends VscElement {
  static override styles = styles;

  //#region properties

  @property({type: Boolean, reflect: true})
  arrows = DEFAULT_ARROWS;

  @property({type: String, attribute: 'expand-mode'})
  expandMode: ExpandMode = DEFAULT_EXPAND_MODE;

  @property({type: Number, reflect: true})
  indent = DEFAULT_INDENT;

  @property({type: Boolean, attribute: 'indent-guides', reflect: true})
  indentGuides = DEFAULT_INDENT_GUIDES;

  @property({type: Boolean, reflect: true, attribute: 'multi-select'})
  multiSelect = DEFAULT_MULTI_SELECT;

  //#endregion

  //#region private variables

  @provide({context: listContext})
  private _listContextState: ListContext = {
    isShiftPressed: false,
    activeItem: null,
    selectedItems: new Set(),
    allItems: null,
    itemListUpToDate: false,
    focusedItem: null,
    prevFocusedItem: null,
    hasBranchItem: false,
    rootElement: this,
    highlightedItems: [],
    highlightGuides: () => {
      this._highlightGuides();
    },
  };

  @provide({context: configContext})
  private _configContext: ConfigContext = {
    arrows: DEFAULT_ARROWS,
    expandMode: DEFAULT_EXPAND_MODE,
    indent: DEFAULT_INDENT,
    indentGuides: DEFAULT_INDENT_GUIDES,
    multiSelect: DEFAULT_MULTI_SELECT,
  };

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _assignedListItems!: VscodeListItem[];

  //#region lifecycle methods

  constructor() {
    super();

    this.addEventListener('keyup', this._handleComponentKeyUp);
    this.addEventListener('keydown', this._handleComponentKeyDown);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.role = 'tree';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    this._updateConfigContext(changedProperties);

    if (changedProperties.has('multiSelect')) {
      this.ariaMultiSelectable = this.multiSelect ? 'true' : 'false';
    }
  }

  //#endregion

  //#region public methods

  expandAll() {
    const children = this.querySelectorAll<VscodeListItem>('vscode-list-item');

    children.forEach((item) => {
      if (item.branch) {
        item.open = true;
      }
    });
  }

  collapseAll() {
    const children = this.querySelectorAll<VscodeListItem>('vscode-list-item');

    children.forEach((item) => {
      if (item.branch) {
        item.open = false;
      }
    });
  }

  /**
   * @internal
   * Updates `hasBranchItem` property in the context state in order to removing
   * extra padding before the leaf elements, if it is required.
   */
  updateHasBranchItemFlag() {
    const hasBranchItem = this._assignedListItems.some((li) => li.branch);
    this._listContextState = {...this._listContextState, hasBranchItem};
  }

  //#endregion

  //#region private methods

  private _highlightGuides() {
    const {activeItem, highlightedItems, selectedItems} =
      this._listContextState;

    highlightedItems.forEach((i) => (i.highlightedGuides = false));

    if (activeItem) {
      this._listContextState.highlightedItems = [];

      if (activeItem.branch && activeItem.open) {
        activeItem.highlightedGuides = true;
        this._listContextState.highlightedItems.push(activeItem);
      } else {
        const parent = getParentItem(activeItem);

        if (parent && parent.branch) {
          parent.highlightedGuides = true;
          this._listContextState.highlightedItems.push(parent);
        }
      }
    }

    if (selectedItems) {
      selectedItems.forEach((item) => {
        if (item.branch && item.open) {
          item.highlightedGuides = true;
          this._listContextState.highlightedItems.push(item);
        } else {
          const parent = getParentItem(item);

          if (parent && parent.branch) {
            parent.highlightedGuides = true;
            this._listContextState.highlightedItems.push(item);
          }
        }
      });
    }
  }

  private _updateConfigContext(changedProperties: PropertyValues) {
    const {arrows, expandMode, indent, indentGuides, multiSelect} = this;

    if (changedProperties.has('arrows')) {
      this._configContext = {...this._configContext, arrows};
    }

    if (changedProperties.has('expandMode')) {
      this._configContext = {...this._configContext, expandMode};
    }

    if (changedProperties.has('indent')) {
      this._configContext = {...this._configContext, indent};
    }

    if (changedProperties.has('indentGuides')) {
      this._configContext = {...this._configContext, indentGuides};
    }

    if (changedProperties.has('multiSelect')) {
      this._configContext = {...this._configContext, multiSelect};
    }
  }

  private _focusItem(item: VscodeListItem) {
    item.active = true;

    item.updateComplete.then(() => {
      item.focus();
    });
  }

  private _focusPrevItem() {
    if (this._listContextState.focusedItem) {
      const item = findPrevItem(this._listContextState.focusedItem);

      if (item) {
        this._focusItem(item);

        if (this._listContextState.isShiftPressed && this.multiSelect) {
          item.selected = !item.selected;
        }
      }
    }
  }

  private _focusNextItem() {
    if (this._listContextState.focusedItem) {
      const item = findNextItem(this._listContextState.focusedItem);

      if (item) {
        this._focusItem(item);

        if (this._listContextState.isShiftPressed && this.multiSelect) {
          item.selected = !item.selected;
        }
      }
    }
  }

  //#endregion

  //#region event handlers

  private _handleArrowRightPress() {
    if (!this._listContextState.focusedItem) {
      return;
    }

    const {focusedItem} = this._listContextState;

    if (focusedItem.branch) {
      if (focusedItem.open) {
        this._focusNextItem();
      } else {
        focusedItem.open = true;
      }
    }
  }

  private _handleArrowLeftPress(ev: KeyboardEvent) {
    if (ev.ctrlKey) {
      this.collapseAll();
      return;
    }

    if (!this._listContextState.focusedItem) {
      return;
    }

    const {focusedItem} = this._listContextState;
    const parent = getParentItem(focusedItem);

    if (!focusedItem.branch) {
      if (parent && parent.branch) {
        this._focusItem(parent);
      }
    } else {
      if (focusedItem.open) {
        focusedItem.open = false;
      } else {
        if (parent && parent.branch) {
          this._focusItem(parent);
        }
      }
    }
  }

  private _handleArrowDownPress() {
    if (this._listContextState.focusedItem) {
      this._focusNextItem();
    } else {
      this._focusItem(this._assignedListItems[0]);
    }
  }

  private _handleArrowUpPress() {
    if (this._listContextState.focusedItem) {
      this._focusPrevItem();
    } else {
      this._focusItem(this._assignedListItems[0]);
    }
  }

  private _handleEnterPress() {
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

  private _handleShiftPress() {
    this._listContextState.isShiftPressed = true;
  }

  private _handleComponentKeyDown = (ev: KeyboardEvent) => {
    const key = ev.key as ListenedKey;

    if (listenedKeys.includes(key)) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    switch (key) {
      case ' ':
      case 'Enter':
        this._handleEnterPress();
        break;
      case 'ArrowDown':
        this._handleArrowDownPress();
        break;
      case 'ArrowLeft':
        this._handleArrowLeftPress(ev);
        break;
      case 'ArrowRight':
        this._handleArrowRightPress();
        break;
      case 'ArrowUp':
        this._handleArrowUpPress();
        break;
      case 'Shift':
        this._handleShiftPress();
        break;
      default:
    }
  };

  private _handleComponentKeyUp = (ev: KeyboardEvent) => {
    if (ev.key === 'Shift') {
      this._listContextState.isShiftPressed = false;
    }
  };

  private _handleSlotChange = () => {
    this._listContextState.itemListUpToDate = false;
    initPathTrackerProps(this, this._assignedListItems);

    this.updateComplete.then(() => {
      if (this._listContextState.activeItem === null) {
        const firstChild = this.querySelector<VscodeListItem>(
          ':scope > vscode-list-item'
        );

        if (firstChild) {
          firstChild.active = true;
        }
      }

      this._highlightGuides();
    });
  };

  //#endregion

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
