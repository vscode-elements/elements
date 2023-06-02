import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables';
import defaultStyles from '../includes/default.styles';
import formHelperTextStyles from '../includes/formHelperTextStyles';

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
