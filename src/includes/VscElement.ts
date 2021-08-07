import {css, CSSResultGroup, LitElement} from 'lit';

export class VscElement extends LitElement {
  connectedCallback(): void {
    super.connectedCallback();

    if (this.hasAttribute('vsc-cloak')) {
      this.removeAttribute('vsc-cloak');
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host([hidden]) {
        display: none;
      }
    `;
  }
}
