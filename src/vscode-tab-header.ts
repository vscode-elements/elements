import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from './includes/VscElement';

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
      super.styles,
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
          border-bottom-color: var(--vscode-settings-headerForeground);
          color: var(--vscode-settings-headerForeground);
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
          color: var(--vscode-foreground);
          display: flex;
          min-height: 20px;
          overflow: inherit;
          text-overflow: inherit;
          position: relative;
        }

        .wrapper.panel {
          color: var(--vscode-panelTitle-inactiveForeground);
        }

        .wrapper.panel.active,
        .wrapper.panel:hover {
          color: var(--vscode-panelTitle-activeForeground);
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
          border-top: 1px solid var(--vscode-panelTitle-activeBorder);
          bottom: 4px;
          display: block;
          left: 8px;
          pointer-events: none;
          position: absolute;
          right: 8px;
        }

        :host(:focus-visible) .wrapper {
          outline-color: var(--vscode-focusBorder);
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
