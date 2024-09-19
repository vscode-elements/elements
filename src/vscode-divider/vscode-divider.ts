import {TemplateResult, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-divider.styles';

@customElement('vscode-divider')
export class VscodeDivider extends VscElement {
  static styles = styles;

  @property({reflect: true})
  role: 'separator' | 'presentation' = 'separator';

  render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-divider': VscodeDivider;
  }
}
