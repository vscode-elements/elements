import {html, PropertyValues, TemplateResult} from 'lit';
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

const inset = ({
  top,
  right,
  bottom,
  left,
}: {
  top: string;
  right: string;
  bottom: string;
  left: string;
}) => `${top} ${right} ${bottom} ${left}`;

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
    this.resetHandlePosition();
  }
  get split(): Orientation {
    return this._split;
  }
  private _split: Orientation = 'vertical';

  /**
   * Controls whether the handle position should reset to the value set in the
   * `initialHandlePosition` when it is double-clicked.
   */
  @property({type: Boolean, reflect: true, attribute: 'reset-on-dbl-click'})
  resetOnDblClick = false;

  /**
   * Controls the draggable area size in pixels. it is intended to use the value
   * of `workbench.sash.size`.
   */
  @property({type: Number, reflect: true, attribute: 'handle-size'})
  handleSize = 4;

  /**
   * The handler position will reset to this position when it is double-clicked,
   * or the `resetHandlePosition()` is called.
   */
  @property({reflect: true, attribute: 'initial-handle-position'})
  initialHandlePosition: string = '50%';

  /**
   * Set the handle position programmatically. The value must include a unit,
   * either `%` or `px`. If no unit is specified, the value is interpreted as
   * `px`.
   */
  @property({attribute: 'handle-position'})
  handlePosition?: string;

  @state()
  private _handlePosition = 0;

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

  /**
   * Sets the handle position to the value specified in the `initialHandlePosition` property.
   */
  resetHandlePosition() {
    const {value, unit} = parseValue(this.initialHandlePosition);
    this._handlePosition = value;
    this._positionUnit = unit;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._boundRect = this.getBoundingClientRect();
    this.resetHandlePosition();
  }

  /** @internal */
  initializeResizeHandler() {
    this.resetHandlePosition();
  }

  protected update(
    changedProperties: PropertyValues<{
      handlePosition: string;
      initialHandlePosition: string;
    }>
  ): void {
    super.update(changedProperties);

    if (
      changedProperties.has('handlePosition') &&
      changedProperties.has('initialHandlePosition')
    ) {
      const {value, unit} = parseValue(this.handlePosition ?? '');
      this._positionUnit = unit;
      this._handlePosition = value;
    } else if (changedProperties.has('handlePosition')) {
      const {value, unit} = parseValue(this.handlePosition ?? '');
      this._positionUnit = unit;
      this._handlePosition = value;
    } else if (changedProperties.has('initialHandlePosition')) {
      const {unit} = parseValue(this.initialHandlePosition);
      this._convertPosition(unit);
      this._positionUnit = unit;
    }
  }

  private _convertPosition(newUnit: PositionUnit) {
    if (this._positionUnit === newUnit) {
      return;
    }

    const rect = this.getBoundingClientRect();
    const {width, height} = rect;

    if (newUnit === 'percent') {
      this._handlePosition =
        this.split === 'vertical'
          ? (this._handlePosition / width) * 100
          : (this._handlePosition / height) * 100;
    } else {
      this._handlePosition =
        this.split === 'vertical'
          ? (width * this._handlePosition) / 100
          : (height * this._handlePosition) / 100;
    }
  }

  private _getActualValue(valueInPx: number, maxValue: number) {
    return this._positionUnit === 'percent'
      ? pxToPercent(valueInPx, maxValue)
      : valueInPx;
  }

  private _getCssVal(value: number) {
    return this._positionUnit === 'percent' ? `${value}%` : `${value}px`;
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
      this._handleOffset = mouseXLocal - this._handlePosition;
    }

    if (this.split === 'horizontal') {
      this._handleOffset = mouseYLocal - this._handlePosition;
    }

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
          position: this._getCssVal(this._handlePosition),
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

      this._handlePosition = this._getActualValue(handleLeftPx, width);
    }

    if (this._split === 'horizontal') {
      const mouseYLocal = clientY - top;
      const handleTopPx = Math.max(
        0,
        Math.min(mouseYLocal - this._handleOffset, height)
      );

      this._handlePosition = this._getActualValue(handleTopPx, height);
    }
  };

  private _handleDblClick() {
    if (!this.resetOnDblClick) {
      return;
    }

    this.resetHandlePosition();
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
    const {width, height} = this._boundRect;
    const hMax = this._positionUnit === 'percent' ? 100 : width;
    const vMax = this._positionUnit === 'percent' ? 100 : height;

    const startPaneInset = inset({
      top: '0',
      right:
        this.split === 'vertical'
          ? this._getCssVal(hMax - this._handlePosition)
          : '0',
      bottom:
        this.split === 'vertical'
          ? '0'
          : this._getCssVal(vMax - this._handlePosition),
      left: '0',
    });

    const endPaneInset = inset({
      top:
        this.split === 'vertical' ? '0' : this._getCssVal(this._handlePosition),
      right: '0',
      bottom: '0',
      left:
        this.split === 'vertical' ? this._getCssVal(this._handlePosition) : '0',
    });

    const handleStylesPropObj: {[prop: string]: string} = {
      left:
        this.split === 'vertical' ? this._getCssVal(this._handlePosition) : '0',
      top:
        this.split === 'vertical' ? '0' : this._getCssVal(this._handlePosition),
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
      <div class="start" style="${styleMap({inset: startPaneInset})}">
        <slot name="start" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div class="end" style="${styleMap({inset: endPaneInset})}">
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
