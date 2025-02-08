import {html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import styles from './vscode-radio-group.styles.js';

/**
 * @tag vscode-radio-group
 *
 * @fires {Event} change - Dispatched when a child radio button is changed.
 */
@customElement('vscode-radio-group')
export class VscodeRadioGroup extends VscElement {
  static override styles = styles;

  @property({reflect: true})
  variant: 'horizontal' | 'vertical' = 'horizontal';

  /** @internal */
  @property({reflect: true})
  override role = 'radiogroup';

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._onKeyDownBound);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onKeyDownBound);
  }

  @queryAssignedElements({selector: 'vscode-radio'})
  private _radios!: VscodeRadio[];

  @state()
  private _focusedRadio = -1;

  @state()
  private _checkedRadio = -1;

  private _firstContentLoaded = false;

  private _uncheckPreviousChecked(prevChecked: number, prevFocused: number) {
    if (prevChecked !== -1) {
      this._radios[prevChecked].checked = false;
    }

    if (prevFocused !== -1) {
      this._radios[prevFocused].tabIndex = -1;
    }
  }

  private _afterCheck() {
    this._focusedRadio = this._checkedRadio;
    this._radios[this._checkedRadio].checked = true;
    this._radios[this._checkedRadio].tabIndex = 0;
    this._radios[this._checkedRadio].focus();
  }

  private _checkPrev() {
    const prevChecked = this._radios.findIndex((r) => r.checked);
    const prevFocused = this._radios.findIndex((r) => r.focused);
    const startPos = prevFocused !== -1 ? prevFocused : prevChecked;

    this._uncheckPreviousChecked(prevChecked, prevFocused);

    if (startPos === -1) {
      this._checkedRadio = this._radios.length - 1;
    } else if (startPos - 1 >= 0) {
      this._checkedRadio = startPos - 1;
    } else {
      this._checkedRadio = this._radios.length - 1;
    }

    this._afterCheck();
  }

  private _checkNext() {
    const prevChecked = this._radios.findIndex((r) => r.checked);
    const prevFocused = this._radios.findIndex((r) => r.focused);
    const startPos = prevFocused !== -1 ? prevFocused : prevChecked;

    this._uncheckPreviousChecked(prevChecked, prevFocused);

    if (startPos === -1) {
      this._checkedRadio = 0;
    } else if (startPos + 1 < this._radios.length) {
      this._checkedRadio = startPos + 1;
    } else {
      this._checkedRadio = 0;
    }

    this._afterCheck();
  }

  private _onKeyDown(ev: KeyboardEvent) {
    const {key} = ev;
    const listenedKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

    if (listenedKeys.includes(key)) {
      ev.preventDefault();
    }

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      this._checkNext();
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      this._checkPrev();
    }
  }

  private _onKeyDownBound = this._onKeyDown.bind(this);

  private _onChange(ev: CustomEvent) {
    const clickedIndex = this._radios.findIndex((r) => r === ev.target);

    if (clickedIndex !== -1) {
      if (this._focusedRadio !== -1) {
        this._radios[this._focusedRadio].tabIndex = -1;
      }

      if (this._checkedRadio !== -1 && this._checkedRadio !== clickedIndex) {
        this._radios[this._checkedRadio].checked = false;
      }

      this._focusedRadio = clickedIndex;
      this._checkedRadio = clickedIndex;
      this._radios[clickedIndex].tabIndex = 0;
    }
  }

  private _onSlotChange() {
    if (!this._firstContentLoaded) {
      const autoFocusedRadio = this._radios.findIndex((r) => r.autofocus);

      if (autoFocusedRadio > -1) {
        this._focusedRadio = autoFocusedRadio;
      }

      this._firstContentLoaded = true;
    }

    this._radios.forEach((r, i) => {
      // if _focusedRadio is not set, the first radio should be focusable
      if (this._focusedRadio > -1) {
        r.tabIndex = i === this._focusedRadio ? 0 : -1;
      } else {
        r.tabIndex = i === 0 ? 0 : -1;
      }
    });
  }

  override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot
          @slotchange=${this._onSlotChange}
          @vsc-change=${this._onChange}
        ></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-radio-group': VscodeRadioGroup;
  }
}
