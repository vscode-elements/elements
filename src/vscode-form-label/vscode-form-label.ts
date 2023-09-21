import {html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-form-label.styles.js';

/**
 * @deprecated
 */
@customElement('vscode-form-label')
export class VscodeFormLabel extends VscElement {
  static styles = styles;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-label': VscodeFormLabel;
  }
}
