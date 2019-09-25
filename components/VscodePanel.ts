import { LitElement, html, css, property, customElement } from 'lit-element';
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
        margin: 0 3px;
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

      slot[name=actions]::slotted(div .aa) {
        margin: 0 8px;
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

    return html`
      <div class="${classes}">
        <div
          class="panel-header"
          tabindex="${this.tabIndex}"
          title="${this.title}"
          @click="${this.onHeaderClick}"
        >
          <vscode-icon name="chevron-right" class="header-icon"></vscode-icon>
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
