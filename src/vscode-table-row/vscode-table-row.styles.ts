import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: table-row;
      width: 100%;
    }

    :host-context(vscode-table[compact]) {
      display: block;
    }

    :host-context(vscode-table[compact][bordered]) {
      border-top: 1px solid var(--border);
    }
  `,
];

export default styles;
