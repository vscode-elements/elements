import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import declareThemeVariables from './includes/declareThemeVariables';
import {VscElement} from './includes/VscElement';

/**
 * @slot body - Main content
 * @slot actions - Action icons in the header
 *
 * @cssprop [--background=var(--vscode-sideBar-background)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--header-background=var(--vscode-sideBarSectionHeader-background)]
 * @cssprop [--icon-foreground=var(--vscode-icon-foreground)]
 * @cssprop [--title-foreground=var(--vscode-sideBarTitle-foreground)]
 */
@customElement('vscode-collapsible')
export class VscodeCollapsible extends VscElement {
  @property({type: String})
  title = '';

  // A number displayed to the right of the collapsible header.
  @property({type: Number})
  count = 0;

  @property({type: String})
  subtitle = '';

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
    return [
      super.styles,
      declareThemeVariables([
        {
          componentProp: '--background',
          vscodeProp: '--vscode-sideBar-background',
        },
        {
          componentProp: '--focus-border',
          vscodeProp: '--vscode-focusBorder',
        },
        {
          componentProp: '--font-family',
          vscodeProp: '--vscode-font-family',
        },
        {
          componentProp: '--header-background',
          vscodeProp: '--vscode-sideBarSectionHeader-background',
        },
        {
          componentProp: '--icon-foreground',
          vscodeProp: '--vscode-icon-foreground',
        },
        {
          componentProp: '--title-foreground',
          vscodeProp: '--vscode-sideBarTitle-foreground',
        },
      ]),
      css`
        .collapsible {
          background-color: var(--background);
        }

        .collapsible-header {
          align-items: center;
          background-color: var(--header-background);
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
          outline-color: var(--focus-border);
          border-left: 4px solid var(--focus-border);
        }

        .collapsible-header h3 {
          color: var(--title-foreground);
          font-family: var(--font-family);
          font-size: 11px;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        .header-icon {
          color: var(--icon-foreground);
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
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          border-left: 1px solid var(--vscode-activityBar-inactiveForeground);
          padding-left: 10px;
          font-family: var(--vscode-editor-font-family)
            var(--vscode-font-family);
        }

        .collapsible.open .collapsible-body > div {
          padding-left: 10px;
        } 

        .collapsible-count {
          color: var(--vscode-charts-yellow);
          margin-left: auto;
          padding-right: 10px;
        }

        .dot {
          padding: 0px 6px;
        }

        .subtitle {
          color: var(--vscode-breadcrumb-foreground);
          font-famiy: var(--vscode-editor-font-family),
            var(--vscode-font-family);
        }

        @media only screen and (max-width: 400px) {
          .collapsible-header {
          }
        }
      `,
    ];
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

    const countMarkup =
      this.count > 0
        ? html`<div class="collapsible-count">${this.count}</div>`
        : '';

    const subtitleMarkup = this.subtitle
      ? html`
          <span class="dot"> • </span>
          <span class="subtitle"> ${this.subtitle} </span>
        `
      : '';

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
          ${subtitleMarkup}
          <div class="actions"><slot name="actions"></slot></div>
          ${countMarkup}
        </div>
        <div class="collapsible-body">
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
