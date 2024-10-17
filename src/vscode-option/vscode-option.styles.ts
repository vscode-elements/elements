import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      align-items: center;
      background-color: var(--vscode-settings-dropdownBackground);
      color: var(--vscode-foreground);
      cursor: pointer;
      display: flex;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: var(--vscode-font-weight);
      line-height: 18px;
      min-height: calc(var(--vscode-font-size) * 1.3);
      padding: 1px 3px;
      user-select: none;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
    }

    :host(:hover) {
      background-color: var(--vscode-list-hoverBackground);
      color: var(--vscode-list-hoverForeground);
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.4;
    }

    :host([active]),
    :host([active]:hover) {
      background-color: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
      border-color: var(--vscode-list-activeSelectionBackground);
      border-style: solid;
      border-width: 1px;
    }
  `,
];

export default styles;
