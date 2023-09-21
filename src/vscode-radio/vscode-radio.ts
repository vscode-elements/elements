import {html, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from '../includes/form-button-widget/FormButtonWidgetBase.js';
import {LabelledCheckboxOrRadioMixin} from '../includes/form-button-widget/LabelledCheckboxOrRadio.js';
import styles from './vscode-radio.styles.js';

/**
 * @attr name - Name which is used as a variable name in the data of the form-container.
 * @attr label - Attribute pair of the `label` property.
 * @prop label - Label text. It is only applied if componnet's innerHTML doesn't contain any text.
 *
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--foreground=var(--vsc-foreground-translucent)] - Label font color. 90% transparency version of `--vscode-foreground` by default.
 * @cssprop [--icon-background=var(--vscode-settings-checkboxBackground)]
 * @cssprop [--icon-border=var(--vscode-settings-checkboxBorder)]
 * @cssprop [--icon-foreground=var(--vscode-settings-checkboxForeground)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 */
@customElement('vscode-radio')
export class VscodeRadio extends LabelledCheckboxOrRadioMixin(
  FormButtonWidgetBase
) {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  set checked(val: boolean) {
    this._checked = val;
    this.setAttribute('aria-checked', val ? 'true' : 'false');
  }
  get checked(): boolean {
    return this._checked;
  }

  /**
   * Name which is used as a variable name in the data of the form-container.
   */
  @property()
  name = '';

  @property()
  value = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({reflect: true})
  role = 'radio';

  @state()
  private _checked = false;

  @state()
  private _slottedText = '';

  private _dispatchCustomEvent() {
    this.dispatchEvent(
      new CustomEvent<{checked: boolean; label: string; value: string}>(
        'vsc-change',
        {
          detail: {
            checked: this.checked,
            label: this.label,
            value: this.value,
          },
          bubbles: true,
          composed: true,
        }
      )
    );
  }

  private _checkButton() {
    const root = this.getRootNode({composed: true}) as Document | ShadowRoot;

    if (!root) {
      return;
    }

    const radios = root.querySelectorAll(
      `vscode-radio[name="${this.name}"]`
    ) as NodeListOf<VscodeRadio>;
    this._checked = true;
    this.setAttribute('aria-checked', 'true');

    radios.forEach((r) => {
      if (r !== this) {
        r.checked = false;
      }
    });
  }

  protected _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this._checkButton();
    this._dispatchCustomEvent();
  }

  protected _handleKeyDown(event: KeyboardEvent): void {
    if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this._checked = true;
      this.setAttribute('aria-checked', 'true');
      this._dispatchCustomEvent();
    }
  }

  render(): TemplateResult {
    const iconClasses = classMap({
      icon: true,
      checked: this._checked,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
      'is-slot-empty': this._slottedText === '',
    });

    return html`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="radio"
          type="checkbox"
          ?checked="${this._checked}"
          value="${this.value}"
          tabindex="-1"
        />
        <div class="${iconClasses}"></div>
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
    'vscode-radio': VscodeRadio;
  }
}
