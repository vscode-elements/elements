import {html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-form-item.styles';

@customElement('vscode-form-item')
export class VscodeFormItem extends VscElement {
  static styles = styles;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-item': VscodeFormItem;
  }
}
