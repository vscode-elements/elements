import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  queryAll,
  queryAssignedNodes,
  state,
  TemplateResult,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';
import './vscode-scrollable';
import {VscodeScrollable} from './vscode-scrollable';
import {VscodeTableCell} from './vscode-table-cell';
import {VscodeTableHeader} from './vscode-table-header';
import {VscodeTableHeaderCell} from './vscode-table-header-cell';

/**
 * @attr {Boolean} zebra
 * @attr {Boolean} bordered
 */
@customElement('vscode-table')
export class VscodeTable extends LitElement {
  @property({reflect: true})
  role = 'table';

  /**
   * Initial column sizes. It accepts any valid CSS value.
   */
  @property({type: Array})
  set columns(val: string[]) {
    this._colums = val;
    this._applyDefaultColumnSizes();
  }
  get columns(): string[] {
    return this._colums;
  }

  @property({type: Number, attribute: 'min-column-width'})
  minColumnWidth = 100;

  @property({type: Boolean, attribute: 'delayed-resizing'})
  delayedResizing = false;

  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  @query('.header')
  private _headerElement!: HTMLDivElement;

  @query('.scrollable')
  private _scrollableElement!: VscodeScrollable;

  @queryAll('.sash-visible')
  private _sashVisibleElements!: HTMLDivElement[];

  @queryAssignedNodes('header', true, 'vscode-table-header')
  private _assignedHeaderElements!: NodeListOf<VscodeTableHeader>;

  @state()
  private _sashPositions: number[] = [];

  @state()
  private _percentageSashPositions = false;

  @state()
  private _isDragging = false;

  private _sashHovers: boolean[] = [];
  private _colums: string[] = [];
  private _componentResizeObserver!: ResizeObserver;
  private _headerResizeObserver!: ResizeObserver;
  private _activeSashElementIndex = -1;
  private _activeSashCursorOffset = 0;
  private _componentX = 0;
  private _componentH = 0;
  private _componentW = 0;
  private _headerCells: VscodeTableHeaderCell[] = [];
  private _cellsToResize!: VscodeTableCell[];
  private _headerCellsToResize!: VscodeTableHeaderCell[];
  private _prevHeaderHeight = 0;
  private _prevComponentHeight = 0;

  connectedCallback(): void {
    super.connectedCallback();

    if (this.hasAttribute('vsc-cloak')) {
      this.removeAttribute('vsc-cloak');
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._componentResizeObserver.unobserve(this);
    this._componentResizeObserver.disconnect();
  }

  private _queryHeaderCells() {
    const headers = this._assignedHeaderElements;

    if (!headers.length) {
      return [];
    }

    return [
      ...headers[0].querySelectorAll<VscodeTableHeaderCell>(
        'vscode-table-header-cell'
      ),
    ];
  }

  private _getHeaderCells() {
    if (!this._headerCells.length) {
      this._headerCells = this._queryHeaderCells();

      return this._headerCells;
    }

    return this._headerCells;
  }

  private _initResizeObserver() {
    this._componentResizeObserver = new ResizeObserver(
      this._componentResizeObserverCallbackBound
    );
    this._componentResizeObserver.observe(this);

    this._headerResizeObserver = new ResizeObserver(
      this._headerResizeObserverCallbackBound
    );
    this._headerResizeObserver.observe(this._headerElement);
  }

  private _componentResizeObserverCallback() {
    const cr = this.getBoundingClientRect();

    this._componentH = cr.height;
    this._componentW = cr.width;
    this._componentX = cr.x;

    this._updateHeaderCellSizes();
    this._updateScrollpaneSize();
  }

  private _componentResizeObserverCallbackBound =
    this._componentResizeObserverCallback.bind(this);

  private _headerResizeObserverCallback() {
    this._updateScrollpaneSize();
  }

  private _headerResizeObserverCallbackBound =
    this._headerResizeObserverCallback.bind(this);

  private _updateHeaderCellSizes() {
    const thead = this._headerSlot.assignedElements()[0];
    const headerCells = thead.querySelectorAll('vscode-table-header-cell');

    this._sashHovers = [];

    for (let i = 0; i < headerCells.length - 1; i++) {
      this._sashHovers.push(false);
    }

    const tbody = this._bodySlot.assignedElements()[0];
    const cells = tbody.querySelectorAll(
      'vscode-table-row:first-child vscode-table-cell'
    );

    window.requestAnimationFrame(() => {
      const l = cells.length;
      let prevHandlerPos = 0;
      this._sashPositions = [];

      cells.forEach((cell, index) => {
        const br = cell.getBoundingClientRect();
        const pos = br.width;

        if (index < l - 1) {
          this._sashPositions.push(prevHandlerPos + pos);
          prevHandlerPos = prevHandlerPos + pos;
        }

        headerCells[index].style.width = `${pos}px`;
      });
    });
  }

  private _applyDefaultColumnSizes() {
    if (!this._bodySlot) {
      return;
    }

    const bodySlotAssignedElements = this._bodySlot.assignedElements();

    if (!bodySlotAssignedElements || bodySlotAssignedElements.length < 1) {
      return;
    }

    const tbody = bodySlotAssignedElements[0];
    const cellsOfFirstRow = tbody.querySelectorAll<VscodeTableCell>(
      'vscode-table-row:first-child > vscode-table-cell'
    );

    if (!cellsOfFirstRow) {
      return;
    }

    cellsOfFirstRow.forEach((cell, index) => {
      if (this._colums[index]) {
        cell.style.width = this._colums[index];
      } else {
        cell.style.width = 'auto';
      }
    });

    this._updateHeaderCellSizes();
  }

  private _updateScrollpaneSize() {
    const headerCr = this._headerElement.getBoundingClientRect();

    if (
      headerCr.height === this._prevHeaderHeight &&
      this._componentH === this._prevComponentHeight
    ) {
      return;
    }

    this._prevHeaderHeight = headerCr.height;
    this._prevComponentHeight = this._componentH;
    const scrollableH = this._componentH - headerCr.height;
    this._scrollableElement.style.height = `${scrollableH}px`;

    this._sashVisibleElements.forEach((el) => {
      el.style.height = `${scrollableH}px`;
      el.style.top = `${headerCr.height}px`;
    });
  }

  private _onHeaderSlotChange() {
    this._headerCells = this._queryHeaderCells();
  }

  private _onBodySlotChange() {
    this._updateHeaderCellSizes();
    this._applyDefaultColumnSizes();
    this._initResizeObserver();
  }

  private _onSashMouseOver(event: MouseEvent) {
    if (this._isDragging) {
      return;
    }

    const target = event.currentTarget as HTMLDivElement;
    const index = Number(target.dataset.index);
    this._sashHovers[index] = true;
    this.requestUpdate();
  }

  private _onSashMouseOut(event: MouseEvent) {
    event.stopPropagation();

    if (this._isDragging) {
      return;
    }

    const target = event.currentTarget as HTMLDivElement;
    const index = Number(target.dataset.index);
    this._sashHovers[index] = false;
    this.requestUpdate();
  }

  private _onSashMouseDown(event: MouseEvent) {
    event.stopPropagation();

    const {pageX, currentTarget} = event;
    const el = currentTarget as HTMLDivElement;
    const index = Number(el.dataset.index);
    const cr = el.getBoundingClientRect();
    const elX = cr.x;
    const cmpCr = this.getBoundingClientRect();

    this._isDragging = true;
    this._activeSashElementIndex = index;
    this._sashHovers[this._activeSashElementIndex] = true;
    this._activeSashCursorOffset = pageX - elX;
    this._componentX = cmpCr.x;
    this._componentW = cmpCr.width;

    const headerCells = this._getHeaderCells();
    this._headerCellsToResize = [];
    this._headerCellsToResize.push(headerCells[index]);

    if (headerCells[index + 1]) {
      this._headerCellsToResize[1] = headerCells[index + 1];
    }

    const tbody = this._bodySlot.assignedElements()[0];
    const cells = tbody.querySelectorAll<VscodeTableCell>(
      'vscode-table-row:first-child > vscode-table-cell'
    );
    this._cellsToResize = [];
    this._cellsToResize.push(cells[index]);

    if (cells[index + 1]) {
      this._cellsToResize.push(cells[index + 1]);
    }

    document.addEventListener('mousemove', this._onResizingMouseMoveBound);
    document.addEventListener('mouseup', this._onResizingMouseUpBound);
  }

  private _updateActiveSashPosition(mouseX: number, percentage = false) {
    const {prevSashPos, nextSashPos} = this._getSashPositions();
    const minX = prevSashPos
      ? prevSashPos + this.minColumnWidth
      : this.minColumnWidth;
    const maxX = nextSashPos
      ? nextSashPos - this.minColumnWidth
      : this._componentW - this.minColumnWidth;
    let newX = mouseX - this._componentX - this._activeSashCursorOffset;

    newX = Math.max(newX, minX);
    newX = Math.min(newX, maxX);

    this._sashPositions[this._activeSashElementIndex] = newX;
    this._percentageSashPositions = percentage;
    this.requestUpdate();
  }

  private _getSashPositions(): {
    sashPos: number;
    prevSashPos: number;
    nextSashPos: number;
  } {
    const sashPos = this._sashPositions[this._activeSashElementIndex];
    const prevSashPos =
      this._sashPositions[this._activeSashElementIndex - 1] || 0;
    const nextSashPos =
      this._sashPositions[this._activeSashElementIndex + 1] || this._componentW;

    return {
      sashPos,
      prevSashPos,
      nextSashPos,
    };
  }

  private _resizeColumns(resizeBodyCells = true, percentage = false) {
    const {sashPos, prevSashPos, nextSashPos} = this._getSashPositions();

    const prevColW = sashPos - prevSashPos;
    const nextColW = nextSashPos - sashPos;
    const prevColCss = percentage
      ? `${(prevColW / this._componentW) * 100}%`
      : `${prevColW}px`;
    const nextColCss = percentage
    ? `${(nextColW / this._componentW) * 100}%`
    : `${nextColW}px`;

    this._headerCellsToResize[0].style.width = prevColCss;

    if (this._headerCellsToResize[1]) {
      this._headerCellsToResize[1].style.width = nextColCss;
    }

    if (resizeBodyCells) {
      this._cellsToResize[0].style.width = prevColCss;

      if (this._cellsToResize[1]) {
        this._cellsToResize[1].style.width = nextColCss;
      }
    }
  }

  private _onResizingMouseMove(event: MouseEvent) {
    event.stopPropagation();
    this._updateActiveSashPosition(event.pageX);

    if (!this.delayedResizing) {
      this._resizeColumns(true);
    } else {
      this._resizeColumns(false);
    }
  }

  private _onResizingMouseMoveBound = this._onResizingMouseMove.bind(this);

  private _onResizingMouseUp(event: MouseEvent) {
    this._resizeColumns(true, true);
    this._updateActiveSashPosition(event.pageX, true);
    this._sashHovers[this._activeSashElementIndex] = false;
    this._isDragging = false;
    this._activeSashElementIndex = -1;

    document.removeEventListener('mousemove', this._onResizingMouseMoveBound);
    document.removeEventListener('mouseup', this._onResizingMouseUpBound);
  }

  private _onResizingMouseUpBound = this._onResizingMouseUp.bind(this);

  static styles = css`
    :host {
      display: block;
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .wrapper {
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .wrapper.select-disabled {
      user-select: none;
    }

    .scrollable {
      height: 100%;
    }

    :host(:not([bordered])) .sash {
      visibility: hidden;
    }

    :host(:not([bordered])) .wrapper:hover .sash {
      visibility: visible;
    }

    .sash {
      cursor: ew-resize;
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .sash-visible {
      background-color: var(--vscode-editorGroup-border);
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .sash.hover .sash-visible {
      background-color: var(--vscode-sash-hoverBorder);
      transition: background-color 50ms linear 300ms;
    }

    .sash .sash-clickable {
      background-color: transparent;
      height: 100%;
      left: -2px;
      position: absolute;
      width: 5px;
    }
  `;

  render(): TemplateResult {
    const sashes = this._sashPositions.map((val, index) => {
      const classes = classMap({
        sash: true,
        hover: this._sashHovers[index],
      });

      let pos = val;

      if (this._percentageSashPositions) {
        pos = (val / this._componentW) * 100;
      }

      const left = this._percentageSashPositions ? `${pos}%` : `${pos}px`;

      return html`
        <div
          class="${classes}"
          data-index="${index}"
          style="${styleMap({left})}"
          @mousedown="${this._onSashMouseDown}"
          @mouseover="${this._onSashMouseOver}"
          @mouseout="${this._onSashMouseOut}"
        >
          <div class="sash-visible"></div>
          <div class="sash-clickable"></div>
        </div>
      `;
    });

    const wrapperClasses = classMap({
      wrapper: true,
      'select-disabled': this._isDragging,
    });

    return html`
      <div class="${wrapperClasses}">
        <slot name="caption"></slot>
        <div class="header" @slotchange="${this._onHeaderSlotChange}">
          <slot name="header"></slot>
        </div>
        <vscode-scrollable class="scrollable">
          <div>
            <slot name="body" @slotchange="${this._onBodySlotChange}"></slot>
          </div>
        </vscode-scrollable>
        ${sashes}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table': VscodeTable;
  }
}
