import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  CSSResult,
} from 'lit-element';

@customElement('vscode-form-group')
export class VscodeFormGroup extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        --label-right-margin: 14px;
        --label-default-width: 150px;

        display: block;
        margin: 15px 0;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(vscode-label) {
        width: var(--vsc-inline-label-width, var(--label-default-width));
        margin-right: var(--label-right-margin);
      }

      ::slotted(vscode-form-helper) {
        margin-left: calc(
          var(--vsc-inline-label-width, var(--label-default-width)) +
            var(--label-right-margin)
        );
      }
    `;
  }

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
    'vscode-form-row': VscodeFormGroup;
  }
}
