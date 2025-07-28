import {PropertyValues, TemplateResult, html, nothing} from 'lit';
import {consume} from '@lit/context';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement';
import {stylePropertyMap} from '../includes/style-property-map';
import {
  ConfigContext,
  configContext,
  treeContext,
  type TreeContext,
} from '../vscode-tree/tree-context';
import {initPathTrackerProps} from '../vscode-tree/helpers.js';
import styles from './vscode-tree-item.styles.js';
import {ExpandMode, IndentGuides} from '../vscode-tree/vscode-tree.js';

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

function getParentItem(childItem: VscodeTreeItem) {
  if (!childItem.parentElement) {
    return null;
  }

  if (!(childItem.parentElement instanceof VscodeTreeItem)) {
    return null;
  }

  return childItem.parentElement;
}

@customElement('vscode-tree-item')
export class VscodeTreeItem extends VscElement {
  static override styles = styles;

  //#region properties

  @property({type: Boolean})
  active = false;

  @property({type: Boolean, reflect: true})
  branch = false;

  @property({type: Boolean})
  hasActiveItem = false;

  @property({type: Boolean})
  hasSelectedItem = false;

  /** @internal */
  @property({type: Boolean})
  highlightedGuides = false;

  @property({type: Boolean, reflect: true})
  open = false;

  @property({type: Number, reflect: true})
  level = 0;

  @property({type: Boolean, reflect: true})
  set selected(selected: boolean) {
    this._selected = selected;
    this._treeContextState.selectedItems.add(this);
    this.ariaSelected = selected ? 'true' : 'false';
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
  private _internals: ElementInternals;

  @state()
  private _hasBranchIcon = false;

  @state()
  private _hasBranchOpenedIcon = false;

  @state()
  private _hasLeafIcon = false;

  @consume({context: treeContext, subscribe: true})
  private _treeContextState: TreeContext = {
    isShiftPressed: false,
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

  @queryAssignedElements({selector: 'vscode-tree-item'})
  private _initiallyAssignedTreeItems!: VscodeTreeItem[];

  @queryAssignedElements({selector: 'vscode-tree-item', slot: 'children'})
  private _childrenTreeItems!: VscodeTreeItem[];

  //#endregion

  //#region lifecycle methods

  constructor() {
    super();

    this._internals = this.attachInternals();
    this.addEventListener('focus', this._handleComponentFocus);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._mainSlotChange();
    this.role = 'treeitem';
    this.ariaDisabled = 'false';
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('active')) {
      this._toggleActiveState();
    }

    if (changedProperties.has('open') || changedProperties.has('branch')) {
      this._setAriaExpanded();
    }
  }

  //#endregion

  //#region private methods

  private _setAriaExpanded() {
    if (!this.branch) {
      this.ariaExpanded = null;
    } else {
      this.ariaExpanded = this.open ? 'true' : 'false';
    }
  }

  private _setHasActiveItemFlagOnParent(
    childItem: VscodeTreeItem,
    value: boolean
  ) {
    const parent = getParentItem(childItem);

    if (parent) {
      parent.hasActiveItem = value;
    }
  }

  private _toggleActiveState() {
    if (this.active) {
      if (this._treeContextState.activeItem) {
        this._treeContextState.activeItem.active = false;
        this._setHasActiveItemFlagOnParent(
          this._treeContextState.activeItem,
          false
        );
      }

      this._treeContextState.activeItem = this;
      this._setHasActiveItemFlagOnParent(this, true);
      this.tabIndex = 0;
      this._internals.states.add('active');
    } else {
      if (this._treeContextState.activeItem === this) {
        this._treeContextState.activeItem = null;
        this._setHasActiveItemFlagOnParent(this, false);
      }

      this.tabIndex = -1;
      this._internals.states.delete('active');
    }
  }

  private _selectItem(isCtrlDown: boolean) {
    const {selectedItems} = this._treeContextState;
    const {multiSelect} = this._configContext;

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
    const prevFocused = this._treeContextState.prevFocusedItem;

    if (!prevFocused || prevFocused === this) {
      return;
    }

    if (!this._treeContextState.itemListUpToDate) {
      this._treeContextState.allItems =
        this._treeContextState.rootElement!.querySelectorAll(
          'vscode-tree-item'
        );

      if (this._treeContextState.allItems) {
        this._treeContextState.allItems.forEach((li, i) => {
          li.dataset.score = i.toString();
        });
      }

      this._treeContextState.itemListUpToDate = true;
    }

    let from = +(prevFocused.dataset.score ?? -1);
    let to = +(this.dataset.score ?? -1);

    if (from > to) {
      [from, to] = [to, from];
    }

    this._treeContextState.selectedItems.forEach((li) => (li.selected = false));
    this._treeContextState.selectedItems.clear();

    this._selectItemsAndAllVisibleDescendants(from, to);
  }

  private _selectItemsAndAllVisibleDescendants(from: number, to: number) {
    let i = from;

    while (i <= to) {
      if (this._treeContextState.allItems) {
        const item = this._treeContextState.allItems[i];

        if (item.branch && !item.open) {
          item.selected = true;
          const numChildren = item.querySelectorAll('vscode-tree-item').length;
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
    this._initiallyAssignedTreeItems.forEach((li) => {
      li.setAttribute('slot', 'children');
    });
  }

  //#endregion

  //#region event handlers

  private _handleChildrenSlotChange() {
    initPathTrackerProps(this, this._childrenTreeItems);

    if (this._treeContextState.rootElement) {
      this._treeContextState.rootElement.updateHasBranchItemFlag();
    }
  }

  private _handleMainSlotChange = () => {
    this._mainSlotChange();
    this._treeContextState.itemListUpToDate = false;
  };

  private _handleComponentFocus = () => {
    if (
      this._treeContextState.focusedItem &&
      this._treeContextState.focusedItem !== this
    ) {
      if (!this._treeContextState.isShiftPressed) {
        this._treeContextState.prevFocusedItem =
          this._treeContextState.focusedItem;
      }

      this._treeContextState.focusedItem = null;
    }

    this._treeContextState.focusedItem = this;
  };

  private _handleContentClick(ev: MouseEvent) {
    ev.stopPropagation();

    const isCtrlDown = ev.ctrlKey;
    const isShiftDown = ev.shiftKey;

    if (isShiftDown && this._configContext.multiSelect) {
      this._selectRange();
      this._treeContextState.emitSelectEvent?.();

      this.updateComplete.then(() => {
        this._treeContextState.highlightIndentGuides?.();
      });
    } else {
      this._selectItem(isCtrlDown);
      this._treeContextState.emitSelectEvent?.();
      this.updateComplete.then(() => {
        this._treeContextState.highlightIndentGuides?.();
      });

      if (this._configContext.expandMode === ExpandMode.singleClick) {
        if (this.branch && !(this._configContext.multiSelect && isCtrlDown)) {
          this.open = !this.open;
        }
      }
    }

    this.active = true;

    if (!isShiftDown) {
      this._treeContextState.prevFocusedItem = this;
    }
  }

  private _handleDoubleClick(ev: MouseEvent) {
    if (this._configContext.expandMode === ExpandMode.doubleClick) {
      if (this.branch && !(this._configContext.multiSelect && ev.ctrlKey)) {
        this.open = !this.open;
      }
    }
  }

  private _handleIconSlotChange(ev: Event) {
    const slot = ev.target as HTMLSlotElement;
    const hasContent = slot.assignedElements().length > 0;

    switch (slot.name) {
      case 'icon-branch':
        this._hasBranchIcon = hasContent;
        break;
      case 'icon-branch-opened':
        this._hasBranchOpenedIcon = hasContent;
        break;
      case 'icon-leaf':
        this._hasLeafIcon = hasContent;
        break;
      default:
    }
  }

  //#endregion

  override render(): TemplateResult {
    const {hideArrows, indent, indentGuides} = this._configContext;
    const {hasBranchItem} = this._treeContextState;
    let indentation = BASE_INDENT + this.level * indent;
    const guideOffset = !hideArrows ? 13 : 3;
    const indentGuideX = BASE_INDENT + this.level * indent + guideOffset;

    if (!this.branch && !hideArrows && hasBranchItem) {
      indentation += ARROW_CONTAINER_WIDTH;
    }

    const hasVisibleIcon =
      (this._hasBranchIcon && this.branch) ||
      (this._hasBranchOpenedIcon && this.branch && this.open) ||
      (this._hasLeafIcon && !this.branch);

    const wrapperClasses = {
      wrapper: true,
      active: this.active,
    };

    const childrenClasses = {
      children: true,
      guide: indentGuides !== IndentGuides.none,
      'default-guide': indentGuides !== IndentGuides.none,
      'highlighted-guide': this.highlightedGuides,
    };

    const iconContainerClasses = {
      'icon-container': true,
      'has-icon': hasVisibleIcon,
    };

    return html` <div class="root">
      <div
        class=${classMap(wrapperClasses)}
        @click=${this._handleContentClick}
        @dblclick=${this._handleDoubleClick}
        .style=${stylePropertyMap({paddingLeft: `${indentation}px`})}
      >
        ${this.branch && !hideArrows
          ? html`<div
              class=${classMap({
                'arrow-container': true,
                'icon-rotated': this.open,
              })}
            >
              ${arrowIcon}
            </div>`
          : nothing}
        <div class=${classMap(iconContainerClasses)}>
          ${this.branch && !this.open
            ? html`<slot
                name="icon-branch"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`
            : nothing}
          ${this.branch && this.open
            ? html`<slot
                name="icon-branch-opened"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`
            : nothing}
          ${!this.branch
            ? html`<slot
                name="icon-leaf"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`
            : nothing}
        </div>
        <div class="content" part="content">
          <slot @slotchange=${this._handleMainSlotChange}></slot>
        </div>
      </div>
      <div
        class=${classMap(childrenClasses)}
        .style=${stylePropertyMap({
          '--indentation-guide-left': `${indentGuideX}px`,
        })}
        role="group"
        part="children"
      >
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
    'vscode-tree-item': VscodeTreeItem;
  }
}
