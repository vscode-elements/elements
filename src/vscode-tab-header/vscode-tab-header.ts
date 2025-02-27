import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-tab-header.styles.js';

/**
 * @tag vscode-tab-header
 *
 * @cssprop --vscode-foreground
 * @cssprop --vscode-panelTitle-inactiveForeground
 * @cssprop --vscode-panelTitle-activeForeground
 * @cssprop --vscode-panelTitle-activeBorder
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-settings-headerForeground
 */
@customElement('vscode-tab-header')
export class VscodeTabHeader extends VscElement {
  static override styles = styles;

  @property({type: Boolean, reflect: true})
  active = false;

  /** @internal */
  @property({reflect: true, attribute: 'aria-controls'})
  ariaControls = '';

  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  /** @internal */
  @property({reflect: true})
  override role = 'tab';

  /** @internal */
  @property({type: Number, reflect: true, attribute: 'tab-id'})
  tabId = -1;

  override attributeChangedCallback(
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

  override render(): TemplateResult {
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
