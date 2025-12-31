import {ReactiveController} from 'lit';
import {type VscodeTable} from './vscode-table.js';
import {
  calculateColumnWidths,
  Percent,
  percent,
  Px,
  px,
  toPercent,
  toPx,
} from './calculations.js';
import {SPLITTER_HIT_WIDTH} from './vscode-table.styles.js';

type SplitterElement = HTMLDivElement & {
  dataset: DOMStringMap & {
    index: string;
  };
};

export class ColumnResizeController implements ReactiveController {
  private _host: VscodeTable;
  private _hostWidth = px(0);
  private _hostX = px(0);
  private _activeSplitter: SplitterElement | null = null;
  private _minColumnWidth = percent(0);
  private _columnWidths: Percent[] = [];
  private _startColumnWidths: Percent[] = [];
  private _dragStartX = px(0);
  private _prevX = px(0);
  private _activeSplitterCursorOffset = px(0);
  private _dragState: {
    splitterIndex: number;
    pointerId: number;
    startX: Px;
    prevX: Px;
    dragOffset: Px;
  } | null = null;

  constructor(host: VscodeTable) {
    (this._host = host).addController(this);
  }

  hostConnected(): void {
    this.saveHostDimensions();
  }

  get isDragging(): boolean {
    return this._dragState !== null;
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

  getActiveSplitterCalculatedPosition() {
    const splitterPositions = this.splitterPositions;

    if (!this._dragState) {
      return px(0);
    }

    const activeSplitterPos = splitterPositions[this._dragState.splitterIndex];
    const activeSplitterPosPx = this._toPx(activeSplitterPos);

    return activeSplitterPosPx;
  }

  get columnWidths() {
    return this._columnWidths;
  }

  saveHostDimensions() {
    const cr = this._host.getBoundingClientRect();
    const {width, x} = cr;
    this._hostWidth = px(width);
    this._hostX = px(x);
    return this;
  }

  setActiveSplitter(splitter: HTMLElement) {
    this._activeSplitter = splitter as SplitterElement;
    return this;
  }

  getActiveSplitter() {
    return this._activeSplitter;
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

  shouldDrag(event: PointerEvent) {
    return (
      +(event.currentTarget as SplitterElement).dataset.index ===
      this._dragState?.splitterIndex
    );
  }

  startDrag(event: PointerEvent) {
    event.stopPropagation();

    if (this._dragState) {
      return;
    }

    this._activeSplitter?.setPointerCapture(event.pointerId);

    const mouseX = event.pageX;
    const splitter = event.currentTarget as SplitterElement;
    const splitterX = splitter!.getBoundingClientRect().x;
    const xOffset = px(mouseX - splitterX);

    this._dragState = {
      dragOffset: px(xOffset),
      pointerId: event.pointerId,
      splitterIndex: +splitter.dataset.index,
      startX: px(mouseX - xOffset),
      prevX: px(mouseX - xOffset),
    };
    this._startColumnWidths = this._columnWidths;

    this._dragStartX = px(mouseX - xOffset);
    this._activeSplitterCursorOffset = px(xOffset);
    this._prevX = this._dragStartX;
    this._host.requestUpdate();
  }

  drag(event: PointerEvent) {
    event.stopPropagation();

    if (
      !(event?.currentTarget as SplitterElement)?.hasPointerCapture?.(
        event.pointerId
      )
    ) {
      return;
    }

    if (!this._dragState) {
      return;
    }

    if (event.pointerId !== this._dragState.pointerId) {
      return;
    }

    if (!this.shouldDrag(event)) {
      return;
    }

    const mouseX = event.pageX;

    const x = px(mouseX - this._dragState.dragOffset);
    const deltaPx = px(x - this._prevX);

    this._prevX = x;
    const delta = this._toPercent(deltaPx);

    ///
    const splitterPos = this.getActiveSplitterCalculatedPosition();

    if (
      (deltaPx <= 0 && mouseX > splitterPos + this._hostX) ||
      (deltaPx > 0 && mouseX < splitterPos + this._hostX)
    ) {
      return;
    }
    ///

    this._columnWidths = calculateColumnWidths(
      this._columnWidths,
      this._dragState.splitterIndex,
      delta,
      this._minColumnWidth
    );

    this._host.requestUpdate();
  }

  stopDrag(event: PointerEvent) {
    event.stopPropagation();

    if (!this._dragState) {
      return;
    }

    const el = event.currentTarget as SplitterElement;

    try {
      el.releasePointerCapture(this._dragState.pointerId);
    } catch (e) {
      // ignore
    }

    this._dragState = null;
    this._activeSplitter = null;
    this._host.requestUpdate();
  }

  private _toPercent(px: Px) {
    return toPercent(px, this._hostWidth);
  }

  private _toPx(percent: Percent) {
    return toPx(percent, this._hostWidth);
  }

  private _isCursorOverTheActiveSplitter(event: PointerEvent) {
    const localMouseX = event.pageX - this._hostX;
    const localSplitterX = this.getActiveSplitterCalculatedPosition();

    return (
      localMouseX >= localSplitterX - SPLITTER_HIT_WIDTH / 2 &&
      localMouseX <= localSplitterX + SPLITTER_HIT_WIDTH / 2
    );
  }
}
