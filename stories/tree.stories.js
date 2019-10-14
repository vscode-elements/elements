import { document } from 'global';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import withVscodeThemes from './utils/withVscodeThemes';

export default {
  title: 'Tree',
  decorators: [
    withKnobs,
    withVscodeThemes,
  ]
};

export const defaultState = () => {
  const icons = {
    branch: 'folder',
    leaf: 'file',
    open: 'folder-opened',
  };

  const data = [
    {
      icons,
      label: 'Item 1',
      subItems: [
        {
          icons,
          label: 'item 1.1',
          subItems: [
            {
              icons,
              label: 'item 1.1.1'
            },
            {
              icons,
              label: 'item 1.1.2'
            },
          ]
        },
        {
          icons,
          label: 'item 1.2',
          subItems: [
            {
              icons,
              label: 'item 1.2.1'
            },
            {
              icons,
              label: 'item 1.2.2'
            },
          ],
        },
      ],
    },
    {
      icons,
      label: 'item 2',
      subItems: [
        {
          icons,
          label: 'item 2.1'
        },
        {
          icons,
          label: 'item 2.2'
        }
      ]
    },
  ];

  const tree = document.createElement('vscode-tree');

  tree.data = data;
  tree.arrows = boolean('arrows', false);
  tree.indent = number('indent', 16);

  return tree;
};
defaultState.story = {
  name: 'Default',
};

export const flatList = () => {
  const icons = {
    branch: 'folder',
    leaf: 'git-commit',
    open: 'folder-opened',
  };

  const data = [
    {
      icons,
      label: 'Revert "Fix strictFunctionTypes errors in terminal proxy"',
    },
    {
      icons,
      label: 'Recent Workspaces list broken with UNC paths and root of a drive. Fixes',
    },
    {
      icons,
      label: 'Update highlight js and md versions',
    },
    {
      icons,
      label: 'Show preferred action info in lightbulb hover',
    },
  ];

  const tree = document.createElement('vscode-tree');

  tree.arrows = false;
  tree.indent = 0;
  tree.data = data;

  return tree;
}
