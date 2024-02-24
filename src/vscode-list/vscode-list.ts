import {PropertyValueMap, PropertyValues, TemplateResult, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import {VscodeListItem} from '../vscode-list-item';
import styles from './vscode-list.styles';
import {updateChildrenProps} from '../vscode-list-item/helpers';

@customElement('vscode-list')
export class VscodeList extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  arrows = false;

  @property({type: Number})
  indent = 8;

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _assignedListItems!: VscodeListItem[];

  private _handleSlotChange = () => {
    updateChildrenProps(this._assignedListItems, {
      parentLevel: -1,
      parentIndent: this.indent,
      arrow: this.arrows,
    });
  };

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('arrows') || changedProperties.has('indent')) {
      this._assignedListItems.forEach((li) => {
        li.arrow = this.arrows;
        li.indent = this.indent;
      });
    }
  }

  render(): TemplateResult {
    return html`<div>
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-list': VscodeList;
  }
}
