import {css} from 'lit-element';

export default css`
  :host {
    display: inline-block;
    outline: none;
    position: relative;
    width: 320px;
  }

  .main-slot {
    display: none;
  }

  .select-face,
  .combobox-face {
    background-color: var(--vscode-settings-textInputBackground);
    border-color: var(--vscode-settings-dropdownBorder, rgba(0, 0, 0, 0));
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: var(--vscode-foreground);
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    font-weight: var(--vscode-font-weight);
    line-height: 1.3;
    position: relative;
    user-select: none;
    width: 100%;
  }

  .select-face {
    padding: 4px;
  }

  .combobox-face {
    display: flex;
  }

  .empty-label-placeholder {
    display: block;
    height: 16px;
  }

  :host(:focus) .select-face,
  :host(:focus) .combobox-face,
  :host([focused]) .select-face,
  :host([focused]) .combobox-face {
    border-color: var(--vscode-focusBorder);
    outline: none;
  }

  .combobox-input {
    background-color: transparent;
    box-sizing: border-box;
    border: 0;
    color: var(--vscode-foreground);
    display: block;
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    line-height: 1.3;
    padding: 4px;
    width: 100%;
  }

  .combobox-input:focus {
    outline: none;
  }

  .combobox-button {
    background-color: transparent;
    border: 0;
    color: var(--vscode-foreground);
    cursor: pointer;
    height: 24px;
    margin: 0;
    padding: 0;
    width: 30px;
  }

  .combobox-button:focus,
  .combobox-button:hover {
    background-color: var(--vscode-list-hoverBackground);
  }

  .combobox-button:focus {
    outline: 0;
  }

  .icon {
    color: var(--vsocode-foreground);
    display: block;
    height: 14px;
    pointer-events: none;
    position: absolute;
    right: 8px;
    top: 5px;
    width: 14px;
  }

  .icon svg {
    height: 100%;
    width: 100%;
  }

  .select-face:empty:before {
    content: '\\00a0';
  }

  .dropdown {
    background-color: var(--vscode-settings-textInputBackground);
    border-color: var(--vscode-settings-dropdownBorder);
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 2;
  }

  :host(:focus) .dropdown,
  :host([focused]) .dropdown {
    border-color: var(--vscode-focusBorder);
  }

  .options {
    box-sizing: border-box;
    cursor: pointer;
    list-style: none;
    margin: 0;
    max-height: 191px;
    overflow: auto;
    padding: 1px;
  }

  .option {
    align-items: center;
    color: var(--vscode-foreground);
    cursor: pointer;
    display: flex;
    font-size: var(--vscode-font-size);
    line-height: 1.3;
    min-height: calc(var(--vscode-font-size) * 1.3);
    padding: 1px 3px;
    user-select: none;
  }

  /* .option:hover {
    background-color: var(--vscode-list-hoverBackground);
  } */

  .option.active {
    background-color: var(--vscode-quickInput-list\\.focusBackground, var(--vscode-list-focusBackground));
  }

  .wrapper:hover {
    background-color: var(--vscode-quickInput-list\\.focusBackground, var(--vscode-list-focusBackground));
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
  }

  .buttons :not(:last-child) {
    margin-right: 4px;
  }

  .description {
    border-color: var(--vscode-settings-dropdownBorder);
    border-style: solid;
    border-width: 1px 0 0;
    color: var(--vscode-foreground);
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    font-weight: var(--vscode-font-weight);
    line-height: 1.3;
    padding: 6px 4px;
  }
`;
