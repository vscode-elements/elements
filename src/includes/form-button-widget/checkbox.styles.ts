import {css} from 'lit-element';

export default css`
  .icon {
    border-radius: 3px;
  }

  :host(:focus):host(:not([disabled])) .icon {
    outline: 1px solid var(--vscode-focusBorder);
    outline-offset: -1px;
  }
`;
