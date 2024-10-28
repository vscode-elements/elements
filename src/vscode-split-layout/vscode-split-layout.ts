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

export type VscSplitLayoutPositionChangedEvent = CustomEvent<{
  position: number;
}>;

/**
 * @cssprop [--hover-border=var(--vscode-sash-hoverBorder)]
 */
@customElement('vscode-split-layout')
export class VscodeSplitLayout extends VscElement {
  static styles = styles;

  @property({reflect: true})
  split: 'horizontal' | 'vertical' = 'vertical';

  @property({type: Boolean, reflect: true, attribute: 'reset-on-dbl-click'})
  resetOnDblClick = false;

  /**
   * Controls the draggable area size in pixels. it is recommended to use the value of `workbench.sash.size`.
   */
  @property({type: Number, reflect: true, attribute: 'handle-size'})
  handleSize = 4;

  @property({reflect: true, attribute: 'initial-handle-position'})
  initialHandlePosition = '50%';

  @property({type: Number})
  position = 0;

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

  connectedCallback(): void {
    super.connectedCallback();

    this._initPosition();
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("split")) {
      this._initPosition();
    } else if (_changedProperties.has("position")) {
      if(this.split === "vertical") {
        this._handleLeft = this.position;
        this._endPaneLeft = this._handleLeft;
        this._startPaneRight = 100 - this._handleLeft;
      } else {
        this._handleTop = this.position;
        this._endPaneTop = this._handleTop;
        this._startPaneBottom = 100 - this._handleTop;
      }
    }
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (
      _changedProperties.has('split') ||
      _changedProperties.has('_handleLeft') ||
      _changedProperties.has('_handleTop')
    ) {
      const previousPosition = this.position;
      this.position =
        this.split === 'vertical' ? this._handleLeft : this._handleTop;
      if (previousPosition !== this.position) {
        this.dispatchEvent(
          new CustomEvent('vsc-split-layout-position-changed', {
            detail: {
              position: this.position,
            },
            composed: true,
          }) as VscSplitLayoutPositionChangedEvent
        );
      }
    }
  }

  /** @internal */
  initializeResizeHandler() {
    this._initPosition();
  }

  private _initPosition() {
    this._boundRect = this.getBoundingClientRect();
    const {height, width} = this._boundRect;
    const maxPos = this.split === 'vertical' ? width : height;
    const matches = /(^[0-9.]+)(%{0,1})$/.exec(this.initialHandlePosition);
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
      this._startPaneRight = ((maxPos - pos) / width) * 100;
      this._endPaneLeft = (pos / width) * 100;
      this._handleLeft = (pos / width) * 100;
      this._startPaneBottom = 0;
      this._endPaneTop = 0;
      this._handleTop = 0;
    }

    if (this.split === 'horizontal') {
      this._startPaneRight = 0;
      this._endPaneLeft = 0;
      this._handleLeft = 0;
      this._startPaneBottom = ((maxPos - pos) / height) * 100;
      this._endPaneTop = (pos / height) * 100;
      this._handleTop = (pos / height) * 100;
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

    this._boundRect = this.getBoundingClientRect();
    const {left, top, width, height} = this._boundRect;

    const mouseXLocal = ((event.clientX - left) / width) * 100;
    const mouseYLocal = ((event.clientY - top) / height) * 100;

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
  };

  private _handleMouseMove = (event: MouseEvent) => {
    const {clientX, clientY} = event;
    const {left, top, height, width} = this._boundRect;

    if (this.split === 'vertical') {
      const mouseXLocal = clientX - left;
      const handleLeftPx = Math.max(
        0,
        Math.min(mouseXLocal - this._handleOffset, width)
      );
      const startPaneRightPx = Math.max(0, width - handleLeftPx);

      const handleLeftPercentage = (handleLeftPx / width) * 100;
      const startPaneRightPercentage = (startPaneRightPx / width) * 100;

      this._handleLeft = handleLeftPercentage;
      this._startPaneRight = startPaneRightPercentage;
      this._endPaneLeft = this._handleLeft;
    }

    if (this.split === 'horizontal') {
      const mouseYLocal = clientY - top;
      const handleTopPx = Math.max(
        0,
        Math.min(mouseYLocal - this._handleOffset, height)
      );
      const startPaneBottomPx = Math.max(0, height - handleTopPx);

      const handleTopPercentage = (handleTopPx / height) * 100;
      const startPaneBottomPercentage = (startPaneBottomPx / height) * 100;

      this._handleTop = handleTopPercentage;
      this._startPaneBottom = startPaneBottomPercentage;
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
    const startPaneStyles = styleMap({
      bottom: `${this._startPaneBottom}%`,
      right: `${this._startPaneRight}%`,
    });

    const endPaneStyles = styleMap({
      left: `${this._endPaneLeft}%`,
      top: `${this._endPaneTop}%`,
    });

    const handleStylesPropObj: {[prop: string]: string} = {
      left: `${this._handleLeft}%`,
      top: `${this._handleTop}%`,
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
    'vsc-split-layout-position-changed': VscSplitLayoutPositionChangedEvent;
  }
}
