import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-tab-header')
export class VscodeTabHeader extends VscElement {
  @property({type: Boolean, reflect: true})
  active = false;

  @property({reflect: true, attribute: 'aria-controls'})
  ariaControls = '';

  @property({reflect: true})
  role = 'tab';

  @property({type: Number, reflect: true, attribute: 'tab-id'})
  tabId = -1;

  @property({type: Number, reflect: true})
  tabindex = 0;

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);

    if (name === 'active') {
      this.ariaSelected = value !== null ? 'true' : 'false';
    }
  }

  static get observedAttributes(): string[] {
    return ['active'];
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          border-bottom: 1px solid transparent;
          color: var(--vscode-foreground);
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

        :host(:focus-visible) {
          border-bottom-color: var(--vscode-focusBorder);
          outline: none;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <slot name="content-before"></slot>
      <slot></slot>
      <slot name="content-after"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-header': VscodeTabHeader;
  }
}
