import {VscodeListItem} from './vscode-list-item';

export const updateChildrenProps = (
  list: VscodeListItem[],
  {
    parentLevel,
    parentIndent,
    arrow,
  }: {parentLevel: number; parentIndent: number; arrow: boolean}
) => {
  list.forEach((li) => {
    li.level = parentLevel + 1;
    li.indent = parentIndent;
    li.arrow = arrow;
  });
};
