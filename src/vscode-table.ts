import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  query,
} from 'lit-element';
import './vscode-scrollable';
import { VscodeTableCell } from './vscode-table-cell';

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

  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  private _colums: string[] = [];
  private _resizeObserver!: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    console.log(this.columns);
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
  }

  private _resizeObserverCallback() {
    this._updateHeaderCellSizes();
  }

  private _resizeObserverCallbackBound =
    this._resizeObserverCallback.bind(this);

  private _updateHeaderCellSizes() {
    const thead = this._headerSlot.assignedElements()[0];
    const headerCells = thead.querySelectorAll('vscode-table-header-cell');

    const tbody = this._bodySlot.assignedElements()[0];
    const cells = tbody.querySelectorAll(
      'vscode-table-row:first-child vscode-table-cell'
    );

    window.requestAnimationFrame(() => {
      cells.forEach((cell, index) => {
        const br = cell.getBoundingClientRect();
        headerCells[index].style.flexBasis = `${br.width}px`;
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

  static styles = css`
    :host {
      display: block;
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .scrollable {
      height: 200px;
    }

    .wrapper {
      max-width: 100%;
      overflow: hidden;
      width: 100%;
    }
  `;

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot name="header"></slot>
        <vscode-scrollable class="scrollable">
          <div>
            <slot name="body" @slotchange="${this._onBodySlotChange}"></slot>
          </div>
        </vscode-scrollable>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table': VscodeTable;
  }
}
