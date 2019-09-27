import { LitElement, html, css, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('vscode-context-menu')
export class VscodeContextMenu extends LitElement {
  @property({ type: String }) value: string;

  static get styles() {
    return css`
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
        color: var(--vscode-menu-foreground);
        padding: .5em 0;
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
        margin: 0 .8em .2em;
        opacity: .4;
        padding-top: .2em;
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
    `;
  };

  render() {
    return html`
      <div class="context-menu">
        <div class="context-menu-item">
          <a href="#">
            <span class="label">Command Palette...</span>
            <span class="keybinding">Ctrl+Shift+A</span>
          </a>
        </div>
        <div class="context-menu-item separator">
          <span class="rule"></span>
        </div>
        <div class="context-menu-item">
          <a href="#">
            <span class="label">Settings</span>
            <span class="keybinding">Ctrl+,</span>
          </a>
        </div>
        <div class="context-menu-item">
          <a href="#">
            <span class="label">Online Services Settings</span>
          </a>
        </div>
      </div>
    `;
  }
}
