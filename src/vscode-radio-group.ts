import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';
import {VscodeRadio} from './vscode-radio';

@customElement('vscode-radio-group')
export class VscodeRadioGroup extends VscElement {
  @property({reflect: true})
  variant: 'horizontal' | 'vertical' = 'horizontal';

  @property({type: Boolean, reflect: true})
  inline = false;

  @property({reflect: true})
  role = 'radiogroup';

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this._onKeyDownBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onKeyDownBound);
  }

  @queryAssignedElements({selector: 'vscode-radio'})
  private _radios!: VscodeRadio[];

  @state()
  private _focusedRadio = 0;

  @state()
  private _checkedRadio = -1;

  private _beforeCheck() {
    const prevChecked = this._checkedRadio;
    const prevFocused = this._focusedRadio;

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
    this._beforeCheck();

    if (this._checkedRadio === -1) {
      this._checkedRadio = 0;
    } else if (this._checkedRadio - 1 >= 0) {
      this._checkedRadio -= 1;
    } else {
      this._checkedRadio = this._radios.length - 1;
    }

    this._afterCheck();
  }

  private _checkNext() {
    this._beforeCheck();

    if (this._checkedRadio === -1) {
      this._checkedRadio = 0;
    } else if (this._checkedRadio + 1 < this._radios.length) {
      this._checkedRadio += 1;
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

      if (this._checkedRadio !== -1) {
        this._radios[this._checkedRadio].checked = false;
      }

      this._focusedRadio = clickedIndex;
      this._checkedRadio = clickedIndex;
      this._radios[clickedIndex].tabIndex = 0;
    }
  }

  private _onSlotChange() {
    this._radios.forEach(
      (r, i) => (r.tabIndex = i === this._focusedRadio ? 0 : -1)
    );
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .wrapper {
          display: flex;
          flex-wrap: wrap;
        }

        :host([variant='vertical']) .wrapper {
          display: block;
        }

        ::slotted(vscode-radio) {
          margin-right: 20px;
        }

        ::slotted(vscode-radio:last-child) {
          margin-right: 0;
        }

        :host([variant='vertical']) ::slotted(vscode-radio) {
          display: block;
          margin-bottom: 15px;
        }

        :host([variant='vertical']) ::slotted(vscode-radio:last-child) {
          margin-bottom: 0;
        }
      `,
    ];
  }

  render(): TemplateResult {
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
