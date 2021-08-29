import {CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from './includes/form-button-widget/FormButtonWidgetBase';
import baseStyles from './includes/form-button-widget/base.styles';
import checkboxStyles from './includes/form-button-widget/checkbox.styles';
import formHelperTextStyles from './includes/formHelperTextStyles';

/**
 * @attr name - Name which is used as a variable name in the data of the form-container.
 */
@customElement('vscode-checkbox')
export class VscodeCheckbox extends FormButtonWidgetBase {
  @property({type: Boolean})
  checked = false;

  @property()
  label = '';

  @property()
  value = '';

  @property({type: Boolean})
  disabled = false;

  @state()
  private isSlotEmpty = true;

  protected _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {
          checked: this.checked,
          label: this.label,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _handleKeyDown(event: KeyboardEvent): void {
    if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      this.checked = !this.checked;
    }
  }

  private _handleSlotChange() {
    this.isSlotEmpty = this.innerHTML === '';
  }

  static get styles(): CSSResultGroup[] {
    return [super.styles, baseStyles, checkboxStyles, formHelperTextStyles];
  }

  render(): TemplateResult {
    const isLabelEmpty = !this.label && this.isSlotEmpty;
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
      'before-empty-label': isLabelEmpty,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
      empty: isLabelEmpty,
    });

    const icon = html`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`;
    const check = this.checked ? icon : nothing;

    return html`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="checkbox"
          type="checkbox"
          ?checked="${this.checked}"
          value="${this.value}"
          tabindex="-1"
        />
        <div class="${iconClasses}">${check}</div>
        <label for="${this._uid}" class="label" @click="${this._handleClick}">
          <span class="${labelInnerClasses}">
            <slot @slotchange="${this._handleSlotChange}">${this.label}</slot>
          </span>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-checkbox': VscodeCheckbox;
  }
}
