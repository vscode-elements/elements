import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-switch-button.styles.js';

/**
 * @tag vscode-switch-button
 *
 */
@customElement('vscode-switch-button')
export class VscodeSwitchButton extends VscElement {
  static override styles = styles;

  @property({reflect: true})
  variant:
    | 'default'
    | 'counter'
    | 'activity-bar-counter'
    | 'tab-header-counter' = 'default';

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-switch-button': VscodeSwitchButton;
  }
}
