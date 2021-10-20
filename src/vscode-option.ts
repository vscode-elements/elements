import {LitElement, html, property, customElement} from 'lit-element';
import {TemplateResult} from 'lit-html';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: Boolean, reflect: true}) disabled = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-option': VscodeOption;
  }
}
