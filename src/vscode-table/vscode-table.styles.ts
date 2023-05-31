import {css, CSSResultGroup} from 'lit';
import baseStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  baseStyles,
  declareThemeVariables([
    {
      componentProp: '--border',
      vscodeProp: '--vscode-editorGroup-border',
    },
    {
      componentProp: '--foreground',
      vscodeProp: '--vscode-foreground',
    },
    {
      componentProp: '--resize-hover-border',
      vscodeProp: '--vscode-sash-hoverBorder',
    },
    {
      componentProp: '--tinted-row-background',
      vscodeProp: '--vscode-keybindingTable-rowsBackground',
    },
    {
      componentProp: '--header-background',
      vscodeProp: '--vscode-keybindingTable-headerBackground',
    },
    {
      componentProp: '--font-size',
      vscodeProp: '--vscode-font-size',
    },
    {
      componentProp: 'font-family',
      vscodeProp: '--vscode-font-family',
    },
  ]),
  css`
    :host {
      display: block;
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .wrapper {
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .wrapper.select-disabled {
      user-select: none;
    }

    .wrapper.resize-cursor {
      cursor: ew-resize;
    }

    .wrapper.compact-view .header-slot-wrapper {
      height: 0;
      overflow: hidden;
    }

    .scrollable {
      height: 100%;
    }

    .scrollable:before {
      background-color: transparent;
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      width: 100%;
    }

    :host(:not([bordered]))
      .wrapper:not(.compact-view):hover
      .scrollable:not([scrolled]):before,
    :host([bordered])
      .wrapper:not(.compact-view)
      .scrollable:not([scrolled]):before {
      background-color: var(--border);
    }

    :host(:not([bordered])) .sash {
      visibility: hidden;
    }

    :host(:not([compact])) .wrapper:hover .sash {
      visibility: visible;
    }

    .sash {
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .wrapper.compact-view .sash {
      display: none;
    }

    .sash.resizable {
      cursor: ew-resize;
    }

    .sash-visible {
      background-color: var(--border);
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .sash.hover .sash-visible {
      background-color: var(--resize-hover-border);
      transition: background-color 50ms linear 300ms;
    }

    .sash .sash-clickable {
      background-color: transparent;
      height: 100%;
      left: -2px;
      position: absolute;
      width: 5px;
    }
  `,
];

export default styles;
