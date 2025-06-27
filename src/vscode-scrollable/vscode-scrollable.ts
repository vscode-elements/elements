import {html, nothing, PropertyValues, TemplateResult} from 'lit';
import {property, query, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import {stylePropertyMap} from '../includes/style-property-map.js';
import styles from './vscode-scrollable.styles.js';

/**
 * @tag vscode-scrollable
 *
 * @cssprop [--min-thumb-height=20px] - Scrollbar thumb minimum height
 * @cssprop [--vscode-scrollbar-shadow=#000000]
 * @cssprop [--vscode-scrollbarSlider-background=rgba(121, 121, 121, 0.4)]
 * @cssprop [--vscode-scrollbarSlider-hoverBackground=rgba(100, 100, 100, 0.7)]
 * @cssprop [--vscode-scrollbarSlider-activeBackground=rgba(191, 191, 191, 0.4)]
 */
@customElement('vscode-scrollable')
export class VscodeScrollable extends VscElement {
  static override styles = styles;

  @property({type: Boolean, reflect: true, attribute: 'always-visible'})
  alwaysVisible = false;

  @property({type: Number, attribute: 'min-thumb-size'})
  minThumbSize = 20;

  @property({type: Boolean, reflect: true})
  shadow = true;

  @property({type: Boolean, reflect: true})
  scrolled = false;

  @property({type: Number, attribute: 'scroll-pos'})
  set scrollPos(val: number) {
    this._scrollPos = val;
    this._updateScrollbar();
    this._updateThumbPosition();
    this.requestUpdate();
  }
  get scrollPos(): number {
    return this._scrollPos;
  }

  private _scrollPos = 0;

  @property({type: Number, attribute: 'scroll-max'})
  get scrollMax(): number {
    if (!this._scrollableContainer) {
      return 0;
    }

    return this._scrollableContainer.scrollHeight;
  }

  @state()
  private _isDragging = false;

  @state()
  private _thumbHeight = 0;

  @state()
  private _thumbY = 0;

  @state()
  private _thumbVisible = false;

  @state()
  private _thumbFade = false;

  @state()
  private _thumbActive = false;

  @query('.content')
  private _contentElement!: HTMLDivElement;

  @query('.scrollbar-thumb', true)
  private _scrollThumbElement!: HTMLDivElement;

  @query('.scrollable-container')
  private _scrollableContainer!: HTMLDivElement;

  @queryAssignedElements()
  private _assignedElements!: NodeList;

  private _hostResizeObserver!: ResizeObserver;
  private _contentResizeObserver!: ResizeObserver;
  private _scrollThumbStartY = 0;
  private _mouseStartY = 0;
  private _scrollbarVisible = true;
  private _scrollbarTrackZ = 0;

  constructor() {
    super();
    this.addEventListener('mouseover', this._handleComponentMouseOver);
    this.addEventListener('mouseout', this._handleComponentMouseOut);
    this.addEventListener('wheel', this._handleComponentWheel);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._hostResizeObserver = new ResizeObserver(this._resizeObserverCallback);
    this._contentResizeObserver = new ResizeObserver(
      this._resizeObserverCallback
    );

    this.requestUpdate();

    this.updateComplete.then(() => {
      this._hostResizeObserver.observe(this);
      this._contentResizeObserver.observe(this._contentElement);
      this._updateThumbPosition();
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this._hostResizeObserver.unobserve(this);
    this._hostResizeObserver.disconnect();
    this._contentResizeObserver.unobserve(this._contentElement);
    this._contentResizeObserver.disconnect();
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this._updateThumbPosition();
  }

  private _resizeObserverCallback = () => {
    this._updateScrollbar();
    this._updateThumbPosition();
  };

  private _calcThumbHeight() {
    const componentHeight = this.offsetHeight;
    const contentHeight = this._contentElement?.offsetHeight ?? 0;
    const proposedSize = componentHeight * (componentHeight / contentHeight);

    return Math.max(this.minThumbSize, proposedSize);
  }

  private _updateScrollbar() {
    const contentHeight = this._contentElement?.offsetHeight ?? 0;
    const componentHeight = this.offsetHeight;

    if (componentHeight >= contentHeight) {
      this._scrollbarVisible = false;
    } else {
      this._scrollbarVisible = true;
      this._thumbHeight = this._calcThumbHeight();
    }

    this.requestUpdate();
  }

  private _zIndexFix() {
    let highestZ = 0;

    this._assignedElements.forEach((n) => {
      if ('style' in n) {
        const computedZIndex = window.getComputedStyle(n as HTMLElement).zIndex;
        const isNumber = /([0-9-])+/g.test(computedZIndex);

        if (isNumber) {
          highestZ =
            Number(computedZIndex) > highestZ
              ? Number(computedZIndex)
              : highestZ;
        }
      }
    });

    this._scrollbarTrackZ = highestZ + 1;
    this.requestUpdate();
  }

  private _updateThumbPosition() {
    if (!this._scrollableContainer) {
      return;
    }

    const scrollTop = this._scrollPos;
    this.scrolled = scrollTop > 0;

    const componentH = this.offsetHeight;
    const thumbH = this._thumbHeight;
    const contentH = this._contentElement.offsetHeight;

    const overflown = contentH - componentH;
    const ratio = scrollTop / overflown;
    const thumbYMax = componentH - thumbH;

    this._thumbY = Math.min(ratio * (componentH - thumbH), thumbYMax);
  }

  private _calculateScrollPosFromThumbPos(scrollPos: number) {
    const cmpH = this.getBoundingClientRect().height;
    const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
    const contentH = this._contentElement.getBoundingClientRect().height;
    const rawScrollPos = (scrollPos / (cmpH - thumbH)) * (contentH - cmpH);

    return this._limitScrollPos(rawScrollPos);
  }

  private _limitScrollPos(newPos: number) {
    if (newPos < 0) {
      return 0;
    } else if (newPos > this.scrollMax) {
      return this.scrollMax;
    } else {
      return newPos;
    }
  }

  private _limitThumbPos(newPos: number) {
    const cmpH = this.getBoundingClientRect().height;
    const thumbH = this._scrollThumbElement.getBoundingClientRect().height;

    if (newPos < 0) {
      return 0;
    } else if (newPos > cmpH - thumbH) {
      return cmpH - thumbH;
    } else {
      return newPos;
    }
  }

  //#region event handlers
  private _handleSlotChange = () => {
    this._updateScrollbar();
    this._updateThumbPosition();
    this._zIndexFix();
  };

  private _handleScrollThumbMouseDown(event: MouseEvent) {
    const cmpCr = this.getBoundingClientRect();
    const thCr = this._scrollThumbElement.getBoundingClientRect();

    this._mouseStartY = event.screenY;
    this._scrollThumbStartY = thCr.top - cmpCr.top;
    this._isDragging = true;
    this._thumbActive = true;

    document.addEventListener('mousemove', this._handleScrollThumbMouseMove);
    document.addEventListener('mouseup', this._handleScrollThumbMouseUp);
  }

  private _handleScrollThumbMouseMove = (event: MouseEvent) => {
    const rawThumbPos =
      this._scrollThumbStartY + (event.screenY - this._mouseStartY);
    this._thumbY = this._limitThumbPos(rawThumbPos);
    this.scrollPos = this._calculateScrollPosFromThumbPos(this._thumbY);

    this.dispatchEvent(
      new CustomEvent('vsc-scrollable-change', {
        detail: this.scrollPos,
      })
    );
  };

  private _handleScrollThumbMouseUp = (event: MouseEvent) => {
    this._isDragging = false;
    this._thumbActive = false;

    const cr = this.getBoundingClientRect();
    const {x, y, width, height} = cr;
    const {pageX, pageY} = event;

    if (pageX > x + width || pageX < x || pageY > y + height || pageY < y) {
      this._thumbFade = true;
      this._thumbVisible = false;
    }

    document.removeEventListener('mousemove', this._handleScrollThumbMouseMove);
    document.removeEventListener('mouseup', this._handleScrollThumbMouseUp);
  };

  private _handleScrollableContainerScroll = () => {
    this._updateThumbPosition();
  };

  private _handleComponentMouseOver = () => {
    this._thumbVisible = true;
    this._thumbFade = false;
  };

  private _handleComponentMouseOut = () => {
    if (!this._thumbActive) {
      this._thumbVisible = false;
      this._thumbFade = true;
    }
  };

  private _handleComponentWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    this.scrollPos = this._limitScrollPos(this.scrollPos + ev.deltaY);
    this.dispatchEvent(
      new CustomEvent('vsc-scrollable-change', {
        detail: this.scrollPos,
      })
    );
  };

  private _handleScrollbarTrackPress(ev: PointerEvent) {
    if (ev.target !== ev.currentTarget) {
      return;
    }

    this._thumbY = ev.offsetY - this._thumbHeight / 2;
    this.scrollPos = this._calculateScrollPosFromThumbPos(this._thumbY);
  }

  //#endregion

  override render(): TemplateResult {
    return html`
      <div
        class="scrollable-container"
        .style=${stylePropertyMap({
          userSelect: this._isDragging ? 'none' : 'auto',
        })}
        .scrollTop=${this._scrollPos}
        @scroll=${this._handleScrollableContainerScroll}
      >
        <div
          class=${classMap({shadow: true, visible: this.scrolled})}
          .style=${stylePropertyMap({
            zIndex: String(this._scrollbarTrackZ),
          })}
        ></div>
        ${this._isDragging
          ? html`<div class="prevent-interaction"></div>`
          : nothing}
        <div
          class=${classMap({
            'scrollbar-track': true,
            hidden: !this._scrollbarVisible,
          })}
          @mousedown=${this._handleScrollbarTrackPress}
        >
          <div
            class=${classMap({
              'scrollbar-thumb': true,
              visible: this.alwaysVisible ? true : this._thumbVisible,
              fade: this.alwaysVisible ? false : this._thumbFade,
              active: this._thumbActive,
            })}
            .style=${stylePropertyMap({
              height: `${this._thumbHeight}px`,
              top: `${this._thumbY}px`,
            })}
            @mousedown=${this._handleScrollThumbMouseDown}
          ></div>
        </div>
        <div class="content">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-scrollable': VscodeScrollable;
  }
}
