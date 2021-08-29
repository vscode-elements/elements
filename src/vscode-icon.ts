import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-icon')
export class VscodeIcon extends VscElement {
  /**
   * Codicon icon name. @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  @property({type: String}) name = '';

  /**
   * Icon size in pixels
   */
  @property({type: Number}) size = 16;

  /**
   * Enable rotation animation
   */
  @property({type: Boolean}) spin = false;

  /**
   * Animation duration in seconds
   */
  @property({type: Number, attribute: 'spin-duration'}) spinDuration = 1.5;

  @property({type: Boolean, attribute: 'action-icon'})
  set actionIcon(val: boolean) {
    this._actionIcon = val;

    if (val) {
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'button');
      }
    } else {
      if (this.hasAttribute('role') && this.getAttribute('role') === 'button') {
        this.removeAttribute('role');
      }
    }
  }
  get actionIcon(): boolean {
    return this._actionIcon;
  }

  private _actionIcon = false;

  private _getStylesheetConfig(): {
    href: string | undefined;
    nonce: string | undefined;
  } {
    const linkElement = document.getElementById('vscode-codicon-stylesheet');
    const href = linkElement?.getAttribute('href') || undefined;
    const nonce = linkElement?.getAttribute('nonce') || undefined;

    return {nonce, href};
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          color: var(--vscode-icon-foreground);
          display: inline-block;
        }

        .codicon[class*='codicon-'] {
          display: block;
        }

        .wrapper {
          display: block;
        }

        :host([action-icon]) .wrapper {
          border-radius: 5px;
          cursor: pointer;
          padding: 3px;
        }

        :host([action-icon]) .wrapper:hover {
          background-color: var(--vscode-toolbar-hoverBackground);
        }

        :host([action-icon]) .wrapper:active {
          background-color: var(--vscode-toolbar-activeBackground);
        }

        :host([action-icon]:focus) {
          outline: none;
        }

        :host([action-icon]:focus-visible) {
          outline: 1px solid var(--vscode-focusBorder);
          outline-offset: -1px;
        }

        @keyframes icon-spin {
          100% {
            transform: rotate(360deg);
          }
        }

        .spin {
          animation-name: icon-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `,
    ];
  }

  render(): TemplateResult {
    const {href, nonce} = this._getStylesheetConfig();

    return html`
      <link
        rel="stylesheet"
        href="${ifDefined(href)}"
        nonce="${ifDefined(nonce)}"
      />
      <span class="wrapper">
        <span
          class="${classMap({
            codicon: true,
            ['codicon-' + this.name]: true,
            spin: this.spin,
          })}"
          style="${styleMap({
            animationDuration: String(this.spinDuration) + 's',
            fontSize: this.size + 'px',
            height: this.size + 'px',
            width: this.size + 'px',
          })}"
        ></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-icon': VscodeIcon;
  }
}
