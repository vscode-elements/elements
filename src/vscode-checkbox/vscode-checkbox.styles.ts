import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import baseStyles from '../includes/form-button-widget/base.styles';
import formHelperTextStyles from '../includes/formHelperTextStyles';

const styles: CSSResultGroup = [
  defaultStyles,
  baseStyles,
  css`
    .icon {
      border-radius: 3px;
    }

    .indeterminate-icon {
      background-color: currentColor;
      position: absolute;
      height: 1px;
      width: 12px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--focus-border);
      outline-offset: -1px;
    }
  `,
  formHelperTextStyles
];

export default styles;
