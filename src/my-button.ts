import {LitElement, html, customElement, property} from 'lit-element';

/**
 * A custom button element.
 */
@customElement('my-button')
export class MyButton extends LitElement {
  /**
   * The label of the button
   */
  @property()
  label = 'My button';

  render() {
    return html`
      <button>${this.label}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button': MyButton;
  }
}
