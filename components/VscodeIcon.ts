import { LitElement, html, svg, css, property, customElement } from 'lit-element';
import getIcon from './getIcon';

type Theme = 'light' | 'dark' | 'hc';

@customElement('vscode-icon')
export class VscodeIcon extends LitElement {
  @property({ type: String }) name: string;
  @property({ type: Number }) size: number = 16;
  @property({ type: String })
  public set theme(val: Theme) {
    const oldVal = this._theme;

    this._theme = val;
    this.requestUpdate('theme', oldVal);
  }
  public get theme(): Theme {
    return this._theme;
  }

  private _theme: Theme;

  connectedCallback() {
    super.connectedCallback();

    if (!this.theme) {
      this.setDefaultTheme();
    }
  }

  private setDefaultTheme() {
    if (document.body.classList.contains('theme-light')) {
      this._theme = 'light';
    } else if(document.body.classList.contains('theme-hc')) {
      this._theme = 'hc';
    } else {
      this._theme = 'dark';
    }
  }

  private getSize(): number {
    return [
      'file',
      'search',
      'source-control',
      'debug',
      'extensions',
      'more',
      'settings',
      'references'
    ].indexOf(this.name) !== -1 ? 24 : 16;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      span {
        display: block;
      }

      svg {
        display: block;
        height: 100%;
        width: 100%;
      }
    `;
  }

  render() {
    const size = this.getSize();
    const shape = getIcon(this.name, this.theme);

    const icon = svg`
      <svg
        viewBox="0 0 ${size} ${size}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${shape}
      </svg>
    `;

    return html`
      <style>
        span {
          height: ${this.size}px;
          width: ${this.size}px;
        }

        :host-context([slot=actions]) {
          margin: 0 4px;
        }
      </style>
      <span>
        ${icon}
      </span>
    `;
  }
}
