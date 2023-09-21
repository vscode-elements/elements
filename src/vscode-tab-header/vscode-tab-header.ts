import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-tab-header.styles.js';

/**
 * @cssprop [--foreground=var(--vscode-foreground)]
 * @cssprop [--panel-inactive-foreground=var(--vscode-panelTitle-inactiveForeground)]
 * @cssprop [--panel-active-foreground=var(--vscode-panelTitle-activeForeground)]
 * @cssprop [--panel-active-border=var(--vscode-panelTitle-activeBorder)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 * @cssprop [--active-foreground=var(--vscode-settings-headerForeground)]
 */
@customElement('vscode-tab-header')
export class VscodeTabHeader extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  active = false;

  @property({reflect: true, attribute: 'aria-controls'})
  ariaControls = '';

  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  @property({reflect: true})
  role = 'tab';

  @property({type: Number, reflect: true, attribute: 'tab-id'})
  tabId = -1;

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);

    if (name === 'active') {
      const active = value !== null;
      this.ariaSelected = active ? 'true' : 'false';
      this.tabIndex = active ? 0 : -1;
    }
  }

  render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          active: this.active,
          panel: this.panel,
        })}
      >
        <div class="before"><slot name="content-before"></slot></div>
        <div class="main"><slot></slot></div>
        <div class="after"><slot name="content-after"></slot></div>
        <span
          class=${classMap({
            'active-indicator': true,
            active: this.active,
            panel: this.panel,
          })}
        ></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-header': VscodeTabHeader;
  }
}
