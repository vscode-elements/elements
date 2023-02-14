import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

export interface VscClickEventDetail {
  label: string;
  keybinding: string;
  value: string;
  separator: boolean;
  tabindex: number;
}

@customElement('vscode-context-menu-item')
export class VscodeContextMenuItem extends VscElement {
  @property({type: String})
  label = '';

  @property({type: String})
  keybinding = '';

  @property({type: String})
  value = '';

  @property({type: Boolean})
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

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          line-height: 1.4em;
          outline: none;
          position: relative;
        }

        .context-menu-item {
          background-color: var(--vscode-menu-background);
          color: var(--vscode-menu-foreground);
          display: flex;
          user-select: none;
          white-space: nowrap;
        }

        .rule {
          border-bottom: 1px solid var(--vscode-menu-separatorBackground);
          display: block;
          margin: 0 0 4px;
          opacity: 0.4;
          padding-top: 4px;
          width: 100%;
        }

        .context-menu-item a {
          align-items: center;
          border-radius: 3px;
          color: var(--vscode-menu-foreground);
          cursor: default;
          display: flex;
          flex: 1 1 auto;
          height: 2em;
          margin-left: 4px;
          margin-right: 4px;
          outline: none;
          position: relative;
          text-decoration: inherit;
        }

        :host-context([selected]) .context-menu-item a {
          background-color: var(--vscode-menu-selectionBackground);
          color: var(--vscode-menu-selectionForeground);
        }

        .label {
          background: none;
          display: flex;
          flex: 1 1 auto;
          font-size: 12px;
          line-height: 1;
          padding: 0 2em;
          text-decoration: none;
        }

        .keybinding {
          display: block;
          flex: 2 1 auto;
          line-height: 1;
          padding: 0 2em;
          text-align: right;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      ${this.separator
        ? html`
            <div class="context-menu-item separator">
              <span class="rule"></span>
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
