import {PropertyValues, TemplateResult, html} from 'lit';
import {provide} from '@lit/context';
import {
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement';
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

/**
 * @tag vscode-tree
 */
@customElement('vscode-tree')
export class VscodeTree extends VscElement {
  static override styles = styles;

  //#region properties

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
   */
  @property({type: String, attribute: 'expand-mode'})
  expandMode: ExpandMode = 'singleClick';

  /**
   * Although arrows are always visible in the Tree component by default in VSCode, some icon sets
   * (e.g., Material Icon Theme) allow disabling them in the file explorer view. This flag makes it
   * possible to mimic that behavior.
   */
  @property({type: Boolean, reflect: true, attribute: 'hide-arrows'})
  hideArrows: boolean = false;

  /**
   * Controls the indentation in pixels. This property is designed to use the
   * `workbench.tree.indent` setting.
   */
  @property({type: Number, reflect: true})
  indent: number = 8;

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
   */
  @property({
    type: String,
    attribute: 'indent-guides',
    useDefault: true,
    reflect: true,
  })
  indentGuides: IndentGuideDisplay = 'onHover';

  /**
   * Allows selecting multiple items.
   */
  @property({type: Boolean, reflect: true, attribute: 'multi-select'})
  multiSelect: boolean = false;

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
    highlightedItems: new Set(),
    highlightIndentGuides: () => {
      this._highlightIndentGuides();
    },
    emitSelectEvent: () => {
      this._emitSelectEvent();
    },
  };

  @provide({context: configContext})
  private _configContext: ConfigContext = {
    hideArrows: this.hideArrows,
    expandMode: this.expandMode,
    indent: this.indent,
    indentGuides: this.indentGuides,
    multiSelect: this.multiSelect,
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

  private _highlightIndentGuideOfItem(item: VscodeTreeItem) {
    if (item.branch && item.open) {
      item.highlightedGuides = true;
      this._treeContextState.highlightedItems?.add(item);
    } else {
      const parent = findParentItem(item);

      if (parent) {
        parent.highlightedGuides = true;
        this._treeContextState.highlightedItems?.add(parent);
      }
    }
  }

  private _highlightIndentGuides() {
    if (this.indentGuides === IndentGuides.none) {
      return;
    }

    this._treeContextState.highlightedItems?.forEach(
      (i) => (i.highlightedGuides = false)
    );
    this._treeContextState.highlightedItems?.clear();

    if (this._treeContextState.activeItem) {
      this._highlightIndentGuideOfItem(this._treeContextState.activeItem);
    }

    this._treeContextState.selectedItems.forEach((item) => {
      this._highlightIndentGuideOfItem(item);
    });
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
      this._highlightIndentGuides();
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
      this._treeContextState.selectedItems.clear();
      this._highlightIndentGuides();

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
