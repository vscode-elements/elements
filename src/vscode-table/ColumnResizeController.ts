import {ReactiveController} from 'lit';
import {VscodeTableHeaderCell} from '../vscode-table-header-cell/vscode-table-header-cell.js';
import {VscodeTableCell} from '../vscode-table-cell/vscode-table-cell.js';
import {VscodeTable} from './vscode-table.js';

type Px = number & {readonly __unit: 'px'};
type Percent = number & {readonly __unit: '%'};

export const px = (value: number): Px => value as Px;
export const percent = (value: number): Percent => value as Percent;

const toPercent = (px: Px, container: Px): Percent =>
  percent((px / container) * 100);

const toPx = (p: Percent, container: Px): Px => px((p / 100) * container);

function calculateColumnWidths(
  widths: Percent[],
  splitterIndex: number,
  delta: Percent,
  minWidth: Percent
): Percent[] {
  const result = [...widths];

  if (delta === 0 || splitterIndex < 0 || splitterIndex >= widths.length - 1) {
    return result;
  }

  const absDelta = Math.abs(delta);
  let remaining: Percent = percent(absDelta);

  const leftIndices: number[] = [];
  const rightIndices: number[] = [];

  // Bal oldal (splitterIndex-től balra)
  for (let i = splitterIndex; i >= 0; i--) {
    leftIndices.push(i);
  }

  // Jobb oldal (splitterIndex+1-től jobbra)
  for (let i = splitterIndex + 1; i < widths.length; i++) {
    rightIndices.push(i);
  }

  // Meghatározzuk, melyik oldalról VESZÜNK el
  const shrinkingSide = delta > 0 ? rightIndices : leftIndices;

  // És melyik NŐ
  const growingSide = delta > 0 ? leftIndices : rightIndices;

  // Van-e elég hely az elvonáshoz?
  let totalAvailable: Percent = percent(0);

  for (const i of shrinkingSide) {
    const available = Math.max(0, result[i] - minWidth);
    totalAvailable = percent(totalAvailable + available);
  }

  if (totalAvailable < remaining) {
    return result; // nincs elég hely
  }

  // Elvonás láncszerűen
  for (const i of shrinkingSide) {
    if (remaining === 0) break;

    const available = Math.max(0, result[i] - minWidth);
    const take = Math.min(available, remaining);

    result[i] = percent(result[i] - take);
    remaining = percent(remaining - take);
  }

  // Növelés a másik oldalon (pont ugyanennyivel)
  let toAdd: Percent = percent(absDelta);

  for (const i of growingSide) {
    if (toAdd === 0) break;

    result[i] = percent(result[i] + toAdd);
    toAdd = percent(0); // az egész az első oszlopba megy
  }

  return result;
}

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
    const {pageX} = event;
    const cr = this._activeSplitter!.getBoundingClientRect();

    this._dragStartX = px(pageX);
    this._startColumnWidths = [...this._columnWidths];
    this._prevColumnWidths = [...this._columnWidths];
    this._activeSplitterCursorOffset = px(pageX - cr.x);
    this._prevX = px(pageX);
  }

  drag(event: MouseEvent) {
    const {pageX} = event;
    // const deltaPx = px(
    //   pageX - this._dragStartX - this._activeSplitterCursorOffset
    // );
    const deltaPx = px(pageX - this._prevX);
    this._prevX = px(pageX);
    // const deltaPx = px(pageX - this._hostX - this._activeSplitterCursorOffset);
    const delta = this._toPercent(deltaPx);
    this._columnWidths = calculateColumnWidths(
      this._columnWidths,
      this._activeSplitterIndex,
      delta,
      this._minColumnWidth
    );

    // this._prevColumnWidths = [...this._columnWidths];

    this._host.requestUpdate();
  }

  stopDrag() {}

  private _toPercent(px: Px) {
    return toPercent(px, this._hostWidth);
  }

  private _toPx(percent: Percent) {
    return toPx(percent, this._hostWidth);
  }
}
