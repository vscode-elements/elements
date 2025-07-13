import {VscodeTreeItem} from './vscode-tree-item';

export function getParentItem(childItem: VscodeTreeItem) {
  if (!childItem.parentElement) {
    return null;
  }

  if (!(childItem.parentElement instanceof VscodeTreeItem)) {
    return null;
  }

  return childItem.parentElement;
}
