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
      componentProp: '--header-border',
      vscodeProp: '--vscode-settings-headerBorder',
    },
    {
      componentProp: '--panel-background',
      vscodeProp: '--vscode-panel-background',
    },
  ]),
  css`
    :host {
      display: block;
    }

    .header {
      align-items: center;
      display: flex;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      width: 100%;
    }

    .header {
      border-bottom-color: var(--header-border);
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }

    .header.panel {
      background-color: var(--panel-background);
      border-bottom-width: 0;
      box-sizing: border-box;
      padding-left: 8px;
      padding-right: 8px;
    }

    slot[name='addons'] {
      display: block;
      margin-left: auto;
    }
  `,
];

export default styles;
