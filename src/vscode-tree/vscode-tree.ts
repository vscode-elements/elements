import {html, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from '../includes/VscElement.js';
import {stylePropertyMap} from '../includes/style-property-map.js';
import '../vscode-badge/index.js';
import '../vscode-icon/index.js';
import {VscodeIcon} from '../vscode-icon/index.js';
import styles from './vscode-tree.styles.js';

export type VscTreeActionEvent = CustomEvent<{
  actionId: string;
  item: TreeItem | null;
  value: string;
}>;

export type VscTreeSelectEvent = CustomEvent<{
  icons: {
    branch?: string;
    open?: string;
    leaf?: string;
  };
  itemType: 'branch' | 'leaf';
  label: string;
  open: boolean;
  value: string;
  path: string;
}>;

type ListenedKey = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape' | ' ';

type IconType = 'themeicon' | 'image';

type IconVariant = 'branch' | 'leaf' | 'open';

export interface TreeItemIconConfig {
  branch?: string;
  open?: string;
  leaf?: string;
}

/** Action icon configuration. */
export interface TreeItemAction {
  /** A unique name that identifies the clicked action item. */
  actionId: string;
  /** A Codicon name. */
  icon: string;
  /** Text description of the action. */
  tooltip?: string;
}

/**
 * The decoration is additional content on the right side of the tree item. It can be a short text,
 * a counter, or a small, filled circle. A color can be defined for the different states. If
 * multiple states are applied to the item, the color with higher precedence will be used. The color
 * precedence from higher to lower is selected, focused, hover, normal. Colors will not be applied
 * to the counter badge.
 */
export interface TreeItemDecoration {
  /** Text content of the decoration. If the appearance is `filled-circle`, it will be ignored. */
  content?: string;
  /** Appearance of the decoration. */
  appearance?: 'text' | 'counter-badge' | 'filled-circle';
  /**
   * When is decoration visible?
   * - `active`: visible when the tree item is focused, selected or hovered
   * - `normal`: visible when there is not any interaction on the tree item
   * - `always`: always visible
   */
  visibleWhen?: 'active' | 'normal' | 'always';
  /** A valid CSS property value to define a default color. */
  color?: string;
  /** A valid CSS property value to define the color for the mouse over state. */
  hoverColor?: string;
  /** A valid CSS property value to define the color for the focused state. */
  focusedColor?: string;
  /** A valid CSS property value to define the color for the selected state. */
  selectedColor?: string;
}

export interface TreeItem {
  label: string;
  description?: string;
  tooltip?: string;
  subItems?: TreeItem[];
  actions?: TreeItemAction[];
  open?: boolean;
  selected?: boolean;
  focused?: boolean;
  hasSelectedItem?: boolean;
  hasFocusedItem?: boolean;
  icons?: TreeItemIconConfig | boolean;
  iconUrls?: TreeItemIconConfig;
  value?: string;
  path?: number[];
  decorations?: TreeItemDecoration[];
}

type ItemType = 'branch' | 'leaf';

/** Event payload of the `vsc-select` event. */
interface SelectEventDetail {
  /** Icon configuration of the clicked item */
  icons: TreeItemIconConfig | undefined | boolean;
  /** Is item type branch or leaf. */
  itemType: ItemType;
  /** The visible label of the item. */
  label: string;
  /** The value associated to the item. */
  value: string;
  /** Is the item opened if it's a branch. */
  open: boolean;
  /** Path represents the item place in the tree. For example 1/2/3 means:
   * `data[1].subItems[2].subItems[3]` */
  path: string; // ex.: 0/0/1
}

const ARROW_OUTER_WIDTH = 30;
const ARROW_ICON_WIDTH = 16;
const CONTENT_PADDING = 3;

const addPath = (tree: TreeItem[], prevPath: number[] = []): TreeItem[] => {
  const nextTree: TreeItem[] = [];

  tree.forEach((item, index) => {
    const path = [...prevPath, index];
    const nextItem: TreeItem = {
      ...item,
      path,
    };

    if (item.subItems) {
      nextItem.subItems = addPath(item.subItems, path);
    }

    nextTree.push(nextItem);
  });

  return nextTree;
};

const isBranch = (item: TreeItem) => {
  if (
    item.subItems &&
    Array.isArray(item.subItems) &&
    item?.subItems?.length > 0
  ) {
    return true;
  }

  return false;
};

/**
 * @tag vscode-tree
 *
 * @fires vsc-select Dispatched when an item is selected.
 * @fires {VscTreeSelectEvent} vsc-tree-select Dispatched when an item is selected.
 * @fires vsc-run-action Dispatched when an action icon is clicked.
 * @fires {VscTreeActionEvent} vsc-tree-action Dispatched when an action icon is clicked.
 *
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-list-hoverForeground
 * @cssprop --vscode-list-hoverBackground
 * @cssprop --vscode-list-inactiveSelectionBackground
 * @cssprop --vscode-list-inactiveSelectionForeground
 * @cssprop --vscode-list-activeSelectionBackground
 * @cssprop --vscode-list-activeSelectionForeground
 * @cssprop --vscode-list-inactiveSelectionIconForeground
 * @cssprop --vscode-list-inactiveFocusBackground
 * @cssprop --vscode-list-inactiveFocusOutline
 * @cssprop --vscode-list-focusOutline
 * @cssprop --vscode-tree-inactiveIndentGuidesStroke
 * @cssprop --vscode-tree-indentGuidesStroke
 *
 * @csspart text-content
 * @csspart description
 * @csspart counter-badge-decoration
 * @csspart filled-circle-decoration
 * @csspart caption-decoration
 * @csspart decorations Container of decorations
 */
@customElement('vscode-tree')
export class VscodeTree extends VscElement {
  static override styles = styles;

  @property({type: Array, reflect: false})
  set data(val: TreeItem[]) {
    const oldVal = this._data;

    this._data = addPath(val);
    this.requestUpdate('data', oldVal);
  }
  get data(): TreeItem[] {
    return this._data;
  }

  @property({type: Number})
  indent = 8;

  @property({type: Boolean, reflect: true})
  arrows = false;

  @property({type: Boolean, reflect: true})
  multiline = false;

  @property({type: Number, reflect: true})
  tabindex = 0;

  @property({type: Boolean, reflect: true, attribute: 'indent-guides'})
  indentGuides = false;

  private _data: TreeItem[] = [];

  @state()
  private _selectedItem: TreeItem | null = null;

  @state()
  private _focusedItem: TreeItem | null = null;

  @state()
  private _selectedBranch: TreeItem | null = null;

  @state()
  private _focusedBranch: TreeItem | null = null;

  /**
   * Closes all opened tree items recursively.
   */
  public closeAll(): void {
    this._closeSubTreeRecursively(this.data);
    this.requestUpdate();
  }

  /**
   * Deselects all selected items.
   */
  public deselectAll() {
    this._deselectItemsRecursively(this.data);
    this.requestUpdate();
  }

  /**
   * Returns a reference to a TreeItem object by path.
   * @param path
   * @returns
   */
  public getItemByPath(path: number[]): TreeItem | null {
    return this._getItemByPath(path);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleComponentKeyDownBound);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleComponentKeyDownBound);
  }

  private _getItemByPath(path: number[]): TreeItem | null {
    let current: TreeItem[] = this._data;
    let item: TreeItem | null = null;

    path.forEach((el, i) => {
      if (i === path.length - 1) {
        item = current[el];
      } else {
        current = current[el].subItems as TreeItem[];
      }
    });

    return item;
  }

  private _handleActionClick(ev: MouseEvent) {
    ev.stopPropagation();

    const el = ev.target as VscodeIcon;
    const itemPath = el.dataset.itemPath;
    const actionIndex = el.dataset.index;
    let item: TreeItem | null = null;
    let actionId = '';
    let value = '';

    if (itemPath) {
      const path = itemPath.split('/').map((p) => Number(p));
      item = this._getItemByPath(path);

      if (item?.actions) {
        const index = Number(actionIndex);

        if (item.actions[index]) {
          actionId = item.actions[index].actionId;
        }
      }

      if (item?.value) {
        value = item.value;
      }
    }

    /** @deprecated Renamed to `vsc-tree-action` */
    this.dispatchEvent(
      new CustomEvent<{actionId: string; item: TreeItem | null; value: string}>(
        'vsc-run-action',
        {
          detail: {
            actionId,
            item,
            value,
          },
        }
      )
    );

    /**
     * Dispatched when an action icon is clicked.
     */
    this.dispatchEvent(
      new CustomEvent<{actionId: string; item: TreeItem | null; value: string}>(
        'vsc-tree-action',
        {
          detail: {
            actionId,
            item,
            value,
          },
        }
      ) as VscTreeActionEvent
    );
  }

  private _renderIconVariant(variant: {value: string; type: IconType}) {
    const {type, value} = variant;

    if (type === 'themeicon') {
      return html`<vscode-icon name=${value} class="theme-icon"></vscode-icon>`;
    } else {
      return html`<span
        class="image-icon"
        .style=${stylePropertyMap({backgroundImage: `url(${value})`})}
      ></span>`;
    }
  }

  private _renderIcon(item: TreeItem): TemplateResult {
    const iconVariants: Record<IconVariant, {value: string; type: IconType}> = {
      branch: {
        value: 'folder',
        type: 'themeicon',
      },
      open: {
        value: 'folder-opened',
        type: 'themeicon',
      },
      leaf: {
        value: 'file',
        type: 'themeicon',
      },
    };

    if (item.iconUrls) {
      if (item.iconUrls.branch) {
        iconVariants.branch = {
          value: item.iconUrls.branch,
          type: 'image',
        };
      }

      if (item.iconUrls.leaf) {
        iconVariants.leaf = {
          value: item.iconUrls.leaf,
          type: 'image',
        };
      }

      if (item.iconUrls.open) {
        iconVariants.open = {
          value: item.iconUrls.open,
          type: 'image',
        };
      }
    } else if (typeof item.icons === 'object') {
      if (item.icons.branch) {
        iconVariants.branch = {
          value: item.icons.branch,
          type: 'themeicon',
        };
      }

      if (item.icons.leaf) {
        iconVariants.leaf = {
          value: item.icons.leaf,
          type: 'themeicon',
        };
      }

      if (item.icons.open) {
        iconVariants.open = {
          value: item.icons.open,
          type: 'themeicon',
        };
      }
    } else if (!item.icons) {
      return html`${nothing}`;
    }

    if (isBranch(item)) {
      if (item.open) {
        return this._renderIconVariant(iconVariants.open);
      } else {
        return this._renderIconVariant(iconVariants.branch);
      }
    } else {
      return this._renderIconVariant(iconVariants.leaf);
    }
  }

  private _renderArrow(item: TreeItem): TemplateResult {
    if (!this.arrows || !isBranch(item)) {
      return html`${nothing}`;
    }

    const {open = false} = item;
    const arrowIconName = open ? 'chevron-down' : 'chevron-right';

    return html`
      <div class="arrow-container">
        <vscode-icon name=${arrowIconName} class="icon-arrow"></vscode-icon>
      </div>
    `;
  }

  private _renderActions(item: TreeItem): TemplateResult {
    const actionButtons: TemplateResult[] = [];

    if (item.actions && Array.isArray(item.actions)) {
      item.actions.forEach((action, index) => {
        if (action.icon) {
          const icon = html`<vscode-icon
            name=${action.icon}
            action-icon
            title=${ifDefined(action.tooltip)}
            data-item-path=${ifDefined(item.path?.join('/'))}
            data-index=${index}
            class="action-icon"
            @click=${this._handleActionClick}
          ></vscode-icon>`;

          actionButtons.push(icon);
        }
      });
    }

    if (actionButtons.length > 0) {
      return html`<div class="actions">${actionButtons}</div>`;
    } else {
      return html`${nothing}`;
    }
  }

  private _renderDecorations(item: TreeItem) {
    const decorations: TemplateResult[] = [];

    if (item.decorations && Array.isArray(item.decorations)) {
      item.decorations.forEach((decoration) => {
        const {
          appearance = 'text',
          visibleWhen = 'always',
          content = '',
          color = '',
          focusedColor = '',
          hoverColor = '',
          selectedColor = '',
        } = decoration;
        const visibleWhenClass = `visible-when-${visibleWhen}`;
        const inlineStyles: {[key: string]: string} = {};

        if (color) {
          inlineStyles['--color'] = color;
        }

        if (focusedColor) {
          inlineStyles['--focused-color'] = focusedColor;
        }

        if (hoverColor) {
          inlineStyles['--hover-color'] = hoverColor;
        }

        if (selectedColor) {
          inlineStyles['--selected-color'] = selectedColor;
        }

        switch (appearance) {
          case 'counter-badge':
            decorations.push(
              html`<vscode-badge
                variant="counter"
                class=${['counter-badge', visibleWhenClass].join(' ')}
                part="counter-badge-decoration"
                >${content}</vscode-badge
              >`
            );
            break;
          case 'filled-circle':
            decorations.push(
              html`<vscode-icon
                name="circle-filled"
                size="14"
                class=${['filled-circle', visibleWhenClass].join(' ')}
                part="filled-circle-decoration"
                .style=${stylePropertyMap(inlineStyles)}
              ></vscode-icon>`
            );
            break;
          case 'text':
            decorations.push(
              html`<div
                class=${['decoration-text', visibleWhenClass].join(' ')}
                part="caption-decoration"
                .style=${stylePropertyMap(inlineStyles)}
              >
                ${content}
              </div>`
            );
            break;
          default:
        }
      });
    }

    if (decorations.length > 0) {
      return html`<div class="decorations" part="decorations">
        ${decorations}
      </div>`;
    } else {
      return html`${nothing}`;
    }
  }

  private _renderTreeItem(
    item: TreeItem,
    additionalOptions: {
      path: number[];
      itemType: ItemType;
      hasFocusedItem: boolean;
      hasSelectedItem: boolean;
    }
  ) {
    const {
      open = false,
      label,
      description = '',
      tooltip,
      selected = false,
      focused = false,
      subItems = [],
    } = item;
    const {
      path,
      itemType,
      hasFocusedItem = false,
      hasSelectedItem = false,
    } = additionalOptions;
    const indentLevel = path.length - 1;
    const contentsClasses = ['contents'];
    const liClasses = open ? ['open'] : [];
    const indentSize = indentLevel * this.indent;
    const padLeft =
      this.arrows && itemType === 'leaf'
        ? ARROW_OUTER_WIDTH + indentSize
        : indentSize;
    const arrowMarkup = this._renderArrow(item);
    const iconMarkup = this._renderIcon(item);
    const indentGuidePos = this.arrows
      ? indentSize + ARROW_ICON_WIDTH
      : indentSize + CONTENT_PADDING;
    const subTreeMarkup =
      open && itemType === 'branch'
        ? html`<ul
            .style=${stylePropertyMap({
              '--indent-guide-pos': `${indentGuidePos}px`,
            })}
            class=${classMap({
              'has-active-item': hasFocusedItem || hasSelectedItem,
            })}
          >
            ${this._renderTree(subItems, path)}
          </ul>`
        : nothing;
    const descriptionMarkup = description
      ? html`<span class="description" part="description">${description}</span>`
      : nothing;
    const actionsMarkup = this._renderActions(item);
    const decorationsMarkup = this._renderDecorations(item);

    liClasses.push(itemType);

    if (selected) {
      contentsClasses.push('selected');
    }

    if (focused) {
      contentsClasses.push('focused');
    }

    return html`
      <li data-path=${path.join('/')} class=${liClasses.join(' ')}>
        <div
          class=${contentsClasses.join(' ')}
          .style=${stylePropertyMap({
            paddingLeft: `${padLeft + CONTENT_PADDING}px`,
          })}
        >
          ${arrowMarkup}${iconMarkup}<span
            class="text-content"
            part="text-content"
            title=${ifDefined(tooltip)}
            >${label}${descriptionMarkup}</span
          >
          ${actionsMarkup} ${decorationsMarkup}
        </div>
        ${subTreeMarkup}
      </li>
    `;
  }

  private _renderTree(tree: TreeItem[], oldPath: number[] = []) {
    const ret: TemplateResult[] = [];

    if (!tree) {
      return nothing;
    }

    tree.forEach((item, index) => {
      const path = [...oldPath, index];
      const itemType = isBranch(item) ? 'branch' : 'leaf';
      const {
        selected = false,
        focused = false,
        hasFocusedItem = false,
        hasSelectedItem = false,
      } = item;

      if (selected) {
        this._selectedItem = item;
      }

      if (focused) {
        this._focusedItem = item;
      }

      ret.push(
        this._renderTreeItem(item, {
          path,
          itemType,
          hasFocusedItem,
          hasSelectedItem,
        })
      );
    });

    return ret;
  }

  private _selectItem(item: TreeItem) {
    if (this._selectedItem) {
      this._selectedItem.selected = false;
    }

    if (this._focusedItem) {
      this._focusedItem.focused = false;
    }

    this._selectedItem = item;
    item.selected = true;
    this._focusedItem = item;
    item.focused = true;

    if (this._selectedBranch) {
      this._selectedBranch.hasSelectedItem = false;
    }

    let parentBranch: TreeItem | null = null;

    if (item.path?.length && item.path.length > 1) {
      parentBranch = this._getItemByPath(item.path.slice(0, -1));
    }

    if (isBranch(item)) {
      this._selectedBranch = item;
      item.hasSelectedItem = true;
      item.open = !item.open;

      if (!item.open) {
        if (parentBranch) {
          this._selectedBranch = parentBranch;
          parentBranch.hasSelectedItem = true;
        }
      } else {
        this._selectedBranch = item;
        item.hasSelectedItem = true;
      }
    } else {
      if (item.path?.length && item.path.length > 1) {
        const parentBranch = this._getItemByPath(item.path.slice(0, -1));

        if (parentBranch) {
          this._selectedBranch = parentBranch;
          parentBranch.hasSelectedItem = true;
        }
      } else {
        this._selectedBranch = item;
        item.hasSelectedItem = true;
      }
    }

    this._emitSelectEvent(
      this._selectedItem as TreeItem,
      this._selectedItem.path!.join('/')
    );

    this.requestUpdate();
  }

  private _focusItem(item: TreeItem) {
    if (this._focusedItem) {
      this._focusedItem.focused = false;
    }

    this._focusedItem = item;
    item.focused = true;

    const isBranch = !!item?.subItems?.length;

    if (this._focusedBranch) {
      this._focusedBranch.hasFocusedItem = false;
    }

    let parentBranch: TreeItem | null = null;

    if (item.path?.length && item.path.length > 1) {
      parentBranch = this._getItemByPath(item.path.slice(0, -1));
    }

    if (!isBranch) {
      if (parentBranch) {
        this._focusedBranch = parentBranch;
        parentBranch.hasFocusedItem = true;
      }
    } else {
      if (item.open) {
        this._focusedBranch = item;
        item.hasFocusedItem = true;
      } else if (!item.open && parentBranch) {
        this._focusedBranch = parentBranch;
        parentBranch.hasFocusedItem = true;
      }
    }
  }

  private _closeSubTreeRecursively(tree: TreeItem[]) {
    tree.forEach((item) => {
      item.open = false;

      if (item.subItems && item.subItems.length > 0) {
        this._closeSubTreeRecursively(item.subItems);
      }
    });
  }

  private _deselectItemsRecursively(tree: TreeItem[]) {
    tree.forEach((item) => {
      if (item.selected) {
        item.selected = false;
      }

      if (item.subItems && item.subItems.length > 0) {
        this._deselectItemsRecursively(item.subItems);
      }
    });
  }

  private _emitSelectEvent(item: TreeItem, path: string) {
    const {icons, label, open, value} = item;
    const detail = {
      icons,
      itemType: isBranch(item) ? 'branch' : ('leaf' as ItemType),
      label,
      open: open || false,
      value: value || label,
      path,
    };

    /** @deprecated Renamed to `vsc-tree-select` */
    this.dispatchEvent(
      new CustomEvent<SelectEventDetail>('vsc-select', {
        bubbles: true,
        composed: true,
        detail,
      })
    );

    this.dispatchEvent(
      new CustomEvent('vsc-tree-select', {
        detail,
      }) as VscTreeSelectEvent
    );
  }

  private _focusPrevItem() {
    if (!this._focusedItem) {
      this._focusItem(this._data[0]);
      return;
    }

    const {path} = this._focusedItem;

    if (path && path?.length > 0) {
      const currentItemIndex = path[path.length - 1];
      const hasParent = path!.length > 1;

      if (currentItemIndex > 0) {
        const newPath = [...path];
        newPath[newPath.length - 1] = currentItemIndex - 1;

        const prevSibling = this._getItemByPath(newPath) as TreeItem;
        let newFocusedItem = prevSibling;

        if (prevSibling?.open && prevSibling.subItems?.length) {
          const {subItems} = prevSibling;
          newFocusedItem = subItems[subItems.length - 1];
        }

        this._focusItem(newFocusedItem);
      } else {
        if (hasParent) {
          const newPath = [...path];
          newPath.pop();

          this._focusItem(this._getItemByPath(newPath) as TreeItem);
        }
      }
    } else {
      this._focusItem(this._data[0]);
    }
  }

  private _focusNextItem() {
    if (!this._focusedItem) {
      this._focusItem(this._data[0]);
      return;
    }

    const {path, open} = this._focusedItem;

    if (
      open &&
      Array.isArray(this._focusedItem.subItems) &&
      this._focusedItem.subItems.length > 0
    ) {
      this._focusItem(this._focusedItem.subItems[0]);
      return;
    }

    const nextPath = [...(path as number[])];
    nextPath[nextPath.length - 1] += 1;

    let nextFocusedItem = this._getItemByPath(nextPath);

    if (nextFocusedItem) {
      this._focusItem(nextFocusedItem);
    } else {
      nextPath.pop();

      if (nextPath.length > 0) {
        nextPath[nextPath.length - 1] += 1;
        nextFocusedItem = this._getItemByPath(nextPath);

        if (nextFocusedItem) {
          this._focusItem(nextFocusedItem);
        }
      }
    }
  }

  private _handleClick(event: MouseEvent) {
    const composedPath = event.composedPath();
    const targetElement = composedPath.find(
      (el: EventTarget) =>
        (el as HTMLElement).tagName &&
        (el as HTMLElement).tagName.toUpperCase() === 'LI'
    );

    if (targetElement) {
      const pathStr = (targetElement as HTMLLIElement).dataset.path || '';
      const path = pathStr.split('/').map((el) => Number(el));
      const item = this._getItemByPath(path) as TreeItem;

      this._selectItem(item);
    } else {
      if (this._focusedItem) {
        this._focusedItem.focused = false;
      }

      this._focusedItem = null;
    }
  }

  private _handleComponentKeyDown(ev: KeyboardEvent) {
    const keys: ListenedKey[] = [
      ' ',
      'ArrowDown',
      'ArrowUp',
      'Enter',
      'Escape',
    ];
    const key = ev.key as ListenedKey;

    if (keys.includes(ev.key as ListenedKey)) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    if (key === 'Escape') {
      this._focusedItem = null;
    }

    if (key === 'ArrowUp') {
      this._focusPrevItem();
    }

    if (key === 'ArrowDown') {
      this._focusNextItem();
    }

    if (key === 'Enter' || key === ' ') {
      if (this._focusedItem) {
        this._selectItem(this._focusedItem);
      }
    }
  }

  private _handleComponentKeyDownBound =
    this._handleComponentKeyDown.bind(this);

  override render(): TemplateResult {
    const classes = classMap({
      multi: this.multiline,
      single: !this.multiline,
      wrapper: true,
      'has-not-focused-item': !this._focusedItem,
      'selection-none': !this._selectedItem,
      'selection-single': this._selectedItem !== null,
    });

    return html`
      <div @click=${this._handleClick} class=${classes}>
        <ul>
          ${this._renderTree(this._data)}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tree': VscodeTree;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-tree-select': VscTreeSelectEvent;
    'vsc-tree-action': VscTreeActionEvent;
  }
}
