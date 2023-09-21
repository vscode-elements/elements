import {css} from 'lit';
import declareThemeVariables from '../declareThemeVariables.js';

export default [
  declareThemeVariables([
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
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
      componentProp: '--foreground',
      vscodeProp: '--vsc-foreground-translucent',
    },
    {
      componentProp: '--icon-background',
      vscodeProp: '--vscode-settings-checkboxBackground',
    },
    {
      componentProp: '--icon-border',
      vscodeProp: '--vscode-settings-checkboxBorder',
    },
    {
      componentProp: '--icon-foreground',
      vscodeProp: '--vscode-settings-checkboxForeground',
    },
  ]),
  css`
    :host {
      color: var(--foreground);
      display: inline-block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 1.4;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      opacity: 0.4;
    }

    .wrapper {
      cursor: pointer;
      display: block;
      font-size: var(--font-size);
      margin-bottom: 4px;
      margin-top: 4px;
      min-height: 18px;
      position: relative;
      user-select: none;
    }

    :host([disabled]) .wrapper {
      cursor: default;
    }

    input {
      position: absolute;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;
    }

    .icon {
      align-items: center;
      background-color: var(--icon-background);
      background-size: 16px;
      border: 1px solid var(--icon-border);
      box-sizing: border-box;
      color: var(--icon-foreground);
      display: flex;
      height: 18px;
      justify-content: center;
      left: 0;
      margin-left: 0;
      margin-right: 9px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .icon.before-empty-label {
      margin-right: 0;
    }

    .label {
      cursor: pointer;
      display: block;
      min-height: 18px;
      min-width: 18px;
    }

    .label-inner {
      display: block;
      padding-left: 27px;
    }

    .label-inner.empty {
      padding-left: 0;
    }

    :host([disabled]) .label {
      cursor: default;
    }
  `,
];
