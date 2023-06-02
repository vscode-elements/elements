import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      background-color: var(--header-background);
      display: table;
      table-layout: fixed;
      width: 100%;
    }
  `,
];

export default styles;
