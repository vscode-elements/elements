import { LitElement, html, css, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
  open?: boolean;
}

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({ type: Array, reflect: false }) data: TreeItem[];
  @property({ type: Number }) indent: number = 16;

  private renderTree(tree: TreeItem[], path: number[] = []) {
    let ret = '';

    tree.forEach((element, index) => {
      const newPath = [...path, index];
      const indentSize = (newPath.length - 1) * this.indent;

      if (element.subItems && Array.isArray(element.subItems) && element.subItems.length > 0) {
        const subTreeRendered = element.open ?
          `<ul>${this.renderTree(element.subItems, newPath)}</ul>` :
          '';

        ret += `
          <li data-path="${newPath.join('/')}" class="branch">
            <span class="label" style="padding-left: ${indentSize}px;">${element.label}</span>
            ${subTreeRendered}
          </li>
        `;
      } else {
        ret += `
          <li data-path="${newPath.join('/')}" class="leaf">
            <span class="label" style="padding-left: ${indentSize}px;">${element.label}</span>
          </li>
        `;
      }
    });

    return `${ret}`;
  }

  private toggleSubTreeOpen(path: string) {
    const indexes: number[] = path.split('/').map(el => Number(el));
    let current = this.data;

    indexes.forEach(index => {
      if (index + 1 === indexes.length) {
        current[index].open = !current[index].open;
      } else {
        current = current[index].subItems;
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
        display: block;
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
