import {CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-option')
export class VscodeOption extends VscElement {
  @property({type: String}) value = '';
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;

  static get styles(): CSSResultGroup {
    return [super.styles];
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-option': VscodeOption;
  }
}
