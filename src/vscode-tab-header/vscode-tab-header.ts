import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from '../includes/VscElement';
import declareThemeVariables from '../includes/declareThemeVariables';
import defaultStyles from '../includes/default.styles';

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

  static get styles(): CSSResultGroup {
    return [
      defaultStyles,
      declareThemeVariables([
        {
          componentProp: '--foreground',
          vscodeProp: '--vscode-foreground',
        },
        {
          componentProp: '--panel-inactive-foreground',
          vscodeProp: '--vscode-panelTitle-inactiveForeground',
        },
        {
          componentProp: '--panel-active-foreground',
          vscodeProp: '--vscode-panelTitle-activeForeground',
        },
        {
          componentProp: '--panel-active-border',
          vscodeProp: '--vscode-panelTitle-activeBorder',
        },
        {
          componentProp: '--focus-border',
          vscodeProp: '--vscode-focusBorder',
        },
        {
          componentProp: '--active-foreground',
          vscodeProp: '--vscode-settings-headerForeground',
        },
      ]),
      css`
        :host {
          border-bottom: 1px solid transparent;
          cursor: pointer;
          display: block;
          margin-bottom: -1px;
          overflow: hidden;
          padding: 7px 8px;
          text-overflow: ellipsis;
          user-select: none;
          white-space: nowrap;
        }

        :host([active]) {
          border-bottom-color: var(--active-foreground);
          color: var(--active-foreground);
        }

        :host([panel]) {
          border-bottom: 0;
          margin-bottom: 0;
          padding: 0;
        }

        :host(:focus-visible) {
          outline: none;
        }

        .wrapper {
          align-items: center;
          color: var(--foreground);
          display: flex;
          min-height: 20px;
          overflow: inherit;
          text-overflow: inherit;
          position: relative;
        }

        .wrapper.panel {
          color: var(--panel-inactive-foreground);
        }

        .wrapper.panel.active,
        .wrapper.panel:hover {
          color: var(--panel-active-foreground);
        }

        :host([panel]) .wrapper {
          display: flex;
          font-size: 11px;
          height: 31px;
          padding: 2px 10px;
          text-transform: uppercase;
        }

        .main {
          overflow: inherit;
          text-overflow: inherit;
        }

        .active-indicator {
          display: none;
        }

        .active-indicator.panel.active {
          border-top: 1px solid var(--panel-active-border);
          bottom: 4px;
          display: block;
          left: 8px;
          pointer-events: none;
          position: absolute;
          right: 8px;
        }

        :host(:focus-visible) .wrapper {
          outline-color: var(--focus-border);
          outline-offset: 3px;
          outline-style: solid;
          outline-width: 1px;
        }

        :host(:focus-visible) .wrapper.panel {
          outline-offset: -2px;
        }

        slot[name='content-before']::slotted(vscode-badge) {
          margin-right: 8px;
        }

        slot[name='content-after']::slotted(vscode-badge) {
          margin-left: 8px;
        }
      `,
    ];
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
