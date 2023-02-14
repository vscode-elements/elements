import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {INPUT_LINE_HEIGHT_RATIO} from './includes/helpers';
import {VscElement} from './includes/VscElement';

enum Severity {
  DEFAULT = 'default',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

const LINE_HEIGHT = 17;
const PADDING = 4;
const BORDER_WIDTH = 1;

const calcHeightFromLines = (lines: number) => {
  return BORDER_WIDTH * 2 + PADDING * 2 + lines * LINE_HEIGHT;
};

/**
 * @attr {narrow|wide} variant - The sizes are borrowed from the VSCode settings page. The narrow size is typically used for the numeric values and the wide size for the text.
 * @attr name - Name which is used as a variable name in the data of the form-container.
 *
 * @cssprop --vscode-scrollbarSlider-background
 * @cssprop --vscode-scrollbarSlider-hoverBackground
 * @cssprop --vscode-scrollbarSlider-activeBackground
 * @cssprop --vscode-input-background
 * @cssprop --vscode-settings-textInputBorder
 * @cssprop --vscode-input-foreground
 * @cssprop --vscode-input-placeholderForeground
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-panelInput-border
 * @cssprop --vscode-focusBorder
 * @cssprop --vscode-inputValidation-infoBackground
 * @cssprop --vscode-inputValidation-infoBorder
 * @cssprop --vscode-inputValidation-warningBackground
 * @cssprop --vscode-inputValidation-warningBorder
 * @cssprop --vscode-inputValidation-errorBackground
 * @cssprop --vscode-inputValidation-errorBorder
 * @cssprop --vscode-editor-background
 */
@customElement('vscode-inputbox')
export class VscodeInputbox extends VscElement {
  @property()
  label = '';

  @property({type: Boolean})
  multiline = false;

  @property({type: String})
  message = '';

  @property({type: String})
  set severity(val: string) {
    const oldVal = this._severity;

    switch (val) {
      case Severity.INFO:
      case Severity.WARNING:
      case Severity.ERROR:
        this._severity = val;
        break;
      default:
        this._severity = Severity.DEFAULT;
    }

    this.requestUpdate('messageSeverity', oldVal);
  }
  get severity(): string {
    return this._severity;
  }

  /**
   * @deprecated
   * @attr panelInput
   */
  @property({type: Boolean})
  panelInput = false;

  /**
   * Text-like input types
   * @attr type
   * @type {"color"|"date"|"datetime-local"|"email"|"file"|"month"|"number"|"password"|"tel"|"text"|"time"|"url"|"week"}
   */
  @property({type: String})
  type: InputType = 'text';

  @property({type: Boolean, reflect: true})
  focused = false;

  @property({type: String})
  value = '';

  @property({type: String})
  placeholder = '';

  @property({type: Number})
  lines = 2;

  @property({type: Number})
  maxLines = 5;

  @property({type: Number})
  min: number | undefined = undefined;

  @property({type: Number})
  minLength: number | undefined = undefined;

  @property({type: Number})
  max: number | undefined = undefined;

  @property({type: Number})
  maxLength: number | undefined = undefined;

  @property({type: Boolean})
  multiple = false;

  @property({type: Boolean})
  readonly = false;

  @property({type: Number})
  step: number | undefined = undefined;

  /* @property({reflect: true, type: Number})
  tabindex = 0; */

  @query('.content-measurer')
  private _measurerEl!: HTMLDivElement;

  @query('.input-element')
  private _inputElement!: HTMLInputElement | HTMLTextAreaElement;

  @state()
  private _textareaHeight = 0;

  private _severity: Severity;
  private _textareaDefaultCursor = false;

  constructor() {
    super();
    this._severity = Severity.DEFAULT;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeTextareaIfRequired();
  }

  updated(
    changedProperties: Map<string, undefined | string | boolean | number>
  ): void {
    if (changedProperties.has('value')) {
      this.resizeTextareaIfRequired();
    }
  }

  get focusElement(): HTMLInputElement | HTMLTextAreaElement {
    return this._inputElement;
  }

  focus(): void {
    this._inputElement.focus();
  }

  toString(): string {
    return '[object VscodeInputbox]';
  }

  private onInputFocus = () => {
    this.focused = true;
  };

  private onInputBlur = () => {
    this.focused = false;
  };

  private onInputInput = (event: InputEvent) => {
    const eventTarget = <HTMLInputElement | HTMLTextAreaElement>event.target;

    this.value = eventTarget.value;

    this.dispatchEvent(
      new CustomEvent('vsc-input', {
        detail: eventTarget.value,
        bubbles: true,
        composed: true,
      })
    );

    this.resizeTextareaIfRequired();
  };

  private onInputChange = (event: InputEvent) => {
    const eventTarget = <HTMLInputElement | HTMLTextAreaElement>event.target;

    this.dispatchEvent(
      new CustomEvent('vsc-change', {
        detail: eventTarget.value,
        bubbles: true,
        composed: true,
      })
    );
  };

  private onTextareaMouseMove = (event: MouseEvent) => {
    const br = this.getBoundingClientRect();
    const x = event.clientX;
    const SCROLLBAR_WIDTH = 10;

    this._textareaDefaultCursor =
      x <= br.left + br.width &&
      x >= br.left + br.width - SCROLLBAR_WIDTH - BORDER_WIDTH * 2;

    this.requestUpdate();
  };

  private resizeTextareaIfRequired = (): void => {
    if (!this._measurerEl || !this.multiline) {
      return;
    }

    const {height} = this._measurerEl.getBoundingClientRect();

    if (height === 0) {
      this._textareaHeight = calcHeightFromLines(this.lines);
      this._measurerEl.style.minHeight = `${calcHeightFromLines(this.lines)}px`;
    } else {
      this._textareaHeight = height;
    }
  };

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          max-width: 100%;
          width: 320px;
        }

        :host([size-variant='narrow']) {
          width: 200px;
        }

        :host([size-variant='wide']) {
          width: 500px;
        }

        .container {
          position: relative;
        }

        .cursor-default {
          cursor: default;
        }

        textarea {
          left: 0;
          overflow: visible;
          position: absolute;
          resize: none;
          top: 0;
        }

        .content-measurer::-webkit-scrollbar,
        textarea::-webkit-scrollbar {
          cursor: default;
          width: 10px;
        }

        .content-measurer::-webkit-scrollbar-button,
        textarea::-webkit-scrollbar-button {
          display: none;
        }

        textarea::-webkit-scrollbar-track {
          background-color: transparent;
          width: 10px;
        }

        .content-measurer::-webkit-scrollbar-track {
          width: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        textarea:hover::-webkit-scrollbar-thumb {
          background-color: var(--vscode-scrollbarSlider-background);
        }

        textarea:hover::-webkit-scrollbar-thumb:hover {
          background-color: var(--vscode-scrollbarSlider-hoverBackground);
        }

        textarea:hover::-webkit-scrollbar-thumb:active {
          background-color: var(--vscode-scrollbarSlider-activeBackground);
        }

        input,
        textarea {
          background-color: var(--vscode-input-background);
          border-color: var(
            --vscode-settings-textInputBorder,
            rgba(0, 0, 0, 0)
          );
          border-radius: 2px;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
          color: var(--vscode-input-foreground);
          display: block;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          line-height: ${INPUT_LINE_HEIGHT_RATIO};
          outline: none;
          padding: 4px;
          width: 100%;
        }

        input::placeholder,
        textarea::placeholder {
          color: var(--vscode-input-placeholderForeground);
        }

        input::selection,
        textarea::selection {
          background-color: var(--vscode-editor-selectionBackground);
        }

        input:focus,
        textarea:focus {
          border-color: var(--vscode-focusBorder);
        }

        .container.panel-input input,
        .container.panel-input textarea {
          border-color: var(--vscode-panelInput-border);
        }

        .container.default input,
        .container.default textarea,
        .container.panel-input.default input,
        .container.panel-input.default textarea {
          border-color: var(--vscode-focusBorder);
        }

        .container.info input,
        .container.info textarea,
        .container.panel-input.info input,
        .container.panel-input.info textarea {
          border-color: var(--vscode-inputValidation-infoBorder);
        }

        .container.warning input,
        .container.warning textarea,
        .container.panel-input.warning input,
        .container.panel-input.warning textarea {
          border-color: var(--vscode-inputValidation-warningBorder);
        }

        .container.error input,
        .container.error textarea,
        .container.panel-input.error input,
        .container.panel-input.error textarea {
          border-color: var(--vscode-inputValidation-errorBorder);
        }

        .message {
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
          display: none;
          font-size: 12px;
          line-height: 17px;
          margin-top: -1px;
          overflow: hidden;
          padding: 0.4em;
          position: absolute;
          user-select: none;
          top: 100%;
          text-align: left;
          width: 100%;
          word-wrap: break-word;
        }

        .focused:not(.default) .message {
          display: block;
        }

        .message.default {
          background-color: var(--vscode-editor-background);
          border-color: var(--vscode-focusBorder);
        }

        .message.info {
          background-color: var(--vscode-inputValidation-infoBackground);
          border-color: var(--vscode-inputValidation-infoBorder);
        }

        .message.warning {
          background-color: var(--vscode-inputValidation-warningBackground);
          border-color: var(--vscode-inputValidation-warningBorder);
        }

        .message.error {
          background-color: var(--vscode-inputValidation-errorBackground);
          border-color: var(--vscode-inputValidation-errorBorder);
        }

        .content-measurer {
          background-color: green;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          left: 0;
          line-height: ${INPUT_LINE_HEIGHT_RATIO};
          overflow: auto;
          padding: 4px;
          text-align: left;
          top: 0;
          visibility: hidden;
          word-break: break-all;
        }
      `,
    ];
  }

  render(): TemplateResult {
    const minHeight = calcHeightFromLines(this.lines);
    const maxHeight = calcHeightFromLines(this.maxLines);

    const measurerStyles = styleMap({
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
    });
    const textareaStyles = styleMap({
      height: `${this._textareaHeight}px`,
    });
    const containerClasses = classMap({
      container: true,
      severity: this.severity !== Severity.DEFAULT,
      focused: this.focused,
    });
    const measurerContent = this.value
      ? this.value
          .split('\n')
          .map((line) =>
            line ? html`<div>${line}</div>` : html`<div>&nbsp;</div>`
          )
      : html`&nbsp;`;

    const textarea = html`
      <textarea
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input="${this.onInputInput}"
        @change="${this.onInputChange}"
        @mousemove="${this.onTextareaMouseMove}"
        class="${classMap({
          'cursor-default': this._textareaDefaultCursor,
          'input-element': true,
        })}"
        minlength="${ifDefined(this.minLength)}"
        maxlength="${ifDefined(this.maxLength)}"
        placeholder="${this.placeholder}"
        ?readonly="${this.readonly}"
        style="${textareaStyles}"
        .value="${this.value}"
      ></textarea>
      <div class="content-measurer" style="${measurerStyles}">
        ${measurerContent}
      </div>
    `;
    const input = html`
      <input
        type="${this.type}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input="${this.onInputInput}"
        @change="${this.onInputChange}"
        placeholder="${this.placeholder}"
        min="${ifDefined(this.min)}"
        minlength="${ifDefined(this.minLength)}"
        max="${ifDefined(this.max)}"
        maxlength="${ifDefined(this.maxLength)}"
        ?multiple="${this.multiple}"
        ?readonly="${this.readonly}"
        step="${ifDefined(this.step)}"
        .value="${this.value}"
        class="input-element"
      />
    `;

    const message = html`
      <div class="message ${this.severity}">${this.message}</div>
    `;

    return html`
      <div class="${containerClasses}">
        <div class="helper"><slot name="helper"></slot></div>
        <div class="input-wrapper">
          ${this.multiline ? textarea : input} ${this.message ? message : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-inputbox': VscodeInputbox;
  }
}
