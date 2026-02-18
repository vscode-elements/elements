import {html, TemplateResult} from 'lit';
import {customElement, VscElement} from '../includes/VscElement.js';
import styles from './vscode-form-helper.styles.js';

// Guard for SSR: CSSStyleSheet may not be available
let lightDOMStyles: CSSStyleSheet | undefined;
if (typeof CSSStyleSheet !== 'undefined') {
  lightDOMStyles = new CSSStyleSheet();
  lightDOMStyles.replaceSync(`
    vscode-form-helper * {
      margin: 0;
    }

    vscode-form-helper *:not(:last-child) {
      margin-bottom: 8px;
    }
  `);
}

/**
 * Adds more detailed description to a [FromGroup](https://bendera.github.io/vscode-webview-elements/components/vscode-form-group/)
 *
 * @tag vscode-form-helper
 *
 * @cssprop --vsc-foreground-translucent - Default text color. 90% transparency version of `--vscode-foreground` by default.
 */
@customElement('vscode-form-helper')
export class VscodeFormHelper extends VscElement {
  static override styles = styles;

  constructor() {
    super();
    this._injectLightDOMStyles();
  }

  private _injectLightDOMStyles() {
    // Guard for SSR: document may not be available
    if (typeof document === 'undefined' || !lightDOMStyles) {
      return;
    }

    const found = document.adoptedStyleSheets.find((s) => s === lightDOMStyles);

    if (!found) {
      document.adoptedStyleSheets.push(lightDOMStyles);
    }
  }

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-helper': VscodeFormHelper;
  }
}
