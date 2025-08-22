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
      -ms-overflow-style: none; /* IE 10+ */
      align-items: center;
      background: var(--vscode-breadcrumb-background, transparent);
      display: flex;
      height: 22px;
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      scrollbar-width: none; /* Firefox */
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
