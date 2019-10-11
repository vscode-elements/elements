import { LitElement, html, css, unsafeCSS, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import getBaseURL from './utils/getBaseURL';

interface TreeItemIconConfig {
  branch?: string,
  open?: string,
  leaf?: string,
}

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
  open?: boolean;
  selected?: boolean;
  icons?: TreeItemIconConfig
}

enum ItemType {
  BRANCH = 'branch',
  LEAF = 'leaf',
}

const ARROW_OUTER_WIDTH = 24;
const BASE_URL = getBaseURL();

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({ type: Array, reflect: false }) data: TreeItem[];
  @property({ type: Number }) indent: number = 8;
  @property({ type: Boolean }) arrows: boolean = false;

  private _selectedItem: TreeItem;

  private getItemByPath(path: string): TreeItem {
    const pathFragments: number[] = path.split('/').map(el => Number(el));
    let current: TreeItem[] = this.data;
    let item: TreeItem;

    pathFragments.forEach((el, i) => {
      if (i === pathFragments.length - 1) {
        item = current[el];
      } else {
        current = current[el].subItems;
      }
    });

    return item;
  }

  private getItemType(item: TreeItem): ItemType {
    if (item.subItems && Array.isArray(item.subItems) && item.subItems.length > 0) {
      return ItemType.BRANCH;
    }

    return ItemType.LEAF;
  }

  private getIconName(element: TreeItem): string | undefined {
    if (!element.icons) {
      return undefined;
    }

    const { icons } = element;
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
    iconName: string;
    open: boolean;
    itemType: ItemType;
    selected: boolean;
    subItems: TreeItem[];
  }) {
    const arrowClassname = open ? 'icon-arrow open' : 'icon-arrow';
    const contentsClasses = ['contents'];
    const liClasses = open ? ['open'] : [];
    const indentSize = indentLevel * this.indent;
    const padLeft = this.arrows && itemType === ItemType.LEAF ?
      ARROW_OUTER_WIDTH + indentSize : indentSize;
    const arrowMarkup = this.arrows && itemType === ItemType.BRANCH ?
      `<i class="${arrowClassname}"></i>` : '';
    const iconMarkup = iconName ? `<vscode-icon name="${iconName}"></vscode-icon>` : '';
    const subTreeMarkup = open && itemType === ItemType.BRANCH ?
      `<ul>${this.renderTree(subItems, path)}</ul>` :
      '';

    liClasses.push(itemType === ItemType.LEAF ? 'leaf' : 'branch');

    if (selected) {
      contentsClasses.push('selected');
    }

    return `
      <li data-path="${path.join('/')}" class="${liClasses.join(' ')}">
        <span class="${contentsClasses.join(' ')}" style="padding-left: ${padLeft}px;">
          ${arrowMarkup}
          ${iconMarkup}
          ${label}
        </span>
        ${subTreeMarkup}
      </li>
    `;
  }

  private renderTree(tree: TreeItem[], oldPath: number[] = []) {
    let ret = '';

    tree.forEach((element, index) => {
      const path = [...oldPath, index];
      const indentLevel = path.length - 1;
      const itemType = this.getItemType(element);
      const iconName = this.getIconName(element);
      const { label, open = false, selected = false, subItems = [] } = element;

      ret += this.renderTreeItem({
        indentLevel,
        label,
        path,
        open,
        iconName,
        itemType,
        selected,
        subItems,
      });
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

  private onComponentClick(event: MouseEvent) {
    const composedPath = event.composedPath();
    const targetElement = composedPath.find(
      (el: HTMLElement) => el.tagName && el.tagName.toUpperCase() === 'LI'
    );

    if (targetElement) {
      const item = this.getItemByPath((<HTMLLIElement>targetElement).dataset.path);

      this.toggleSubTreeOpen(item);
      this.selectTreeItem(item);
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

      ul,
      li {
        margin: 0;
        padding: 0;
      }

      .contents {
        display: flex;
        line-height: 22px;
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
    `;
  };

  render() {
    return html`
      <div @click="${this.onComponentClick}">
        <ul>
          ${unsafeHTML(this.renderTree(this.data))}
        </ul>
      </div>
    `;
  }
}
