import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-tabs')
export class VscodeTabs extends LitElement {
  @property({ type: Number }) selected: number = 0;

  constructor() {
    super();
    this.updateComplete.then(() => {
      const slot = this.shadowRoot.querySelector('slot');

      console.dir(slot);
      console.dir(slot.assignedElements());
      console.dir(slot.assignedNodes());
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <div>
        <b>tabs</b>
        <slot></slot>
      </div>
    `;
  }
}
