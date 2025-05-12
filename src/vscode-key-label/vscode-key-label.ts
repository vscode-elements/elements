import {html, TemplateResult} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-key-label.styles.js';

/**
 *
 */
@customElement('vscode-key-label')
export class VscodeKeyLabel extends VscElement {
  static override styles = styles;

  override render(): TemplateResult {
    return html`<span><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-key-label': VscodeKeyLabel;
  }
}
