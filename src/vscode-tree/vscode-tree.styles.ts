import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';
import declareThemeVariables from '../includes/declareThemeVariables';

const styles: CSSResultGroup = [
  defaultStyles,
  declareThemeVariables([
    {
      componentProp: '--focus-border',
      vscodeProp: '--vscode-focusBorder',
    },
    {
      componentProp: '--focus-outline',
      vscodeProp: '--vscode-list-focusOutline',
    },
    {
      componentProp: '--inactive-focus-outline',
      vscodeProp: '--vscode-list-inactiveFocusOutline',
    },
    {
      componentProp: '--focus-and-selection-outline',
      vscodeProp: '--vscode-list-focusAndSelectionOutline',
    },
    {
      componentProp: '--focus-background',
      vscodeProp: '--vscode-list-focusBackground',
    },
    {
      componentProp: '--focus-foreground',
      vscodeProp: '--vscode-list-focusForeground',
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
      componentProp: '--inactive-focus-background',
      vscodeProp: '--vscode-list-inactiveFocusBackground',
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
      componentProp: '--inactive-selection-foreground',
      vscodeProp: '--vscode-list-inactiveSelectionForeground',
    },
    {
      componentProp: '--inactive-selection-icon-foreground',
      vscodeProp: '--vscode-list-inactiveSelectionIconForeground',
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
      componentProp: '--active-selection-icon-foreground',
      vscodeProp: '--vscode-list-activeSelectionIconForeground',
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
      cursor: pointer;
    }

    .contents.focused {
      outline-offset: -1px;
    }

    :host(:focus) .contents.focused {
      outline-offset: -1px;
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

    .decorations {
      align-items: center;
      display: flex;
      height: 22px;
    }

    .filled-circle {
      margin-right: 3px;
      opacity: .4;
    }

    .decoration-text {
      font-size: 90%;
      font-weight: 600;
      margin-right: 3px;
      opacity: .75;
    }

    /* Theme colors */
    :host(:focus) .wrapper.has-not-focused-item {
      outline: 1px solid var(--focus-border);
    }

    :host(:focus) .contents.selected,
    :host(:focus) .contents.focused.selected {
      color: var(--active-selection-foreground);
      background-color: var(--active-selection-background);
    }

    :host(:focus) .contents.selected .icon-arrow,
    :host(:focus) .contents.selected.focused .icon-arrow,
    :host(:focus) .contents.selected .theme-icon,
    :host(:focus) .contents.selected.focused .theme-icon,
    :host(:focus) .contents.selected .action-icon,
    :host(:focus) .contents.selected.focused .action-icon {
      color: var(--active-selection-icon-foreground);
    }

    :host(:focus) .contents.focused {
      color: var(--focus-foreground);
      background-color: var(--focus-background);
    }

    :host(:focus) .contents.selected.focused {
      outline-color: var(--focus-and-selection-outline);
    }

    .contents:hover {
      background-color: var(--hover-background);
      color: var(--hover-foreground);
    }

    :host-context(body.vscode-high-contrast) .contents:hover,
    :host-context(body.vscode-high-contrast) .contents.selected:hover,
    :host-context(body.vscode-high-contrast-light) .contents:hover,
    :host-context(body.vscode-high-contrast-light) .contents.selected:hover {
      outline-color: var(--focus-border);
      outline-offset: -1px;
      outline-style: dashed;
      outline-width: 1px;
    }

    .contents.selected,
    .contents.selected.focused {
      background-color: var(--inactive-selection-background);
      color: var(--inactive-selection-foreground);
    }

    :host-context(body.vscode-high-contrast) .contents.selected,
    :host-context(body.vscode-high-contrast) .contents.selected.focused,
    :host-context(body.vscode-high-contrast-light) .contents.selected,
    :host-context(body.vscode-high-contrast-light) .contents.selected.focused {
      outline-color: var(--focus-border);
      outline-offset: -1px;
      outline-style: dotted;
      outline-width: 1px;
    }

    .contents.selected .theme-icon {
      color: var(--inactive-selection-icon-foreground);
    }

    .contents.focused {
      background-color: var(--inactive-focus-background);
      outline: 1px dotted var(--inactive-focus-outline);
    }

    :host(:focus) .contents.focused {
      outline: 1px solid var(--focus-outline);
    }

    :host([indent-guides]) ul ul:before {
      background-color: var(--indent-guide);
    }

    :host([indent-guides]) ul ul.has-active-item:before {
      background-color: var(--active-indent-guide);
    }
  `,
];

export default styles;
