import { LitElement, html, css, property, customElement } from 'lit-element';

const getBaseURL = () => {
  const s = document.querySelector('script[src*="vscodeWebviewElements"]');

  if (s) {
    const matches = /(.+\/)vscodeWebviewElements/g.exec('vscodeWebviewElements');

    if (!matches) {
      return '';
    }

    return matches[1];
  }

  return '';
}

const BASE_URL = getBaseURL();

@customElement('vscode-icon')
export class VscodeIcon extends LitElement {
  @property({ type: String }) name: string;
  @property({ type: Number }) size: number = 16;

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      span {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
      }
    `;
  }

  render() {
    return html`
      <style>
        span {
          height: ${this.size}px;
          width: ${this.size}px;
        }

        :host-context(.vscode-light) span {
          background-image: url(${BASE_URL}icons/light/${this.name}.svg);
        }

        :host-context(.vscode-dark) span,
        :host-context(.vscode-high-contrast) span {
          background-image: url(${BASE_URL}icons/dark/${this.name}.svg);
        }
      </style>
      <span></span>
    `;
  }
}
