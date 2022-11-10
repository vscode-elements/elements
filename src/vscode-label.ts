import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {INPUT_LINE_HEIGHT_RATIO} from './includes/helpers';
import uniqueId from './includes/uniqueId';
import {VscElement} from './includes/VscElement';
import {VscodeCheckboxGroup} from './vscode-checkbox-group';
import {VscodeRadioGroup} from './vscode-radio-group';
import {VscodeTextarea} from './vscode-textarea';
import {VscodeTextfield} from './vscode-textfield';

interface FocusableElement extends Element {
  focus: () => void;
}

@customElement('vscode-label')
export class VscodeLabel extends VscElement {
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
  set id(val: string) {
    this._id = val;
  }

  get id(): string {
    return this._id;
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string
  ): void {
    super.attributeChangedCallback(name, old, value);
  }

  connectedCallback(): void {
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

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          cursor: default;
          display: block;
        }

        .wrapper {
          color: var(--vscode--settings-headerForeground);
          display: block;
          font-size: var(--vscode-font-size);
          font-weight: 600;
          line-height: ${INPUT_LINE_HEIGHT_RATIO};
          padding: 5px 0;
        }

        :host-context(vscode-form-group[variant='settings-group']) .wrapper {
          line-height: 18px;
          padding: 0;
        }

        ::slotted(.normal) {
          font-weight: normal;
        }

        ::slotted(.lightened) {
          color: var(--vscode-foreground);
          opacity: 0.9;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <label class="wrapper" @click=${this._handleClick}><slot></slot></label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-label': VscodeLabel;
  }
}
