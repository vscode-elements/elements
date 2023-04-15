import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  query,
  queryAll,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from './includes/VscElement';
import './vscode-scrollable';
import {VscodeScrollable} from './vscode-scrollable';
import {VscodeTableBody} from './vscode-table-body';
import {VscodeTableCell} from './vscode-table-cell';
import {VscodeTableHeader} from './vscode-table-header';
import {VscodeTableHeaderCell} from './vscode-table-header-cell';
import {rawValueToPercentage} from './vscode-table/helpers';

const COMPONENT_WIDTH_PERCENTAGE = 100;

/**
 * @attr {Boolean} zebra
 * @attr {Boolean} bordered
 */
@customElement('vscode-table')
export class VscodeTable extends VscElement {
  @property({reflect: true})
  role = 'table';

  @property({type: Boolean})
  resizable = false;

  @property({type: Boolean, reflect: true})
  responsive = false;

  @property({type: Number})
  breakpoint = 300;

  /**
   * Initial column sizes in a JSON-encoded array.
   * Accepted values are:
   * - number
   * - string-type number (ex.: "100")
   * - px value (ex.: "100px")
   * - percentage value (ex.: "50%")
   * - percentage value (ex.: "50%")
   * - "auto" keyword
   */
  @property({type: Array})
  set columns(val: string[]) {
    this._columns = val;

    if (this.isConnected) {
      this._initDefaultColumnSizes();
    }
  }
  get columns(): string[] {
    return this._columns;
  }

  /**
   * Minimum column width. Valid values are:
   * - number
   * - string-type number (ex.: "100")
   * - px value (ex.: "100px")
   * - percentage value (ex.: "50%")
   * - percentage value (ex.: "50%")
   * - "auto" keyword
   */
  @property({attribute: 'min-column-width'})
  minColumnWidth = '50px';

  @property({type: Boolean, attribute: 'delayed-resizing'})
  delayedResizing = false;

  /**
   * For internal use only
   */
  @property({type: Boolean, reflect: true})
  compact = false;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  @query('.header')
  private _headerElement!: HTMLDivElement;

  @query('.scrollable')
  private _scrollableElement!: VscodeScrollable;

  @queryAll('.sash-visible')
  private _sashVisibleElements!: HTMLDivElement[];

  // TODO: replace deprecated decorators
  @queryAssignedNodes('header', true, 'vscode-table-header')
  private _assignedHeaderElements!: NodeListOf<VscodeTableHeader>;

  @queryAssignedNodes('body', true, 'vscode-table-body')
  private _assignedBodyElements!: NodeListOf<VscodeTableBody>;

  /**
   * Sash positions in percentage
   */
  @state()
  private _sashPositions: number[] = [];

  @state()
  private _isDragging = false;

  /**
   * Sash hover state flags, used in the render.
   */
  private _sashHovers: boolean[] = [];
  private _columns: string[] = [];
  private _componentResizeObserver!: ResizeObserver;
  private _headerResizeObserver!: ResizeObserver;
  private _activeSashElementIndex = -1;
  private _activeSashCursorOffset = 0;
  private _componentX = 0;
  private _componentH = 0;
  private _componentW = 0;
  /**
   * Cached querySelectorAll result. Updated when the header slot changes.
   * It shouldn't be used directly, check the "_getHeaderCells" function.
   */
  private _headerCells: VscodeTableHeaderCell[] = [];
  /**
   * Cached querySelectorAll result. Updated when the body slot changes.
   * It shouldn't be used directly, check the "_getCellsOfFirstRow" function.
   */
  private _cellsOfFirstRow: VscodeTableCell[] = [];
  private _cellsToResize!: VscodeTableCell[];
  private _headerCellsToResize!: VscodeTableHeaderCell[];
  private _prevHeaderHeight = 0;
  private _prevComponentHeight = 0;

  connectedCallback(): void {
    super.connectedCallback();

    this._memoizeComponentDimensions();
    this._initDefaultColumnSizes();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._componentResizeObserver.unobserve(this);
    this._componentResizeObserver.disconnect();
  }

  private _px2Percent(px: number) {
    return (px / this._componentW) * 100;
  }

  private _percent2Px(percent: number) {
    return (this._componentW * percent) / 100;
  }

  private _memoizeComponentDimensions() {
    const cr = this.getBoundingClientRect();

    this._componentH = cr.height;
    this._componentW = cr.width;
    this._componentX = cr.x;
  }

  private _queryHeaderCells() {
    const headers = this._assignedHeaderElements;

    if (!(headers && headers[0])) {
      return [];
    }

    return Array.from(
      headers[0].querySelectorAll<VscodeTableHeaderCell>(
        'vscode-table-header-cell'
      )
    );
  }

  /**
   * Get cached header cells
   */
  private _getHeaderCells() {
    if (!this._headerCells.length) {
      this._headerCells = this._queryHeaderCells();
    }

    return this._headerCells;
  }

  private _queryCellsOfFirstRow() {
    const assignedBodyElements = this._assignedBodyElements;

    if (!(assignedBodyElements && assignedBodyElements[0])) {
      return [];
    }

    return Array.from(
      assignedBodyElements[0].querySelectorAll<VscodeTableCell>(
        'vscode-table-row:first-child vscode-table-cell'
      )
    );
  }

  /**
   * Get cached cells of first row
   */
  private _getCellsOfFirstRow() {
    if (!this._cellsOfFirstRow.length) {
      this._cellsOfFirstRow = this._queryCellsOfFirstRow();
    }

    return this._cellsOfFirstRow;
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
    this._memoizeComponentDimensions();
    this._updateScrollpaneSize();

    if (this.responsive) {
      this._toggleCompactView();
    }
  }

  private _componentResizeObserverCallbackBound =
    this._componentResizeObserverCallback.bind(this);

  private _headerResizeObserverCallback() {
    this._updateScrollpaneSize();
  }

  private _headerResizeObserverCallbackBound =
    this._headerResizeObserverCallback.bind(this);

  private _calcColWidthPercentages(): number[] {
    const numCols = this._getHeaderCells().length;
    let cols: (string | number)[] = this.columns.slice(0, numCols);
    const numAutoCols =
      cols.filter((c) => c === 'auto').length + numCols - cols.length;
    let availablePercent = 100;

    cols = cols.map((col) => {
      const percentage = rawValueToPercentage(col, this._componentW);

      if (percentage === null) {
        return 'auto';
      }

      availablePercent -= percentage;

      return percentage;
    });

    if (cols.length < numCols) {
      for (let i = cols.length; i < numCols; i++) {
        cols.push('auto');
      }
    }

    cols = cols.map((col) => {
      if (col === 'auto') {
        return availablePercent / numAutoCols;
      }

      return col as number;
    });

    return cols as number[];
  }

  private _initHeaderCellSizes(colWidths: number[]) {
    this._getHeaderCells().forEach((cell, index) => {
      cell.style.width = `${colWidths[index]}%`;
    });
  }

  private _initBodyColumnSizes(colWidths: number[]) {
    this._getCellsOfFirstRow().forEach((cell, index) => {
      cell.style.width = `${colWidths[index]}%`;
    });
  }

  private _initSashes(colWidths: number[]) {
    const l = colWidths.length;
    let prevHandlerPos = 0;
    this._sashPositions = [];

    colWidths.forEach((collW, index) => {
      if (index < l - 1) {
        const pos = prevHandlerPos + collW;

        this._sashPositions.push(pos);
        prevHandlerPos = pos;
      }
    });
  }

  private _initDefaultColumnSizes() {
    const colWidths = this._calcColWidthPercentages();

    this._initHeaderCellSizes(colWidths);
    this._initBodyColumnSizes(colWidths);
    this._initSashes(colWidths);
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

  private _applyCompactViewColumnLabels() {
    const headerCells = this._getHeaderCells();
    const labels = headerCells.map((c) => c.innerText);
    const rows = this.querySelectorAll('vscode-table-row');

    rows.forEach((r) => {
      const cells = r.querySelectorAll('vscode-table-cell');

      cells.forEach((c, i) => {
        c.columnLabel = labels[i];
        c.compact = true;
      });
    });
  }

  private _clearCompactViewColumnLabels() {
    this.querySelectorAll('vscode-table-cell').forEach((c) => {
      c.columnLabel = '';
      c.compact = false;
    });
  }

  private _toggleCompactView() {
    const cr = this.getBoundingClientRect();
    const nextCompactView = cr.width < this.breakpoint;

    if (this.compact !== nextCompactView) {
      this.compact = nextCompactView;

      if (nextCompactView) {
        this._applyCompactViewColumnLabels();
      } else {
        this._clearCompactViewColumnLabels();
      }
    }
  }

  private _onHeaderSlotChange() {
    this._headerCells = this._queryHeaderCells();
  }

  private _onBodySlotChange() {
    this._initDefaultColumnSizes();
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

    this._isDragging = true;
    this._activeSashElementIndex = index;
    this._sashHovers[this._activeSashElementIndex] = true;
    this._activeSashCursorOffset = this._px2Percent(pageX - elX);

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

  private _updateActiveSashPosition(mouseX: number) {
    const {prevSashPos, nextSashPos} = this._getSashPositions();
    let minColumnWidth = rawValueToPercentage(
      this.minColumnWidth,
      this._componentW
    );

    if (minColumnWidth === null) {
      minColumnWidth = 0;
    }

    const minX = prevSashPos ? prevSashPos + minColumnWidth : minColumnWidth;
    const maxX = nextSashPos
      ? nextSashPos - minColumnWidth
      : COMPONENT_WIDTH_PERCENTAGE - minColumnWidth;
    let newX = this._px2Percent(
      mouseX - this._componentX - this._percent2Px(this._activeSashCursorOffset)
    );

    newX = Math.max(newX, minX);
    newX = Math.min(newX, maxX);

    this._sashPositions[this._activeSashElementIndex] = newX;
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
      this._sashPositions[this._activeSashElementIndex + 1] ||
      COMPONENT_WIDTH_PERCENTAGE;

    return {
      sashPos,
      prevSashPos,
      nextSashPos,
    };
  }

  private _resizeColumns(resizeBodyCells = true) {
    const {sashPos, prevSashPos, nextSashPos} = this._getSashPositions();

    const prevColW = sashPos - prevSashPos;
    const nextColW = nextSashPos - sashPos;
    const prevColCss = `${prevColW}%`;
    const nextColCss = `${nextColW}%`;

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
    this._resizeColumns(true);
    this._updateActiveSashPosition(event.pageX);
    this._sashHovers[this._activeSashElementIndex] = false;
    this._isDragging = false;
    this._activeSashElementIndex = -1;

    document.removeEventListener('mousemove', this._onResizingMouseMoveBound);
    document.removeEventListener('mouseup', this._onResizingMouseUpBound);
  }

  private _onResizingMouseUpBound = this._onResizingMouseUp.bind(this);

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
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

        .wrapper.resize-cursor {
          cursor: ew-resize;
        }

        .wrapper.compact-view .header-slot-wrapper {
          height: 0;
          overflow: hidden;
        }

        .scrollable {
          height: 100%;
        }

        .scrollable:before {
          background-color: transparent;
          content: '';
          display: block;
          height: 1px;
          position: absolute;
          width: 100%;
        }

        :host(:not([bordered]))
          .wrapper:not(.compact-view):hover
          .scrollable:not([scrolled]):before,
        :host([bordered])
          .wrapper:not(.compact-view)
          .scrollable:not([scrolled]):before {
          background-color: var(--vscode-editorGroup-border);
        }

        :host(:not([bordered])) .sash {
          visibility: hidden;
        }

        :host(:not([compact])) .wrapper:hover .sash {
          visibility: visible;
        }

        .sash {
          height: 100%;
          position: absolute;
          top: 0;
          width: 1px;
        }

        .wrapper.compact-view .sash {
          display: none;
        }

        .sash.resizable {
          cursor: ew-resize;
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
      `,
    ];
  }

  render(): TemplateResult {
    const sashes = this._sashPositions.map((val, index) => {
      const classes = classMap({
        sash: true,
        hover: this._sashHovers[index],
        resizable: this.resizable,
      });

      const left = `${val}%`;

      return this.resizable
        ? html`
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
          `
        : html`<div
            class="${classes}"
            data-index="${index}"
            style="${styleMap({left})}"
          >
            <div class="sash-visible"></div>
          </div>`;
    });

    const wrapperClasses = classMap({
      wrapper: true,
      'select-disabled': this._isDragging,
      'resize-cursor': this._isDragging,
      'compact-view': this.compact,
    });

    return html`
      <div class="${wrapperClasses}">
        <div class="header" @slotchange="${this._onHeaderSlotChange}">
          <slot name="caption"></slot>
          <div class="header-slot-wrapper">
            <slot name="header"></slot>
          </div>
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
