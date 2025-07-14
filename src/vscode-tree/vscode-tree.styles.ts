import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vsc-tree-item-arrow-display: none;
      --selection-background: var(--vscode-list-inactiveSelectionBackground);
      display: block;
    }

    :host(:focus-within) {
      --selection-background: var(--vscode-list-activeSelectionBackground);
    }

    :host([arrows]) {
      --vsc-tree-item-arrow-display: flex;
    }
  `,
];

export default styles;
