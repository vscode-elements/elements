import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators';
import {classMap} from 'lit/directives/class-map';
import {styleMap} from 'lit/directives/style-map';
import {VscElement} from './includes/VscElement';

@customElement('vscode-scrollable')
export class VscodeScrollable extends VscElement {
  @property({type: Boolean, reflect: true})
  shadow = true;

  @property({type: Boolean, reflect: true})
  scrolled = false;

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

  @query('.scrollbar-thumb')
  private _scrollThumbElement!: HTMLDivElement;

  @query('.scrollable-container')
  private _scrollableContainer!: HTMLDivElement;

  private _resizeObserver!: ResizeObserver;
  private _scrollThumbStartY = 0;
  private _mouseStartY = 0;
  private _scrollbarVisible = true;

  connectedCallback(): void {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(
      this._resizeObserverCallbackBound
    );

    this._resizeObserver.observe(this);

    this.requestUpdate();

    this.updateComplete.then(() => {
      this._scrollableContainer.addEventListener(
        'scroll',
        this._onScrollableContainerScroll.bind(this)
      );
    });

    this.addEventListener('mouseover', this._onComponentMouseOverBound);
    this.addEventListener('mouseout', this._onComponentMouseOutBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._resizeObserver.unobserve(this);
    this._resizeObserver.disconnect();

    this.removeEventListener('mouseover', this._onComponentMouseOverBound);
    this.removeEventListener('mouseout', this._onComponentMouseOutBound);
  }

  private _resizeObserverCallback() {
    this._updateScrollbar();
  }

  private _resizeObserverCallbackBound =
    this._resizeObserverCallback.bind(this);

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

  private _onSlotChange() {
    this._updateScrollbar();
  }

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
    const scrollTop = this._scrollableContainer.scrollTop;
    this.scrolled = scrollTop > 0;

    const cmpH = this.getBoundingClientRect().height;
    const thumbH = this._scrollThumbElement.getBoundingClientRect().height;
    const contentH = this._contentElement.getBoundingClientRect().height;

    const overflown = contentH - cmpH;
    const ratio = scrollTop / overflown;

    this._thumbY = ratio * (cmpH - thumbH);
  }

  private _onComponentMouseOver() {
    this._thumbVisible = true;
    this._thumbFade = false;
  }

  private _onComponentMouseOverBound = this._onComponentMouseOver.bind(this);

  private _onComponentMouseOut() {
    if (!this._thumbActive) {
      this._thumbVisible = false;
      this._thumbFade = true;
    }
  }

  private _onComponentMouseOutBound = this._onComponentMouseOut.bind(this);

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
        }

        .scrollable-container {
          height: 100%;
          overflow: auto;
        }

        .scrollable-container::-webkit-scrollbar {
          cursor: default;
          width: 0;
        }

        .shadow {
          box-shadow: var(--vscode-scrollbar-shadow) 0 6px 6px -6px inset;
          display: none;
          height: 3px;
          left: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 1;
          width: 100%;
        }

        .shadow.visible {
          display: block;
        }

        .scrollbar-track {
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 10px;
        }

        .scrollbar-track.hidden {
          display: none;
        }

        .scrollbar-thumb {
          background-color: transparent;
          min-height: var(--min-thumb-height, 20px);
          opacity: 0;
          position: absolute;
          right: 0;
          width: 10px;
        }

        .scrollbar-thumb.visible {
          background-color: var(--vscode-scrollbarSlider-background);
          opacity: 1;
          transition: opacity 100ms;
        }

        .scrollbar-thumb.fade {
          background-color: var(--vscode-scrollbarSlider-background);
          opacity: 0;
          transition: opacity 800ms;
        }

        .scrollbar-thumb.visible:hover {
          background-color: var(--vscode-scrollbarSlider-hoverBackground);
        }

        .scrollbar-thumb.visible.active,
        .scrollbar-thumb.visible.active:hover {
          background-color: var(--vscode-scrollbarSlider-activeBackground);
        }

        .content {
          overflow: hidden;
        }
      `,
    ];
  }

  render(): TemplateResult {
    const shadowClasses = classMap({shadow: true, visible: this.scrolled});
    const thumbClasses = classMap({
      'scrollbar-thumb': true,
      visible: this._thumbVisible,
      fade: this._thumbFade,
      active: this._thumbActive,
    });
    const scrollbarClasses = classMap({
      'scrollbar-track': true,
      hidden: !this._scrollbarVisible,
    });

    return html`
      <div
        class="scrollable-container"
        style="${styleMap({
          'user-select': this._isDragging ? 'none' : 'auto',
        })}"
      >
        <div class="${shadowClasses}"></div>
        <div class="${scrollbarClasses}">
          <div
            class="${thumbClasses}"
            style="${styleMap({
              height: `${this._thumbHeight}px`,
              top: `${this._thumbY}px`,
            })}"
            @mousedown=${this._onScrollThumbMouseDown}
          ></div>
        </div>
        <div class="content">
          <slot @slotchange="${this._onSlotChange}"></slot>
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
