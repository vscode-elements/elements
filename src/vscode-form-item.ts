import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-form-item')
export class VscodeFormItem extends VscElement {
  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 12px 0 18px;
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
    'vscode-form-item': VscodeFormItem;
  }
}
