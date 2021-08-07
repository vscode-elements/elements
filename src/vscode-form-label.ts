import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators';
import {VscElement} from './includes/VscElement';

@customElement('vscode-form-label')
export class VscodeFormLabel extends VscElement {
  static get styles(): CSSResultGroup {
    return css`
      :host {
        color: var(--vscode-foreground);
        cursor: default;
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: 600;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: text;
        white-space: nowrap;
      }

      ::slotted(b) {
        font-weight: 600;
        opacity: 0.9;
      }
    `;
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-label': VscodeFormLabel;
  }
}
