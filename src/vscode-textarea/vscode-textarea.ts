import {html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-textarea.styles.js';
import {AssociatedFormControl} from '../includes/AssociatedFormControl.js';

/**
 * Multi-line text input.
 *
 * @cssprop [--scrollbar-shadow=var(--vscode-scrollbar-shadow)]
 * @cssprop [--background=var(--vscode-settings-textInputBackground)]
 * @cssprop [--border=var(--vscode-settings-textInputBorder)]
 * @cssprop [--foreground=var(--vscode-settings-textInputForeground)]
 * @cssprop [--placeholder=var(--vscode-input-placeholderForeground)]
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--font-size=var(--vscode-font-size)]
 * @cssprop [--font-weight=var(--vscode-font-weight)]
 * @cssprop [--monospace-background=var(--vscode-editor-background)]
 * @cssprop [--monospace-foreground=var(--vscode-editor-foreground)]
 * @cssprop [--monospace-font-family=var(--vscode-editor-font-family)]
 * @cssprop [--monospace-font-size=var(--vscode-editor-font-size)]
 * @cssprop [--monospace-font-weight=var(--vscode-editor-font-weight)]
 * @cssprop [--monospace-placeholder=var(--vscode-editor-inlineValuesForeground)]
 * @cssprop [--focus-border=var(--vscode-focusBorder)]
 * @cssprop [--scrollbar-background=var(--vscode-scrollbarSlider-background)]
 * @cssprop [--scrollbar-hover=var(--vscode-scrollbarSlider-hoverBackground)]
 * @cssprop [--scrollbar-active=var(--vscode-scrollbarSlider-activeBackground)]
 */
@customElement('vscode-textarea')
export class VscodeTextarea
  extends VscElement
  implements AssociatedFormControl
{
  static styles = styles;

  /**
   * @internal
   */
  static formAssociated = true;

  // #region properties, setters/getters
  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean})
  autofocus = false;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  invalid = false;

  @property({attribute: false})
  label = '';

  @property({type: Number})
  maxlength: number | undefined = undefined;

  @property({type: Number})
  minlength: number | undefined = undefined;

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
  spellcheck = false;

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
  // #endregion

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._defaultValue = this.value;

    this.updateComplete.then(() => {
      this._textareaEl.checkValidity();
      this._setValidityFromInput();
    });
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formResetCallback(): void {
    this.value = this._defaultValue;
  }

  formStateRestoreCallback(
    state: string,
    _mode: 'restore' | 'autocomplete'
  ): void {
    this.value = state;
  }

  focus() {
    this._textareaEl.focus();
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
  private _defaultValue = '';

  private _setValidityFromInput() {
    this._internals.setValidity(
      this._textareaEl.validity,
      this._textareaEl.validationMessage,
      this._textareaEl
    );
    this.invalid = !this._internals.checkValidity();
  }

  private _dataChanged() {
    this._value = this._textareaEl.value;
    this._internals.setFormValue(this._textareaEl.value);
  }

  private _handleChange(ev: InputEvent) {
    this._dataChanged();
    this._setValidityFromInput();

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {data: ev.data, originalEvent: ev},
      })
    );
  }

  private _handleInput(ev: InputEvent) {
    this._dataChanged();
    this._setValidityFromInput();

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

  render(): TemplateResult {
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
        maxlength=${ifDefined(this.maxlength)}
        minlength=${ifDefined(this.minlength)}
        rows=${ifDefined(this.rows)}
        cols=${ifDefined(this.cols)}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        ?readonly=${this.readonly}
        style=${styleMap({
          resize: this.resize,
        })}
        ?required=${this.required}
        spellcheck=${this.spellcheck}
        @change=${this._handleChange}
        @input=${this._handleInput}
        @mousemove=${this._handleMouseMove}
        @scroll=${this._handleScroll}
      >
${this._value}</textarea
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-textarea': VscodeTextarea;
  }
}
