import {css, CSSResultGroup, LitElement} from 'lit';

export class VscElement extends LitElement {
  static get styles(): CSSResultGroup {
    return css`
      :host([hidden]) {
        display: none;
      }
    `;
  }
}
