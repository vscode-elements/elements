import {css} from 'lit-element';

export default css`
  :host {
    color: var(--vsc-foreground-translucent);
    display: inline-block;
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    font-weight: var(--vscode-font-weight);
    line-height: 1.4;
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

  .label {
    cursor: pointer;
  }

  .label-inner {
    display: block;
    padding-left: 27px;
  }

  :host([disabled]) .label {
    cursor: default;
  }
`;
