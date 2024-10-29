import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --separator-border: var(--vscode-editorWidget-border, transparent);

      /* border: 1px solid var(--vscode-editorWidget-border); */
      display: block;
      overflow: hidden;
      position: relative;
    }

    ::slotted(*) {
      height: 100%;
      width: 100%;
    }

    ::slotted(vscode-split-layout) {
      border: 0;
    }

    .start {
      box-sizing: border-box;
      left: 0;
      top: 0;
      overflow: hidden;
      position: absolute;
    }

    :host([split='vertical']) .start {
      border-right: 1px solid var(--separator-border);
    }

    :host([split='horizontal']) .start {
      border-bottom: 1px solid var(--separator-border);
    }

    .end {
      bottom: 0;
      box-sizing: border-box;
      overflow: hidden;
      position: absolute;
      right: 0;
    }

    .handle-overlay {
      display: none;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .handle-overlay.active {
      display: block;
    }

    .handle-overlay.split-vertical {
      cursor: ew-resize;
    }

    .handle-overlay.split-horizontal {
      cursor: ns-resize;
    }

    .handle {
      position: absolute;
      z-index: 2;
    }

    .handle.hover {
      background-color: var(--vscode-sash-hoverBorder);
      transition: background-color 100ms linear 300ms;
    }

    .handle.hide {
      background-color: transparent;
      transition: background-color 100ms linear;
    }

    .handle.split-vertical {
      cursor: ew-resize;
      height: 100%;
    }

    .handle.split-horizontal {
      cursor: ns-resize;
      width: 100%;
    }
  `,
];

export default styles;
