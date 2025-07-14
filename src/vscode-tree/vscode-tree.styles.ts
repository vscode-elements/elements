import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vsc-tree-item-arrow-display: flex;
      --internal-selectionBackground: var(--vscode-list-inactiveSelectionBackground);
      --internal-selectionForeground: var(--vscode-foreground);
      --internal-selectionIconForeground: var(--vscode-icon-foreground);
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: block;

      display: block;
    }

    :host(:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }

    :host(:focus-within) {
      --internal-selectionBackground: var(--vscode-list-activeSelectionBackground);
      --internal-selectionForeground: var(--vscode-list-activeSelectionForeground);
      --internal-selectionIconForeground: var(--vscode-list-activeSelectionIconForeground);
    }

    :host([hide-arrows]) {
      --vsc-tree-item-arrow-display: none;
    }

    :host([indent-guides="none"]),
    :host([indent-guides="none"]:hover) {
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: none;
    }

    :host([indent-guides="always"]),
    :host([indent-guides="always"]:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }
  `,
];

export default styles;
