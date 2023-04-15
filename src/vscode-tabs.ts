import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import uniqueId from './includes/uniqueId';
import {VscElement} from './includes/VscElement';
import {VscodeTabHeader} from './vscode-tab-header';
import {VscodeTabPanel} from './vscode-tab-panel';
import declareThemeVariables from './includes/declareThemeVariables';

/**
 * @slot - Default slot. It is used for tab panels.
 * @slot header - Slot for tab headers.
 * @slot addons - Right aligned area in the header.
 *
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--header-border=var(--vscode-settings-headerBorder)]
 * @cssprop [--panel-background=var(--vscode-panel-background)]
 */
@customElement('vscode-tabs')
export class VscodeTabs extends VscElement {
  /**
   * Panel-like look
   */
  @property({type: Boolean, reflect: true})
  panel = false;

  @property({reflect: true})
  role = 'tablist';

  @property({type: Number, reflect: true, attribute: 'selected-index'})
  selectedIndex = 0;

  constructor() {
    super();
    this._componentId = uniqueId();
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);

    if (name === 'selected-index') {
      this._setActiveTab();
    }

    if (name === 'panel') {
      this._tabHeaders.forEach((h) => (h.panel = value !== null));
      this._tabPanels.forEach((p) => (p.panel = value !== null));
    }
  }

  @queryAssignedElements({slot: 'header'})
  private _headerSlotElements!: Element[];

  @queryAssignedElements()
  private _mainSlotElements!: Element[];

  private _tabHeaders: VscodeTabHeader[] = [];

  private _tabPanels: VscodeTabPanel[] = [];

  private _componentId = '';

  private _tabFocus = 0;

  private _dispatchSelectEvent() {
    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail: {
          selectedIndex: this.selectedIndex,
        },
        composed: true,
      })
    );
  }

  private _setActiveTab() {
    this._tabFocus = this.selectedIndex;

    this._tabPanels.forEach((el, i) => {
      el.hidden = i !== this.selectedIndex;
    });

    this._tabHeaders.forEach((el: VscodeTabHeader, i) => {
      el.active = i === this.selectedIndex;
    });
  }

  private _focusPrevTab() {
    if (this._tabFocus === 0) {
      this._tabFocus = this._tabHeaders.length - 1;
    } else {
      this._tabFocus -= 1;
    }
  }

  private _focusNextTab() {
    if (this._tabFocus === this._tabHeaders.length - 1) {
      this._tabFocus = 0;
    } else {
      this._tabFocus += 1;
    }
  }

  private _onHeaderKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      this._tabHeaders[this._tabFocus].setAttribute('tabindex', '-1');

      if (ev.key === 'ArrowLeft') {
        this._focusPrevTab();
      } else if (ev.key === 'ArrowRight') {
        this._focusNextTab();
      }

      this._tabHeaders[this._tabFocus].setAttribute('tabindex', '0');
      this._tabHeaders[this._tabFocus].focus();
    }

    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.selectedIndex = this._tabFocus;
      this._dispatchSelectEvent();
    }
  }

  private _moveHeadersToHeaderSlot() {
    const headers = this._mainSlotElements.filter(
      (el) => el instanceof VscodeTabHeader
    ) as VscodeTabHeader[];

    if (headers.length > 0) {
      headers.forEach((h) => h.setAttribute('slot', 'header'));
    }
  }

  private _onMainSlotChange() {
    this._moveHeadersToHeaderSlot();

    this._tabPanels = this._mainSlotElements.filter(
      (el) => el instanceof VscodeTabPanel
    ) as VscodeTabPanel[];
    this._tabPanels.forEach((el, i) => {
      el.ariaLabelledby = `t${this._componentId}-h${i}`;
      el.id = `t${this._componentId}-p${i}`;
      el.panel = this.panel;
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
      el.panel = this.panel;
      el.active = i === this.selectedIndex;
    });
  }

  private _onHeaderClick(event: MouseEvent) {
    const path = event.composedPath();
    const headerEl = path.find(
      (et) => (et as VscodeTabHeader) instanceof VscodeTabHeader
    );

    if (headerEl) {
      this.selectedIndex = (headerEl as VscodeTabHeader).tabId;
      this._setActiveTab();
      this._dispatchSelectEvent();
    }
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      declareThemeVariables([
        {
          componentProp: '--font-family',
          vscodeProp: '--vscode-font-family',
        },
        {
          componentProp: '--font-size',
          vscodeProp: '--vscode-font-size',
        },
        {
          componentProp: '--font-weight',
          vscodeProp: '--vscode-font-weight',
        },
        {
          componentProp: '--header-border',
          vscodeProp: '--vscode-settings-headerBorder',
        },
        {
          componentProp: '--panel-background',
          vscodeProp: '--vscode-panel-background',
        },
      ]),
      css`
        :host {
          display: block;
        }

        .header {
          align-items: center;
          display: flex;
          font-family: var(--font-family);
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          width: 100%;
        }

        .header {
          border-bottom-color: var(--header-border);
          border-bottom-style: solid;
          border-bottom-width: 1px;
        }

        .header.panel {
          background-color: var(--panel-background);
          border-bottom-width: 0;
          box-sizing: border-box;
          padding-left: 8px;
          padding-right: 8px;
        }

        slot[name='addons'] {
          display: block;
          margin-left: auto;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <div
        class=${classMap({header: true, panel: this.panel})}
        @click="${this._onHeaderClick}"
        @keydown=${this._onHeaderKeyDown}
      >
        <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
        <slot name="addons"></slot>
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
