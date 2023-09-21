import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-tab-panel.styles.js';

/**
 * @cssprop [--background=var(--vscode-panel--background)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 */
@customElement('vscode-tab-panel')
export class VscodeTabPanel extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  hidden = false;

  @property({reflect: true, attribute: 'aria-labelledby'})
  ariaLabelledby = '';

  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  @property({reflect: true})
  role = 'tabpanel';

  @property({type: Number, reflect: true})
  tabindex = 0;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-panel': VscodeTabPanel;
  }
}
