import {css, CSSResultGroup} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
      max-width: 727px;
    }
  `,
];

export default styles;
