import {html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-context-menu-item.styles.js';

export interface VscClickEventDetail {
  label: string;
  keybinding: string;
  value: string;
  separator: boolean;
  tabindex: number;
}

/**
 * Child component of [ContextMenu](/components/context-menu/).
 *
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-menu-background
 * @cssprop [--vscode-menu-selectionBorder=var(--vscode-menu-selectionBackground)]
 * @cssprop --vscode-menu-foreground
 * @cssprop --vscode-menu-selectionBackground
 * @cssprop --vscode-menu-selectionForeground
 * @cssprop --vscode-menu-separatorBackground
 */
@customElement('vscode-context-menu-item')
export class VscodeContextMenuItem extends VscElement {
  static styles = styles;

  @property({type: String})
  label = '';

  @property({type: String})
  keybinding = '';

  @property({type: String})
  value = '';

  @property({type: Boolean, reflect: true})
  separator = false;

  @property({type: Number})
  tabindex = 0;

  private onItemClick() {
    /** @internal */
    this.dispatchEvent(
      new CustomEvent<VscClickEventDetail>('vsc-click', {
        detail: {
          label: this.label,
          keybinding: this.keybinding,
          value: this.value || this.label,
          separator: this.separator,
          tabindex: this.tabindex,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${this.separator
        ? html`
            <div class="context-menu-item separator">
              <span class="ruler"></span>
            </div>
          `
        : html`
            <div class="context-menu-item">
              <a @click=${this.onItemClick}>
                ${this.label
                  ? html`<span class="label">${this.label}</span>`
                  : nothing}
                ${this.keybinding
                  ? html`<span class="keybinding">${this.keybinding}</span>`
                  : nothing}
              </a>
            </div>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-context-menu-item': VscodeContextMenuItem;
  }
}
