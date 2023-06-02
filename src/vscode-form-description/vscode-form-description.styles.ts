import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      color: var(--vscode-foreground);
      cursor: default;
      display: block;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      line-height: 1.4;
      margin: 3px 0;
      opacity: 0.9;
      overflow: hidden;
      user-select: text;
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: var(--vscode-textLink-foreground);
      text-decoration: none;
    }

    ::slotted(a:hover),
    ::slotted(a:active) {
      color: var(--vscode-textLink-activeForeground);
      text-decoration: underline;
    }

    ::slotted(code) {
      color: var(--vscode-textPreformat-foreground);
    }

    ::slotted(p) {
      line-height: 1.4;
      margin-bottom: 9px;
      margin-top: 9px;
    }

    ::slotted(p:first-child) {
      margin-top: 0;
    }

    ::slotted(p:last-child) {
      margin-bottom: 0;
    }
  `,
];

export default styles;
