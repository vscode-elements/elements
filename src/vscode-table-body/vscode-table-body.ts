import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-table-body.styles.js';

/**
 * @tag vscode-table-body
 */
@customElement('vscode-table-body')
export class VscodeTableBody extends VscElement {
  static override styles = styles;

  /** @internal */
  @property({reflect: true})
  override role = 'rowgroup';

  private _handleSlotChange() {
    /** @internal */
    this.dispatchEvent(
      new Event('vsc-table-body-slot-changed', {bubbles: true})
    );
  }

  override render(): TemplateResult {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-body': VscodeTableBody;
  }

  interface GlobalEventHandlersEventMap {
    'vsc-table-body-slot-changed': Event;
  }
}
