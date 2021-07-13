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
  @property({type: Boolean, reflect: true})
  vertical = false;

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

      :host([vertical]) .wrapper {
        display: block;
      }

      ::slotted(vscode-checkbox-group),
      ::slotted(vscode-radio-group) {
        width: calc(
          100% -
            calc(
              var(--vsc-inline-label-width, var(--label-default-width)) +
                var(--label-right-margin)
            )
        );
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

      :host([vertical]) ::slotted(vscode-label) {
        display: block;
        text-align: left;
      }

      :host([vertical]) ::slotted(vscode-form-helper) {
        margin-left: 0;
      }

      ::slotted(vscode-button:first-child) {
        margin-left: calc(
          var(--vsc-inline-label-width, var(--label-default-width)) +
            var(--label-right-margin)
        );
      }

      :host([vertical]) ::slotted(vscode-button) {
        margin-left: 0;
      }

      ::slotted(vscode-button) {
        margin-right: 4px;
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
    'vscode-form-group': VscodeFormGroup;
  }
}
