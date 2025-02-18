import {html, LitElement, TemplateResult, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {VscElement} from '../includes/VscElement.js';
import {stylePropertyMap} from '../includes/style-property-map.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';
import styles from './vscode-textarea.styles.js';

/**
 * Multi-line text input.
 *
 * When participating in a form, it supports the `:invalid` pseudo class. Otherwise the error styles
 * can be applied through the `invalid` property.
 *
 * @tag vscode-textarea
 *
 * @fires {InputEvent} input
 * @fires {Event} change
 *
 * @cssprop [--vscode-scrollbar-shadow=#000000]
 * @cssprop [--vscode-settings-textInputBackground=#313131]
 * @cssprop [--vscode-settings-textInputBorder=transparent]
 * @cssprop [--vscode-settings-textInputForeground=#cccccc]
 * @cssprop [--vscode-input-placeholderForeground=#989898]
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-editor-background=#1f1f1f]
 * @cssprop [--vscode-editor-foreground=#cccccc]
 * @cssprop [--vscode-editor-font-family=monospace]
 * @cssprop [--vscode-editor-font-size=14px]
 * @cssprop [--vscode-editor-font-weight=normal]
 * @cssprop [--vscode-editor-inlineValuesForeground=rgba(255, 255, 255, 0.5)]
 * @cssprop [--vscode-focusBorder=#0078d4]
 * @cssprop [--vscode-scrollbarSlider-background=rgba(121, 121, 121, 0.4)]
 * @cssprop [--vscode-scrollbarSlider-hoverBackground=rgba(100, 100, 100, 0.7)]
 * @cssprop [--vscode-scrollbarSlider-activeBackground=rgba(191, 191, 191, 0.4)]
 */
@customElement('vscode-textarea')
export class VscodeTextarea
  extends VscElement
  implements AssociatedFormControl
{
  static override styles = styles;

  /**
   * @internal
   */
  static formAssociated = true;

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  // #region properties, setters/getters
  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean, reflect: true})
  override autofocus = false;

  @property({attribute: 'default-value'})
  defaultValue = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  @property({attribute: false})
  label = '';

  @property({type: Number})
  maxLength: number | undefined = undefined;

  @property({type: Number})
  minLength: number | undefined = undefined;

  @property({type: Number})
  rows: number | undefined = undefined;

  @property({type: Number})
  cols: number | undefined = undefined;

  @property()
  name: string | undefined = undefined;

  @property()
  placeholder: string | undefined = undefined;

  @property({type: Boolean, reflect: true})
  readonly = false;

  @property()
  resize: 'both' | 'horizontal' | 'vertical' | 'none' = 'none';

  @property({type: Boolean, reflect: true})
  required = false;

  @property({type: Boolean})
  override spellcheck = false;

  /**
   * Use monospace fonts. The font family, weight, size, and color will be the same as set in the
   * VSCode code editor.
   */
  @property({type: Boolean, reflect: true})
  monospace = false;

  @property()
  set value(val: string) {
    this._value = val;
    this._internals.setFormValue(val);
  }

  get value(): string {
    return this._value;
  }

  /**
   * Getter for the inner textarea element if it needs to be accessed for some reason.
   */
  get wrappedElement(): HTMLTextAreaElement {
    return this._textareaEl;
  }

  get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  /** @internal */
  get type(): 'textarea' {
    return 'textarea';
  }

  get validity(): ValidityState {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  /**
   * Lowercase alias to minLength
   */
  set minlength(val: number) {
    this.minLength = val;
  }

  get minlength(): number | undefined {
    return this.minLength;
  }

  /**
   * Lowercase alias to maxLength
   */
  set maxlength(val: number) {
    this.maxLength = val;
  }

  get maxlength(): number | undefined {
    return this.maxLength;
  }
  // #endregion

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this._textareaEl.checkValidity();
      this._setValidityFromInput();
      this._internals.setFormValue(this._textareaEl.value);
    });
  }

  override updated(
    changedProperties: PropertyValues<unknown> | Map<PropertyKey, unknown>
  ): void {
    const validationRelatedProps = ['maxLength', 'minLength', 'required'];

    for (const key of changedProperties.keys()) {
      if (validationRelatedProps.includes(String(key))) {
        this.updateComplete.then(() => {
          this._setValidityFromInput();
        });
        break;
      }
    }
  }

  /** @internal */
  formResetCallback(): void {
    this.value = this.defaultValue;
  }

  /** @internal */
  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    this.updateComplete.then(() => {
      this._value = state;
    });
  }

  checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  @query('#textarea')
  private _textareaEl!: HTMLTextAreaElement;

  @state()
  private _value = '';

  @state()
  private _textareaPointerCursor = false;

  @state()
  private _shadow = false;

  private _internals: ElementInternals;

  private _setValidityFromInput() {
    this._internals.setValidity(
      this._textareaEl.validity,
      this._textareaEl.validationMessage,
      this._textareaEl
    );
  }

  private _dataChanged() {
    this._value = this._textareaEl.value;
    this._internals.setFormValue(this._textareaEl.value);
  }

  private _handleChange(ev: Event) {
    this._dataChanged();
    this._setValidityFromInput();
    this.dispatchEvent(new Event('change'));
    /** @deprecated */
    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {data: this.value, originalEvent: ev},
      })
    );
  }

  private _handleInput(ev: InputEvent) {
    this._dataChanged();
    this._setValidityFromInput();
    /** @deprecated */
    this.dispatchEvent(
      new CustomEvent('vsc-input', {
        detail: {data: ev.data, originalEvent: ev},
      })
    );
  }

  private _handleMouseMove(ev: MouseEvent) {
    if (this._textareaEl.clientHeight >= this._textareaEl.scrollHeight) {
      this._textareaPointerCursor = false;
      return;
    }

    const SCROLLBAR_WIDTH = 14;
    const BORDER_WIDTH = 1;
    const br = this._textareaEl.getBoundingClientRect();
    const x = ev.clientX;

    this._textareaPointerCursor =
      x >= br.left + br.width - SCROLLBAR_WIDTH - BORDER_WIDTH * 2;
  }

  private _handleScroll() {
    this._shadow = this._textareaEl.scrollTop > 0;
  }

  override render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          shadow: true,
          visible: this._shadow,
        })}
      ></div>
      <textarea
        autocomplete=${ifDefined(this.autocomplete)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        id="textarea"
        class=${classMap({
          monospace: this.monospace,
          'cursor-pointer': this._textareaPointerCursor,
        })}
        maxlength=${ifDefined(this.maxLength)}
        minlength=${ifDefined(this.minLength)}
        rows=${ifDefined(this.rows)}
        cols=${ifDefined(this.cols)}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        ?readonly=${this.readonly}
        .style=${stylePropertyMap({
          resize: this.resize,
        })}
        ?required=${this.required}
        spellcheck=${this.spellcheck}
        @change=${this._handleChange}
        @input=${this._handleInput}
        @mousemove=${this._handleMouseMove}
        @scroll=${this._handleScroll}
        .value=${this._value}
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-textarea': VscodeTextarea;
  }
}
