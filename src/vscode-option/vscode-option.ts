import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-option.styles.js';

/**
 * @tag vscode-option
 */
@customElement('vscode-option')
export class VscodeOption extends VscElement {
  static styles = styles;

  @property({type: String})
  value?: string | undefined;

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
