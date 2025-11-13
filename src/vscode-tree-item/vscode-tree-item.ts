import {PropertyValues, TemplateResult, html, nothing} from 'lit';
import {consume} from '@lit/context';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import {stylePropertyMap} from '../includes/style-property-map.js';
import {
  ConfigContext,
  configContext,
  treeContext,
  type TreeContext,
} from '../vscode-tree/tree-context.js';
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
    if (selected) {
      this._treeContextState.selectedItems.add(this);
    } else {
      this._treeContextState.selectedItems.delete(this);
    }
    this.ariaSelected = selected ? 'true' : 'false';
    this._updateActionsVisibility();
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

  @state()
  private _hasDescriptionSlotContent = false;

  @state()
  private _hasActionsSlotContent = false;

  @state()
  private _hasDecorationSlotContent = false;

  @consume({context: treeContext, subscribe: true})
  private _treeContextState: TreeContext = {
    isShiftPressed: false,
    selectedItems: new Set(),
    hoveredItem: null,
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

  @queryAssignedElements({slot: 'description', flatten: true})
  private _descriptionSlotElements!: Element[];

  @queryAssignedElements({slot: 'actions', flatten: true})
  private _actionsSlotElements!: Element[];

  @queryAssignedElements({slot: 'decoration', flatten: true})
  private _decorationSlotElements!: Element[];

  //#endregion

  //#region derived state

  private _isPointerInside = false;
  private _hasKeyboardFocus = false;

  //#endregion

  //#region lifecycle methods

  constructor() {
    super();

    this._internals = this.attachInternals();
    this.addEventListener('focus', this._handleComponentFocus);
    this.addEventListener('pointerenter', this._handlePointerEnter);
    this.addEventListener('pointerleave', this._handlePointerLeave);
    this.addEventListener('focusin', this._handleFocusIn);
    this.addEventListener('focusout', this._handleFocusOut);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._mainSlotChange();
    this.role = 'treeitem';
    this.ariaDisabled = 'false';
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this._refreshDescriptionSlotState();
    this._refreshActionsSlotState();
    this._refreshDecorationSlotState();
    if (this.matches(':hover')) {
      this._isPointerInside = true;
      this._claimHover();
    } else {
      this._updateActionsVisibility();
    }
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

  private _refreshDescriptionSlotState() {
    const hasContent = (this._descriptionSlotElements?.length ?? 0) > 0;

    this._hasDescriptionSlotContent = hasContent;
    this._setCustomState('has-description', hasContent);
  }

  private _refreshActionsSlotState() {
    const hasContent = (this._actionsSlotElements?.length ?? 0) > 0;

    this._hasActionsSlotContent = hasContent;
    this._setCustomState('has-actions', hasContent);
    this._updateActionsVisibility();
  }

  private _refreshDecorationSlotState() {
    const hasContent = (this._decorationSlotElements?.length ?? 0) > 0;

    const prevHasDecoration = this._hasDecorationSlotContent;
    this._hasDecorationSlotContent = hasContent;
    this._setCustomState('has-decoration', hasContent);
    if (prevHasDecoration !== hasContent) {
      this.requestUpdate();
    }
  }

  private _setCustomState(stateName: string, present: boolean) {
    if (!this._internals?.states) {
      return;
    }

    try {
      if (present) {
        this._internals.states.add(stateName);
      } else {
        this._internals.states.delete(stateName);
      }
    } catch {
      // https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet#compatibility_with_dashed-ident_syntax
      if (present) {
        this._internals.states.add(`--${stateName}`);
      } else {
        this._internals.states.delete(`--${stateName}`);
      }
    }
  }

  private _getActiveElement(): Element | null {
    const root = this.getRootNode({composed: true});

    if (root instanceof Document) {
      return root.activeElement instanceof Element ? root.activeElement : null;
    }

    if (root instanceof ShadowRoot) {
      return root.activeElement instanceof Element ? root.activeElement : null;
    }

    return null;
  }

  private _isActiveElementInActions(activeElement: Element | null): boolean {
    if (!activeElement) {
      return false;
    }

    return (this._actionsSlotElements ?? []).some(
      (element) => element === activeElement || element.contains(activeElement)
    );
  }

  private _updateActionsVisibility() {
    if (!this._hasActionsSlotContent) {
      this._setCustomState('show-actions', false);
      return;
    }

    const activeElement = this._getActiveElement();
    const isActionsFocused = this._isActiveElementInActions(activeElement);

    const shouldShow =
      this.selected ||
      this._isPointerInside ||
      this._hasKeyboardFocus ||
      isActionsFocused;

    this._setCustomState('show-actions', shouldShow);
  }

  private _updateFocusState() {
    const hostFocusVisible = this.matches(':focus-visible');
    this._setCustomState('focus-visible', hostFocusVisible);

    const activeElement = this._getActiveElement();
    let owner: VscodeTreeItem | null = null;
    if (activeElement instanceof Element) {
      owner = activeElement.closest('vscode-tree-item');

      if (!owner) {
        const root = activeElement.getRootNode();
        if (root instanceof ShadowRoot && root.host instanceof VscodeTreeItem) {
          owner = root.host;
        }
      }
    }

    const hasKeyboardFocus = owner === this;

    this._hasKeyboardFocus = hasKeyboardFocus;
    this._setCustomState('keyboard-focus', hasKeyboardFocus);
    this._updateActionsVisibility();
  }

  private _clearHoverState() {
    this._isPointerInside = false;
    this._setCustomState('hover', false);
    this._updateActionsVisibility();
  }

  private _adoptHoverFromSibling() {
    this._isPointerInside = true;
    this._claimHover();
  }

  private _claimHover() {
    const treeState = this._treeContextState;
    if (treeState.hoveredItem && treeState.hoveredItem !== this) {
      treeState.hoveredItem._clearHoverState();
    }

    treeState.hoveredItem = this;
    this._setCustomState('hover', true);
    this._updateActionsVisibility();
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
      this._setCustomState('active', true);
    } else {
      if (this._treeContextState.activeItem === this) {
        this._treeContextState.activeItem = null;
        this._setHasActiveItemFlagOnParent(this, false);
      }

      this.tabIndex = -1;
      this._setCustomState('active', false);
    }
  }

  private _selectItem(isCtrlDown: boolean) {
    const {selectedItems} = this._treeContextState;
    const {multiSelect} = this._configContext;
    const prevSelected = new Set(selectedItems);

    if (multiSelect && isCtrlDown) {
      this.selected = !this.selected;
    } else {
      Array.from(selectedItems).forEach((li) => {
        if (li !== this) {
          li.selected = false;
        }
      });
      selectedItems.clear();
      this.selected = true;
    }

    const affected = new Set<VscodeTreeItem>([
      ...prevSelected,
      ...selectedItems,
    ]);
    affected.add(this);
    affected.forEach((li) => li._updateActionsVisibility());
  }

  private _selectRange() {
    const prevFocused = this._treeContextState.prevFocusedItem;

    if (!prevFocused || prevFocused === this) {
      return;
    }

    const prevSelected = new Set(this._treeContextState.selectedItems);

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

    Array.from(this._treeContextState.selectedItems).forEach(
      (li) => (li.selected = false)
    );
    this._treeContextState.selectedItems.clear();

    this._selectItemsAndAllVisibleDescendants(from, to);

    const affected = new Set<VscodeTreeItem>([
      ...prevSelected,
      ...this._treeContextState.selectedItems,
    ]);
    affected.add(this);
    affected.forEach((li) => li._updateActionsVisibility());
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

  private _handleDescriptionSlotChange() {
    this._refreshDescriptionSlotState();
  }

  private _handleActionsSlotChange() {
    this._refreshActionsSlotState();
  }

  private _handleDecorationSlotChange() {
    this._refreshDecorationSlotState();
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

  private _handlePointerEnter = () => {
    this._isPointerInside = true;
    this._claimHover();
  };

  private _handlePointerLeave = (ev: PointerEvent) => {
    this._isPointerInside = false;
    if (this._treeContextState.hoveredItem === this) {
      this._treeContextState.hoveredItem = null;
    }
    this._clearHoverState();

    const relatedTarget = ev.relatedTarget;
    if (relatedTarget instanceof Element) {
      const nextItem =
        relatedTarget.closest<VscodeTreeItem>('vscode-tree-item');
      if (nextItem && nextItem !== this && nextItem.isConnected) {
        nextItem._adoptHoverFromSibling();
      }
    }
  };

  private _handleFocusIn = () => {
    this._updateFocusState();
  };

  private _handleFocusOut = () => {
    this._updateFocusState();
  };

  private _handleContentClick(ev: MouseEvent) {
    ev.stopPropagation();

    const isCtrlDown = ev.ctrlKey || ev.metaKey;
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
      if (
        this.branch &&
        !(this._configContext.multiSelect && (ev.ctrlKey || ev.metaKey))
      ) {
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
      'has-description': this._hasDescriptionSlotContent,
      'has-actions': this._hasActionsSlotContent,
      'has-decoration': this._hasDecorationSlotContent,
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

    const contentClasses = {
      content: true,
      'has-description': this._hasDescriptionSlotContent,
      'has-decoration': this._hasDecorationSlotContent,
    };

    return html` <div class="root">
      <div
        class=${classMap(wrapperClasses)}
        part="wrapper"
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
              part="head expando"
            >
              ${arrowIcon}
            </div>`
          : nothing}
        <div class=${classMap(iconContainerClasses)} part="head icon">
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
        <div class=${classMap(contentClasses)} part="content">
          <span class="label" part="label">
            <slot @slotchange=${this._handleMainSlotChange}></slot>
          </span>
          <span
            class="description"
            part="description"
            ?hidden=${!this._hasDescriptionSlotContent}
          >
            <slot
              name="description"
              @slotchange=${this._handleDescriptionSlotChange}
            ></slot>
          </span>
          <div class="actions" part="actions">
            <slot
              name="actions"
              @slotchange=${this._handleActionsSlotChange}
            ></slot>
          </div>
          <div class="decoration" part="decoration">
            <slot
              name="decoration"
              @slotchange=${this._handleDecorationSlotChange}
            ></slot>
          </div>
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
