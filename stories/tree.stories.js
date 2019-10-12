import { document } from 'global';

export default {
  title: 'Tree',
  decorators: [
    (story) => {
      document.body.classList.add('vscode-light');
      return story();
    }
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
  tree.arrows = true;

  return tree;
};
defaultState.story = {
  name: 'Default',
};
