import { LitElement, html, css, property, customElement } from "lit-element";

@customElement('greeter-element')
export class GreeterElement extends LitElement {
  @property({ type: String }) name = 'World';
  @property({ type: String }) color = 'red';
  @property({ type: Number }) counter = 0;

  private randomColor = (): string => {
    return this.colors[Math.floor(Math.random() * 3)];
  };

  private colors: string[] = ['red', 'green', 'blue'];

  static get styles() {
    return css`
      :host {
        font-size: 20px;
        user-select: none;
      }
    `;
  }

  render() {
    return html`
      <style>
        :host {
          color: ${this.color};
        }
      </style>
      <p @click="${this.onElementClick}">Hello, ${this.name}! ${this.counter}</p>
    `;
  }

  onElementClick(): void {
    this.color = this.randomColor();
    this.counter++;
  }
}
