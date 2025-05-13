import {html, nothing, TemplateResult} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-key-label.styles.js';
import {property} from 'lit/decorators.js';

/**
 *
 */
@customElement('vscode-key-label')
export class VscodeKeyLabel extends VscElement {
  static override styles = styles;

  @property({reflect: true, attribute: 'text-before'})
  textBefore = '';

  @property({reflect: true, attribute: 'text-after'})
  textAfter = '';

  override render(): TemplateResult {
    return html`
      <div class="wrapper">
        ${this.textBefore
          ? html`<div class="before">${this.textBefore}</div>`
          : nothing}
        <div class="key"><slot></slot></div>
        ${this.textAfter
          ? html`<div class="after">${this.textAfter}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-key-label': VscodeKeyLabel;
  }
}
