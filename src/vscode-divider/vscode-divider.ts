import {TemplateResult, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-divider.styles.js';

/**
 * @tag vscode-divider
 */
@customElement('vscode-divider')
export class VscodeDivider extends VscElement {
  static override styles = styles;

  @property({reflect: true})
  override role: 'separator' | 'presentation' = 'separator';

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-divider': VscodeDivider;
  }
}
