import {PropertyValues, TemplateResult, html} from 'lit';
import {provide} from '@lit/context';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement';
import type {VscodeListItem} from '../vscode-list-item';
import styles from './vscode-list.styles';
import {listContext, type ListContext} from './list-context';

@customElement('vscode-list')
export class VscodeList extends VscElement {
  static styles = styles;

  @property({type: Boolean, reflect: true})
  arrows = false;

  @property({type: Number, reflect: true})
  indent = 8;

  @provide({context: listContext})
  @property({attribute: false})
  listData: ListContext = {
    arrows: false,
    indent: 8,
    selectedItems: new Set(),
    hasBranchItem: false,
    rootElement: this,
  };

  /**
   * @internal
   * Updates `hasBranchItem` property in the context state in order to removing
   * extra padding before the leaf elements, if it is required.
   */
  updateHasBranchItemFlag() {
    const hasBranchItem = this._assignedListItems.some((li) => li.branch);
    this.listData = {...this.listData, hasBranchItem};
  }

  @queryAssignedElements({selector: 'vscode-list-item'})
  private _assignedListItems!: VscodeListItem[];

  private _handleSlotChange = () => {
    this._assignedListItems.forEach((li) => (li.level = 0));
  };

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    const {arrows, indent} = this;

    if (changedProperties.has('arrows')) {
      this.listData = {...this.listData, arrows};
    }

    if (changedProperties.has('indent')) {
      this.listData = {...this.listData, indent};
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
