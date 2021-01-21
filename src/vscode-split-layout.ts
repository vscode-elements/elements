import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  CSSResult,
  internalProperty,
} from 'lit-element';

@customElement('vscode-split-layout')
export class SplitLayout extends LitElement {
  @internalProperty() _startPanTop = 0;
  @internalProperty() _startPanRight = 0;
  @internalProperty() _startPanBottom = 0;
  @internalProperty() _startPanLeft = 0;
  @internalProperty() _endPanTop = 0;
  @internalProperty() _endPanRight = 0;
  @internalProperty() _endPanBottom = 0;
  @internalProperty() _endPanLeft = 0;

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        position: relative;
      }

      .start {
        background-color: red;
        position: absolute;
      }

      .end {
        background-color: blue;
        position: absolute;
      }
    `;
  }

  @property()
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  connectedCallback(): void {
    super.connectedCallback();

    const { left, top, width, height } = this.getBoundingClientRect();

    if (this.orientation === 'horizontal') {
      this._startPanRight = (width - left) / 2;
      this._endPanLeft = (width - left) / 2;
    }
  }

  render(): TemplateResult {
    return html`
      <style>
        .start {
          top: 0;
          bottom: 0;
          right: ${this._startPanRight}px;
          left: 0;
        }

        .end {
          top: 0;
          bottom: 0;
          right: 0;
          left: ${this._endPanLeft}px;
        }
      </style>
      <div class="start"><slot name="start"></slot></div>
      <div class="handle"></div>
      <div class="end"><slot name="end"></slot></div>
    `;
  }

  foo(): string {
    return 'foo';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-layout': SplitLayout;
  }
}
