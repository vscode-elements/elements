import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import defaultStyles from '../includes/default.styles.js';

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
      vscodeProp: '--vscode-menu-selectionBorder',
    },
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-menu-foreground',
    },
    {
      componentProp: '--selection-background',
      vscodeProp: '--vscode-menu-selectionBackground',
    },
    {
      componentProp: '--selection-foreground',
      vscodeProp: '--vscode-menu-selectionForeground',
    },
    {
      componentProp: '--separator-background',
      vscodeProp: '--vscode-menu-separatorBackground',
    },
  ]),
  css`
    :host {
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 1.4em;
      outline: none;
      position: relative;
    }

    .context-menu-item {
      background-color: var(--menu-background);
      color: var(--menu-foreground);
      display: flex;
      user-select: none;
      white-space: nowrap;
    }

    .ruler {
      border-bottom: 1px solid var(--separator-background);
      display: block;
      margin: 0 0 4px;
      padding-top: 4px;
      width: 100%;
    }

    .context-menu-item a {
      align-items: center;
      border-color: transparent;
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--foreground);
      cursor: default;
      display: flex;
      flex: 1 1 auto;
      height: 2em;
      margin-left: 4px;
      margin-right: 4px;
      outline: none;
      position: relative;
      text-decoration: inherit;
    }

    :host-context([selected]) .context-menu-item a {
      background-color: var(--selection-background);
      border-color: var(--border);
      color: var(--selection-foreground);
    }

    .label {
      background: none;
      display: flex;
      flex: 1 1 auto;
      font-size: 12px;
      line-height: 1;
      padding: 0 22px;
      text-decoration: none;
    }

    .keybinding {
      display: block;
      flex: 2 1 auto;
      line-height: 1;
      padding: 0 22px;
      text-align: right;
    }
  `,
];

export default styles;
