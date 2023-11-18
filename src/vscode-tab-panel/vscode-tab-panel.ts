import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-tab-panel.styles.js';

/**
 * @cssprop --vscode-panel--background
 * @cssprop --vscode-focusBorder
 */
@customElement('vscode-tab-panel')
export class VscodeTabPanel extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  hidden = false;

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
  role = 'tabpanel';

  /** @internal */
  @property({type: Number, reflect: true})
  tabIndex = 0;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-panel': VscodeTabPanel;
  }
}
