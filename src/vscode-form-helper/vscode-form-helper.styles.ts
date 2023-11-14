import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import formHelperTextStyles from '../includes/formHelperTextStyles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      color: var(--vsc-foreground-translucent);
      display: block;
      margin-bottom: 4px;
      margin-top: 4px;
      max-width: 720px;
    }

    :host([vertical]) {
      margin-left: 0;
    }
  `,
  formHelperTextStyles,
];

export default styles;
