import { LitElement, html, svg, css, property, customElement } from 'lit-element';

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

        :host-context(.vscode-light) {
          background-image: url(icons/light/${this.name}.svg);
        }

        :host-context(.vscode-dark),
        :host-context(.vscode-high-contrast) {
          background-image: url(icons/dark/${this.name}.svg);
        }
      </style>
      <span></span>
    `;
  }
}
