import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: table;
      table-layout: fixed;
      width: 100%;
    }

    :host-context(vscode-table[zebra])
      ::slotted(vscode-table-row:nth-child(even)) {
      background-color: var(--tinted-row-background);
    }

    :host-context(vscode-table[zebra-odd])
      ::slotted(vscode-table-row:nth-child(odd)) {
      background-color: var(--tinted-row-background);
    }
  `,
];

export default styles;
