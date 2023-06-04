import {html, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement';
import '../vscode-icon';
import styles from './vscode-tree.styles';

enum KeyName {
  ARROW_DOWN = 'ArrowDown',
  ARROW_UP = 'ArrowUp',
  ENTER = 'Enter',
  ESCAPE = 'Escape',
  SPACE = ' ',
}

interface TreeItemIconConfig {
  branch?: string;
  open?: string;
  leaf?: string;
}

interface TreeItem {
  label: string;
  subItems?: TreeItem[];
  open?: boolean;
  selected?: boolean;
  focused?: boolean;
  icons?: TreeItemIconConfig;
  value?: string;
  path?: number[];
}

enum ItemType {
  BRANCH = 'branch',
  LEAF = 'leaf',
}

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
    const {label, subItems, open, selected, focused, icons, value} = val;
    const path = [...prevPath, index];
    const nextItem: TreeItem = {
      label,
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

  @property({type: Number}) indent = 8;
  @property({type: Boolean}) arrows = false;
  @property({type: Boolean}) multiline = false;
  @property({type: Number, reflect: true}) tabindex = 0;

  private _data: TreeItem[] = [];

  @state()
  private _selectedItem: TreeItem | null = null;

  @state()
  private _focusedItem: TreeItem | null = null;

  private getItemByPath(path: number[]): TreeItem | null {
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

  private getItemType(item: TreeItem): ItemType {
    if (
      item.subItems &&
      Array.isArray(item.subItems) &&
      item.subItems.length > 0
    ) {
      return ItemType.BRANCH;
    }

    return ItemType.LEAF;
  }

  private getIconName(element: TreeItem): string | undefined {
    if (!element.icons) {
      return undefined;
    }

    const {icons} = element;
    const itemType = this.getItemType(element);
    const isOpen = element.open || false;

    if (itemType === ItemType.BRANCH && isOpen) {
      return icons.open || undefined;
    } else if (itemType === ItemType.BRANCH && !isOpen) {
      return icons.branch || undefined;
    } else if (itemType === ItemType.LEAF) {
      return icons.leaf || undefined;
    } else {
      return undefined;
    }
  }

  private renderTreeItem({
    indentLevel,
    label,
    path,
    iconName,
    open = false,
    itemType,
    selected = false,
    focused = false,
    subItems,
  }: {
    indentLevel: number;
    label: string;
    path: number[];
    iconName: string | undefined;
    open: boolean;
    itemType: ItemType;
    selected: boolean;
    focused: boolean;
    subItems: TreeItem[];
  }) {
    const arrowIconName = open ? 'chevron-down' : 'chevron-right';
    const contentsClasses = ['contents'];
    const liClasses = open ? ['open'] : [];
    const indentSize = indentLevel * this.indent;
    const padLeft =
      this.arrows && itemType === ItemType.LEAF
        ? ARROW_OUTER_WIDTH + indentSize
        : indentSize;
    const arrowMarkup =
      this.arrows && itemType === ItemType.BRANCH
        ? html`<vscode-icon
            name="${arrowIconName}"
            class="icon-arrow"
          ></vscode-icon>`
        : nothing;
    const iconMarkup = iconName
      ? html`<vscode-icon name="${iconName}" class="label-icon"></vscode-icon>`
      : nothing;
    const subTreeMarkup =
      open && itemType === ItemType.BRANCH
        ? html`<ul>
            ${this.renderTree(subItems, path)}
          </ul>`
        : nothing;
    const labelMarkup = html`<span class="label">${label}</span>`;

    liClasses.push(itemType === ItemType.LEAF ? 'leaf' : 'branch');

    if (selected) {
      contentsClasses.push('selected');
    }

    if (focused) {
      contentsClasses.push('focused');
    }

    return html`
      <li data-path="${path.join('/')}" class="${liClasses.join(' ')}">
        <span
          class="${contentsClasses.join(' ')}"
          style="${styleMap({paddingLeft: `${padLeft}px`})}"
        >
          ${arrowMarkup} ${iconMarkup} ${labelMarkup}
        </span>
        ${subTreeMarkup}
      </li>
    `;
  }

  private renderTree(tree: TreeItem[], oldPath: number[] = []) {
    const ret: TemplateResult[] = [];

    if (!tree) {
      return nothing;
    }

    tree.forEach((element, index) => {
      const path = [...oldPath, index];
      const indentLevel = path.length - 1;
      const itemType = this.getItemType(element);
      const iconName = this.getIconName(element);
      const {
        label,
        open = false,
        selected = false,
        focused = false,
        subItems = [],
      } = element;

      if (selected) {
        this._selectedItem = element;
      }

      if (focused) {
        this._focusedItem = element;
      }

      ret.push(
        this.renderTreeItem({
          indentLevel,
          label,
          path,
          open,
          iconName,
          itemType,
          selected,
          focused,
          subItems,
        })
      );
    });

    return ret;
  }

  private toggleSubTreeOpen(item: TreeItem) {
    if (!item.subItems) {
      return;
    }

    item.open = !item.open;
  }

  private selectTreeItem(item: TreeItem) {
    if (this._selectedItem) {
      this._selectedItem.selected = false;
    }

    this._selectedItem = item;
    item.selected = true;
  }

  private focusTreeItem(item: TreeItem) {
    if (this._focusedItem) {
      this._focusedItem.focused = false;
    }

    this._focusedItem = item;
    item.focused = true;
  }

  private closeSubTreeRecursively(tree: TreeItem[]) {
    tree.forEach((item) => {
      item.open = false;

      if (item.subItems && item.subItems.length > 0) {
        this.closeSubTreeRecursively(item.subItems);
      }
    });
  }

  private emitSelectEvent(item: TreeItem, path: string) {
    const {icons, label, open, value} = item;
    const detail = {
      icons,
      itemType: this.getItemType(item),
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

  private _focusItem(item: TreeItem) {
    if (this._focusedItem) {
      this._focusedItem.focused = false;
    }

    this._focusedItem = item;
    this._focusedItem.focused = true;
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

        const prevSibling = this.getItemByPath(newPath) as TreeItem;
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

          this._focusItem(this.getItemByPath(newPath) as TreeItem);
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

    let nextFocusedItem = this.getItemByPath(nextPath);

    if (nextFocusedItem) {
      this._focusItem(nextFocusedItem);
    } else {
      nextPath.pop();

      if (nextPath.length > 0) {
        nextPath[nextPath.length - 1] += 1;
        nextFocusedItem = this.getItemByPath(nextPath);

        if (nextFocusedItem) {
          this._focusItem(nextFocusedItem);
        }
      }
    }
  }

  private onComponentClick(event: MouseEvent) {
    const composedPath = event.composedPath();
    const targetElement = composedPath.find(
      (el: EventTarget) =>
        (el as HTMLElement).tagName &&
        (el as HTMLElement).tagName.toUpperCase() === 'LI'
    );

    if (targetElement) {
      const pathStr = (targetElement as HTMLLIElement).dataset.path || '';
      const path = pathStr.split('/').map((el) => Number(el));
      const item = this.getItemByPath(path) as TreeItem;

      this.toggleSubTreeOpen(item);
      this.selectTreeItem(item);
      this.focusTreeItem(item);
      this.emitSelectEvent(item, pathStr);
      this.requestUpdate();
    } else {
      if (this._focusedItem) {
        this._focusedItem.focused = false;
      }

      this._focusedItem = null;
    }
  }

  private onComponentKeyDown(ev: KeyboardEvent) {
    const keys = [
      KeyName.ARROW_DOWN,
      KeyName.ARROW_UP,
      KeyName.ENTER,
      KeyName.ESCAPE,
      KeyName.SPACE,
    ];

    if (keys.includes(ev.key as KeyName)) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    if (ev.key === KeyName.ESCAPE) {
      this._focusedItem = null;
    }

    if (ev.key === KeyName.ARROW_UP) {
      this._focusPrevItem();
    }

    if (ev.key === KeyName.ARROW_DOWN) {
      this._focusNextItem();
    }

    if (ev.key === KeyName.ENTER || ev.key === KeyName.SPACE) {
      if (this._selectedItem) {
        this._selectedItem.selected = false;
      }

      if (this._focusedItem) {
        this._selectedItem = this._focusedItem;
      }

      if (this._selectedItem) {
        this._selectedItem.selected = true;
        this._selectedItem.open = !this._selectedItem.open;
        this.emitSelectEvent(
          this._selectedItem as TreeItem,
          this._selectedItem.path!.join('/')
        );
        this.requestUpdate();
      }
    }
  }

  private onComponentKeyDownBound = this.onComponentKeyDown.bind(this);

  public closeAll(): void {
    this.closeSubTreeRecursively(this.data);
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onComponentKeyDownBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onComponentKeyDownBound);
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
      <div @click="${this.onComponentClick}" class="${classes}">
        <ul>
          ${this.renderTree(this._data)}
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
