import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
      margin-top: 9px;
    }
  `,
];

export default styles;