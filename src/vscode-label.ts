import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
} from 'lit-element';
import {INPUT_LINE_HEIGHT_RATIO} from './includes/helpers';

interface FocusableElement extends Element {
  focus: () => void;
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('vscode-label')
export class VscodeLabel extends LitElement {
  @property({type: Boolean})
  colon = false;

  @property({type: Boolean})
  required = false;

  @property({reflect: true, attribute: 'side-aligned'})
  sideAligned: 'start' | 'end' = 'start';

  @property({type: Boolean})
  wrap = false;

  @property()
  for = '';

  static styles = css`
    :host {
      cursor: default;
      display: block;
    }

    :host([inline]) {
      display: inline-block;
    }

    :host([side-aligned]),
    :host([sideAligned]),
    :host([sidealigned]) {
      display: inline-block;
      width: 150px;
    }

    :host([side-aligned='end']),
    :host([sideAligned='end']),
    :host([sidealigned='end']) {
      text-align: right;
    }

    .wrapper {
      color: var(--vscode--settings-headerForeground);
      font-size: var(--vscode-font-size);
      font-weight: 600;
      line-height: ${INPUT_LINE_HEIGHT_RATIO};
      padding: 5px 0;
    }

    :host-context(vscode-form-group.settings-group) .wrapper {
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
  `;

  private _handleClick() {
    let target;

    if (this.for) {
      const root = this.getRootNode({composed: true}) as Document | ShadowRoot;

      if (root) {
        target = root.querySelector(`#${this.for}`);

        if (target && 'focus' in target) {
          (target as FocusableElement).focus();
        }
      }
    }
  }

  render(): TemplateResult {
    return html`
      <div class="wrapper" @click=${this._handleClick}><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-label': VscodeLabel;
  }
}
