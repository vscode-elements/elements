import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';

@customElement('vscode-radio-group')
export class VscodeRadioGroup extends LitElement {
  @property({type: Boolean, reflect: true})
  vertical = false;

  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([vertical]) .wrapper {
      display: block;
    }

    ::slotted(vscode-radio) {
      margin-right: 20px;
    }

    ::slotted(vscode-radio:last-child) {
      margin-right: 0;
    }

    :host([vertical]) ::slotted(vscode-radio) {
      display: block;
      margin-bottom: 15px;
    }

    :host([vertical]) ::slotted(vscode-radio:last-child) {
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
