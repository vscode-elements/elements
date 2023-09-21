import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import formHelperTextStyles from '../includes/formHelperTextStyles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-checkbox) {
      margin-right: 20px;
    }

    ::slotted(vscode-checkbox:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox:last-child) {
      margin-bottom: 0;
    }
  `,
  formHelperTextStyles,
];

export default styles;
