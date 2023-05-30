import {CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from './includes/default.styles';
import {VscElement} from './includes/VscElement';

@customElement('vscode-option')
export class VscodeOption extends VscElement {
  @property({type: String}) value = '';
  @property({type: String}) description = '';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: Boolean, reflect: true}) disabled = false;

  static get styles(): CSSResultGroup {
    return [defaultStyles];
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
