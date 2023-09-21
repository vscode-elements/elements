import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import defaultStyles from '../includes/default.styles.js';
import formHelperTextStyles from '../includes/formHelperTextStyles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--foreground',
      vscodeProp: '--vsc-foreground-translucent',
    },
  ]),
  css`
    :host {
      color: var(--foreground);
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
