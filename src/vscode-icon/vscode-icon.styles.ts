import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-icon-foreground',
    },
    {
      componentProp: '--hover-background',
      vscodeProp: '--vscode-toolbar-hoverBackground',
    },
    {
      componentProp: '--active-background',
      vscodeProp: '--vscode-toolbar-activeBackground',
    },
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
  ]),
  css`
    :host {
      color: var(--foreground);
      display: inline-block;
    }

    .codicon[class*='codicon-'] {
      display: block;
    }

    .icon,
    .button {
      background-color: transparent;
      display: block;
      padding: 0;
    }

    .button {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      color: currentColor;
      cursor: pointer;
      padding: 2px;
    }

    .button:hover {
      background-color: var(--vscode-toolbar-hoverBackground);
    }

    .button:active {
      background-color: var(--vscode-toolbar-activeBackground);
    }

    .button:focus {
      outline: none;
    }

    .button:focus-visible {
      border-color: var(--vscode-focusBorder);
    }

    @keyframes icon-spin {
      100% {
        transform: rotate(360deg);
      }
    }

    .spin {
      animation-name: icon-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  `,
];

export default styles;
