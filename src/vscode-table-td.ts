import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';

@customElement('vscode-table-td')
export class VscodeTableTd extends LitElement {
  @property({reflect: true})
  role = 'cell';

  static styles = css`
    :host {
      display: table-cell;
      height: 24px;
      vertical-align: middle;
    }

    .wrapper {
      padding-left: 10px;
    }
  `;

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
    'vscode-table-td': VscodeTableTd;
  }
}
