import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--scrollbar-shadow',
      vscodeProp: '--vscode-scrollbar-shadow',
    },
    {
      componentProp: '--scrollbar-slider-background',
      vscodeProp: '--vscode-scrollbarSlider-background',
    },
    {
      componentProp: '--scrollbar-slider-hover-background',
      vscodeProp: '--vscode-scrollbarSlider-hoverBackground',
    },
    {
      componentProp: '--scrollbar-slider-active-background',
      vscodeProp: '--vscode-scrollbarSlider-activeBackground',
    },
  ]),
  css`
    :host {
      display: block;
      position: relative;
    }

    .scrollable-container {
      height: 100%;
      overflow: auto;
    }

    .scrollable-container::-webkit-scrollbar {
      cursor: default;
      width: 0;
    }

    .shadow {
      box-shadow: var(--scrollbar-shadow) 0 6px 6px -6px inset;
      display: none;
      height: 3px;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    .scrollbar-track {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      z-index: 100;
    }

    .scrollbar-track.hidden {
      display: none;
    }

    .scrollbar-thumb {
      background-color: transparent;
      min-height: var(--min-thumb-height, 20px);
      opacity: 0;
      position: absolute;
      right: 0;
      width: 10px;
    }

    .scrollbar-thumb.visible {
      background-color: var(--scrollbar-slider-background);
      opacity: 1;
      transition: opacity 100ms;
    }

    .scrollbar-thumb.fade {
      background-color: var(--scrollbar-slider-background);
      opacity: 0;
      transition: opacity 800ms;
    }

    .scrollbar-thumb.visible:hover {
      background-color: var(--scrollbar-slider-hover-background);
    }

    .scrollbar-thumb.visible.active,
    .scrollbar-thumb.visible.active:hover {
      background-color: var(--scrollbar-slider-active-background);
    }

    .prevent-interaction {
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
      z-index: 99;
    }

    .content {
      overflow: hidden;
    }
  `,
];

export default styles;
