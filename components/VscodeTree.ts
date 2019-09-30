import { LitElement, html, css, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface TreeItem {
  label: string;
  subItems?: TreeItem[],
}

@customElement('vscode-tree')
export class VscodeTree extends LitElement {
  @property({ type: Array, reflect: false }) data: [];

  private renderSubTree(tree: TreeItem[], pathAttr: string) {
    let ret = '';
    const path = pathAttr.split('.');

    tree.forEach((element, index) => {
      const dataPath = `${pathAttr}.${index}`;

      if (element.subItems && Array.isArray(element.subItems) && element.subItems.length > 0) {
        ret += `
          <li data-path="${dataPath}" class="branch">
            <span class="label">${element.label}</span>
            <ul>${this.renderSubTree(element.subItems, dataPath)}</ul>
          </li>
        `;
      } else {
        ret += `<li data-path="${dataPath}" class="leaf"><span class="label">${element.label}</span></li>`;
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
          ${unsafeHTML(this.renderSubTree(this.data, '0'))}
        </ul>
      </div>
    `;
  }
}
