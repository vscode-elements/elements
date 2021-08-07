import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators';
import {VscElement} from './includes/VscElement';

@customElement('vscode-form-control')
export class VscodeFormControl extends VscElement {
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
