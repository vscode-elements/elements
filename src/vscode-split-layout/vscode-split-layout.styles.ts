import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--hover-border',
      vscodeProp: '--vscode-sash-hoverBorder',
    },
  ]),
  css`
    :host {
      display: block;
      overflow: hidden;
      position: relative;
    }

    .start {
      left: 0;
      top: 0;
      overflow: hidden;
      position: absolute;
    }

    .end {
      bottom: 0;
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
      background-color: var(--hover-border);
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
