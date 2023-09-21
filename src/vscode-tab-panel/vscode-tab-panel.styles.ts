import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import declareThemeVariables from '../includes/declareThemeVariables.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
    {
      componentProp: '--background',
      vscodeProp: '--vscode-panel-background',
    },
  ]),
  css`
    :host {
      display: block;
      overflow: hidden;
    }

    :host(:focus-visible) {
      outline-color: var(--focus-border);
      outline-offset: 3px;
      outline-style: solid;
      outline-width: 1px;
    }

    :host([panel]) {
      background-color: var(--background);
    }
  `,
];

export default styles;
