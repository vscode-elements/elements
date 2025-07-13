import {VscodeListItem} from './vscode-list-item';

export function getParentItem(childItem: VscodeListItem) {
  if (!childItem.parentElement) {
    return null;
  }

  if (!(childItem.parentElement instanceof VscodeListItem)) {
    return null;
  }

  return childItem.parentElement;
}
