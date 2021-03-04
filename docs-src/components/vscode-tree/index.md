---
layout: component.njk
title: Tree
tags: component
component: vscode-tree
---

# vscode-tree

## Basic example

<style>
  .tree-1 {
    width: 200px;
  }
</style>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const tree = document.querySelector('#tree-1');
  const icons = {
    branch: 'folder',
    leaf: 'file',
    open: 'folder-opened',
  };
  const data = [
    {
      icons,
      label: 'node_modules',
      value: 'black hole',
      subItems: [
        {
          icons,
          label: '.bin',
          subItems: [
            {
              icons,
              label: '_mocha_',
            },
            {
              icons,
              label: '_mocha.cmd_',
            },
            {
              icons,
              label: '_mocha.ps1_',
            },
            {
              icons,
              label: 'acorn',
            },
            {
              icons,
              label: 'acorn.cmd',
            },
            {
              icons,
              label: 'acorn.ps1',
            },
          ],
        },
        {
          icons,
          label: '@11ty',
          open: true,
          subItems: [
            {
              icons,
              label: 'lorem.js',
            },
            {
              icons,
              label: 'ipsum.js',
            },
            {
              icons,
              label: 'dolor.js',
            },
          ],
        },
        {
          icons,
          label: '.DS_Store',
        },
      ],
    },
    {
      icons,
      label: 'scripts',
      subItems: [
        {
          icons,
          label: 'build.js',
        },
        {
          icons,
          label: 'start.js',
        },
      ],
    },
    {
      icons,
      label: '.editorconfig',
      selected: true,
    },
    {
      icons,
      label: '2021-01-18T22_10_20_535Z-debug.log',
    },
  ];

  tree.data = data;

  tree.addEventListener('vsc-select', (event) => {
    console.log(event.detail);
  });
});
</script>

<component-preview>
  <vscode-tree id="tree-1"></vscode-tree>
</component-preview>

### CSS

```css
vscode-tree {
  width: 200px;
}
```

### HTML

```html
<vscode-tree id="tree"></vscode-tree>
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const tree = document.querySelector('#tree');
  const icons = {
    branch: 'folder',
    leaf: 'file',
    open: 'folder-opened',
  };
  const data = [
    {
      icons,
      label: 'node_modules',
      value: 'black hole',
      subItems: [
        {
          icons,
          label: '.bin',
          subItems: [
            {
              icons,
              label: '_mocha_',
            },
            {
              icons,
              label: '_mocha.cmd_',
            },
            {
              icons,
              label: '_mocha.ps1_',
            },
            {
              icons,
              label: 'acorn',
            },
            {
              icons,
              label: 'acorn.cmd',
            },
            {
              icons,
              label: 'acorn.ps1',
            },
          ],
        },
        {
          icons,
          label: '@11ty',
          open: true,
          subItems: [
            {
              icons,
              label: 'lorem.js',
            },
            {
              icons,
              label: 'ipsum.js',
            },
            {
              icons,
              label: 'dolor.js',
            },
          ],
        },
        {
          icons,
          label: '.DS_Store',
        },
      ],
    },
    {
      icons,
      label: 'scripts',
      subItems: [
        {
          icons,
          label: 'build.js',
        },
        {
          icons,
          label: 'start.js',
        },
      ],
    },
    {
      icons,
      label: '.editorconfig',
      selected: true,
    },
    {
      icons,
      label: '2021-01-18T22_10_20_535Z-debug.log',
    },
  ];

  tree.data = data;

  tree.addEventListener('vsc-select', (event) => {
    console.log(event.detail);
  });
});
```

## Flat list

<script>
document.addEventListener('DOMContentLoaded', () => {
  const tree = document.getElementById('tree-2');

  data = [
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'bump distro',
      value: '986e1248f6d8c1aa2a7f57a3fadbb00f94248c2b',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Update milestone',
      value: '4ae26a156300729ed3f9d23377e5d2aff9dcd982',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'env - tweak shell resolve experience on startup',
      value: '52098eaeb028e123b3f8af1d4a3d64df6db528be',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Merge pull request #107126 from Timmmm/atomic_tabs',
      value: 'fb80c0e44af034df58e329e0f946a9a722ab297c',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Simplify changes from #108193',
      value: '88856f1a1c8f90bcc12171d1af920d74bb59b625',
    },
  ];

  tree.data = data;

  tree.addEventListener('vsc-select', (event) => {
    console.log(event.detail);
  });
});
</script>

<component-preview>
  <vscode-tree id="tree-2" class="tree-2"></vscode-tree>
</component-preview>

### HTML

```html
<vscode-tree id="tree-2" tabindex="0"></vscode-tree>
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const tree = document.getElementById('tree-2');

  data = [
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'bump distro',
      value: '986e1248f6d8c1aa2a7f57a3fadbb00f94248c2b',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Update milestone',
      value: '4ae26a156300729ed3f9d23377e5d2aff9dcd982',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'env - tweak shell resolve experience on startup',
      value: '52098eaeb028e123b3f8af1d4a3d64df6db528be',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Merge pull request #107126 from Timmmm/atomic_tabs',
      value: 'fb80c0e44af034df58e329e0f946a9a722ab297c',
    },
    {
      icons: {
        leaf: 'git-commit'
      },
      label: 'Simplify changes from #108193',
      value: '88856f1a1c8f90bcc12171d1af920d74bb59b625',
    },
  ];

  tree.data = data;

  tree.addEventListener('vsc-select', (event) => {
    console.log(event.detail);
  });
});
```
