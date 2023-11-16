import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-icon.styles.js';

/**
 * Display a [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html).
 * In "action-icon" mode it behaves like a button. In this case, it is
 * recommended that a meaningful label is specified with the `label` property.
 *
 * @cssprop --vscode-icon-foreground
 * @cssprop --vscode-toolbar-hoverBackground - Hover state background color in `active-icon` mode
 * @cssprop --vscode-toolbar-activeBackground - Active state background color in `active-icon` mode
 * @cssprop --vscode-focusBorder
 */
@customElement('vscode-icon')
export class VscodeIcon extends VscElement {
  static styles = styles;
  /**
   * Set a meaningful label in `action-icon` mode for the screen readers
   */
  @property()
  label = '';

  /**
   * [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) icon name.
   */
  @property({type: String})
  name = '';

  /**
   * Icon size in pixels
   */
  @property({type: Number})
  size = 16;

  /**
   * Enable rotation animation
   */
  @property({type: Boolean, reflect: true})
  spin = false;

  /**
   * Animation duration in seconds
   */
  @property({type: Number, attribute: 'spin-duration'})
  spinDuration = 1.5;

  /**
   * Behaves like a button
   */
  @property({type: Boolean, reflect: true, attribute: 'action-icon'})
  actionIcon = false;

  private static stylesheetHref: string | undefined = '';

  private static nonce: string | undefined = '';

  connectedCallback(): void {
    super.connectedCallback();

    const {href, nonce} = this._getStylesheetConfig();

    VscodeIcon.stylesheetHref = href;
    VscodeIcon.nonce = nonce;
  }

  /**
   * For using web fonts in web components, the font stylesheet must be included
   * twice: on the page and in the web component. This function looks for the
   * font stylesheet on the page and returns the stylesheet URL and the nonce
   * id.
   */
  private _getStylesheetConfig(): {
    href: string | undefined;
    nonce: string | undefined;
  } {
    const linkElement = document.getElementById('vscode-codicon-stylesheet');
    const href = linkElement?.getAttribute('href') || undefined;
    const nonce = linkElement?.getAttribute('nonce') || undefined;

    return {nonce, href};
  }

  private _onButtonClick = (ev: MouseEvent) => {
    this.dispatchEvent(
      new CustomEvent('vsc-click', {detail: {originalEvent: ev}})
    );
  };

  render(): TemplateResult {
    const {stylesheetHref, nonce} = VscodeIcon;

    const content = html`<span
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
    ></span>`;

    const wrapped = this.actionIcon
      ? html` <button
          class="button"
          @click=${this._onButtonClick}
          aria-label=${this.label}
        >
          ${content}
        </button>`
      : html` <span class="icon" aria-hidden="true" role="presentation"
          >${content}</span
        >`;

    return html`
      <link
        rel="stylesheet"
        href="${ifDefined(stylesheetHref)}"
        nonce="${ifDefined(nonce)}"
      />
      ${wrapped}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-icon': VscodeIcon;
  }
}
