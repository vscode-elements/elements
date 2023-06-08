import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--background',
      vscodeProp: '--vscode-sideBar-background',
    },
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
    {
      componentProp: '--font-family',
      vscodeProp: '--vscode-font-family',
    },
    {
      componentProp: '--header-background',
      vscodeProp: '--vscode-sideBarSectionHeader-background',
    },
    {
      componentProp: '--icon-foreground',
      vscodeProp: '--vscode-icon-foreground',
    },
    {
      componentProp: '--title-foreground',
      vscodeProp: '--vscode-sideBarTitle-foreground',
    },
  ]),
  css`
    .collapsible {
      background-color: var(--background);
    }

    .collapsible-header {
      align-items: center;
      background-color: var(--header-background);
      cursor: pointer;
      display: flex;
      height: 22px;
      line-height: 22px;
      user-select: none;
    }

    .collapsible-header:focus {
      opacity: 1;
      outline-offset: -1px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: var(--focus-border);
    }

    .collapsible-header .title {
      color: var(--title-foreground);
      display: block;
      font-family: var(--font-family);
      font-size: 11px;
      font-weight: 700;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .header-icon {
      color: var(--icon-foreground);
      display: block;
      flex-shrink: 0;
      margin: 0 3px;
    }

    .collapsible.open .header-icon {
      transform: rotate(90deg);
    }

    .header-slots {
      align-items: center;
      display: flex;
      height: 22px;
      margin-left: auto;
      margin-right: 4px;
    }

    .actions {
      display: none;
    }

    .collapsible.open .actions {
      display: block;
    }

    .header-slots slot {
      display: flex;
      max-height: 22px;
      overflow: hidden;
    }

    .header-slots slot::slotted(div) {
      align-items: center;
      display: flex;
    }

    .collapsible-body {
      display: none;
      overflow: hidden;
    }

    .collapsible.open .collapsible-body {
      display: block;
    }
  `,
];

export default styles;
