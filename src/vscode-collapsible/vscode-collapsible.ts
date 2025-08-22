import {html, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {chevronRightIcon} from '../includes/icons.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-collapsible.styles.js';

export type VscCollapsibleToggleEvent = CustomEvent<{open: boolean}>;

/**
 * Allows users to reveal or hide related content on a page.
 *
 * @tag vscode-collapsible
 *
 * @slot - Main content.
 * @slot actions - You can place any action icon in this slot in the header, but it's also possible to use any HTML element in it. It's only visible when the component is open.
 * @slot decorations - The elements placed in the decorations slot are always visible.
 *
 * @fires {VscCollapsibleToggleEvent} vsc-collapsible-toggle - Dispatched when the content visibility is changed.
 *
 * @cssprop [--vscode-sideBar-background=#181818] - Background color
 * @cssprop [--vscode-focusBorder=#0078d4] - Focus border color
 * @cssprop [--vscode-font-family=sans-serif] - Header font family
 * @cssprop [--vscode-sideBarSectionHeader-background=#181818] - Header background
 * @cssprop [--vscode-icon-foreground=#cccccc] - Arrow icon color
 * @cssprop [--vscode-sideBarTitle-foreground=#cccccc] - Header font color
 *
 * @csspart body - Container for the toggleable content of the component. The container's overflow content is hidden by default. This CSS part can serve as an escape hatch to modify this behavior.
 */
@customElement('vscode-collapsible')
export class VscodeCollapsible extends VscElement {
  static override styles = styles;

  /**
   * When enabled, header actions are always visible; otherwise, they appear only when the cursor
   * hovers over the component. Actions are shown only when the Collapsible component is open. This
   * property is designed to use the `workbench.view.alwaysShowHeaderActions` setting.
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'always-show-header-actions',
  })
  alwaysShowHeaderActions = false;

  /**
   * Component heading text
   *
   * @deprecated The `title` is a global HTML attribute and will unintentionally trigger a native
   * tooltip on the component. Use the `heading` property instead.
   */
  @property({type: String})
  override title: string = '';

  /**
   * Heading text.
   */
  @property()
  heading = '';

  /** Less prominent text in the header. */
  @property()
  description = '';

  @property({type: Boolean, reflect: true})
  open = false;

  private _emitToggleEvent() {
    this.dispatchEvent(
      new CustomEvent('vsc-collapsible-toggle', {
        detail: {open: this.open},
      }) as VscCollapsibleToggleEvent
    );
  }

  private _onHeaderClick() {
    this.open = !this.open;
    this._emitToggleEvent();
  }

  private _onHeaderKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.open = !this.open;
      this._emitToggleEvent();
    }
  }

  override render(): TemplateResult {
    const classes = {collapsible: true, open: this.open};
    const actionsClasses = {
      actions: true,
      'always-visible': this.alwaysShowHeaderActions,
    };
    const heading = this.heading ? this.heading : this.title;

    const descriptionMarkup = this.description
      ? html`<span class="description">${this.description}</span>`
      : nothing;

    return html`
      <div class=${classMap(classes)}>
        <div
          class="collapsible-header"
          tabindex="0"
          @click=${this._onHeaderClick}
          @keydown=${this._onHeaderKeyDown}
        >
          <div class="header-icon">${chevronRightIcon}</div>
          <h3 class="title">${heading}${descriptionMarkup}</h3>
          <div class="header-slots">
            <div class=${classMap(actionsClasses)}>
              <slot name="actions"></slot>
            </div>
            <div class="decorations"><slot name="decorations"></slot></div>
          </div>
        </div>
        <div class="collapsible-body" part="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-collapsible': VscodeCollapsible;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-collapsible-toggle': VscCollapsibleToggleEvent;
  }
}
