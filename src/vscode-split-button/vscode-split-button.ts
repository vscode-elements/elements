import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import styles from './vscode-split-button.styles.js';

/**
 * Shows a split button, including several components in a single button. Commonly used to show a button with a dropdown to the right.
 *
 * @tag vscode-split-button
 *
 * @cssprop [--vscode-button-background=#0078d4]
 * @cssprop [--vscode-button-foreground=#ffffff]
 * @cssprop [--vscode-button-border=var(--vscode-button-background, rgba(255, 255, 255, 0.07))]
 * @cssprop [--vscode-button-hoverBackground=#026ec1]
 * @cssprop [--vscode-font-family=sans-serif] - A sans-serif font type depends on the host OS.
 * @cssprop [--vscode-font-size=13px]
 * @cssprop [--vscode-font-weight=normal]
 * @cssprop [--vscode-button-secondaryForeground=#cccccc]
 * @cssprop [--vscode-button-secondaryBackground=#313131]
 * @cssprop [--vscode-button-secondaryHoverBackground=#3c3c3c]
 * @cssprop [--vscode-focusBorder=#0078d4]
 */
@customElement('vscode-split-button')
export class VscodeSplitButton extends VscElement {
  static override styles = styles;

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-split-button': VscodeSplitButton;
  }
}
