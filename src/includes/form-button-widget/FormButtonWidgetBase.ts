import {property} from 'lit/decorators.js';
import {applyForegroundRGBA} from '../themeHelpers';
import {VscElement} from '../VscElement';

export class FormButtonWidgetBase extends VscElement {
  @property({type: Number, reflect: true})
  tabindex = 0;

  @property({type: Boolean, reflect: true})
  focused = false;

  constructor() {
    super();
    applyForegroundRGBA();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._handleFocusBound);
    this.addEventListener('blur', this._handleBlurBound);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._handleFocusBound);
    this.removeEventListener('blur', this._handleBlurBound);
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === 'disabled' && this.hasAttribute('disabled')) {
      this._prevTabindex = this.tabindex;
      this.tabindex = -1;
    } else if (name === 'disabled' && !this.hasAttribute('disabled')) {
      this.tabindex = this._prevTabindex;
    }
  }

  private _prevTabindex = 0;

  protected _uid = `id_${new Date().valueOf()}_${Math.floor(
    Math.random() * 9999
  )}`;

  protected _handleClick(): void {
    throw new Error('Not implemented');
  }

  protected _handleKeyDown(_event: KeyboardEvent): void {
    throw new Error('Not implemented');
  }

  private _handleFocus(): void {
    this.focused = true;
  }

  private _handleFocusBound = this._handleFocus.bind(this);

  private _handleBlur(): void {
    this.focused = false;
  }

  private _handleBlurBound = this._handleBlur.bind(this);
}
