import {html, TemplateResult} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-toolbar-container.styles.js';

/**
 * Simple container to arrange the toolar buttons
 *
 * @tag vscode-toolbar-container
 */
@customElement('vscode-toolbar-container')
export class VscodeToolbarContainer extends VscElement {
  static override styles = styles;

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-toolbar-container': VscodeToolbarContainer;
  }
}
