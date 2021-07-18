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

@customElement('vscode-table')
export class VscodeTable extends LitElement {
  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  private _resizeObserver!: ResizeObserver;

  disconnectedCallback(): void {
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
    const headerCells = thead.querySelectorAll('vscode-table-th');

    const tbody = this._bodySlot.assignedElements()[0];
    const cells = tbody.querySelectorAll(
      'vscode-table-row:first-child vscode-table-td'
    );

    window.requestAnimationFrame(() => {
      cells.forEach((cell, index) => {
        const br = cell.getBoundingClientRect();
        headerCells[index].style.flexBasis = `${br.width}px`;
      });
    });
  }

  private _onBodySlotChange() {
    this._updateHeaderCellSizes();
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
