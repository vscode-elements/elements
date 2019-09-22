import { LitElement, html, css, property, customElement } from 'lit-element';

enum Severity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
};

@customElement('vscode-inputbox')
export class VscodeInputbox extends LitElement {
  private _messageSeverity: Severity;

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
        this._messageSeverity = Severity.INFO;
    }

    this.requestUpdate('messageSeverity', oldVal);
  }
  get messageSeverity(): string {
    return this._messageSeverity;
  }

  constructor() {
    super();
    this._messageSeverity = Severity.INFO;
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
        box-sizing: border-box;
        color: var(--vscode-input-foreground);
        display: block;
        font-family: inherit;
        outline: none;
        padding: 3px;
        width: 100%;
      }

      .message {
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        display: block;
        font-size: 12px;
        line-height: 17px;
        margin-top: -1px;
        overflow: hidden;
        padding: .4em;
        position: absolute;
        top: 100%;
        text-align: left;
        width: 100%;
        word-wrap: break-word;
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
    const textarea = html`<textarea></textarea>`;
    const input = html`<input type="text">`;
    const message = html`
      <div class="message ${this.messageSeverity}">
        ${this.message}
      </div>
    `;

    return html`
      <div class="container">
        ${this.multiline ? textarea : input}
        ${this.message ? message : ''}
      </div>
    `;
  }
}
