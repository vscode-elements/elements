import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--font-family',
      vscodeProp: '--vscode-font-family',
    },
    {
      componentProp: '--font-size',
      vscodeProp: '--vscode-font-size',
    },
    {
      componentProp: '--font-weight',
      vscodeProp: '--vscode-font-weight',
    },
    {
      componentProp: '--background',
      vscodeProp: '--vscode-menu-background',
    },
    {
      componentProp: '--border',
      vscodeProp: '--vscode-menu-border',
    },
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-menu-foreground',
    },
    {
      componentProp: '--shadow',
      vscodeProp: '--vscode-widget-shadow',
    },
  ]),
  css`
    :host {
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 1.4em;
      position: relative;
    }

    .context-menu {
      background-color: var(--background);
      border-color: var(--border);
      border-radius: 5px;
      border-style: solid;
      border-width: 1px;
      box-shadow: 0 2px 8px var(--shadow);
      color: var(--foreground);
      padding: 4px 0;
      white-space: nowrap;
    }

    .context-menu:focus {
      outline: 0;
    }
  `,
];

export default styles;
