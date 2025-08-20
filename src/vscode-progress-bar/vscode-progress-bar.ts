import {TemplateResult, html} from 'lit';
import {property, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-progress-bar.styles.js';

/**
 * @tag vscode-progress-bar
 *
 * @cssprop [--vscode-progressBar-background=#0078d4]
 */
@customElement('vscode-progress-bar')
export class VscodeProgressBar extends VscElement {
  static override styles = styles;

  @property({reflect: true, attribute: 'aria-label'})
  override ariaLabel = 'Loading';

  // Current value for determinate mode. If undefined/NaN, the bar is indeterminate.
  @property({type: Number, reflect: true})
  value?: number;

  // Maximum value for determinate mode.
  @property({type: Number, reflect: true})
  max = 100;

  // Force indeterminate mode even if value is set.
  @property({type: Boolean, reflect: true})
  indeterminate = false;

  // Switch to a gentler animation after this many ms in indeterminate mode.
  @property({type: Number})
  longRunningThreshold = 15000;

  @state()
  private _longRunning = false;

  private _longRunningHandle: ReturnType<typeof setTimeout> | undefined;

  private get _isDeterminate(): boolean {
    return (
      !this.indeterminate &&
      typeof this.value === 'number' &&
      isFinite(this.value)
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.#maybeStartLongRunningTimer();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#clearLongRunningTimer();
  }

  protected override willUpdate(): void {
    this.#maybeStartLongRunningTimer();
  }

  override render(): TemplateResult {
    const max = this.max > 0 ? this.max : 100;
    const clamped = this._isDeterminate
      ? Math.min(Math.max(this.value ?? 0, 0), max)
      : 0;
    const percent = this._isDeterminate ? (clamped / max) * 100 : 0;

    const containerClasses = `container ${this._isDeterminate ? 'discrete' : 'infinite'} ${
      this._longRunning && !this._isDeterminate ? 'infinite-long-running' : ''
    }`;

    return html`
      <div
        class=${containerClasses}
        part="container"
        role="progressbar"
        aria-label=${this.ariaLabel}
        aria-valuemin="0"
        aria-valuemax=${String(max)}
        aria-valuenow=${ifDefined(
          this._isDeterminate ? String(Math.round(clamped)) : undefined
        )}
      >
        <div class="track" part="track"></div>
        <div
          class="indicator"
          part="indicator"
          style=${this._isDeterminate ? `width: ${percent}%;` : ''}
        ></div>
      </div>
    `;
  }

  #maybeStartLongRunningTimer(): void {
    const shouldRun =
      !this._isDeterminate && this.longRunningThreshold > 0 && this.isConnected;
    if (!shouldRun) {
      this.#clearLongRunningTimer();
      this._longRunning = false;
      return;
    }

    if (this._longRunningHandle) {
      return; // already scheduled
    }

    this._longRunningHandle = setTimeout(() => {
      this._longRunning = true;
      this._longRunningHandle = undefined;
      this.requestUpdate();
    }, this.longRunningThreshold);
  }

  #clearLongRunningTimer(): void {
    if (this._longRunningHandle) {
      clearTimeout(this._longRunningHandle);
      this._longRunningHandle = undefined;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-progress-bar': VscodeProgressBar;
  }
}
