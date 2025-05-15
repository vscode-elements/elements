import {css, CSSResultGroup} from 'lit';

import defaultStyles from '../includes/default.styles.js';
import {getDefaultFontStack} from '../includes/helpers.js';

const defaultFontStack = getDefaultFontStack();

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: flex;
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
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-width: 0;
    }
  `,
];

export default styles;