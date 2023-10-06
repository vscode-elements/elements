import {css, CSSResultGroup} from 'lit';
import declareThemeVariables from '../includes/declareThemeVariables.js';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--scrollbar-shadow',
      vscodeProp: '--vscode-scrollbar-shadow',
    },
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
      componentProp: '--placeholder',
      vscodeProp: '--vscode-input-placeholderForeground',
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
      componentProp: '--monospace-background',
      vscodeProp: '--vscode-editor-background',
    },
    {
      componentProp: '--monospace-foreground',
      vscodeProp: '--vscode-editor-foreground',
    },
    {
      componentProp: '--monospace-font-family',
      vscodeProp: '--vscode-editor-font-family',
    },
    {
      componentProp: '--monospace-font-size',
      vscodeProp: '--vscode-editor-font-size',
    },
    {
      componentProp: '--monospace-font-weight',
      vscodeProp: '--vscode-editor-font-weight',
    },
    {
      componentProp: '--monospace-placeholder',
      vscodeProp: '--vscode-editor-inlineValuesForeground',
    },
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
    {
      componentProp: '--scrollbar-background',
      vscodeProp: '--vscode-scrollbarSlider-background',
    },
    {
      componentProp: '--scrollbar-hover',
      vscodeProp: '--vscode-scrollbarSlider-hoverBackground',
    },
    {
      componentProp: '--scrollbar-active',
      vscodeProp: '--vscode-scrollbarSlider-activeBackground',
    },
  ]),
  css`
    :host {
      display: inline-block;
      height: 40px;
      position: relative;
      width: 320px;
    }

    :host([cols]) {
      width: auto;
    }

    :host([rows]) {
      height: auto;
    }

    .shadow {
      box-shadow: var(--scrollbar-shadow) 0 6px 6px -6px inset;
      display: none;
      inset: 0 0 auto 0;
      height: 6px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    textarea {
      background-color: var(--background);
      border-color: var(--vscode-settings-textInputBorder);
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--foreground);
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      height: 100%;
      width: 100%;
    }

    :host([cols]) textarea {
      width: auto;
    }

    :host([rows]) textarea {
      height: auto;
    }

    :host([invalid]) textarea,
    :host(:invalid) textarea {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    textarea.monospace {
      background-color: var(--monospace-background);
      color: var(--monospace-foreground);
      font-family: var(--monospace-font-family);
      font-size: var(--monospace-font-size);
      font-weight: var(--monospace-font-weight);
    }

    .textarea.moospace::placeholder {
      color: var(--monospace-placeholder);
    }

    textarea.cursor-pointer {
      cursor: pointer;
    }

    textarea:focus {
      border-color: var(--focus-border);
      outline: none;
    }

    textarea::placeholder {
      color: var(--placeholder);
      opacity: 1;
    }

    textarea::-webkit-scrollbar-track {
      background-color: transparent;
    }

    textarea::-webkit-scrollbar {
      width: 14px;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    textarea:hover::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-background);
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background-color: var(--scrollbar-hover);
    }

    textarea::-webkit-scrollbar-thumb:active {
      background-color: var(--scrollbar-active);
    }

    textarea::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    textarea::-webkit-resizer {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJxjYMAOZuIQZ5j5//9/rJJESczEKYGsG6cEXgAAsEEefMxkua4AAAAASUVORK5CYII=');
      background-repeat: no-repeat;
      background-position: right bottom;
    }
  `,
];

export default styles;
