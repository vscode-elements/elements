import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
} from 'lit-element';
import {VscodeSelectBase} from './vscode-select-base';

@customElement('vscode-multi-select')
export class VscodeMultiSelect extends VscodeSelectBase {
  @property({type: Array}) value: string[] = [];

  _multiple = true;

  render(): TemplateResult {
    return html` <div>vscode-multi-select</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-multi-select': VscodeMultiSelect;
  }
}
