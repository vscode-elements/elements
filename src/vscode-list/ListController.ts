import {VscodeListItem} from '../vscode-list-item';

export class ListController {
  private _activeItem: VscodeListItem | null = null;

  set activeItem(item: VscodeListItem | null) {
    this._activeItem = item;
  }

  get activeItem(): VscodeListItem | null {
    return this._activeItem;
  }
}
