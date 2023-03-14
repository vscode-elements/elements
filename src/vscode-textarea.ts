import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from './includes/VscElement';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
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

  @property({type: Boolean, reflect: true})
  monospace = false;

  @property()
  set value(val: string) {
    this._value = val;
  }

  get value(): string {
    return this._value;
  }

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

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 320px;
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
        }

        textarea.monospace {
          color: var(--vscode-editor-foreground);
          font-family: var(--vscode-editor-font-family);
          font-size: var(--vscode-editor-font-size);
          font-weight: var(--vscode-editor-font-weight);
        }

        textarea:focus {
          border-color: var(--vscode-focusBorder, #0090f1);
          outline: none;
        }

        textarea::-webkit-scrollbar-track {
          background-color: transparent;
        }

        textarea::-webkit-scrollbar {
          width: 15px;
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
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <textarea
        autocomplete=${this.autocomplete}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        id="textarea"
        class=${classMap({
          monospace: this.monospace,
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
