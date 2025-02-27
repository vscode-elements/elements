import {TemplateResult, html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-progress-ring.styles.js';

/**
 * @tag vscode-progress-ring
 */
@customElement('vscode-progress-ring')
export class VscodeProgressRing extends VscElement {
  static override styles = styles;

  @property({reflect: true, attribute: 'aria-label'})
  override ariaLabel = 'Loading';

  @property({reflect: true, attribute: 'aria-live'})
  override ariaLive = 'assertive';

  @property({reflect: true})
  override role = 'alert';

  override render(): TemplateResult {
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
