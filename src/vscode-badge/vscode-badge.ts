import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-badge.styles.js';

/**
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--background=var(--vscode-badge-background)] - default and counter variant background color
 * @cssprop [--foreground=var(--vscode-badge-foreground)] - default and counter variant foreground color
 * @cssprop [--activity-bar-badge-background=var(--vscode-activityBarBadge-background)] - activity bar variant background color
 * @cssprop [--activity-bar-badge-foreground=var(--vscode-activityBarBadge-foreground)] - activity bar variant foreground color
 */
@customElement('vscode-badge')
export class VscodeBadge extends VscElement {
  static styles = styles;

  @property()
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
