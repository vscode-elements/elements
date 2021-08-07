import {css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';
import {VscElement} from './includes/VscElement';

@customElement('vscode-radio-group')
export class VscodeRadioGroup extends VscElement {
  @property({reflect: true})
  variant: 'horizontal' | 'vertical' = 'horizontal';

  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-radio) {
      margin-right: 20px;
    }

    ::slotted(vscode-radio:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-radio) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-radio:last-child) {
      margin-bottom: 0;
    }
  `;

  @property({type: Boolean, reflect: true})
  inline = false;

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
    'vscode-radio-group': VscodeRadioGroup;
  }
}
