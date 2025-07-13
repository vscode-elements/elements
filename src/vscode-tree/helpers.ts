import {VscodeTreeItem} from '../vscode-tree-item';
import type {VscodeTree} from './vscode-tree';

const isListItem = (item: HTMLElement): item is VscodeTreeItem =>
  item.tagName.toUpperCase() === 'VSCODE-LIST-ITEM';

const isListRoot = (item: HTMLElement): item is VscodeTree =>
  item.tagName.toUpperCase() === 'VSCODE-LIST';

export const initPathTrackerProps = (
  parentElement: VscodeTree | VscodeTreeItem,
  items: VscodeTreeItem[]
): void => {
  const numChildren = items.length;
  const parentElementLevel = isListRoot(parentElement)
    ? -1
    : (parentElement as VscodeTreeItem).level;

  if ('branch' in parentElement) {
    parentElement.branch = numChildren > 0;
  }

  parentElement.dataset.numChildren = numChildren.toString();

  items.forEach((item, i) => {
    const level = parentElementLevel + 1;
    const index = i.toString();

    if ('path' in parentElement) {
      item.path = [...parentElement.path, i];
    } else {
      item.path = [i];
    }

    item.level = parentElementLevel + 1;
    item.dataset.level = (parentElementLevel + 1).toString();
    item.dataset.index = i.toString();
    item.dataset.last = i === numChildren - 1 ? 'true' : 'false';
    item.dataset.id = `${level}_${index}`;
    item.dataset.path = item.path.join('.');
  });
};

export const findLastChildItem = (item: VscodeTreeItem): VscodeTreeItem => {
  const children = item.querySelectorAll<VscodeTreeItem>(
    ':scope > vscode-list-item'
  );

  if (children.length < 1) {
    return item;
  }

  const lastItem = children[children.length - 1];

  if (lastItem.branch && lastItem.open) {
    return findLastChildItem(lastItem);
  } else {
    return lastItem;
  }
};

export const findClosestParentHasNextSibling = (
  item: VscodeTreeItem
): VscodeTreeItem | null => {
  if (!item.parentElement) {
    return null;
  }

  if (!isListItem(item.parentElement)) {
    return null;
  }

  const isLast = item.parentElement.dataset.last === 'true' ? true : false;

  if (!isLast) {
    return item.parentElement;
  } else {
    return findClosestParentHasNextSibling(item.parentElement);
  }
};

export const findNextItem = (item: VscodeTreeItem): VscodeTreeItem | null => {
  if (item.branch && item.open) {
    return item.querySelector<VscodeTreeItem>('vscode-list-item');
  }

  const {parentElement} = item;

  if (!parentElement) {
    return null;
  }

  const numSiblings = parseInt(parentElement.dataset.numChildren ?? '0', 10);
  const index = parseInt(item.dataset.index ?? '-1', 10);

  let level = 0;

  if ('level' in item) {
    level = item.level;
  }

  if (index === numSiblings - 1) {
    const closestParent = findClosestParentHasNextSibling(item);

    if (closestParent) {
      const cpIndex = parseInt(closestParent.dataset.index ?? '', 10) + 1;
      const cpLevel = closestParent.level;

      return (
        closestParent.parentElement?.querySelector(
          `vscode-list-item[level="${cpLevel}"][data-index="${cpIndex}"]`
        ) ?? null
      );
    } else {
      return null;
    }
  }

  const nextElementIndex = Math.min(numSiblings - 1, index + 1);

  return parentElement.querySelector<VscodeTreeItem>(
    `vscode-list-item[level="${level}"][data-index="${nextElementIndex}"]`
  );
};

export const findPrevItem = (item: VscodeTreeItem): VscodeTreeItem | null => {
  const {parentElement} = item;
  const index = parseInt(item.dataset.index ?? '-1', 10);

  if (!parentElement) {
    return null;
  }

  const prevSibling = parentElement.querySelector<VscodeTreeItem>(
    `:scope vscode-list-item[data-index="${index - 1}"]`
  );

  if (!prevSibling) {
    if (parentElement.tagName.toUpperCase() === 'VSCODE-LIST-ITEM') {
      return parentElement as VscodeTreeItem;
    }
  }

  if (prevSibling && prevSibling.branch && prevSibling.open) {
    const lastChild = findLastChildItem(prevSibling);

    return lastChild;
  }

  return prevSibling;
};

export const findAncestorOnSpecificLevel = (
  item: VscodeTreeItem,
  level: number
): VscodeTreeItem | null => {
  if (
    !item.parentElement ||
    item.parentElement.tagName.toUpperCase() !== 'VSCODE-LIST-ITEM'
  ) {
    return null;
  }

  const parent = item.parentElement as VscodeTreeItem;
  const itemLevel = +(item.dataset.level ?? '');

  if (itemLevel > level) {
    return findAncestorOnSpecificLevel(parent, level);
  }

  if (itemLevel === level) {
    return item;
  }

  return null;
};

export const selectItemAndAllVisibleDescendants = (item: VscodeTreeItem) => {
  if (!item) {
    return;
  }

  item.selected = true;

  if (item.branch && item.open) {
    const children = item.querySelectorAll<VscodeTreeItem>(
      ':scope > vscode-list-item'
    );

    children.forEach((c) => {
      selectItemAndAllVisibleDescendants(c);
    });
  }
};

export function getParentItem(childItem: VscodeTreeItem) {
  if (!childItem.parentElement) {
    return null;
  }

  if (!isListItem(childItem.parentElement)) {
    return null;
  }

  return childItem.parentElement;
}
