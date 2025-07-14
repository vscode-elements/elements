import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --hover-outline-color: transparent;
      --hover-outline-style: solid;
      --hover-outline-width: 0;

      --selected-outline-color: transparent;
      --selected-outline-style: solid;
      --selected-outline-width: 0;

      cursor: pointer;
      display: block;
      user-select: none;
    }

    .wrapper {
      display: block;
    }

    .content {
      align-items: flex-start;
      display: flex;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: var(--vscode-font-weight);
      outline-offset: -1px;
      padding-right: 12px;
    }

    .content:hover {
      background-color: var(--vscode-list-hoverBackground);
      color: var(--vscode-list-hoverForeground);
    }

    :host([selected]) .content {
      color: var(--selection-foreground);
      background-color: var(--selection-background);
    }

    :host([selected]) ::slotted(vscode-icon) {
      color: var(--selection-foreground);
    }

    :host(:focus) {
      outline: none;
    }

    :host(:focus) .content.active {
      outline-color: var(
        --vscode-list-focusAndSelectionOutline,
        var(--vscode-list-focusOutline)
      );
      outline-style: solid;
      outline-width: 1px;
    }

    .arrow-container {
      align-items: center;
      display: var(--vsc-tree-item-arrow-display);
      height: 22px;
      justify-content: center;
      padding-left: 8px;
      padding-right: 6px;
      width: 16px;
    }

    .arrow-container svg {
      display: block;
      fill: var(--vscode-icon-foreground);
    }

    .arrow-container.icon-rotated svg {
      transform: rotate(90deg);
    }

    :host([selected]) .arrow-container svg {
      fill: var(--selection-icon-foreground);
    }

    .icon-container {
      align-items: center;
      display: flex;
      height: 22px;
      margin-right: 6px;
    }

    .children {
      position: relative;
    }

    .children.guide:before {
      background-color: var(--vscode-tree-inactiveIndentGuidesStroke);
      content: '';
      display: none;
      height: 100%;
      left: var(--indentation-guide-left);
      pointer-events: none;
      position: absolute;
      width: 1px;
      z-index: 1;
    }

    .children.guide.default-guide:before {
      display: var(--default-indent-guide-display);
    }

    .children.guide.highlighted-guide:before {
      display: var(--highlighted-indent-guide-display);
      background-color: var(--vscode-tree-indentGuidesStroke);
    }

    .text-content {
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      font-size: 0.9em;
      margin-left: 0.5em;
      opacity: 0.95;
    }

    .additional-content {
      display: flex;
      margin-left: auto;
    }

    .decorations {
      align-items: center;
      display: flex;
      height: 22px;
    }

    .actions {
      align-items: center;
      display: none;
      height: 22px;
    }

    .content:hover .actions {
      display: flex;
    }

    .actions ::slotted(vscode-icon),
    .actions ::slotted(vscode-badge) {
      margin-left: 4px;
    }

    .decorations ::slotted(vscode-icon),
    .decorations ::slotted(vscode-badge) {
      margin-left: 4px;
    }

    :host([branch]) ::slotted(vscode-tree-item) {
      display: none;
    }

    :host([branch][open]) ::slotted(vscode-tree-item) {
      display: block;
    }
  `,
];

export default styles;
