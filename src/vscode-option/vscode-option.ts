import {html, PropertyValues, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-option.styles.js';

/**
 * @tag vscode-option
 */
@customElement('vscode-option')
export class VscodeOption extends VscElement {
  static styles = styles;

  @property({type: String})
  value?: string | undefined;

  @property({type: String})
  description = '';

  @property({type: Boolean, reflect: true})
  selected = false;

  @property({type: Boolean, reflect: true})
  disabled = false;

  private _initialized = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._initialized = true;
    });
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    if (
      this._initialized &&
      (changedProperties.has('description') ||
        changedProperties.has('value') ||
        changedProperties.has('selected') ||
        changedProperties.has('disabled'))
    ) {
      /** @internal */
      this.dispatchEvent(new Event('vsc-option-state-change', {bubbles: true}));
    }
  }

  private _handleSlotChange = () => {
    /** @internal */
    this.dispatchEvent(new Event('vsc-option-state-change', {bubbles: true}));
  };

  render(): TemplateResult {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-option': VscodeOption;
  }
}
