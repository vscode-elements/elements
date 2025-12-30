import {ReactiveController} from 'lit';
import {VscodeTableHeaderCell} from '../vscode-table-header-cell/vscode-table-header-cell.js';
import {VscodeTableCell} from '../vscode-table-cell/vscode-table-cell.js';
import {VscodeTable} from './vscode-table.js';
import {
  calculateColumnWidths,
  Percent,
  percent,
  Px,
  px,
  toPercent,
  toPx,
} from './calculations.js';
import {
  SPLITTER_HIT_WIDTH,
  SPLITTER_VISIBLE_WIDTH,
} from './vscode-table.styles.js';

const calculateOffset = (mouseX: number, splitterX: number) => {
  const centerLineRelativeX =
    SPLITTER_HIT_WIDTH / 2 - SPLITTER_VISIBLE_WIDTH / 2;
  const relativeX = mouseX - splitterX;
};

export class ColumnResizeController implements ReactiveController {
  private _host: VscodeTable;
  private _hostHeight = px(0);
  private _hostWidth = px(0);
  private _hostX = px(0);
  private _activeSplitter: HTMLDivElement | null = null;
  private _activeSplitterIndex: number = -1;
  private _splitters: HTMLDivElement[] = [];
  private _headerCells: VscodeTableHeaderCell[] = [];
  private _firstRowCells: VscodeTableCell[] = [];
  private _minColumnWidth = percent(0);
  private _isDragging = false;
  private _startColumnWidths: Percent[] = [];
  private _prevColumnWidths: Percent[] = [];
  private _columnWidths: Percent[] = [];
  private _dragStartX = px(0);
  private _prevX = px(0);
  private _activeSplitterCursorOffset = px(0);

  constructor(host: VscodeTable) {
    (this._host = host).addController(this);
  }

  hostConnected(): void {
    this.saveHostDimensions();
  }

  get isDragging(): boolean {
    return this._isDragging;
  }

  set isDragging(newValue: boolean) {
    this._isDragging = newValue;
  }

  get splitterPositions(): Percent[] {
    const result: Percent[] = [];

    let acc = percent(0);

    for (let i = 0; i < this._columnWidths.length - 1; i++) {
      acc = percent(acc + this._columnWidths[i]);
      result.push(acc);
    }

    return result;
  }

  get columnWidths() {
    return this._columnWidths;
  }

  saveHostDimensions() {
    const cr = this._host.getBoundingClientRect();
    const {height, width, x} = cr;
    this._hostHeight = px(height);
    this._hostWidth = px(width);
    this._hostX = px(x);
  }

  setActiveSplitter(splitterElement: HTMLDivElement) {
    this._activeSplitter = splitterElement;
    const index = +(splitterElement.dataset?.index ?? '');
    this._activeSplitterIndex = index > -1 ? index : -1;
    return this;
  }

  getActiveSplitter() {
    return this._activeSplitter;
  }

  setSplitters(splitterElements: HTMLDivElement[]) {
    this._splitters = splitterElements;
    return this;
  }

  setHeaderCells(cells: VscodeTableHeaderCell[]) {
    this._headerCells = cells;
    return this;
  }

  setFirstRowCells(cells: VscodeTableCell[]) {
    this._firstRowCells = cells;
    return this;
  }

  setMinColumnWidth(width: Percent) {
    this._minColumnWidth = width;
    return this;
  }

  setColumWidths(widths: Percent[]) {
    this._columnWidths = widths;
    this._host.requestUpdate();
    return this;
  }

  startDrag(event: PointerEvent) {
    const mouseX = event.pageX;
    const splitterX = this._activeSplitter!.getBoundingClientRect().x;
    const xOffset = px(mouseX - splitterX);

    this._isDragging = true;
    this._dragStartX = px(mouseX - xOffset);
    this._activeSplitterCursorOffset = px(xOffset);
    this._prevX = this._dragStartX;
  }

  drag(event: PointerEvent) {
    const mouseX = event.pageX;

    if (mouseX > this._hostX + this._hostWidth) {
      return;
    }

    const x = px(mouseX - this._activeSplitterCursorOffset);
    const deltaPx = px(x - this._prevX);
    this._prevX = x;
    const delta = this._toPercent(deltaPx);

    this._columnWidths = calculateColumnWidths(
      this._columnWidths,
      this._activeSplitterIndex,
      delta,
      this._minColumnWidth
    );

    this._host.requestUpdate();
  }

  stopDrag() {
    this._isDragging = false;
  }

  private _toPercent(px: Px) {
    return toPercent(px, this._hostWidth);
  }

  private _toPx(percent: Percent) {
    return toPx(percent, this._hostWidth);
  }
}
