import {html, PropertyValues, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-header-cell.styles.js';

export type VscTableChangeMinColumnWidthEvent = CustomEvent<{
  columnIndex: number;
  propertyValue: string;
}>;

/**
 * @tag vscode-table-header-cell
 *
 * @cssprop [--vscode-foreground=#cccccc]
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 */
@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends VscElement {
  static override styles = styles;

  @property({attribute: 'min-width'})
  minWidth = '0';

  /** @internal */
  @property({type: Number})
  index = -1;

  /** @internal */
  @property({reflect: true})
  override role = 'columnheader';

  protected override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('minWidth') && this.index > -1) {
      /** @internal */
      this.dispatchEvent(
        new CustomEvent('vsc-table-change-min-column-width', {
          detail: {columnIndex: this.index, propertyValue: this.minWidth},
        }) as VscTableChangeMinColumnWidthEvent
      );
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-header-cell': VscodeTableHeaderCell;
  }
}
