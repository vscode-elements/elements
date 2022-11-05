import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import uniqueId from './includes/uniqueId';
import {VscElement} from './includes/VscElement';
import {VscodeTabHeader} from './vscode-tab-header';
import {VscodeTabPanel} from './vscode-tab-panel';

@customElement('vscode-tabs')
export class VscodeTabs extends VscElement {
  @property({reflect: true})
  role = 'tablist';

  @property({type: Number, reflect: true, attribute: 'selected-index'})
  selectedIndex = 0;

  constructor() {
    super();
    this._componentId = uniqueId();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._onHostKeyDownBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onHostKeyDownBound);
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
  }

  @queryAssignedElements({slot: 'header'})
  private _headerSlotElements!: Element[];

  @queryAssignedElements()
  private _mainSlotElements!: Element[];

  private _tabHeaders: VscodeTabHeader[] = [];

  private _tabPanels: VscodeTabPanel[] = [];

  private _componentId = '';

  private _tabFocus = 0;

  private _setActiveTab() {
    this._tabFocus = this.selectedIndex;

    this._tabPanels.forEach((el, i) => {
      el.hidden = i !== this.selectedIndex;
    });

    this._tabHeaders.forEach((el: VscodeTabHeader, i) => {
      el.active = i === this.selectedIndex;
    });

    this.dispatchEvent(
      new CustomEvent('vsc-select', {
        detail: {
          selectedIndex: this.selectedIndex,
        },
        composed: true,
      })
    );
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

  private _onHostKeyDown(ev: KeyboardEvent) {
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
    }
  }

  private _onHostKeyDownBound = this._onHostKeyDown.bind(this);

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
      this.selectedIndex = (headerEl as VscodeTabHeader).tabId;
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
