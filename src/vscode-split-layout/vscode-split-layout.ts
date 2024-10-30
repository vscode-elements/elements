import {html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-split-layout.styles.js';

type PositionUnit = 'pixel' | 'percent';
type Orientation = 'horizontal' | 'vertical';

const parseValue = (raw: string) => {
  let unit: PositionUnit;
  let rawVal: number;

  if (raw.endsWith('%')) {
    unit = 'percent';
    rawVal = +raw.substring(0, raw.length - 1);
  } else if (raw.endsWith('px')) {
    unit = 'pixel';
    rawVal = +raw.substring(0, raw.length - 2);
  } else {
    unit = 'pixel';
    rawVal = +raw;
  }

  const value = isNaN(rawVal) ? 0 : rawVal;

  return {unit, value};
};

// Returns a percentage between 0 and 100
const pxToPercent = (current: number, max: number) => {
  return max === 0 ? 0 : Math.min(100, (current / max) * 100);
};

// Returns a pixel value between 0 and max value
const percentToPx = (current: number, max: number) => {
  return Math.min(max, (max * current) / 100);
};

export type VscSplitLayoutPositionChangeEvent = CustomEvent<{
  position: string;
}>;

/**
 * @cssprop [--hover-border=var(--vscode-sash-hoverBorder)]
 */
@customElement('vscode-split-layout')
export class VscodeSplitLayout extends VscElement {
  static styles = styles;

  @property({reflect: true})
  set split(newVal: Orientation) {
    this._split = newVal;
    this._initPosition();
  }
  get split(): Orientation {
    return this._split;
  }
  private _split: Orientation = 'vertical';

  @property({type: Boolean, reflect: true, attribute: 'reset-on-dbl-click'})
  resetOnDblClick = false;

  /**
   * Controls the draggable area size in pixels. it is recommended to use the value of `workbench.sash.size`.
   */
  @property({type: Number, reflect: true, attribute: 'handle-size'})
  handleSize = 4;

  /**
   * The handler position will reset to this position when it is double-clicked.
   */
  @property({reflect: true, attribute: 'initial-handle-position'})
  set initialHandlePosition(newVal: string) {
    const {unit} = parseValue(newVal);

    if (unit !== this._positionUnit) {
      if (unit === 'percent') {
        this._convertPixelsToPercentages();
      } else {
        this._convertPercentagesToPixels();
      }
    }

    this._positionUnit = unit;
    this._initialHandlePosition = newVal;
  }
  get initialHandlePosition(): string {
    return this._initialHandlePosition;
  }
  private _initialHandlePosition = '50%';

  @property({type: String})
  set position(newVal: string) {
    const {value, unit} = parseValue(newVal);
    this._setHandlePosition(value, unit);
  }
  get position() {
    const cssUnit = this._positionUnit === 'percent' ? '%' : 'px';

    return this._split === 'vertical'
      ? `${this._handleLeft}${cssUnit}`
      : `${this._handleTop}${cssUnit}`;
  }

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

  @queryAssignedElements({slot: 'start', selector: 'vscode-split-layout'})
  private _nestedLayoutsAtStart!: HTMLElement[];

  @queryAssignedElements({slot: 'end', selector: 'vscode-split-layout'})
  private _nestedLayoutsAtEnd!: HTMLElement[];

  private _boundRect: DOMRect = new DOMRect();
  private _handleOffset = 0;
  private _positionUnit: PositionUnit = 'percent';

  connectedCallback(): void {
    super.connectedCallback();

    this._initPosition();
  }

  /** @internal */
  initializeResizeHandler() {
    this._initPosition();
  }

  private _convertPixelsToPercentages() {
    const rect = this.getBoundingClientRect();
    const {width, height} = rect;

    this._startPaneRight = pxToPercent(this._startPaneRight, width);
    this._startPaneBottom = pxToPercent(this._startPaneBottom, height);
    this._endPaneLeft = pxToPercent(this._endPaneLeft, width);
    this._endPaneTop = pxToPercent(this._endPaneTop, height);
    this._handleLeft = pxToPercent(this._handleLeft, width);
    this._handleTop = pxToPercent(this._handleTop, height);
  }

  private _convertPercentagesToPixels() {
    const rect = this.getBoundingClientRect();
    const {width, height} = rect;

    this._startPaneRight = percentToPx(this._startPaneRight, width);
    this._startPaneBottom = percentToPx(this._startPaneBottom, height);
    this._endPaneLeft = percentToPx(this._endPaneLeft, width);
    this._endPaneTop = percentToPx(this._endPaneTop, height);
    this._handleLeft = percentToPx(this._handleLeft, width);
    this._handleTop = percentToPx(this._handleTop, height);
  }

  private _getActualValue(valueInPx: number, maxValue: number) {
    return this._positionUnit === 'percent'
      ? pxToPercent(valueInPx, maxValue)
      : valueInPx;
  }

  private _setHandlePosition(value: number, unit: PositionUnit) {
    this._positionUnit = unit;

    const rect = this.getBoundingClientRect();
    const {width, height} = rect;
    // maximum position in pixels
    const maxPos = this.split === 'vertical' ? width : height;
    // position in pixels
    const pos = unit === 'percent' ? percentToPx(value, maxPos) : value;

    if (this._split === 'vertical') {
      this._startPaneRight = this._getActualValue(maxPos - pos, maxPos);
      this._endPaneLeft = this._getActualValue(pos, maxPos);
      this._handleLeft = this._getActualValue(pos, maxPos);
      this._startPaneBottom = 0;
      this._endPaneTop = 0;
      this._handleTop = 0;
    }

    if (this._split === 'horizontal') {
      this._startPaneRight = 0;
      this._endPaneLeft = 0;
      this._handleLeft = 0;
      this._startPaneBottom = this._getActualValue(maxPos - pos, maxPos);
      this._endPaneTop = this._getActualValue(pos, maxPos);
      this._handleTop = this._getActualValue(pos, maxPos);
    }
  }

  private _initPosition() {
    const {unit, value} = parseValue(this.initialHandlePosition);
    this._setHandlePosition(value, unit);
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

    this._boundRect = this.getBoundingClientRect();
    const {left, top, width, height} = this._boundRect;

    const mouseXLocal = this._getActualValue(event.clientX - left, width);
    const mouseYLocal = this._getActualValue(event.clientY - top, height);

    if (this.split === 'vertical') {
      this._handleOffset = mouseXLocal - this._handleLeft;
    }

    if (this.split === 'horizontal') {
      this._handleOffset = mouseYLocal - this._handleTop;
    }

    this._boundRect = this.getBoundingClientRect();
    this._isDragActive = true;

    window.addEventListener('mouseup', this._handleMouseUp);
    window.addEventListener('mousemove', this._handleMouseMove);
  }

  private _handleMouseUp = () => {
    this._isDragActive = false;
    window.removeEventListener('mouseup', this._handleMouseUp);
    window.removeEventListener('mousemove', this._handleMouseMove);

    this.dispatchEvent(
      new CustomEvent('vsc-split-layout-position-change', {
        detail: {
          position: this.position,
        },
        composed: true,
      }) as VscSplitLayoutPositionChangeEvent
    );
  };

  private _handleMouseMove = (event: MouseEvent) => {
    const {clientX, clientY} = event;
    const {left, top, height, width} = this._boundRect;

    if (this._split === 'vertical') {
      const mouseXLocal = clientX - left;
      const handleLeftPx = Math.max(
        0,
        Math.min(mouseXLocal - this._handleOffset, width)
      );
      const startPaneRightPx = Math.max(0, width - handleLeftPx);

      this._handleLeft = this._getActualValue(handleLeftPx, width);
      this._startPaneRight = this._getActualValue(startPaneRightPx, width);
      this._endPaneLeft = this._handleLeft;
    }

    if (this._split === 'horizontal') {
      const mouseYLocal = clientY - top;
      const handleTopPx = Math.max(
        0,
        Math.min(mouseYLocal - this._handleOffset, height)
      );
      const startPaneBottomPx = Math.max(0, height - handleTopPx);

      this._handleTop = this._getActualValue(handleTopPx, height);
      this._startPaneBottom = this._getActualValue(startPaneBottomPx, height);
      this._endPaneTop = this._handleTop;
    }
  };

  private _handleDblClick() {
    if (!this.resetOnDblClick) {
      return;
    }

    this._initPosition();
  }

  private _handleSlotChange() {
    const nestedLayouts = [
      ...this._nestedLayoutsAtStart,
      ...this._nestedLayoutsAtEnd,
    ];

    nestedLayouts.forEach((e) => {
      if (e instanceof VscodeSplitLayout) {
        e.initializeResizeHandler();
      }
    });
  }

  render(): TemplateResult {
    const unit = this._positionUnit === 'percent' ? '%' : 'px';

    const startPaneStyles = styleMap({
      bottom: `${this._startPaneBottom}${unit}`,
      right: `${this._startPaneRight}${unit}`,
    });

    const endPaneStyles = styleMap({
      left: `${this._endPaneLeft}${unit}`,
      top: `${this._endPaneTop}${unit}`,
    });

    const handleStylesPropObj: {[prop: string]: string} = {
      left: `${this._handleLeft}${unit}`,
      top: `${this._handleTop}${unit}`,
    };

    if (this.split === 'vertical') {
      handleStylesPropObj.marginLeft = `${0 - this.handleSize / 2}px`;
      handleStylesPropObj.width = `${this.handleSize}px`;
    }

    if (this.split === 'horizontal') {
      handleStylesPropObj.height = `${this.handleSize}px`;
      handleStylesPropObj.marginTop = `${0 - this.handleSize / 2}px`;
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
        <slot name="start" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div class="end" style="${endPaneStyles}">
        <slot name="end" @slotchange=${this._handleSlotChange}></slot>
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

  interface GlobalEventHandlersEventMap {
    'vsc-split-layout-position-change': VscSplitLayoutPositionChangeEvent;
  }
}
