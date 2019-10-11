import { LitElement, html, css, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('vscode-select')
export class VscodeSelect extends LitElement {
  @property({ type: String }) value: string;

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
    `;
  };

  render() {
    return html`
      <div>TODO</div>
    `;
  }
}
