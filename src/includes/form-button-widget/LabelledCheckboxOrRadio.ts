import {html, LitElement, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type Constructor<T = {}> = new (...args: any[]) => T;

export declare class LabelledCheckboxOrRadioInterface {
  label: string;
  protected _handleSlotChange(): void;
  protected _renderLabelAttribute(): TemplateResult;
}

export const LabelledCheckboxOrRadioMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class LabelledCheckboxOrRadio extends superClass {
    @property()
    set label(val: string) {
      this._label = val;

      if (this._slottedText === '') {
        this.setAttribute('aria-label', val);
      }
    }

    get label(): string {
      return this._label;
    }

    private _label = '';

    private _slottedText = '';

    protected _handleSlotChange(): void {
      this._slottedText = this.textContent ? this.textContent.trim() : '';

      if (this._slottedText !== '') {
        this.setAttribute('aria-label', this._slottedText);
      }
    }

    protected _renderLabelAttribute(): TemplateResult {
      return this._slottedText === ''
        ? html`<span class="label-attr">${this._label}</span>`
        : html`${nothing}`;
    }
  }

  return LabelledCheckboxOrRadio as unknown as Constructor<LabelledCheckboxOrRadioInterface> &
    T;
};
