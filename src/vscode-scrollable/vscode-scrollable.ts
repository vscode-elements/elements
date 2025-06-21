import {html, nothing, TemplateResult} from 'lit';
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

  @property({type: Boolean, reflect: true})
  shadow = true;

  @property({type: Boolean, reflect: true})
  scrolled = false;

  @property({type: Number, attribute: 'scroll-pos'})
  set scrollPos(val: number) {
    this._scrollPos = val;
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
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._hostResizeObserver = new ResizeObserver(this._resizeObserverCallback);
    this._contentResizeObserver = new ResizeObserver(
      this._resizeObserverCallback
    );

    this.requestUpdate();

    this.updateComplete.then(() => {
      this._scrollableContainer.addEventListener(
        'scroll',
        this._onScrollableContainerScroll.bind(this)
      );
      this._hostResizeObserver.observe(this);
      this._contentResizeObserver.observe(this._contentElement);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this._hostResizeObserver.unobserve(this);
    this._hostResizeObserver.disconnect();
    this._contentResizeObserver.unobserve(this._contentElement);
    this._contentResizeObserver.disconnect();
  }

  private _resizeObserverCallback = () => {
    this._updateScrollbar();
  };

  private _updateScrollbar() {
    const compCr = this.getBoundingClientRect();
    const contentCr = this._contentElement.getBoundingClientRect();

    if (compCr.height >= contentCr.height) {
      this._scrollbarVisible = false;
    } else {
      this._scrollbarVisible = true;
      this._thumbHeight = compCr.height * (compCr.height / contentCr.height);
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

  private _updateThumb() {
    const scrollTop = this._scrollableContainer.scrollTop;
    this.scrolled = scrollTop > 0;

    const cmpH = this.getBoundingClientRect().height;
    const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
    const contentH = this._contentElement.getBoundingClientRect().height;

    const overflown = contentH - cmpH;
    const ratio = scrollTop / overflown;

    this._thumbY = ratio * (cmpH - thumbH);
  }

  private _onSlotChange = () => {
    this._updateThumb();
    this._zIndexFix();
  };

  private _onScrollThumbMouseDown(event: MouseEvent) {
    const cmpCr = this.getBoundingClientRect();
    const thCr = this._scrollThumbElement.getBoundingClientRect();

    this._mouseStartY = event.screenY;
    this._scrollThumbStartY = thCr.top - cmpCr.top;
    this._isDragging = true;
    this._thumbActive = true;

    document.addEventListener('mousemove', this._onScrollThumbMouseMoveBound);
    document.addEventListener('mouseup', this._onScrollThumbMouseUpBound);
  }

  private _onScrollThumbMouseMove(event: MouseEvent) {
    const predictedPos =
      this._scrollThumbStartY + (event.screenY - this._mouseStartY);
    let nextPos = 0;
    const cmpH = this.getBoundingClientRect().height;
    const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
    const contentH = this._contentElement.getBoundingClientRect().height;

    if (predictedPos < 0) {
      nextPos = 0;
    } else if (predictedPos > cmpH - thumbH) {
      nextPos = cmpH - thumbH;
    } else {
      nextPos = predictedPos;
    }

    this._thumbY = nextPos;
    this._scrollableContainer.scrollTop =
      (nextPos / (cmpH - thumbH)) * (contentH - cmpH);
  }

  private _onScrollThumbMouseMoveBound =
    this._onScrollThumbMouseMove.bind(this);

  private _onScrollThumbMouseUp(event: MouseEvent) {
    this._isDragging = false;
    this._thumbActive = false;

    const cr = this.getBoundingClientRect();
    const {x, y, width, height} = cr;
    const {pageX, pageY} = event;

    if (pageX > x + width || pageX < x || pageY > y + height || pageY < y) {
      this._thumbFade = true;
      this._thumbVisible = false;
    }

    document.removeEventListener(
      'mousemove',
      this._onScrollThumbMouseMoveBound
    );
    document.removeEventListener('mouseup', this._onScrollThumbMouseUpBound);
  }

  private _onScrollThumbMouseUpBound = this._onScrollThumbMouseUp.bind(this);

  private _onScrollableContainerScroll() {
    this._updateThumb();
  }

  private _handleComponentMouseOver = () => {
    this._updateThumb();

    this._thumbVisible = true;
    this._thumbFade = false;
  };

  private _handleComponentMouseOut = () => {
    if (!this._thumbActive) {
      this._thumbVisible = false;
      this._thumbFade = true;
    }
  };

  override render(): TemplateResult {
    return html`
      <div
        class="scrollable-container"
        .style=${stylePropertyMap({
          userSelect: this._isDragging ? 'none' : 'auto',
        })}
        .scrollTop=${this._scrollPos}
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
        >
          <div
            class=${classMap({
              'scrollbar-thumb': true,
              visible: this._thumbVisible,
              fade: this._thumbFade,
              active: this._thumbActive,
            })}
            .style=${stylePropertyMap({
              height: `${this._thumbHeight}px`,
              top: `${this._thumbY}px`,
            })}
            @mousedown=${this._onScrollThumbMouseDown}
          ></div>
        </div>
        <div class="content">
          <slot @slotchange=${this._onSlotChange}></slot>
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
