import {css} from 'lit';

export default [
  css`
    :host {
      color: var(--vsc-foreground-translucent);
      display: inline-block;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: var(--vscode-font-weight);
      line-height: 18px;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      opacity: 0.4;
    }

    .wrapper {
      cursor: pointer;
      display: block;
      font-size: var(--vscode-font-size);
      margin-bottom: 4px;
      margin-top: 4px;
      min-height: 18px;
      position: relative;
      user-select: none;
    }

    :host([disabled]) .wrapper {
      cursor: default;
    }

    input {
      position: absolute;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;
    }

    .icon {
      align-items: center;
      background-color: var(--vscode-settings-checkboxBackground);
      background-size: 16px;
      border: 1px solid var(--vscode-settings-checkboxBorder);
      box-sizing: border-box;
      color: var(--vscode-settings-checkboxForeground);
      display: flex;
      height: 18px;
      justify-content: center;
      left: 0;
      margin-left: 0;
      margin-right: 9px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .icon.before-empty-label {
      margin-right: 0;
    }

    .label {
      cursor: pointer;
      display: block;
      min-height: 18px;
      min-width: 18px;
    }

    .label-inner {
      display: block;
      padding-left: 27px;
    }

    .label-inner.empty {
      padding-left: 0;
    }

    :host([disabled]) .label {
      cursor: default;
    }
  `,
];
