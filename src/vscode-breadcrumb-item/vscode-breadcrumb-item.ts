import {TemplateResult, html} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-breadcrumb-item.styles.js';

/**
 * @tag vscode-breadcrumb-item
 *
 * Slot the label/icon as content.
 *
 * @cssprop [--vscode-breadcrumb-foreground=inherit] - Breadcrumb text and icon color
 * @cssprop [--vscode-breadcrumb-focusForeground=var(--vscode-breadcrumb-foreground, inherit)] - Text color when an item has focus
 * @cssprop [--vscode-breadcrumb-activeSelectionForeground=var(--vscode-breadcrumb-focusForeground, inherit)] - Text color for the selected item
 */
@customElement('vscode-breadcrumb-item')
export class VscodeBreadcrumbItem extends VscElement {
  static override styles = styles;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = -1;
    }
    this.setAttribute('role', 'listitem');
  }

  override render(): TemplateResult {
    return html`<span class="separator" aria-hidden="true" part="separator"
        >›</span
      >
      <span class="icon" part="icon"><slot name="icon"></slot></span>
      <span class="content" part="content"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-breadcrumb-item': VscodeBreadcrumbItem;
  }
}
