import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';
import {INPUT_LINE_HEIGHT_RATIO} from './includes/helpers';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('vscode-label')
export class VscodeLabel extends LitElement {
  @property({type: Boolean})
  colon = false;

  @property({type: Boolean})
  required = false;

  @property({type: Boolean})
  wrap = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    .wrapper {
      color: var(--vscode-font-color);
      font-size: var(--vscode-font-size);
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      padding: 5px 0;
    }
  `;

  render(): TemplateResult {
    return html` <div class="wrapper"><slot></slot></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-label': VscodeLabel;
  }
}
