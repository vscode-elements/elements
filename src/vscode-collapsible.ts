import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';
import {classMap} from 'lit/directives/class-map';
import {VscElement} from './includes/VscElement';

/**
 * @slot body - Main content
 * @slot actions - Action icons in the header
 */
@customElement('vscode-collapsible')
export class VscodeCollapsible extends VscElement {
  @property({type: String})
  title = '';

  @property({type: Boolean})
  open = false;

  private _onHeaderClick() {
    this.open = !this.open;
  }

  private _onHeaderKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.open = !this.open;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .collapsible {
        background-color: var(--vscode-sideBar-background);
      }

      .collapsible-header {
        align-items: center;
        background-color: var(--vscode-sideBarSectionHeader-background);
        cursor: pointer;
        display: flex;
        height: 22px;
        line-height: 22px;
        user-select: none;
      }

      .collapsible-header:focus {
        opacity: 1;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
        outline-color: var(--vscode-focusBorder);
      }

      .collapsible-header h3 {
        color: var(--vscode-sideBarTitle-foreground);
        font-size: 11px;
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
      }

      .header-icon {
        color: var(--vscode-icon-foreground);
        display: block;
        margin: 0 3px;
      }

      .collapsible.open .header-icon {
        transform: rotate(90deg);
      }

      .actions {
        display: none;
        margin-left: auto;
        margin-right: 4px;
      }

      .collapsible.open .actions {
        display: block;
      }

      slot[name='actions']::slotted(div) {
        align-items: center;
        display: flex;
      }

      .collapsible-body {
        display: none;
        overflow: hidden;
      }

      .collapsible.open .collapsible-body {
        display: block;
      }
    `;
  }

  render(): TemplateResult {
    const classes = classMap({collapsible: true, open: this.open});

    const icon = html`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="header-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
      />
    </svg>`;

    return html`
      <div class="${classes}">
        <div
          class="collapsible-header"
          tabindex="0"
          title="${this.title}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeyDown}"
        >
          ${icon}
          <h3 class="title">${this.title}</h3>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
        <div class="collapsible-body">
          <div>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-collapsible': VscodeCollapsible;
  }
}
