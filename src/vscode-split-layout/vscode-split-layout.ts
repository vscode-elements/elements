import {html, PropertyValues, TemplateResult} from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-split-layout.styles.js';

const DEFAULT_INITIAL_POSITION = '50%';
const DEFAULT_HANDLE_SIZE = 4;

type PositionUnit = 'pixel' | 'percent';
type Orientation = 'horizontal' | 'vertical';

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
  initialHandlePosition: string = DEFAULT_INITIAL_POSITION;

  /**
   * Set the handle position programmatically. The value must include a unit,
   * either `%` or `px`. If no unit is specified, the value is interpreted as
   * `px`.
   */
  @property({attribute: 'handle-position'})
  set handlePosition(newVal: string) {
    this._rawHandlePosition = newVal;
    this._handlePositionChanged();
  }
  get handlePosition(): string | undefined {
    return this._rawHandlePosition;
  }
  private _rawHandlePosition?: string;

  @property({attribute: 'fixed-pane'})
  fixedPane: 'none' | 'start' | 'end' = 'none';

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

    if (unit === 'percent') {
      this._handlePosition = percentToPx(value, max);
    } else {
      this._handlePosition = value;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  /** @internal */
  initializeResizeHandler() {
    this.resetHandlePosition();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this._boundRect = this._wrapperEl.getBoundingClientRect();

    const {value, unit} = this.handlePosition
      ? parseValue(this.handlePosition)
      : parseValue(this.initialHandlePosition);

    this._setPosition(value, unit);
  }

  private _handlePositionChanged() {
    if (this.handlePosition && this._wrapperEl) {
      this._boundRect = this._wrapperEl.getBoundingClientRect();
      const {value, unit} = parseValue(this.handlePosition);
      this._setPosition(value, unit);
    }
  }

  private _setPosition(value: number, unit: PositionUnit) {
    const {width, height} = this._boundRect;
    const max = this.split === 'vertical' ? width : height;

    this._handlePosition = unit === 'percent' ? percentToPx(value, max) : value;
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

  private _handleMouseUp = (_ev: MouseEvent) => {
    this._isDragActive = false;
    window.removeEventListener('mouseup', this._handleMouseUp);
    window.removeEventListener('mousemove', this._handleMouseMove);

    this.dispatchEvent(
      new CustomEvent('vsc-split-layout-change', {
        detail: {
          position: this._handlePosition,
        },
        composed: true,
      }) as VscSplitLayoutChangeEvent
    );
  };

  private _handleMouseMove = (event: MouseEvent) => {
    const {clientX, clientY} = event;
    const {left, top, height, width} = this._boundRect;

    if (this._split === 'vertical') {
      const mouseXLocal = clientX - left;
      this._handlePosition = Math.max(
        0,
        Math.min(mouseXLocal - this._handleOffset + this.handleSize / 2, width)
      );
    }

    if (this._split === 'horizontal') {
      const mouseYLocal = clientY - top;
      this._handlePosition = Math.max(
        0,
        Math.min(mouseYLocal - this._handleOffset + this.handleSize / 2, height)
      );
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
    const handlePosMax = this.split === 'vertical' ? width : height;
    const handlePosCss =
      this.fixedPane !== 'none'
        ? `${this._handlePosition}px`
        : `${pxToPercent(this._handlePosition, handlePosMax)}%`;
    const startPaneStyles = {height: '100%', width: '100%'};

    if (this.split === 'vertical') {
      if (this.fixedPane === 'none') {
        startPaneStyles.width = `${pxToPercent(this._handlePosition, width)}%`;
      } else if (this.fixedPane === 'start') {
        startPaneStyles.width = `${this._handlePosition}px`;
      } else {
        startPaneStyles.width = '100%';
      }
    } else {
      if (this.fixedPane === 'none') {
        startPaneStyles.height = `${pxToPercent(this._handlePosition, height)}%`;
      } else if (this.fixedPane === 'start') {
        startPaneStyles.height = `${this._handlePosition}px`;
      } else {
        startPaneStyles.height = '100%';
      }
    }

    const endPaneStyles = {height: '100%', width: '100%'};

    if (this.split === 'vertical') {
      if (this.fixedPane === 'none') {
        endPaneStyles.width = `${pxToPercent(width - this._handlePosition, width)}%`;
      } else if (this.fixedPane === 'end') {
        endPaneStyles.width = `${width - this._handlePosition}px`;
      } else {
        endPaneStyles.width = '100%';
      }
    } else {
      if (this.fixedPane === 'none') {
        endPaneStyles.height = `${pxToPercent(height - this._handlePosition, height)}%`;
      } else if (this.fixedPane === 'end') {
        endPaneStyles.height = `${height - this._handlePosition}px`;
      } else {
        endPaneStyles.height = '100%';
      }
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

    const wrapperClasses = {
      wrapper: true,
      horizontal: this.split === 'horizontal',
    };

    return html`
      <div class="${classMap(wrapperClasses)}">
        <div class="start" style="${styleMap(startPaneStyles)}">
          <slot name="start" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="end" style="${styleMap(endPaneStyles)}">
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
