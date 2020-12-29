import {LitElement, html, css, property, customElement} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';
// import icons from './codicons';

// const BASE_URL = getBaseURL();

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

  constructor() {
    super();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = (window as any).__VSCODE_WEBVIEW_ELEMENTS_CONFIG__;
    const nonce = config?.nonce || '';
    const cssHref =
      config?.codiconCssPath ||
      '../node_modules/vscode-codicons/dist/codicon.css';
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', cssHref);
    link.setAttribute('id', 'vscode-icon-injected-stylesheet');

    if (nonce) {
      link.setAttribute('nonce', nonce);
    }

    document.head.appendChild(link);
  }

  static get styles() {
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

  render() {
    return html`
      <link
        rel="stylesheet"
        href="../node_modules/vscode-codicons/dist/codicon.css"
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
