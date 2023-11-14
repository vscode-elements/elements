import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      align-items: center;
      background-color: var(--vscode-button-background);
      border-color: var(--vscode-button-border, var(--vscode-button-background));
      border-style: solid;
      border-radius: 2px;
      border-width: 1px;
      color: var(--vscode-button-foreground);
      cursor: pointer;
      display: inline-block;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: var(--vscode-font-weight);
      line-height: 22px;
      overflow: hidden;
      padding: 1px 13px;
      user-select: none;
      white-space: nowrap;
    }

    :host([secondary]) {
      color: var(--vscode-button-secondaryForeground);
      background-color: var(--vscode-button-secondaryBackground);
      border-color: var(--vscode-button-border, var(--vscode-button-secondaryBackground));
    }

    :host([disabled]) {
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    }

    :host(:hover) {
      background-color: var(--vscode-button-hoverBackground);
    }

    :host([disabled]:hover) {
      background-color: var(--vscode-button-background);
    }

    :host([secondary]:hover) {
      background-color: var(--vscode-button-secondaryHoverBackground);
    }

    :host([secondary][disabled]:hover) {
      background-color: var(--vscode-button-secondaryBackground);
    }

    :host(:focus),
    :host(:active) {
      outline: none;
    }

    :host(:focus) {
      background-color: var(--vscode-button-hoverBackground);
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: 2px;
    }

    :host([disabled]:focus) {
      background-color: var(--vscode-button-background);
      outline: 0;
    }

    :host([secondary]:focus) {
      background-color: var(--vscode-button-secondaryHoverBackground);
    }

    :host([secondary][disabled]:focus) {
      background-color: var(--vscode-button-secondaryBackground);
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
      color: inherit;
      display: block;
      margin-right: 3px;
    }

    .icon-after {
      color: inherit;
      display: block;
      margin-left: 3px;
    }
  `,
];

export default styles;
