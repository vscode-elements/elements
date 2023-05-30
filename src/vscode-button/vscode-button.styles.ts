import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--background',
      vscodeProp: '--vscode-button-background',
    },
    {
      componentProp: '--border',
      vscodeProp: '--vscode-button-border',
    },
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-button-foreground',
    },
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
    {
      componentProp: '--icon-foreground',
      vscodeProp: '--vscode-button-foreground',
    },
    {
      componentProp: '--hover-background',
      vscodeProp: '--vscode-button-hoverBackground',
    },
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
      componentProp: '--secondary-background',
      vscodeProp: '--vscode-button-secondaryBackground',
    },
    {
      componentProp: '--secondary-foreground',
      vscodeProp: '--vscode-button-secondaryForeground',
    },
    {
      componentProp: '--secondary-hover-background',
      vscodeProp: '--vscode-button-secondaryHoverBackground',
    },
  ]),
  css`
    :host {
      align-items: center;
      background-color: var(--background);
      border-color: var(--border);
      border-style: solid;
      border-radius: 2px;
      border-width: 1px;
      color: var(--foreground);
      cursor: pointer;
      display: inline-block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 22px;
      overflow: hidden;
      padding: 1px 13px;
      user-select: none;
    }

    :host([secondary]) {
      color: var(--secondary-foreground);
      background-color: var(--secondary-background);
    }

    :host([disabled]) {
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    }

    :host(:hover) {
      background-color: var(--hover-background);
    }

    :host([disabled]:hover) {
      background-color: var(--background);
    }

    :host([secondary]:hover) {
      background-color: var(--secondary-hover-background);
    }

    :host([secondary][disabled]:hover) {
      background-color: var(--secondary-background);
    }

    :host(:focus),
    :host(:active) {
      outline: none;
    }

    :host(:focus) {
      background-color: var(--hover-background);
      outline: 1px solid var(--focus-border);
      outline-offset: 2px;
    }

    :host([disabled]:focus) {
      background-color: var(--background);
      outline: 0;
    }

    :host([secondary]:focus) {
      background-color: var(--secondary-hover-background);
    }

    :host([secondary][disabled]:focus) {
      background-color: var(--secondary-background);
    }

    .wrapper {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
    }

    slot {
      display: block;
    }

    .icon {
      --foreground: var(--icon-foreground);
      display: block;
      margin-right: 3px;
    }

    .icon-after {
      --foreground: var(--icon-foreground);
      display: block;
      margin-left: 3px;
    }
  `,
];

export default styles;
