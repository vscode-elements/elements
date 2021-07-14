import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  CSSResult,
} from 'lit-element';

export type FormGroupVariant = 'horizontal' | 'vertical' | 'settings-group';

@customElement('vscode-form-group')
export class VscodeFormGroup extends LitElement {
  @property({reflect: true})
  variant: FormGroupVariant = 'horizontal';

  static get styles(): CSSResult {
    return css`
      :host {
        --label-right-margin: 14px;
        --label-default-width: 150px;

        display: block;
        margin: 15px 0;
      }

      :host([variant="settings-group"]) {
        margin: 0;
        padding: 12px 14px 18px;
        max-width: 727px;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      :host([variant="vertical"]) .wrapper,
      :host([variant="settings-group"]) .wrapper {
        display: block;
      }

      :host([variant="horizontal"]) ::slotted(vscode-checkbox-group),
      :host([variant="horizontal"]) ::slotted(vscode-radio-group) {
        width: calc(
          100% -
            calc(
              var(--vsc-inline-label-width, var(--label-default-width)) +
                var(--label-right-margin)
            )
        );
      }

      :host([variant="horizontal"]) ::slotted(vscode-label) {
        margin-right: var(--label-right-margin);
        text-align: right;
        width: var(--vsc-inline-label-width, var(--label-default-width));
      }

      :host([variant="settings-group"]) ::slotted(vscode-label) {
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

      :host([variant="vertical"]) ::slotted(vscode-form-helper),
      :host([variant="settings-group"]) ::slotted(vscode-form-helper) {
        display: block;
        margin-left: 0;
      }

      :host([variant="settings-group"]) ::slotted(vscode-form-helper) {
        margin-bottom: 0;
        margin-top: 0;
      }

      :host([variant="vertical"]) ::slotted(vscode-label),
      :host([variant="settings-group"]) ::slotted(vscode-label) {
        display: block;
        margin-left: 0;
        text-align: left;
      }

      :host([variant="settings-group"]) ::slotted(vscode-inputbox),
      :host([variant="settings-group"]) ::slotted(vscode-single-select),
      :host([variant="settings-group"]) ::slotted(vscode-multi-select) {
        margin-top: 9px;
      }

      ::slotted(vscode-button:first-child) {
        margin-left: calc(
          var(--vsc-inline-label-width, var(--label-default-width)) +
            var(--label-right-margin)
        );
      }

      :host([variant="vertical"]) ::slotted(vscode-button) {
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
