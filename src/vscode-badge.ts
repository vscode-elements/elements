import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

@customElement('vscode-badge')
export class VscodeBadge extends VscElement {
  @property()
  variant: 'default' | 'counter' | 'activity-bar-counter' = 'default';

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          background-color: var(--vscode-badge-background, #c4c4c4);
          border-radius: 2px;
          color: var(--vscode-badge-foreground, #333333);
          display: inline-block;
          font-family: var(
            --vscode-font-family,
            '"Segoe WPC", "Segoe UI", sans-serif'
          );
          font-size: 11px;
          font-weight: 400;
          line-height: 14px;
          min-width: 18px;
          padding: 2px 3px;
          text-align: center;
          white-space: nowrap;
        }

        :host([variant='counter']) {
          border-radius: 11px;
          box-sizing: border-box;
          height: 18px;
          line-height: 1;
          padding: 3px 5px;
        }

        :host([variant='activity-bar-counter']) {
          background-color: var(--vscode-activityBarBadge-background, #2188ff);
          border-radius: 20px;
          color: var(--vscode-activityBarBadge-foreground, #ffffff);
          font-size: 9px;
          font-weight: 600;
          line-height: 16px;
          min-width: 8px;
          padding: 0 4px;
        }
      `,
    ];
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-badge': VscodeBadge;
  }
}
