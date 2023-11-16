import {html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-textarea.styles.js';

/**
 * Multi-line text input.
 *
 * @cssprop --vscode-scrollbar-shadow
 * @cssprop --vscode-settings-textInputBackground
 * @cssprop --vscode-settings-textInputBorder
 * @cssprop --vscode-settings-textInputForeground
 * @cssprop --vscode-input-placeholderForeground
 * @cssprop --vscode-font-family
 * @cssprop --vscode-font-size
 * @cssprop --vscode-font-weight
 * @cssprop --vscode-editor-background
 * @cssprop --vscode-editor-foreground
 * @cssprop --vscode-editor-font-family
 * @cssprop --vscode-editor-font-size
 * @cssprop --vscode-editor-font-weight
 * @cssprop --vscode-editor-inlineValuesForeground
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-scrollbarSlider-background
 * @cssprop --vscode-scrollbarSlider-hoverBackground
 * @cssprop --vscode-scrollbarSlider-activeBackground
 */
@customElement('vscode-textarea')
export class VscodeTextarea extends VscElement {
  static styles = styles;

  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean})
  autofocus = false;

  @property({type: Boolean, reflect: true})
  disabled = false;

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

  focus() {
    this._textareaEl.focus();
  }

  @query('#textarea')
  private _textareaEl!: HTMLTextAreaElement;

  @state()
  private _value = '';

  @state()
  private _textareaPointerCursor = false;

  @state()
  private _shadow = false;

  private _handleChange(ev: InputEvent) {
    this._value = this._textareaEl.value;

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: {data: ev.data, originalEvent: ev},
      })
    );
  }

  private _handleInput(ev: InputEvent) {
    this._value = this._textareaEl.value;

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
