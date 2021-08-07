import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';

@customElement('vscode-option')
export class VscodeOption extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-option': VscodeOption;
  }
}
