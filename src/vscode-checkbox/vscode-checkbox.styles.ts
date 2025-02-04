import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import baseStyles from '../includes/form-button-widget/base.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  baseStyles,
  css`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

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
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
  `,
];

export default styles;
