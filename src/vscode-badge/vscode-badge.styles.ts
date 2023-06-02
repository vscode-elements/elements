import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-badge-foreground',
    },
    {
      componentProp: '--font-family',
      vscodeProp: '--vscode-font-family',
    },
    {
      componentProp: '--background',
      vscodeProp: '--vscode-badge-background',
    },
    {
      componentProp: '--activity-bar-badge-background',
      vscodeProp: '--vscode-activityBarBadge-background',
    },
    {
      componentProp: '--activity-bar-badge-foreground',
      vscodeProp: '--vscode-activityBarBadge-foreground',
    },
  ]),
  css`
    :host {
      background-color: var(--background);
      border-radius: 2px;
      color: var(--foreground);
      display: inline-block;
      font-family: var(--font-family);
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      min-width: 18px;
      padding: 2px 3px;
      text-align: center;
      white-space: nowrap;
    }

    :host([variant='counter']) {
      border-radius: 11px;
      box-sizing: border-box;
      height: 18px;
      line-height: 1;
      padding: 3px 5px;
    }

    :host([variant='activity-bar-counter']) {
      background-color: var(--activity-bar-badge-background);
      border-radius: 20px;
      color: var(--activity-bar-badge-foreground);
      font-size: 9px;
      font-weight: 600;
      line-height: 16px;
      min-width: 8px;
      padding: 0 4px;
    }
  `,
];

export default styles;
