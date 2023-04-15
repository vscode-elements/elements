import {CSSResultGroup, css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import declareThemeVariables from './includes/declareThemeVariables';
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
      declareThemeVariables([
        {
          componentProp: '--foreground',
          vscodeProp: '--vscode-badge-foreground',
        },
        {
          componentProp: '--font-family',
          vscodeProp: '--vscode-font-family',
        },
        {
          componentProp: '--background',
          vscodeProp: '--vscode-badge-background',
        },
        {
          componentProp: '--activity-bar-badge-background',
          vscodeProp: '--vscode-activityBarBadge-background',
        },
        {
          componentProp: '--activity-bar-badge-foreground',
          vscodeProp: '--vscode-activityBarBadge-foreground',
        },
      ]),
      css`
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
          background-color: var(--activity-bar-badge-background);
          border-radius: 20px;
          color: var(--activity-bar-badge-foreground);
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
