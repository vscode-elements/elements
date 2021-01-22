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
import {classMap} from 'lit-html/directives/class-map';

const HANDLE_SIZE = 4;

@customElement('vscode-split-layout')
export class SplitLayout extends LitElement {
  @property()
  split: 'horizontal' | 'vertical' = 'vertical';

  @property({type: Boolean})
  resetOnDblClick = false;

  @property()
  initialPos = '50%';

  @internalProperty() _startPaneRight = 0;
  @internalProperty() _startPaneBottom = 0;
  @internalProperty() _endPaneTop = 0;
  @internalProperty() _endPaneLeft = 0;
  @internalProperty() _handleLeft = 0;
  @internalProperty() _handleTop = 0;
  @internalProperty() _isDragActive = false;

  private _boundRect: DOMRect = new DOMRect();
  private _handleOffset = 0;

  connectedCallback(): void {
    super.connectedCallback();

    this._boundRect = this.getBoundingClientRect();

    this._initPosition();
  }

  private _initPosition() {
    const {height, width} = this._boundRect;
    const maxPos = this.split === 'vertical' ? width : height;
    const matches = /(^[0-9.]+)(%{0,1})$/.exec(this.initialPos);
    let pos = 0;
    let numericVal = 0;

    if (matches) {
      numericVal = parseFloat(matches[1]);
    }

    if (matches && matches[2] === '%') {
      pos = Math.min(maxPos, maxPos / 100 * numericVal);
    } else if (matches && matches[2] !== '%') {
      pos = Math.min(numericVal, maxPos);
    } else {
      pos = maxPos / 2;
    }

    if (this.split === 'vertical') {
      this._startPaneRight = maxPos - pos;
      this._endPaneLeft = pos;
      this._handleLeft = pos;
    }

    if (this.split === 'horizontal') {
      this._startPaneBottom = maxPos - pos;
      this._endPaneTop = pos;
      this._handleTop = pos;
    }
  }

  private _handleMouseDown(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    const mouseXLocal = event.clientX - this._boundRect.left;
    const mouseYLocal = event.clientY - this._boundRect.top;

    if (this.split === 'vertical') {
      this._handleOffset = mouseXLocal - this._handleLeft;
    }

    if (this.split === 'horizontal') {
      this._handleOffset = mouseYLocal - this._handleTop;
    }

    this._boundRect = this.getBoundingClientRect();
    this._isDragActive = true;

    window.addEventListener('mouseup', this._handleMouseUpBound);
    window.addEventListener('mousemove', this._handleMouseMoveBound);
  }

  private _handleMouseUp() {
    this._isDragActive = false;
    window.removeEventListener('mouseup', this._handleMouseUpBound);
    window.removeEventListener('mousemove', this._handleMouseMoveBound);
  }

  private _handleMouseUpBound = this._handleMouseUp.bind(this);

  private _handleMouseMove(event: MouseEvent) {
    const {clientX, clientY} = event;
    const {left, top, height, width} = this._boundRect;

    if (this.split === 'vertical') {
      const mouseXLocal = clientX - left;

      this._handleLeft = Math.max(
        0,
        Math.min(mouseXLocal - this._handleOffset, width)
      );
      this._startPaneRight = Math.max(0, width - this._handleLeft);
      this._endPaneLeft = this._handleLeft;
    }

    if (this.split === 'horizontal') {
      const mouseYLocal = clientY - top;

      this._handleTop = Math.max(
        0,
        Math.min(mouseYLocal - this._handleOffset, height)
      );
      this._startPaneBottom = Math.max(0, height - this._handleTop);
      this._endPaneTop = this._handleTop;
    }
  }

  private _handleMouseMoveBound = this._handleMouseMove.bind(this);

  private _handleDblClick() {
    if (!this.resetOnDblClick) {
      return;
    }

    this._initPosition();
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        overflow: hidden;
        position: relative;
      }

      .start {
        left: 0;
        top: 0;
        overflow: hidden;
        position: absolute;
      }

      .end {
        bottom: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
      }

      .handle-overlay {
        display: none;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
      }

      .handle-overlay.active {
        display: block;
      }

      .handle-overlay.split-vertical {
        cursor: ew-resize;
      }

      .handle-overlay.split-horizontal {
        cursor: ns-resize;
      }

      .handle {
        position: absolute;
        z-index: 2;
      }

      .handle.split-vertical {
        cursor: ew-resize;
        height: 100%;
        margin-left: ${0 - HANDLE_SIZE / 2}px;
        width: ${HANDLE_SIZE}px;
      }

      .handle.split-horizontal {
        cursor: ns-resize;
        height: ${HANDLE_SIZE}px;
        margin-top: ${0 - HANDLE_SIZE / 2}px;
        width: 100%;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <style>
        .start {
          bottom: ${this._startPaneBottom}px;
          right: ${this._startPaneRight}px;
        }

        .end {
          top: ${this._endPaneTop}px;
          left: ${this._endPaneLeft}px;
        }

        .handle {
          left: ${this._handleLeft}px;
          top: ${this._handleTop}px;
        }
      </style>
      <div class="start"><slot name="start"></slot></div>
      <div class="end"><slot name="end"></slot></div>
      <div
        class="${classMap({
          'handle-overlay': true,
          active: this._isDragActive,
          'split-vertical': this.split === 'vertical',
          'split-horizontal': this.split === 'horizontal',
        })}"
      ></div>
      <div
        class="${classMap({
          handle: true,
          'split-vertical': this.split === 'vertical',
          'split-horizontal': this.split === 'horizontal',
        })}"
        @mousedown="${this._handleMouseDown}"
        @dblclick="${this._handleDblClick}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-layout': SplitLayout;
  }
}
