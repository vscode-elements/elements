import {css} from 'lit-element';

export default css`
  .icon {
    align-items: center;
    background-color: var(--vscode-settings-checkboxBackground);
    background-size: 16px;
    border: 1px solid var(--vscode-settings-checkboxBorder);
    border-radius: 9px;
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

  .icon.checked:before {
    background-color: currentColor;
    border-radius: 4px;
    content: '';
    height: 8px;
    left: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    width: 8px;
  }

  :host(:focus):host(:not([disabled])) .icon {
    outline: 1px solid var(--vscode-focusBorder);
    outline-offset: -1px;
  }
`;
