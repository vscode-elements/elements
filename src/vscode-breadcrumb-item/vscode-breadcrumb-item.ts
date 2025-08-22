import {TemplateResult, html} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-breadcrumb-item.styles.js';
import {chevronRightIcon} from '../includes/icons.js';
import {state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

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

  @state()
  _hasIcon = false;

  private _handleSlotChange(ev: Event) {
    const slot = ev.target as HTMLSlotElement;

    this._hasIcon = slot.assignedElements().length > 0;
  }

  override render(): TemplateResult {
    return html`
      <div class="root">
        <div class="separator" aria-hidden="true" part="separator">
          <slot name="icon-separator">${chevronRightIcon}</slot>
        </div>
        <div
          class=${classMap({icon: true, 'has-icon': this._hasIcon})}
          part="icon"
        >
          <slot name="icon" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="content" part="content"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-breadcrumb-item': VscodeBreadcrumbItem;
  }
}
