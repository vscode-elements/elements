import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
      width: 100%;
      outline: none;
    }

    .container {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      background: var(--vscode-breadcrumb-background, transparent);
    }

    .container::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    ::slotted(vscode-breadcrumb-item) {
      flex: 0 0 auto;
    }
  `,
];

export default styles;
