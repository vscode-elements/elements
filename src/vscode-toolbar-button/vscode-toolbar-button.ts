import {html, nothing, TemplateResult} from 'lit';
import {property, queryAssignedNodes, state} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import '../vscode-icon/vscode-icon.js';
import styles from './vscode-toolbar-button.styles.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

/**
 * Toolbar button
 *
 * @tag vscode-toolbar-button
 */
@customElement('vscode-toolbar-button')
export class VscodeToolbarButton extends VscElement {
  static override styles = styles;

  @property({reflect: true})
  icon = '';

  @property()
  label: string | undefined = undefined;

  @property({type: Boolean, reflect: true})
  toggleable = false;

  @property({type: Boolean, reflect: true})
  checked = false;

  @state()
  _isSlotEmpty = true;

  @queryAssignedNodes()
  private _assignedNodes!: NodeList | null;

  private _handleSlotChange() {
    this._isSlotEmpty = !((this._assignedNodes?.length ?? 0) > 0);
  }

  private _handleButtonClick() {
    if (!this.toggleable) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(new Event('change'));
  }

  override render(): TemplateResult {
    const checked = this.checked ? 'true' : 'false';

    return html`
      <button
        type="button"
        aria-label=${ifDefined(this.label)}
        role=${ifDefined(this.toggleable ? 'switch' : undefined)}
        aria-checked=${ifDefined(this.toggleable ? checked : undefined)}
        class=${classMap({checked: this.toggleable && this.checked})}
        @click=${this._handleButtonClick}
      >
        ${this.icon
          ? html`<vscode-icon name=${this.icon}></vscode-icon>`
          : nothing}
        <slot
          @slotchange=${this._handleSlotChange}
          class=${classMap({empty: this._isSlotEmpty, textOnly: !this.icon})}
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
