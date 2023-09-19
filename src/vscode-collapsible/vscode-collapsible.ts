import {html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-collapsible.styles';

/**
 * @slot body - Main content.
 * @slot actions - You can place any action icon in this slot in the header, but it's also possible to use any HTML element in it. It's only visible when the component is open.
 * @slot decorations - The elements placed in the decorations slot are always visible.
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
  static styles = styles;

  /** Component heading text */
  @property({type: String})
  title = '';

  /** Less prominent text than the title in the header */
  @property()
  description = '';

  @property({type: Boolean, reflect: true})
  open = false;

  private _onHeaderClick() {
    this.open = !this.open;
  }

  private _onHeaderKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.open = !this.open;
    }
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

    const descriptionMarkup = this.description
      ? html`<span class="description">${this.description}</span>`
      : nothing;

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
          <h3 class="title">${this.title}${descriptionMarkup}</h3>
          <div class="header-slots">
            <div class="actions"><slot name="actions"></slot></div>
            <div class="decorations"><slot name="decorations"></slot></div>
          </div>
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
