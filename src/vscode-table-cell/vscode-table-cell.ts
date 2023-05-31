import {html, css, TemplateResult, nothing, CSSResultGroup} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import defaultStyles from './includes/default.styles';
import {VscElement} from './includes/VscElement';

/**
 * @cssprop [--border=var(--vscode-editorGroup-border)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--foreground=var(--vscode-foreground)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-family=var(--vscode-font-family)] - Inherited from [Table](/components/vscode-table/api/)
 * @cssprop [--font-size=var(--vscode-font-size)] - Inherited from [Table](/components/vscode-table/api/)
 */
@customElement('vscode-table-cell')
export class VscodeTableCell extends VscElement {
  @property({reflect: true})
  role = 'cell';

  /**
   * Cell label in the compact view of the responsive mode. For internal use only.
   */
  @property({attribute: 'column-label'})
  columnLabel = '';

  /**
   * Enable compact view in the responsive mode. For internal use only.
   */
  @property({type: Boolean, reflect: true})
  compact = false;

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
          height: 24px;
          overflow: hidden;
          padding-left: 10px;
          text-overflow: ellipsis;
          vertical-align: middle;
          white-space: nowrap;
        }

        :host([compact]) {
          display: block;
          height: auto;
          padding-bottom: 5px;
          width: 100% !important;
        }

        :host([compact]:first-child) {
          padding-top: 10px;
        }

        :host-context(vscode-table[bordered][compact]) {
          border: 0;
        }

        :host([compact]:last-child) {
          padding-bottom: 10px;
        }

        :host-context(vscode-table[bordered]) {
          border-bottom: 1px solid var(--border);
        }

        .wrapper {
          overflow: inherit;
          text-overflow: inherit;
          white-space: inherit;
          width: 100%;
        }

        .column-label {
          font-weight: bold;
        }
      `,
    ];
  }

  render(): TemplateResult {
    const columnLabelElement = this.columnLabel
      ? html`<div class="column-label" role="presentation">
          ${this.columnLabel}
        </div>`
      : nothing;

    return html`
      <div class="wrapper">
        ${columnLabelElement}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-table-cell': VscodeTableCell;
  }
}
