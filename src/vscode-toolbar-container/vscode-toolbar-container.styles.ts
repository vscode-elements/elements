import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles.js';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      gap: 4px;
      display: flex;
      align-items: center;
    }
  `,
];

export default styles;
