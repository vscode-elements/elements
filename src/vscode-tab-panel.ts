import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-tab-panel')
export class VscodeTabPanel extends VscElement {
  @property({type: Boolean, reflect: true})
  hidden = false;

  @property({reflect: true, attribute: 'aria-labelledby'})
  ariaLabelledby = '';

  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  @property({reflect: true})
  role = 'tabpanel';

  @property({type: Number, reflect: true})
  tabindex = 0;

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          overflow: hidden;
        }

        :host(:focus-visible) {
          outline-color: var(--vscode-focusBorder);
          outline-offset: 3px;
          outline-style: solid;
          outline-width: 1px;
        }

        :host([panel]) {
          background-color: var(--vscode-panel-background);
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tab-panel': VscodeTabPanel;
  }
}
