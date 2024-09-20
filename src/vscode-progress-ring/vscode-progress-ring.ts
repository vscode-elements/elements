import {TemplateResult, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import styles from './vscode-progress-ring.styles';

@customElement('vscode-progress-ring')
export class VscodeProgressRing extends VscElement {
  static styles = styles;

  @property({reflect: true, attribute: 'aria-label'})
  ariaLabel = 'Loading';

  @property({reflect: true, attribute: 'aria-live'})
  ariaLive = 'assertive';

  @property({reflect: true})
  role = 'alert';

  render(): TemplateResult {
    return html`<svg class="progress" part="progress" viewBox="0 0 16 16">
      <circle
        class="background"
        part="background"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
      <circle
        class="indeterminate-indicator-1"
        part="indeterminate-indicator-1"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-progress-ring': VscodeProgressRing;
  }
}
