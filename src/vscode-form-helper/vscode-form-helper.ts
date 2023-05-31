import {css, CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {applyForegroundRGBA} from '../includes/themeHelpers';
import formHelperTextStyles from '../includes/formHelperTextStyles';
import {VscElement} from '../includes/VscElement';
import declareThemeVariables from '../includes/declareThemeVariables';
import defaultStyles from '../includes/default.styles';

/**
 * Adds more detailed description to a [FromGroup](https://bendera.github.io/vscode-webview-elements/components/vscode-form-group/)
 *
 * @cssprop [--foreground=var(--vsc-foreground-translucent)] - Default text color. 90% transparency version of `--vscode-foreground` by default.
 */
@customElement('vscode-form-helper')
export class VscodeFormHelper extends VscElement {
  constructor() {
    super();
    applyForegroundRGBA();
  }

  static get styles(): CSSResultGroup[] {
    const fallbackStyles = declareThemeVariables([
      {
        componentProp: '--foreground',
        vscodeProp: '--vsc-foreground-translucent',
      },
    ]);

    const baseStyles = css`
      :host {
        color: var(--foreground);
        display: block;
        margin-bottom: 4px;
        margin-top: 4px;
        max-width: 720px;
      }

      :host([vertical]) {
        margin-left: 0;
      }
    `;

    return [defaultStyles, fallbackStyles, baseStyles, formHelperTextStyles];
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-helper': VscodeFormHelper;
  }
}
