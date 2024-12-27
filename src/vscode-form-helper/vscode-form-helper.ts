import {html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {applyForegroundRGBA} from '../includes/themeHelpers.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-form-helper.styles.js';

/**
 * Adds more detailed description to a [FromGroup](https://bendera.github.io/vscode-webview-elements/components/vscode-form-group/)
 *
 * @tag vscode-form-helper
 *
 * @cssprop --vsc-foreground-translucent - Default text color. 90% transparency version of `--vscode-foreground` by default.
 */
@customElement('vscode-form-helper')
export class VscodeFormHelper extends VscElement {
  static styles = styles;

  constructor() {
    super();
    applyForegroundRGBA();
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
