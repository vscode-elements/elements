import {
  LitElement,
  property,
} from 'lit-element';
import {applyForegroundRGBA} from '../themeHelpers';

export class FormButtonWidgetBase extends LitElement {
  @property({type: Number, reflect: true})
  tabindex = 0;

  constructor() {
    super();
    applyForegroundRGBA();
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
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
}
