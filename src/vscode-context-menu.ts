import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';
import {VscElement} from './includes/VscElement';
import './vscode-context-menu-item';

interface MenuItemData {
  label: string;
  keybinding?: string;
  value?: string;
  separator?: boolean;
  tabindex?: number;
}

@customElement('vscode-context-menu')
export class VscodeContextMenu extends VscElement {
  /** <pre><code>interface MenuItemData {
   * &nbsp;&nbsp;label: string;
   * &nbsp;&nbsp;keybinding?: string;
   * &nbsp;&nbsp;value?: string;
   * &nbsp;&nbsp;separator?: boolean;
   * &nbsp;&nbsp;tabindex?: number;
   * }</code></pre>
   */
  @property({type: Array}) data: MenuItemData[] = [];
  // TODO: hide on item click
  @property({type: Boolean, reflect: true}) show = false;

  private onItemClick(event: CustomEvent) {
    const {detail} = event;

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail,
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
          position: relative;
        }

        .context-menu {
          background-color: var(--vscode-menu-background);
          box-shadow: 0 2px 8px var(--vscode-widget-shadow);
          color: var(--vscode-menu-foreground);
          padding: 0.5em 0;
          white-space: nowrap;
        }

        .context-menu-item {
          border: 1px solid transparent;
          display: flex;
          user-select: none;
        }

        .rule {
          border-bottom: 1px solid var(--vscode-menu-separatorBackground);
          display: block;
          margin: 0 0.8em 0.2em;
          opacity: 0.4;
          padding-top: 0.2em;
          width: 100%;
        }

        .context-menu-item a {
          align-items: center;
          color: var(--vscode-menu-foreground);
          cursor: default;
          display: flex;
          flex: 1 1 auto;
          height: 2em;
          outline: none;
          position: relative;
          text-decoration: inherit;
        }

        .context-menu-item a:hover,
        .context-menu-item a:focus {
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
    const menu = html`
      <div class="context-menu">
        ${this.data
          ? this.data.map(
              ({
                label = '',
                keybinding = '',
                value = '',
                separator = false,
                tabindex = 0,
              }) => html`
                <vscode-context-menu-item
                  label="${label}"
                  keybinding="${keybinding}"
                  value="${value}"
                  ?separator="${separator}"
                  tabindex="${tabindex}"
                  @vsc-click="${this.onItemClick}"
                ></vscode-context-menu-item>
              `
            )
          : html`<slot></slot>`}
      </div>
    `;

    return html` ${this.show ? menu : nothing} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-context-menu': VscodeContextMenu;
  }
}
