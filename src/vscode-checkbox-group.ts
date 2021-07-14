import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-checkbox-group')
export class VscodeCheckboxGroup extends LitElement {
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

    :host([variant="vertical"]) .wrapper {
      display: block;
    }

    ::slotted(vscode-checkbox) {
      margin-right: 20px;
    }

    ::slotted(vscode-checkbox:last-child) {
      margin-right: 0;
    }

    :host([variant="vertical"]) ::slotted(vscode-checkbox) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant="vertical"]) ::slotted(vscode-checkbox:last-child) {
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
    'vscode-form-row': VscodeCheckboxGroup;
  }
}
