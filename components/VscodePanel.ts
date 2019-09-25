import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('vscode-panel')
export class VscodePanel extends LitElement {
  @property({type: String }) title: string;

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <div class="panel">
        <div class="panel-header">
          <h3 class="title">Title</h3>
          <div class="actions">actions</div>
        </div>
        <div class="panel-body"></div>
      </div>
    `;
  }
}
