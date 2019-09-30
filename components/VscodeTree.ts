import { LitElement, html, css, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
  open?: boolean;
}

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({ type: Array, reflect: false }) data: [];

  private renderTree(tree: TreeItem[], pathAttr: string = '0') {
    let ret = '';

    tree.forEach((element, index) => {
      const path = `${pathAttr}.${index}`;

      if (element.subItems && Array.isArray(element.subItems) && element.subItems.length > 0) {
        const subTreeRendered = element.open ?
          `<ul>${this.renderTree(element.subItems, path)}</ul>` :
          '';

        ret += `
          <li data-path="${path}" class="branch">
            <span class="label">${element.label}</span>
            ${subTreeRendered}
          </li>
        `;
      } else {
        ret += `<li data-path="${path}" class="leaf"><span class="label">${element.label}</span></li>`;
      }
    });

    return `${ret}`;
  }

  private onItemClick() {

  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  };

  render() {
    return html`
      <div>
        <ul>
          ${unsafeHTML(this.renderTree(this.data))}
        </ul>
      </div>
    `;
  }
}
