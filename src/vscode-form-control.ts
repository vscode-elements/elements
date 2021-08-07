import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators';

@customElement('vscode-form-control')
export class VscodeFormControl extends LitElement {
  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        margin-top: 9px;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-control': VscodeFormControl;
  }
}
