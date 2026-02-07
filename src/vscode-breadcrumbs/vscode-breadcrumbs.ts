import {TemplateResult, html} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import {property} from 'lit/decorators.js';
import styles from './vscode-breadcrumbs.styles.js';
import '../vscode-breadcrumb-item/vscode-breadcrumb-item.js';

export type VscodeBreadcrumbsEventDetail = {
  index: number;
  item: HTMLElement;
  payload?: Event;
};

export type VscodeBreadcrumbsFocusEvent =
  CustomEvent<VscodeBreadcrumbsEventDetail>;
export type VscodeBreadcrumbsSelectEvent =
  CustomEvent<VscodeBreadcrumbsEventDetail>;

/**
 * @tag vscode-breadcrumbs
 *
 * Container for breadcrumb items.
 *
 * @fires vsc-focus Fired when a breadcrumb item receives focus. Detail: { index, item, payload }
 * @fires vsc-select Fired when a breadcrumb item is selected. Detail: { index, item, payload }
 *
 * @cssprop [--vscode-breadcrumb-background=transparent] - Breadcrumbs container background
 *
 * @prop {number} selectedIndex - Index of the selected breadcrumb item (-1 for none)
 * @attr {number} selected-index - Index of the selected breadcrumb item (-1 for none)
 */
@customElement('vscode-breadcrumbs')
export class VscodeBreadcrumbs extends VscElement {
  static override styles = styles;

  @property({type: Number, reflect: true, attribute: 'selected-index'})
  selectedIndex = -1;
  private _focusedIndex = -1;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'list');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Breadcrumb');
    }
    this.tabIndex = -1; // focus individual items
    this.addEventListener('click', this.onClick as EventListener);
    this.addEventListener('keydown', this.onKeydown as EventListener);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick as EventListener);
    this.removeEventListener('keydown', this.onKeydown as EventListener);
    super.disconnectedCallback();
  }

  override firstUpdated(): void {
    this.refreshItems();
  }

  private getItems(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll('vscode-breadcrumb-item')
    ) as HTMLElement[];
  }

  private refreshItems(_event?: Event): void {
    const items = this.getItems();
    // Make one item tabbable if none yet
    if (this._focusedIndex < 0 && items.length) {
      this._focusedIndex = items.length - 1; // default to last
    }
    this.applyItemStates();
  }

  private applyItemStates(): void {
    const items = this.getItems();
    items.forEach((el, idx) => {
      el.setAttribute('tabindex', idx === this._focusedIndex ? '0' : '-1');
      el.classList.toggle('selected', idx === this.selectedIndex);
      // Mark the last breadcrumb as the current page for accessibility
      if (idx === items.length - 1) {
        el.setAttribute('aria-current', 'page');
      } else {
        el.removeAttribute('aria-current');
      }
    });
    // Ensure focused is scrolled into view
    items[this._focusedIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }

  private onClick(ev: MouseEvent) {
    const items = this.getItems();
    for (
      let el = ev.target as HTMLElement | null;
      el && this.contains(el);
      el = el.parentElement
    ) {
      const idx = items.indexOf(el);
      if (idx >= 0) {
        this.focusItem(idx, ev);
        this.selectItem(idx, ev);
        break;
      }
    }
  }

  private onKeydown(ev: KeyboardEvent): void {
    const items = this.getItems();
    if (!items.length) return;
    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      const next = Math.max(0, this._focusedIndex - 1);
      this.focusItem(next, ev);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      const next = Math.min(items.length - 1, this._focusedIndex + 1);
      this.focusItem(next, ev);
    } else if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.selectItem(this._focusedIndex, ev);
    }
  }

  private focusItem(idx: number, payload?: Event): void {
    const items = this.getItems();
    if (idx < 0 || idx >= items.length) return;
    this._focusedIndex = idx;
    this.applyItemStates();
    items[idx].focus();
    this.dispatchEvent(
      this.createFocusEvent({index: idx, item: items[idx], payload})
    );
  }

  private selectItem(idx: number, payload?: Event): void {
    const items = this.getItems();
    if (idx < 0 || idx >= items.length) return;
    this.selectedIndex = idx;
    this.applyItemStates();
    this.dispatchEvent(
      this.createSelectEvent({index: idx, item: items[idx], payload})
    );
  }

  override render(): TemplateResult {
    return html`<div class="container" part="container">
      <slot @slotchange=${this.refreshItems}></slot>
    </div>`;
  }

  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'selected-index') {
      // When selected-index changes via attribute/property, update item states
      this.applyItemStates();
    }
  }

  protected createFocusEvent(
    detail: VscodeBreadcrumbsEventDetail
  ): VscodeBreadcrumbsFocusEvent {
    return new CustomEvent<VscodeBreadcrumbsEventDetail>('vsc-focus', {
      detail,
      bubbles: true,
      composed: true,
    });
  }

  protected createSelectEvent(
    detail: VscodeBreadcrumbsEventDetail
  ): VscodeBreadcrumbsSelectEvent {
    return new CustomEvent<VscodeBreadcrumbsEventDetail>('vsc-select', {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-breadcrumbs': VscodeBreadcrumbs;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-focus': VscodeBreadcrumbsFocusEvent;
    'vsc-select': VscodeBreadcrumbsSelectEvent;
  }
}
