import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/vscode-select/styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    .main-slot {
      display: contents;
    }

    .options {
      box-sizing: border-box;
      cursor: pointer;
      margin: 0;
      max-height: 222px;
      overflow: auto;
      padding: 1px;
    }
  `,
];

export default styles;
