import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vsc-tree-item-arrow-display: none;
      --selection-background: var(--vscode-list-inactiveSelectionBackground);
      --default-indent-guide-display: none;
      --highlighted-indent-guide-display: block;

      display: block;
    }

    :host(:hover) {
      --default-indent-guide-display: block;
      --highlighted-indent-guide-display: block;
    }

    :host(:focus-within) {
      --selection-background: var(--vscode-list-activeSelectionBackground);
    }

    :host([arrows]) {
      --vsc-tree-item-arrow-display: flex;
    }

    :host([indent-guides="none"]),
    :host([indent-guides="none"]:hover) {
      --default-indent-guide-display: none;
      --highlighted-indent-guide-display: none;
    }

    :host([indent-guides="always"]),
    :host([indent-guides="always"]:hover) {
      --default-indent-guide-display: block;
      --highlighted-indent-guide-display: block;
    }
  `,
];

export default styles;
