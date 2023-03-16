import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from './includes/VscElement';

/**
 * Multi-line text input.
 */
@customElement('vscode-textarea')
export class VscodeTextarea extends VscElement {
  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({attribute: false})
  label = '';

  @property()
  maxlength = undefined;

  @property()
  minlength = undefined;

  @property()
  rows = undefined;

  @property()
  cols = undefined;

  @property()
  name = undefined;

  @property()
  placeholder = undefined;

  @property({type: Boolean, reflect: true})
  readonly = false;

  @property()
  resize: 'both' | 'horizontal' | 'vertical' | 'none' = 'none';

  @property({type: Boolean, reflect: true})
  required = false;

  @property()
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

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          height: 40px;
          position: relative;
          width: 320px;
        }

        :host([cols]) {
          width: auto;
        }

        :host([rows]) {
          height: auto;
        }

        .shadow {
          box-shadow: var(--vscode-scrollbar-shadow) 0 6px 6px -6px inset;
          display: none;
          inset: 0 0 auto 0;
          height: 6px;
          pointer-events: none;
          position: absolute;
          width: 100%;
        }

        .shadow.visible {
          display: block;
        }

        textarea {
          background-color: var(--vscode-input-background, #ffffff);
          border-color: var(--vscode-settings-textInputBorder, #cecece);
          border-radius: 2px;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
          color: var(--vscode-foreground);
          display: block;
          font-family: var(
            --vscode-font-family,
            '"Segoe WPC", "Segoe UI", sans-serif'
          );
          font-size: var(--vscode-font-size, 13px);
          font-weight: var(--vscode-font-weight, normal);
          height: 100%;
          width: 100%;
        }

        :host([cols]) textarea {
          width: auto;
        }

        :host([rows]) textarea {
          height: auto;
        }

        textarea.monospace {
          color: var(--vscode-editor-foreground);
          font-family: var(--vscode-editor-font-family);
          font-size: var(--vscode-editor-font-size);
          font-weight: var(--vscode-editor-font-weight);
        }

        textarea.cursor-pointer {
          cursor: pointer;
        }

        textarea:focus {
          border-color: var(--vscode-focusBorder, #0090f1);
          outline: none;
        }

        textarea::-webkit-scrollbar-track {
          background-color: transparent;
        }

        textarea::-webkit-scrollbar {
          width: 14px;
        }

        textarea::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        textarea:hover::-webkit-scrollbar-thumb {
          background-color: var(
            --vscode-scrollbarSlider-background,
            rgba(100, 100, 100, 0.4)
          );
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background-color: var(
            --vscode-scrollbarSlider-hoverBackground,
            rgba(100, 100, 100, 0.7)
          );
        }

        textarea::-webkit-scrollbar-thumb:active {
          background-color: var(
            --vscode-scrollbarSlider-activeBackground,
            rgba(100, 100, 100, 0.7)
          );
        }

        textarea::-webkit-scrollbar-corner {
          background-color: transparent;
        }

        textarea::-webkit-resizer {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJxjYMAOZuIQZ5j5//9/rJJESczEKYGsG6cEXgAAsEEefMxkua4AAAAASUVORK5CYII=');
          background-repeat: no-repeat;
          background-position: right bottom;
        }
      `,
    ];
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
        autocomplete=${this.autocomplete}
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
        ?spellcheck=${this.spellcheck}
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
