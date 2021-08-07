import {css} from 'lit';

export default css`
  .icon {
    border-radius: 9px;
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
