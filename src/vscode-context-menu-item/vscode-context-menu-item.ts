import {html, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-context-menu-item.styles.js';

export interface VscClickEventDetail {
  label: string;
  keybinding: string;
  value: string;
  separator: boolean;
  tabindex: number;
}

/**
 * @tag vscode-context-menu-item
 *
 * Child component of [ContextMenu](/components/context-menu/).
 *
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-menu-background=#1f1f1f]
 * @cssprop [--vscode-menu-selectionBorder=transparent]
 * @cssprop [--vscode-menu-foreground=#cccccc]
 * @cssprop [--vscode-menu-selectionBackground=#0078d4]
 * @cssprop [--vscode-menu-selectionForeground=#ffffff]
 * @cssprop [--vscode-menu-separatorBackground=#454545]
 */
@customElement('vscode-context-menu-item')
export class VscodeContextMenuItem extends VscElement {
  static override styles = styles;

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

  override render(): TemplateResult {
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
