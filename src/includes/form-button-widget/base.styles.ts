import {css} from 'lit';

export default css`
  :host {
    --font-family: var(
      --vscode-font-family,
      'Segoe WPC',
      'Segoe UI',
      sans-serif
    );
    --font-size: var(--vscode-font-size, 13px);
    --font-weight: var(--vscode-font-weight, normal);
  }

  :host-context(body.vscode-dark) {
    --foreground: var(--vsc-foreground-translucent, rgba(204, 204, 204, 0.9));
    --icon-background: var(--vscode-settings-checkboxBackground, #3c3c3c);
    --icon-border: var(--vscode-settings-checkboxBorder, #6b6b6b);
  }

  :host-context(body.vscode-light) {
    --foreground: var(--vsc-foreground-translucent, rgba(97, 97, 97, 0.9));
    --icon-background: var(--vscode-settings-checkboxBackground, #ffffff);
    --icon-border: var(--vscode-settings-checkboxBorder, #919191);
  }

  :host-context(body.vscode-high-contrast) {
    --foreground: var(--vsc-foreground-translucent, rgb(255, 255, 255, 0.9));
    --icon-background: var(--vscode-settings-checkboxBackground, #000000);
    --icon-border: var(--vscode-settings-checkboxBorder, #6fc3df);
  }

  :host {
    color: var(--foreground);
    display: inline-block;
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
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
    font-size: var(--font-size);
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
    background-color: var(--icon-background);
    background-size: 16px;
    border: 1px solid var(--icon-border);
    box-sizing: border-box;
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
`;
