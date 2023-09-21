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
 * Child component of [ContextMenu](https://bendera.github.io/vscode-webview-elements/components/vscode-context-menu/).
 *
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--background=var(--vscode-menu-background)]
 * @cssprop [--border=var(--vscode-menu-selectionBorder)]
 * @cssprop [--foreground=var(--vscode-menu-foreground)]
 * @cssprop [--selection-background=var(--vscode-menu-selectionBackground)]
 * @cssprop [--selection-foreground=var(--vscode-menu-selectionForeground)]
 * @cssprop [--separator-background=var(--vscode-menu-separatorBackground)]
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
              <a @click="${this.onItemClick}">
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
