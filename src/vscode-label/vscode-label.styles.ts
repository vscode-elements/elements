import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import {INPUT_LINE_HEIGHT_RATIO} from '../includes/helpers.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-foreground',
    },
    {
      componentProp: '--font-family',
      vscodeProp: '--vscode-font-family',
    },
    {
      componentProp: '--font-size',
      vscodeProp: '--vscode-font-size',
    },
  ]),
  css`
    :host {
      cursor: default;
      display: block;
    }

    .wrapper {
      color: var(--foreground);
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: 600;
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      padding: 5px 0;
    }

    .wrapper.required:after {
      content: ' *';
    }

    :host-context(vscode-form-group[variant='settings-group']) .wrapper {
      line-height: 18px;
      padding: 0;
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
