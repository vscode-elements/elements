import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--background',
      vscodeProp: '--vscode-settings-textInputBackground',
    },
    {
      componentProp: '--border',
      vscodeProp: '--vscode-settings-textInputBorder',
    },
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-settings-textInputForeground',
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
      componentProp: '--font-size',
      vscodeProp: '--vscode-font-size',
    },
    {
      componentProp: '--font-weight',
      vscodeProp: '--vscode-font-weight',
    },
    {
      componentProp: '--placeholder',
      vscodeProp: '--vscode-input-placeholderForeground',
    },
    {
      componentProp: '--button-background',
      vscodeProp: '--vscode-button-background',
    },
    {
      componentProp: '--button-foreground',
      vscodeProp: '--vscode-button-foreground',
    },
    {
      componentProp: '--button-hover',
      vscodeProp: '--vscode-button-hoverBackground',
    },
  ]),
  css`
    :host {
      align-items: center;
      background-color: var(--background);
      border-color: var(--border);
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--foreground);
      display: inline-flex;
      max-width: 100%;
      position: relative;
      width: 320px;
    }

    :host([focused]) {
      border-color: var(--focus-border);
    }

    :host([invalid]),
    :host(:invalid) {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    ::slotted([slot='content-before']) {
      display: block;
      margin-left: 2px;
    }

    ::slotted([slot='content-after']) {
      display: block;
      margin-right: 2px;
    }

    slot[name='content-before'],
    slot[name='content-after'] {
      align-items: center;
      display: flex;
    }

    input {
      background-color: var(--background);
      border: 0;
      box-sizing: border-box;
      color: var(--foreground);
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 18px;
      outline: none;
      padding-bottom: 3px;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 3px;
      width: 100%;
    }

    input:read-only:not([type="file"]) {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--placeholder);
      opacity: 1;
    }

    input[type='file'] {
      line-height: 24px;
      padding-bottom: 0;
      padding-left: 2px;
      padding-top: 0;
    }

    input[type='file']::file-selector-button {
      background-color: var(--button-background);
      border: 0;
      border-radius: 2px;
      color: var(--button-foreground);
      cursor: pointer;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: 20px;
      padding: 0 14px;
    }

    input[type='file']::file-selector-button:hover {
      background-color: var(--button-hover);
    }
  `,
];

export default styles;
