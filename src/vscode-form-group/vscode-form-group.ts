import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-form-group.styles.js';

export type FormGroupVariant = 'horizontal' | 'vertical' | 'settings-group';

/**
 * @tag vscode-form-group
 *
 * @cssprop [--label-width=150px] - The width of the label in horizontal mode
 * @cssprop [--label-right-margin=14px] - The right margin of the label in horizontal mode
 */
@customElement('vscode-form-group')
export class VscodeFormGroup extends VscElement {
  static styles = styles;

  @property({reflect: true})
  variant: FormGroupVariant = 'horizontal';

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
    'vscode-form-group': VscodeFormGroup;
  }
}
