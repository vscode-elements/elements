import {LitElement, html, css, property, customElement, CSSResult} from 'lit-element';
import {nothing, TemplateResult} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';

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
