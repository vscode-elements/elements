import { LitElement, html, css, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
  open?: boolean;
}

const ARROW_OUTER_WIDTH = 19;

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({ type: Array, reflect: false }) data: TreeItem[];
  @property({ type: Number }) indent: number = 8;
  @property({ type: Boolean }) arrows: boolean = true;

  private renderTree(tree: TreeItem[], path: number[] = []) {
    let ret = '';

    tree.forEach((element, index) => {
      const newPath = [...path, index];
      const indentLevel = newPath.length - 1;
      const indentSize = indentLevel * this.indent;

      if (element.subItems && Array.isArray(element.subItems) && element.subItems.length > 0) {
        const subTreeRendered = element.open ?
          `<ul>${this.renderTree(element.subItems, newPath)}</ul>` :
          '';
        const arrow = this.arrows ?
          '<vscode-icon name="chevron-right" class="icon-subtree"></vscode-icon>' :
          '';

        ret += `
          <li data-path="${newPath.join('/')}" class="branch">
            <span class="label" style="padding-left: ${indentSize}px;">
              ${arrow}
              ${element.label}
            </span>
            ${subTreeRendered}
          </li>
        `;
      } else {
        const padLeft = this.arrows ?
          ARROW_OUTER_WIDTH + indentSize :
          indentSize;

        ret += `
          <li data-path="${newPath.join('/')}" class="leaf">
            <span class="label" style="padding-left: ${padLeft}px;">
              ${element.label}
            </span>
          </li>
        `;
      }
    });

    return `${ret}`;
  }

  private toggleSubTreeOpen(path: string) {
    const pathFragments: number[] = path.split('/').map(el => Number(el));
    let current = this.data;

    pathFragments.forEach((el, i) => {
      if (i === pathFragments.length - 1) {
        current[el].open = !current[el].open;
      } else {
        current = current[el].subItems;
      }
    });

    this.requestUpdate();
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
      this.toggleSubTreeOpen((<HTMLLIElement>targetElement).dataset.path);
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
      }

      ul,
      li {
        margin: 0;
        padding: 0;
      }

      .label {
        display: flex;
        line-height: 22px;
      }

      .label:hover {
        background-color: var(--vscode-list-hoverBackground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
      }

      .icon-subtree {
        display: block;
        margin: 3px 3px 0 0;
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
