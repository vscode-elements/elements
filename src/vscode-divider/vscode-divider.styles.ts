import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      background-color: var(--vscode-widget-border);
      display: block;
      height: 1px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  `,
];

export default styles;
