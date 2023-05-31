import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';
import declareThemeVariables from './includes/declareThemeVariables';
import defaultStyles from './includes/default.styles';

/**
 * @cssprop [--background=var(--vscode-panel--background)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 */
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
      defaultStyles,
      declareThemeVariables([
        {
          componentProp: '--focus-border',
          vscodeProp: '--vscode-focusBorder',
        },
        {
          componentProp: '--background',
          vscodeProp: '--vscode-panel-background',
        },
      ]),
      css`
        :host {
          display: block;
          overflow: hidden;
        }

        :host(:focus-visible) {
          outline-color: var(--focus-border);
          outline-offset: 3px;
          outline-style: solid;
          outline-width: 1px;
        }

        :host([panel]) {
          background-color: var(--background);
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
