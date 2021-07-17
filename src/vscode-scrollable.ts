import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  TemplateResult,
  state,
  query,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';

@customElement('vscode-scrollable')
export class VscodeScrollable extends LitElement {
  @property({type: Boolean}) shadow = true;
  @property({type: Boolean, reflect: false}) scrolled = false;

  @state()
  private _contentHeight = 0;

  @state()
  private _scrollThumbHeight = 0;

  @state()
  private _scrollThumbY = 0;

  @state()
  private _isDragging = false;

  @query('.content')
  private _contentElement!: HTMLDivElement;

  @query('.scrollbar-thumb')
  private _scrollThumbElement!: HTMLDivElement;

  @query('.scrollable-container')
  private _scrollableContainer!: HTMLDivElement;

  private _resizeObserver!: ResizeObserver;
  private _scrollThumbStartY = 0;
  private _mouseStartY = 0;

  connectedCallback(): void {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(
      this._resizeObserverCallbackBound
    );

    this._resizeObserver.observe(this);

    this.requestUpdate().then(() => {
      /* this._scrollableContainer = this.shadowRoot?.querySelector(
        '.scrollable-container'
      ) as HTMLDivElement; */
      this._scrollableContainer.addEventListener(
        'scroll',
        this._onScrollableContainerScroll.bind(this)
      );
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._resizeObserver.unobserve(this);
    this._resizeObserver.disconnect();
  }

  private _resizeObserverCallback() {
    const compCr = this.getBoundingClientRect();
    const contentCr = this._contentElement.getBoundingClientRect();

    this._scrollThumbHeight =
      compCr.height * (compCr.height / contentCr.height);
  }

  private _resizeObserverCallbackBound =
    this._resizeObserverCallback.bind(this);

  private _onSlotChange() {
    const cr = this.shadowRoot
      ?.querySelector('.content')
      ?.getBoundingClientRect();

    this._contentHeight = cr?.height as number;
  }

  private _onScrollThumbMouseDown(event: MouseEvent) {
    const cmpCr = this.getBoundingClientRect();
    const thCr = this._scrollThumbElement.getBoundingClientRect();

    this._mouseStartY = event.screenY;
    this._scrollThumbStartY = thCr.top - cmpCr.top;
    this._isDragging = true;
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

    this._scrollThumbY = nextPos;
    // nextPost / (cmpH - thumbH) * (contentH - cmpH) = scrollTop
    this._scrollableContainer.scrollTop =
      (nextPos / (cmpH - thumbH)) * (contentH - cmpH);
  }

  private _onScrollThumbMouseMoveBound =
    this._onScrollThumbMouseMove.bind(this);

  private _onScrollThumbMouseUp() {
    this._isDragging = false;
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
    console.log('o', overflown);

    this._scrollThumbY = ratio * (cmpH - thumbH);
    console.log(this._scrollableContainer.scrollTop);

    /*
    scrollThumbY = scrollTop / overflown * (cmpH - thumbH)
    scrollThumbY / (cmpH - thumbH) * overflown = scrollTop;
    */
  }

  static get styles(): CSSResult {
    return css`
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

      /* .scrollable-container::-webkit-scrollbar {
        cursor: default;
        width: 10px;
      }

      .scrollable-container::-webkit-scrollbar-button {
        display: none;
      }

      .scrollable-container:hover::-webkit-scrollbar-button {
        display: none;
      }

      .scrollable-container::-webkit-scrollbar-track {
        background-color: transparent;
        width: 10px;
      }

      .scrollable-container::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb {
        background-color: var(--vscode-scrollbarSlider-background);
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb:hover {
        background-color: var(--vscode-scrollbarSlider-hoverBackground);
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb:active {
        background-color: var(--vscode-scrollbarSlider-activeBackground);
      } */

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

      .scrollbar-thumb {
        background-color: red;
        position: absolute;
        right: 0;
        width: 10px;
      }

      .content {
        overflow: hidden;
      }
    `;
  }

  render(): TemplateResult {
    const shadowClasses = classMap({shadow: true, visible: this.scrolled});

    return html`
      <div
        class="scrollable-container"
        style="${styleMap({
          'user-select': this._isDragging ? 'none' : 'auto',
        })}"
      >
        <div class="${shadowClasses}"></div>
        <div class="scrollbar-track">
          <div
            class="scrollbar-thumb"
            style="${styleMap({
              height: `${this._scrollThumbHeight}px`,
              top: `${this._scrollThumbY}px`,
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
