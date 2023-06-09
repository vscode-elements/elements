import {html, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement';
import '../vscode-icon';
import styles from './vscode-tree.styles';

type ListenedKey = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape' | ' ';

interface TreeItemIconConfig {
  branch?: string;
  open?: string;
  leaf?: string;
}

interface TreeItem {
  label: string;
  description?: string;
  subItems?: TreeItem[];
  open?: boolean;
  selected?: boolean;
  focused?: boolean;
  hasSelectedItem?: boolean;
  hasFocusedItem?: boolean;
  icons?: TreeItemIconConfig;
  value?: string;
  path?: number[];
}

type ItemType = 'branch' | 'leaf';

interface SelectEventDetail {
  icons: TreeItemIconConfig | undefined;
  itemType: ItemType;
  label: string;
  open: boolean;
  value: string;
  path: string; // ex.: 0/0/1
}

const ARROW_OUTER_WIDTH = 18;

const mapData = (tree: TreeItem[], prevPath: number[] = []): TreeItem[] => {
  const nextTree: TreeItem[] = [];

  tree.forEach((val, index) => {
    const {
      label,
      description,
      subItems,
      open,
      selected,
      focused,
      icons,
      value,
    } = val;
    const path = [...prevPath, index];
    const nextItem: TreeItem = {
      label,
      description,
      path,
      open: !!open,
      selected: !!selected,
      focused: !!focused,
      icons: {...icons},
      value,
    };

    if (subItems) {
      nextItem.subItems = mapData(subItems, path);
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
 * @fires vsc-select Dispatched when an item is selected. The event data shape is described in the
 * `SelectEventDetail` interface.
 *
 * @cssprop [--focus-border=var(--vscode-list-focusOutline)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--hover-foreground=var(--vscode-list-hoverForeground)]
 * @cssprop [--hover-background=var(--vscode-list-hoverBackground)]
 * @cssprop [--inactive-selection-background=var(--vscode-list-inactiveSelectionBackground)]
 * @cssprop [--active-selection-background=var(--vscode-list-activeSelectionBackground)]
 * @cssprop [--active-selection-foreground=var(--vscode-list-activeSelectionForeground)]
 */
@customElement('vscode-tree')
export class VscodeTree extends VscElement {
  static styles = styles;

  @property({type: Array, reflect: false})
  set data(val: TreeItem[]) {
    const oldVal = this._data;

    this._data = mapData(val);
    this.requestUpdate('data', oldVal);
  }
  get data(): TreeItem[] {
    return this._data;
  }

  @property({type: Number})
  indent = 8;

  @property({type: Boolean})
  arrows = false;

  @property({type: Boolean})
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

  private _getIconName(element: TreeItem): string | undefined {
    if (!element.icons) {
      return undefined;
    }

    const {icons} = element;
    const itemType = isBranch(element) ? 'branch' : 'leaf';
    const isOpen = element.open || false;

    if (itemType === 'branch' && isOpen) {
      return icons.open || undefined;
    } else if (itemType === 'branch' && !isOpen) {
      return icons.branch || undefined;
    } else if (itemType === 'leaf') {
      return icons.leaf || undefined;
    } else {
      return undefined;
    }
  }

  private _renderTreeItem({
    indentLevel,
    label,
    description,
    path,
    iconName,
    open = false,
    itemType,
    selected = false,
    focused = false,
    hasFocusedItem = false,
    hasSelectedItem = false,
    subItems,
  }: {
    indentLevel: number;
    label: string;
    description: string;
    path: number[];
    iconName: string | undefined;
    open: boolean;
    itemType: ItemType;
    selected: boolean;
    focused: boolean;
    hasFocusedItem: boolean;
    hasSelectedItem: boolean;
    subItems: TreeItem[];
  }) {
    const arrowIconName = open ? 'chevron-down' : 'chevron-right';
    const contentsClasses = ['contents'];
    const liClasses = open ? ['open'] : [];
    const indentSize = indentLevel * this.indent;
    const padLeft =
      this.arrows && itemType === 'leaf'
        ? ARROW_OUTER_WIDTH + indentSize
        : indentSize;
    const arrowMarkup =
      this.arrows && itemType === 'branch'
        ? html`<vscode-icon
            name="${arrowIconName}"
            class="icon-arrow"
          ></vscode-icon>`
        : nothing;
    const iconMarkup = iconName
      ? html`<vscode-icon name="${iconName}" class="label-icon"></vscode-icon>`
      : nothing;
    const subTreeMarkup =
      open && itemType === 'branch'
        ? html`<ul
            style="--indent-guide-pos: ${indentSize + 8 + 4}px"
            class=${classMap({
              'has-active-item': hasFocusedItem || hasSelectedItem,
            })}
          >
            ${this._renderTree(subItems, path)}
          </ul>`
        : nothing;
    const descriptionMarkup = description
      ? html`<span class="description">${description}</span>`
      : nothing;

    liClasses.push(itemType);

    if (selected) {
      contentsClasses.push('selected');
    }

    if (focused) {
      contentsClasses.push('focused');
    }

    return html`
      <li data-path="${path.join('/')}" class="${liClasses.join(' ')}">
        <div
          class="${contentsClasses.join(' ')}"
          style="${styleMap({paddingLeft: `${padLeft + 8}px`})}"
        >
          ${arrowMarkup}${iconMarkup}<span class="text-content"
            >${label}${descriptionMarkup}</span
          >
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

    tree.forEach((element, index) => {
      const path = [...oldPath, index];
      const indentLevel = path.length - 1;
      const itemType = isBranch(element) ? 'branch' : 'leaf';
      const iconName = this._getIconName(element);
      const {
        label,
        description = '',
        open = false,
        selected = false,
        focused = false,
        hasFocusedItem = false,
        hasSelectedItem = false,
        subItems = [],
      } = element;

      if (selected) {
        this._selectedItem = element;
      }

      if (focused) {
        this._focusedItem = element;
      }

      ret.push(
        this._renderTreeItem({
          indentLevel,
          label,
          description,
          path,
          open,
          iconName,
          itemType,
          selected,
          focused,
          hasFocusedItem,
          hasSelectedItem,
          subItems,
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
      } else if(!item.open && parentBranch) {
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

    this.dispatchEvent(
      new CustomEvent<SelectEventDetail>('vsc-select', {
        bubbles: true,
        composed: true,
        detail,
      })
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

  private _handleComponentKeyDownBound = this._handleComponentKeyDown.bind(this);

  public closeAll(): void {
    this._closeSubTreeRecursively(this.data);
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleComponentKeyDownBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleComponentKeyDownBound);
  }

  render(): TemplateResult {
    const classes = classMap({
      multi: this.multiline,
      single: !this.multiline,
      wrapper: true,
      'focused-none': !this._focusedItem,
      'selection-none': !this._selectedItem,
      'selection-single': this._selectedItem !== null,
    });

    return html`
      <div @click="${this._handleClick}" class="${classes}">
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
}
