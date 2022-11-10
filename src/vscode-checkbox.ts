import {css, CSSResultGroup, html, nothing, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from './includes/form-button-widget/FormButtonWidgetBase';
import baseStyles from './includes/form-button-widget/base.styles';
import formHelperTextStyles from './includes/formHelperTextStyles';
import {LabelledCheckboxOrRadioMixin} from './includes/form-button-widget/LabelledCheckboxOrRadio';

/**
 * @attr name - Name which is used as a variable name in the data of the form-container.
 * @attr label - Attribute pair of the `label` property.
 * @prop label - Label text. It is only applied if componnet's innerHTML doesn't contain any text.
 */
@customElement('vscode-checkbox')
export class VscodeCheckbox extends LabelledCheckboxOrRadioMixin(
  FormButtonWidgetBase
) {
  @property({type: Boolean})
  checked = false;

  @property()
  value = '';

  @property({type: Boolean})
  disabled = false;

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

  protected _handleKeyDown(ev: KeyboardEvent): void {
    if (!this.disabled && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      this.checked = !this.checked;
    }
  }

  static get styles(): CSSResultGroup[] {
    return [
      super.styles,
      baseStyles,
      css`
        .icon {
          border-radius: 3px;
        }

        :host(:focus):host(:not([disabled])) .icon {
          outline: 1px solid var(--vscode-focusBorder);
          outline-offset: -1px;
        }
      `,
      formHelperTextStyles,
    ];
  }

  render(): TemplateResult {
    const iconClasses = classMap({
      icon: true,
      checked: this.checked,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
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
            ${this._renderLabelAttribute()}
            <slot @slotchange="${this._handleSlotChange}"></slot>
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
