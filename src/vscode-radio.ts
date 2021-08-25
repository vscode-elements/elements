import {html, property, customElement, CSSResult, state} from 'lit-element';
import {TemplateResult} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
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
  }
  get checked(): boolean {
    return this._checked;
  }

  @property()
  label = '';

  @property()
  name = '';

  @property()
  value = '';

  @property({type: Boolean})
  disabled = false;

  @state()
  _checked = false;

  @state()
  private isSlotEmpty = true;

  private _checkButton() {
    const root = this.getRootNode({composed: true}) as Document | ShadowRoot;

    if (!root) {
      return;
    }

    const radios = root.querySelectorAll(
      `vscode-radio[name="${this.name}"]`
    ) as NodeListOf<VscodeRadio>;
    this._checked = true;

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
      this.checked = true;
    }
  }

  private _handleSlotChange() {
    this.isSlotEmpty = this.innerHTML === '';
  }

  static get styles(): CSSResult[] {
    return [baseStyles, radioStyles, formHelperTextStyles];
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

    return html`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="radio"
          type="checkbox"
          ?checked="${this.checked}"
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
