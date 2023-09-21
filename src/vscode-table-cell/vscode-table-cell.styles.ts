import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
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

export default styles;
