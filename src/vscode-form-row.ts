import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('vscode-form-row')
export class VscodeFormRow extends LitElement {
  static styles = css`
    :host {
      display: block;
      line-height: 28px;
      margin: 15px 0;
    }

    .inline ::slotted(*) {
      vertical-align: middle;
    }
  `;

  @property({type: Boolean, reflect: true})
  inline = false;

  render(): TemplateResult {
    return html`<div class="${this.inline ? 'inline' : 'block'}">
      <slot></slot>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-row': VscodeFormRow;
  }
}
