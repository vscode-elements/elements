import { LitElement, html, css, unsafeCSS, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import getBaseURL from './utils/getBaseURL';

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
  open?: boolean;
}

const ARROW_OUTER_WIDTH = 24;
const BASE_URL = getBaseURL();

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
      const classes = [];
      const iconClasses = ['icon-arrow'];

      if (element.open) {
        classes.push('open');
        iconClasses.push('open');
      }

      if (element.subItems && Array.isArray(element.subItems) && element.subItems.length > 0) {
        const subTreeRendered = element.open ?
          `<ul>${this.renderTree(element.subItems, newPath)}</ul>` :
          '';
        const arrow = this.arrows ?
          `<i class="${iconClasses.join(' ')}"></i>` :
          '';

        classes.push('branch');

        ret += `
          <li data-path="${newPath.join('/')}" class="${classes.join(' ')}">
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

        classes.push('leaf')

        ret += `
          <li data-path="${newPath.join('/')}" class="${classes.join(' ')}">
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
