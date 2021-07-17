import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';
import './vscode-scrollable';

@customElement('vscode-table')
export class VscodeTable extends LitElement {
  static styles = css`
    :host {
      display: table;
      width: 100%;
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .scrollable {
      height: 200px;
    }
  `;

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot name="header"></slot>
        <vscode-scrollable class="scrollable">
          <div>
            <slot name="body"></slot>
          </div>
        </vscode-scrollable>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table': VscodeTable;
  }
}
