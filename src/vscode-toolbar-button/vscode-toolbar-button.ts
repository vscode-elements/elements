import {html, nothing, TemplateResult} from 'lit';
import {
  property,
  queryAssignedElements,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import '../vscode-icon/vscode-icon.js';
import styles from './vscode-toolbar-button.styles.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Toolbar button
 *
 * @tag vscode-toolbar-button
 */
@customElement('vscode-toolbar-button')
export class VscodeToolbarButton extends VscElement {
  static override styles = styles;

  @property()
  icon = '';

  @state()
  _isSlotEmpty = true;

  @queryAssignedNodes()
  private _assignedNodes!: NodeList | null;

  private _handleSlotChange = () => {
    this._isSlotEmpty = !((this._assignedNodes?.length ?? 0) > 0)
  };

  override render(): TemplateResult {
    return html`
      <button type="button" class="button">
        ${this.icon
          ? html`<vscode-icon name=${this.icon}></vscode-icon>`
          : nothing}
        <slot
          @slotchange=${this._handleSlotChange}
          class=${classMap({'empty': this._isSlotEmpty})}
        ></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-toolbar-button': VscodeToolbarButton;
  }
}
