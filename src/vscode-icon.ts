import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  TemplateResult,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';
import {ifDefined} from 'lit-html/directives/if-defined';

@customElement('vscode-icon')
export class VscodeIcon extends LitElement {
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

  private _getStylesheetConfig(): {
    href: string | undefined;
    nonce: string | undefined;
  } {
    const linkElement = document.getElementById('vscode-codicon-stylesheet');
    const href = linkElement?.getAttribute('href') || undefined;
    const nonce = linkElement?.getAttribute('nonce') || undefined;

    return {nonce, href};
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
      }

      .codicon[class*='codicon-'] {
        display: block;
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
    `;
  }

  render(): TemplateResult {
    const {href, nonce} = this._getStylesheetConfig();

    return html`
      <link
        rel="stylesheet"
        href="${ifDefined(href)}"
        nonce="${ifDefined(nonce)}"
      />
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-icon': VscodeIcon;
  }
}
