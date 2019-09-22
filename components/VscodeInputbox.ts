import { LitElement, html, css, property, customElement } from 'lit-element';

enum Severity {
  DEFAULT = 'default',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
};

enum InputType {
  COLOR = 'color',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
  EMAIL = 'email',
  FILE = 'file',
  MONTH = 'month',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEL = 'tel',
  TEXT = 'text',
  TIME = 'time',
  URL = 'url',
  WEEK = 'week',
}

@customElement('vscode-inputbox')
export class VscodeInputbox extends LitElement {
  @property({ type: Boolean }) multiline = false;
  @property({ type: String }) message = '';
  @property({ type: String })
  set messageSeverity(val: string) {
    const oldVal = this._messageSeverity;

    switch (val) {
      case Severity.INFO:
      case Severity.WARNING:
      case Severity.ERROR:
        this._messageSeverity = val;
        break;
      default:
        this._messageSeverity = Severity.DEFAULT;
    }

    this.requestUpdate('messageSeverity', oldVal);
  }
  get messageSeverity(): string {
    return this._messageSeverity;
  }
  @property({ type: Boolean }) panelInput = false;
  @property({ type: String })
  set type(val: string) {
    const oldVal = this._type;

    switch(val) {
      case InputType.COLOR:
      case InputType.DATE:
      case InputType.DATETIME_LOCAL:
      case InputType.EMAIL:
      case InputType.FILE:
      case InputType.MONTH:
      case InputType.NUMBER:
      case InputType.PASSWORD:
      case InputType.TEL:
      case InputType.TEXT:
      case InputType.TIME:
      case InputType.URL:
      case InputType.WEEK:
        this._type = val;
        break;
      default:
        this._type = InputType.TEXT;
    }

    this.requestUpdate('type', oldVal);
  }
  get type(): string {
    return this._type;
  }
  @property({ type: Boolean, reflect: false }) focused = false;
  @property({ type: String, reflect: false }) value = '';
  @property({ type: String, reflect: false }) placeholder = '';

  private _messageSeverity: Severity;
  private _type: InputType;

  constructor() {
    super();
    this._messageSeverity = Severity.INFO;
  }

  private onInputFocus = () => {
    this.focused = true;
  };

  private onInputBlur = () => {
    this.focused = false;
  }

  static get styles() {
    return css`
      .container {
        position: relative;
      }

      textarea {
        height: 69px;
        resize: none;
      }

      input,
      textarea {
        background-color: var(--vscode-input-background);
        border-color: var(--vscode-we-input-border, var(--vscode-settings-textInputBorder));
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        color: var(--vscode-input-foreground);
        display: block;
        font-family: inherit;
        outline: none;
        padding: 3px;
        width: 100%;
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--vscode-input-placeholderForeground);
      }

      input:focus,
      textarea:focus {
        border-color: var(--vscode-focusBorder);
      }

      .container.panel-input input,
      .container.panel-input textarea {
        border-color: var(--vscode-panelInput-border);
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
        padding: .4em;
        position: absolute;
        user-select: none;
        top: 100%;
        text-align: left;
        width: 100%;
        word-wrap: break-word;
      }

      .focused .message {
        display: block;
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
    `;
  }

  render() {
    const textarea = html`
      <textarea
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        placeholder="${this.placeholder}"
      >${this.value}</textarea>
    `;
    const input = html`
      <input
        type="${this.type}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        placeholder="${this.placeholder}"
        value="${this.value}"
      >
    `;
    const message = html`
      <div class="message ${this.messageSeverity}">
        ${this.message}
      </div>
    `;
    let containerClass = 'container';

    if (this.message !== '') {
      containerClass += ` ${this.messageSeverity}`;
    }

    if (this.focused) {
      containerClass += ' focused';
    }

    return html`
      <div class="${containerClass}">
        ${this.multiline ? textarea : input}
        ${this.message ? message : ''}
      </div>
    `;
  }
}
