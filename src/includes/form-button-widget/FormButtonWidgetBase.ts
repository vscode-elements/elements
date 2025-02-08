import {property} from 'lit/decorators.js';
import {VscElement} from '../VscElement.js';

export class FormButtonWidgetBase extends VscElement {
  @property({type: Boolean, reflect: true})
  focused = false;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._handleFocus);
    this.addEventListener('blur', this._handleBlur);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('blur', this._handleBlur);
  }

  override attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === 'disabled' && this.hasAttribute('disabled')) {
      this._prevTabindex = this.tabIndex;
      this.tabIndex = -1;
    } else if (name === 'disabled' && !this.hasAttribute('disabled')) {
      this.tabIndex = this._prevTabindex;
    }
  }

  private _prevTabindex = 0;

  private _handleFocus = (): void => {
    this.focused = true;
  };

  private _handleBlur = (): void => {
    this.focused = false;
  };
}
