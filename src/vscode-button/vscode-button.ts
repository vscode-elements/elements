import {html, nothing, PropertyValueMap, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import '../vscode-icon/index.js';
import styles from './vscode-button.styles.js';
import {ifDefined} from 'lit/directives/if-defined.js';

/**
 * Clickable element that are used to trigger actions.
 *
 * @tag vscode-button
 *
 * @fires vsc-click Dispatched only when button is not in disabled state.
 *
 * @cssprop [--vscode-button-background=#0078d4]
 * @cssprop [--vscode-button-foreground=#ffffff]
 * @cssprop [--vscode-button-border=var(--vscode-button-background, rgba(255, 255, 255, 0.07))]
 * @cssprop [--vscode-button-hoverBackground=#026ec1]
 * @cssprop [--vscode-font-family=sans-serif] - A sans-serif font type depends on the host OS.
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-button-secondaryForeground=#cccccc]
 * @cssprop [--vscode-button-secondaryBackground=#313131]
 * @cssprop [--vscode-button-secondaryHoverBackground=#3c3c3c]
 * @cssprop [--vscode-focusBorder=#0078d4]
 */
@customElement('vscode-button')
export class VscodeButton extends VscElement {
  static override styles = styles;

  /** @internal */
  static formAssociated = true;

  @property({type: Boolean, reflect: true})
  override autofocus = false;

  /** @internal */
  @property({type: Number, reflect: true})
  override tabIndex = 0;

  /**
   * Button has a less prominent style.
   */
  @property({type: Boolean, reflect: true})
  secondary = false;

  /** @internal */
  @property({reflect: true})
  override role = 'button';

  @property({type: Boolean, reflect: true})
  disabled = false;

  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) before the label
   */
  @property()
  icon = '';

  /**
   * Spin property for the icon
   */
  @property({type: Boolean, reflect: true, attribute: 'icon-spin'})
  iconSpin? = false;

  /**
   * Duration property for the icon
   */
  @property({type: Number, reflect: true, attribute: 'icon-spin-duration'})
  iconSpinDuration?: number;

  /**
   * A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) after the label
   */
  @property({attribute: 'icon-after'})
  iconAfter = '';

  /**
   * Spin property for the after icon
   */
  @property({type: Boolean, reflect: true, attribute: 'icon-after-spin'})
  iconAfterSpin = false;

  /**
   * Duration property for the after icon
   */
  @property({
    type: Number,
    reflect: true,
    attribute: 'icon-after-spin-duration',
  })
  iconAfterSpinDuration?: number;

  @property({type: Boolean, reflect: true})
  focused = false;

  @property({type: String, reflect: true})
  name: string | undefined = undefined;

  @property({type: Boolean, reflect: true, attribute: 'icon-only'})
  iconOnly = false;

  @property({reflect: true})
  type: 'submit' | 'reset' | 'button' = 'button';

  @property()
  value = '';

  private _prevTabindex = 0;
  private _internals: ElementInternals;

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.addEventListener('click', this._handleClick.bind(this));
    this._internals = this.attachInternals();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (this.autofocus) {
      if (this.tabIndex < 0) {
        this.tabIndex = 0;
      }

      this.updateComplete.then(() => {
        this.focus();
        this.requestUpdate();
      });
    }

    this.addEventListener('focus', this._handleFocus);
    this.addEventListener('blur', this._handleBlur);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('blur', this._handleBlur);
  }

  override update(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.update(changedProperties);

    if (changedProperties.has('value')) {
      this._internals.setFormValue(this.value);
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        // Save the original tabIndex, which may have been modified by the user.
        this._prevTabindex = this.tabIndex;
        // It's a native property, we don't care about re-rendering.
        // eslint-disable-next-line lit/no-property-change-update
        this.tabIndex = -1;
      } else {
        // eslint-disable-next-line lit/no-property-change-update
        this.tabIndex = this._prevTabindex;
      }
    }
  }

  private _executeAction() {
    if (this.type === 'submit' && this._internals.form) {
      this._internals.form.requestSubmit();
    }

    if (this.type === 'reset' && this._internals.form) {
      this._internals.form.reset();
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      !this.hasAttribute('disabled')
    ) {
      /**
       * @deprecated
       * Please use the standard `click` event.
       */
      this.dispatchEvent(
        new CustomEvent<{
          originalEvent: MouseEvent;
        }>('vsc-click', {
          detail: {
            originalEvent: new MouseEvent('click'),
          },
        })
      );

      const syntheticClick = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }) as Event & {synthetic?: boolean};

      syntheticClick.synthetic = true;
      this.dispatchEvent(syntheticClick);

      this._executeAction();
    }
  }

  private _handleClick(event: MouseEvent) {
    if ((event as MouseEvent & {synthetic?: boolean}).synthetic) {
      return;
    }
    if (!this.hasAttribute('disabled')) {
      this.dispatchEvent(
        new CustomEvent<{
          originalEvent: MouseEvent;
        }>('vsc-click', {
          detail: {
            originalEvent: event,
          },
        })
      );

      this._executeAction();
    }
  }

  private _handleFocus = () => {
    this.focused = true;
  };

  private _handleBlur = () => {
    this.focused = false;
  };

  override render(): TemplateResult {
    const hasIcon = this.icon !== '';
    const hasIconAfter = this.iconAfter !== '';
    const wrapperClasses = {
      wrapper: true,
      'has-icon-before': hasIcon,
      'has-icon-after': hasIconAfter,
      'icon-only': this.iconOnly,
    };

    const iconElem = hasIcon
      ? html`<vscode-icon
          name=${this.icon}
          ?spin=${this.iconSpin}
          spin-duration=${ifDefined(this.iconSpinDuration)}
          class="icon"
        ></vscode-icon>`
      : nothing;

    const iconAfterElem = hasIconAfter
      ? html`<vscode-icon
          name=${this.iconAfter}
          ?spin=${this.iconAfterSpin}
          spin-duration=${ifDefined(this.iconAfterSpinDuration)}
          class="icon-after"
        ></vscode-icon>`
      : nothing;

    return html`
      <span class=${classMap(wrapperClasses)}>
        ${iconElem}
        <slot></slot>
        ${iconAfterElem}
      </span>
      <div class="divider"><div></div></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-button': VscodeButton;
  }
}
