import {
  LitElement,
  html,
  css,
  unsafeCSS,
  property,
  customElement,
} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import getBaseURL from './utils/getBaseURL';
import './vscode-icon';

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
  icons?: TreeItemIconConfig;
  value?: string;
}

enum ItemType {
  BRANCH = 'branch',
  LEAF = 'leaf',
}

const ARROW_OUTER_WIDTH = 24;
const BASE_URL = getBaseURL();

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({type: Array, reflect: false}) data: TreeItem[] = [];
  @property({type: Number}) indent = 8;
  @property({type: Boolean}) arrows = false;
  @property({type: Boolean}) multiline = false;

  private _selectedItem: TreeItem | null = null;

  private getItemByPath(path: string): TreeItem | undefined {
    const pathFragments: number[] = path.split('/').map((el) => Number(el));
    let current: TreeItem[] = this.data;
    let item: TreeItem | undefined = undefined;

    pathFragments.forEach((el, i) => {
      if (i === pathFragments.length - 1) {
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
    subItems,
  }: {
    indentLevel: number;
    label: string;
    path: number[];
    iconName: string | undefined;
    open: boolean;
    itemType: ItemType;
    selected: boolean;
    subItems: TreeItem[];
  }) {
    const arrowClassname = open ? 'icon-arrow open' : 'icon-arrow';
    const contentsClasses = ['contents'];
    const liClasses = open ? ['open'] : [];
    const indentSize = indentLevel * this.indent;
    const padLeft =
      this.arrows && itemType === ItemType.LEAF
        ? ARROW_OUTER_WIDTH + indentSize
        : indentSize;
    const arrowMarkup =
      this.arrows && itemType === ItemType.BRANCH
        ? html`<i class="${arrowClassname}"></i>`
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

    return html`
      <li data-path="${path.join('/')}" class="${liClasses.join(' ')}">
        <span class="${contentsClasses.join(
          ' '
        )}" style="padding-left: ${padLeft}px;">
          ${arrowMarkup}
          ${iconMarkup}
          ${labelMarkup}
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
      const {label, open = false, selected = false, subItems = []} = element;

      if (selected) {
        this._selectedItem = element;
      }

      ret.push(this.renderTreeItem({
        indentLevel,
        label,
        path,
        open,
        iconName,
        itemType,
        selected,
        subItems,
      }));
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
      new CustomEvent('vsc-select', {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  private onComponentClick(event: MouseEvent) {
    const composedPath = event.composedPath();
    const targetElement = composedPath.find(
      (el: EventTarget) =>
        (el as HTMLElement).tagName &&
        (el as HTMLElement).tagName.toUpperCase() === 'LI'
    );

    if (targetElement) {
      const path = (targetElement as HTMLLIElement).dataset.path || '';
      const item = this.getItemByPath(path) as TreeItem;

      this.toggleSubTreeOpen(item);
      this.selectTreeItem(item);
      this.emitSelectEvent(item, path);
      this.requestUpdate();
    }
  }

  public closeAll() {
    this.closeSubTreeRecursively(this.data);
    this.requestUpdate();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        outline: none;
      }

      li {
        list-style: none;
      }

      ul,
      li {
        margin: 0;
        padding: 0;
      }

      .contents {
        align-items: center;
        display: flex;
      }

      .multi .contents {
        align-items: flex-start;
      }

      .contents:hover {
        background-color: var(--vscode-list-hoverBackground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
      }

      .contents.selected {
        background-color: var(--vscode-list-focusBackground);
      }

      :host(:focus) .contents.selected {
        background-color: var(--vscode-list-activeSelectionBackground);
        color: var(--vscode-list-activeSelectionForeground);
      }

      .icon-arrow {
        background-position: 3px center;
        background-repeat: no-repeat;
        display: block;
        height: 22px;
        margin: 0 8px 0 0;
        width: 16px;
      }

      :host-context(.vscode-light) .icon-arrow {
        background-image: url(${unsafeCSS(BASE_URL)}icons/light/chevron-right.svg);
      }

      :host-context(.vscode-dark) .icon-arrow,
      :host-context(.vscode-high-contrast) .icon-arrow {
        background-image: url(${unsafeCSS(BASE_URL)}icons/dark/chevron-right.svg);
      }

      :host-context(.vscode-light) .icon-arrow.open {
        background-image: url(${unsafeCSS(BASE_URL)}icons/light/chevron-down.svg);
      }

      :host-context(.vscode-dark) .icon-arrow.open,
      :host-context(.vscode-high-contrast) .icon-arrow.open {
        background-image: url(${unsafeCSS(BASE_URL)}icons/dark/chevron-down.svg);
      }

      .label-icon {
        display: block;
        margin-right: 6px;
      }

      .multi .contents .label-icon {
        margin-top: 3px;
      }

      .label {
        display: block;
        line-height: 22px;
      }

      .single .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `;
  }

  render() {
    return html`
      <div
        @click="${this.onComponentClick}"
        class="${this.multiline ? 'multi' : 'single'}"
      >
        <ul>
          ${this.renderTree(this.data)}
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
