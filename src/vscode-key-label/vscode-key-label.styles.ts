import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
    }

    .wrapper {
      align-items: center;
      display: inline-flex;
    }

    .key {
      background-color: var(--vscode-keybindingLabel-background);
      border-bottom-color: var(--vscode-keybindingLabel-bottomBorder);
      border-top-color: var(--vscode-keybindingLabel-border);
      border-right-color: var(--vscode-keybindingLabel-border);
      border-left-color: var(--vscode-keybindingLabel-border);
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      box-shadow: inset 0 -1px 0 var(--vscode-widget-shadow);
      color: var(--vscode-keybindingLabel-foreground);
      display: inline-block;
      font-size: 11px;
      line-height: 10px;
      padding: 3px 5px;
      vertical-align: middle;
    }

    .before,
    .after {
      line-height: 18px;
      margin: 0 2px;
      vertical-align: middle;
    }
  `,
];

export default styles;
