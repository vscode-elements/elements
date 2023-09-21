import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import baseStyles from '../includes/form-button-widget/base.styles.js';
import formHelperTextStyles from '../includes/formHelperTextStyles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  baseStyles,
  css`
    .icon {
      border-radius: 9px;
    }

    .icon.checked:before {
      background-color: currentColor;
      border-radius: 4px;
      content: '';
      height: 8px;
      left: 50%;
      margin: -4px 0 0 -4px;
      position: absolute;
      top: 50%;
      width: 8px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--focus-border);
      outline-offset: -1px;
    }
  `,
  formHelperTextStyles,
];

export default styles;
