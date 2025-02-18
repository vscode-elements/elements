import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import uniqueId from '../includes/uniqueId.js';
import {VscElement} from '../includes/VscElement.js';
import {VscodeCheckboxGroup} from '../vscode-checkbox-group/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import {VscodeTextarea} from '../vscode-textarea/index.js';
import {VscodeTextfield} from '../vscode-textfield/index.js';
import styles from './vscode-label.styles.js';

interface FocusableElement extends Element {
  focus: () => void;
}

/**
 * @tag vscode-label
 *
 * @cssprop [--vscode-font-family=sans-serif]
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-foreground=#cccccc]
 */
@customElement('vscode-label')
export class VscodeLabel extends VscElement {
  static override styles = styles;

  @property({reflect: true, attribute: 'for'})
  set htmlFor(val: string) {
    this._htmlFor = val;
    this.setAttribute('for', val);

    if (this._connected) {
      this._connectWithTarget();
    }
  }

  get htmlFor(): string {
    return this._htmlFor;
  }

  @property()
  override set id(val: string) {
    this._id = val;
  }

  override get id(): string {
    return this._id;
  }

  @property({type: Boolean, reflect: true})
  required = false;

  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string
  ): void {
    super.attributeChangedCallback(name, old, value);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._connected = true;

    if (this._id === '') {
      this._id = uniqueId('vscode-label-');
      this.setAttribute('id', this._id);
    }

    this._connectWithTarget();
  }

  private _id = '';

  private _htmlFor = '';

  private _connected = false;

  private _getTarget() {
    let target: HTMLElement | null = null;

    if (this._htmlFor) {
      const root = this.getRootNode({composed: false}) as Document | ShadowRoot;

      if (root) {
        target = root.querySelector(`#${this._htmlFor}`);
      }
    }

    return target;
  }

  private async _connectWithTarget() {
    await this.updateComplete;

    const target = this._getTarget();

    if (
      target instanceof VscodeRadioGroup ||
      target instanceof VscodeCheckboxGroup
    ) {
      target.setAttribute('aria-labelledby', this._id);
    }

    let label = '';

    if (this.textContent) {
      label = this.textContent.trim();
    }

    if (target instanceof VscodeTextfield || target instanceof VscodeTextarea) {
      target.label = label;
    }
  }

  private _handleClick() {
    const target = this._getTarget();

    if (target && 'focus' in target) {
      (target as FocusableElement).focus();
    }
  }

  override render(): TemplateResult {
    return html`
      <label
        class=${classMap({wrapper: true, required: this.required})}
        @click=${this._handleClick}
        ><slot></slot
      ></label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-label': VscodeLabel;
  }
}
