import {html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-form-control.styles';

/**
 * @deprecated
 */
@customElement('vscode-form-control')
export class VscodeFormControl extends VscElement {
  static styles = styles;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-control': VscodeFormControl;
  }
}
