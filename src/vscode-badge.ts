import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VscElement} from './includes/VscElement';

/**
 * @cssprop [--font-family=var(--vscode-font-family)]
 * @cssprop [--background=var(--vscode-badge-background)] - default and counter variant background color
 * @cssprop [--foreground=var(--vscode-badge-foreground)] - default and counter variant foreground color
 * @cssprop [--activity-bar-badge-background=var(--vscode-activityBarBadge-background)] - activity bar variant background color
 * @cssprop [--activity-bar-badge-foreground=var(--vscode-activityBarBadge-foreground)] - activity bar variant foreground color
 */
@customElement('vscode-badge')
export class VscodeBadge extends VscElement {
  @property()
  variant: 'default' | 'counter' | 'activity-bar-counter' = 'default';

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          --font-family: var(
            --vscode-font-family,
            "Segoe WPC",
            "Segoe UI",
            sans-serif
          );
        }

        :host-context(body.vscode-dark) {
          --background: var(--vscode-badge-background, #4d4d4d);
          --foreground: var(--vscode-badge-foreground, #ffffff);
          --activity-bar-badge-background: var(
            --vscode-activityBarBadge-background,
            #2188ff
          );
          --activity-bar-badge-foreground: var(
            --vscode-activityBarBadge-foreground,
            #ffffff
          );
        }

        :host-context(body.vscode-light) {
          --background: var(--vscode-badge-background, #c4c4c4);
          --foreground: var(--vscode-badge-foreground, #333333);
          --activity-bar-badge-background: var(
            --vscode-activityBarBadge-background,
            #007acc
          );
          --activity-bar-badge-foreground: var(
            --vscode-activityBarBadge-foreground,
            #ffffff
          );
        }

        :host-context(body.vscode-high-contrast) {
          --background: var(--vscode-badge-background, #000000);
          --foreground: var(--vscode-badge-foreground, #ffffff);
          --activity-bar-badge-background: var(
            --vscode-activityBarBadge-background,
            #000000
          );
          --activity-bar-badge-foreground: var(
            --vscode-activityBarBadge-foreground,
            #ffffff
          );
        }

        :host {
          background-color: var(--background);
          border-radius: 2px;
          color: var(--foreground);
          display: inline-block;
          font-family: var(--font-family);
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
          background-color: var(--activityBarBadge-background);
          border-radius: 20px;
          color: var(--activityBarBadge-foreground);
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
