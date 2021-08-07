import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators';

@customElement('vscode-form-description')
export class VscodeFormDescription extends LitElement {
  static get styles(): CSSResultGroup {
    return css`
      :host {
        color: var(--vscode-foreground);
        cursor: default;
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        line-height: 1.4;
        margin: 3px 0;
        opacity: 0.9;
        overflow: hidden;
        user-select: text;
      }

      ::slotted(a),
      ::slotted(a:visited) {
        color: var(--vscode-textLink-foreground);
        text-decoration: none;
      }

      ::slotted(a:hover),
      ::slotted(a:active) {
        color: var(--vscode-textLink-activeForeground);
        text-decoration: underline;
      }

      ::slotted(code) {
        color: var(--vscode-textPreformat-foreground);
      }

      ::slotted(p) {
        line-height: 1.4;
        margin-bottom: 9px;
        margin-top: 9px;
      }

      ::slotted(p:first-child) {
        margin-top: 0;
      }

      ::slotted(p:last-child) {
        margin-bottom: 0;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-description': VscodeFormDescription;
  }
}
