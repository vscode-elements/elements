import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
    }

    :host(:focus) {
      outline: none;
    }

    :host(:focus) .root {
      color: var(--vscode-breadcrumb-focusForeground, #e0e0e0);
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      text-decoration: underline;
    }

    :host(.selected) {
      color: var(
        --vscode-breadcrumb-activeSelectionForeground,
        var(--vscode-breadcrumb-focusForeground, inherit)
      );
    }

    .root {
      display: flex;
      align-items: center;
      color: var(--vscode-breadcrumb-foreground, inherit);
      outline: none;
      cursor: pointer;
    }

    :host(:hover) .root {
      color: var(--vscode-breadcrumb-focusForeground, #e0e0e0);
    }

    .icon {
      height: 16px;
      width: 16px;
    }

    .icon.has-icon {
      margin-right: 6px;
    }

    .separator {
      user-select: none;
      color: var(--vscode-breadcrumb-foreground, inherit);
      height: 16px;
      opacity: 0.7;
      width: 16px;
    }

    :host(:first-child) .separator {
      display: none;
    }

    :host(:first-child) .root {
      margin-left: 16px;
    }

    :host(:last-child) .root {
      margin-right: 8px;
    }
  `,
];

export default styles;
