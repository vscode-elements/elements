import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../../includes/VscElement.js';
import styles from './option.styles.js';

@customElement('vsc-option')
export class VscOption extends VscElement {
  static styles = styles;

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
    'vsc-option': VscOption;
  }
}
