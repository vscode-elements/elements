import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-checkbox-group.styles.js';

/**
 * @tag vscode-checkbox-group
 */
@customElement('vscode-checkbox-group')
export class VscodeCheckboxGroup extends VscElement {
  static styles = styles;

  /** @internal */
  @property({reflect: true})
  role = 'group';

  @property({reflect: true})
  variant: 'horizontal' | 'vertical' = 'horizontal';

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-checkbox-group': VscodeCheckboxGroup;
  }
}
