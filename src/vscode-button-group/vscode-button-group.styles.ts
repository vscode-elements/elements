import {css, CSSResultGroup} from 'lit';

import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-flex;
      align-items: stretch;
      padding: 0;
      border: none;
    }

    ::slotted(vscode-button:not(:first-child)) {
      --vsc-border-left-width: 0;
      --vsc-border-left-radius: 0;
      --vsc-border-left-width: 0;
    }

    ::slotted(vscode-button:not(:last-child)) {
      --vsc-divider-display: block;
      --vsc-border-right-width: 0;
      --vsc-border-right-radius: 0;
      --vsc-border-right-width: 0;
    }

    ::slotted(vscode-button:focus) {
      z-index: 1;
    }
  `,
];

export default styles;
