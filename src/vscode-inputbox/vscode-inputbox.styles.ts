import {css, CSSResultGroup} from 'lit';
import { INPUT_LINE_HEIGHT_RATIO } from '../includes/helpers';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
      max-width: 100%;
      width: 320px;
    }

    :host([size-variant='narrow']) {
      width: 200px;
    }

    :host([size-variant='wide']) {
      width: 500px;
    }

    .container {
      position: relative;
    }

    .cursor-default {
      cursor: default;
    }

    textarea {
      left: 0;
      overflow: visible;
      position: absolute;
      resize: none;
      top: 0;
    }

    .content-measurer::-webkit-scrollbar,
    textarea::-webkit-scrollbar {
      cursor: default;
      width: 10px;
    }

    .content-measurer::-webkit-scrollbar-button,
    textarea::-webkit-scrollbar-button {
      display: none;
    }

    textarea::-webkit-scrollbar-track {
      background-color: transparent;
      width: 10px;
    }

    .content-measurer::-webkit-scrollbar-track {
      width: 10px;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    textarea:hover::-webkit-scrollbar-thumb {
      background-color: var(--vscode-scrollbarSlider-background);
    }

    textarea:hover::-webkit-scrollbar-thumb:hover {
      background-color: var(--vscode-scrollbarSlider-hoverBackground);
    }

    textarea:hover::-webkit-scrollbar-thumb:active {
      background-color: var(--vscode-scrollbarSlider-activeBackground);
    }

    input,
    textarea {
      background-color: var(--vscode-input-background);
      border-color: var(--vscode-settings-textInputBorder, rgba(0, 0, 0, 0));
      border-radius: 2px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-input-foreground);
      display: block;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      outline: none;
      padding: 4px;
      width: 100%;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--vscode-input-placeholderForeground);
    }

    input::selection,
    textarea::selection {
      background-color: var(--vscode-editor-selectionBackground);
    }

    input:focus,
    textarea:focus {
      border-color: var(--vscode-focusBorder);
    }

    .container.panel-input input,
    .container.panel-input textarea {
      border-color: var(--vscode-panelInput-border);
    }

    .container.default input,
    .container.default textarea,
    .container.panel-input.default input,
    .container.panel-input.default textarea {
      border-color: var(--vscode-focusBorder);
    }

    .container.info input,
    .container.info textarea,
    .container.panel-input.info input,
    .container.panel-input.info textarea {
      border-color: var(--vscode-inputValidation-infoBorder);
    }

    .container.warning input,
    .container.warning textarea,
    .container.panel-input.warning input,
    .container.panel-input.warning textarea {
      border-color: var(--vscode-inputValidation-warningBorder);
    }

    .container.error input,
    .container.error textarea,
    .container.panel-input.error input,
    .container.panel-input.error textarea {
      border-color: var(--vscode-inputValidation-errorBorder);
    }

    .message {
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      display: none;
      font-size: 12px;
      line-height: 17px;
      margin-top: -1px;
      overflow: hidden;
      padding: 0.4em;
      position: absolute;
      user-select: none;
      top: 100%;
      text-align: left;
      width: 100%;
      word-wrap: break-word;
    }

    .focused:not(.default) .message {
      display: block;
    }

    .message.default {
      background-color: var(--vscode-editor-background);
      border-color: var(--vscode-focusBorder);
    }

    .message.info {
      background-color: var(--vscode-inputValidation-infoBackground);
      border-color: var(--vscode-inputValidation-infoBorder);
    }

    .message.warning {
      background-color: var(--vscode-inputValidation-warningBackground);
      border-color: var(--vscode-inputValidation-warningBorder);
    }

    .message.error {
      background-color: var(--vscode-inputValidation-errorBackground);
      border-color: var(--vscode-inputValidation-errorBorder);
    }

    .content-measurer {
      background-color: green;
      border: 1px solid transparent;
      box-sizing: border-box;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      left: 0;
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      overflow: auto;
      padding: 4px;
      text-align: left;
      top: 0;
      visibility: hidden;
      word-break: break-all;
    }
  `,
];

export default styles;
