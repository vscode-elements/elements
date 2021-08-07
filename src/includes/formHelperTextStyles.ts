import {css} from 'lit';

/**
 * Text styles for the labels and form helpers
 *
 * Source of the monospace font stack:
 * @see https://github.com/microsoft/vscode/issues/81692
 *
 * Node.js platform identifiers:
 * @see https://nodejs.org/api/process.html#process_process_platform
 */
export default css`
  ::slotted(*) {
    margin: 0;
  }

  ::slotted(a) {
    color: var(--vscode-textLink-foreground);
    text-decoration: none;
  }

  ::slotted(code) {
    color: var(--vscode-textPreformat-foreground);
    line-height: 15px;
  }

  ::slotted(.error) {
    color: var(--vscode-errorForeground);
  }

  :host-context(body.win32) ::slotted(code) {
    font-family: Consolas, Inconsolata, 'Courier New', monospace;
  }

  :host-context(body.linux) ::slotted(code) {
    font-family: 'Droid Sans Mono', Inconsolata, 'Courier New', monospace,
      'Droid Sans Fallback';
  }

  :host-context(body.darwin) ::slotted(code) {
    font-family: 'SF Mono', Monaco, Menlo, Inconsolata, 'Courier New', monospace;
  }
`;
