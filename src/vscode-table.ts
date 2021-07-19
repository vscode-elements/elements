import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  query,
  state,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';
import './vscode-scrollable';
import { VscodeScrollable } from './vscode-scrollable';
import {VscodeTableCell} from './vscode-table-cell';
import {VscodeTableHeaderCell} from './vscode-table-header-cell';

@customElement('vscode-table')
export class VscodeTable extends LitElement {
  @property({type: Array})
  set columns(val: string[]) {
    this._colums = val;
    this._updateColumnSizes();
  }
  get columns(): string[] {
    return this._colums;
  }

  @property({type: Number, attribute: 'min-column-width'})
  minColumnWidth = 100;

  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  @query('.header')
  private _headerElement!: HTMLDivElement;

  @query('.scrollable')
  private _scrollableElement!: VscodeScrollable;

  @state()
  private _sashPositions: number[] = [];

  @state()
  private _isDragging = false;

  private _sashHovers: boolean[] = [];
  private _colums: string[] = [];
  private _resizeObserver!: ResizeObserver;
  private _headerResizeObserver!: ResizeObserver;
  private _activeSashElement!: HTMLDivElement | null;
  private _activeSashElementIndex = -1;
  private _activeSashCursorOffset = 0;
  private _componentX = 0;
  private _componentW = 0;
  private _cellsToResize!: VscodeTableCell[];
  private _headerCellsToResize!: VscodeTableHeaderCell[];

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver.unobserve(this);
    this._resizeObserver.disconnect();
  }

  private _initResizeObserver() {
    this._resizeObserver = new ResizeObserver(
      this._resizeObserverCallbackBound
    );
    this._resizeObserver.observe(this);

    this._headerResizeObserver = new ResizeObserver(
      this._headerResizeObserverCallbackBound
    );
    this._headerResizeObserver.observe(this._headerElement);
  }

  private _resizeObserverCallback() {
    this._updateHeaderCellSizes();
  }

  private _resizeObserverCallbackBound =
    this._resizeObserverCallback.bind(this);

  private _headerResizeObserverCallback() {
    const headerCr = this._headerElement.getBoundingClientRect();
    const cmpCr = this.getBoundingClientRect();
    const scrollableH = cmpCr.height - headerCr.height;

    this._scrollableElement.style.height = `${scrollableH}px`;
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

        headerCells[index].style.flexBasis = `${pos}px`;
      });
    });
  }

  private _updateColumnSizes() {
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

  private _onBodySlotChange() {
    this._updateHeaderCellSizes();
    this._updateColumnSizes();
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
    this._activeSashElement = el;
    this._activeSashElementIndex = index;
    this._sashHovers[this._activeSashElementIndex] = true;
    this._activeSashCursorOffset = pageX - elX;
    this._componentX = cmpCr.x;
    this._componentW = cmpCr.width;

    const thead = this._headerSlot.assignedElements()[0];
    const headerCells = thead.querySelectorAll('vscode-table-header-cell');
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

  private _onResizingMouseMove(event: MouseEvent) {
    const {pageX} = event;
    const sashPos = this._sashPositions[this._activeSashElementIndex];
    const prevSashPos =
      this._sashPositions[this._activeSashElementIndex - 1] || 0;
    const nextSashPos =
      this._sashPositions[this._activeSashElementIndex + 1] || this._componentW;

    const minX = this._sashPositions[this._activeSashElementIndex - 1]
      ? this._sashPositions[this._activeSashElementIndex - 1] +
        this.minColumnWidth
      : this.minColumnWidth;
    const maxX = this._sashPositions[this._activeSashElementIndex + 1]
      ? this._sashPositions[this._activeSashElementIndex + 1] -
        this.minColumnWidth
      : this._componentW - this.minColumnWidth;

    let newX = pageX - this._componentX - this._activeSashCursorOffset;
    newX = Math.max(newX, minX);
    newX = Math.min(newX, maxX);

    (this._activeSashElement as HTMLDivElement).style.left = `${newX}px`;
    this._sashPositions[this._activeSashElementIndex] = newX;

    this._headerCellsToResize[0].style.flexBasis = `${sashPos - prevSashPos}px`;

    if (this._headerCellsToResize[1]) {
      this._headerCellsToResize[1].style.flexBasis = `${
        nextSashPos - sashPos
      }px`;
    }

    this._cellsToResize[0].style.width = `${sashPos - prevSashPos}px`;

    if (this._cellsToResize[1]) {
      this._cellsToResize[1].style.width = `${nextSashPos - sashPos}px`;
    }
  }

  private _onResizingMouseMoveBound = this._onResizingMouseMove.bind(this);

  private _onResizingMouseUp() {
    this._sashHovers[this._activeSashElementIndex] = false;
    this._isDragging = false;
    this._activeSashElement = null;
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

    .wrapper.select-banned {
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
      background-color: var(--vscode-editorGroup-border);
      cursor: ew-resize;
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .sash.hover {
      background-color: var(--vscode-sash-hoverBorder);
      transition: background-color 50ms linear 300ms;
    }

    .sash .sash-visible {
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

      return html`
        <div
          class="${classes}"
          data-index="${index}"
          style="${styleMap({
            left: `${val}px`,
          })}"
          @mousedown="${this._onSashMouseDown}"
          @mouseover="${this._onSashMouseOver}"
          @mouseout="${this._onSashMouseOut}"
        >
          <div class="sash-visible"></div>
        </div>
      `;
    });

    const wrapperClasses = classMap({
      wrapper: true,
      'select-banned': this._isDragging,
    });

    return html`
      <div class="${wrapperClasses}">
        <div class="header">
          <slot name="header" @slotchange=${this._headerSlotChange}></slot>
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
