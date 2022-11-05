import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import uniqueId from './includes/uniqueid';
import {VscElement} from './includes/VscElement';
import {VscodeTabHeader} from './vscode-tab-header';
import {VscodeTabPanel} from './vscode-tab-panel';

@customElement('vscode-tabs')
export class VscodeTabs extends VscElement {
  @property({reflect: true})
  role = 'tablist';

  @property({type: Number, reflect: true})
  set selectedIndex(index: number) {
    this._selectedIndex = index;

    this.updateComplete.then(() => {
      this._setActiveTab();
    });
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @queryAssignedElements({slot: 'header'})
  private _headerSlotElements!: Element[];

  @queryAssignedElements()
  private _mainSlotElements!: Element[];

  private _selectedIndex: number;

  private _tabHeaders: VscodeTabHeader[] = [];

  private _tabPanels: VscodeTabPanel[] = [];

  private _focusedHeader = -1;

  private _componentId = '';

  constructor() {
    super();
    this._selectedIndex = 0;
    this._componentId = uniqueId();
  }

  private _setActiveTab() {
    this._tabPanels.forEach((el, i) => {
      el.hidden = i !== this._selectedIndex;
    });

    this._tabHeaders.forEach((el: VscodeTabHeader, i) => {
      el.active = i === this._selectedIndex;
    });

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail: {
          selectedIndex: this._selectedIndex,
        },
        composed: true,
      })
    );
  }

  private _onMainSlotChange() {
    this._tabPanels = this._mainSlotElements.filter(
      (el) => el instanceof VscodeTabPanel
    ) as VscodeTabPanel[];
    this._tabPanels.forEach((el, i) => {
      el.ariaLabelledby = `t${this._componentId}-h${i}`;
      el.id = `t${this._componentId}-p${i}`;
    });

    this._setActiveTab();
  }

  private _onHeaderSlotChange() {
    this._tabHeaders = this._headerSlotElements.filter(
      (el) => el instanceof VscodeTabHeader
    ) as VscodeTabHeader[];
    this._tabHeaders.forEach((el, i) => {
      el.tabId = i;
      el.id = `t${this._componentId}-h${i}`;
      el.ariaControls = `t${this._componentId}-p${i}`;
    });
  }

  private _onHeaderClick(event: MouseEvent) {
    const path = event.composedPath();
    const headerEl = path.find(
      (et) => (et as VscodeTabHeader) instanceof VscodeTabHeader
    );

    if (headerEl) {
      this._selectedIndex = (headerEl as VscodeTabHeader).tabId;
      this._setActiveTab();
    }
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .header {
          display: flex;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          width: 100%;
        }

        .header {
          border-bottom-color: var(
            --vscode-settings-headerBorder,
            rgba(128, 128, 128, 0.35)
          );
          border-bottom-style: solid;
          border-bottom-width: 1px;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <div class="header" @click="${this._onHeaderClick}">
        <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
      </div>
      <slot @slotchange=${this._onMainSlotChange}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tabs': VscodeTabs;
  }
}
