import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import declareThemeVariables from './includes/declareThemeVariables';
import {VscElement} from './includes/VscElement';

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
 * @cssprop [--border=var(--vscode-menu-border)]
 * @cssprop [--foreground=var(--vscode-menu-foreground)]
 * @cssprop [--selection-background=var(--vscode-menu-selectionBackground)]
 * @cssprop [--selection-foreground=var(--vscode-menu-selectionForeground)]
 * @cssprop [--separator-background=var(--vscode-menu-separatorBackground)]
 */
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
      declareThemeVariables([
        {
          componentProp: '--font-family',
          vscodeProp: '--vscode-font-family',
        },
        {
          componentProp: '--font-size',
          vscodeProp: '--vscode-font-size',
        },
        {
          componentProp: '--font-weight',
          vscodeProp: '--vscode-font-weight',
        },
        {
          componentProp: '--background',
          vscodeProp: '--vscode-menu-background',
        },
        {
          componentProp: '--border',
          vscodeProp: '--vscode-menu-border',
        },
        {
          componentProp: '--foreground',
          vscodeProp: '--vscode-menu-foreground',
        },
        {
          componentProp: '--selection-background',
          vscodeProp: '--vscode-menu-selectionBackground',
        },
        {
          componentProp: '--selection-foreground',
          vscodeProp: '--vscode-menu-selectionForeground',
        },
        {
          componentProp: '--separator-background',
          vscodeProp: '--vscode-menu-separatorBackground'
        }
      ]),
      css`
        :host {
          display: block;
          font-family: var(--font-family);
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          line-height: 1.4em;
          outline: none;
          position: relative;
        }

        .context-menu-item {
          background-color: var(--menu-background);
          color: var(--menu-foreground);
          display: flex;
          user-select: none;
          white-space: nowrap;
        }

        .rule {
          border-bottom: 1px solid var(--separator-background);
          display: block;
          margin: 0 0 4px;
          opacity: 0.4;
          padding-top: 4px;
          width: 100%;
        }

        .context-menu-item a {
          align-items: center;
          border-radius: 3px;
          color: var(--foreground);
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
          background-color: var(--selection-background);
          color: var(--selection-foreground);
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
