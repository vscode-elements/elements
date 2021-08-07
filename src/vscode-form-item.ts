import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('vscode-form-item')
export class VscodeFormItem extends LitElement {
  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        padding: 12px 0 18px;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-item': VscodeFormItem;
  }
}
