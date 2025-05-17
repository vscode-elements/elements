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
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-width: 0;
    }

    ::slotted(vscode-button:not(:last-child)) {
      --divider-display: block;

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-width: 0;
    }

    ::slotted(vscode-button:focus) {
      z-index: 1;
    }
  `,
];

export default styles;
