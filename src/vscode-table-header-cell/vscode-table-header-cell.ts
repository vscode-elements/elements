import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from '../includes/default.styles';
import {VscElement} from '../includes/VscElement';

/**
 * @cssprop [--foreground=var(--vscode-foreground)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-family=var(--vscode-font-family)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-size=var(--vscode-font-size)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-header-cell')
export class VscodeTableHeaderCell extends VscElement {
  @property({reflect: true})
  role = 'columnheader';

  static get styles(): CSSResultGroup {
    return [
      defaultStyles,
      css`
        :host {
          box-sizing: border-box;
          color: var(--foreground);
          display: table-cell;
          font-family: var(--font-family);
          font-size: var(--font-size);
          font-weight: bold;
          line-height: 20px;
          overflow: hidden;
          padding-bottom: 5px;
          padding-left: 10px;
          padding-right: 0;
          padding-top: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .wrapper {
          box-sizing: inherit;
          overflow: inherit;
          text-overflow: inherit;
          white-space: inherit;
          width: 100%;
        }
      `,
    ];
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
    'vscode-table-header-cell': VscodeTableHeaderCell;
  }
}
