import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import {INPUT_LINE_HEIGHT_RATIO} from '../includes/helpers.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      color: var(--vscode-foreground);
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: 600;
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      cursor: default;
      display: block;
      padding: 5px 0;
    }

    .wrapper {
      display: block;
    }

    .wrapper.required:after {
      content: ' *';
    }

    ::slotted(.normal) {
      font-weight: normal;
    }

    ::slotted(.lightened) {
      color: var(--vscode-foreground);
      opacity: 0.9;
    }
  `,
];

export default styles;
