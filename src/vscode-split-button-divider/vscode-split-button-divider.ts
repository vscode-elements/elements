import {css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';

/**
 * A divider to show between two buttons in a split button.
 *
 * @tag vscode-split-button-divider
 */
@customElement('vscode-split-button-divider')
export class VscodeSplitButtonDivider extends VscElement {
  static override get styles() {
    return css`
      :host {
        background-color: var(--vscode-button-background, #0078d4);
        padding: 4px 0;
        display: flex;
        box-sizing: border-box;
      }
      :host([secondary]) {
        background-color: var(--vscode-button-secondaryBackground, #313131);
      }
      div {
        background-color: var(--vscode-button-separator);
        width: 1px;
        margin: 0;
      }
    `;
  }

  /**
   * Button has a less prominent style.
   */
  @property({type: Boolean, reflect: true})
  secondary = false;

  override render() {
    return html`<div></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-button-divider': VscodeSplitButtonDivider;
  }
}
