import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-tab-panel.styles.js';

/**
 * @tag vscode-tab-panel
 *
 * @cssprop [--vscode-focusBorder=#0078d4]
 * @cssprop [--vscode-panel--background=#181818]
 */
@customElement('vscode-tab-panel')
export class VscodeTabPanel extends VscElement {
  static override styles = styles;

  @property({type: Boolean, reflect: true})
  override hidden = false;

  /** @internal */
  @property({reflect: true, attribute: 'aria-labelledby'})
  ariaLabelledby = '';

  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  /** @internal */
  @property({reflect: true})
  override role = 'tabpanel';

  /** @internal */
  @property({type: Number, reflect: true})
  override tabIndex = 0;

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-panel': VscodeTabPanel;
  }
}
