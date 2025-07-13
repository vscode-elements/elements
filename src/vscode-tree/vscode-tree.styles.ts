import {CSSResultGroup, css} from 'lit';
import defaultStyles from '../includes/default.styles';

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vsc-tree-item-arrow-display: none;

      display: block;
    }

    :host([arrows]) {
      --vsc-tree-item-arrow-display: flex;
    }
  `,
];

export default styles;
