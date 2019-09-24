import { LitElement, html, svg, css, property, customElement } from 'lit-element';
import getIcon from './getIcon';

@customElement('vscode-icon')
export class VscodeIcon extends LitElement {
  @property({ type: String }) name: string;
  @property({ type: String }) theme: 'light' | 'dark' = 'light';

  private getSize(name: string): number {
    return [
      'file',
      'search',
      'source-control',
      'debug',
      'extensions',
      'more',
      'settings',
      'references'
    ].indexOf(this.name) !== -1 ? 24 : 16;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      svg {
        display: block;
      }
    `;
  }

  render() {
    const size = this.getSize(this.name);
    const shape = getIcon(this.name, this.theme);

    return svg`
      <svg
        width="${size}"
        height="${size}"
        viewBox="0 0 ${size} ${size}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${shape}
      </svg>
    `;
  }
}
