import {PropertyValues, TemplateResult, html} from 'lit';
import {provide} from '@lit/context';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import type {VscodeTreeItem} from '../vscode-tree-item';
import styles from './vscode-tree.styles';
import {
  ConfigContext,
  configContext,
  treeContext,
  type TreeContext,
} from './tree-context';
import {
  findNextItem,
  findPrevItem,
  findParentItem,
  initPathTrackerProps,
} from './helpers.js';

export type VscTreeSelectEvent = CustomEvent<{selectedItems: VscodeTreeItem[]}>;

export const ExpandMode = {
  singleClick: 'singleClick',
  doubleClick: 'doubleClick',
} as const;

export type ExpandMode = (typeof ExpandMode)[keyof typeof ExpandMode];

export const IndentGuides = {
  none: 'none',
  onHover: 'onHover',
  always: 'always',
} as const;

export type IndentGuideDisplay =
  (typeof IndentGuides)[keyof typeof IndentGuides];

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
const DEFAULT_HIDE_ARROWS = false;
const DEFAULT_INDENT = 8;
const DEFAULT_MULTI_SELECT = false;
const DEFAULT_EXPAND_MODE = ExpandMode.singleClick;
const DEFAULT_INDENT_GUIDE_DISPLAY = IndentGuides.onHover;

/**
 * @tag vscode-tree
 */
@customElement('vscode-tree')
export class VscodeTree extends VscElement {
  static override styles = styles;

  //#region properties

  /**
   * Although arrows are always visible in the Tree component by default in VSCode, some icon sets
   * (e.g., Material Icon Theme) allow disabling them in the file explorer view. This flag makes it
   * possible to mimic that behavior.
   *
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean, reflect: true, attribute: 'hide-arrows'})
  hideArrows: boolean = DEFAULT_HIDE_ARROWS;

  /**
   * Controls how tree folders are expanded when clicked. This property is designed to use
   * the `workbench.tree.expandMode` setting.
   *
   * Valid options are available as constants.
   *
   * ```javascript
   * import {ExpandMode} from '@vscode-elements/elements/dist/vscode-tree/vscode-tree.js';
   *
   * document.querySelector('vscode-tree').expandMode = ExpandMode.singleClick;
   * ```
   *
   * @type {'singleClick' | 'doubleClick'}
   * @default 'singleClick'
   */
  @property({type: String, attribute: 'expand-mode'})
  expandMode: ExpandMode = DEFAULT_EXPAND_MODE;

  /**
   * Controls the indentation in pixels. This property is designed to use the
   * `workbench.tree.indent` setting.
   *
   * @type {number}
   * @default 8
   */
  @property({type: Number, reflect: true})
  indent: number = DEFAULT_INDENT;

  /**
   * Controls whether the tree should render indent guides. This property is
   * designed to use the `workbench.tree.renderIndentGuides` setting.
   *
   * Valid options are available as constants.
   *
   * ```javascript
   * import {IndentGuides} from '@vscode-elements/elements/dist/vscode-tree/vscode-tree.js';
   *
   * document.querySelector('vscode-tree').expandMode = IndentGuides.onHover;
   * ```
   *
   * @type {'none' | 'onHover' | 'always'}
   * @default 'onHover'
   */
  @property({
    type: String,
    attribute: 'indent-guides',
    useDefault: true,
    reflect: true,
  })
  indentGuides: IndentGuideDisplay = DEFAULT_INDENT_GUIDE_DISPLAY;

  /**
   * Allows selecting multiple items.
   *
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean, reflect: true, attribute: 'multi-select'})
  multiSelect: boolean = DEFAULT_MULTI_SELECT;

  //#endregion

  //#region private variables

  @provide({context: treeContext})
  private _treeContextState: TreeContext = {
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
    emitSelectEvent: () => {
      this._emitSelectEvent();
    },
  };

  @provide({context: configContext})
  private _configContext: ConfigContext = {
    hideArrows: DEFAULT_HIDE_ARROWS,
    expandMode: DEFAULT_EXPAND_MODE,
    indent: DEFAULT_INDENT,
    indentGuides: DEFAULT_INDENT_GUIDE_DISPLAY,
    multiSelect: DEFAULT_MULTI_SELECT,
  };

  @queryAssignedElements({selector: 'vscode-tree-item'})
  private _assignedTreeItems!: VscodeTreeItem[];

  //#endregion

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

  /**
   * Expands all folders.
   */
  expandAll() {
    const children = this.querySelectorAll<VscodeTreeItem>('vscode-tree-item');

    children.forEach((item) => {
      if (item.branch) {
        item.open = true;
      }
    });
  }

  /**
   * Collapses all folders.
   */
  collapseAll() {
    const children = this.querySelectorAll<VscodeTreeItem>('vscode-tree-item');

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
    const hasBranchItem = this._assignedTreeItems.some((li) => li.branch);
    this._treeContextState = {...this._treeContextState, hasBranchItem};
  }

  //#endregion

  //#region private methods

  private _emitSelectEvent() {
    const ev = new CustomEvent('vsc-tree-select', {
      detail: Array.from(this._treeContextState.selectedItems),
    });

    this.dispatchEvent(ev);
  }

  private _highlightGuides() {
    const {activeItem, highlightedItems, selectedItems} =
      this._treeContextState;

    highlightedItems.forEach((i) => (i.highlightedGuides = false));

    if (activeItem) {
      this._treeContextState.highlightedItems = [];

      if (activeItem.branch && activeItem.open) {
        activeItem.highlightedGuides = true;
        this._treeContextState.highlightedItems.push(activeItem);
      } else {
        const parent = findParentItem(activeItem);

        if (parent && parent.branch) {
          parent.highlightedGuides = true;
          this._treeContextState.highlightedItems.push(parent);
        }
      }
    }

    if (selectedItems) {
      selectedItems.forEach((item) => {
        if (item.branch && item.open) {
          item.highlightedGuides = true;
          this._treeContextState.highlightedItems.push(item);
        } else {
          const parent = findParentItem(item);

          if (parent && parent.branch) {
            parent.highlightedGuides = true;
            this._treeContextState.highlightedItems.push(item);
          }
        }
      });
    }
  }

  private _updateConfigContext(changedProperties: PropertyValues) {
    const {hideArrows, expandMode, indent, indentGuides, multiSelect} = this;

    if (changedProperties.has('hideArrows')) {
      this._configContext = {...this._configContext, hideArrows};
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

  private _focusItem(item: VscodeTreeItem) {
    item.active = true;

    item.updateComplete.then(() => {
      item.focus();
    });
  }

  private _focusPrevItem() {
    if (this._treeContextState.focusedItem) {
      const item = findPrevItem(this._treeContextState.focusedItem);

      if (item) {
        this._focusItem(item);

        if (this._treeContextState.isShiftPressed && this.multiSelect) {
          item.selected = !item.selected;
          this._emitSelectEvent();
        }
      }
    }
  }

  private _focusNextItem() {
    if (this._treeContextState.focusedItem) {
      const item = findNextItem(this._treeContextState.focusedItem);

      if (item) {
        this._focusItem(item);

        if (this._treeContextState.isShiftPressed && this.multiSelect) {
          item.selected = !item.selected;
          this._emitSelectEvent();
        }
      }
    }
  }

  //#endregion

  //#region event handlers

  private _handleArrowRightPress() {
    if (!this._treeContextState.focusedItem) {
      return;
    }

    const {focusedItem} = this._treeContextState;

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

    if (!this._treeContextState.focusedItem) {
      return;
    }

    const {focusedItem} = this._treeContextState;
    const parent = findParentItem(focusedItem);

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
    if (this._treeContextState.focusedItem) {
      this._focusNextItem();
    } else {
      this._focusItem(this._assignedTreeItems[0]);
    }
  }

  private _handleArrowUpPress() {
    if (this._treeContextState.focusedItem) {
      this._focusPrevItem();
    } else {
      this._focusItem(this._assignedTreeItems[0]);
    }
  }

  private _handleEnterPress() {
    const {focusedItem} = this._treeContextState;

    if (focusedItem) {
      this._treeContextState.selectedItems.forEach(
        (li) => (li.selected = false)
      );

      focusedItem.selected = true;
      this._emitSelectEvent();

      if (focusedItem.branch) {
        focusedItem.open = !focusedItem.open;
      }
    }
  }

  private _handleShiftPress() {
    this._treeContextState.isShiftPressed = true;
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
      this._treeContextState.isShiftPressed = false;
    }
  };

  private _handleSlotChange = () => {
    this._treeContextState.itemListUpToDate = false;
    initPathTrackerProps(this, this._assignedTreeItems);

    this.updateComplete.then(() => {
      if (this._treeContextState.activeItem === null) {
        const firstChild = this.querySelector<VscodeTreeItem>(
          ':scope > vscode-tree-item'
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
    'vscode-tree': VscodeTree;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-tree-select': VscTreeSelectEvent;
  }
}
