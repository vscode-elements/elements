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

      :host(.settings-group) {
        margin: 0;
        padding: 12px 14px 18px;
        width: 727px;
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

      :host(.settings-group) ::slotted(vscode-label) {
        height: 18px;
        line-height: 18px;
        margin-bottom: 4px;
        margin-right: 0;
      }

      ::slotted(vscode-form-helper) {
        margin-left: calc(
          var(--vsc-inline-label-width, var(--label-default-width)) +
            var(--label-right-margin)
        );
      }

      :host([vertical]) ::slotted(vscode-form-helper) {
        margin-left: 0;
      }

      :host(.settings-group) ::slotted(vscode-form-helper) {
        margin-bottom: 0;
        margin-top: 0;
      }

      :host([vertical]) ::slotted(vscode-label) {
        display: block;
        text-align: left;
      }

      :host(.settings-group) ::slotted(vscode-inputbox),
      :host(.settings-group) ::slotted(vscode-single-select),
      :host(.settings-group) ::slotted(vscode-multi-select) {
        margin-top: 9px;
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
