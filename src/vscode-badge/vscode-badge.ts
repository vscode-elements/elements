import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-badge.styles.js';

/**
 * Show counts or status information. Badges can also be used within [Textfield](https://vscode-elements.github.io/components/textfield) and [TabHeader](https://vscode-elements.github.io/components/tabs) components.
 *
 * @tag vscode-badge
 *
 * @cssprop --vscode-font-family
 * @cssprop --vscode-badge-background - default and counter variant background color
 * @cssprop --vscode-badge-foreground - default and counter variant foreground color
 * @cssprop --vscode-activityBarBadge-background - activity bar variant background color
 * @cssprop --vscode-activityBarBadge-foreground - activity bar variant foreground color
 */
@customElement('vscode-badge')
export class VscodeBadge extends VscElement {
  static styles = styles;

  @property({reflect: true})
  variant: 'default' | 'counter' | 'activity-bar-counter' = 'default';

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-badge': VscodeBadge;
  }
}
