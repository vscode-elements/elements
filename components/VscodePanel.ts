import { LitElement, html, css, svg, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('vscode-panel')
export class VscodePanel extends LitElement {
  @property({ type: Number }) tabIndex: number = 0;
  @property({ type: String }) title: string;
  @property({ type: Boolean }) open: boolean;

  private onHeaderClick() {
    this.open = !this.open;
  }

  static get styles() {
    return css`
      .panel {
        background-color: var(--vscode-sideBar-background);
      }

      .panel-header {
        align-items: center;
        background-color: var(--vscode-sideBarSectionHeader-background);
        cursor: pointer;
        display: flex;
        height: 22px;
        line-height: 22px;
        user-select: none;
      }

      .panel-header:focus {
        opacity: 1;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
        outline-color: var(--vscode-focusBorder);
      }

      .panel-header h3 {
        color: var(--vscode-sideBarTitle-foreground);
        font-size: 11px;
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
      }

      .header-icon {
        display: block;
        height: 16px;
        margin: 0 3px;
        width: 16px;
      }

      :host-context(body.vscode-light) .header-icon path {
        fill: #424242;
      }

      :host-context(body.vscode-dark) .header-icon path,
      :host-context(body.vscode-high-contrast) .header-icon path {
        fill: #c5c5c5;
      }

      .panel.open .header-icon {
        transform: rotate(90deg);
      }

      .actions {
        margin-left: auto;
        margin-right: 4px;
        opacity: 0;
      }

      .panel:hover .actions {
        opacity: 1;
      }

      slot[name=actions]::slotted(div) {
        align-items: center;
        display: flex;
      }

      .panel-body {
        display: none;
        overflow: hidden;
      }

      .panel.open .panel-body {
        display: block;
      }
    `;
  }

  render() {
    const classes = classMap({ panel: true, open: this.open });

    const icon = svg`
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="header-icon">
        <path d="M5.7 13.7L5 13l4.6-4.6L5 3.7l.7-.7 5 5v.7l-5 5z"/>
      </svg>
    `;

    return html`
      <div class="${classes}">
        <div
          class="panel-header"
          tabindex="${this.tabIndex}"
          title="${this.title}"
          @click="${this.onHeaderClick}"
        >
          ${icon}
          <h3 class="title">${this.title}</h3>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
        <div class="panel-body">
          <div>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
