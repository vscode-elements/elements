import {html, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-split-layout.styles.js';

const HANDLE_SIZE = 4;

/**
 * @cssprop [--hover-border=var(--vscode-sash-hoverBorder)]
 */
@customElement('vscode-split-layout')
export class VscodeSplitLayout extends VscElement {
  static styles = styles;

  @property()
  split: 'horizontal' | 'vertical' = 'vertical';

  @property({type: Boolean, reflect: true,  attribute: 'reset-on-dbl-click'})
  resetOnDblClick = false;

  @property({attribute: 'initial-pos'})
  initialPos = '50%';

  @state()
  private _startPaneRight = 0;

  @state()
  private _startPaneBottom = 0;

  @state()
  private _endPaneTop = 0;

  @state()
  private _endPaneLeft = 0;

  @state()
  private _handleLeft = 0;

  @state()
  private _handleTop = 0;

  @state()
  private _isDragActive = false;

  @state()
  private _hover = false;

  @state()
  private _hide = false;

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
      pos = Math.min(maxPos, (maxPos / 100) * numericVal);
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

  private _handleMouseOver() {
    this._hover = true;
    this._hide = false;
  }

  private _handleMouseOut(event: MouseEvent) {
    if (event.buttons !== 1) {
      this._hover = false;
      this._hide = true;
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

  render(): TemplateResult {
    const startPaneStyles = styleMap({
      bottom: `${this._startPaneBottom}px`,
      right: `${this._startPaneRight}px`,
    });

    const endPaneStyles = styleMap({
      left: `${this._endPaneLeft}px`,
      top: `${this._endPaneTop}px`,
    });

    const handleStylesPropObj: {[prop: string]: string} = {
      left: `${this._handleLeft}px`,
      top: `${this._handleTop}px`,
    };

    if (this.split === 'vertical') {
      handleStylesPropObj.marginLeft = `${0 - HANDLE_SIZE / 2}px`;
      handleStylesPropObj.width = `${HANDLE_SIZE}px`;
    }

    if (this.split === 'horizontal') {
      handleStylesPropObj.height = `${HANDLE_SIZE}px`;
      handleStylesPropObj.marginTop = `${0 - HANDLE_SIZE / 2}px`;
    }

    const handleStyles = styleMap(handleStylesPropObj);

    const handleOverlayClasses = classMap({
      'handle-overlay': true,
      active: this._isDragActive,
      'split-vertical': this.split === 'vertical',
      'split-horizontal': this.split === 'horizontal',
    });

    const handleClasses = classMap({
      handle: true,
      hover: this._hover,
      hide: this._hide,
      'split-vertical': this.split === 'vertical',
      'split-horizontal': this.split === 'horizontal',
    });

    return html`
      <div class="start" style="${startPaneStyles}">
        <slot name="start"></slot>
      </div>
      <div class="end" style="${endPaneStyles}">
        <slot name="end"></slot>
      </div>
      <div class="${handleOverlayClasses}"></div>
      <div
        class="${handleClasses}"
        style="${handleStyles}"
        @mouseover="${this._handleMouseOver}"
        @mouseout="${this._handleMouseOut}"
        @mousedown="${this._handleMouseDown}"
        @dblclick="${this._handleDblClick}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-layout': VscodeSplitLayout;
  }
}
