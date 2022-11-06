import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {VscElement} from './includes/VscElement';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('vscode-textarea')
export class VscodeTextarea extends VscElement {
  @property()
  autocomplete: 'on' | 'off' | undefined = undefined;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property()
  maxlength = undefined;

  @property()
  minlength = undefined;

  @property()
  name = undefined;

  @property()
  placeholder = undefined;

  @property({type: Boolean, reflect: true})
  readonly = false;

  @property()
  resize: 'both' | 'horizontal' | 'vertical' | 'none' = 'none';

  @property({type: Boolean, reflect: true})
  required = false;

  @property()
  spellcheck = false;

  @property({type: Boolean, reflect: true, attribute: 'use-monospace-fonts'})
  useMonospaceFonts = false;

  @property()
  value = '';

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 320px;
        }

        textarea {
          background-color: var(--vscode-input-background, #ffffff);
          border-color: var(--vscode-settings-textInputBorder, #cecece);
          border-radius: 2px;
          border-style: solid;
          border-width: 1px;
          display: block;
          font-family: var(
            --vscode-font-family,
            '"Segoe WPC", "Segoe UI", sans-serif'
          );
          font-size: var(--vscode-font-size, 13px);
          font-weight: var(--vscode-font-weight, normal);
          width: 100%;
        }

        textarea:focus {
          border-color: var(--vscode-focusBorder, #0090f1);
          outline: none;
        }

        textarea::-webkit-scrollbar-track {
          background-color: transparent;
        }

        textarea::-webkit-scrollbar {
          width: 15px;
        }

        textarea::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        textarea:hover::-webkit-scrollbar-thumb {
          background-color: var(
            --vscode-scrollbarSlider-background,
            rgba(100, 100, 100, 0.4)
          );
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background-color: var(
            --vscode-scrollbarSlider-hoverBackground,
            rgba(100, 100, 100, 0.7)
          );
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html`
      <textarea
        class=${classMap({
          monospace: this.useMonospaceFonts,
        })}
        style=${styleMap({
          resize: this.resize,
        })}
      >
${this.value}</textarea
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-textarea': VscodeTextarea;
  }
}
