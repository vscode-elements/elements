import {html, TemplateResult, CSSResultGroup} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {FormButtonWidgetBase} from './includes/form-button-widget/FormButtonWidgetBase';
import baseStyles from './includes/form-button-widget/base.styles';
import radioStyles from './includes/form-button-widget/radio.styles';
import formHelperTextStyles from './includes/formHelperTextStyles';

/**
 * @attr name - Name which is used as a variable name in the data of the form-container.
 */
@customElement('vscode-radio')
export class VscodeRadio extends FormButtonWidgetBase {
  @property({type: Boolean})
  set checked(val: boolean) {
    this._checked = val;
    this.setAttribute('aria-checked', val ? 'true' : 'false');
  }
  get checked(): boolean {
    return this._checked;
  }

  @property()
  set label(val: string) {
    this._label = val;
    this.setAttribute('aria-label', val);
  }

  get label(): string {
    return this._label;
  }

  /**
   * Name which is used as a variable name in the data of the form-container.
   */
  @property()
  name = '';

  @property()
  value = '';

  @property({type: Boolean})
  disabled = false;

  @property({reflect: true})
  role = 'radio';

  private _label = '';

  @state()
  private _checked = false;

  @state()
  private isSlotEmpty = true;

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

  private _handleSlotChange() {
    this.isSlotEmpty = this.innerHTML === '';
  }

  static get styles(): CSSResultGroup[] {
    return [super.styles, baseStyles, radioStyles, formHelperTextStyles];
  }

  render(): TemplateResult {
    const isLabelEmpty = !this.label && this.isSlotEmpty;
    const iconClasses = classMap({
      icon: true,
      checked: this._checked,
      'before-empty-label': isLabelEmpty,
    });
    const labelInnerClasses = classMap({
      'label-inner': true,
      empty: isLabelEmpty,
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
            <slot @slotchange="${this._handleSlotChange}">${this.label}</slot>
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
