import {html, PropertyValues, TemplateResult} from 'lit';
import {property, query, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-split-layout.styles.js';
import {stylePropertyMap} from '../includes/style-property-map.js';

const DEFAULT_INITIAL_POSITION = '50%';
const DEFAULT_HANDLE_SIZE = 4;

type PositionUnit = 'pixel' | 'percent';
type Orientation = 'horizontal' | 'vertical';
type FixedPaneType = 'start' | 'end' | 'none';

export const parseValue = (
  raw: string
): {value: number; unit: PositionUnit} => {
  if (!raw) {
    return {value: 0, unit: 'pixel'};
  }

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
export const pxToPercent = (current: number, max: number) => {
  return max === 0 ? 0 : Math.min(100, (current / max) * 100);
};

export const percentToPx = (current: number, max: number) => {
  return max * (current / 100);
};

export type VscSplitLayoutChangeEvent = CustomEvent<{
  position: number;
  positionInPercentage: number;
}>;

/**
 * @tag vscode-split-layout
 *
 * @prop {'start' | 'end' | 'none'} fixedPane
 * @prop {string} minStart - Minimum size of the start pane expressed in `px` or `%`.
 * @prop {string} minEnd - Minimum size of the end pane expressed in `px` or `%`.
 *
 * @cssprop [--separator-border=#454545]
 * @cssprop [--vscode-editorWidget-border=#454545]
 * @cssprop [--vscode-sash-hoverBorder=#0078d4]
 */
@customElement('vscode-split-layout')
export class VscodeSplitLayout extends VscElement {
  static override styles = styles;

  /**
   * Direction of the divider.
   */
  @property({reflect: true})
  set split(newVal: Orientation) {
    if (this._split === newVal) {
      return;
    }
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
  initialHandlePosition: string = DEFAULT_INITIAL_POSITION;

  /**
   * Set the handle position programmatically. The value must include a unit,
   * either `%` or `px`. If no unit is specified, the value is interpreted as
   * `px`.
   */
  @property({attribute: 'handle-position'})
  set handlePosition(newVal: string) {
    this._rawHandlePosition = newVal;
    this._handlePositionPropChanged();
  }
  get handlePosition(): string | undefined {
    return this._rawHandlePosition;
  }
  private _rawHandlePosition?: string;

  /**
   * The size of the fixed pane will not change when the component is resized.
   */
  @property({attribute: 'fixed-pane'})
  set fixedPane(newVal: FixedPaneType) {
    this._fixedPane = newVal;
    this._fixedPanePropChanged();
  }
  get fixedPane(): FixedPaneType {
    return this._fixedPane;
  }
  private _fixedPane: FixedPaneType = 'none';

  /**
   * Sets the minimum size of the start pane. Accepts pixel or percentage values.
   */
  @property({attribute: 'min-start'})
  set minStart(newVal: string | null | undefined) {
    const normalized = newVal ?? undefined;

    if (this._minStart === normalized) {
      return;
    }

    this._minStart = normalized;
    this._applyMinSizeConstraints();
  }
  get minStart(): string | undefined {
    return this._minStart;
  }
  private _minStart?: string;

  /**
   * Sets the minimum size of the end pane. Accepts pixel or percentage values.
   */
  @property({attribute: 'min-end'})
  set minEnd(newVal: string | null | undefined) {
    const normalized = newVal ?? undefined;

    if (this._minEnd === normalized) {
      return;
    }

    this._minEnd = normalized;
    this._applyMinSizeConstraints();
  }
  get minEnd(): string | undefined {
    return this._minEnd;
  }
  private _minEnd?: string;

  @state()
  private _handlePosition = 0;

  @state()
  private _isDragActive = false;

  @state()
  private _hover = false;

  @state()
  private _hide = false;

  @query('.wrapper')
  private _wrapperEl!: HTMLDivElement;

  @query('.handle')
  private _handleEl!: HTMLDivElement;

  @queryAssignedElements({slot: 'start', selector: 'vscode-split-layout'})
  private _nestedLayoutsAtStart!: HTMLElement[];

  @queryAssignedElements({slot: 'end', selector: 'vscode-split-layout'})
  private _nestedLayoutsAtEnd!: HTMLElement[];

  private _boundRect: DOMRect = new DOMRect();
  private _handleOffset = 0;
  private _resizeObserver: ResizeObserver;
  private _wrapperObserved: boolean = false;
  private _fixedPaneSize: number = 0;

  constructor() {
    super();

    this._resizeObserver = new ResizeObserver(this._handleResize);
  }

  /**
   * Sets the handle position to the value specified in the `initialHandlePosition` property.
   */
  resetHandlePosition() {
    if (!this._wrapperEl) {
      this._handlePosition = 0;
      return;
    }

    const {width, height} = this._wrapperEl.getBoundingClientRect();
    const max = this.split === 'vertical' ? width : height;
    const {value, unit} = parseValue(
      this.initialHandlePosition ?? DEFAULT_INITIAL_POSITION
    );

    const nextValue = unit === 'percent' ? percentToPx(value, max) : value;
    this._handlePosition = this._clampHandlePosition(nextValue, max);
    this._updateFixedPaneSize(max);
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    if (this.fixedPane !== 'none') {
      this._resizeObserver.observe(this._wrapperEl);
      this._wrapperObserved = true;
    }

    this._boundRect = this._wrapperEl.getBoundingClientRect();

    const {value, unit} = this.handlePosition
      ? parseValue(this.handlePosition)
      : parseValue(this.initialHandlePosition);

    this._setPosition(value, unit);
    this._initFixedPane();
  }

  private _handlePositionPropChanged() {
    if (this.handlePosition && this._wrapperEl) {
      this._boundRect = this._wrapperEl.getBoundingClientRect();
      const {value, unit} = parseValue(this.handlePosition);
      this._setPosition(value, unit);
    }
  }

  private _fixedPanePropChanged() {
    if (!this._wrapperEl) {
      return;
    }

    this._initFixedPane();
  }

  private _initFixedPane() {
    if (this.fixedPane === 'none') {
      if (this._wrapperObserved) {
        this._resizeObserver.unobserve(this._wrapperEl);
        this._wrapperObserved = false;
      }
    } else {
      const {width, height} = this._boundRect;
      const max = this.split === 'vertical' ? width : height;

      this._fixedPaneSize =
        this.fixedPane === 'start'
          ? this._handlePosition
          : max - this._handlePosition;

      if (!this._wrapperObserved) {
        this._resizeObserver.observe(this._wrapperEl);
        this._wrapperObserved = true;
      }
    }
  }

  private _applyMinSizeConstraints() {
    if (!this._wrapperEl) {
      return;
    }

    this._boundRect = this._wrapperEl.getBoundingClientRect();
    const {width, height} = this._boundRect;
    const max = this.split === 'vertical' ? width : height;

    this._handlePosition = this._clampHandlePosition(this._handlePosition, max);
    this._updateFixedPaneSize(max);
  }

  private _resolveMinSizePx(value: string | undefined, max: number): number {
    if (!value) {
      return 0;
    }

    const {unit, value: parsedValue} = parseValue(value);
    const resolved =
      unit === 'percent' ? percentToPx(parsedValue, max) : parsedValue;

    if (!isFinite(resolved)) {
      return 0;
    }

    return Math.max(0, Math.min(resolved, max));
  }

  private _clampHandlePosition(value: number, max: number): number {
    if (!isFinite(max) || max <= 0) {
      return 0;
    }

    const minStartPx = this._resolveMinSizePx(this._minStart, max);
    const minEndPx = this._resolveMinSizePx(this._minEnd, max);

    const lowerBound = Math.min(minStartPx, max);
    const upperBound = Math.max(lowerBound, max - minEndPx);

    const boundedValue = Math.max(lowerBound, Math.min(value, upperBound));

    return Math.max(0, Math.min(boundedValue, max));
  }

  private _updateFixedPaneSize(max: number) {
    if (this.fixedPane === 'start') {
      this._fixedPaneSize = this._handlePosition;
    } else if (this.fixedPane === 'end') {
      this._fixedPaneSize = max - this._handlePosition;
    }
  }

  private _handleResize = (entries: ResizeObserverEntry[]) => {
    const rect = entries[0].contentRect;
    const {width, height} = rect;
    this._boundRect = rect;
    const max = this.split === 'vertical' ? width : height;

    if (this.fixedPane === 'start') {
      this._handlePosition = this._fixedPaneSize;
    }

    if (this.fixedPane === 'end') {
      this._handlePosition = max - this._fixedPaneSize;
    }

    this._handlePosition = this._clampHandlePosition(this._handlePosition, max);
    this._updateFixedPaneSize(max);
  };

  private _setPosition(value: number, unit: PositionUnit) {
    const {width, height} = this._boundRect;
    const max = this.split === 'vertical' ? width : height;

    const nextValue = unit === 'percent' ? percentToPx(value, max) : value;

    this._handlePosition = this._clampHandlePosition(nextValue, max);
    this._updateFixedPaneSize(max);
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

    this._boundRect = this._wrapperEl.getBoundingClientRect();
    const {left, top} = this._boundRect;
    const {left: handleLeft, top: handleTop} =
      this._handleEl.getBoundingClientRect();

    const mouseXLocal = event.clientX - left;
    const mouseYLocal = event.clientY - top;

    if (this.split === 'vertical') {
      this._handleOffset = mouseXLocal - (handleLeft - left);
    }

    if (this.split === 'horizontal') {
      this._handleOffset = mouseYLocal - (handleTop - top);
    }

    this._isDragActive = true;

    window.addEventListener('mouseup', this._handleMouseUp);
    window.addEventListener('mousemove', this._handleMouseMove);
  }

  private _handleMouseUp = (ev: MouseEvent) => {
    this._isDragActive = false;

    if (ev.target !== this) {
      this._hover = false;
      this._hide = true;
    }

    window.removeEventListener('mouseup', this._handleMouseUp);
    window.removeEventListener('mousemove', this._handleMouseMove);

    const {width, height} = this._boundRect;
    const max = this.split === 'vertical' ? width : height;
    const positionInPercentage = pxToPercent(this._handlePosition, max);

    this.dispatchEvent(
      new CustomEvent('vsc-split-layout-change', {
        detail: {
          position: this._handlePosition,
          positionInPercentage,
        },
        composed: true,
      }) as VscSplitLayoutChangeEvent
    );
  };

  private _handleMouseMove = (event: MouseEvent) => {
    const {clientX, clientY} = event;
    const {left, top, height, width} = this._boundRect;
    const vert = this.split === 'vertical';
    const maxPos = vert ? width : height;
    const mousePos = vert ? clientX - left : clientY - top;

    const rawPosition = mousePos - this._handleOffset + this.handleSize / 2;

    this._handlePosition = this._clampHandlePosition(rawPosition, maxPos);
    this._updateFixedPaneSize(maxPos);
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
        e.resetHandlePosition();
      }
    });
  }

  override render(): TemplateResult {
    const {width, height} = this._boundRect;
    const maxPos = this.split === 'vertical' ? width : height;
    const handlePosCss =
      this.fixedPane !== 'none'
        ? `${this._handlePosition}px`
        : `${pxToPercent(this._handlePosition, maxPos)}%`;

    let startPaneSize = '';

    if (this.fixedPane === 'start') {
      startPaneSize = `0 0 ${this._fixedPaneSize}px`;
    } else {
      startPaneSize = `1 1 ${pxToPercent(this._handlePosition, maxPos)}%`;
    }

    let endPaneSize = '';

    if (this.fixedPane === 'end') {
      endPaneSize = `0 0 ${this._fixedPaneSize}px`;
    } else {
      endPaneSize = `1 1 ${pxToPercent(maxPos - this._handlePosition, maxPos)}%`;
    }

    const handleStylesPropObj: {[prop: string]: string} = {
      left: this.split === 'vertical' ? handlePosCss : '0',
      top: this.split === 'vertical' ? '0' : handlePosCss,
    };

    const handleSize = this.handleSize ?? DEFAULT_HANDLE_SIZE;

    if (this.split === 'vertical') {
      handleStylesPropObj.marginLeft = `${0 - handleSize / 2}px`;
      handleStylesPropObj.width = `${handleSize}px`;
    }

    if (this.split === 'horizontal') {
      handleStylesPropObj.height = `${handleSize}px`;
      handleStylesPropObj.marginTop = `${0 - handleSize / 2}px`;
    }

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

    const wrapperClasses = {
      wrapper: true,
      horizontal: this.split === 'horizontal',
    };

    return html`
      <div class=${classMap(wrapperClasses)}>
        <div class="start" .style=${stylePropertyMap({flex: startPaneSize})}>
          <slot name="start" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="end" .style=${stylePropertyMap({flex: endPaneSize})}>
          <slot name="end" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class=${handleOverlayClasses}></div>
        <div
          class=${handleClasses}
          .style=${stylePropertyMap(handleStylesPropObj)}
          @mouseover=${this._handleMouseOver}
          @mouseout=${this._handleMouseOut}
          @mousedown=${this._handleMouseDown}
          @dblclick=${this._handleDblClick}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-layout': VscodeSplitLayout;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-split-layout-change': VscSplitLayoutChangeEvent;
  }
}
