import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vsc-list-item-arrow-display: none;

      display: block;
    }

    :host([arrows]) {
      --vsc-list-item-arrow-display: flex;
    }
  `,
];

export default styles;
