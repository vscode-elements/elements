import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
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

    .arrow-container {
      align-items: center;
      display: var(--vsc-list-item-arrow-display);
      height: 22px;
      justify-content: center;
      padding-left: 8px;
      padding-right: 6px;
      width: 16px;
    }

    .arrow-container svg {
      display: block;
      fill: currentColor;
    }

    .arrow-container.icon-rotated svg {
      transform: rotate(90deg);
    }

    .icon-container {
      align-items: center;
      display: flex;
      height: 22px;
      margin-right: 6px;
    }

    .text-content {
      line-height: 22px;
    }

    :host([closed]) ::slotted(vscode-list-item) {
      display: none;
    }
  `,
];

export default styles;
