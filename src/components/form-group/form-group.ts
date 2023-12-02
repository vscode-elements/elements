import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../../includes/VscElement.js';
import styles from './form-group.styles.js';

export type FormGroupVariant = 'horizontal' | 'vertical' | 'settings-group';

/**
 * @cssprop [--label-width=150px] - The width of the label in horizontal mode
 * @cssprop [--label-right-margin=14px] - The right margin of the label in horizontal mode
 */
@customElement('vsc-form-group')
export class VscFormGroup extends VscElement {
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
    'vsc-form-group': VscFormGroup;
  }
}
