import {html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-form-label.styles';

@customElement('vscode-form-label')
export class VscodeFormLabel extends VscElement {
  static styles = styles;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-label': VscodeFormLabel;
  }
}
