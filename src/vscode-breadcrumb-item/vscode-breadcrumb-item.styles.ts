import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--vscode-breadcrumb-foreground, inherit);
      outline: none;
      cursor: default;
    }

    :host(:focus) {
      color: var(
        --vscode-breadcrumb-focusForeground,
        var(--vscode-breadcrumb-foreground, inherit)
      );
    }

    :host(.selected) {
      color: var(
        --vscode-breadcrumb-activeSelectionForeground,
        var(--vscode-breadcrumb-focusForeground, inherit)
      );
    }

    .separator {
      user-select: none;
      color: var(--vscode-breadcrumb-foreground, inherit);
      opacity: 0.7;
    }

    :host(:first-child) .separator {
      display: none;
    }

    .icon::slotted(*) {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      line-height: 1;
    }
  `,
];

export default styles;
