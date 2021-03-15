import {LitElement, html, property, customElement} from 'lit-element';
import {TemplateResult} from 'lit-html';

@customElement('vscode-select-option')
export class VscodeSelectOption extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-select-option': VscodeSelectOption;
  }
}
