import {TemplateResult, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-divider.styles.js';

/**
 * @tag vscode-divider
 */
@customElement('vscode-divider')
export class VscodeDivider extends VscElement {
  static styles = styles;

  @property({reflect: true})
  role: 'separator' | 'presentation' = 'separator';

  render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-divider': VscodeDivider;
  }
}
