import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-list-focusOutline',
    },
    {
      componentProp: '--font-family',
      vscodeProp: '--vscode-font-family',
    },
    {
      componentProp: '--font-size',
      vscodeProp: '--vscode-font-size',
    },
    {
      componentProp: '--font-weight',
      vscodeProp: '--vscode-font-weight',
    },
    {
      componentProp: '--hover-foreground',
      vscodeProp: '--vscode-list-hoverForeground',
    },
    {
      componentProp: '--hover-background',
      vscodeProp: '--vscode-list-hoverBackground',
    },
    {
      componentProp: '--inactive-selection-background',
      vscodeProp: '--vscode-list-inactiveSelectionBackground',
    },
    {
      componentProp: '--active-selection-background',
      vscodeProp: '--vscode-list-activeSelectionBackground',
    },
    {
      componentProp: '--active-selection-foreground',
      vscodeProp: '--vscode-list-activeSelectionForeground',
    },
    {
      componentProp: '--indent-guide',
      vscodeProp: '--vscode-tree-inactiveIndentGuidesStroke',
    },
    {
      componentProp: '--active-indent-guide',
      vscodeProp: '--vscode-tree-indentGuidesStroke',
    },
  ]),
  css`
    :host {
      display: block;
      outline: none;
      user-select: none;
    }

    .wrapper {
      height: 100%;
    }

    :host(:focus) .wrapper.focused-none {
      outline: 1px solid var(--focus-border);
    }

    li {
      list-style: none;
    }

    ul,
    li {
      margin: 0;
      padding: 0;
    }

    ul {
      position: relative;
    }

    :host([indent-guides]) ul ul:before {
      background-color: var(--indent-guide);
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      bottom: 0;
      left: var(--indent-guide-pos);
      top: 0;
      pointer-events: none;
      width: 1px;
      z-index: 1;
    }

    :host([indent-guides]) ul ul.has-active-item:before {
      background-color: var(--active-indent-guide);
    }

    .contents {
      align-items: center;
      display: flex;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      padding-right: 12px;
    }

    .multi .contents {
      align-items: flex-start;
    }

    .contents:hover {
      background-color: var(--hover-background);
      color: var(--hover-foreground);
      cursor: pointer;
    }

    .contents.selected {
      background-color: var(--inactive-selection-background);
    }

    :host(:focus) .contents.focused {
      background-color: var(--focus-background);
      outline: 1px solid var(--focus-border);
      outline-offset: -1px;
    }

    :host(:focus) .contents.selected.focused,
    :host(:focus) .contents.selected {
      background-color: var(--active-selection-background);
      color: var(--active-selection-foreground);
      outline-color: var(--vscode-list-focusAndSelectionOutline);
    }

    .arrow-container {
      align-items: center;
      display: flex;
      height: 22px;
      justify-content: center;
      padding-left: 8px;
      padding-right: 6px;
      width: 16px;
    }

    .icon-arrow {
      color: currentColor;
      display: block;
    }

    .theme-icon {
      display: block;
      flex-shrink: 0;
      margin-right: 6px;
    }

    .image-icon {
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: 16px;
      display: block;
      flex-shrink: 0;
      margin-right: 6px;
      height: 22px;
      width: 16px;
    }

    :host(:focus) .contents.selected.focused .theme-icon,
    :host(:focus) .contents.selected .theme-icon {
      color: var(--active-selection-foreground);
    }

    .multi .contents .theme-icon {
      margin-top: 3px;
    }

    .text-content {
      display: flex;
      line-height: 22px;
    }

    .single .text-content {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .description {
      font-size: 0.9em;
      line-height: 22px;
      margin-left: 0.5em;
      opacity: 0.95;
      white-space: pre;
    }

    .actions {
      display: none;
    }

    .contents.selected > .actions,
    .contents.focused > .actions,
    .contents:hover > .actions {
      display: flex;
    }

    :host(:focus) .contents.selected.focused .action-icon,
    :host(:focus) .contents.selected .action-icon {
      color: var(--active-selection-foreground);
    }
  `,
];

export default styles;
